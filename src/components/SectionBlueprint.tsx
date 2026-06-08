"use client";
import { useEffect, useRef, useState } from "react";

export default function SectionBlueprint() {
  const [phase, setPhase] = useState(0);
  const ref = useRef<HTMLElement>(null);
  const triggered = useRef(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && !triggered.current) {
          triggered.current = true;
          setTimeout(() => setPhase(1), 300);
          setTimeout(() => setPhase(2), 1700);
          setTimeout(() => setPhase(3), 2800);
        }
      },
      { threshold: 0.25 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const dash = (len: number, delay: string): React.CSSProperties => ({
    strokeDasharray: len,
    strokeDashoffset: phase >= 1 ? 0 : len,
    transition: `stroke-dashoffset 1.6s ease ${delay}`,
  });

  return (
    <section
      ref={ref}
      style={{
        position: "relative",
        minHeight: "100svh",
        background: "#0C0A08",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
      }}
    >
      {/* Property image — very dark, texture only */}
      <img
        src="https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=2400&q=90&fit=crop&crop=center"
        alt=""
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "center 35%",
          opacity: 0.22,
          filter: "saturate(0.4)",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(135deg, rgba(12,10,8,0.72) 0%, rgba(12,10,8,0.28) 60%, rgba(12,10,8,0.6) 100%)",
        }}
      />

      {/* SVG Blueprint overlay */}
      <svg
        viewBox="0 0 1200 680"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          zIndex: 2,
        }}
        preserveAspectRatio="xMidYMid slice"
      >
        {/* Lot boundary */}
        <rect
          x="150" y="70" width="900" height="550"
          fill="none"
          stroke="rgba(156,128,96,0.2)"
          strokeWidth="0.7"
          style={dash(2900, "0s")}
        />

        {/* Main house footprint */}
        <rect
          x="255" y="165" width="430" height="305"
          fill="rgba(156,128,96,0.025)"
          stroke="rgba(156,128,96,0.52)"
          strokeWidth="0.8"
          style={dash(1470, "0.25s")}
        />

        {/* Garage */}
        <rect
          x="715" y="275" width="185" height="135"
          fill="rgba(156,128,96,0.035)"
          stroke="rgba(156,128,96,0.48)"
          strokeWidth="0.7"
          style={dash(640, "0.65s")}
        />

        {/* Rear ADU zone */}
        <rect
          x="255" y="500" width="235" height="95"
          fill="rgba(156,128,96,0.06)"
          stroke="rgba(156,128,96,0.42)"
          strokeWidth="0.7"
          style={dash(660, "0.95s")}
        />

        {/* Interior horizontal divider */}
        <line x1="255" y1="318" x2="685" y2="318"
          stroke="rgba(156,128,96,0.16)" strokeWidth="0.5"
          style={dash(430, "0.85s")}
        />
        {/* Interior vertical divider */}
        <line x1="455" y1="165" x2="455" y2="470"
          stroke="rgba(156,128,96,0.12)" strokeWidth="0.5"
          style={dash(305, "1.05s")}
        />

        {/* Driveway suggestion */}
        <line x1="715" y1="450" x2="900" y2="620"
          stroke="rgba(156,128,96,0.14)" strokeWidth="0.5"
          style={dash(240, "1.15s")}
        />

        {/* Phase 2 — dimension lines */}
        {phase >= 2 && (
          <>
            <line x1="255" y1="143" x2="685" y2="143"
              stroke="rgba(156,128,96,0.26)" strokeWidth="0.5"
              strokeDasharray="430"
              strokeDashoffset={0}
              style={{ transition: "stroke-dashoffset 0.9s ease" }}
            />
            <line x1="255" y1="136" x2="255" y2="151"
              stroke="rgba(156,128,96,0.26)" strokeWidth="0.5"
            />
            <line x1="685" y1="136" x2="685" y2="151"
              stroke="rgba(156,128,96,0.26)" strokeWidth="0.5"
            />
            <line x1="706" y1="165" x2="706" y2="470"
              stroke="rgba(156,128,96,0.26)" strokeWidth="0.5"
              strokeDasharray="305"
              strokeDashoffset={0}
              style={{ transition: "stroke-dashoffset 0.9s ease 0.2s" }}
            />
            <line x1="699" y1="165" x2="714" y2="165"
              stroke="rgba(156,128,96,0.26)" strokeWidth="0.5"
            />
            <line x1="699" y1="470" x2="714" y2="470"
              stroke="rgba(156,128,96,0.26)" strokeWidth="0.5"
            />

            {/* Dimension labels */}
            <text x="470" y="136" textAnchor="middle"
              fill="rgba(156,128,96,0.48)" fontSize="7.5"
              fontFamily="var(--font-dm-sans), sans-serif" letterSpacing="2.5">
              55 FT
            </text>
            <text x="722" y="322" textAnchor="start"
              fill="rgba(156,128,96,0.48)" fontSize="7.5"
              fontFamily="var(--font-dm-sans), sans-serif" letterSpacing="2.5">
              40 FT
            </text>

            {/* Zone labels */}
            <text x="470" y="320" textAnchor="middle"
              fill="rgba(156,128,96,0.28)" fontSize="7"
              fontFamily="var(--font-dm-sans), sans-serif" letterSpacing="4.5">
              MAIN RESIDENCE
            </text>
            <text x="808" y="347" textAnchor="middle"
              fill="rgba(156,128,96,0.42)" fontSize="7"
              fontFamily="var(--font-dm-sans), sans-serif" letterSpacing="4.5">
              GARAGE
            </text>
            <text x="372" y="550" textAnchor="middle"
              fill="rgba(156,128,96,0.5)" fontSize="7"
              fontFamily="var(--font-dm-sans), sans-serif" letterSpacing="4.5">
              ADU ZONE
            </text>

            {/* North indicator */}
            <line x1="1088" y1="138" x2="1088" y2="98"
              stroke="rgba(156,128,96,0.38)" strokeWidth="0.8"
            />
            <text x="1088" y="92" textAnchor="middle"
              fill="rgba(156,128,96,0.38)" fontSize="8"
              fontFamily="var(--font-dm-sans), sans-serif" letterSpacing="1">
              N
            </text>
            <circle cx="1088" cy="153" r="3.5"
              fill="none" stroke="rgba(156,128,96,0.28)" strokeWidth="0.6"
            />
          </>
        )}
      </svg>

      {/* Text — lower-left */}
      <div
        style={{
          position: "relative",
          zIndex: 3,
          width: "100%",
          maxWidth: 1360,
          margin: "0 auto",
          padding: "120px 48px",
          minHeight: "100svh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
        }}
      >
        <div style={{ maxWidth: 500 }}>
          <h2
            style={{
              fontFamily: "var(--font-cormorant), Georgia, serif",
              fontSize: "clamp(40px, 5vw, 76px)",
              fontWeight: 300,
              color: "#EDE8DF",
              letterSpacing: "-0.02em",
              lineHeight: 1.05,
              margin: "0 0 20px",
              opacity: phase >= 3 ? 1 : 0,
              transform: phase >= 3 ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 1.4s ease, transform 1.4s ease",
            }}
          >
            What if you could see what others miss?
          </h2>
          <p
            style={{
              fontSize: 13,
              color: "rgba(237,232,223,0.32)",
              fontFamily: "var(--font-dm-sans), sans-serif",
              lineHeight: 1.85,
              letterSpacing: "0.04em",
              opacity: phase >= 3 ? 1 : 0,
              transition: "opacity 1s ease 0.5s",
            }}
          >
            Every property has a hidden layer.
            <br />
            We&apos;re trained to read it.
          </p>
        </div>
      </div>
    </section>
  );
}
