"use client";
import { useEffect, useRef, useState } from "react";

const B = "https://ceimsgmzh6rmomfx.public.blob.vercel-storage.com/photos/";

const CELLS = [
  { src: `${B}1780968438544-IMG_7843.webp`, label: "Garage Conv. · Normal Heights", delay: 0.05 },
  { src: `${B}1780968419667-IMG_7837.jpeg`, label: "Detached ADU · North Park",      delay: 0.25 },
  { src: `${B}1780968428354-IMG_7839.jpeg`, label: "Garage ADU · Ocean Beach",        delay: 0.45 },
  { src: `${B}1780968423164-IMG_7838.jpeg`, label: "Detached ADU · Kensington",       delay: 0.15 },
  { src: `${B}1780968432147-IMG_7840.jpeg`, label: "Luxury ADU · La Jolla",           delay: 0.55 },
  { src: `${B}1780969578661-IMG_7845.jpeg`,  label: "Detached ADU · Encanto",         delay: 0.35 },
  { src: `${B}1780968437686-IMG_7842.jpeg`, label: "Detached ADU · South Park",       delay: 0.65 },
  { src: `${B}1780968436356-IMG_7841.jpeg`, label: "SB9 Split · Mission Hills",       delay: 0.75 },
  { src: `${B}1780969579854-IMG_7847.jpeg`, label: "Detached ADU · Mission Valley",   delay: 0.85 },
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
              className="nb-cell"
              style={{
                position: "relative",
                aspectRatio: "4/3",
                opacity: visible ? 1 : 0,
                transition: `opacity 1.6s ease ${c.delay}s`,
              }}
            >
              <img
                src={c.src}
                alt=""
                loading="lazy"
                decoding="async"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  filter: "saturate(0.78) brightness(0.68)",
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
