"use client";
import { useEffect, useRef, useState } from "react";

const BUILDS = [
  {
    num: "01",
    title: "Myrtle Avenue",
    location: "Normal Heights · San Diego",
    type: "Garage Conversion",
    metric: "$2,650 / mo",
    image: "https://ceimsgmzh6rmomfx.public.blob.vercel-storage.com/photos/1780968438544-IMG_7843.webp",
  },
  {
    num: "02",
    title: "Cable Street",
    location: "Ocean Beach · San Diego",
    type: "Garage ADU + Loft",
    metric: "$3,100 / mo",
    image: "https://ceimsgmzh6rmomfx.public.blob.vercel-storage.com/photos/1780968428354-IMG_7839.jpeg",
  },
  {
    num: "03",
    title: "Granada Avenue",
    location: "North Park · San Diego",
    type: "Detached ADU",
    metric: "$3,400 / mo",
    image: "https://ceimsgmzh6rmomfx.public.blob.vercel-storage.com/photos/1780968419667-IMG_7837.jpeg",
  },
  {
    num: "04",
    title: "Cedar Street",
    location: "Kensington · San Diego",
    type: "Detached ADU",
    metric: "$3,100 / mo",
    image: "https://ceimsgmzh6rmomfx.public.blob.vercel-storage.com/photos/1780968423164-IMG_7838.jpeg",
  },
  {
    num: "05",
    title: "Marlborough Drive",
    location: "South Park · San Diego",
    type: "Detached ADU",
    metric: "$3,500 / mo",
    image: "https://ceimsgmzh6rmomfx.public.blob.vercel-storage.com/photos/1780968437686-IMG_7842.jpeg",
  },
  {
    num: "06",
    title: "Soledad Road",
    location: "La Jolla · San Diego County",
    type: "Luxury ADU",
    metric: "$4,800 / mo",
    image: "https://ceimsgmzh6rmomfx.public.blob.vercel-storage.com/photos/1780968432147-IMG_7840.jpeg",
  },
  {
    num: "07",
    title: "Encanto Drive",
    location: "Encanto · San Diego",
    type: "Detached ADU",
    metric: "$2,900 / mo",
    image: "https://ceimsgmzh6rmomfx.public.blob.vercel-storage.com/photos/1780969578661-IMG_7845.jpeg",
  },
  {
    num: "08",
    title: "Sunset Reserve",
    location: "Mission Valley · San Diego",
    type: "Detached ADU",
    metric: "$3,450 / mo",
    image: "https://ceimsgmzh6rmomfx.public.blob.vercel-storage.com/photos/1780969579854-IMG_7847.jpeg",
  },
];

const CARD_W = 400;
const CARD_H = 520;
const GAP = 28;
const TOTAL_MOVE = (CARD_W + GAP) * (BUILDS.length - 1);

export default function HorizontalGallery3D() {
  // null = not yet detected, false = desktop, true = mobile
  const [isMobile, setIsMobile] = useState<boolean | null>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768 || !window.matchMedia("(hover: hover)").matches);
  }, []);

  useEffect(() => {
    // Only init GSAP once we've confirmed the user is on desktop
    if (isMobile !== false) return;

    const wrapper = wrapperRef.current;
    const sticky = stickyRef.current;
    const track = trackRef.current;
    const cards = cardRefs.current.filter(Boolean) as HTMLDivElement[];
    if (!wrapper || !sticky || !track || !cards.length) return;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let ctx: any = null;

    const init = async () => {
      const { default: gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        gsap.to(track, {
          x: -TOTAL_MOVE,
          ease: "none",
          scrollTrigger: {
            trigger: wrapper,
            start: "top top",
            end: `+=${TOTAL_MOVE * 1.3}`,
            scrub: 0.6,
            pin: sticky,
            anticipatePin: 1,
            onUpdate(self) {
              const activeF = self.progress * (BUILDS.length - 1);
              cards.forEach((card, i) => {
                const dist = i - activeF;
                const abs = Math.abs(dist);
                const rotY = dist * -14;
                const scale = 1 - Math.min(abs * 0.055, 0.2);
                const brightness = 1 - Math.min(abs * 0.16, 0.5);
                const tz = abs < 0.9 ? (0.9 - abs) * 55 : 0;
                card.style.transform = `rotateY(${rotY.toFixed(1)}deg) translateZ(${tz.toFixed(1)}px) scale(${scale.toFixed(3)})`;
                card.style.filter = `brightness(${brightness.toFixed(3)})`;
              });
            },
          },
        });
      });
    };

    init().catch(console.error);
    return () => ctx?.revert();
  }, [isMobile]);

  // Show mobile carousel when not yet detected (null) or confirmed mobile (true)
  if (isMobile !== false) {
    return (
      <div id="case-studies" style={{ background: "#070503", paddingBottom: 64 }}>
        <div style={{ padding: "48px 20px 28px" }}>
          <p style={{ fontSize: 9, letterSpacing: "0.32em", textTransform: "uppercase", color: "rgba(156,128,96,0.5)", fontFamily: "var(--font-dm-sans), sans-serif", marginBottom: 10 }}>
            Built in San Diego County
          </p>
          <h2 style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontSize: "clamp(28px,8vw,44px)", fontWeight: 300, color: "#EDE8DF", letterSpacing: "-0.025em", lineHeight: 1.05, margin: 0 }}>
            Every build.<span style={{ opacity: 0.35 }}> A different story.</span>
          </h2>
        </div>
        <div className="mob-gallery" style={{ display: "flex", overflowX: "auto", gap: 12, padding: "0 20px", scrollSnapType: "x mandatory", WebkitOverflowScrolling: "touch" as "touch", scrollbarWidth: "none" }}>
          {BUILDS.map((b) => (
            <div key={b.num} style={{ flexShrink: 0, width: "78vw", maxWidth: 300, height: 420, position: "relative", overflow: "hidden", scrollSnapAlign: "start", borderRadius: 2 }}>
              <img src={b.image} alt={b.title} loading="lazy" decoding="async" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(7,5,3,0.95) 0%, rgba(7,5,3,0.2) 55%)" }} />
              <div style={{ position: "absolute", top: 14, left: 14, fontSize: 8, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(156,128,96,0.85)", fontFamily: "var(--font-dm-sans), sans-serif", border: "1px solid rgba(156,128,96,0.25)", padding: "3px 9px", background: "rgba(7,5,3,0.6)", backdropFilter: "blur(6px)" }}>
                {b.type}
              </div>
              <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "0 18px 18px" }}>
                <p style={{ fontSize: 8, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(156,128,96,0.6)", fontFamily: "var(--font-dm-sans), sans-serif", marginBottom: 6 }}>{b.location}</p>
                <h3 style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontSize: 26, fontWeight: 300, color: "#EDE8DF", letterSpacing: "-0.02em", lineHeight: 1, margin: "0 0 8px" }}>{b.title}</h3>
                <p style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontSize: 18, fontWeight: 300, color: "rgba(156,128,96,0.9)" }}>{b.metric}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div
      ref={wrapperRef}
      id="case-studies"
      style={{ background: "#070503" }}
    >
      <div
        ref={stickyRef}
        style={{
          position: "sticky",
          top: 0,
          height: "100svh",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Header */}
        <div style={{ padding: "44px 52px 0", flexShrink: 0, display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          <div>
            <p style={{ fontSize: 9, letterSpacing: "0.32em", textTransform: "uppercase", color: "rgba(156,128,96,0.5)", fontFamily: "var(--font-dm-sans), sans-serif", marginBottom: 8 }}>
              Built in San Diego County
            </p>
            <h2 style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontSize: "clamp(32px, 4vw, 58px)", fontWeight: 300, color: "#EDE8DF", letterSpacing: "-0.025em", lineHeight: 1.05, margin: 0 }}>
              Every build.<span style={{ opacity: 0.35 }}> A different story.</span>
            </h2>
          </div>
          <p style={{ fontSize: 10, color: "rgba(237,232,223,0.18)", fontFamily: "var(--font-dm-sans), sans-serif", letterSpacing: "0.12em", paddingBottom: 4 }}>
            Scroll →
          </p>
        </div>

        {/* 3D stage */}
        <div
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            perspective: "1600px",
            perspectiveOrigin: "50% 50%",
            overflow: "hidden",
            paddingLeft: `calc(50vw - ${CARD_W / 2}px)`,
          }}
        >
          <div
            ref={trackRef}
            style={{
              display: "flex",
              gap: GAP,
              alignItems: "center",
              transformStyle: "preserve-3d",
              willChange: "transform",
            }}
          >
            {BUILDS.map((b, i) => (
              <div
                key={b.num}
                ref={(el) => { cardRefs.current[i] = el; }}
                style={{
                  position: "relative",
                  width: CARD_W,
                  height: CARD_H,
                  flexShrink: 0,
                  overflow: "hidden",
                  transformOrigin: "center center",
                  transformStyle: "preserve-3d",
                  willChange: "transform, filter",
                  // Cards are visible immediately — GSAP enhances, doesn't enable
                  filter: i === 0 ? "brightness(1)" : "brightness(0.55)",
                  transform: i === 0 ? "rotateY(0deg) translateZ(0px) scale(1)" : `rotateY(${i * -8}deg) translateZ(0px) scale(0.92)`,
                }}
              >
                <img
                  src={b.image}
                  alt={b.title}
                  loading={i < 2 ? "eager" : "lazy"}
                  decoding="async"
                  style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
                />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(7,5,3,0.95) 0%, rgba(7,5,3,0.35) 42%, rgba(7,5,3,0.08) 70%)" }} />

                {/* Type badge */}
                <div style={{ position: "absolute", top: 18, left: 18, fontSize: 8, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(156,128,96,0.85)", fontFamily: "var(--font-dm-sans), sans-serif", border: "1px solid rgba(156,128,96,0.25)", padding: "3px 9px", background: "rgba(7,5,3,0.55)", backdropFilter: "blur(6px)" }}>
                  {b.type}
                </div>

                {/* Ghost number */}
                <span aria-hidden style={{ position: "absolute", top: -6, right: -2, fontFamily: "var(--font-cormorant), Georgia, serif", fontSize: 88, fontWeight: 300, color: "rgba(255,255,255,0.035)", lineHeight: 1, userSelect: "none" }}>
                  {b.num}
                </span>

                {/* Bottom info */}
                <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "0 22px 22px" }}>
                  <p style={{ fontSize: 8, letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(156,128,96,0.6)", fontFamily: "var(--font-dm-sans), sans-serif", marginBottom: 7 }}>
                    {b.location}
                  </p>
                  <h3 style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontSize: 30, fontWeight: 300, color: "#EDE8DF", letterSpacing: "-0.02em", lineHeight: 1, margin: "0 0 10px" }}>
                    {b.title}
                  </h3>
                  <div style={{ height: 1, background: "rgba(255,255,255,0.09)", marginBottom: 10 }} />
                  <p style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontSize: 20, fontWeight: 300, color: "rgba(156,128,96,0.9)", letterSpacing: "-0.01em" }}>
                    {b.metric}
                  </p>
                </div>

                <div style={{ position: "absolute", inset: 0, border: "1px solid rgba(255,255,255,0.05)", pointerEvents: "none" }} />
              </div>
            ))}
          </div>
        </div>

        {/* Progress dots */}
        <div style={{ padding: "16px 52px 28px", flexShrink: 0 }}>
          <div style={{ height: 1, background: "rgba(255,255,255,0.05)", position: "relative" }}>
            {BUILDS.map((_, i) => (
              <div key={i} style={{ position: "absolute", top: -3, left: `${(i / (BUILDS.length - 1)) * 100}%`, width: 7, height: 7, borderRadius: "50%", background: "rgba(156,128,96,0.35)", transform: "translateX(-50%)" }} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
