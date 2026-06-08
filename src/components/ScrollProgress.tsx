"use client";
import { useEffect, useRef } from "react";

export default function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const update = () => {
      if (!barRef.current) return;
      const total = document.documentElement.scrollHeight - window.innerHeight;
      const pct = total > 0 ? (window.scrollY / total) * 100 : 0;
      barRef.current.style.width = `${pct}%`;
    };
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <div
      className="fixed top-0 left-0 right-0 z-[100] pointer-events-none"
      style={{ height: "2px", background: "rgba(255,255,255,0.12)" }}
    >
      <div
        ref={barRef}
        style={{
          height: "100%",
          width: "0%",
          background:
            "linear-gradient(90deg, rgba(255,255,255,0.5), #FFFFFF)",
          transition: "width 0.1s linear",
        }}
      />
    </div>
  );
}
