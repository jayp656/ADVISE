"use client";
import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Touch/mobile — leave native cursor intact
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mx = -100;
    let my = -100;
    let rx = -100;
    let ry = -100;
    let raf = 0;
    let hovering = false;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
    };

    const onEnter = () => { hovering = true; };
    const onLeave = () => { hovering = false; };

    // Attach to all interactive elements
    const attach = () => {
      document
        .querySelectorAll("a, button, [role='button'], input, textarea, select, label")
        .forEach((el) => {
          el.addEventListener("mouseenter", onEnter);
          el.addEventListener("mouseleave", onLeave);
        });
    };
    attach();

    const tick = () => {
      raf = requestAnimationFrame(tick);

      // Ring lags with lerp
      rx += (mx - rx) * 0.10;
      ry += (my - ry) * 0.10;

      const scale = hovering ? 2.4 : 1;
      const dotScale = hovering ? 0 : 1;

      dot.style.transform = `translate(${mx - 3}px, ${my - 3}px)`;
      ring.style.transform = `translate(${rx - 18}px, ${ry - 18}px) scale(${scale})`;
      ring.style.opacity = hovering ? "0.35" : "0.55";
      dot.style.opacity = String(dotScale);
    };

    tick();
    window.addEventListener("mousemove", onMove, { passive: true });

    // Hide default cursor globally — but keep text cursor on form fields
    const style = document.createElement("style");
    style.textContent = `
      *:not(input):not(textarea):not(select):not([contenteditable]),
      *:not(input):not(textarea):not(select):not([contenteditable])::before,
      *:not(input):not(textarea):not(select):not([contenteditable])::after {
        cursor: none !important;
      }
    `;
    style.id = "cursor-hide";
    document.head.appendChild(style);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      document.getElementById("cursor-hide")?.remove();
      document
        .querySelectorAll("a, button, [role='button'], input, textarea, select, label")
        .forEach((el) => {
          el.removeEventListener("mouseenter", onEnter);
          el.removeEventListener("mouseleave", onLeave);
        });
    };
  }, []);

  return (
    <>
      {/* Center dot */}
      <div
        ref={dotRef}
        aria-hidden
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 6,
          height: 6,
          borderRadius: "50%",
          background: "#9C8060",
          pointerEvents: "none",
          zIndex: 99999,
          transition: "opacity 0.2s ease",
          willChange: "transform",
        }}
      />
      {/* Outer ring */}
      <div
        ref={ringRef}
        aria-hidden
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 36,
          height: 36,
          borderRadius: "50%",
          border: "1px solid rgba(156,128,96,0.6)",
          pointerEvents: "none",
          zIndex: 99998,
          transition: "opacity 0.3s ease, transform 0.12s ease",
          willChange: "transform",
        }}
      />
    </>
  );
}
