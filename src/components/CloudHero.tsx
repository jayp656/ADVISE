"use client";
import { useEffect, useRef } from "react";

export default function CloudHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftCloudRef = useRef<HTMLCanvasElement>(null);
  const rightCloudRef = useRef<HTMLCanvasElement>(null);
  const mistRef = useRef<HTMLDivElement>(null);
  const buildingRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const skyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let gsapCtx: { revert: () => void } | null = null;
    let removeResize: () => void = () => {};

    function drawCloud(canvas: HTMLCanvasElement, side: "left" | "right") {
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      const W = canvas.width;
      const H = canvas.height;
      ctx.clearRect(0, 0, W, H);

      const puffs =
        side === "left"
          ? [
              // Heavy outer mass
              { cx: W * 0.00, cy: H * 0.50, r: W * 0.34, a: 0.96 },
              { cx: W * 0.06, cy: H * 0.36, r: W * 0.29, a: 0.89 },
              { cx: W * 0.04, cy: H * 0.64, r: W * 0.27, a: 0.84 },
              { cx: W * 0.14, cy: H * 0.46, r: W * 0.25, a: 0.78 },
              { cx: W * 0.12, cy: H * 0.68, r: W * 0.23, a: 0.72 },
              // Top/bottom fill
              { cx: W * 0.02, cy: H * 0.20, r: W * 0.24, a: 0.70 },
              { cx: W * 0.02, cy: H * 0.80, r: W * 0.24, a: 0.70 },
              { cx: W * 0.10, cy: H * 0.10, r: W * 0.20, a: 0.62 },
              { cx: W * 0.10, cy: H * 0.90, r: W * 0.20, a: 0.62 },
              // Mid mass
              { cx: W * 0.22, cy: H * 0.50, r: W * 0.21, a: 0.64 },
              { cx: W * 0.20, cy: H * 0.34, r: W * 0.19, a: 0.58 },
              { cx: W * 0.20, cy: H * 0.70, r: W * 0.19, a: 0.54 },
              { cx: W * 0.16, cy: H * 0.84, r: W * 0.18, a: 0.50 },
              { cx: W * 0.16, cy: H * 0.14, r: W * 0.18, a: 0.50 },
              // Inner wisps toward center
              { cx: W * 0.32, cy: H * 0.46, r: W * 0.17, a: 0.44 },
              { cx: W * 0.30, cy: H * 0.60, r: W * 0.15, a: 0.38 },
              { cx: W * 0.30, cy: H * 0.32, r: W * 0.15, a: 0.35 },
              { cx: W * 0.38, cy: H * 0.52, r: W * 0.14, a: 0.28 },
              { cx: W * 0.36, cy: H * 0.40, r: W * 0.13, a: 0.23 },
              { cx: W * 0.36, cy: H * 0.64, r: W * 0.12, a: 0.19 },
              // Far wisps (approaching center)
              { cx: W * 0.44, cy: H * 0.48, r: W * 0.11, a: 0.15 },
              { cx: W * 0.42, cy: H * 0.36, r: W * 0.10, a: 0.12 },
              { cx: W * 0.42, cy: H * 0.60, r: W * 0.10, a: 0.11 },
              { cx: W * 0.48, cy: H * 0.50, r: W * 0.09, a: 0.07 },
            ]
          : [
              // Mirror: heavy outer mass on right
              { cx: W * 1.00, cy: H * 0.50, r: W * 0.34, a: 0.96 },
              { cx: W * 0.94, cy: H * 0.36, r: W * 0.29, a: 0.89 },
              { cx: W * 0.96, cy: H * 0.64, r: W * 0.27, a: 0.84 },
              { cx: W * 0.86, cy: H * 0.46, r: W * 0.25, a: 0.78 },
              { cx: W * 0.88, cy: H * 0.68, r: W * 0.23, a: 0.72 },
              { cx: W * 0.98, cy: H * 0.20, r: W * 0.24, a: 0.70 },
              { cx: W * 0.98, cy: H * 0.80, r: W * 0.24, a: 0.70 },
              { cx: W * 0.90, cy: H * 0.10, r: W * 0.20, a: 0.62 },
              { cx: W * 0.90, cy: H * 0.90, r: W * 0.20, a: 0.62 },
              { cx: W * 0.78, cy: H * 0.50, r: W * 0.21, a: 0.64 },
              { cx: W * 0.80, cy: H * 0.34, r: W * 0.19, a: 0.58 },
              { cx: W * 0.80, cy: H * 0.70, r: W * 0.19, a: 0.54 },
              { cx: W * 0.84, cy: H * 0.84, r: W * 0.18, a: 0.50 },
              { cx: W * 0.84, cy: H * 0.14, r: W * 0.18, a: 0.50 },
              { cx: W * 0.68, cy: H * 0.46, r: W * 0.17, a: 0.44 },
              { cx: W * 0.70, cy: H * 0.60, r: W * 0.15, a: 0.38 },
              { cx: W * 0.70, cy: H * 0.32, r: W * 0.15, a: 0.35 },
              { cx: W * 0.62, cy: H * 0.52, r: W * 0.14, a: 0.28 },
              { cx: W * 0.64, cy: H * 0.40, r: W * 0.13, a: 0.23 },
              { cx: W * 0.64, cy: H * 0.64, r: W * 0.12, a: 0.19 },
              { cx: W * 0.56, cy: H * 0.48, r: W * 0.11, a: 0.15 },
              { cx: W * 0.58, cy: H * 0.36, r: W * 0.10, a: 0.12 },
              { cx: W * 0.58, cy: H * 0.60, r: W * 0.10, a: 0.11 },
              { cx: W * 0.52, cy: H * 0.50, r: W * 0.09, a: 0.07 },
            ];

      for (const p of puffs) {
        const g = ctx.createRadialGradient(p.cx, p.cy, 0, p.cx, p.cy, p.r);
        g.addColorStop(0,    `rgba(237,232,223,${p.a})`);
        g.addColorStop(0.28, `rgba(250,247,240,${p.a * 0.82})`);
        g.addColorStop(0.55, `rgba(245,241,230,${p.a * 0.44})`);
        g.addColorStop(0.78, `rgba(240,234,218,${p.a * 0.16})`);
        g.addColorStop(1,    "rgba(235,228,210,0)");
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(p.cx, p.cy, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const initGSAP = async () => {
      const { default: gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      const sizeAndDraw = () => {
        const W = window.innerWidth;
        const H = window.innerHeight;
        if (leftCloudRef.current) {
          leftCloudRef.current.width = W;
          leftCloudRef.current.height = H;
          drawCloud(leftCloudRef.current, "left");
        }
        if (rightCloudRef.current) {
          rightCloudRef.current.width = W;
          rightCloudRef.current.height = H;
          drawCloud(rightCloudRef.current, "right");
        }
      };

      sizeAndDraw();
      window.addEventListener("resize", sizeAndDraw);
      removeResize = () => window.removeEventListener("resize", sizeAndDraw);

      gsapCtx = gsap.context(() => {
        const VW = window.innerWidth;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "+=290%",
            pin: true,
            scrub: 1,
            anticipatePin: 1,
          },
        });

        // Phase 1 (0→0.40): Clouds close in from sides, mist blooms
        tl.to(leftCloudRef.current,  { x: VW * 0.46,  ease: "none", duration: 0.40 }, 0);
        tl.to(rightCloudRef.current, { x: -VW * 0.46, ease: "none", duration: 0.40 }, 0);
        tl.to(mistRef.current,       { opacity: 1, scale: 1.40, ease: "none", duration: 0.30 }, 0.06);

        // Phase 2 (0.22→0.58): Building + headline appear under cloud cover
        tl.fromTo(
          buildingRef.current,
          { opacity: 0, scale: 0.86, y: 18 },
          { opacity: 1, scale: 1.00, y: 0, ease: "none", duration: 0.36 },
          0.22
        );
        tl.fromTo(
          headlineRef.current,
          { opacity: 0, y: 26 },
          { opacity: 1, y: 0,  ease: "none", duration: 0.26 },
          0.32
        );

        // Phase 3 (0.54→1.0): Clouds dramatically part off-screen
        tl.to(leftCloudRef.current,  { x: -VW * 1.65, ease: "none", duration: 0.46 }, 0.54);
        tl.to(rightCloudRef.current, { x:  VW * 1.65, ease: "none", duration: 0.46 }, 0.54);
        tl.to(mistRef.current,       { opacity: 0, scale: 1.0, ease: "none", duration: 0.22 }, 0.60);

      }, containerRef);
    };

    initGSAP();
    return () => {
      gsapCtx?.revert();
      removeResize();
    };
  }, []);

  return (
    <div ref={containerRef} className="relative w-screen overflow-hidden" style={{ height: "100svh" }}>

      {/* Layer 0 — Sunset sky gradient */}
      <div
        ref={skyRef}
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg," +
            "#0c0703 0%," +
            "#1e0c06 8%," +
            "#4a1c0a 18%," +
            "#7e3212 28%," +
            "#ae5520 38%," +
            "#c87840 48%," +
            "#da9e62 57%," +
            "#e8c08a 66%," +
            "#f2d9ae 75%," +
            "#f8eacc 83%," +
            "#fdf5e8 91%," +
            "#fdfbf7 100%)",
        }}
      />

      {/* Horizon glow */}
      <div
        className="absolute bottom-0 left-0 right-0 pointer-events-none"
        style={{
          height: "45%",
          background:
            "radial-gradient(ellipse 100% 100% at 50% 100%, rgba(218,158,98,0.35) 0%, rgba(218,158,98,0.12) 40%, transparent 70%)",
        }}
      />

      {/* Layer 1 — Building */}
      <div
        ref={buildingRef}
        className="absolute inset-0 flex items-end justify-center pointer-events-none opacity-0"
        style={{ paddingBottom: "5vh" }}
      >
        <img
          src="https://images.unsplash.com/photo-1486325212027-8081e485255e?w=560&q=92&fit=crop&crop=center"
          alt="Modern architecture"
          className="select-none"
          style={{
            height: "72vh",
            width: "auto",
            objectFit: "contain",
            filter:
              "drop-shadow(0 32px 64px rgba(0,0,0,0.28)) drop-shadow(0 8px 16px rgba(0,0,0,0.18)) brightness(1.06) contrast(1.04)",
          }}
        />
      </div>

      {/* Layer 1b — Headline (appears with building) */}
      <div
        ref={headlineRef}
        className="absolute inset-0 flex flex-col items-center justify-center opacity-0 px-6 pointer-events-none"
        style={{ paddingBottom: "3vh" }}
      >
        <p
          className="text-xs uppercase mb-5 text-center"
          style={{
            color: "rgba(12,10,8,0.38)",
            letterSpacing: "0.24em",
            fontFamily: "var(--font-dm-sans), sans-serif",
          }}
        >
          Property Intelligence · San Diego County · Est. 2019
        </p>
        <h1
          className="text-center font-light leading-none"
          style={{
            fontFamily: "var(--font-cormorant), Georgia, serif",
            fontSize: "clamp(54px, 8.5vw, 112px)",
            color: "#1C1916",
            letterSpacing: "-0.02em",
          }}
        >
          Know the number
          <br />
          <em style={{ color: "#5a3a10" }}>before you build.</em>
        </h1>
        <p
          className="mt-6 text-center text-sm max-w-xs"
          style={{
            color: "rgba(12,10,8,0.42)",
            lineHeight: 1.75,
            fontFamily: "var(--font-dm-sans), sans-serif",
          }}
        >
          Property intelligence for every opportunity on your land.
        </p>
      </div>

      {/* Layer 3 — Center mist bloom */}
      <div
        ref={mistRef}
        className="absolute inset-0 pointer-events-none opacity-0"
        style={{
          background:
            "radial-gradient(ellipse 95% 85% at 50% 50%," +
            "rgba(237,232,223,0.97) 0%," +
            "rgba(252,248,241,0.88) 25%," +
            "rgba(250,244,233,0.60) 50%," +
            "rgba(247,240,224,0.28) 70%," +
            "rgba(244,236,216,0) 85%)",
          transformOrigin: "center center",
        }}
      />

      {/* Layer 2a — Left cloud canvas */}
      <canvas
        ref={leftCloudRef}
        className="absolute top-0 left-0 pointer-events-none"
        style={{
          width: "100vw",
          height: "100svh",
          filter: "blur(1px)",
        }}
      />

      {/* Layer 2b — Right cloud canvas */}
      <canvas
        ref={rightCloudRef}
        className="absolute top-0 left-0 pointer-events-none"
        style={{
          width: "100vw",
          height: "100svh",
          filter: "blur(1px)",
        }}
      />

      {/* Scroll cue */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        style={{ opacity: 0.35 }}
      >
        <span
          className="text-xs uppercase"
          style={{
            color: "var(--cream)",
            letterSpacing: "0.22em",
            fontFamily: "var(--font-dm-sans), sans-serif",
          }}
        >
          Scroll
        </span>
        <div
          className="w-px h-10"
          style={{
            background: "linear-gradient(to bottom, rgba(237,232,223,0.6), transparent)",
          }}
        />
      </div>
    </div>
  );
}
