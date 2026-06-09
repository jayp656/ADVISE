"use client";
import { useEffect, useRef, useState } from "react";

const INCOME_STRATEGIES = [
  {
    num: "01",
    type: "Detached ADU",
    desc: "A freestanding cottage, studio, or 1BR built in the rear yard. The highest-value ADU configuration in San Diego.",
    primary: "$2,200 – $2,800 / mo",
    secondary: "+$175K – $220K equity",
    tag: "4.2 yr avg payback",
    delay: 0.2,
  },
  {
    num: "02",
    type: "Garage Conversion",
    desc: "Convert an attached or detached garage into a permitted, rentable living unit. Lowest cost-to-build ratio.",
    primary: "$1,600 – $2,100 / mo",
    secondary: "+$85K – $115K equity",
    tag: "3.1 yr avg payback",
    delay: 0.4,
  },
  {
    num: "03",
    type: "Junior ADU",
    desc: "A code-compliant unit within the footprint of the main home — a converted bedroom, addition, or interior suite.",
    primary: "$900 – $1,500 / mo",
    secondary: "+$55K – $80K equity",
    tag: "2.8 yr avg payback",
    delay: 0.6,
  },
];

const EQUITY_STRATEGIES = [
  {
    num: "04",
    type: "Kitchen Renovation",
    desc: "A well-executed kitchen remodel is the single highest-ROI renovation. Attracts higher-paying tenants and drives appraised value.",
    primary: "+$45K – $90K equity",
    secondary: "75 – 85% ROI",
    tag: "Increases rental rate $300 – $600 / mo",
    delay: 0.2,
  },
  {
    num: "05",
    type: "Primary Bath Remodel",
    desc: "Bathrooms are the second strongest equity driver. Premium finishes signal quality throughout — tenants notice immediately.",
    primary: "+$28K – $55K equity",
    secondary: "68 – 78% ROI",
    tag: "Increases rental rate $200 – $400 / mo",
    delay: 0.4,
  },
  {
    num: "06",
    type: "Interior Design Package",
    desc: "Full-unit design and furnishing for short or long-term rental. The difference between a standard unit and a premium listing.",
    primary: "+$400 – $800 / mo",
    secondary: "15 – 22% rental premium",
    tag: "Average 6-day lease time",
    delay: 0.6,
  },
];

type StrategyItem = {
  num: string;
  type: string;
  desc: string;
  primary: string;
  secondary: string;
  tag: string;
  delay: number;
};

function GroupRows({ label, items, visible }: { label: string; items: StrategyItem[]; visible: boolean }) {
  return (
    <div>
      <p
        style={{
          fontSize: 8,
          letterSpacing: "0.28em",
          textTransform: "uppercase",
          color: "rgba(156,128,96,0.38)",
          fontFamily: "var(--font-dm-sans), sans-serif",
          marginBottom: 0,
          paddingBottom: 12,
          borderBottom: "1px solid rgba(237,232,223,0.07)",
        }}
      >
        {label}
      </p>
      {items.map((a) => (
        <div
          key={a.num}
          style={{
            display: "grid",
            gridTemplateColumns: "48px 1fr auto",
            gap: "0 40px",
            padding: "32px 0",
            borderBottom: "1px solid rgba(237,232,223,0.06)",
            alignItems: "start",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateX(0)" : "translateX(-16px)",
            transition: `opacity 1s ease ${a.delay}s, transform 1s ease ${a.delay}s`,
          }}
        >
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
              {a.tag}
            </p>
          </div>

          <div style={{ textAlign: "right", paddingTop: 2 }}>
            <p
              style={{
                fontFamily: "var(--font-cormorant), Georgia, serif",
                fontSize: "clamp(22px, 2.2vw, 32px)",
                fontWeight: 300,
                color: "#EDE8DF",
                letterSpacing: "-0.02em",
                lineHeight: 1,
                marginBottom: 6,
                whiteSpace: "nowrap",
              }}
            >
              {a.primary}
            </p>
            <p
              style={{
                fontSize: 10,
                color: "rgba(156,128,96,0.5)",
                fontFamily: "var(--font-dm-sans), sans-serif",
                letterSpacing: "0.06em",
                whiteSpace: "nowrap",
              }}
            >
              {a.secondary}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

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
            animation: visible ? "kenBurnsB 26s ease-in-out infinite alternate" : undefined,
            transformOrigin: "center 45%",
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
            Section 03 · Property Strategies
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
            More income.
            <br />
            <span style={{ opacity: 0.4 }}>More equity. Your call.</span>
          </h2>
          <p
            style={{
              fontSize: 14,
              color: "rgba(237,232,223,0.3)",
              fontFamily: "var(--font-dm-sans), sans-serif",
              letterSpacing: "0.04em",
              lineHeight: 1.8,
              maxWidth: 520,
            }}
          >
            We identify the highest-return path for your specific property —
            whether that's an ADU for monthly cash flow, a renovation that
            builds equity, or a design package that commands premium rent.
          </p>
        </div>

        {/* ── Income Strategies ── */}
        <GroupRows
          label="Income Strategies — ADU"
          items={INCOME_STRATEGIES}
          visible={visible}
        />

        {/* Spacer between groups */}
        <div style={{ height: 48 }} />

        {/* ── Equity Strategies ── */}
        <GroupRows
          label="Equity & Renovation"
          items={EQUITY_STRATEGIES}
          visible={visible}
        />

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
          Rental estimates based on San Diego County comps · Equity projections modeled, not guaranteed · ROI varies by scope
        </p>
      </div>
    </section>
  );
}
