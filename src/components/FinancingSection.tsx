"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";

const PROGRAMS = [
  {
    num: "01",
    tag: "State Grant",
    name: "CalHFA ADU Grant",
    amount: "$40,000",
    unit: "grant",
    highlight: true,
    desc: "The California Housing Finance Agency provides up to $40,000 in no-repayment grant funding to income-qualifying homeowners who build or permit an ADU and agree to rent at below-market rates.",
    qualify: "Owner-occupied · Income limits apply · SD County eligible",
  },
  {
    num: "02",
    tag: "Loan Program",
    name: "DSCR Financing",
    amount: "80%",
    unit: "LTV",
    highlight: false,
    desc: "Debt Service Coverage Ratio loans qualify entirely on projected rental income — no W-2s, no tax returns, no employment verification. Ideal for self-employed investors and ADU builders.",
    qualify: "No income docs · Min. 680 FICO · Investment properties",
  },
  {
    num: "03",
    tag: "Home Equity",
    name: "HELOC / Cash-Out Refi",
    amount: "85%",
    unit: "of equity",
    highlight: false,
    desc: "The lowest-cost ADU financing in most scenarios. Draw against existing equity during construction with interest-only payments, then repay at your own pace — or convert to a fixed loan at close.",
    qualify: "Owner-occupied · Typically 640+ FICO · Existing equity required",
  },
  {
    num: "04",
    tag: "State Law",
    name: "SB 9 Lot Split",
    amount: "4 units",
    unit: "by-right",
    highlight: true,
    desc: "California Senate Bill 9 allows most single-family lot owners to split their parcel and build up to four units without a public hearing or discretionary review. Streamlined, ministerial approval.",
    qualify: "Most SFR lots · Not in high fire hazard zone · No owner-occupy required post-split",
  },
  {
    num: "05",
    tag: "San Diego City",
    name: "Affordable ADU Incentive",
    amount: "Fee waiver",
    unit: "+ density bonus",
    highlight: false,
    desc: "The City of San Diego waives or significantly reduces development impact fees when you commit to renting your ADU at restricted affordable rates. Fees can total $15,000–$30,000 per unit — waived entirely.",
    qualify: "City of SD parcels · Rent restricted to 80% AMI · 55-year covenant",
  },
  {
    num: "06",
    tag: "Construction",
    name: "One-Time Close Loan",
    amount: "0%",
    unit: "during build",
    highlight: false,
    desc: "Construction-to-permanent financing closes once, eliminating double closing costs. Interest-only during the build phase, automatically converting to a 30-year fixed at project completion.",
    qualify: "Owner-occupied or investment · Local SD lenders available · 10–12 month build window",
  },
];

export default function FinancingSection() {
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState<number | null>(null);
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
      style={{ background: "#0E0C0A", padding: "120px 24px" }}
    >
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>

        {/* ── Header ── */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "40px 80px",
            alignItems: "end",
            marginBottom: 80,
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.8s ease, transform 0.8s ease",
          }}
          className="grid-cols-1 lg:grid-cols-2"
        >
          <div>
            <p
              style={{
                fontSize: 10,
                letterSpacing: "0.26em",
                textTransform: "uppercase",
                color: "rgba(156,128,96,0.8)",
                fontFamily: "var(--font-dm-sans), sans-serif",
                marginBottom: 20,
              }}
            >
              California Incentives & Financing
            </p>
            <h2
              style={{
                fontFamily: "var(--font-cormorant), Georgia, serif",
                fontSize: "clamp(48px, 6.5vw, 92px)",
                fontWeight: 300,
                color: "#EDE8DF",
                letterSpacing: "-0.02em",
                lineHeight: 0.95,
                margin: 0,
              }}
            >
              The state funds
              <br />
              <em style={{ fontStyle: "normal", opacity: 0.55 }}>what you build.</em>
            </h2>
          </div>

          <div style={{ paddingBottom: 8 }}>
            <p
              style={{
                fontSize: 15,
                lineHeight: 1.75,
                color: "rgba(237,232,223,0.45)",
                fontFamily: "var(--font-dm-sans), sans-serif",
                maxWidth: 420,
                marginBottom: 28,
              }}
            >
              California and San Diego offer a stack of grants, loan programs,
              and zoning incentives specifically designed to help homeowners build
              ADUs and add income-producing units. Most owners qualify for at
              least two — and never know it.
            </p>
            <Link
              href="#search"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                fontSize: 11,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "#EDE8DF",
                textDecoration: "none",
                fontFamily: "var(--font-dm-sans), sans-serif",
                borderBottom: "1px solid rgba(237,232,223,0.22)",
                paddingBottom: 4,
                transition: "border-color 0.2s ease, color 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(237,232,223,0.55)";
                e.currentTarget.style.color = "#fff";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(237,232,223,0.22)";
                e.currentTarget.style.color = "#EDE8DF";
              }}
            >
              See what your property qualifies for →
            </Link>
          </div>
        </div>

        {/* ── Program grid ── */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(360px, 1fr))",
            gap: 1,
            background: "rgba(255,255,255,0.04)",
          }}
        >
          {PROGRAMS.map((p, i) => {
            const isHov = hovered === i;
            return (
              <div
                key={p.num}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                style={{
                  background: isHov ? "#1A1612" : "#0E0C0A",
                  padding: "36px 32px",
                  cursor: "default",
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateY(0)" : "translateY(16px)",
                  transition: `opacity 0.6s ease ${i * 0.07}s, transform 0.6s ease ${i * 0.07}s, background 0.2s ease`,
                  borderLeft: isHov
                    ? "2px solid rgba(156,128,96,0.55)"
                    : "2px solid transparent",
                  position: "relative",
                }}
              >
                {/* Top row: num + tag */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: 20,
                  }}
                >
                  <span
                    style={{
                      fontSize: 10,
                      letterSpacing: "0.18em",
                      color: "rgba(237,232,223,0.2)",
                      fontFamily: "var(--font-dm-sans), sans-serif",
                    }}
                  >
                    {p.num}
                  </span>
                  <span
                    style={{
                      fontSize: 9,
                      letterSpacing: "0.18em",
                      textTransform: "uppercase",
                      color: p.highlight ? "rgba(156,128,96,0.9)" : "rgba(237,232,223,0.28)",
                      fontFamily: "var(--font-dm-sans), sans-serif",
                      padding: "3px 10px",
                      border: `1px solid ${p.highlight ? "rgba(156,128,96,0.35)" : "rgba(255,255,255,0.08)"}`,
                    }}
                  >
                    {p.tag}
                  </span>
                </div>

                {/* Program name */}
                <p
                  style={{
                    fontSize: 13,
                    letterSpacing: "0.06em",
                    color: "rgba(237,232,223,0.55)",
                    fontFamily: "var(--font-dm-sans), sans-serif",
                    marginBottom: 8,
                    textTransform: "uppercase",
                  }}
                >
                  {p.name}
                </p>

                {/* Big benefit number */}
                <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginBottom: 20 }}>
                  <span
                    style={{
                      fontFamily: "var(--font-cormorant), Georgia, serif",
                      fontSize: "clamp(48px, 5vw, 68px)",
                      fontWeight: 300,
                      color: p.highlight ? "rgba(156,128,96,0.95)" : "#EDE8DF",
                      lineHeight: 1,
                      letterSpacing: "-0.02em",
                    }}
                  >
                    {p.amount}
                  </span>
                  <span
                    style={{
                      fontSize: 11,
                      color: "rgba(237,232,223,0.3)",
                      fontFamily: "var(--font-dm-sans), sans-serif",
                      letterSpacing: "0.08em",
                    }}
                  >
                    {p.unit}
                  </span>
                </div>

                {/* Description */}
                <p
                  style={{
                    fontSize: 13,
                    lineHeight: 1.7,
                    color: isHov ? "rgba(237,232,223,0.55)" : "rgba(237,232,223,0.32)",
                    fontFamily: "var(--font-dm-sans), sans-serif",
                    marginBottom: 20,
                    transition: "color 0.2s ease",
                  }}
                >
                  {p.desc}
                </p>

                {/* Eligibility strip */}
                <div
                  style={{
                    borderTop: "1px solid rgba(255,255,255,0.06)",
                    paddingTop: 14,
                  }}
                >
                  <p
                    style={{
                      fontSize: 10,
                      letterSpacing: "0.1em",
                      color: "rgba(237,232,223,0.22)",
                      fontFamily: "var(--font-dm-sans), sans-serif",
                    }}
                  >
                    {p.qualify}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* ── Bottom banner ── */}
        <div
          style={{
            marginTop: 1,
            background: "#141210",
            padding: "32px",
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 20,
            opacity: visible ? 1 : 0,
            transition: "opacity 0.8s ease 0.5s",
          }}
        >
          <p
            style={{
              fontSize: 13,
              color: "rgba(237,232,223,0.38)",
              fontFamily: "var(--font-dm-sans), sans-serif",
              maxWidth: 560,
              lineHeight: 1.65,
            }}
          >
            Domaine analyzes every program your property qualifies for — and
            models the combined impact on your total project cost and return.
            Most owners are leaving $15,000–$40,000 on the table.
          </p>
          <Link
            href="#search"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              padding: "14px 28px",
              background: "rgba(156,128,96,0.12)",
              border: "1px solid rgba(156,128,96,0.3)",
              color: "rgba(156,128,96,0.9)",
              fontSize: 10,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              textDecoration: "none",
              fontFamily: "var(--font-dm-sans), sans-serif",
              transition: "background 0.2s ease, border-color 0.2s ease",
              whiteSpace: "nowrap",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(156,128,96,0.2)";
              e.currentTarget.style.borderColor = "rgba(156,128,96,0.55)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(156,128,96,0.12)";
              e.currentTarget.style.borderColor = "rgba(156,128,96,0.3)";
            }}
          >
            Check My Property →
          </Link>
        </div>
      </div>
    </section>
  );
}
