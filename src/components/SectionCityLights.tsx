"use client";
import { useEffect, useRef, useState } from "react";

type Dot = {
  x: number;
  y: number;
  alpha: number;
  targetAlpha: number;
  delay: number;
  size: number;
  phase: number;
};

export default function SectionCityLights() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const [textVisible, setTextVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);
  const triggered = useRef(false);

  useEffect(() => {
    // Size canvas to actual pixel dimensions before drawing
    const canvas = canvasRef.current;
    if (canvas) {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(window.innerWidth * dpr);
      canvas.height = Math.round(window.innerHeight * dpr);
    }

    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && !triggered.current) {
          triggered.current = true;
          initCanvas();
          setTimeout(() => setTextVisible(true), 1800);
        }
      },
      { threshold: 0.18 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => {
      obs.disconnect();
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  function initCanvas() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const W = canvas.width;
    const H = canvas.height;

    // Seed dots concentrated in a rough SD county shape
    const dots: Dot[] = [];
    const cx = W * 0.46;
    const cy = H * 0.52;

    for (let i = 0; i < 900; i++) {
      const angle = Math.random() * Math.PI * 2;
      const rFactor = Math.random();
      // Denser toward center, sparser outward
      const r = rFactor < 0.55
        ? Math.random() * W * 0.2
        : Math.random() * W * 0.38;

      // Flatten vertically (coastline-adjacent shape)
      const x = cx + Math.cos(angle) * r + (Math.random() - 0.5) * W * 0.08;
      const y = cy + Math.sin(angle) * r * 0.65 + (Math.random() - 0.5) * H * 0.06;

      dots.push({
        x,
        y,
        alpha: 0,
        targetAlpha: 0.18 + Math.random() * 0.55,
        delay: Math.random() * 5000,
        size: Math.random() < 0.12 ? 1.6 : Math.random() < 0.4 ? 1.1 : 0.7,
        phase: Math.random() * Math.PI * 2,
      });
    }

    const startTime = Date.now();

    function draw() {
      const now = Date.now() - startTime;
      ctx!.clearRect(0, 0, W, H);

      // Dark background
      ctx!.fillStyle = "#060504";
      ctx!.fillRect(0, 0, W, H);

      // Subtle coastline suggestion
      ctx!.beginPath();
      ctx!.moveTo(W * 0.28, 0);
      ctx!.bezierCurveTo(W * 0.26, H * 0.2, W * 0.22, H * 0.45, W * 0.17, H);
      ctx!.strokeStyle = "rgba(156,128,96,0.06)";
      ctx!.lineWidth = 1;
      ctx!.stroke();

      // Ocean fill suggestion
      ctx!.beginPath();
      ctx!.moveTo(0, 0);
      ctx!.lineTo(W * 0.28, 0);
      ctx!.bezierCurveTo(W * 0.26, H * 0.2, W * 0.22, H * 0.45, W * 0.17, H);
      ctx!.lineTo(0, H);
      ctx!.closePath();
      ctx!.fillStyle = "rgba(156,128,96,0.018)";
      ctx!.fill();

      // Dots
      dots.forEach((dot) => {
        if (now > dot.delay) {
          const elapsed = now - dot.delay;
          dot.alpha = Math.min(dot.targetAlpha, dot.alpha + elapsed * 0.000085);
        }

        // Gentle pulse
        const pulse = 1 + Math.sin(now * 0.0008 + dot.phase) * 0.12;
        const r = dot.size * pulse;

        if (dot.alpha < 0.01) return;

        // Soft glow
        const grad = ctx!.createRadialGradient(dot.x, dot.y, 0, dot.x, dot.y, r * 2.5);
        grad.addColorStop(0, `rgba(186,158,116,${dot.alpha})`);
        grad.addColorStop(0.5, `rgba(156,128,96,${dot.alpha * 0.55})`);
        grad.addColorStop(1, `rgba(156,128,96,0)`);
        ctx!.beginPath();
        ctx!.arc(dot.x, dot.y, r * 2.5, 0, Math.PI * 2);
        ctx!.fillStyle = grad;
        ctx!.fill();

        // Core
        ctx!.beginPath();
        ctx!.arc(dot.x, dot.y, r, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(210,185,150,${dot.alpha * 1.1})`;
        ctx!.fill();
      });

      rafRef.current = requestAnimationFrame(draw);
    }

    draw();
  }

  return (
    <section
      ref={ref}
      style={{
        position: "relative",
        minHeight: "100svh",
        background: "#060504",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
      }}
    >
      <canvas
        ref={canvasRef}
        width={1400}
        height={800}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          display: "block",
        }}
      />

      <div
        style={{
          position: "relative",
          zIndex: 2,
          maxWidth: 1360,
          margin: "0 auto",
          padding: "120px 48px",
          width: "100%",
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <div
          style={{
            maxWidth: 460,
            opacity: textVisible ? 1 : 0,
            transform: textVisible ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 1.6s ease, transform 1.6s ease",
          }}
        >
          <p
            style={{
              fontSize: 9,
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: "rgba(156,128,96,0.5)",
              fontFamily: "var(--font-dm-sans), sans-serif",
              marginBottom: 24,
            }}
          >
            San Diego County
          </p>
          <h2
            style={{
              fontFamily: "var(--font-cormorant), Georgia, serif",
              fontSize: "clamp(44px, 5.5vw, 80px)",
              fontWeight: 300,
              color: "#EDE8DF",
              letterSpacing: "-0.025em",
              lineHeight: 1.04,
              margin: "0 0 24px",
            }}
          >
            Every property
            <br />
            tells a different
            <br />
            <span style={{ opacity: 0.38 }}>story.</span>
          </h2>
          <p
            style={{
              fontSize: 14,
              color: "rgba(237,232,223,0.3)",
              fontFamily: "var(--font-dm-sans), sans-serif",
              lineHeight: 1.82,
              letterSpacing: "0.03em",
            }}
          >
            Our job is finding the one that
            <br />
            creates the greatest return.
          </p>
        </div>
      </div>
    </section>
  );
}
