"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import {
  MapPin, Home, Warehouse, PlusSquare, Wrench, ChefHat, Bath,
  TrendingUp, ArrowLeft, Download, Share2, CheckCircle, AlertTriangle, Info
} from "lucide-react";

/* ---- Mock data generator ---- */
function generateReport(address: string) {
  const seed = address.length;
  const rand = (min: number, max: number, offset = 0) =>
    Math.round(min + ((seed + offset) % 13) * ((max - min) / 13));

  return {
    address,
    neighborhood: "North Park",
    city: "San Diego",
    zip: "92103",
    currentValue: rand(620000, 950000, 1),
    lotSqft: rand(5200, 9800, 2),
    homeSqft: rand(1200, 2400, 3),
    bedrooms: rand(2, 4, 4),
    bathrooms: rand(1, 3, 5),
    yearBuilt: rand(1955, 2005, 6),
    zoning: "R-2",
    aduEligible: true,
    garagePresent: true,
    garageSqft: rand(380, 520, 7),
    lotCoverage: rand(38, 58, 8),
    opportunities: [
      {
        rank: 1,
        icon: Warehouse,
        type: "Garage Conversion",
        score: 9.4,
        cost: `$${rand(85, 130, 9)}K`,
        monthlyRent: `$${rand(2100, 2800, 10)}/mo`,
        capRate: `${rand(19, 28, 11)}.${rand(1, 9, 12)}%`,
        payback: `${rand(3, 5, 13)}.${rand(1, 9, 14)} yrs`,
        valueAdd: `+$${rand(65, 120, 15)}K`,
        risk: "Low",
        tag: "Highest ROI",
        desc: "Your existing attached garage is ideal for conversion to a legal ADU. Low construction cost, no new foundation required, existing utility connections.",
        pros: ["No foundation cost", "Existing utility hookups", "Fastest permit timeline", "Lowest construction disruption"],
        cons: ["Loss of parking", "Limited square footage", "HOA approval may be required"],
      },
      {
        rank: 2,
        icon: Home,
        type: "Detached ADU",
        score: 8.9,
        cost: `$${rand(155, 240, 16)}K`,
        monthlyRent: `$${rand(2600, 3400, 17)}/mo`,
        capRate: `${rand(16, 22, 18)}.${rand(1, 9, 19)}%`,
        payback: `${rand(4, 6, 20)}.${rand(1, 9, 21)} yrs`,
        valueAdd: `+$${rand(120, 200, 22)}K`,
        risk: "Low",
        tag: "Best Value",
        desc: "R-2 zoning and lot size support a detached ADU up to 1,200 sqft. Strong rental demand in this submarket with low vacancy rates.",
        pros: ["Maximum rental income", "Full privacy from main house", "Highest property value addition", "Multiple financing options"],
        cons: ["Higher upfront cost", "Longer construction timeline", "More complex permitting"],
      },
      {
        rank: 3,
        icon: PlusSquare,
        type: "Home Addition",
        score: 7.2,
        cost: `$${rand(110, 190, 23)}K`,
        monthlyRent: "N/A",
        capRate: "N/A",
        payback: "N/A",
        valueAdd: `+$${rand(80, 150, 24)}K`,
        risk: "Medium",
        tag: "Value Builder",
        desc: "Adding a bedroom and bathroom increases appraised value and positions the home for premium resale or higher-tier long-term rental.",
        pros: ["Increases home equity", "No separate rental income", "Improves livability"],
        cons: ["No rental income", "Longer ROI horizon", "Market-dependent returns"],
      },
      {
        rank: 4,
        icon: Wrench,
        type: "Full Renovation",
        score: 6.4,
        cost: `$${rand(75, 160, 25)}K`,
        monthlyRent: "N/A",
        capRate: "N/A",
        payback: "N/A",
        valueAdd: `+$${rand(60, 110, 26)}K`,
        risk: "Medium",
        tag: "Equity Play",
        desc: "Strategic full renovation targeting kitchen, bathrooms, and curb appeal to maximize resale value or command premium rents.",
        pros: ["Broad market appeal", "Can be phased", "Increases rental rate"],
        cons: ["Returns vary by market", "Over-improvement risk", "No passive income"],
      },
      {
        rank: 5,
        icon: ChefHat,
        type: "Kitchen Remodel",
        score: 5.8,
        cost: `$${rand(30, 75, 27)}K`,
        monthlyRent: "N/A",
        capRate: "N/A",
        payback: "N/A",
        valueAdd: `+$${rand(25, 55, 28)}K`,
        risk: "Low",
        tag: "Quick Win",
        desc: "High-visibility upgrade with strong ROI in this price tier. Modern kitchen dramatically improves rental rate and resale positioning.",
        pros: ["High visibility ROI", "Improves rental rate", "Low disruption time"],
        cons: ["Lower total return", "May need matching baths"],
      },
    ],
    riskFactors: [
      { level: "low", text: "Strong rental market — avg. 6 days to lease in this ZIP" },
      { level: "low", text: "R-2 zoning pre-approved for ADU builds" },
      { level: "medium", text: "Construction costs elevated — budget 10% contingency" },
      { level: "medium", text: "Permit timeline 8–14 weeks in current backlog" },
    ],
    strategy: "Garage conversion first (fastest, lowest cost, highest immediate yield), then detached ADU in Phase 2 once rental income is established. Estimated combined annual income: $62,400 at full occupancy.",
  };
}

/* ---- Score ring ---- */
function ScoreRing({ score }: { score: number }) {
  const [animated, setAnimated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const t = setTimeout(() => setAnimated(true), 300);
    return () => clearTimeout(t);
  }, []);

  const pct = score / 10;
  const r = 36;
  const circ = 2 * Math.PI * r;
  const dash = animated ? pct * circ : 0;

  return (
    <div ref={ref} className="relative w-24 h-24 flex-shrink-0">
      <svg width="96" height="96" viewBox="0 0 96 96" className="-rotate-90">
        <circle cx="48" cy="48" r={r} fill="none" strokeWidth="4" stroke="rgba(255,255,255,0.06)" />
        <circle
          cx="48" cy="48" r={r}
          fill="none" strokeWidth="4"
          stroke="url(#goldGrad)"
          strokeLinecap="round"
          strokeDasharray={`${dash} ${circ}`}
          style={{ transition: "stroke-dasharray 1.4s cubic-bezier(0.4,0,0.2,1)" }}
        />
        <defs>
          <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.45)" />
            <stop offset="100%" stopColor="#FFFFFF" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-xl font-light" style={{ fontFamily: "var(--font-cormorant), Georgia, serif", color: "var(--gold)" }}>
          {score}
        </span>
        <span className="text-xs" style={{ color: "rgba(237,232,223,0.3)", letterSpacing: "0.06em" }}>/10</span>
      </div>
    </div>
  );
}

/* ---- Loading screen ---- */
function LoadingScreen({ address }: { address: string }) {
  const steps = [
    "Fetching parcel data...",
    "Analyzing zoning records...",
    "Calculating rental comps...",
    "Scoring improvement opportunities...",
    "Building your report...",
  ];
  const [step, setStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setStep((s) => (s < steps.length - 1 ? s + 1 : s));
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6" style={{ background: "var(--obsidian)" }}>
      <div
        className="w-16 h-16 rounded-full mb-10 animate-pulse-gold"
        style={{ background: "rgba(255,255,255,0.1)", border: "2px solid rgba(255,255,255,0.4)" }}
      />
      <p className="text-xs uppercase tracking-widest mb-3" style={{ color: "var(--gold)", letterSpacing: "0.2em" }}>
        Analyzing Property
      </p>
      <p className="text-sm mb-8" style={{ color: "rgba(237,232,223,0.5)" }}>
        {address}
      </p>
      <div className="space-y-2 text-center">
        {steps.map((s, i) => (
          <p
            key={s}
            className="text-xs transition-all duration-300"
            style={{
              color: i <= step ? "rgba(255,255,255,0.7)" : "rgba(237,232,223,0.15)",
              transform: i <= step ? "none" : "translateY(4px)",
              letterSpacing: "0.08em",
            }}
          >
            {i < step ? "✓ " : i === step ? "→ " : "  "}{s}
          </p>
        ))}
      </div>
    </div>
  );
}

/* ---- Main report ---- */
export default function ReportClient() {
  const params = useSearchParams();
  const rawAddress = params.get("address") || "123 Oak Street, San Diego, CA 92103";
  const isDemo = params.get("demo") === "true";
  const address = isDemo ? "4521 Mission Bay Dr, San Diego, CA 92109" : decodeURIComponent(rawAddress);

  const [loading, setLoading] = useState(true);
  const [report, setReport] = useState<ReturnType<typeof generateReport> | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setReport(generateReport(address));
      setLoading(false);
    }, 2800);
    return () => clearTimeout(timer);
  }, [address]);

  if (loading) return <LoadingScreen address={address} />;
  if (!report) return null;

  const riskColor = { low: "#4ade80", medium: "#facc15", high: "#f87171" };

  return (
    <div style={{ background: "var(--obsidian)", minHeight: "100vh" }}>
      {/* Report header */}
      <div
        className="sticky top-0 z-50 px-6 py-4 flex items-center justify-between"
        style={{ background: "rgba(10,10,10,0.95)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}
      >
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2 text-xs" style={{ color: "rgba(237,232,223,0.4)" }}>
            <ArrowLeft size={14} />
            Back
          </Link>
          <div className="w-px h-4" style={{ background: "rgba(255,255,255,0.1)" }} />
          <div className="flex items-center gap-2">
            <MapPin size={13} style={{ color: "var(--gold)" }} />
            <span className="text-xs" style={{ color: "rgba(237,232,223,0.6)" }}>{address}</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button
            className="flex items-center gap-2 px-4 py-2 text-xs rounded-sm transition-colors"
            style={{ border: "1px solid rgba(255,255,255,0.1)", color: "rgba(237,232,223,0.5)" }}
          >
            <Share2 size={12} /> Share
          </button>
          <button
            className="flex items-center gap-2 px-4 py-2 text-xs rounded-sm"
            style={{ background: "var(--gold)", color: "var(--obsidian)" }}
          >
            <Download size={12} /> Download PDF
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Property overview */}
        <div className="mb-12">
          <div className="flex items-start gap-3 mb-2">
            <div
              className="px-3 py-1 text-xs rounded-sm uppercase tracking-widest"
              style={{ background: "rgba(255,255,255,0.15)", color: "var(--gold)", border: "1px solid rgba(255,255,255,0.3)", letterSpacing: "0.14em" }}
            >
              Property Opportunity Report
            </div>
            <div
              className="px-3 py-1 text-xs rounded-sm"
              style={{ background: "rgba(74,222,128,0.1)", color: "#4ade80", border: "1px solid rgba(74,222,128,0.2)" }}
            >
              ADU Eligible
            </div>
          </div>
          <h1
            className="text-4xl lg:text-5xl font-light mb-2"
            style={{ fontFamily: "var(--font-cormorant), Georgia, serif", color: "var(--cream)" }}
          >
            {address}
          </h1>
          <p className="text-sm" style={{ color: "rgba(237,232,223,0.4)" }}>
            {report.neighborhood} · {report.city}, CA {report.zip} · Zoning: {report.zoning}
          </p>
        </div>

        {/* Property stats grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-px mb-12" style={{ background: "rgba(255,255,255,0.05)" }}>
          {[
            { label: "Est. Value", val: `$${(report.currentValue / 1000).toFixed(0)}K` },
            { label: "Lot Size", val: `${report.lotSqft.toLocaleString()} sqft` },
            { label: "Home Size", val: `${report.homeSqft.toLocaleString()} sqft` },
            { label: "Beds / Baths", val: `${report.bedrooms} / ${report.bathrooms}` },
            { label: "Year Built", val: report.yearBuilt },
            { label: "Lot Coverage", val: `${report.lotCoverage}%` },
          ].map((m) => (
            <div key={m.label} className="p-5" style={{ background: "#0d0d0d" }}>
              <div className="text-xs mb-1" style={{ color: "rgba(237,232,223,0.35)", letterSpacing: "0.1em" }}>{m.label}</div>
              <div className="text-lg font-light" style={{ fontFamily: "var(--font-cormorant), Georgia, serif", color: "var(--cream)" }}>
                {m.val}
              </div>
            </div>
          ))}
        </div>

        {/* Opportunities */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-8">
            <TrendingUp size={16} style={{ color: "var(--gold)" }} />
            <h2 className="text-xs uppercase tracking-widest" style={{ color: "var(--gold)", letterSpacing: "0.2em" }}>
              Ranked Opportunities
            </h2>
          </div>

          <div className="space-y-px" style={{ background: "rgba(255,255,255,0.04)" }}>
            {report.opportunities.map((opp, i) => {
              const Icon = opp.icon;
              return (
                <div
                  key={opp.type}
                  className="p-6 lg:p-8 transition-colors duration-200"
                  style={{ background: i === 0 ? "#111108" : "#1A1714" }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "#1E1A17")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = i === 0 ? "#111108" : "#1A1714")}
                >
                  <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                    {/* Rank + Score */}
                    <div className="flex items-center gap-4 flex-shrink-0">
                      <div className="text-center w-8">
                        <span
                          className="text-3xl font-light"
                          style={{ fontFamily: "var(--font-cormorant), Georgia, serif", color: "rgba(237,232,223,0.15)" }}
                        >
                          {opp.rank}
                        </span>
                      </div>
                      <ScoreRing score={opp.score} />
                    </div>

                    {/* Info */}
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-3 mb-3">
                        <div
                          className="w-8 h-8 rounded-sm flex items-center justify-center"
                          style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)" }}
                        >
                          <Icon size={15} style={{ color: "var(--gold)" }} />
                        </div>
                        <h3 className="text-xl font-medium" style={{ color: "var(--cream)", fontFamily: "var(--font-cormorant), Georgia, serif" }}>
                          {opp.type}
                        </h3>
                        {opp.tag && (
                          <span
                            className="px-2 py-1 text-xs rounded-sm"
                            style={{ background: i === 0 ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.06)", color: i === 0 ? "var(--gold)" : "rgba(237,232,223,0.4)", border: `1px solid ${i === 0 ? "rgba(255,255,255,0.4)" : "rgba(255,255,255,0.1)"}` }}
                          >
                            {opp.tag}
                          </span>
                        )}
                        <span
                          className="px-2 py-1 text-xs rounded-sm"
                          style={{ background: "rgba(74,222,128,0.08)", color: "#4ade80", border: "1px solid rgba(74,222,128,0.2)" }}
                        >
                          {opp.risk} Risk
                        </span>
                      </div>
                      <p className="text-sm leading-relaxed mb-5" style={{ color: "rgba(237,232,223,0.5)" }}>
                        {opp.desc}
                      </p>

                      {/* Metrics row */}
                      <div className="grid grid-cols-2 md:grid-cols-5 gap-px" style={{ background: "rgba(255,255,255,0.05)" }}>
                        {[
                          { label: "Est. Cost", val: opp.cost },
                          { label: "Monthly Rent", val: opp.monthlyRent },
                          { label: "Cap Rate", val: opp.capRate },
                          { label: "Payback", val: opp.payback },
                          { label: "Value Added", val: opp.valueAdd },
                        ].map((m) => (
                          <div key={m.label} className="px-4 py-3" style={{ background: "#0d0d0d" }}>
                            <div className="text-xs mb-1" style={{ color: "rgba(237,232,223,0.3)", letterSpacing: "0.08em" }}>{m.label}</div>
                            <div
                              className="text-base font-light"
                              style={{ fontFamily: "var(--font-cormorant), Georgia, serif", color: m.val === "N/A" ? "rgba(237,232,223,0.3)" : "var(--gold-light)" }}
                            >
                              {m.val}
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Pros / Cons */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        <div>
                          {opp.pros.map((p) => (
                            <div key={p} className="flex items-start gap-2 mb-1.5">
                              <CheckCircle size={12} className="mt-0.5 flex-shrink-0" style={{ color: "#4ade80" }} />
                              <span className="text-xs" style={{ color: "rgba(237,232,223,0.45)" }}>{p}</span>
                            </div>
                          ))}
                        </div>
                        <div>
                          {opp.cons.map((c) => (
                            <div key={c} className="flex items-start gap-2 mb-1.5">
                              <Info size={12} className="mt-0.5 flex-shrink-0" style={{ color: "rgba(237,232,223,0.3)" }} />
                              <span className="text-xs" style={{ color: "rgba(237,232,223,0.35)" }}>{c}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Risk factors */}
        <div className="grid lg:grid-cols-2 gap-px mb-12" style={{ background: "rgba(255,255,255,0.04)" }}>
          <div className="p-8" style={{ background: "#0d0d0d" }}>
            <h3 className="text-xs uppercase tracking-widest mb-6" style={{ color: "rgba(237,232,223,0.4)", letterSpacing: "0.18em" }}>
              Risk Assessment
            </h3>
            <div className="space-y-4">
              {report.riskFactors.map((r, i) => (
                <div key={i} className="flex items-start gap-3">
                  <AlertTriangle
                    size={14}
                    className="mt-0.5 flex-shrink-0"
                    style={{ color: riskColor[r.level as keyof typeof riskColor] }}
                  />
                  <span className="text-sm" style={{ color: "rgba(237,232,223,0.55)" }}>{r.text}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="p-8" style={{ background: "#0d0d0d" }}>
            <h3 className="text-xs uppercase tracking-widest mb-6" style={{ color: "rgba(237,232,223,0.4)", letterSpacing: "0.18em" }}>
              Recommended Strategy
            </h3>
            <p className="text-sm leading-relaxed mb-6" style={{ color: "rgba(237,232,223,0.6)" }}>
              {report.strategy}
            </p>
            <div
              className="p-4 rounded-sm"
              style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.15)" }}
            >
              <p className="text-xs" style={{ color: "rgba(255,255,255,0.7)", letterSpacing: "0.08em" }}>
                This is a preliminary analysis based on publicly available data. A full feasibility study includes site inspection, permit review, and lender pre-qualification.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div
          className="p-10 text-center rounded-sm"
          style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.15)" }}
        >
          <p className="text-xs uppercase tracking-widest mb-3" style={{ color: "var(--gold)", letterSpacing: "0.2em" }}>
            Ready to move forward?
          </p>
          <h3
            className="text-3xl font-light mb-4"
            style={{ fontFamily: "var(--font-cormorant), Georgia, serif", color: "var(--cream)" }}
          >
            Get your full feasibility study.
          </h3>
          <p className="text-sm mb-8 max-w-md mx-auto" style={{ color: "rgba(237,232,223,0.45)" }}>
            Jason Umana will personally review your property, walk through financing options, and build a custom project roadmap.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              className="px-8 py-3.5 text-xs font-semibold tracking-widest uppercase rounded-sm"
              style={{ background: "var(--gold)", color: "var(--obsidian)", letterSpacing: "0.12em" }}
            >
              Book Free Consultation
            </button>
            <button
              className="px-8 py-3.5 text-xs font-semibold tracking-widest uppercase rounded-sm"
              style={{ border: "1px solid rgba(255,255,255,0.3)", color: "var(--gold)", letterSpacing: "0.12em" }}
            >
              Download This Report
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
