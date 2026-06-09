"use client";
import { ExternalLink, Calendar } from "lucide-react";

const CREDS = [
  { val: "$47M+", label: "Capital Guided" },
  { val: "210+",  label: "Feasibility Studies" },
  { val: "5 yrs", label: "San Diego Market" },
  { val: "94%",   label: "Cash-Flow Positive" },
];

export default function FounderSection() {
  return (
    <section
      className="py-24 px-6"
      style={{ background: "#1E1A17" }}
    >
      <div className="max-w-7xl mx-auto">

        {/* Label */}
        <p
          className="text-xs uppercase mb-16"
          style={{
            color: "var(--gold)",
            letterSpacing: "0.22em",
            fontFamily: "var(--font-dm-sans), sans-serif",
          }}
        >
          The Team
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">

          {/* LEFT — Photo */}
          <div className="relative">
            <div
              className="relative overflow-hidden rounded-sm"
              style={{
                aspectRatio: "4/5",
                maxWidth: "460px",
                border: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              <img
                src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800&q=88&fit=crop&crop=face"
                alt="Jason Umana — Founder, Summit Lot"
                className="w-full h-full object-cover object-top"
              />
              {/* Dark overlay for brand tone */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to top, rgba(17,17,17,0.55) 0%, transparent 50%)",
                }}
              />

              {/* Name plate */}
              <div
                className="absolute bottom-6 left-6 right-6 flex items-end justify-between"
              >
                <div>
                  <p
                    className="text-lg font-light mb-0.5"
                    style={{
                      fontFamily: "var(--font-cormorant), Georgia, serif",
                      color: "#FAF8F4",
                    }}
                  >
                    Jason Umana
                  </p>
                  <p
                    className="text-xs uppercase"
                    style={{
                      color: "var(--gold)",
                      letterSpacing: "0.16em",
                      fontFamily: "var(--font-dm-sans), sans-serif",
                    }}
                  >
                    Founder & Principal Advisor
                  </p>
                </div>
              </div>
            </div>

            {/* Gold accent line */}
            <div
              className="absolute -left-4 top-8 bottom-8 w-px hidden lg:block"
              style={{ background: "linear-gradient(to bottom, transparent, var(--gold), transparent)" }}
            />
          </div>

          {/* RIGHT — Bio + credentials */}
          <div className="pt-4">
            <h2
              className="font-light leading-none mb-8"
              style={{
                fontFamily: "var(--font-cormorant), Georgia, serif",
                fontSize: "clamp(40px, 5vw, 68px)",
                color: "var(--cream)",
                letterSpacing: "-0.02em",
              }}
            >
              Built on real deals,
              <br />
              <em>not projections.</em>
            </h2>

            <div className="space-y-5 mb-10">
              <p
                className="text-base leading-relaxed"
                style={{
                  color: "rgba(237,232,223,0.58)",
                  fontFamily: "var(--font-dm-sans), sans-serif",
                }}
              >
                Jason Umana founded Summit Lot in 2019 after seeing firsthand
                how many San Diego homeowners were leaving six-figure returns on
                the table — not from lack of ambition, but from lack of
                investment-grade analysis.
              </p>
              <p
                className="text-base leading-relaxed"
                style={{
                  color: "rgba(237,232,223,0.58)",
                  fontFamily: "var(--font-dm-sans), sans-serif",
                }}
              >
                Over five years and 210+ feasibility studies, he's guided
                property owners through $47M+ in capital decisions — from
                garage conversions to SB9 multi-unit projects — with a 94%
                cash-flow positive outcome rate across the portfolio.
              </p>
              <p
                className="text-base leading-relaxed"
                style={{
                  color: "rgba(237,232,223,0.58)",
                  fontFamily: "var(--font-dm-sans), sans-serif",
                }}
              >
                Summit Lot is his bet that every Southern California property
                owner deserves the same intelligence that institutional investors
                take for granted.
              </p>
            </div>

            {/* Credential grid */}
            <div
              className="grid grid-cols-2 gap-px mb-10"
              style={{ background: "rgba(255,255,255,0.05)" }}
            >
              {CREDS.map((c) => (
                <div
                  key={c.label}
                  className="px-5 py-4"
                  style={{ background: "#1E1A17" }}
                >
                  <p
                    className="font-light mb-0.5"
                    style={{
                      fontFamily: "var(--font-cormorant), Georgia, serif",
                      fontSize: "28px",
                      color: "var(--gold)",
                    }}
                  >
                    {c.val}
                  </p>
                  <p
                    className="text-xs uppercase"
                    style={{
                      color: "rgba(237,232,223,0.32)",
                      letterSpacing: "0.13em",
                      fontFamily: "var(--font-dm-sans), sans-serif",
                    }}
                  >
                    {c.label}
                  </p>
                </div>
              ))}
            </div>

            {/* CTA row */}
            <div className="flex flex-wrap gap-4">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 text-xs font-semibold uppercase rounded-sm transition-all duration-150"
                style={{
                  border: "1px solid rgba(255,255,255,0.3)",
                  color: "var(--gold)",
                  letterSpacing: "0.12em",
                  fontFamily: "var(--font-dm-sans), sans-serif",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(255,255,255,0.08)";
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.55)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.3)";
                }}
              >
                <ExternalLink size={12} />
                LinkedIn Profile
              </a>
              <a
                href="#search"
                className="inline-flex items-center gap-2 px-6 py-3 text-xs font-semibold uppercase rounded-sm transition-all duration-150"
                style={{
                  background: "var(--gold)",
                  color: "#1A1714",
                  letterSpacing: "0.12em",
                  fontFamily: "var(--font-dm-sans), sans-serif",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(240,240,240,0.92)")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "var(--gold)")}
              >
                <Calendar size={12} />
                Book a Call
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
