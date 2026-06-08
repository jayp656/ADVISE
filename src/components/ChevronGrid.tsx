"use client";
import { useState } from "react";
import { useEffect, useRef } from "react";

const PANELS = [
  {
    img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=700&q=85",
    caption: "Luxury Interiors",
    sub: "Premium Finishes",
  },
  {
    img: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=700&q=85",
    caption: "Modern Architecture",
    sub: "Investment Grade",
  },
  {
    img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=700&q=85",
    caption: "Outdoor Living",
    sub: "Value Creation",
  },
  {
    img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=700&q=85",
    caption: "Coastal Properties",
    sub: "San Diego County",
  },
  {
    img: "https://images.unsplash.com/photo-1523217582562-09d0def993a6?w=700&q=85",
    caption: "Income Properties",
    sub: "Cash-Flow Focused",
  },
];

const NOTCH = 44;

function clipPath(i: number, total: number) {
  const left = i === 0 ? `0 0` : `${NOTCH}px 50%`;
  const topLeft = i === 0 ? `0 0` : `${NOTCH}px 0`;
  const topRight = `calc(100% - ${NOTCH}px) 0`;
  const tipRight = `100% 50%`;
  const btmRight = `calc(100% - ${NOTCH}px) 100%`;
  const btmLeft = i === 0 ? `0 100%` : `${NOTCH}px 100%`;

  if (i === total - 1) {
    return `polygon(${topLeft}, 100% 0, 100% 100%, ${btmLeft}, ${left})`;
  }
  return `polygon(${topLeft}, ${topRight}, ${tipRight}, ${btmRight}, ${btmLeft}, ${left})`;
}

export default function ChevronGrid() {
  const [hovered, setHovered] = useState<number | null>(null);
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      className="py-24 overflow-hidden"
      style={{ background: "#FAF8F4" }}
      ref={ref}
    >
      <div className="max-w-7xl mx-auto px-6 mb-16">
        <p
          className="text-xs uppercase mb-5"
          style={{
            color: "rgba(12,10,8,0.32)",
            letterSpacing: "0.22em",
            fontFamily: "var(--font-dm-sans), sans-serif",
          }}
        >
          What We Serve
        </p>
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          <h2
            className="font-light leading-none"
            style={{
              fontFamily: "var(--font-cormorant), Georgia, serif",
              fontSize: "clamp(44px, 6vw, 80px)",
              color: "#1C1916",
              letterSpacing: "-0.02em",
            }}
          >
            This isn't just
            <br />
            <em>about real estate.</em>
          </h2>
          <p
            className="text-sm max-w-xs leading-relaxed lg:pb-2"
            style={{
              color: "rgba(12,10,8,0.42)",
              fontFamily: "var(--font-dm-sans), sans-serif",
            }}
          >
            It's about building the life you actually want. We help property
            owners understand what's possible — and what's profitable.
          </p>
        </div>
      </div>

      {/* Chevron panels */}
      <div
        className="flex overflow-x-auto mx-6 lg:mx-auto lg:max-w-7xl"
        style={{ scrollbarWidth: "none", gap: 0 }}
      >
        {PANELS.map((p, i) => {
          const isHov = hovered === i;
          return (
            <div
              key={i}
              className="relative flex-shrink-0 overflow-hidden cursor-pointer"
              style={{
                width: isHov ? "320px" : "210px",
                height: "420px",
                clipPath: clipPath(i, PANELS.length),
                marginRight: i < PANELS.length - 1 ? `-${NOTCH}px` : 0,
                transition:
                  "width 0.55s cubic-bezier(0.4,0,0.2,1), clip-path 0.55s",
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(28px)",
                transitionDelay: `${i * 0.08}s`,
              }}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            >
              <img
                src={p.img}
                alt={p.caption}
                className="absolute inset-0 w-full h-full object-cover"
                style={{
                  transform: isHov ? "scale(1.08)" : "scale(1.0)",
                  transition: "transform 0.7s cubic-bezier(0.4,0,0.2,1)",
                }}
              />
              {/* Overlay */}
              <div
                className="absolute inset-0 transition-opacity duration-400"
                style={{
                  background:
                    "linear-gradient(to top, rgba(10,8,6,0.78) 0%, rgba(10,8,6,0.25) 45%, transparent 80%)",
                  opacity: isHov ? 1 : 0.4,
                }}
              />
              {/* Gold shimmer on hover */}
              <div
                className="absolute inset-0 pointer-events-none transition-opacity duration-300"
                style={{
                  background:
                    "linear-gradient(135deg, transparent 40%, rgba(255,255,255,0.08) 60%, transparent 80%)",
                  opacity: isHov ? 1 : 0,
                }}
              />
              {/* Caption */}
              <div
                className="absolute bottom-0 left-0 right-0 px-6 py-7 transition-all duration-350"
                style={{
                  paddingLeft: i === 0 ? "24px" : `${NOTCH + 8}px`,
                  opacity: isHov ? 1 : 0,
                  transform: isHov ? "translateY(0)" : "translateY(10px)",
                }}
              >
                <p
                  className="text-xs uppercase mb-1.5"
                  style={{
                    color: "rgba(255,255,255,0.75)",
                    letterSpacing: "0.18em",
                    fontFamily: "var(--font-dm-sans), sans-serif",
                  }}
                >
                  {p.sub}
                </p>
                <p
                  className="text-lg font-light"
                  style={{
                    color: "#FAF8F4",
                    fontFamily: "var(--font-cormorant), Georgia, serif",
                  }}
                >
                  {p.caption}
                </p>
              </div>
              {/* Index number always visible */}
              <div
                className="absolute top-5 transition-all duration-200"
                style={{
                  left: i === 0 ? "16px" : `${NOTCH + 8}px`,
                  opacity: isHov ? 0.5 : 0.15,
                }}
              >
                <span
                  className="text-xs"
                  style={{
                    color: "#FAF8F4",
                    letterSpacing: "0.12em",
                    fontFamily: "var(--font-dm-sans), sans-serif",
                  }}
                >
                  0{i + 1}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
