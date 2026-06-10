"use client";
import { useEffect, useRef, useState } from "react";

const BEFORE = "https://ceimsgmzh6rmomfx.public.blob.vercel-storage.com/photos/1780936668685-IMG_7817.jpeg";
const AFTER  = "https://ceimsgmzh6rmomfx.public.blob.vercel-storage.com/photos/1780936666215-IMG_7818.jpeg";

export default function ProjectSpread() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.08 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      style={{ background: "#080806", overflow: "hidden" }}
    >
      {/* ── Editorial header ── */}
      <div
        style={{
          maxWidth: 1360,
          margin: "0 auto",
          padding: "clamp(48px,8vw,96px) clamp(20px,4vw,48px) clamp(24px,4vw,48px)",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          alignItems: "flex-end",
          gap: 16,
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(20px)",
          transition: "opacity 1s ease 0.1s, transform 1s ease 0.1s",
        }}
      >
        <div>
          <p style={{
            fontSize: 9,
            letterSpacing: "0.32em",
            textTransform: "uppercase",
            color: "rgba(156,128,96,0.6)",
            fontFamily: "var(--font-dm-sans), sans-serif",
            marginBottom: 14,
          }}>
            Project Case Study · San Diego
          </p>
          <h2 style={{
            fontFamily: "var(--font-cormorant), Georgia, serif",
            fontSize: "clamp(38px, 5vw, 72px)",
            fontWeight: 300,
            color: "#EDE8DF",
            letterSpacing: "-0.025em",
            lineHeight: 1.05,
            margin: 0,
          }}>
            The transformation.
          </h2>
        </div>
        <p style={{
          fontSize: 11,
          color: "rgba(237,232,223,0.22)",
          fontFamily: "var(--font-dm-sans), sans-serif",
          letterSpacing: "0.06em",
          lineHeight: 1.8,
          maxWidth: 240,
          textAlign: "right",
        }}>
          One property. One vision.<br />
          A garage conversion that redefined the lot.
        </p>
      </div>

      {/* ── Metrics bar ── */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        borderTop: "1px solid rgba(237,232,223,0.06)",
        borderBottom: "1px solid rgba(237,232,223,0.06)",
        opacity: visible ? 1 : 0,
        transition: "opacity 1.2s ease 0.6s",
      }}>
        {[
          { label: "Time to Complete", value: "5 months" },
          { label: "Monthly Rent", value: "$3,200 / mo" },
          { label: "Payback Period", value: "3.4 yrs" },
        ].map((m, i) => (
          <div key={m.label} style={{
            padding: "24px clamp(16px,3vw,48px)",
            borderRight: i < 2 ? "1px solid rgba(237,232,223,0.06)" : "none",
          }}>
            <p style={{
              fontSize: 8,
              letterSpacing: "0.28em",
              textTransform: "uppercase",
              color: "rgba(156,128,96,0.5)",
              fontFamily: "var(--font-dm-sans), sans-serif",
              margin: "0 0 10px",
            }}>
              {m.label}
            </p>
            <p style={{
              fontFamily: "var(--font-cormorant), Georgia, serif",
              fontSize: "clamp(26px, 2.8vw, 40px)",
              fontWeight: 300,
              color: "#EDE8DF",
              letterSpacing: "-0.02em",
              margin: 0,
              lineHeight: 1,
            }}>
              {m.value}
            </p>
          </div>
        ))}
      </div>

      {/* ── Before / After grid ── */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "2px",
          margin: "2px 0 0",
          opacity: visible ? 1 : 0,
          transition: "opacity 1.2s ease 0.8s",
        }}
      >
        {[
          { src: BEFORE, label: "Before", sub: "Original condition" },
          { src: AFTER,  label: "After",  sub: "Post-conversion" },
        ].map(({ src, label, sub }) => (
          <div key={label} style={{ position: "relative", overflow: "hidden" }}>
            <img
              src={src}
              alt={label}
              style={{
                width: "100%",
                height: "clamp(280px, 42svh, 520px)",
                objectFit: "cover",
                objectPosition: "center",
                display: "block",
                filter: label === "Before" ? "saturate(0.5) brightness(0.75)" : "saturate(0.88) brightness(0.92)",
                transform: visible ? "scale(1)" : "scale(1.06)",
                transition: "transform 2s ease 1s",
              }}
            />
            {/* Overlay gradient */}
            <div style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(to top, rgba(8,8,6,0.75) 0%, transparent 50%)",
            }} />

            {/* Label */}
            <div style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              padding: "28px 36px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
            }}>
              <div>
                <p style={{
                  fontSize: 8,
                  letterSpacing: "0.3em",
                  textTransform: "uppercase",
                  color: "rgba(156,128,96,0.7)",
                  fontFamily: "var(--font-dm-sans), sans-serif",
                  margin: "0 0 6px",
                }}>
                  {sub}
                </p>
                <p style={{
                  fontFamily: "var(--font-cormorant), Georgia, serif",
                  fontSize: "clamp(28px, 3vw, 44px)",
                  fontWeight: 300,
                  color: "#EDE8DF",
                  letterSpacing: "-0.02em",
                  margin: 0,
                  lineHeight: 1,
                }}>
                  {label}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ── Footer caption ── */}
      <div style={{
        maxWidth: 1360,
        margin: "0 auto",
        padding: "24px clamp(20px,4vw,48px) clamp(40px,6vw,80px)",
        display: "flex",
        flexWrap: "wrap",
        gap: 8,
        justifyContent: "space-between",
        alignItems: "center",
        borderTop: "1px solid rgba(237,232,223,0.05)",
        opacity: visible ? 1 : 0,
        transition: "opacity 1s ease 1.4s",
      }}>
        <p style={{
          fontSize: 10,
          color: "rgba(237,232,223,0.18)",
          fontFamily: "var(--font-dm-sans), sans-serif",
          letterSpacing: "0.1em",
          margin: 0,
        }}>
          Garage Conversion ADU · San Diego, CA
        </p>
        <p style={{
          fontSize: 10,
          color: "rgba(237,232,223,0.18)",
          fontFamily: "var(--font-dm-sans), sans-serif",
          letterSpacing: "0.1em",
          margin: 0,
        }}>
          Summit Lot · Project Portfolio
        </p>
      </div>
    </section>
  );
}
