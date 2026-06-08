"use client";
import { useEffect, useRef } from "react";
import Link from "next/link";

export default function CityScapeSplit() {
  const imgWrapRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const init = async () => {
      const { default: gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      const section = imgWrapRef.current?.closest("section");
      if (!section) return;

      // Parallax on the city image
      if (imgWrapRef.current) {
        gsap.to(imgWrapRef.current, {
          y: -80,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      }

      // Subtle text lift on scroll
      if (textRef.current) {
        gsap.fromTo(
          textRef.current,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            scrollTrigger: {
              trigger: textRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    };
    init();
  }, []);

  return (
    <section className="overflow-hidden" style={{ background: "#FAF8F4" }}>
      {/* Text block */}
      <div ref={textRef} className="max-w-7xl mx-auto px-6 pt-28 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-end">
          {/* Giant headline — left col */}
          <h2
            className="font-light leading-none"
            style={{
              fontFamily: "var(--font-cormorant), Georgia, serif",
              fontSize: "clamp(58px, 8.5vw, 120px)",
              color: "#1C1916",
              letterSpacing: "-0.025em",
            }}
          >
            The city
            <br />
            is your
            <br />
            <em>portfolio.</em>
          </h2>

          {/* Sub-copy — right col, bottom-aligned */}
          <div className="lg:pb-4 space-y-6">
            <p
              className="text-base leading-relaxed"
              style={{
                color: "rgba(12,10,8,0.48)",
                maxWidth: "360px",
                fontFamily: "var(--font-dm-sans), sans-serif",
              }}
            >
              San Diego County's property values rank among the strongest in the
              nation. Every lot is an opportunity. We help you understand which
              one to pursue — and exactly how much it's worth pursuing.
            </p>
            <Link
              href="#search"
              className="inline-flex items-center gap-3 text-xs uppercase group"
              style={{
                color: "#1C1916",
                letterSpacing: "0.18em",
                fontFamily: "var(--font-dm-sans), sans-serif",
              }}
            >
              Analyze Your Property
              <span
                className="transition-transform duration-200 group-hover:translate-x-1"
                style={{ color: "#FFFFFF" }}
              >
                →
              </span>
            </Link>
          </div>
        </div>
      </div>

      {/* Full-width cinematic image */}
      <div
        className="relative overflow-hidden"
        style={{ height: "min(60vw, 640px)" }}
      >
        <div
          ref={imgWrapRef}
          className="absolute"
          style={{ inset: "-12% 0", willChange: "transform" }}
        >
          <img
            src="https://images.unsplash.com/photo-1519954352454-2d5a7353e277?w=1800&q=88&fit=crop"
            alt="San Diego skyline"
            className="w-full h-full object-cover"
          />
          {/* Subtle edge fades */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "linear-gradient(to bottom, rgba(237,232,223,0.28) 0%, transparent 18%, transparent 82%, rgba(10,8,6,0.22) 100%)",
            }}
          />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "linear-gradient(to right, rgba(237,232,223,0.18) 0%, transparent 15%, transparent 85%, rgba(237,232,223,0.12) 100%)",
            }}
          />
        </div>
      </div>
    </section>
  );
}
