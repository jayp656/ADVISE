"use client";
import { useEffect, useRef, useState } from "react";

const PILLARS = [
  {
    num: "01",
    title: "Financial Modeling",
    desc: "Before a single permit is pulled, we model every scenario — projected rent, equity gain, payback period, financing cost. You know the return before you commit the capital.",
  },
  {
    num: "02",
    title: "Design for ROI",
    desc: "Every finish, fixture, and layout decision is evaluated against what the rental market actually pays for. Premium design isn't aesthetic — it's arithmetic.",
  },
  {
    num: "03",
    title: "Budget Control",
    desc: "We scope projects to hit the number that makes financial sense, not the number that impresses a showroom. The right build cost unlocks the best return.",
  },
  {
    num: "04",
    title: "Financing & Grant Access",
    desc: "CalHFA grants, HELOCs, DSCR loans, SB9 structures — we identify which programs your property qualifies for and sequence the capital correctly.",
  },
];

export default function SectionStrategy() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);
  const triggered = useRef(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && !triggered.current) {
          triggered.current = true;
          setVisible(true);
        }
      },
      { threshold: 0.12 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      style={{
        background: "#0E0C09",
        padding: "clamp(80px, 10vw, 140px) clamp(20px, 4vw, 48px)",
        overflow: "hidden",
      }}
    >
      <div style={{ maxWidth: 1360, margin: "0 auto" }}>

        {/* Label */}
        <p
          style={{
            fontSize: 9,
            letterSpacing: "0.32em",
            textTransform: "uppercase",
            color: "rgba(156,128,96,0.45)",
            fontFamily: "var(--font-dm-sans), sans-serif",
            marginBottom: 48,
            opacity: visible ? 1 : 0,
            transition: "opacity 1s ease 0.1s",
          }}
        >
          Section 04 · The Summit Lot Difference
        </p>

        {/* Contrast headline */}
        <div
          className="flex flex-col lg:flex-row lg:items-end"
          style={{
            gap: 48,
            marginBottom: 72,
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 1.2s ease 0.2s, transform 1.2s ease 0.2s",
          }}
        >
          <div style={{ flex: 1 }}>
            <h2
              style={{
                fontFamily: "var(--font-cormorant), Georgia, serif",
                fontSize: "clamp(40px, 5.2vw, 82px)",
                fontWeight: 300,
                color: "#EDE8DF",
                letterSpacing: "-0.025em",
                lineHeight: 1.04,
                margin: 0,
              }}
            >
              Most contractors
              <br />
              know how to build.
              <br />
              <span style={{ opacity: 0.35 }}>We know what to build,</span>
              <br />
              <span style={{ opacity: 0.35 }}>and why.</span>
            </h2>
          </div>

          <p
            style={{
              fontSize: 14,
              color: "rgba(237,232,223,0.28)",
              fontFamily: "var(--font-dm-sans), sans-serif",
              lineHeight: 1.88,
              maxWidth: 360,
              letterSpacing: "0.02em",
            }}
          >
            A general contractor optimizes for the build. Summit Lot
            optimizes for the return. We advise on the full picture —
            financial modeling, design decisions, budget control, and
            financing strategy — before the first permit is filed.
          </p>
        </div>

        {/* Divider line */}
        <div style={{
          height: 1,
          background: "rgba(237,232,223,0.06)",
          marginBottom: 0,
          opacity: visible ? 1 : 0,
          transition: "opacity 1s ease 0.5s",
        }} />

        {/* Two-column contrast */}
        <div
          className="flex flex-col md:flex-row"
          style={{
            marginBottom: 72,
            opacity: visible ? 1 : 0,
            transition: "opacity 1s ease 0.6s",
          }}
        >
          {/* GC column */}
          <div
            style={{
              flex: 1,
              padding: "32px 0 32px",
              borderRight: "1px solid rgba(237,232,223,0.06)",
              paddingRight: 40,
            }}
          >
            <p style={{
              fontSize: 9,
              letterSpacing: "0.28em",
              textTransform: "uppercase",
              color: "rgba(237,232,223,0.2)",
              fontFamily: "var(--font-dm-sans), sans-serif",
              marginBottom: 24,
            }}>
              General Contractor
            </p>
            {[
              "Provides a build quote",
              "Optimizes for construction speed",
              "Selects materials by availability",
              "Finished when the project is done",
              "No view of rental market",
              "No financing guidance",
            ].map((item, i) => (
              <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 12, marginBottom: 14 }}>
                <div style={{ width: 16, height: 1, background: "rgba(237,232,223,0.15)", marginTop: 9, flexShrink: 0 }} />
                <p style={{
                  fontSize: 13,
                  color: "rgba(237,232,223,0.22)",
                  fontFamily: "var(--font-dm-sans), sans-serif",
                  lineHeight: 1.6,
                  margin: 0,
                }}>
                  {item}
                </p>
              </div>
            ))}
          </div>

          {/* Summit Lot column */}
          <div style={{ flex: 1, padding: "32px 0 32px", paddingLeft: 40 }}>
            <p style={{
              fontSize: 9,
              letterSpacing: "0.28em",
              textTransform: "uppercase",
              color: "rgba(156,128,96,0.7)",
              fontFamily: "var(--font-dm-sans), sans-serif",
              marginBottom: 24,
            }}>
              Summit Lot
            </p>
            {[
              "Models ROI before the build begins",
              "Optimizes for rental income and equity",
              "Selects finishes by market return",
              "Manages the asset after completion",
              "Deep local rental market intelligence",
              "Grant identification and financing strategy",
            ].map((item, i) => (
              <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 12, marginBottom: 14 }}>
                <div style={{ width: 16, height: 1, background: "rgba(156,128,96,0.45)", marginTop: 9, flexShrink: 0 }} />
                <p style={{
                  fontSize: 13,
                  color: "rgba(237,232,223,0.55)",
                  fontFamily: "var(--font-dm-sans), sans-serif",
                  lineHeight: 1.6,
                  margin: 0,
                }}>
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Pillars */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "1px",
            background: "rgba(237,232,223,0.06)",
          }}
        >
          {PILLARS.map((p, i) => (
            <div
              key={p.num}
              style={{
                background: "#0E0C09",
                padding: "clamp(28px, 3.5vw, 48px)",
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(16px)",
                transition: `opacity 1s ease ${0.5 + i * 0.12}s, transform 1s ease ${0.5 + i * 0.12}s`,
              }}
            >
              <p style={{
                fontSize: 9,
                letterSpacing: "0.22em",
                color: "rgba(156,128,96,0.4)",
                fontFamily: "var(--font-dm-sans), sans-serif",
                marginBottom: 20,
              }}>
                {p.num}
              </p>
              <p style={{
                fontFamily: "var(--font-cormorant), Georgia, serif",
                fontSize: "clamp(20px, 2.2vw, 30px)",
                fontWeight: 300,
                color: "#EDE8DF",
                letterSpacing: "-0.01em",
                lineHeight: 1.15,
                marginBottom: 14,
              }}>
                {p.title}
              </p>
              <p style={{
                fontSize: 13,
                color: "rgba(237,232,223,0.3)",
                fontFamily: "var(--font-dm-sans), sans-serif",
                lineHeight: 1.78,
                maxWidth: 360,
              }}>
                {p.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
