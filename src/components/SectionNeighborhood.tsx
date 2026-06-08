"use client";
import { useEffect, useRef, useState } from "react";

const CELLS = [
  { img: "photo-1600596542815-ffad4c1539a9", crop: "center", label: "ADU · North Park", delay: 0.05 },
  { img: "photo-1668015642451-a3bb11afb441", crop: "center", label: "Garage Conv. · Ocean Beach", delay: 0.25 },
  { img: "photo-1719324923613-ff0884b031ed", crop: "top", label: "SB9 Split · Kensington", delay: 0.45 },
  { img: "photo-1660361338485-c926a27d4eb8", crop: "center", label: "ADU · Hillcrest", delay: 0.15 },
  { img: "photo-1600596542815-ffad4c1539a9", crop: "left", label: "Jr. ADU · Mission Hills", delay: 0.55 },
  { img: "photo-1668015642451-a3bb11afb441", crop: "bottom", label: "Addition · South Park", delay: 0.35 },
  { img: "photo-1719324923613-ff0884b031ed", crop: "center", label: "ADU · Normal Heights", delay: 0.65 },
  { img: "photo-1660361338485-c926a27d4eb8", crop: "top", label: "Conversion · Point Loma", delay: 0.75 },
  { img: "photo-1657383543368-7d929944be6a", crop: "center", label: "Jr. ADU · City Heights", delay: 0.85 },
];

export default function SectionNeighborhood() {
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
      { threshold: 0.12 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      id="neighborhood"
      style={{ background: "#060504", padding: "140px 48px", overflow: "hidden" }}
    >
      <div style={{ maxWidth: 1360, margin: "0 auto" }}>

        {/* Header */}
        <div
          style={{
            marginBottom: 64,
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(16px)",
            transition: "opacity 1.2s ease, transform 1.2s ease",
          }}
        >
          <p
            style={{
              fontSize: 9,
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: "rgba(156,128,96,0.5)",
              fontFamily: "var(--font-dm-sans), sans-serif",
              marginBottom: 20,
            }}
          >
            Section 04 · The Neighborhood
          </p>
          <h2
            style={{
              fontFamily: "var(--font-cormorant), Georgia, serif",
              fontSize: "clamp(44px, 5.5vw, 82px)",
              fontWeight: 300,
              color: "#EDE8DF",
              letterSpacing: "-0.025em",
              lineHeight: 1.0,
              margin: 0,
              maxWidth: 580,
            }}
          >
            Opportunity exists
            <br />
            <span style={{ opacity: 0.38 }}>across the city.</span>
          </h2>
        </div>

        {/* Grid */}
        <div
          className="grid-cols-2 lg:grid-cols-3"
          style={{
            display: "grid",
            gap: 2,
          }}
        >
          {CELLS.map((c, i) => (
            <div
              key={i}
              style={{
                position: "relative",
                aspectRatio: "4/3",
                overflow: "hidden",
                opacity: visible ? 1 : 0,
                transition: `opacity 1.6s ease ${c.delay}s`,
              }}
            >
              <img
                src={`https://images.unsplash.com/${c.img}?w=600&q=80&fit=crop&crop=${c.crop}`}
                alt=""
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  filter: "saturate(0.55) brightness(0.48)",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(to top, rgba(6,5,4,0.88) 0%, rgba(6,5,4,0.05) 55%)",
                }}
              />
              <p
                style={{
                  position: "absolute",
                  bottom: 14,
                  left: 14,
                  fontSize: 8,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "rgba(156,128,96,0.65)",
                  fontFamily: "var(--font-dm-sans), sans-serif",
                  opacity: visible ? 1 : 0,
                  transition: `opacity 1.2s ease ${c.delay + 0.5}s`,
                }}
              >
                {c.label}
              </p>
            </div>
          ))}
        </div>

        <p
          style={{
            marginTop: 52,
            fontSize: 13,
            color: "rgba(237,232,223,0.2)",
            fontFamily: "var(--font-dm-sans), sans-serif",
            letterSpacing: "0.06em",
            opacity: visible ? 1 : 0,
            transition: "opacity 1.2s ease 1.2s",
          }}
        >
          We help uncover where it lives.
        </p>
      </div>
    </section>
  );
}
