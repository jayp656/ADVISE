"use client";
import { useEffect, useRef, useState } from "react";

export default function Statement() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.2 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      style={{
        background: "#FAF8F4",
        padding: "140px 48px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 16,
          marginBottom: 48,
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(16px)",
          transition: "opacity 0.9s ease, transform 0.9s ease",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-cormorant), serif",
            fontSize: 18,
            color: "rgba(156,128,96,0.35)",
            letterSpacing: "0.1em",
          }}
        >
          不動産
        </span>
        <div style={{ width: 1, height: 14, background: "rgba(156,128,96,0.25)" }} />
        <p
          style={{
            fontSize: 9,
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: "#9C8060",
            fontFamily: "var(--font-dm-sans), sans-serif",
          }}
        >
          A different kind of advisory
        </p>
        <div style={{ width: 1, height: 14, background: "rgba(156,128,96,0.25)" }} />
        <span
          style={{
            fontFamily: "var(--font-cormorant), serif",
            fontSize: 18,
            color: "rgba(156,128,96,0.35)",
            letterSpacing: "0.1em",
          }}
        >
          価値
        </span>
      </div>

      <blockquote
        style={{
          fontFamily: "var(--font-cormorant), Georgia, serif",
          fontSize: "clamp(26px, 3.8vw, 52px)",
          fontWeight: 300,
          fontStyle: "normal",
          color: "#2A2420",
          letterSpacing: "-0.018em",
          lineHeight: 1.38,
          maxWidth: 860,
          margin: "0 auto 52px",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(20px)",
          transition: "opacity 0.9s ease 0.15s, transform 0.9s ease 0.15s",
        }}
      >
        &ldquo;Most homeowners never discover what their property is truly capable of. We change that — with precision, privacy, and deep local expertise.&rdquo;
      </blockquote>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 20,
          opacity: visible ? 1 : 0,
          transition: "opacity 0.9s ease 0.3s",
        }}
      >
        <div style={{ width: 32, height: 1, background: "rgba(156,128,96,0.4)" }} />
        <p
          style={{
            fontSize: 11,
            color: "#8B7B6A",
            fontFamily: "var(--font-dm-sans), sans-serif",
            letterSpacing: "0.08em",
          }}
        >
          Jason Umana, Founder · Domaine Co.
        </p>
        <div style={{ width: 32, height: 1, background: "rgba(156,128,96,0.4)" }} />
      </div>
    </section>
  );
}
