"use client";
import { useEffect, useRef, useState } from "react";

const OPEN_ROLE = {
  title: "Assistant — Property Strategy",
  type: "Entry Level · Hybrid",
  location: "San Diego, CA · Hybrid",
  compensation: "$35 / hr",
  education: "Bachelor's degree in Real Estate, Business, Finance, or related field",
  desc: "We're looking for a sharp, curious person who wants to learn the full picture of real estate — not just how to build, but how to think. You'll work directly alongside the founder on client properties: research, analysis, coordination, and design support.",
  responsibilities: [
    "Property research and market comp analysis",
    "Assist with financial modeling and ROI projections",
    "Coordinate with contractors, designers, and clients",
    "Support interior design sourcing and staging",
    "Help manage project timelines and documentation",
  ],
  qualities: [
    "Bachelor's degree in Real Estate, Business, Finance, or related field",
    "Curious about real estate, design, and investment strategy",
    "Detail-oriented and self-directed",
    "Strong written and visual communication",
    "Interest in the San Diego property market",
  ],
};

const FUTURE_ROLES = [
  { title: "Property Analyst", desc: "Financial modeling, market research, ROI analysis." },
  { title: "Project Manager", desc: "End-to-end coordination of ADU and renovation builds." },
  { title: "Interior Design Consultant", desc: "Premium staging and finish selection for rental optimization." },
  { title: "Client Advisor", desc: "Guide homeowners through the full Summit Lot process." },
];

export default function SectionCareers() {
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
      { threshold: 0.1 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      id="careers"
      style={{
        background: "#080604",
        padding: "clamp(80px, 10vw, 140px) clamp(20px, 4vw, 48px)",
        overflow: "hidden",
      }}
    >
      <div style={{ maxWidth: 1360, margin: "0 auto" }}>

        {/* Header */}
        <div
          style={{
            marginBottom: 72,
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(16px)",
            transition: "opacity 1.2s ease, transform 1.2s ease",
          }}
        >
          <p style={{
            fontSize: 9,
            letterSpacing: "0.32em",
            textTransform: "uppercase",
            color: "rgba(156,128,96,0.45)",
            fontFamily: "var(--font-dm-sans), sans-serif",
            marginBottom: 24,
          }}>
            Careers · Summit Lot
          </p>
          <h2 style={{
            fontFamily: "var(--font-cormorant), Georgia, serif",
            fontSize: "clamp(40px, 5vw, 78px)",
            fontWeight: 300,
            color: "#EDE8DF",
            letterSpacing: "-0.025em",
            lineHeight: 1.04,
            margin: "0 0 24px",
          }}>
            Build something
            <br />
            <span style={{ opacity: 0.35 }}>worth pointing to.</span>
          </h2>
          <p style={{
            fontSize: 14,
            color: "rgba(237,232,223,0.28)",
            fontFamily: "var(--font-dm-sans), sans-serif",
            lineHeight: 1.88,
            maxWidth: 460,
            letterSpacing: "0.02em",
          }}>
            We're a small, focused team. Every person here touches real
            projects, real clients, and real outcomes. If you want to learn
            how property strategy actually works — from the financial model
            to the finished unit — this is that place.
          </p>
        </div>

        {/* Open role */}
        <div
          style={{
            border: "1px solid rgba(156,128,96,0.2)",
            marginBottom: 64,
            opacity: visible ? 1 : 0,
            transition: "opacity 1.2s ease 0.3s",
          }}
        >
          {/* Role header */}
          <div style={{
            padding: "clamp(24px, 3vw, 40px)",
            borderBottom: "1px solid rgba(156,128,96,0.12)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            flexWrap: "wrap",
            gap: 16,
          }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10 }}>
                <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#9C8060" }} />
                <span style={{
                  fontSize: 8,
                  letterSpacing: "0.28em",
                  textTransform: "uppercase",
                  color: "rgba(156,128,96,0.7)",
                  fontFamily: "var(--font-dm-sans), sans-serif",
                }}>
                  Now Hiring
                </span>
              </div>
              <h3 style={{
                fontFamily: "var(--font-cormorant), Georgia, serif",
                fontSize: "clamp(24px, 3vw, 40px)",
                fontWeight: 300,
                color: "#EDE8DF",
                letterSpacing: "-0.02em",
                lineHeight: 1.1,
                margin: 0,
              }}>
                {OPEN_ROLE.title}
              </h3>
            </div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 8 }}>
              <span style={{
                fontSize: 8,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "rgba(237,232,223,0.35)",
                fontFamily: "var(--font-dm-sans), sans-serif",
                border: "1px solid rgba(237,232,223,0.1)",
                padding: "5px 12px",
              }}>
                {OPEN_ROLE.type}
              </span>
              <span style={{
                fontFamily: "var(--font-cormorant), Georgia, serif",
                fontSize: 22,
                fontWeight: 300,
                color: "#9C8060",
                letterSpacing: "-0.01em",
              }}>
                {OPEN_ROLE.compensation}
              </span>
              <span style={{
                fontSize: 9,
                color: "rgba(237,232,223,0.22)",
                fontFamily: "var(--font-dm-sans), sans-serif",
                letterSpacing: "0.1em",
              }}>
                {OPEN_ROLE.location}
              </span>
            </div>
          </div>

          {/* Role body */}
          <div
            className="flex flex-col md:flex-row"
            style={{ padding: "clamp(24px, 3vw, 40px)", gap: 48 }}
          >
            <div style={{ flex: 2 }}>
              <p style={{
                fontSize: 14,
                color: "rgba(237,232,223,0.38)",
                fontFamily: "var(--font-dm-sans), sans-serif",
                lineHeight: 1.85,
                marginBottom: 32,
              }}>
                {OPEN_ROLE.desc}
              </p>
              <p style={{
                fontSize: 9,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "rgba(156,128,96,0.5)",
                fontFamily: "var(--font-dm-sans), sans-serif",
                marginBottom: 16,
              }}>
                You'll work on
              </p>
              {OPEN_ROLE.responsibilities.map((r, i) => (
                <div key={i} style={{ display: "flex", gap: 12, marginBottom: 10 }}>
                  <div style={{ width: 14, height: 1, background: "rgba(156,128,96,0.35)", marginTop: 9, flexShrink: 0 }} />
                  <p style={{
                    fontSize: 13,
                    color: "rgba(237,232,223,0.38)",
                    fontFamily: "var(--font-dm-sans), sans-serif",
                    lineHeight: 1.65,
                    margin: 0,
                  }}>
                    {r}
                  </p>
                </div>
              ))}
            </div>

            <div style={{ flex: 1 }}>
              <p style={{
                fontSize: 9,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "rgba(156,128,96,0.5)",
                fontFamily: "var(--font-dm-sans), sans-serif",
                marginBottom: 16,
              }}>
                What we're looking for
              </p>
              {OPEN_ROLE.qualities.map((q, i) => (
                <div key={i} style={{ display: "flex", gap: 12, marginBottom: 10 }}>
                  <div style={{ width: 14, height: 1, background: "rgba(156,128,96,0.25)", marginTop: 9, flexShrink: 0 }} />
                  <p style={{
                    fontSize: 13,
                    color: "rgba(237,232,223,0.32)",
                    fontFamily: "var(--font-dm-sans), sans-serif",
                    lineHeight: 1.65,
                    margin: 0,
                  }}>
                    {q}
                  </p>
                </div>
              ))}

              {/* Apply CTA */}
              <a
                href="mailto:jasonu602@gmail.com?subject=Application — Assistant, Property Strategy"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 10,
                  marginTop: 32,
                  padding: "14px 28px",
                  background: "#9C8060",
                  color: "#0C0A08",
                  fontSize: 9,
                  letterSpacing: "0.24em",
                  textTransform: "uppercase",
                  textDecoration: "none",
                  fontFamily: "var(--font-dm-sans), sans-serif",
                  fontWeight: 500,
                  transition: "background 0.2s ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "#B09878")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "#9C8060")}
              >
                Apply Now →
              </a>
            </div>
          </div>
        </div>

        {/* Future roles */}
        <div
          style={{
            opacity: visible ? 1 : 0,
            transition: "opacity 1s ease 0.7s",
          }}
        >
          <p style={{
            fontSize: 9,
            letterSpacing: "0.28em",
            textTransform: "uppercase",
            color: "rgba(237,232,223,0.18)",
            fontFamily: "var(--font-dm-sans), sans-serif",
            marginBottom: 24,
          }}>
            Future Roles
          </p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: "1px",
              background: "rgba(237,232,223,0.05)",
            }}
          >
            {FUTURE_ROLES.map((r) => (
              <div key={r.title} style={{ background: "#080604", padding: "24px 28px" }}>
                <p style={{
                  fontSize: 14,
                  color: "rgba(237,232,223,0.25)",
                  fontFamily: "var(--font-cormorant), Georgia, serif",
                  fontWeight: 300,
                  letterSpacing: "-0.01em",
                  marginBottom: 8,
                }}>
                  {r.title}
                </p>
                <p style={{
                  fontSize: 12,
                  color: "rgba(237,232,223,0.15)",
                  fontFamily: "var(--font-dm-sans), sans-serif",
                  lineHeight: 1.6,
                  margin: 0,
                }}>
                  {r.desc}
                </p>
              </div>
            ))}
          </div>
          <p style={{
            fontSize: 10,
            color: "rgba(237,232,223,0.14)",
            fontFamily: "var(--font-dm-sans), sans-serif",
            letterSpacing: "0.08em",
            marginTop: 20,
          }}>
            Don't see your role? Reach out anyway — jasonu602@gmail.com
          </p>
        </div>

      </div>
    </section>
  );
}
