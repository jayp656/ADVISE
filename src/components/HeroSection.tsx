"use client";
import { useEffect, useRef, useState } from "react";

const CHAR_DELAY = 30;
const INITIAL_DELAY = 200;

function FadeIn({
  children,
  delay = 0,
  duration = 1000,
  as: Tag = "div",
}: {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  as?: React.ElementType;
}) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(t);
  }, [delay]);
  return (
    <Tag
      className="transition-opacity"
      style={{ opacity: visible ? 1 : 0, transitionDuration: `${duration}ms` }}
    >
      {children}
    </Tag>
  );
}

function AnimatedHeading({
  text,
  className,
  style,
}: {
  text: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  const [started, setStarted] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setStarted(true), INITIAL_DELAY);
    return () => clearTimeout(t);
  }, []);

  const lines = text.split("\n");

  return (
    <h1 className={className} style={style}>
      {lines.map((line, lineIndex) => {
        const lineLength = line.length;
        return (
          <span key={lineIndex} style={{ display: "block" }}>
            {line.split("").map((char, charIndex) => {
              const delay =
                lineIndex * lineLength * CHAR_DELAY + charIndex * CHAR_DELAY;
              return (
                <span
                  key={charIndex}
                  style={{
                    display: "inline-block",
                    opacity: started ? 1 : 0,
                    transform: started ? "translateX(0)" : "translateX(-18px)",
                    transition: `opacity 500ms ${delay}ms, transform 500ms ${delay}ms`,
                  }}
                >
                  {char === " " ? " " : char}
                </span>
              );
            })}
          </span>
        );
      })}
    </h1>
  );
}

const NAV_LINKS = ["Homes", "ADUs", "Communities", "Lifestyle"];

export default function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    videoRef.current?.play().catch(() => {});
  }, []);

  return (
    <section
      style={{
        position: "relative",
        height: "100svh",
        minHeight: 640,
        overflow: "hidden",
        background: "#000",
      }}
    >
      {/* Video — raw, no overlay */}
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

      {/* Light scrim — just enough for text legibility */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to top, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.1) 50%, rgba(0,0,0,0.15) 100%)",
          zIndex: 1,
        }}
      />

      {/* Content layer */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Navbar */}
        <div className="px-6 md:px-12 lg:px-16 pt-6">
          <nav className="liquid-glass rounded-xl px-4 py-2 flex items-center justify-between">
            <span className="text-2xl font-semibold tracking-tight text-white">
              Summit Lot
            </span>

            <div className="hidden md:flex items-center gap-8">
              {NAV_LINKS.map((label) => (
                <a
                  key={label}
                  href="#"
                  className="text-sm text-white/80 transition-colors duration-200 hover:text-gray-300"
                >
                  {label}
                </a>
              ))}
            </div>

            <button className="bg-white text-black px-6 py-2 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors duration-200">
              Connect
            </button>
          </nav>
        </div>

        {/* Hero content — pinned to bottom */}
        <div className="px-6 md:px-12 lg:px-16 flex-1 flex flex-col justify-end pb-12 lg:pb-16">
          <div className="lg:grid lg:grid-cols-2 lg:items-end">
            {/* Left column */}
            <div>
              <AnimatedHeading
                text={"Designed for life\nby the coast."}
                className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-normal text-white mb-4"
                style={{ letterSpacing: "-0.04em" }}
              />

              <FadeIn delay={800} duration={1000}>
                <p className="text-base md:text-lg text-gray-300 mb-5">
                  Discover thoughtfully designed homes, ADUs, and investment
                  opportunities inspired by San Diego&apos;s coastal lifestyle,
                  modern architecture, and year-round outdoor living.
                </p>
              </FadeIn>

              <FadeIn delay={1200} duration={1000}>
                <div className="flex flex-wrap gap-4">
                  <button className="bg-white text-black px-8 py-3 rounded-lg font-medium">
                    Explore Properties
                  </button>
                  <button
                    className="liquid-glass border border-white/20 text-white px-8 py-3 rounded-lg font-medium transition-colors duration-200"
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.background =
                        "#fff";
                      (e.currentTarget as HTMLButtonElement).style.color =
                        "#000";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.background =
                        "";
                      (e.currentTarget as HTMLButtonElement).style.color = "";
                    }}
                  >
                    View Communities
                  </button>
                </div>
              </FadeIn>
            </div>

            {/* Right column — tag card */}
            <div className="flex items-end justify-start lg:justify-end mt-8 lg:mt-0">
              <FadeIn delay={1400} duration={1000}>
                <div className="liquid-glass border border-white/20 px-6 py-3 rounded-xl">
                  <p className="text-lg md:text-xl lg:text-2xl font-light text-white">
                    San Diego Coastal Living
                  </p>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
