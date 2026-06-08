"use client";
import { useState } from "react";
import { ArrowRight } from "lucide-react";

const SERVICES = [
  {
    num: "01",
    title: "Buy",
    desc: "We identify high-yield acquisition targets across San Diego County — ranked by opportunity score, zoning potential, and rental income projections.",
  },
  {
    num: "02",
    title: "Analyze",
    desc: "Investment-grade feasibility study for any property. Zoning analysis, cost modeling, cap rate projections, and risk assessment before you spend a dollar.",
  },
  {
    num: "03",
    title: "Finance",
    desc: "Structure your financing before you commit. HELOC, DSCR loans, construction financing, and grant identification — matched to your project and profile.",
  },
  {
    num: "04",
    title: "Build",
    desc: "When the numbers are right, we connect you with vetted licensed contractors, architects, and permit expediters across San Diego County.",
  },
  {
    num: "05",
    title: "Manage",
    desc: "Post-construction full asset management — leasing, tenant screening, rent optimization, and portfolio monitoring to protect your income stream.",
  },
  {
    num: "06",
    title: "Sell",
    desc: "Know when to hold and when to exit. We analyze exit timing, 1031 exchange opportunities, and resale positioning for maximum yield.",
  },
];

export default function DarkServicesSection() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section
      className="py-24 px-6"
      style={{ background: "var(--obsidian)" }}
    >
      <div className="max-w-7xl mx-auto">

        {/* Header — always visible, no scroll gate */}
        <div className="mb-20">
          <p
            className="text-xs uppercase mb-5"
            style={{
              color: "var(--gold)",
              letterSpacing: "0.22em",
              fontFamily: "var(--font-dm-sans), sans-serif",
            }}
          >
            Full-Service Advisory
          </p>
          <h2
            className="font-light leading-none"
            style={{
              fontFamily: "var(--font-cormorant), Georgia, serif",
              fontSize: "clamp(48px, 7vw, 96px)",
              color: "var(--cream)",
              letterSpacing: "-0.02em",
            }}
          >
            How Domaine
            <br />
            <em>can help you.</em>
          </h2>
        </div>

        {/* Service rows — always visible, content readable without hover */}
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
          {SERVICES.map((s, i) => {
            const isHov = hovered === i;
            return (
              <div
                key={s.num}
                className="relative flex items-center gap-0 overflow-hidden cursor-default"
                style={{
                  borderBottom: "1px solid rgba(255,255,255,0.07)",
                  padding: "clamp(18px,2.2vw,30px) 0",
                }}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
              >
                {/* Hover shimmer bg */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.05) 40%, rgba(255,255,255,0.07) 60%, transparent 100%)",
                    opacity: isHov ? 1 : 0,
                    transition: "opacity 0.25s ease",
                  }}
                />

                {/* Number */}
                <span
                  className="flex-shrink-0 text-xs transition-colors duration-200"
                  style={{
                    color: isHov ? "var(--gold)" : "rgba(237,232,223,0.22)",
                    letterSpacing: "0.12em",
                    width: "3.5rem",
                    fontFamily: "var(--font-dm-sans), sans-serif",
                  }}
                >
                  {s.num}
                </span>

                {/* Title — always cream, gold on hover */}
                <h3
                  className="flex-shrink-0 transition-colors duration-200"
                  style={{
                    fontFamily: "var(--font-cormorant), Georgia, serif",
                    fontSize: "clamp(38px, 5.2vw, 72px)",
                    color: isHov ? "var(--gold)" : "var(--cream)",
                    lineHeight: 1,
                    width: "clamp(190px, 22vw, 290px)",
                    letterSpacing: "-0.015em",
                  }}
                >
                  {s.title}
                </h3>

                {/* Description — visible at low opacity always; full on hover */}
                <p
                  className="hidden md:block flex-1 text-sm leading-relaxed"
                  style={{
                    color: isHov
                      ? "rgba(237,232,223,0.60)"
                      : "rgba(237,232,223,0.30)",
                    maxWidth: "520px",
                    transform: isHov ? "translateX(0)" : "translateX(8px)",
                    transition: "color 0.25s ease, transform 0.25s ease",
                    fontFamily: "var(--font-dm-sans), sans-serif",
                  }}
                >
                  {s.desc}
                </p>

                {/* Arrow */}
                <div
                  className="ml-auto flex-shrink-0 pr-1 transition-all duration-200"
                  style={{
                    opacity: isHov ? 1 : 0.15,
                    transform: isHov ? "translateX(0)" : "translateX(-6px)",
                    color: isHov ? "var(--gold)" : "var(--cream)",
                  }}
                >
                  <ArrowRight size={18} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
