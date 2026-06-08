"use client";
// Pure CSS architectural atmosphere — no Three.js, no async import, instant render.
// Mouse parallax set via CSS custom properties (one passive listener).
import { useEffect, useRef, useState } from "react";

export default function AmbientScene3D() {
  const sectionRef = useRef<HTMLElement>(null);
  const lightRef = useRef<HTMLDivElement>(null);
  const light2Ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  // Scroll-in fade
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.08 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // Mouse parallax — pure CSS custom property, zero layout work
  useEffect(() => {
    let raf = 0;
    let tx = 0, ty = 0, cx = 0, cy = 0;

    const onMove = (e: MouseEvent) => {
      tx = (e.clientX / window.innerWidth - 0.5) * 60;
      ty = (e.clientY / window.innerHeight - 0.5) * 40;
    };
    window.addEventListener("mousemove", onMove, { passive: true });

    const tick = () => {
      raf = requestAnimationFrame(tick);
      cx += (tx - cx) * 0.06;
      cy += (ty - cy) * 0.06;
      if (lightRef.current) {
        lightRef.current.style.transform = `translate(calc(-50% + ${cx}px), calc(-50% + ${cy}px))`;
      }
      if (light2Ref.current) {
        light2Ref.current.style.transform = `translate(calc(-50% + ${-cx * 0.6}px), calc(-50% + ${-cy * 0.6}px))`;
      }
    };
    tick();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      aria-label="Architectural intelligence"
      style={{
        position: "relative",
        height: "100svh",
        minHeight: 600,
        background: "#0B0906",
        overflow: "hidden",
      }}
    >
      {/* ── Ambient light sources ── */}

      {/* Primary warm glow — top right */}
      <div
        ref={lightRef}
        style={{
          position: "absolute",
          top: "22%",
          left: "68%",
          width: 700,
          height: 700,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(240,150,50,0.12) 0%, rgba(200,110,30,0.06) 40%, transparent 72%)",
          animation: "lightDrift 18s ease-in-out infinite",
          willChange: "transform",
          pointerEvents: "none",
        }}
      />

      {/* Secondary cool fill — bottom left */}
      <div
        ref={light2Ref}
        style={{
          position: "absolute",
          top: "62%",
          left: "18%",
          width: 500,
          height: 500,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(80,110,200,0.07) 0%, rgba(60,80,160,0.03) 50%, transparent 70%)",
          animation: "lightDrift2 22s ease-in-out infinite",
          willChange: "transform",
          pointerEvents: "none",
        }}
      />

      {/* Rim edge glow */}
      <div
        style={{
          position: "absolute",
          top: "55%",
          right: "-4%",
          width: 320,
          height: 600,
          borderRadius: "50%",
          background:
            "radial-gradient(ellipse, rgba(180,120,50,0.09) 0%, transparent 65%)",
          pointerEvents: "none",
        }}
      />

      {/* ── Architectural line grid (blueprint feel) ── */}
      <svg
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          opacity: 0.045,
          pointerEvents: "none",
        }}
      >
        {/* Vertical columns */}
        {[18, 36, 54, 72].map((pct) => (
          <line
            key={`v${pct}`}
            x1={`${pct}%`} y1="0" x2={`${pct}%`} y2="100%"
            stroke="#EDE8DF" strokeWidth="0.5"
          />
        ))}
        {/* Horizontal levels */}
        {[25, 50, 72].map((pct) => (
          <line
            key={`h${pct}`}
            x1="14%" y1={`${pct}%`} x2="86%" y2={`${pct}%`}
            stroke="#EDE8DF" strokeWidth="0.5"
          />
        ))}
        {/* Diagonal accent */}
        <line x1="54%" y1="25%" x2="72%" y2="72%" stroke="#9C8060" strokeWidth="0.5" opacity="0.6" />
      </svg>

      {/* ── Architectural corners / brackets ── */}
      {/* Top-left bracket */}
      <div style={{ position: "absolute", top: 48, left: 48, pointerEvents: "none" }}>
        <div style={{ width: 24, height: 1, background: "rgba(156,128,96,0.25)" }} />
        <div style={{ width: 1, height: 24, background: "rgba(156,128,96,0.25)" }} />
      </div>
      {/* Bottom-right bracket */}
      <div style={{ position: "absolute", bottom: 48, right: 48, display: "flex", flexDirection: "column", alignItems: "flex-end", pointerEvents: "none" }}>
        <div style={{ width: 24, height: 1, background: "rgba(156,128,96,0.25)" }} />
        <div style={{ width: 1, height: 24, background: "rgba(156,128,96,0.25)", alignSelf: "flex-end" }} />
      </div>
      {/* Top-right bracket */}
      <div style={{ position: "absolute", top: 48, right: 48, display: "flex", flexDirection: "column", alignItems: "flex-end", pointerEvents: "none" }}>
        <div style={{ width: 24, height: 1, background: "rgba(156,128,96,0.2)" }} />
        <div style={{ width: 1, height: 24, background: "rgba(156,128,96,0.2)", alignSelf: "flex-end" }} />
      </div>

      {/* ── Vertical side rule ── */}
      <div
        style={{
          position: "absolute",
          left: 48,
          top: "25%",
          bottom: "28%",
          width: 1,
          background: "linear-gradient(to bottom, transparent, rgba(156,128,96,0.18) 20%, rgba(156,128,96,0.18) 80%, transparent)",
          pointerEvents: "none",
        }}
      />

      {/* ── Thick architectural shadow line ── */}
      <div
        style={{
          position: "absolute",
          right: "27%",
          top: 0,
          bottom: 0,
          width: 2,
          background: "linear-gradient(to bottom, transparent 10%, rgba(30,20,10,0.6) 35%, rgba(30,20,10,0.6) 70%, transparent 90%)",
          pointerEvents: "none",
        }}
      />

      {/* ── Bottom gradient for text legibility ── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to top, rgba(11,9,6,0.96) 0%, rgba(11,9,6,0.3) 40%, transparent 65%)",
          pointerEvents: "none",
        }}
      />

      {/* ── Text ── */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          padding: "0 52px 72px",
          zIndex: 2,
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(18px)",
          transition: "opacity 1.4s ease 0.2s, transform 1.4s ease 0.2s",
        }}
      >
        <p
          style={{
            fontSize: 9,
            letterSpacing: "0.32em",
            textTransform: "uppercase",
            color: "rgba(156,128,96,0.55)",
            fontFamily: "var(--font-dm-sans), sans-serif",
            marginBottom: 20,
          }}
        >
          Section 02 · The Reveal
        </p>
        <h2
          style={{
            fontFamily: "var(--font-cormorant), Georgia, serif",
            fontSize: "clamp(42px, 5.5vw, 84px)",
            fontWeight: 300,
            color: "#EDE8DF",
            letterSpacing: "-0.025em",
            lineHeight: 1.04,
            margin: "0 0 20px",
            maxWidth: 620,
          }}
        >
          What if you could see
          <br />
          <span style={{ opacity: 0.38 }}>what others miss?</span>
        </h2>
        <p
          style={{
            fontSize: 13,
            color: "rgba(237,232,223,0.28)",
            fontFamily: "var(--font-dm-sans), sans-serif",
            letterSpacing: "0.04em",
            lineHeight: 1.8,
            maxWidth: 360,
          }}
        >
          Architectural analysis reveals value the eye doesn&apos;t naturally see.
          Move your cursor to explore.
        </p>
      </div>

      {/* Interactive hint */}
      <div
        style={{
          position: "absolute",
          top: 36,
          right: 44,
          zIndex: 2,
          opacity: visible ? 0.35 : 0,
          transition: "opacity 1.5s ease 0.8s",
        }}
      >
        <p
          style={{
            fontSize: 8,
            letterSpacing: "0.28em",
            textTransform: "uppercase",
            color: "rgba(237,232,223,0.5)",
            fontFamily: "var(--font-dm-sans), sans-serif",
            textAlign: "right",
          }}
        >
          Move cursor to explore
        </p>
      </div>
    </section>
  );
}
