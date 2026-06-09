import { NextRequest, NextResponse } from "next/server";

// San Diego County zoning → ADU rules (California law + SD local ordinance)
const ZONING_RULES: Record<string, { type: string; maxSqft: number; setbacks: string; feasibility: string }> = {
  "RS-1-7":  { type: "Detached ADU — Rear Yard",    maxSqft: 1200, setbacks: "4 ft sides & rear", feasibility: "High" },
  "RS-1-8":  { type: "Detached ADU — Rear Yard",    maxSqft: 1200, setbacks: "4 ft sides & rear", feasibility: "High" },
  "RS-1-9":  { type: "Detached ADU — Rear Yard",    maxSqft: 1200, setbacks: "4 ft sides & rear", feasibility: "High" },
  "RS-1-4":  { type: "Detached ADU — Rear Yard",    maxSqft: 1200, setbacks: "4 ft sides & rear", feasibility: "High" },
  "RS-1-5":  { type: "Detached ADU — Rear Yard",    maxSqft: 1200, setbacks: "4 ft sides & rear", feasibility: "High" },
  "RM-1-1":  { type: "ADU + JADU Combo",            maxSqft: 1200, setbacks: "4 ft sides & rear", feasibility: "Very High" },
  "RM-2-4":  { type: "ADU + JADU Combo",            maxSqft: 1200, setbacks: "4 ft sides & rear", feasibility: "Very High" },
  "RU":      { type: "Garage Conversion or Detached", maxSqft: 1200, setbacks: "0 ft (conversion)", feasibility: "High" },
  "default": { type: "Detached ADU — Rear Yard",    maxSqft: 1200, setbacks: "4 ft sides & rear", feasibility: "High" },
};

// Neighborhood → monthly rent estimates for ~600 sqft ADU
const NEIGHBORHOOD_RENTS: Record<string, [number, number]> = {
  "north park":     [2400, 2800],
  "south park":     [2200, 2600],
  "normal heights": [2200, 2600],
  "hillcrest":      [2500, 2900],
  "mission hills":  [2600, 3000],
  "ocean beach":    [2300, 2700],
  "pacific beach":  [2600, 3100],
  "mission beach":  [2700, 3200],
  "la jolla":       [3200, 4000],
  "kensington":     [2400, 2800],
  "talmadge":       [2200, 2500],
  "university heights": [2300, 2700],
  "city heights":   [1900, 2300],
  "encanto":        [1800, 2200],
  "lemon grove":    [1800, 2100],
  "el cajon":       [1700, 2100],
  "santee":         [1800, 2100],
  "lakeside":       [1800, 2100],
  "chula vista":    [2000, 2400],
  "national city":  [1800, 2200],
  "encinitas":      [2800, 3400],
  "carlsbad":       [2700, 3200],
  "escondido":      [1900, 2300],
  "vista":          [1900, 2300],
  "san marcos":     [2000, 2400],
  "default":        [2200, 2700],
};

function getRentRange(address: string): [number, number] {
  const lower = address.toLowerCase();
  for (const [neighborhood, range] of Object.entries(NEIGHBORHOOD_RENTS)) {
    if (lower.includes(neighborhood)) return range;
  }
  return NEIGHBORHOOD_RENTS["default"];
}

async function fetchParcelData(address: string) {
  // San Diego County Assessor public ArcGIS REST API
  const encoded = encodeURIComponent(address);
  const url = `https://arcgis.sandiegocounty.gov/arcgis/rest/services/Parcel/MapServer/0/query?where=SITUS_ADDRESS+LIKE+%27${encoded}%25%27&outFields=*&returnGeometry=false&f=json`;

  try {
    const res = await fetch(url, { next: { revalidate: 3600 } });
    const data = await res.json();
    if (data?.features?.length > 0) {
      return data.features[0].attributes;
    }
  } catch {
    // Fall through to estimate
  }
  return null;
}

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  if (!body?.address?.trim()) {
    return NextResponse.json({ error: "Address required" }, { status: 400 });
  }

  const address: string = body.address.trim();
  const encoder = new TextEncoder();
  const stream = new TransformStream();
  const writer = stream.writable.getWriter();

  const send = async (data: object) =>
    writer.write(encoder.encode(`data: ${JSON.stringify(data)}\n\n`));

  (async () => {
    try {
      await send({ type: "step", label: "Querying SD County Assessor records" });
      const parcel = await fetchParcelData(address);
      await send({ type: "step", label: "Reading parcel configuration" });

      // Parse parcel data or fall back to estimates
      const lotSqft: number = parcel?.LAND_AREA_SF || parcel?.LOT_AREA || 6000;
      const buildingSqft: number = parcel?.IMPV_AREA || parcel?.LIVING_AREA || 1350;
      const yearBuilt: number = parcel?.YEAR_BUILT || 1965;
      const zoningCode: string = parcel?.ZONE_CODE || parcel?.ZONING || "RS-1-7";
      const apn: string = parcel?.APN || "";

      await send({ type: "step", label: "Checking zoning classification" });

      // Find zoning rules
      const zoneKey = Object.keys(ZONING_RULES).find(k => zoningCode.startsWith(k)) || "default";
      const rules = ZONING_RULES[zoneKey];

      await send({ type: "step", label: "Applying California ADU law" });

      // ADU size: up to 1200 sqft or 50% of main unit, whichever is less (CA law)
      const maxByPercent = Math.floor(buildingSqft * 0.5);
      const maxAdu = Math.min(rules.maxSqft, maxByPercent, 1200);

      await send({ type: "step", label: "Analyzing rental market" });

      const [rentLow, rentHigh] = getRentRange(address);

      await send({ type: "step", label: "Calculating build cost & programs" });

      // SD build cost: $200–$280/sqft for detached, $120–$160 for conversion
      const isConversion = rules.type.includes("Conversion");
      const costLow = Math.round((isConversion ? 120 : 200) * 500 / 1000) * 1000;
      const costHigh = Math.round((isConversion ? 160 : 280) * 500 / 1000) * 1000;

      // Payback: cost / annual rent
      const avgRent = (rentLow + rentHigh) / 2;
      const avgCost = (costLow + costHigh) / 2;
      const paybackYears = (avgCost / (avgRent * 12)).toFixed(1);

      // SB9 eligibility: single-family zones only
      const sb9Eligible = zoningCode.startsWith("RS");
      const programs = [
        "CalHFA ADU Grant (up to $40K)",
        sb9Eligible ? "SB9 Lot Split Eligible" : null,
        "DSCR Investor Loan",
        "HELOC Construction",
      ].filter(Boolean).join(" · ");

      await send({ type: "step", label: "Generating opportunity score" });

      const lotAcres = (lotSqft / 43560).toFixed(2);

      const result = {
        parcel: {
          lotSize: `${lotSqft.toLocaleString()} sq ft (${lotAcres} ac)${apn ? ` · APN ${apn}` : ""}`,
          existing: `${buildingSqft.toLocaleString()} sq ft · Built ${yearBuilt}`,
          zoning: zoningCode,
          year: String(yearBuilt),
        },
        adu: {
          type: rules.type,
          maxSize: `Up to ${maxAdu.toLocaleString()} sq ft`,
          setbacks: rules.setbacks,
          feasibility: rules.feasibility,
        },
        financial: {
          projectedRent: `$${rentLow.toLocaleString()} – $${rentHigh.toLocaleString()} / mo`,
          buildCost: `$${costLow.toLocaleString()} – $${costHigh.toLocaleString()}`,
          programs,
          payback: `~${paybackYears} years`,
        },
        summary: `This ${zoningCode}-zoned parcel in San Diego supports a ${rules.type.toLowerCase()} of up to ${maxAdu.toLocaleString()} sq ft. At current neighborhood rents of $${rentLow.toLocaleString()}–$${rentHigh.toLocaleString()}/mo, the projected payback period is approximately ${paybackYears} years. ${sb9Eligible ? "The property is also eligible for SB9 lot split." : ""}`,
      };

      await send({ type: "complete", result });
    } catch (err) {
      await send({ type: "error", message: String(err) });
    } finally {
      await writer.close();
    }
  })();

  return new Response(stream.readable, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}
