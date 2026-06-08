"use client";
import { useEffect, useRef, useState } from "react";
import { MapPin, TrendingUp } from "lucide-react";

const PROJECTS = [
  {
    title: "Boundary Street ADU",
    type: "Detached ADU",
    location: "North Park, San Diego",
    year: "2023",
    image: "https://images.unsplash.com/photo-1668015642451-a3bb11afb441?w=800&q=88&fit=crop",
    cost: "$168,000",
    rent: "$2,950/mo",
    capRate: "21.1%",
    payback: "4.7 yrs",
    roiScore: 9.2,
    desc: "Detached 480 sqft studio on a 6,200 sqft R-2 lot in North Park. Permitted in 11 weeks. Fully leased 6 days after listing at asking rent.",
  },
  {
    title: "Cable Street Garage Conversion",
    type: "Garage ADU",
    location: "Ocean Beach, San Diego",
    year: "2024",
    image: "https://images.unsplash.com/photo-1719324923613-ff0884b031ed?w=800&q=88&fit=crop",
    cost: "$112,000",
    rent: "$2,400/mo",
    capRate: "25.7%",
    payback: "3.9 yrs",
    roiScore: 9.4,
    desc: "Converted a detached 2-car garage into a permitted 360 sqft studio. Lowest build cost in the portfolio. Beach proximity sustains rental premium year-round.",
  },
  {
    title: "Marlborough Drive House Hack",
    type: "SB9 Lot Split",
    location: "Kensington, San Diego",
    year: "2024",
    image: "https://images.unsplash.com/photo-1660361338485-c926a27d4eb8?w=800&q=88&fit=crop",
    cost: "$285,000",
    rent: "$5,200/mo",
    capRate: "21.9%",
    payback: "4.5 yrs",
    roiScore: 9.1,
    desc: "SB9 lot split on a corner parcel in Kensington added two new units to a single-family lot. Historic neighborhood demand kept rents above pro-forma from day one.",
  },
];

export default function CaseStudies() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="case-studies" className="py-24 px-6" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <p className="text-xs uppercase tracking-widest mb-4" style={{ color: "var(--gold)", letterSpacing: "0.2em" }}>
            Case Studies
          </p>
          <h2
            className="text-5xl lg:text-6xl font-light leading-tight"
            style={{ fontFamily: "var(--font-cormorant), Georgia, serif", color: "var(--cream)" }}
          >
            Real projects.
            <br />
            <em>Real returns.</em>
          </h2>
        </div>

        <div className="space-y-px" style={{ background: "rgba(255,255,255,0.04)" }}>
          {PROJECTS.map((p, i) => (
            <div
              key={p.title}
              className="grid lg:grid-cols-2 group"
              style={{
                background: "var(--obsidian)",
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(24px)",
                transition: `opacity 0.6s ease ${i * 0.15}s, transform 0.6s ease ${i * 0.15}s`,
              }}
            >
              {/* Image */}
              <div
                className="relative overflow-hidden"
                style={{ minHeight: "340px", order: i % 2 === 1 ? 1 : 0 }}
              >
                <img
                  src={p.image}
                  alt={p.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  style={{ position: "absolute", inset: 0 }}
                />
                <div
                  className="absolute inset-0"
                  style={{ background: "linear-gradient(to right, rgba(10,10,10,0.3), transparent)" }}
                />
                {/* Year badge */}
                <div
                  className="absolute top-6 left-6 px-3 py-1 text-xs tracking-widest uppercase"
                  style={{ background: "rgba(10,10,10,0.7)", border: "1px solid rgba(255,255,255,0.3)", color: "var(--gold)", backdropFilter: "blur(8px)", letterSpacing: "0.14em" }}
                >
                  {p.year}
                </div>
                {/* Type badge */}
                <div
                  className="absolute top-6 right-6 px-3 py-1 text-xs tracking-widest uppercase"
                  style={{ background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.3)", color: "var(--gold)", backdropFilter: "blur(8px)", letterSpacing: "0.14em" }}
                >
                  {p.type}
                </div>
              </div>

              {/* Content */}
              <div className="p-10 lg:p-14 flex flex-col justify-center" style={{ order: i % 2 === 1 ? 0 : 1 }}>
                <div className="flex items-center gap-2 mb-4">
                  <MapPin size={13} style={{ color: "var(--gold)" }} />
                  <span className="text-xs" style={{ color: "rgba(237,232,223,0.4)", letterSpacing: "0.1em" }}>{p.location}</span>
                </div>
                <h3
                  className="text-3xl font-medium mb-4"
                  style={{ fontFamily: "var(--font-cormorant), Georgia, serif", color: "var(--cream)" }}
                >
                  {p.title}
                </h3>
                <p className="text-sm leading-relaxed mb-8" style={{ color: "rgba(237,232,223,0.5)" }}>
                  {p.desc}
                </p>

                {/* Metrics */}
                <div className="grid grid-cols-2 gap-px" style={{ background: "rgba(255,255,255,0.06)" }}>
                  {[
                    { label: "Build Cost", val: p.cost },
                    { label: "Monthly Rent", val: p.rent },
                    { label: "Cap Rate", val: p.capRate },
                    { label: "Payback", val: p.payback },
                  ].map((m) => (
                    <div key={m.label} className="p-4" style={{ background: "#0d0d0d" }}>
                      <div className="text-xs mb-1" style={{ color: "rgba(237,232,223,0.35)", letterSpacing: "0.1em" }}>{m.label}</div>
                      <div className="text-xl font-light" style={{ fontFamily: "var(--font-cormorant), Georgia, serif", color: "var(--gold)" }}>
                        {m.val}
                      </div>
                    </div>
                  ))}
                </div>

                {/* ROI Score */}
                <div className="mt-6 flex items-center gap-3">
                  <TrendingUp size={14} style={{ color: "var(--gold)" }} />
                  <span className="text-xs" style={{ color: "rgba(237,232,223,0.4)", letterSpacing: "0.1em" }}>ROI Score</span>
                  <span className="text-lg font-light" style={{ fontFamily: "var(--font-cormorant), Georgia, serif", color: "var(--gold)" }}>
                    {p.roiScore}/10
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
