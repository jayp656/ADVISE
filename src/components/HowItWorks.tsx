"use client";
import { useEffect, useRef, useState } from "react";
import { Search, BarChart3, FileText, Handshake } from "lucide-react";

const STEPS = [
  {
    num: "01",
    icon: Search,
    title: "Enter Your Address",
    desc: "Search any Southern California property. We pull parcel data, zoning records, lot characteristics, and comparable sales instantly.",
  },
  {
    num: "02",
    icon: BarChart3,
    title: "We Score Every Opportunity",
    desc: "Our model analyzes every improvement type — ADU, garage conversion, addition, renovation — and ranks each by projected ROI on your specific property.",
  },
  {
    num: "03",
    icon: FileText,
    title: "Receive Your Property Report",
    desc: "Get a professional-grade Property Opportunity Report: costs, projected income, cap rate, payback period, and our recommended strategy.",
  },
  {
    num: "04",
    icon: Handshake,
    title: "We Execute Together",
    desc: "When you're ready to build, we connect you with vetted architects, lenders, and contractors — and manage the advisory relationship through completion.",
  },
];

export default function HowItWorks() {
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
    <section
      id="intelligence"
      className="py-24 px-6"
      ref={ref}
      style={{ background: "#0d0d0d" }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <p
            className="text-xs uppercase tracking-widest mb-4"
            style={{ color: "var(--gold)", letterSpacing: "0.2em" }}
          >
            The Process
          </p>
          <h2
            className="text-5xl lg:text-6xl font-light"
            style={{ fontFamily: "var(--font-cormorant), Georgia, serif", color: "var(--cream)" }}
          >
            Intelligence before investment.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px" style={{ background: "rgba(255,255,255,0.05)" }}>
          {STEPS.map((step, i) => {
            const Icon = step.icon;
            return (
              <div
                key={step.num}
                className="p-10 relative group"
                style={{
                  background: "#0d0d0d",
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateY(0)" : "translateY(32px)",
                  transition: `opacity 0.6s ease ${i * 0.1}s, transform 0.6s ease ${i * 0.1}s`,
                }}
              >
                {/* Ghost number */}
                <div
                  className="absolute top-6 right-6 font-light select-none"
                  style={{
                    fontFamily: "var(--font-cormorant), Georgia, serif",
                    fontSize: "80px",
                    lineHeight: 1,
                    color: "rgba(255,255,255,0.06)",
                  }}
                >
                  {step.num}
                </div>

                <div
                  className="w-12 h-12 rounded-sm flex items-center justify-center mb-6"
                  style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)" }}
                >
                  <Icon size={20} style={{ color: "var(--gold)" }} />
                </div>
                <h3
                  className="text-xl font-medium mb-4"
                  style={{ color: "var(--cream)", fontFamily: "var(--font-cormorant), Georgia, serif" }}
                >
                  {step.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "rgba(237,232,223,0.45)" }}>
                  {step.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
