"use client";
import { useEffect, useRef, useState } from "react";

const TESTIMONIALS = [
  {
    quote:
      "I had no idea my backyard had that kind of value. Jason walked me through zoning, financing, and contractor selection step by step. My ADU has been rented since the first week at $2,850 a month — it covers my entire mortgage.",
    name: "Maria T.",
    detail: "North Park · Detached ADU",
    outcome: "$2,850 / mo",
  },
  {
    quote:
      "I almost spent $60,000 on a pool renovation. Jason's analysis showed an ADU would generate six times the long-term return on the same footprint. I nearly made a very expensive mistake — this service paid for itself before I spent a dollar.",
    name: "Rachel M.",
    detail: "Encinitas · ADU vs. Renovation Analysis",
    outcome: "6× return vs. pool",
  },
  {
    quote:
      "The garage had been sitting empty for three years. Jason showed me it was my highest-value square footage. The conversion came in under budget at $108,000 and I'm at $2,400 a month. Under four years to full payback.",
    name: "David R.",
    detail: "Ocean Beach · Garage Conversion ADU",
    outcome: "$2,400 / mo · 3.9 yr payback",
  },
  {
    quote:
      "We had a corner lot we thought was just extra yard. Jason flagged the SB9 opportunity immediately — something our realtor had never mentioned in five years. Two new units where grass used to be. Both rented within two weeks.",
    name: "Sofia & Marco V.",
    detail: "Kensington · SB9 Lot Split",
    outcome: "2 units added · both rented",
  },
  {
    quote:
      "Jason's analysis flagged the CalHFA grant before I even knew it existed. Between the $40,000 grant and a HELOC draw, I funded the entire build without touching my savings. I genuinely didn't know the state would help pay for it.",
    name: "James K.",
    detail: "Hillcrest · Detached ADU + CalHFA Grant",
    outcome: "$40K grant secured",
  },
  {
    quote:
      "The feasibility study was thorough in a way I've never seen from anyone in this space. The ROI model ended up being accurate to within 4% of our actual first-year numbers. That's not a guess — that's real expertise.",
    name: "The Chen Family",
    detail: "Chula Vista · Multi-Unit Feasibility",
    outcome: "ROI model within 4% actual",
  },
];

export default function Testimonials() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      style={{ background: "#FAF8F4", padding: "120px 24px" }}
    >
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>

        {/* Header */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "flex-end",
            justifyContent: "space-between",
            gap: 24,
            marginBottom: 72,
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(16px)",
            transition: "opacity 0.8s ease, transform 0.8s ease",
          }}
        >
          <div>
            <p
              style={{
                fontSize: 10,
                letterSpacing: "0.26em",
                textTransform: "uppercase",
                color: "#9C8060",
                fontFamily: "var(--font-dm-sans), sans-serif",
                marginBottom: 16,
              }}
            >
              Client Outcomes
            </p>
            <h2
              style={{
                fontFamily: "var(--font-cormorant), Georgia, serif",
                fontSize: "clamp(44px, 6vw, 82px)",
                fontWeight: 300,
                color: "#1C1916",
                letterSpacing: "-0.025em",
                lineHeight: 0.95,
                margin: 0,
              }}
            >
              Results that
              <br />
              <span style={{ opacity: 0.45 }}>speak for themselves.</span>
            </h2>
          </div>
          <p
            style={{
              fontSize: 13,
              color: "rgba(12,10,8,0.4)",
              fontFamily: "var(--font-dm-sans), sans-serif",
              maxWidth: 300,
              lineHeight: 1.7,
              paddingBottom: 6,
            }}
          >
            Real San Diego homeowners. Real projects. Real returns — verified against actual outcomes.
          </p>
        </div>

        {/* Quote grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
            gap: 1,
            background: "rgba(12,10,8,0.06)",
          }}
        >
          {TESTIMONIALS.map((t, i) => (
            <div
              key={t.name}
              style={{
                background: "#FAF8F4",
                padding: "40px 36px",
                display: "flex",
                flexDirection: "column",
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(20px)",
                transition: `opacity 0.7s ease ${i * 0.08}s, transform 0.7s ease ${i * 0.08}s`,
              }}
            >
              {/* Large decorative quote mark */}
              <span
                aria-hidden
                style={{
                  fontFamily: "var(--font-cormorant), Georgia, serif",
                  fontSize: 80,
                  lineHeight: 0.6,
                  color: "rgba(156,128,96,0.18)",
                  marginBottom: 24,
                  userSelect: "none",
                  display: "block",
                }}
              >
                &ldquo;
              </span>

              {/* Quote body */}
              <p
                style={{
                  fontSize: 15,
                  lineHeight: 1.72,
                  color: "rgba(12,10,8,0.72)",
                  fontFamily: "var(--font-dm-sans), sans-serif",
                  flex: 1,
                  marginBottom: 32,
                }}
              >
                {t.quote}
              </p>

              {/* Attribution */}
              <div
                style={{
                  borderTop: "1px solid rgba(12,10,8,0.08)",
                  paddingTop: 20,
                  display: "flex",
                  alignItems: "flex-end",
                  justifyContent: "space-between",
                  gap: 12,
                  flexWrap: "wrap",
                }}
              >
                <div>
                  <p
                    style={{
                      fontSize: 13,
                      fontWeight: 500,
                      color: "#1C1916",
                      fontFamily: "var(--font-dm-sans), sans-serif",
                      marginBottom: 3,
                    }}
                  >
                    {t.name}
                  </p>
                  <p
                    style={{
                      fontSize: 10,
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      color: "rgba(12,10,8,0.38)",
                      fontFamily: "var(--font-dm-sans), sans-serif",
                    }}
                  >
                    {t.detail}
                  </p>
                </div>

                {/* Outcome pill */}
                <span
                  style={{
                    fontSize: 10,
                    letterSpacing: "0.1em",
                    color: "#9C8060",
                    fontFamily: "var(--font-dm-sans), sans-serif",
                    padding: "5px 12px",
                    border: "1px solid rgba(156,128,96,0.3)",
                    background: "rgba(156,128,96,0.06)",
                    whiteSpace: "nowrap",
                  }}
                >
                  {t.outcome}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Disclaimer */}
        <p
          style={{
            marginTop: 28,
            fontSize: 10,
            color: "rgba(12,10,8,0.25)",
            letterSpacing: "0.08em",
            fontFamily: "var(--font-dm-sans), sans-serif",
            textAlign: "center",
          }}
        >
          Names abbreviated for privacy · Outcomes reflect individual results and may vary
        </p>
      </div>
    </section>
  );
}
