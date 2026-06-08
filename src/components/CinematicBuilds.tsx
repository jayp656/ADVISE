"use client";
import { useEffect, useRef, useState } from "react";

const BUILDS = [
  {
    num: "01",
    title: "Boundary Street",
    location: "North Park · San Diego",
    type: "Detached ADU",
    metric: "$2,950 / mo",
    metricLabel: "Rental Income",
    sub: "480 sqft · Permitted in 11 weeks · Leased in 6 days",
    image:
      "https://images.unsplash.com/photo-1668015642451-a3bb11afb441?w=2400&q=90&fit=crop",
  },
  {
    num: "02",
    title: "Coastal Reserve",
    location: "Encinitas · San Diego County",
    type: "Detached ADU + House Hack",
    metric: "14 months",
    metricLabel: "To Full Mortgage Coverage",
    sub: "Two ADUs on a single coastal lot · Owner lives free",
    image:
      "https://images.unsplash.com/photo-1700110615373-91b4ffc37067?w=2400&q=90&fit=crop",
  },
  {
    num: "03",
    title: "Cable Street",
    location: "Ocean Beach · San Diego",
    type: "Garage Conversion ADU",
    metric: "$2,400 / mo",
    metricLabel: "Rental Income",
    sub: "$112,000 build cost · 3.9 yr payback · Beach-premium rents",
    image:
      "https://images.unsplash.com/photo-1719324923613-ff0884b031ed?w=2400&q=90&fit=crop",
  },
  {
    num: "04",
    title: "Marlborough Drive",
    location: "Kensington · San Diego",
    type: "SB9 Lot Split",
    metric: "2 New Units",
    metricLabel: "Added By-Right",
    sub: "Corner lot · No public hearing · Both rented in 2 weeks",
    image:
      "https://images.unsplash.com/photo-1660361338485-c926a27d4eb8?w=2400&q=90&fit=crop",
  },
  {
    num: "05",
    title: "Harbor Crown",
    location: "Chula Vista · San Diego County",
    type: "Value-Add Multi-Unit",
    metric: "+38% NOI",
    metricLabel: "Without Adding Square Footage",
    sub: "Targeted renovations + utility sub-metering · 4 units repositioned",
    image:
      "https://images.unsplash.com/photo-1773099032238-6aaee4fb7f18?w=2400&q=90&fit=crop",
  },
  {
    num: "06",
    title: "The Meridian",
    location: "North Park · San Diego",
    type: "Garage ADU + JADU",
    metric: "$40K Grant",
    metricLabel: "CalHFA — No Repayment",
    sub: "Two income streams on one residential lot · Grant covered full pre-dev cost",
    image:
      "https://images.unsplash.com/photo-1735987928098-c512af56d1a9?w=2400&q=90&fit=crop",
  },
];

function BuildSlide({ build }: { build: (typeof BUILDS)[0] }) {
  const [revealed, setRevealed] = useState(false);
  const ref = useRef<HTMLElement>(null);
  const triggered = useRef(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && !triggered.current) {
          triggered.current = true;
          setRevealed(true);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      aria-label={build.title}
      style={{
        position: "relative",
        height: "100svh",
        minHeight: 560,
        overflow: "hidden",
        background: "#060402",
      }}
    >
      {/* Property image — emerges from darkness */}
      <img
        src={build.image}
        alt=""
        loading="lazy"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "center",
          filter: `brightness(${revealed ? 0.7 : 0.12}) saturate(${revealed ? 0.82 : 0.3})`,
          transform: revealed ? "scale(1.0)" : "scale(1.06)",
          transition: "filter 2.8s cubic-bezier(0.23,1,0.32,1), transform 3.2s cubic-bezier(0.23,1,0.32,1)",
        }}
      />

      {/* Bottom gradient — strong, for legibility */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to top, rgba(6,4,2,0.97) 0%, rgba(6,4,2,0.55) 28%, rgba(6,4,2,0.08) 62%, rgba(6,4,2,0.2) 100%)",
        }}
      />
      {/* Left edge shadow */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(to right, rgba(6,4,2,0.6) 0%, transparent 40%)",
        }}
      />

      {/* Ghost project number — right side */}
      <span
        aria-hidden
        style={{
          position: "absolute",
          right: -12,
          bottom: -16,
          fontFamily: "var(--font-cormorant), Georgia, serif",
          fontSize: "clamp(120px, 18vw, 240px)",
          fontWeight: 300,
          color: "rgba(255,255,255,0.032)",
          lineHeight: 1,
          userSelect: "none",
          opacity: revealed ? 1 : 0,
          transition: "opacity 2.5s ease 1s",
          zIndex: 1,
        }}
      >
        {build.num}
      </span>

      {/* Counter top-left */}
      <div
        style={{
          position: "absolute",
          top: 40,
          left: 52,
          zIndex: 3,
          display: "flex",
          alignItems: "center",
          gap: 12,
          opacity: revealed ? 0.5 : 0,
          transition: "opacity 1.2s ease 0.8s",
        }}
      >
        <span
          style={{
            fontSize: 10,
            letterSpacing: "0.22em",
            color: "rgba(237,232,223,0.6)",
            fontFamily: "var(--font-dm-sans), sans-serif",
            textTransform: "uppercase",
          }}
        >
          {build.num} — {BUILDS.length.toString().padStart(2, "0")}
        </span>
        <div
          style={{
            width: 32,
            height: 1,
            background: "rgba(237,232,223,0.25)",
          }}
        />
        <span
          style={{
            fontSize: 9,
            letterSpacing: "0.26em",
            color: "rgba(156,128,96,0.7)",
            fontFamily: "var(--font-dm-sans), sans-serif",
            textTransform: "uppercase",
          }}
        >
          {build.type}
        </span>
      </div>

      {/* Main content — bottom */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 3,
          padding: "0 52px 52px",
          maxWidth: 1360,
          margin: "0 auto",
        }}
      >
        {/* Divider line */}
        <div
          style={{
            height: 1,
            background: "rgba(255,255,255,0.07)",
            marginBottom: 28,
            opacity: revealed ? 1 : 0,
            transition: "opacity 1s ease 0.6s",
            transformOrigin: "left",
            transform: revealed ? "scaleX(1)" : "scaleX(0)",
          }}
        />

        {/* Bottom row */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            gap: 32,
            flexWrap: "wrap",
          }}
        >
          {/* Left — title + location */}
          <div
            style={{
              opacity: revealed ? 1 : 0,
              transform: revealed ? "translateY(0)" : "translateY(24px)",
              transition: "opacity 1.4s ease 0.7s, transform 1.4s ease 0.7s",
            }}
          >
            <p
              style={{
                fontSize: 9,
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                color: "rgba(156,128,96,0.6)",
                fontFamily: "var(--font-dm-sans), sans-serif",
                marginBottom: 10,
              }}
            >
              {build.location}
            </p>
            <h2
              style={{
                fontFamily: "var(--font-cormorant), Georgia, serif",
                fontSize: "clamp(42px, 5.5vw, 82px)",
                fontWeight: 300,
                color: "#EDE8DF",
                letterSpacing: "-0.025em",
                lineHeight: 1.0,
                margin: "0 0 12px",
              }}
            >
              {build.title}
            </h2>
            <p
              style={{
                fontSize: 11,
                color: "rgba(237,232,223,0.22)",
                fontFamily: "var(--font-dm-sans), sans-serif",
                letterSpacing: "0.06em",
                lineHeight: 1.7,
                maxWidth: 420,
              }}
            >
              {build.sub}
            </p>
          </div>

          {/* Right — primary metric */}
          <div
            style={{
              textAlign: "right",
              flexShrink: 0,
              opacity: revealed ? 1 : 0,
              transform: revealed ? "translateY(0)" : "translateY(24px)",
              transition: "opacity 1.4s ease 1s, transform 1.4s ease 1s",
            }}
          >
            <p
              style={{
                fontSize: 8,
                letterSpacing: "0.28em",
                textTransform: "uppercase",
                color: "rgba(237,232,223,0.25)",
                fontFamily: "var(--font-dm-sans), sans-serif",
                marginBottom: 8,
              }}
            >
              {build.metricLabel}
            </p>
            <p
              style={{
                fontFamily: "var(--font-cormorant), Georgia, serif",
                fontSize: "clamp(32px, 4vw, 60px)",
                fontWeight: 300,
                color: "rgba(156,128,96,0.92)",
                letterSpacing: "-0.02em",
                lineHeight: 1,
                whiteSpace: "nowrap",
              }}
            >
              {build.metric}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function CinematicBuilds() {
  return (
    <div id="case-studies" style={{ background: "#060402" }}>
      {/* Section intro — above slides */}
      <div
        style={{
          maxWidth: 1360,
          margin: "0 auto",
          padding: "112px 52px 80px",
        }}
      >
        <p
          style={{
            fontSize: 9,
            letterSpacing: "0.32em",
            textTransform: "uppercase",
            color: "rgba(156,128,96,0.5)",
            fontFamily: "var(--font-dm-sans), sans-serif",
            marginBottom: 24,
          }}
        >
          Built in San Diego County
        </p>
        <h2
          style={{
            fontFamily: "var(--font-cormorant), Georgia, serif",
            fontSize: "clamp(40px, 5vw, 80px)",
            fontWeight: 300,
            color: "#EDE8DF",
            letterSpacing: "-0.025em",
            lineHeight: 1.04,
            margin: "0 0 20px",
          }}
        >
          Every build
          <br />
          <span style={{ opacity: 0.38 }}>tells a different story.</span>
        </h2>
        <p
          style={{
            fontSize: 13,
            color: "rgba(237,232,223,0.25)",
            fontFamily: "var(--font-dm-sans), sans-serif",
            letterSpacing: "0.04em",
            lineHeight: 1.8,
            maxWidth: 420,
          }}
        >
          Scroll through six Domaine-analyzed properties. Each one started as an
          ordinary San Diego home.
        </p>
      </div>

      {/* Slides */}
      {BUILDS.map((b) => (
        <BuildSlide key={b.num} build={b} />
      ))}

      {/* Outro spacer with disclaimer */}
      <div
        style={{
          padding: "40px 52px 56px",
          maxWidth: 1360,
          margin: "0 auto",
        }}
      >
        <p
          style={{
            fontSize: 9,
            color: "rgba(237,232,223,0.15)",
            fontFamily: "var(--font-dm-sans), sans-serif",
            letterSpacing: "0.1em",
          }}
        >
          All projects Domaine-analyzed · Income and returns reflect individual outcomes and may vary
        </p>
      </div>
    </div>
  );
}
