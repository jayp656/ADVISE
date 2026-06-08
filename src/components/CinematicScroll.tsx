"use client";
import { useEffect, useRef } from "react";

// ─── Tune these values to adjust the effect ──────────────────────────────────
const CONFIG = {
  maxZoom:       3.2,    // Final zoom depth — 1 = no zoom, 3.2 = 3.2× in
  focalX:        "55%",  // Horizontal focal point — center on the skyline
  focalY:        "42%",  // Vertical focal point   — sit on the horizon line
  scrollLength:  "300%", // Total scroll distance for the full sequence
  scrub:         1.4,    // Smoothing lag (seconds) — higher = more cinematic
  blurThreshold: 14,     // Min scroll velocity before blur activates (px/frame)
  blurMax:       3.0,    // Maximum blur during a fast scroll (px)
};

export default function CinematicScroll({
  src = "https://images.unsplash.com/photo-1519954352454-2d5a7353e277?w=2400&q=90&fit=crop",
}: {
  src?: string;
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const imgRef     = useRef<HTMLImageElement>(null);
  const barRef     = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const img     = imgRef.current;
    const bar     = barRef.current;
    if (!section || !img || !bar) return;

    let gsapCleanup: (() => void) | undefined;

    (async () => {
      const { default: gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      // ── Motion blur on fast scroll ─────────────────────────────────────────
      let lastY = window.scrollY;
      let blurTimer: ReturnType<typeof setTimeout>;

      const onScroll = () => {
        const velocity = Math.abs(window.scrollY - lastY);
        lastY = window.scrollY;
        if (velocity > CONFIG.blurThreshold) {
          const blur = Math.min(velocity * 0.11, CONFIG.blurMax).toFixed(1);
          img.style.filter = `blur(${blur}px)`;
          clearTimeout(blurTimer);
          blurTimer = setTimeout(() => {
            gsap.to(img, { filter: "blur(0px)", duration: 0.3, ease: "power2.out" });
          }, 60);
        }
      };
      window.addEventListener("scroll", onScroll, { passive: true });

      // ── Main cinematic timeline ────────────────────────────────────────────
      // Three phases — lift-off → cruise → final hover
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger:      section,
          start:        "top top",
          end:          `+=${CONFIG.scrollLength}`,
          pin:          true,
          scrub:        CONFIG.scrub,
          anticipatePin: 1,
        },
      });

      // Phase 1: Lift off — zoom in, pan right along the coastline
      tl.fromTo(img,
        { scale: 1,    x: "0%",  y: "0%"  },
        { scale: 1.8,  x: "-4%", y: "-2%", duration: 1, ease: "none" }
      );

      // Phase 2: Cruise — deeper zoom, sweep across the horizon
      tl.to(img, { scale: 2.5, x: "-9%", y: "-4%", duration: 1, ease: "none" });

      // Phase 3: Final hover — peak zoom, slow lateral drift
      tl.to(img, { scale: CONFIG.maxZoom, x: "-5%", y: "-6%", duration: 0.8, ease: "none" });

      // ── Progress hairline ──────────────────────────────────────────────────
      gsap.fromTo(bar,
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start:   "top top",
            end:     `+=${CONFIG.scrollLength}`,
            scrub:   true,
          },
        }
      );

      gsapCleanup = () => {
        window.removeEventListener("scroll", onScroll);
        clearTimeout(blurTimer);
        ScrollTrigger.getAll().forEach(t => t.kill());
      };
    })();

    return () => gsapCleanup?.();
  }, [src]);

  return (
    <section
      ref={sectionRef}
      style={{
        position:   "relative",
        height:     "100vh",
        overflow:   "hidden",
        background: "#000",
      }}
    >
      {/* Image */}
      <img
        ref={imgRef}
        src={src}
        alt="Coastal city aerial"
        style={{
          position:                 "absolute",
          inset:                    0,
          width:                    "100%",
          height:                   "100%",
          objectFit:                "cover",
          transformOrigin:          `${CONFIG.focalX} ${CONFIG.focalY}`,
          willChange:               "transform, filter",
          backfaceVisibility:       "hidden",
          WebkitBackfaceVisibility: "hidden",
          transform:                "translateZ(0)",
        }}
      />

      {/* Vignette — keeps subject bright, darkens edges */}
      <div
        aria-hidden
        style={{
          position:      "absolute",
          inset:         0,
          background:    `radial-gradient(ellipse at ${CONFIG.focalX} ${CONFIG.focalY},
                           transparent 30%, rgba(0,0,0,0.52) 100%)`,
          pointerEvents: "none",
        }}
      />

      {/* Scroll progress hairline */}
      <div
        style={{
          position:  "absolute",
          bottom:    0,
          left:      0,
          right:     0,
          height:    2,
          background:"rgba(255,255,255,0.07)",
          zIndex:    10,
        }}
      >
        <div
          ref={barRef}
          style={{
            width:           "100%",
            height:          "100%",
            background:      "rgba(255,255,255,0.5)",
            transformOrigin: "left center",
            transform:       "scaleX(0)",
          }}
        />
      </div>
    </section>
  );
}
