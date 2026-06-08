"use client";
import { useEffect, useRef, useState } from "react";

const STEPS = [
  { label: "Parcel configuration", delay: 700 },
  { label: "Zoning classification", delay: 1300 },
  { label: "Setback requirements", delay: 1850 },
  { label: "Rental market demand", delay: 2350 },
  { label: "Construction cost basis", delay: 2850 },
  { label: "Qualifying programs", delay: 3350 },
  { label: "Opportunity ranking", delay: 3950 },
];

const RESULTS = [
  { label: "Primary Opportunity", value: "Detached ADU — Rear Yard" },
  { label: "Projected Income", value: "$2,150 – $2,600 / mo" },
  { label: "Qualifying Programs", value: "CalHFA Grant · HELOC · DSCR" },
  { label: "Est. Build Cost", value: "$95,000 – $130,000" },
];

export default function SectionDiscovery() {
  const [visible, setVisible] = useState(false);
  const [address, setAddress] = useState("");
  const [analyzing, setAnalyzing] = useState(false);
  const [stepsShown, setStepsShown] = useState<number[]>([]);
  const [complete, setComplete] = useState(false);
  const ref = useRef<HTMLElement>(null);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => {
      obs.disconnect();
      timersRef.current.forEach(clearTimeout);
    };
  }, []);

  function handleAnalyze() {
    if (!address.trim() || analyzing) return;
    timersRef.current.forEach(clearTimeout);
    setAnalyzing(true);
    setStepsShown([]);
    setComplete(false);

    STEPS.forEach((s, i) => {
      const t = setTimeout(() => {
        setStepsShown((prev) => [...prev, i]);
      }, s.delay);
      timersRef.current.push(t);
    });

    const done = setTimeout(() => setComplete(true), 5000);
    timersRef.current.push(done);
  }

  return (
    <section
      ref={ref}
      id="search"
      style={{
        background: "#0C0A08",
        padding: "160px 48px",
        minHeight: "100svh",
        display: "flex",
        alignItems: "center",
      }}
    >
      <div
        style={{ maxWidth: 1360, margin: "0 auto", width: "100%" }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-32"
      >
        {/* Left — framing copy */}
        <div
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 1.2s ease, transform 1.2s ease",
          }}
        >
          <p
            style={{
              fontSize: 9,
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: "rgba(156,128,96,0.52)",
              fontFamily: "var(--font-dm-sans), sans-serif",
              marginBottom: 24,
            }}
          >
            Section 06 · Intelligence System
          </p>
          <h2
            style={{
              fontFamily: "var(--font-cormorant), Georgia, serif",
              fontSize: "clamp(44px, 5vw, 80px)",
              fontWeight: 300,
              color: "#EDE8DF",
              letterSpacing: "-0.025em",
              lineHeight: 1.04,
              margin: "0 0 28px",
            }}
          >
            This system
            <br />
            <span style={{ opacity: 0.42 }}>understands your property.</span>
          </h2>
          <p
            style={{
              fontSize: 14,
              color: "rgba(237,232,223,0.28)",
              fontFamily: "var(--font-dm-sans), sans-serif",
              lineHeight: 1.85,
              maxWidth: 360,
            }}
          >
            We cross-reference zoning data, rental markets,
            construction costs, and financing programs against your
            specific parcel — and surface only what matters.
          </p>
        </div>

        {/* Right — interface */}
        <div
          style={{
            opacity: visible ? 1 : 0,
            transition: "opacity 1.2s ease 0.4s",
          }}
        >
          {/* Address input */}
          <div
            style={{
              borderBottom: "1px solid rgba(237,232,223,0.1)",
              paddingBottom: 22,
              marginBottom: 28,
            }}
          >
            <p
              style={{
                fontSize: 8,
                letterSpacing: "0.26em",
                textTransform: "uppercase",
                color: "rgba(237,232,223,0.22)",
                fontFamily: "var(--font-dm-sans), sans-serif",
                marginBottom: 12,
              }}
            >
              Property Address
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleAnalyze()}
                placeholder="Enter a San Diego address"
                style={{
                  flex: 1,
                  background: "transparent",
                  border: "none",
                  outline: "none",
                  color: "#EDE8DF",
                  fontSize: 16,
                  fontFamily: "var(--font-dm-sans), sans-serif",
                  fontWeight: 300,
                  letterSpacing: "0.02em",
                  caretColor: "#9C8060",
                }}
              />
              <button
                onClick={handleAnalyze}
                style={{
                  background: "none",
                  border: "none",
                  cursor: address.trim() ? "pointer" : "default",
                  fontSize: 9,
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  color: !address.trim()
                    ? "rgba(156,128,96,0.22)"
                    : analyzing && !complete
                    ? "rgba(156,128,96,0.45)"
                    : "#9C8060",
                  fontFamily: "var(--font-dm-sans), sans-serif",
                  padding: "8px 0",
                  transition: "color 0.3s ease",
                  whiteSpace: "nowrap",
                  flexShrink: 0,
                }}
              >
                {analyzing && !complete ? "Analyzing" : "Analyze →"}
              </button>
            </div>
          </div>

          {/* Analysis steps */}
          {analyzing && (
            <div>
              {STEPS.map((s, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 14,
                    padding: "9px 0",
                    borderBottom: "1px solid rgba(237,232,223,0.04)",
                    opacity: stepsShown.includes(i) ? 1 : 0,
                    transform: stepsShown.includes(i)
                      ? "translateX(0)"
                      : "translateX(-10px)",
                    transition: "opacity 0.5s ease, transform 0.5s ease",
                  }}
                >
                  <div
                    style={{
                      width: 4,
                      height: 4,
                      borderRadius: "50%",
                      background: "#9C8060",
                      flexShrink: 0,
                    }}
                  />
                  <span
                    style={{
                      fontSize: 11,
                      letterSpacing: "0.1em",
                      color: "rgba(237,232,223,0.42)",
                      fontFamily: "var(--font-dm-sans), sans-serif",
                    }}
                  >
                    {s.label}
                  </span>
                  <span
                    style={{
                      marginLeft: "auto",
                      fontSize: 9,
                      color: "rgba(156,128,96,0.5)",
                      fontFamily: "var(--font-dm-sans), sans-serif",
                    }}
                  >
                    ✓
                  </span>
                </div>
              ))}

              {/* Results */}
              {complete && (
                <div
                  style={{
                    marginTop: 28,
                    paddingTop: 24,
                    borderTop: "1px solid rgba(156,128,96,0.18)",
                    opacity: 1,
                  }}
                >
                  <p
                    style={{
                      fontSize: 8,
                      letterSpacing: "0.26em",
                      textTransform: "uppercase",
                      color: "rgba(156,128,96,0.55)",
                      fontFamily: "var(--font-dm-sans), sans-serif",
                      marginBottom: 20,
                    }}
                  >
                    Analysis Complete
                  </p>
                  <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                    {RESULTS.map((r) => (
                      <div
                        key={r.label}
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "baseline",
                          gap: 20,
                        }}
                      >
                        <span
                          style={{
                            fontSize: 10,
                            letterSpacing: "0.08em",
                            color: "rgba(237,232,223,0.24)",
                            fontFamily: "var(--font-dm-sans), sans-serif",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {r.label}
                        </span>
                        <span
                          style={{
                            fontSize: 11,
                            letterSpacing: "0.04em",
                            color: "rgba(237,232,223,0.68)",
                            fontFamily: "var(--font-dm-sans), sans-serif",
                            textAlign: "right",
                          }}
                        >
                          {r.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Idle hint */}
          {!analyzing && (
            <p
              style={{
                fontSize: 11,
                color: "rgba(237,232,223,0.16)",
                fontFamily: "var(--font-dm-sans), sans-serif",
                letterSpacing: "0.06em",
                lineHeight: 1.8,
              }}
            >
              Enter any San Diego residential address to see
              <br />
              what opportunities may exist in the property.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
