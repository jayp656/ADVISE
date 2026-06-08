"use client";
import { useEffect, useRef, useState } from "react";

export default function SectionHero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 100);
    videoRef.current?.play().catch(() => {});
    return () => clearTimeout(t);
  }, []);

  return (
    <section
      aria-label="Hero"
      style={{
        position: "relative",
        height: "100svh",
        minHeight: 680,
        overflow: "hidden",
        background: "#0C0A08",
      }}
    >
      {/* Live video background */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        poster="https://images.unsplash.com/photo-1657383543368-7d929944be6a?w=2400&q=90&fit=crop"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "center 60%",
          opacity: loaded ? 0.72 : 0,
          transition: "opacity 3s ease",
          filter: "saturate(0.88)",
        }}
      >
        <source
          src="https://videos.pexels.com/video-files/11635385/11635385-hd_1920_1080_30fps.mp4"
          type="video/mp4"
        />
        <source
          src="https://videos.pexels.com/video-files/8045176/8045176-hd_1920_1080_25fps.mp4"
          type="video/mp4"
        />
      </video>

      {/* Bottom gradient — text legibility */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to top, rgba(12,10,8,0.96) 0%, rgba(12,10,8,0.38) 38%, rgba(12,10,8,0.1) 65%, rgba(12,10,8,0.18) 100%)",
          zIndex: 1,
        }}
      />
      {/* Left vignette */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(to right, rgba(12,10,8,0.55) 0%, transparent 55%)",
          zIndex: 1,
        }}
      />

      <div
        style={{
          position: "relative",
          zIndex: 2,
          height: "100%",
          maxWidth: 1360,
          margin: "0 auto",
          padding: "0 48px 96px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
        }}
      >
        <p
          style={{
            fontSize: 9,
            letterSpacing: "0.32em",
            textTransform: "uppercase",
            color: "rgba(156,128,96,0.65)",
            fontFamily: "var(--font-dm-sans), sans-serif",
            marginBottom: 32,
            opacity: loaded ? 1 : 0,
            transition: "opacity 1.5s ease 1.4s",
          }}
        >
          Property Intelligence · San Diego County
        </p>

        <h1
          style={{
            fontFamily: "var(--font-cormorant), Georgia, serif",
            fontSize: "clamp(44px, 5.5vw, 88px)",
            fontWeight: 300,
            color: "#EDE8DF",
            letterSpacing: "-0.02em",
            lineHeight: 1.04,
            margin: "0 0 32px",
            maxWidth: 680,
            opacity: loaded ? 1 : 0,
            transform: loaded ? "translateY(0)" : "translateY(28px)",
            transition: "opacity 2s ease 0.5s, transform 2s ease 0.5s",
          }}
        >
          Most properties hold more potential than their owners ever realize.
        </h1>

        <p
          style={{
            fontSize: 15,
            color: "rgba(237,232,223,0.38)",
            fontFamily: "var(--font-dm-sans), sans-serif",
            letterSpacing: "0.04em",
            fontWeight: 300,
            opacity: loaded ? 1 : 0,
            transition: "opacity 1.5s ease 1.8s",
          }}
        >
          The value isn&apos;t always visible.
        </p>

        {/* Scroll line */}
        <div
          style={{
            position: "absolute",
            right: 48,
            bottom: 96,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 10,
            opacity: loaded ? 0.45 : 0,
            transition: "opacity 1.5s ease 3s",
          }}
        >
          <div
            style={{
              width: 1,
              height: 56,
              background:
                "linear-gradient(to bottom, transparent, rgba(156,128,96,0.7))",
            }}
          />
          <span
            style={{
              fontSize: 8,
              letterSpacing: "0.25em",
              color: "rgba(156,128,96,0.7)",
              fontFamily: "var(--font-dm-sans), sans-serif",
              textTransform: "uppercase",
              writingMode: "vertical-rl",
            }}
          >
            Discover
          </span>
        </div>
      </div>
    </section>
  );
}
