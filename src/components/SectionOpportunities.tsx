"use client";
import { useEffect, useRef, useState } from "react";

const ADU_TYPES = [
  {
    num: "01",
    type: "Detached ADU",
    desc: "A freestanding cottage, studio, or 1BR built in the rear yard. The highest-value ADU configuration in San Diego.",
    income: "$2,200 – $2,800",
    equity: "+$175,000 – $220,000",
    payback: "4.2 yr avg payback",
    delay: 0.2,
  },
  {
    num: "02",
    type: "Garage Conversion",
    desc: "Convert an existing attached or detached garage into a permitted, rentable living unit. Lowest cost-to-build ratio.",
    income: "$1,600 – $2,100",
    equity: "+$85,000 – $115,000",
    payback: "3.1 yr avg payback",
    delay: 0.55,
  },
  {
    num: "03",
    type: "Junior ADU",
    desc: "A code-compliant unit within the footprint of the main home — a converted bedroom, addition, or interior suite.",
    income: "$900 – $1,500",
    equity: "+$55,000 – $80,000",
    payback: "2.8 yr avg payback",
    delay: 0.9,
  },
];

export default function SectionOpportunities() {
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
      { threshold: 0.15 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      id="opportunities"
      style={{ background: "#0C0A08", minHeight: "100svh", overflow: "hidden" }}
    >
      {/* Property image — upper portion */}
      <div
        style={{
          position: "relative",
          height: "52svh",
          minHeight: 320,
          overflow: "hidden",
        }}
      >
        <img
          src="https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=2400&q=90&fit=crop&crop=center"
          alt="San Diego residential property showing ADU potential"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center 45%",
            opacity: visible ? 0.55 : 0,
            filter: "saturate(0.75)",
            transition: "opacity 2s ease",
          }}
        />
        {/* Gradient into bottom panel */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to bottom, rgba(12,10,8,0.2) 0%, rgba(12,10,8,0.1) 50%, rgba(12,10,8,1) 100%)",
          }}
        />

        {/* Section label — top left */}
        <div
          style={{
            position: "absolute",
            top: 40,
            left: 48,
            opacity: visible ? 1 : 0,
            transition: "opacity 1s ease 0.4s",
          }}
        >
          <p
            style={{
              fontSize: 9,
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: "rgba(156,128,96,0.65)",
              fontFamily: "var(--font-dm-sans), sans-serif",
            }}
          >
            Section 03 · ADU Opportunities
          </p>
        </div>
      </div>

      {/* Content panel */}
      <div
        style={{
          maxWidth: 1360,
          margin: "0 auto",
          padding: "0 48px 96px",
        }}
      >
        {/* Headline */}
        <div
          style={{
            marginBottom: 56,
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(16px)",
            transition: "opacity 1.2s ease 0.3s, transform 1.2s ease 0.3s",
          }}
        >
          <h2
            style={{
              fontFamily: "var(--font-cormorant), Georgia, serif",
              fontSize: "clamp(40px, 5vw, 76px)",
              fontWeight: 300,
              color: "#EDE8DF",
              letterSpacing: "-0.025em",
              lineHeight: 1.04,
              margin: "0 0 16px",
            }}
          >
            Your property qualifies
            <br />
            <span style={{ opacity: 0.4 }}>for an ADU.</span>
          </h2>
          <p
            style={{
              fontSize: 14,
              color: "rgba(237,232,223,0.3)",
              fontFamily: "var(--font-dm-sans), sans-serif",
              letterSpacing: "0.04em",
              lineHeight: 1.8,
              maxWidth: 460,
            }}
          >
            California law streamlined ADU approvals in 2020. Most San Diego
            residential lots now qualify — including yours.
          </p>
        </div>

        {/* ADU type rows */}
        <div
          style={{
            borderTop: "1px solid rgba(237,232,223,0.07)",
          }}
        >
          {ADU_TYPES.map((a) => (
            <div
              key={a.num}
              style={{
                display: "grid",
                gridTemplateColumns: "48px 1fr auto",
                gap: "0 40px",
                padding: "36px 0",
                borderBottom: "1px solid rgba(237,232,223,0.07)",
                alignItems: "start",
                opacity: visible ? 1 : 0,
                transform: visible ? "translateX(0)" : "translateX(-16px)",
                transition: `opacity 1s ease ${a.delay}s, transform 1s ease ${a.delay}s`,
              }}
            >
              {/* Number */}
              <span
                style={{
                  fontSize: 10,
                  letterSpacing: "0.18em",
                  color: "rgba(156,128,96,0.35)",
                  fontFamily: "var(--font-dm-sans), sans-serif",
                  paddingTop: 4,
                }}
              >
                {a.num}
              </span>

              {/* Type + description */}
              <div>
                <p
                  style={{
                    fontSize: 18,
                    fontWeight: 400,
                    color: "#EDE8DF",
                    fontFamily: "var(--font-dm-sans), sans-serif",
                    letterSpacing: "0.01em",
                    marginBottom: 8,
                  }}
                >
                  {a.type}
                </p>
                <p
                  style={{
                    fontSize: 13,
                    color: "rgba(237,232,223,0.3)",
                    fontFamily: "var(--font-dm-sans), sans-serif",
                    lineHeight: 1.75,
                    maxWidth: 420,
                  }}
                >
                  {a.desc}
                </p>
                <p
                  style={{
                    fontSize: 9,
                    letterSpacing: "0.16em",
                    textTransform: "uppercase",
                    color: "rgba(156,128,96,0.5)",
                    fontFamily: "var(--font-dm-sans), sans-serif",
                    marginTop: 12,
                  }}
                >
                  {a.payback}
                </p>
              </div>

              {/* Numbers — right aligned */}
              <div style={{ textAlign: "right", paddingTop: 2 }}>
                <p
                  style={{
                    fontFamily: "var(--font-cormorant), Georgia, serif",
                    fontSize: "clamp(24px, 2.5vw, 34px)",
                    fontWeight: 300,
                    color: "#EDE8DF",
                    letterSpacing: "-0.02em",
                    lineHeight: 1,
                    marginBottom: 6,
                    whiteSpace: "nowrap",
                  }}
                >
                  {a.income}
                </p>
                <p
                  style={{
                    fontSize: 9,
                    color: "rgba(237,232,223,0.25)",
                    fontFamily: "var(--font-dm-sans), sans-serif",
                    letterSpacing: "0.1em",
                    whiteSpace: "nowrap",
                  }}
                >
                  per month
                </p>
                <p
                  style={{
                    fontSize: 10,
                    color: "rgba(156,128,96,0.5)",
                    fontFamily: "var(--font-dm-sans), sans-serif",
                    letterSpacing: "0.06em",
                    marginTop: 8,
                    whiteSpace: "nowrap",
                  }}
                >
                  {a.equity}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Footer note */}
        <p
          style={{
            marginTop: 28,
            fontSize: 10,
            color: "rgba(237,232,223,0.18)",
            fontFamily: "var(--font-dm-sans), sans-serif",
            letterSpacing: "0.1em",
            opacity: visible ? 1 : 0,
            transition: "opacity 1s ease 1.4s",
          }}
        >
          Income estimates based on San Diego County rental comps · Equity projections are modeled, not guaranteed
        </p>
      </div>
    </section>
  );
}
