"use client";
import { useEffect, useRef, useState } from "react";

const OPPORTUNITIES = [
  {
    rank: 1,
    title: "Garage Conversions",
    type: "Conversion",
    roi: "22–31%",
    cost: "$80K – $140K",
    score: 9.6,
    badge: "Highest Yield",
    desc: "Convert underutilized garage space into a legal rentable unit — lower cost, highest immediate yield on any residential lot.",
    featured: true,
  },
  {
    rank: 2,
    title: "Accessory Dwelling Units",
    type: "New Construction",
    roi: "18–24%",
    cost: "$150K – $280K",
    score: 9.2,
    badge: "Best Value",
    desc: "Detached or attached units that generate rental income and substantially increase assessed value.",
    featured: true,
  },
  {
    rank: 3,
    title: "House Hacking",
    type: "Owner Strategy",
    roi: "Variable",
    cost: "$0 – $80K",
    score: 8.5,
    badge: "Most Popular",
    desc: "Owner-occupancy strategies that use rental income to offset or eliminate your entire mortgage payment.",
    featured: true,
  },
  {
    rank: 4,
    title: "Investment Acquisitions",
    type: "Acquisition",
    roi: "Market-dep.",
    cost: "Varies",
    score: 8.1,
    badge: null,
    desc: "Identify high-yield acquisition targets and value-add opportunities across San Diego County.",
    featured: false,
  },
  {
    rank: 5,
    title: "Rental Property Improvements",
    type: "Upgrade",
    roi: "15–25%",
    cost: "$20K – $60K",
    score: 7.9,
    badge: null,
    desc: "Targeted upgrades on income properties to increase rents, reduce vacancy, and compress cap rate.",
    featured: false,
  },
  {
    rank: 6,
    title: "Home Additions",
    type: "Addition",
    roi: "12–18%",
    cost: "$120K – $220K",
    score: 7.4,
    badge: null,
    desc: "Expand square footage to increase appraisal value and qualify for higher-value rentals or resale.",
    featured: false,
  },
  {
    rank: 7,
    title: "Whole-Home Renovations",
    type: "Full Renovation",
    roi: "10–16%",
    cost: "$90K – $200K",
    score: 6.8,
    badge: null,
    desc: "Strategic full renovations maximizing resale value or commanding premium rents.",
    featured: false,
  },
  {
    rank: 8,
    title: "Kitchen Remodels",
    type: "Remodel",
    roi: "8–14%",
    cost: "$30K – $80K",
    score: 6.2,
    badge: null,
    desc: "High-visibility upgrade with strong appraisal and marketability impact across all price points.",
    featured: false,
  },
  {
    rank: 9,
    title: "Bathroom Remodels",
    type: "Remodel",
    roi: "7–13%",
    cost: "$15K – $45K",
    score: 5.8,
    badge: null,
    desc: "Targeted improvements with fast ROI realization and broad buyer and renter appeal.",
    featured: false,
  },
];

const featured = OPPORTUNITIES.filter((o) => o.featured);
const rest = OPPORTUNITIES.filter((o) => !o.featured);

export default function OpportunityTypes() {
  const [hovered, setHovered] = useState<number | null>(null);
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.05 }
    );
    if (ref.current) obs.observe(ref.current);
    const t = setTimeout(() => setVisible(true), 700);
    return () => { obs.disconnect(); clearTimeout(t); };
  }, []);

  return (
    <section
      ref={ref}
      id="opportunities"
      className="py-24 px-6"
      style={{ background: "var(--obsidian)" }}
    >
      <div className="max-w-7xl mx-auto">

        {/* ── Header ── */}
        <div className="mb-16">
          <p
            className="text-xs uppercase mb-5"
            style={{ color: "rgba(255,255,255,0.4)", letterSpacing: "0.22em", fontFamily: "var(--font-dm-sans), sans-serif" }}
          >
            What We Analyze
          </p>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 lg:gap-20">
            <h2
              className="font-light leading-none"
              style={{
                fontFamily: "var(--font-cormorant), Georgia, serif",
                fontSize: "clamp(54px, 8.5vw, 116px)",
                color: "var(--cream)",
                letterSpacing: "-0.025em",
              }}
            >
              Every opportunity,
              <br />
              <em>ranked by return.</em>
            </h2>
            <p
              style={{
                color: "rgba(237,232,223,0.36)",
                fontFamily: "var(--font-dm-sans), sans-serif",
                fontSize: 14,
                lineHeight: 1.7,
                maxWidth: 360,
                flexShrink: 0,
              }}
            >
              Before you commit $100K–$500K, we show you which project
              generates the highest return on your specific property —
              scored and ranked side by side.
            </p>
          </div>
        </div>

        {/* ── Top 3 editorial strips ── */}
        <div
          className="grid grid-cols-1 md:grid-cols-3 mb-px"
          style={{
            background: "rgba(255,255,255,0.05)",
            gap: "1px",
          }}
        >
          {featured.map((opp, i) => {
            const isHov = hovered === i;
            return (
              <div
                key={opp.rank}
                className="relative overflow-hidden flex flex-col justify-between"
                style={{
                  background: isHov ? "#181818" : "#1E1A17",
                  padding: "36px 32px 32px",
                  minHeight: 400,
                  transition: "background 0.25s ease",
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateY(0)" : "translateY(24px)",
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  ...(({ transition: `opacity 0.6s ease ${i * 0.1}s, transform 0.6s ease ${i * 0.1}s, background 0.25s ease` } as any)),
                }}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
              >
                {/* Ghost rank number — bottom right */}
                <div
                  aria-hidden
                  style={{
                    position: "absolute",
                    bottom: -24,
                    right: -8,
                    fontFamily: "var(--font-cormorant), Georgia, serif",
                    fontSize: "clamp(130px, 16vw, 200px)",
                    fontWeight: 300,
                    fontStyle: "normal",
                    color: "rgba(255,255,255,0.04)",
                    lineHeight: 1,
                    pointerEvents: "none",
                    userSelect: "none",
                  }}
                >
                  {String(opp.rank).padStart(2, "0")}
                </div>

                {/* Top: type + badge */}
                <div>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 28 }}>
                    <span
                      style={{
                        fontSize: 9,
                        letterSpacing: "0.22em",
                        textTransform: "uppercase",
                        color: "rgba(255,255,255,0.28)",
                        fontFamily: "var(--font-dm-sans), sans-serif",
                      }}
                    >
                      {opp.type}
                    </span>
                    {opp.badge && (
                      <span
                        style={{
                          fontSize: 8,
                          letterSpacing: "0.18em",
                          textTransform: "uppercase",
                          color: "rgba(255,255,255,0.38)",
                          fontFamily: "var(--font-dm-sans), sans-serif",
                        }}
                      >
                        {opp.badge}
                      </span>
                    )}
                  </div>

                  {/* Title */}
                  <h3
                    style={{
                      fontFamily: "var(--font-cormorant), Georgia, serif",
                      fontSize: "clamp(22px, 2.4vw, 30px)",
                      fontWeight: 400,
                      color: isHov ? "#FFFFFF" : "rgba(237,232,223,0.85)",
                      letterSpacing: "-0.01em",
                      lineHeight: 1.1,
                      marginBottom: 14,
                      transition: "color 0.25s ease",
                    }}
                  >
                    {opp.title}
                  </h3>

                  {/* Description */}
                  <p
                    style={{
                      fontSize: 12,
                      color: isHov ? "rgba(237,232,223,0.45)" : "rgba(237,232,223,0.28)",
                      lineHeight: 1.65,
                      fontFamily: "var(--font-dm-sans), sans-serif",
                      transition: "color 0.25s ease",
                    }}
                  >
                    {opp.desc}
                  </p>
                </div>

                {/* Bottom: score + data */}
                <div style={{ position: "relative", zIndex: 1 }}>
                  {/* Score */}
                  <div style={{ marginBottom: 16 }}>
                    <p
                      style={{
                        fontSize: 9,
                        letterSpacing: "0.2em",
                        textTransform: "uppercase",
                        color: "rgba(255,255,255,0.18)",
                        fontFamily: "var(--font-dm-sans), sans-serif",
                        marginBottom: 2,
                      }}
                    >
                      Score
                    </p>
                    <span
                      style={{
                        fontFamily: "var(--font-cormorant), Georgia, serif",
                        fontSize: "clamp(64px, 7vw, 96px)",
                        fontWeight: 300,
                        color: isHov ? "#FFFFFF" : "rgba(237,232,223,0.82)",
                        lineHeight: 1,
                        display: "block",
                        transition: "color 0.25s ease",
                      }}
                    >
                      {opp.score}
                    </span>
                  </div>

                  {/* Hairline + ROI / Cost */}
                  <div
                    style={{
                      borderTop: "1px solid rgba(255,255,255,0.08)",
                      paddingTop: 14,
                      display: "flex",
                      gap: 28,
                    }}
                  >
                    <div>
                      <p style={{ fontSize: 8, letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(255,255,255,0.18)", fontFamily: "var(--font-dm-sans), sans-serif", marginBottom: 3 }}>
                        Avg. ROI
                      </p>
                      <p style={{ fontSize: 13, color: "rgba(237,232,223,0.62)", fontFamily: "var(--font-dm-sans), sans-serif" }}>
                        {opp.roi}
                      </p>
                    </div>
                    <div>
                      <p style={{ fontSize: 8, letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(255,255,255,0.18)", fontFamily: "var(--font-dm-sans), sans-serif", marginBottom: 3 }}>
                        Est. Cost
                      </p>
                      <p style={{ fontSize: 13, color: "rgba(237,232,223,0.38)", fontFamily: "var(--font-dm-sans), sans-serif" }}>
                        {opp.cost}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ── Remaining 6 — compact table ── */}
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
          {/* Column labels */}
          <div
            className="hidden lg:grid py-3"
            style={{
              gridTemplateColumns: "52px 1fr 150px 100px 110px 160px",
              gap: "0 16px",
              borderBottom: "1px solid rgba(255,255,255,0.04)",
            }}
          >
            {["#", "Opportunity", "Type", "Score", "Avg. ROI", "Est. Cost"].map((h) => (
              <span
                key={h}
                style={{
                  fontSize: 9,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.18)",
                  fontFamily: "var(--font-dm-sans), sans-serif",
                }}
              >
                {h}
              </span>
            ))}
          </div>

          {rest.map((opp, i) => {
            const idx = i + 3;
            const isHov = hovered === idx;
            return (
              <div
                key={opp.rank}
                onMouseEnter={() => setHovered(idx)}
                onMouseLeave={() => setHovered(null)}
                style={{
                  borderTop: i === 0 ? "none" : "1px solid rgba(255,255,255,0.04)",
                  borderLeft: isHov ? "2px solid rgba(255,255,255,0.2)" : "2px solid transparent",
                  background: isHov ? "rgba(255,255,255,0.02)" : "transparent",
                  paddingLeft: 8,
                  paddingRight: 8,
                  transition: "all 0.2s ease",
                  opacity: visible ? 1 : 0,
                  // stagger after the featured strips
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  ...(({ transition: `opacity 0.5s ease ${0.3 + i * 0.06}s, border-color 0.2s ease, background 0.2s ease` } as any)),
                }}
              >
                {/* Desktop */}
                <div
                  className="hidden lg:grid items-center py-[18px]"
                  style={{ gridTemplateColumns: "52px 1fr 150px 100px 110px 160px", gap: "0 16px" }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-cormorant), Georgia, serif",
                      fontSize: 20,
                      fontWeight: 300,
                      fontStyle: "normal",
                      color: isHov ? "rgba(255,255,255,0.32)" : "rgba(255,255,255,0.08)",
                      transition: "color 0.2s ease",
                    }}
                  >
                    {String(opp.rank).padStart(2, "0")}
                  </span>

                  <div>
                    <span
                      style={{
                        fontFamily: "var(--font-cormorant), Georgia, serif",
                        fontSize: 18,
                        fontWeight: 500,
                        color: isHov ? "var(--cream)" : "rgba(237,232,223,0.58)",
                        transition: "color 0.2s ease",
                        display: "block",
                      }}
                    >
                      {opp.title}
                    </span>
                    <div style={{ maxHeight: isHov ? 52 : 0, overflow: "hidden", transition: "max-height 0.3s ease" }}>
                      <p style={{ fontSize: 11, color: "rgba(237,232,223,0.32)", fontFamily: "var(--font-dm-sans), sans-serif", lineHeight: 1.6, paddingTop: 5 }}>
                        {opp.desc}
                      </p>
                    </div>
                  </div>

                  <span style={{ fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.2)", fontFamily: "var(--font-dm-sans), sans-serif" }}>
                    {opp.type}
                  </span>

                  <span
                    style={{
                      fontFamily: "var(--font-cormorant), Georgia, serif",
                      fontSize: 26,
                      fontWeight: 300,
                      color: isHov ? "rgba(255,255,255,0.7)" : "rgba(255,255,255,0.32)",
                      lineHeight: 1,
                      transition: "color 0.2s ease",
                    }}
                  >
                    {opp.score}
                  </span>

                  <span style={{ fontSize: 12, color: "rgba(255,255,255,0.36)", fontFamily: "var(--font-dm-sans), sans-serif" }}>
                    {opp.roi}
                  </span>

                  <span style={{ fontSize: 12, color: "rgba(255,255,255,0.22)", fontFamily: "var(--font-dm-sans), sans-serif" }}>
                    {opp.cost}
                  </span>
                </div>

                {/* Mobile */}
                <div className="flex lg:hidden items-start gap-4 py-4">
                  <span
                    style={{
                      fontFamily: "var(--font-cormorant), Georgia, serif",
                      fontSize: 18,
                      fontWeight: 300,
                      fontStyle: "normal",
                      color: "rgba(255,255,255,0.1)",
                      minWidth: 28,
                      paddingTop: 2,
                    }}
                  >
                    {String(opp.rank).padStart(2, "0")}
                  </span>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 8 }}>
                      <span style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontSize: 17, fontWeight: 500, color: "rgba(237,232,223,0.8)" }}>
                        {opp.title}
                      </span>
                      <span style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontSize: 22, fontWeight: 300, color: "rgba(255,255,255,0.4)" }}>
                        {opp.score}
                      </span>
                    </div>
                    <div style={{ display: "flex", gap: 12, marginTop: 4 }}>
                      <span style={{ fontSize: 11, color: "rgba(255,255,255,0.42)", fontFamily: "var(--font-dm-sans), sans-serif" }}>{opp.roi}</span>
                      <span style={{ fontSize: 11, color: "rgba(255,255,255,0.22)", fontFamily: "var(--font-dm-sans), sans-serif" }}>{opp.cost}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ── Footer ── */}
        <div
          className="mt-8 pt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
          style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
        >
          <p
            style={{
              fontSize: 10,
              color: "rgba(237,232,223,0.16)",
              letterSpacing: "0.08em",
              fontFamily: "var(--font-dm-sans), sans-serif",
            }}
          >
            Scores reflect average returns across 200+ San Diego County projects. Individual results vary by property and market conditions.
          </p>
          <a
            href="#search"
            style={{
              fontSize: 10,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.55)",
              fontFamily: "var(--font-dm-sans), sans-serif",
              textDecoration: "none",
              flexShrink: 0,
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#FFFFFF")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.55)")}
          >
            Score My Property →
          </a>
        </div>
      </div>
    </section>
  );
}
