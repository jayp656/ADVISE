"use client";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function FinalCTA() {
  return (
    <section
      className="py-32 px-6 text-center relative overflow-hidden"
      style={{ background: "#1A1714" }}
    >
      {/* Grid backdrop */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.045) 1px, transparent 1px)," +
            "linear-gradient(90deg, rgba(255,255,255,0.045) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />
      {/* Radial fade out grid at edges */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 25%, rgba(10,10,10,0.85) 80%)",
        }}
      />

      <div className="relative max-w-4xl mx-auto">
        <p
          className="text-xs uppercase mb-6"
          style={{
            color: "var(--gold)",
            letterSpacing: "0.22em",
            fontFamily: "var(--font-dm-sans), sans-serif",
          }}
        >
          Summit Lot · San Diego County · Est. 2019
        </p>
        <h2
          className="font-light leading-none mb-8"
          style={{
            fontFamily: "var(--font-cormorant), Georgia, serif",
            fontSize: "clamp(56px, 9vw, 116px)",
            color: "var(--cream)",
            letterSpacing: "-0.02em",
          }}
        >
          Your property.
          <br />
          <em className="text-gold-gradient">Your move.</em>
        </h2>
        <p
          className="text-base mb-14 max-w-xl mx-auto leading-relaxed"
          style={{
            color: "rgba(237,232,223,0.42)",
            fontFamily: "var(--font-dm-sans), sans-serif",
          }}
        >
          Receive a complimentary Property Intelligence Report for any San Diego
          County address. No commitment, no sales call — just the numbers your
          property deserves.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
          <Link
            href="#search"
            className="px-10 py-4 text-xs font-semibold uppercase flex items-center justify-center gap-2 rounded-sm transition-all duration-150"
            style={{
              background: "var(--gold)",
              color: "var(--obsidian)",
              letterSpacing: "0.14em",
              fontFamily: "var(--font-dm-sans), sans-serif",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(240,240,240,0.92)")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "var(--gold)")}
          >
            Begin Your Analysis
            <ArrowRight size={14} />
          </Link>
          <Link
            href="#calculators"
            className="px-10 py-4 text-xs font-semibold uppercase rounded-sm transition-all duration-150"
            style={{
              background: "rgba(237,232,223,0.06)",
              border: "1px solid rgba(237,232,223,0.2)",
              color: "rgba(237,232,223,0.75)",
              letterSpacing: "0.14em",
              fontFamily: "var(--font-dm-sans), sans-serif",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(237,232,223,0.10)";
              e.currentTarget.style.borderColor = "rgba(237,232,223,0.35)";
              e.currentTarget.style.color = "#FAF8F4";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(237,232,223,0.06)";
              e.currentTarget.style.borderColor = "rgba(237,232,223,0.2)";
              e.currentTarget.style.color = "rgba(237,232,223,0.75)";
            }}
          >
            View the Calculator
          </Link>
        </div>

        {/* Disclaimer — below buttons, small and muted */}
        <p
          className="text-xs"
          style={{
            color: "rgba(237,232,223,0.18)",
            letterSpacing: "0.06em",
            fontFamily: "var(--font-dm-sans), sans-serif",
          }}
        >
          Advisory services only · Not a licensed contractor · DRE License Pending
        </p>
      </div>
    </section>
  );
}
