"use client";

const ITEMS = [
  "ADU Investment Advisory",
  "Feasibility Studies",
  "ROI Analysis",
  "Financing Strategy",
  "Grant Identification",
  "Garage Conversions",
  "Home Additions",
  "Renovation ROI",
  "Asset Management",
  "House Hacking Strategy",
  "Rental Income Analysis",
  "All San Diego County",
];

export default function Ticker({ theme = "light" }: { theme?: "light" | "dark" }) {
  const repeated = [...ITEMS, ...ITEMS];
  const isLight = theme === "light";

  return (
    <div
      className="relative overflow-hidden py-3 border-y"
      style={{
        borderColor: isLight
          ? "rgba(12,10,8,0.08)"
          : "rgba(255,255,255,0.2)",
        background: isLight
          ? "rgba(12,10,8,0.03)"
          : "rgba(255,255,255,0.04)",
      }}
    >
      <div
        className="animate-ticker flex whitespace-nowrap"
        style={{ width: "max-content" }}
      >
        {repeated.map((item, i) => (
          <span key={i} className="flex items-center">
            <span
              className="text-xs uppercase px-6"
              style={{
                color: isLight
                  ? "rgba(12,10,8,0.32)"
                  : "rgba(255,255,255,0.7)",
                letterSpacing: "0.18em",
                fontFamily: "var(--font-dm-sans), sans-serif",
              }}
            >
              {item}
            </span>
            <span
              style={{
                color: isLight ? "rgba(12,10,8,0.18)" : "rgba(255,255,255,0.3)",
                fontSize: "5px",
              }}
            >
              ◆
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
