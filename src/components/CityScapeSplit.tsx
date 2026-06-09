"use client";
import { useEffect, useRef, useState } from "react";

export default function CityScapeSplit() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);
  const triggered = useRef(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && !triggered.current) {
          triggered.current = true;
          setVisible(true);
        }
      },
      { threshold: 0.08 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const initGsap = async () => {
      const { default: gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);
      if (imgRef.current && ref.current) {
        gsap.to(imgRef.current, {
          y: -70,
          ease: "none",
          scrollTrigger: {
            trigger: ref.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      }
    };
    initGsap();
  }, []);

  return (
    <section
      ref={ref}
      style={{
        position: "relative",
        height: "100svh",
        minHeight: 600,
        overflow: "hidden",
        background: "#080705",
      }}
    >
      {/* Full-bleed parallax image */}
      <div
        ref={imgRef}
        style={{ position: "absolute", inset: "-10% 0", willChange: "transform" }}
      >
        <img
          src="https://images.unsplash.com/photo-1519954352454-2d5a7353e277?w=2400&q=90&fit=crop&crop=center"
          alt="San Diego Bay and downtown skyline"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center 42%",
            filter: "saturate(0.68) brightness(0.82)",
          }}
        />
      </div>

      {/* Left-to-right gradient for text legibility */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to right, rgba(8,7,5,0.94) 0%, rgba(8,7,5,0.60) 40%, rgba(8,7,5,0.10) 72%, rgba(8,7,5,0) 100%)",
          zIndex: 1,
        }}
      />
      {/* Bottom vignette */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to top, rgba(8,7,5,0.88) 0%, rgba(8,7,5,0) 32%)",
          zIndex: 1,
        }}
      />
      {/* Top vignette */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to bottom, rgba(8,7,5,0.55) 0%, rgba(8,7,5,0) 22%)",
          zIndex: 1,
        }}
      />

      {/* Editorial text column */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 2,
          display: "flex",
          alignItems: "center",
          padding: "0 max(48px, 5vw)",
        }}
      >
        <div style={{ maxWidth: 540 }}>
          <p
            style={{
              fontSize: 9,
              letterSpacing: "0.32em",
              textTransform: "uppercase",
              color: "rgba(156,128,96,0.55)",
              fontFamily: "var(--font-dm-sans), sans-serif",
              marginBottom: 32,
              opacity: visible ? 1 : 0,
              transition: "opacity 1.6s ease 0.2s",
            }}
          >
            San Diego Bay · Downtown
          </p>

          <h2
            style={{
              fontFamily: "var(--font-cormorant), Georgia, serif",
              fontSize: "clamp(54px, 7.5vw, 108px)",
              fontWeight: 300,
              color: "#EDE8DF",
              letterSpacing: "-0.028em",
              lineHeight: 1.0,
              margin: "0 0 0",
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(28px)",
              transition: "opacity 2s ease 0.35s, transform 2s ease 0.35s",
            }}
          >
            The city
            <br />
            is your
            <br />
            <em style={{ color: "rgba(237,232,223,0.36)", fontStyle: "italic" }}>
              portfolio.
            </em>
          </h2>

          {/* Rule */}
          <div
            style={{
              width: 44,
              height: 1,
              background: "rgba(156,128,96,0.38)",
              margin: "36px 0",
              opacity: visible ? 1 : 0,
              transform: visible ? "scaleX(1)" : "scaleX(0)",
              transformOrigin: "left",
              transition: "opacity 1.4s ease 1s, transform 1.4s ease 1s",
            }}
          />

          <p
            style={{
              fontSize: 14,
              color: "rgba(237,232,223,0.32)",
              fontFamily: "var(--font-dm-sans), sans-serif",
              lineHeight: 1.88,
              letterSpacing: "0.03em",
              maxWidth: 380,
              opacity: visible ? 1 : 0,
              transition: "opacity 1.6s ease 1.1s",
            }}
          >
            San Diego County's property values rank among the strongest in the
            nation. Every lot holds potential. We identify which opportunity is
            worth pursuing — and exactly how much it's worth.
          </p>

          <a
            href="#search"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 12,
              marginTop: 44,
              fontSize: 9,
              letterSpacing: "0.28em",
              textTransform: "uppercase",
              color: "rgba(237,232,223,0.48)",
              textDecoration: "none",
              fontFamily: "var(--font-dm-sans), sans-serif",
              opacity: visible ? 1 : 0,
              transition: "opacity 1.5s ease 1.5s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#EDE8DF")}
            onMouseLeave={(e) =>
              (e.currentTarget.style.color = "rgba(237,232,223,0.48)")
            }
          >
            Analyze Your Property
            <span style={{ color: "rgba(156,128,96,0.7)", fontSize: 13 }}>→</span>
          </a>
        </div>
      </div>

      {/* Bottom-right photo caption */}
      <p
        style={{
          position: "absolute",
          bottom: 28,
          right: 32,
          fontSize: 8,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: "rgba(237,232,223,0.16)",
          fontFamily: "var(--font-dm-sans), sans-serif",
          zIndex: 2,
          opacity: visible ? 1 : 0,
          transition: "opacity 1.5s ease 2s",
        }}
      >
        San Diego Bay · Point Loma Peninsula
      </p>
    </section>
  );
}
