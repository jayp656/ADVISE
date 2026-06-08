"use client";
import { useEffect, useRef, useState } from "react";

const STATS = [
  { value: 47, suffix: "M+", prefix: "$", label: "Capital Guided" },
  { value: 210, suffix: "+", prefix: "", label: "Feasibility Studies" },
  { value: 94, suffix: "%", prefix: "", label: "Cash-Flow Positive" },
  { value: 5, suffix: " yrs", prefix: "", label: "San Diego Focus" },
];

function useCountUp(target: number, started: boolean, duration = 1600) {
  const [count, setCount] = useState(target); // default to real value — no zeroes
  useEffect(() => {
    if (!started) return;
    setCount(0);
    let startTs = 0;
    const step = (ts: number) => {
      if (!startTs) startTs = ts;
      const p = Math.min((ts - startTs) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setCount(Math.round(eased * target));
      if (p < 1) requestAnimationFrame(step);
      else setCount(target);
    };
    requestAnimationFrame(step);
  }, [target, started, duration]);
  return count;
}

function StatItem({
  stat,
  started,
  theme,
}: {
  stat: (typeof STATS)[0];
  started: boolean;
  theme: "light" | "dark";
}) {
  const count = useCountUp(stat.value, started);
  const isLight = theme === "light";
  return (
    <div
      className="text-center px-8 py-8 border-r last:border-r-0"
      style={{
        borderColor: isLight
          ? "rgba(12,10,8,0.07)"
          : "rgba(255,255,255,0.06)",
      }}
    >
      <div className="mb-1">
        <span
          className="font-light"
          style={{
            fontFamily: "var(--font-cormorant), Georgia, serif",
            fontSize: "clamp(32px, 3.5vw, 44px)",
            color: "#FFFFFF",
          }}
        >
          {stat.prefix}{count}{stat.suffix}
        </span>
      </div>
      <div
        className="text-xs uppercase"
        style={{
          color: isLight
            ? "rgba(12,10,8,0.38)"
            : "rgba(237,232,223,0.4)",
          letterSpacing: "0.16em",
          fontFamily: "var(--font-dm-sans), sans-serif",
        }}
      >
        {stat.label}
      </div>
    </div>
  );
}

export default function StatsBar({
  theme = "dark",
}: {
  theme?: "light" | "dark";
}) {
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const isLight = theme === "light";

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setStarted(true);
          obs.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    if (ref.current) obs.observe(ref.current);
    // Fallback: trigger after 1s regardless, so numbers never stay at 0
    const fallback = setTimeout(() => setStarted(true), 1000);
    return () => {
      obs.disconnect();
      clearTimeout(fallback);
    };
  }, []);

  return (
    <div
      ref={ref}
      className="border-b"
      style={{
        borderColor: isLight
          ? "rgba(12,10,8,0.07)"
          : "rgba(255,255,255,0.06)",
        background: isLight
          ? "rgba(12,10,8,0.02)"
          : "rgba(255,255,255,0.02)",
      }}
    >
      <div
        className="max-w-5xl mx-auto grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0"
        style={{
          borderColor: isLight
            ? "rgba(12,10,8,0.07)"
            : "rgba(255,255,255,0.06)",
        }}
      >
        {STATS.map((s) => (
          <StatItem key={s.label} stat={s} started={started} theme={theme} />
        ))}
      </div>
    </div>
  );
}
