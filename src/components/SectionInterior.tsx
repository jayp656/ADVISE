"use client";
import { useEffect, useRef, useState } from "react";

export default function SectionInterior() {
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
      style={{
        background: "#0A0806",
        minHeight: "100svh",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* ── Split: image left | text right ── */}
      <div
        className="flex flex-col lg:flex-row"
        style={{ flex: 1, minHeight: "100svh" }}
      >
        {/* Image panel */}
        <div
          style={{
            position: "relative",
            flex: "0 0 58%",
            minHeight: "55svh",
            overflow: "hidden",
          }}
          className="w-full lg:w-auto"
        >
          {/* Primary interior image */}
          <img
            src="https://ceimsgmzh6rmomfx.public.blob.vercel-storage.com/photos/1780967042904-IMG_7832.webp"
            alt="Finished ADU interior — designed bedroom with built-in shelving"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center center",
              opacity: visible ? 1 : 0,
              transition: "opacity 2.2s ease 0.2s",
              filter: "saturate(0.9) brightness(0.95)",
            }}
          />
          {/* Subtle right-edge fade into dark panel */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(to right, transparent 55%, rgba(10,8,6,0.85) 100%)",
              zIndex: 1,
            }}
            className="hidden lg:block"
          />
          {/* Bottom fade for mobile */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(to bottom, transparent 55%, rgba(10,8,6,0.95) 100%)",
              zIndex: 1,
            }}
            className="block lg:hidden"
          />

          {/* Detail badge — bottom left of image */}
          <div
            style={{
              position: "absolute",
              bottom: 36,
              left: 36,
              zIndex: 2,
              opacity: visible ? 1 : 0,
              transition: "opacity 1.2s ease 1.6s",
            }}
          >
            <span
              style={{
                display: "inline-block",
                fontSize: 8,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "rgba(237,232,223,0.5)",
                fontFamily: "var(--font-dm-sans), sans-serif",
                borderBottom: "1px solid rgba(237,232,223,0.18)",
                paddingBottom: 6,
              }}
            >
              Finished ADU · San Diego
            </span>
          </div>
        </div>

        {/* Text panel */}
        <div
          style={{
            flex: 1,
            background: "#0A0806",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "64px 56px",
          }}
        >
          {/* Section marker */}
          <p
            style={{
              fontSize: 9,
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: "rgba(156,128,96,0.5)",
              fontFamily: "var(--font-dm-sans), sans-serif",
              marginBottom: 36,
              opacity: visible ? 1 : 0,
              transition: "opacity 1s ease 0.8s",
            }}
          >
            The Finished Space
          </p>

          <h2
            style={{
              fontFamily: "var(--font-cormorant), Georgia, serif",
              fontSize: "clamp(36px, 4vw, 68px)",
              fontWeight: 300,
              color: "#EDE8DF",
              letterSpacing: "-0.02em",
              lineHeight: 1.06,
              margin: "0 0 28px",
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(16px)",
              transition: "opacity 1.4s ease 0.9s, transform 1.4s ease 0.9s",
            }}
          >
            Built with precision.
            <br />
            <span style={{ opacity: 0.42 }}>Designed to live in.</span>
          </h2>

          <p
            style={{
              fontSize: 14,
              color: "rgba(237,232,223,0.3)",
              fontFamily: "var(--font-dm-sans), sans-serif",
              lineHeight: 1.85,
              maxWidth: 340,
              marginBottom: 48,
              opacity: visible ? 1 : 0,
              transition: "opacity 1.2s ease 1.2s",
            }}
          >
            A well-designed ADU commands premium rents and keeps tenants
            long-term. Every material, every detail, every square foot is part
            of the return.
          </p>

          {/* Stats */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 0,
              borderTop: "1px solid rgba(237,232,223,0.07)",
              opacity: visible ? 1 : 0,
              transition: "opacity 1.2s ease 1.4s",
            }}
          >
            {[
              { label: "Average SD ADU tenant stay", value: "28 months" },
              { label: "Premium over unfinished units", value: "18 – 24%" },
              { label: "Average first-week leasing rate", value: "94%" },
            ].map((s) => (
              <div
                key={s.label}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "baseline",
                  gap: 24,
                  padding: "16px 0",
                  borderBottom: "1px solid rgba(237,232,223,0.05)",
                }}
              >
                <span
                  style={{
                    fontSize: 10,
                    letterSpacing: "0.08em",
                    color: "rgba(237,232,223,0.22)",
                    fontFamily: "var(--font-dm-sans), sans-serif",
                  }}
                >
                  {s.label}
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-cormorant), Georgia, serif",
                    fontSize: 22,
                    fontWeight: 300,
                    color: "rgba(156,128,96,0.85)",
                    letterSpacing: "-0.01em",
                    whiteSpace: "nowrap",
                  }}
                >
                  {s.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
