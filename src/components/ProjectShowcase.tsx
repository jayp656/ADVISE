"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";

const PROJECTS = [
  {
    num: "01",
    title: "The Meridian",
    location: "North Park · San Diego County",
    type: "Garage Conversion + JADU",
    analyzed: "Analyzed · Nov 14, 2024",
    image: "https://images.unsplash.com/photo-1735987928098-c512af56d1a9?w=1600&q=88&fit=crop",
    metrics: { "Target IRR": "18%", "Equity Mult.": "2.1×", "Hold Period": "5 yrs", Units: "2" },
    desc: "Converted a 3-car detached garage into a legal ADU while adding a studio JADU — producing two income streams on a single residential lot.",
  },
  {
    num: "02",
    title: "Coastal Reserve",
    location: "Encinitas · San Diego County",
    type: "Detached ADU + House Hack",
    analyzed: "Analyzed · Mar 02, 2024",
    image: "https://images.unsplash.com/photo-1700110615373-91b4ffc37067?w=1600&q=88&fit=crop",
    metrics: { "Target IRR": "22%", "Equity Mult.": "2.4×", "Hold Period": "7 yrs", Units: "3" },
    desc: "Owner-occupancy strategy with two detached ADUs on a coastal lot. Owner eliminated mortgage entirely within 14 months of completion.",
  },
  {
    num: "03",
    title: "Harbor Crown",
    location: "Chula Vista · San Diego County",
    type: "Value-Add Multi-Unit",
    analyzed: "Analyzed · Aug 19, 2023",
    image: "https://images.unsplash.com/photo-1773099032238-6aaee4fb7f18?w=1600&q=88&fit=crop",
    metrics: { "Target IRR": "16%", "Equity Mult.": "1.9×", "Hold Period": "4 yrs", Units: "4" },
    desc: "Repositioned a tired triplex through targeted unit renovations and utility sub-metering — increasing NOI by 38% without adding square footage.",
  },
];

function CornerMark({ pos }: { pos: "tl" | "tr" | "bl" | "br" }) {
  const isRight = pos.endsWith("r");
  const isBottom = pos.startsWith("b");
  const gold = "rgba(255,255,255,0.55)";
  return (
    <div
      style={{
        position: "absolute",
        [isRight ? "right" : "left"]: 14,
        [isBottom ? "bottom" : "top"]: 14,
        width: 18,
        height: 18,
        pointerEvents: "none",
        zIndex: 4,
      }}
    >
      <div style={{ position: "absolute", [isBottom ? "bottom" : "top"]: 0, left: 0, right: 0, height: 1, background: gold }} />
      <div style={{ position: "absolute", top: 0, bottom: 0, [isRight ? "right" : "left"]: 0, width: 1, background: gold }} />
    </div>
  );
}

export default function ProjectShowcase() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imgRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let ctx: any = null;

    const init = async () => {
      const { default: gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      const section = sectionRef.current;
      const imgs = imgRefs.current.filter(Boolean) as HTMLDivElement[];
      if (!section || imgs.length < 3) return;

      gsap.set(imgs[0], { opacity: 1, scale: 1 });
      gsap.set(imgs[1], { opacity: 0, scale: 1.05 });
      gsap.set(imgs[2], { opacity: 0, scale: 1.05 });

      ctx = gsap.context(() => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "+=260%",
            scrub: 1.2,
            pin: true,
            anticipatePin: 1,
            onUpdate: (self) => {
              const p = self.progress;
              setActiveIdx(p < 0.44 ? 0 : p < 0.88 ? 1 : 2);
            },
          },
        });

        tl.to(imgs[0], { opacity: 0, scale: 0.97, duration: 1 }, 0)
          .to(imgs[1], { opacity: 1, scale: 1, duration: 1 }, 0);

        tl.to(imgs[1], { opacity: 0, scale: 0.97, duration: 1 }, 1)
          .to(imgs[2], { opacity: 1, scale: 1, duration: 1 }, 1);
      }, section);
    };

    init();
    return () => ctx?.revert();
  }, []);

  const proj = PROJECTS[activeIdx];

  return (
    <section
      ref={sectionRef}
      id="case-studies"
      style={{ background: "#191612", height: "100svh", overflow: "hidden" }}
    >
      {/* Top hairline */}
      <div style={{ height: 1, background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.28) 20%, rgba(255,255,255,0.28) 80%, transparent)" }} />

      <div
        style={{
          height: "calc(100svh - 2px)",
          display: "flex",
          flexDirection: "column",
          padding: "22px 44px 24px",
          maxWidth: 1440,
          margin: "0 auto",
          width: "100%",
        }}
      >
        {/* ── Header row ── */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 18, flexShrink: 0 }}>
          <p
            style={{
              fontSize: 10,
              letterSpacing: "0.24em",
              textTransform: "uppercase",
              color: "rgba(237,232,223,0.22)",
              fontFamily: "var(--font-dm-sans), sans-serif",
            }}
          >
            Summit Lot · Project Intelligence
          </p>

          {/* Project selector tabs */}
          <nav style={{ display: "flex", alignItems: "center", gap: 32 }}>
            {PROJECTS.map((p, i) => (
              <button
                key={p.num}
                style={{
                  fontSize: 10,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  fontFamily: "var(--font-dm-sans), sans-serif",
                  color: activeIdx === i ? "var(--cream)" : "rgba(237,232,223,0.24)",
                  background: "none",
                  border: "none",
                  borderBottom: activeIdx === i ? "1px solid rgba(255,255,255,0.65)" : "1px solid transparent",
                  paddingBottom: 4,
                  cursor: "pointer",
                  transition: "color 0.3s ease",
                }}
                onClick={() => setActiveIdx(i)}
              >
                {p.num} · {p.title}
              </button>
            ))}
          </nav>
        </div>

        {/* ── Main content: vertical label + image + bottom strip ── */}
        <div
          style={{
            flex: 1,
            display: "grid",
            gridTemplateColumns: "40px 1fr",
            gap: "0 18px",
            minHeight: 0,
          }}
        >
          {/* Rotated vertical label */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span
              style={{
                writingMode: "vertical-rl",
                transform: "rotate(180deg)",
                fontSize: 9,
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                color: "rgba(237,232,223,0.1)",
                fontFamily: "var(--font-dm-sans), sans-serif",
                whiteSpace: "nowrap",
                userSelect: "none",
              }}
            >
              Property Intelligence Report · San Diego County
            </span>
          </div>

          {/* Right content column */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16, minHeight: 0 }}>

            {/* ── Image panel ── */}
            <div
              style={{
                position: "relative",
                flex: 1,
                minHeight: 0,
                overflow: "hidden",
                border: "1px solid rgba(255,255,255,0.14)",
              }}
            >
              {/* Ghost project number */}
              <div
                aria-hidden
                style={{
                  position: "absolute",
                  top: -12,
                  left: 2,
                  fontFamily: "var(--font-cormorant), Georgia, serif",
                  fontSize: "clamp(110px, 14vw, 200px)",
                  fontWeight: 300,
                  fontStyle: "normal",
                  color: "rgba(255,255,255,0.06)",
                  lineHeight: 1,
                  pointerEvents: "none",
                  userSelect: "none",
                  zIndex: 2,
                  transition: "opacity 0.6s ease",
                }}
              >
                {proj.num}
              </div>

              {/* Stacked images */}
              {PROJECTS.map((p, i) => (
                <div
                  key={p.num}
                  ref={(el) => { imgRefs.current[i] = el; }}
                  style={{ position: "absolute", inset: 0, willChange: "transform, opacity" }}
                >
                  <img
                    src={p.image}
                    alt={p.title}
                    style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background: "linear-gradient(to bottom, rgba(10,8,6,0.08) 0%, transparent 30%, transparent 55%, rgba(10,8,6,0.52) 100%)",
                    }}
                  />
                </div>
              ))}

              {/* Corner reticle marks */}
              <CornerMark pos="tl" />
              <CornerMark pos="tr" />
              <CornerMark pos="bl" />
              <CornerMark pos="br" />

              {/* Analyzed timestamp — top right */}
              <div
                style={{
                  position: "absolute",
                  top: 16,
                  right: 38,
                  fontSize: 9,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "rgba(237,232,223,0.3)",
                  fontFamily: "var(--font-dm-sans), sans-serif",
                  zIndex: 5,
                }}
              >
                {proj.analyzed}
              </div>

              {/* Location — bottom right */}
              <div
                key={`loc-${activeIdx}`}
                style={{
                  position: "absolute",
                  bottom: 18,
                  right: 20,
                  fontSize: 10,
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  color: "rgba(237,232,223,0.45)",
                  fontFamily: "var(--font-dm-sans), sans-serif",
                  zIndex: 5,
                  animation: "fadeUp 0.5s ease both",
                }}
              >
                {proj.location}
              </div>
            </div>

            {/* ── Bottom strip: title + metrics ── */}
            <div
              style={{
                display: "flex",
                alignItems: "flex-end",
                justifyContent: "space-between",
                gap: 32,
                flexShrink: 0,
              }}
            >
              {/* Title block */}
              <div key={`title-${activeIdx}`} style={{ animation: "fadeUp 0.45s ease both" }}>
                <p
                  style={{
                    fontSize: 9,
                    letterSpacing: "0.26em",
                    textTransform: "uppercase",
                    color: "rgba(237,232,223,0.28)",
                    fontFamily: "var(--font-dm-sans), sans-serif",
                    marginBottom: 4,
                  }}
                >
                  {proj.type}
                </p>
                <h2
                  style={{
                    fontFamily: "var(--font-cormorant), Georgia, serif",
                    fontSize: "clamp(42px, 5.5vw, 78px)",
                    fontWeight: 300,
                    fontStyle: "normal",
                    color: "var(--cream)",
                    letterSpacing: "-0.025em",
                    lineHeight: 0.95,
                    margin: 0,
                  }}
                >
                  {proj.title}
                </h2>
              </div>

              {/* Metrics horizontal strip */}
              <div
                key={`metrics-${activeIdx}`}
                style={{
                  display: "flex",
                  alignItems: "flex-end",
                  flexShrink: 0,
                  animation: "fadeUp 0.5s ease 0.06s both",
                }}
              >
                {Object.entries(proj.metrics).map(([label, value], i) => (
                  <div
                    key={label}
                    style={{
                      paddingLeft: i === 0 ? 0 : 28,
                      paddingRight: i === Object.keys(proj.metrics).length - 1 ? 0 : 28,
                      borderLeft: i > 0 ? "1px solid rgba(255,255,255,0.18)" : "none",
                    }}
                  >
                    <p
                      style={{
                        fontSize: 8,
                        letterSpacing: "0.22em",
                        textTransform: "uppercase",
                        color: "rgba(237,232,223,0.26)",
                        fontFamily: "var(--font-dm-sans), sans-serif",
                        marginBottom: 6,
                      }}
                    >
                      {label}
                    </p>
                    <p
                      style={{
                        fontFamily: "var(--font-cormorant), Georgia, serif",
                        fontSize: "clamp(30px, 3.2vw, 50px)",
                        fontWeight: 300,
                        color: "var(--gold)",
                        lineHeight: 1,
                      }}
                    >
                      {value}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── Footer row ── */}
        <div
          style={{
            borderTop: "1px solid rgba(255,255,255,0.1)",
            marginTop: 18,
            paddingTop: 16,
            flexShrink: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <p
            style={{
              fontSize: 9,
              letterSpacing: "0.24em",
              textTransform: "uppercase",
              color: "rgba(237,232,223,0.14)",
              fontFamily: "var(--font-dm-sans), sans-serif",
            }}
          >
            Scroll to advance · {proj.num} of 03
          </p>

          {/* Progress pills */}
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            {PROJECTS.map((_, i) => (
              <div
                key={i}
                style={{
                  width: activeIdx === i ? 30 : 7,
                  height: 1,
                  background: activeIdx === i ? "rgba(255,255,255,0.7)" : "rgba(237,232,223,0.14)",
                  transition: "all 0.45s cubic-bezier(0.23, 1, 0.32, 1)",
                }}
              />
            ))}
          </div>

          <Link
            href="#search"
            style={{
              fontSize: 10,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "var(--gold)",
              fontFamily: "var(--font-dm-sans), sans-serif",
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              opacity: 0.82,
              transition: "opacity 0.2s ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.82")}
          >
            Analyze Your Property
            <span style={{ fontSize: 14 }}>→</span>
          </Link>
        </div>
      </div>

      {/* Bottom hairline */}
      <div style={{ height: 1, background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.28) 20%, rgba(255,255,255,0.28) 80%, transparent)" }} />
    </section>
  );
}
