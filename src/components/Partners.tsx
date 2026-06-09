"use client";
import { useState } from "react";
import { CheckCircle } from "lucide-react";

const PARTNERS = [
  {
    initials: "PCB",
    name: "Pacific Coast Builders",
    role: "General Contractor",
    license: "CSLB Class B",
    since: "2020",
    desc: "Full-service GC specializing in ADU and light commercial builds across San Diego County.",
    verified: true,
  },
  {
    initials: "SDS",
    name: "Solana Design Studio",
    role: "Architecture",
    license: "AIA Licensed",
    since: "2019",
    desc: "Design-forward residential architecture. Specialists in ADU permitting and SB9 compliance.",
    verified: true,
  },
  {
    initials: "MCL",
    name: "Mesa Capital Lending",
    role: "Financing",
    license: "NMLS Licensed",
    since: "2020",
    desc: "DSCR, HELOC, and construction loan specialists for investment property financing.",
    verified: true,
  },
  {
    initials: "APA",
    name: "Anchor Property Mgmt",
    role: "Property Management",
    license: "DRE Licensed",
    since: "2021",
    desc: "Full-service leasing, tenant screening, and asset management for income properties.",
    verified: true,
  },
  {
    initials: "SDP",
    name: "SD Permit Pros",
    role: "Permitting",
    license: "City Expediter",
    since: "2021",
    desc: "Permit expediting specialists. Reduce permitting time by 30–50% on average.",
    verified: true,
  },
];

export default function Partners() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section id="partners" className="py-24 px-6" style={{ background: "#161210" }}>
      <div className="max-w-7xl mx-auto">

        <div className="mb-16">
          <p className="text-xs uppercase mb-4" style={{ color: "var(--gold)", letterSpacing: "0.2em", fontFamily: "var(--font-dm-sans), sans-serif" }}>
            Vetted Partner Network
          </p>
          <h2 className="font-light" style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontSize: "clamp(44px, 6vw, 76px)", color: "var(--cream)", letterSpacing: "-0.02em" }}>
            The team
            <br />
            <em>behind the build.</em>
          </h2>
        </div>

        {/* Table header */}
        <div
          className="hidden lg:grid grid-cols-12 px-4 py-3 mb-1"
          style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
        >
          {(["Partner", "Role", "License", "Description", "Since"] as const).map((h, i) => (
            <div
              key={h}
              className={`text-xs uppercase col-span-${[3, 2, 2, 4, 1][i]}`}
              style={{ color: "rgba(237,232,223,0.2)", letterSpacing: "0.16em", fontFamily: "var(--font-dm-sans), sans-serif" }}
            >
              {h}
            </div>
          ))}
        </div>

        <div className="space-y-px" style={{ background: "rgba(255,255,255,0.03)" }}>
          {PARTNERS.map((p, i) => {
            const isHov = hovered === i;
            return (
              <div
                key={p.name}
                className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-0 px-4 py-5 lg:py-5 items-center transition-colors duration-200 cursor-default"
                style={{ background: isHov ? "rgba(255,255,255,0.04)" : "#161210", borderLeft: isHov ? "2px solid rgba(255,255,255,0.35)" : "2px solid transparent" }}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
              >
                {/* Logo initial + name */}
                <div className="lg:col-span-3 flex items-center gap-3">
                  <div
                    className="w-9 h-9 rounded-sm flex items-center justify-center text-xs font-semibold flex-shrink-0 transition-colors duration-200"
                    style={{
                      background: isHov ? "rgba(255,255,255,0.15)" : "rgba(255,255,255,0.05)",
                      border: isHov ? "1px solid rgba(255,255,255,0.3)" : "1px solid rgba(255,255,255,0.08)",
                      color: isHov ? "var(--gold)" : "rgba(237,232,223,0.4)",
                      letterSpacing: "0.04em",
                      fontFamily: "var(--font-dm-sans), sans-serif",
                    }}
                  >
                    {p.initials}
                  </div>
                  <span className="text-sm font-medium" style={{ color: "var(--cream)", fontFamily: "var(--font-dm-sans), sans-serif" }}>
                    {p.name}
                  </span>
                </div>

                {/* Role */}
                <div className="lg:col-span-2">
                  <span className="text-xs" style={{ color: "rgba(237,232,223,0.42)", fontFamily: "var(--font-dm-sans), sans-serif" }}>
                    {p.role}
                  </span>
                </div>

                {/* License badge + verified */}
                <div className="lg:col-span-2 flex items-center gap-2">
                  <span
                    className="text-xs px-2.5 py-1 rounded-sm inline-flex items-center gap-1.5"
                    style={{
                      background: "rgba(255,255,255,0.08)",
                      color: "var(--gold)",
                      border: "1px solid rgba(255,255,255,0.2)",
                      fontFamily: "var(--font-dm-sans), sans-serif",
                      letterSpacing: "0.04em",
                    }}
                  >
                    {p.verified && (
                      <CheckCircle size={10} style={{ color: "rgba(237,232,223,0.55)", flexShrink: 0 }} />
                    )}
                    {p.license}
                  </span>
                </div>

                {/* Description */}
                <div className="lg:col-span-4">
                  <span
                    className="text-xs leading-relaxed"
                    style={{
                      color: isHov ? "rgba(237,232,223,0.52)" : "rgba(237,232,223,0.32)",
                      transition: "color 0.2s ease",
                      fontFamily: "var(--font-dm-sans), sans-serif",
                    }}
                  >
                    {p.desc}
                  </span>
                </div>

                {/* Since */}
                <div className="lg:col-span-1 text-right">
                  <span className="text-xs" style={{ color: "rgba(237,232,223,0.22)", fontFamily: "var(--font-dm-sans), sans-serif" }}>
                    {p.since}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer note */}
        <p
          className="mt-8 text-xs"
          style={{
            color: "rgba(237,232,223,0.2)",
            letterSpacing: "0.08em",
            fontFamily: "var(--font-dm-sans), sans-serif",
          }}
        >
          All partners independently licensed and vetted. Summit Lot maintains no ownership interest in any partner firm.
        </p>
      </div>
    </section>
  );
}
