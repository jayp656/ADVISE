"use client";
import { useEffect, useRef, useState } from "react";

export default function SectionFinalMoment() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.18 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      style={{
        position: "relative",
        minHeight: "100svh",
        background: "#0C0A08",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      {/* Ghost watermark */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 0,
        display: "flex", alignItems: "center", justifyContent: "center",
        pointerEvents: "none", overflow: "hidden",
      }}>
        <span style={{
          fontFamily: "var(--font-cormorant), Georgia, serif",
          fontSize: "clamp(80px, 14vw, 200px)",
          fontWeight: 300,
          color: "rgba(156,128,96,0.055)",
          letterSpacing: "0.22em",
          textTransform: "uppercase",
          whiteSpace: "nowrap",
          userSelect: "none",
        }}>
          Summit Lot
        </span>
      </div>

      {/* Property image — quiet, golden hour */}
      <img
        src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=2400&q=90&fit=crop&crop=center"
        alt=""
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "center 38%",
          opacity: visible ? 0.42 : 0,
          transition: "opacity 3.2s ease",
          filter: "saturate(0.78) sepia(0.08)",
          animation: visible ? "kenBurns 30s ease-in-out infinite alternate" : undefined,
          transformOrigin: "center 38%",
        }}
      />

      {/* Corner viewfinder marks */}
      {(["tl","tr","bl","br"] as const).map((pos, i) => (
        <div key={pos} style={{
          position: "absolute", zIndex: 3, width: 22, height: 22,
          top: pos.startsWith("t") ? "max(24px, 3vh)" : undefined,
          bottom: pos.startsWith("b") ? "max(24px, 3vh)" : undefined,
          left: pos.endsWith("l") ? "clamp(20px, 4vw, 48px)" : undefined,
          right: pos.endsWith("r") ? "clamp(20px, 4vw, 48px)" : undefined,
          borderTop: pos.startsWith("t") ? "1px solid rgba(156,128,96,0.3)" : undefined,
          borderBottom: pos.startsWith("b") ? "1px solid rgba(156,128,96,0.3)" : undefined,
          borderLeft: pos.endsWith("l") ? "1px solid rgba(156,128,96,0.3)" : undefined,
          borderRight: pos.endsWith("r") ? "1px solid rgba(156,128,96,0.3)" : undefined,
          opacity: visible ? 1 : 0,
          transition: `opacity 1s ease ${1.6 + i * 0.15}s`,
        }} />
      ))}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to top, rgba(12,10,8,0.96) 0%, rgba(12,10,8,0.45) 40%, rgba(12,10,8,0.18) 70%, rgba(12,10,8,0.32) 100%)",
          zIndex: 1,
        }}
      />

      {/* Content */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          maxWidth: 1360,
          margin: "0 auto",
          padding: "clamp(60px,10vw,120px) clamp(20px,4vw,48px)",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <img
          src="https://ceimsgmzh6rmomfx.public.blob.vercel-storage.com/photos/1780978715619-5428C628-F649-4F06-9765-48AFF403A02C.png"
          alt="Summit Lot"
          style={{
            width: "clamp(160px, 18vw, 260px)",
            height: "auto",
            objectFit: "contain",
            marginBottom: 44,
            opacity: visible ? 0.9 : 0,
            transition: "opacity 1.5s ease 1s",
          }}
        />

        <h2
          style={{
            fontFamily: "var(--font-cormorant), Georgia, serif",
            fontSize: "clamp(52px, 7vw, 108px)",
            fontWeight: 300,
            color: "#EDE8DF",
            letterSpacing: "-0.025em",
            lineHeight: 1.02,
            margin: "0 0 28px",
            maxWidth: 780,
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(24px)",
            transition: "opacity 2s ease 0.4s, transform 2s ease 0.4s",
          }}
        >
          What could your
          <br />
          property become?
        </h2>

        <p
          style={{
            fontSize: 15,
            color: "rgba(237,232,223,0.32)",
            fontFamily: "var(--font-dm-sans), sans-serif",
            letterSpacing: "0.05em",
            fontWeight: 300,
            marginBottom: 60,
            opacity: visible ? 1 : 0,
            transition: "opacity 1.5s ease 1.2s",
          }}
        >
          Discover the opportunities hiding in plain sight.
        </p>

        <div
          style={{
            display: "flex",
            gap: 14,
            flexWrap: "wrap",
            justifyContent: "center",
            opacity: visible ? 1 : 0,
            transition: "opacity 1.2s ease 1.8s",
          }}
        >
          <a
            href="#search"
            style={{
              display: "inline-flex",
              alignItems: "center",
              padding: "17px 40px",
              background: "#9C8060",
              color: "#0C0A08",
              fontSize: 10,
              letterSpacing: "0.24em",
              textTransform: "uppercase",
              textDecoration: "none",
              fontFamily: "var(--font-dm-sans), sans-serif",
              fontWeight: 500,
              transition: "background 0.25s ease, transform 0.25s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#B09878";
              e.currentTarget.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "#9C8060";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            Score My Property
          </a>

          <a
            href="#case-studies"
            style={{
              display: "inline-flex",
              alignItems: "center",
              padding: "17px 40px",
              background: "transparent",
              color: "rgba(237,232,223,0.55)",
              fontSize: 10,
              letterSpacing: "0.24em",
              textTransform: "uppercase",
              textDecoration: "none",
              fontFamily: "var(--font-dm-sans), sans-serif",
              border: "1px solid rgba(237,232,223,0.16)",
              transition: "color 0.25s ease, border-color 0.25s ease, transform 0.25s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "#EDE8DF";
              e.currentTarget.style.borderColor = "rgba(237,232,223,0.38)";
              e.currentTarget.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "rgba(237,232,223,0.55)";
              e.currentTarget.style.borderColor = "rgba(237,232,223,0.16)";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            See Example Analysis
          </a>
        </div>

        <p
          style={{
            marginTop: 72,
            fontSize: 9,
            color: "rgba(237,232,223,0.14)",
            fontFamily: "var(--font-dm-sans), sans-serif",
            letterSpacing: "0.14em",
            opacity: visible ? 1 : 0,
            transition: "opacity 1s ease 2.5s",
          }}
        >
          Summit Lot Co. · Property Intelligence Advisory · San Diego County · Est. 2019
        </p>
      </div>
    </section>
  );
}
