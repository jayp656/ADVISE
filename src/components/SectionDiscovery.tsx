"use client";
import { useEffect, useRef, useState } from "react";

interface AnalysisResult {
  parcel: { lotSize: string; existing: string; zoning: string; year: string };
  adu: { type: string; maxSize: string; setbacks: string; feasibility: string };
  financial: { projectedRent: string; buildCost: string; programs: string; payback: string };
  summary: string;
}

const GOALS = ["Rental Income", "Family Housing", "Home Office", "Other"];

export default function SectionDiscovery() {
  const [visible, setVisible] = useState(false);
  const [step, setStep] = useState<"form" | "analyzing" | "done">("form");
  const [address, setAddress] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [ownerOccupied, setOwnerOccupied] = useState<"yes" | "no" | "">("");
  const [goal, setGoal] = useState("");
  const [searchSteps, setSearchSteps] = useState<string[]>([]);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const canSubmit = address.trim() && name.trim() && email.trim();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;
    setStep("analyzing");
    setSearchSteps([]);
    setResult(null);
    setError(null);

    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ address: address.trim(), name, email, phone, ownerOccupied, goal }),
      });

      if (!res.body) throw new Error("No response stream");

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const parts = buffer.split("\n\n");
        buffer = parts.pop() ?? "";

        for (const part of parts) {
          const line = part.replace(/^data: /, "").trim();
          if (!line) continue;
          try {
            const msg = JSON.parse(line);
            if (msg.type === "step") {
              setSearchSteps((prev) => [...prev, msg.label]);
            } else if (msg.type === "complete") {
              setResult(msg.result);
              setStep("done");
            } else if (msg.type === "error") {
              setError(msg.message);
              setStep("done");
            }
          } catch { /* ignore partial */ }
        }
      }
    } catch (e) {
      setError(String(e));
      setStep("done");
    }
  }

  const inputStyle: React.CSSProperties = {
    width: "100%",
    background: "rgba(237,232,223,0.04)",
    border: "1px solid rgba(237,232,223,0.1)",
    borderRadius: 2,
    padding: "12px 14px",
    color: "#EDE8DF",
    fontSize: 14,
    fontFamily: "var(--font-dm-sans), sans-serif",
    fontWeight: 300,
    outline: "none",
    caretColor: "#9C8060",
    touchAction: "manipulation",
    WebkitUserSelect: "text",
    userSelect: "text",
    minHeight: 44,
    boxSizing: "border-box",
  };

  const labelStyle: React.CSSProperties = {
    display: "block",
    fontSize: 8,
    letterSpacing: "0.24em",
    textTransform: "uppercase",
    color: "rgba(237,232,223,0.3)",
    fontFamily: "var(--font-dm-sans), sans-serif",
    marginBottom: 8,
  };

  const resultRows = result ? [
    { label: "Lot Size", value: result.parcel.lotSize },
    { label: "Existing Structure", value: result.parcel.existing },
    { label: "Zoning", value: result.parcel.zoning },
    { label: "ADU Type", value: result.adu.type },
    { label: "Max ADU Size", value: result.adu.maxSize },
    { label: "Setbacks", value: result.adu.setbacks },
    { label: "Feasibility", value: result.adu.feasibility },
    { label: "Projected Rent", value: result.financial.projectedRent },
    { label: "Est. Build Cost", value: result.financial.buildCost },
    { label: "Programs Available", value: result.financial.programs },
    { label: "Est. Payback", value: result.financial.payback },
  ] : [];

  return (
    <section
      ref={ref}
      id="search"
      style={{
        background: "#0C0A08",
        padding: "clamp(80px,10vw,160px) clamp(20px,4vw,48px)",
        minHeight: "100svh",
        display: "flex",
        alignItems: "flex-start",
        position: "relative",
        zIndex: 1,
      }}
    >
      <div style={{ maxWidth: 1360, margin: "0 auto", width: "100%" }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32">

        {/* Left — copy */}
        <div style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(20px)",
          transition: "opacity 1.2s ease, transform 1.2s ease",
        }}>
          <p style={{
            fontSize: 9, letterSpacing: "0.3em", textTransform: "uppercase",
            color: "rgba(156,128,96,0.52)", fontFamily: "var(--font-dm-sans), sans-serif",
            marginBottom: 24,
          }}>
            Section 06 · Free Feasibility Check
          </p>
          <h2 style={{
            fontFamily: "var(--font-cormorant), Georgia, serif",
            fontSize: "clamp(40px, 5vw, 76px)", fontWeight: 300,
            color: "#EDE8DF", letterSpacing: "-0.025em", lineHeight: 1.04,
            margin: "0 0 24px",
          }}>
            Find out what
            <br />
            <span style={{ opacity: 0.42 }}>your lot can build.</span>
          </h2>
          <p style={{
            fontSize: 14, color: "rgba(237,232,223,0.28)",
            fontFamily: "var(--font-dm-sans), sans-serif",
            lineHeight: 1.85, maxWidth: 360, marginBottom: 40,
          }}>
            Enter your address and we'll pull county records, check your zoning,
            and calculate what an ADU could generate — at no cost.
          </p>

          {/* What we check */}
          <div style={{ borderTop: "1px solid rgba(237,232,223,0.07)", paddingTop: 28 }}>
            {[
              "Zoning & setback requirements",
              "Lot size & parcel configuration",
              "Max ADU size under CA law",
              "Projected rental income",
              "Qualifying grant programs",
              "SB9 lot split eligibility",
            ].map((item) => (
              <div key={item} style={{
                display: "flex", alignItems: "center", gap: 12,
                padding: "8px 0", borderBottom: "1px solid rgba(237,232,223,0.04)",
              }}>
                <div style={{ width: 3, height: 3, borderRadius: "50%", background: "rgba(156,128,96,0.5)", flexShrink: 0 }} />
                <span style={{ fontSize: 11, color: "rgba(237,232,223,0.35)", fontFamily: "var(--font-dm-sans), sans-serif", letterSpacing: "0.05em" }}>
                  {item}
                </span>
              </div>
            ))}
          </div>

          {result?.summary && (
            <p style={{
              marginTop: 32, fontSize: 14,
              color: "rgba(156,128,96,0.75)",
              fontFamily: "var(--font-cormorant), Georgia, serif",
              lineHeight: 1.8, fontStyle: "italic", maxWidth: 380,
              borderLeft: "1px solid rgba(156,128,96,0.25)", paddingLeft: 18,
            }}>
              {result.summary}
            </p>
          )}
        </div>

        {/* Right — form / results */}
        <div style={{ opacity: visible ? 1 : 0, transition: "opacity 1.2s ease 0.3s" }}>

          {/* FORM */}
          {step === "form" && (
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              <div>
                <label style={labelStyle}>Property Address *</label>
                <input
                  type="text" inputMode="text" autoComplete="street-address"
                  value={address} onChange={e => setAddress(e.target.value)}
                  placeholder="e.g. 4234 Utah St, San Diego, CA 92104"
                  style={inputStyle} required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label style={labelStyle}>Your Name *</label>
                  <input type="text" autoComplete="name" value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="First Last" style={inputStyle} required />
                </div>
                <div>
                  <label style={labelStyle}>Phone</label>
                  <input type="tel" autoComplete="tel" value={phone}
                    onChange={e => setPhone(e.target.value)}
                    placeholder="(619) 555-0100" style={inputStyle} />
                </div>
              </div>

              <div>
                <label style={labelStyle}>Email *</label>
                <input type="email" autoComplete="email" value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="you@example.com" style={inputStyle} required />
              </div>

              {/* Owner occupied */}
              <div>
                <label style={labelStyle}>Do you currently live in the home?</label>
                <div style={{ display: "flex", gap: 10 }}>
                  {(["yes", "no"] as const).map(v => (
                    <button type="button" key={v} onClick={() => setOwnerOccupied(v)}
                      style={{
                        flex: 1, padding: "10px 0", border: "1px solid",
                        borderColor: ownerOccupied === v ? "rgba(156,128,96,0.6)" : "rgba(237,232,223,0.1)",
                        borderRadius: 2, background: ownerOccupied === v ? "rgba(156,128,96,0.12)" : "transparent",
                        color: ownerOccupied === v ? "#9C8060" : "rgba(237,232,223,0.35)",
                        fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase",
                        fontFamily: "var(--font-dm-sans), sans-serif",
                        cursor: "pointer", transition: "all 0.2s ease",
                      }}>
                      {v === "yes" ? "Yes" : "No"}
                    </button>
                  ))}
                </div>
              </div>

              {/* Goal */}
              <div>
                <label style={labelStyle}>What's your goal?</label>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {GOALS.map(g => (
                    <button type="button" key={g} onClick={() => setGoal(g)}
                      style={{
                        padding: "8px 14px", border: "1px solid",
                        borderColor: goal === g ? "rgba(156,128,96,0.6)" : "rgba(237,232,223,0.1)",
                        borderRadius: 2, background: goal === g ? "rgba(156,128,96,0.12)" : "transparent",
                        color: goal === g ? "#9C8060" : "rgba(237,232,223,0.35)",
                        fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase",
                        fontFamily: "var(--font-dm-sans), sans-serif",
                        cursor: "pointer", transition: "all 0.2s ease",
                        whiteSpace: "nowrap",
                      }}>
                      {g}
                    </button>
                  ))}
                </div>
              </div>

              <button type="submit" disabled={!canSubmit}
                style={{
                  marginTop: 8, padding: "16px 0",
                  background: canSubmit ? "rgba(156,128,96,0.15)" : "transparent",
                  border: "1px solid",
                  borderColor: canSubmit ? "rgba(156,128,96,0.45)" : "rgba(237,232,223,0.08)",
                  borderRadius: 2, cursor: canSubmit ? "pointer" : "default",
                  fontSize: 10, letterSpacing: "0.28em", textTransform: "uppercase",
                  color: canSubmit ? "#9C8060" : "rgba(237,232,223,0.2)",
                  fontFamily: "var(--font-dm-sans), sans-serif",
                  transition: "all 0.3s ease",
                  touchAction: "manipulation",
                }}>
                Run Free Analysis →
              </button>
            </form>
          )}

          {/* ANALYZING */}
          {step === "analyzing" && (
            <div>
              <p style={{
                fontSize: 8, letterSpacing: "0.26em", textTransform: "uppercase",
                color: "rgba(156,128,96,0.55)", fontFamily: "var(--font-dm-sans), sans-serif",
                marginBottom: 24,
              }}>
                Analyzing {address}
              </p>
              {searchSteps.map((s, i) => (
                <div key={i} style={{
                  display: "flex", alignItems: "center", gap: 14,
                  padding: "9px 0", borderBottom: "1px solid rgba(237,232,223,0.04)",
                }}>
                  <div style={{ width: 4, height: 4, borderRadius: "50%", background: "#9C8060", flexShrink: 0 }} />
                  <span style={{ fontSize: 11, color: "rgba(237,232,223,0.42)", fontFamily: "var(--font-dm-sans), sans-serif" }}>{s}</span>
                  <span style={{ marginLeft: "auto", fontSize: 9, color: "rgba(156,128,96,0.5)", fontFamily: "var(--font-dm-sans), sans-serif", flexShrink: 0 }}>✓</span>
                </div>
              ))}
              <div style={{ display: "flex", alignItems: "center", gap: 14, padding: "9px 0" }}>
                <div style={{ width: 4, height: 4, borderRadius: "50%", background: "rgba(156,128,96,0.4)", flexShrink: 0, animation: "pulse 1.4s ease-in-out infinite" }} />
                <span style={{ fontSize: 11, color: "rgba(237,232,223,0.22)", fontFamily: "var(--font-dm-sans), sans-serif" }}>Searching…</span>
              </div>
            </div>
          )}

          {/* DONE — results */}
          {step === "done" && result && (
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 24 }}>
                <p style={{
                  fontSize: 8, letterSpacing: "0.26em", textTransform: "uppercase",
                  color: "rgba(156,128,96,0.55)", fontFamily: "var(--font-dm-sans), sans-serif",
                }}>
                  Feasibility Report
                </p>
                <button onClick={() => { setStep("form"); setResult(null); setError(null); setSearchSteps([]); }}
                  style={{
                    background: "none", border: "none", cursor: "pointer",
                    fontSize: 9, letterSpacing: "0.18em", textTransform: "uppercase",
                    color: "rgba(237,232,223,0.25)", fontFamily: "var(--font-dm-sans), sans-serif",
                  }}>
                  New Search
                </button>
              </div>
              <div style={{ display: "flex", flexDirection: "column" }}>
                {resultRows.map((r) => (
                  <div key={r.label} style={{
                    display: "flex", justifyContent: "space-between", alignItems: "baseline",
                    gap: 20, padding: "12px 0", borderBottom: "1px solid rgba(237,232,223,0.05)",
                  }}>
                    <span style={{
                      fontSize: 10, letterSpacing: "0.08em",
                      color: "rgba(237,232,223,0.24)", fontFamily: "var(--font-dm-sans), sans-serif",
                      whiteSpace: "nowrap", flexShrink: 0,
                    }}>{r.label}</span>
                    <span style={{
                      fontSize: 11, letterSpacing: "0.04em",
                      color: "rgba(237,232,223,0.75)", fontFamily: "var(--font-dm-sans), sans-serif",
                      textAlign: "right",
                    }}>{r.value}</span>
                  </div>
                ))}
              </div>
              <div style={{
                marginTop: 28, padding: "18px", background: "rgba(156,128,96,0.07)",
                border: "1px solid rgba(156,128,96,0.15)", borderRadius: 2,
              }}>
                <p style={{
                  fontSize: 10, letterSpacing: "0.08em", textTransform: "uppercase",
                  color: "rgba(156,128,96,0.6)", fontFamily: "var(--font-dm-sans), sans-serif",
                  marginBottom: 10,
                }}>Next Step</p>
                <p style={{
                  fontSize: 13, color: "rgba(237,232,223,0.55)", fontFamily: "var(--font-dm-sans), sans-serif", lineHeight: 1.7,
                }}>
                  A Summit Lot advisor will review your parcel and follow up within 24 hours
                  with a full site analysis, design options, and projected returns.
                </p>
              </div>
            </div>
          )}

          {step === "done" && error && (
            <div>
              <p style={{ fontSize: 12, color: "rgba(220,80,60,0.7)", fontFamily: "var(--font-dm-sans), sans-serif", lineHeight: 1.7, marginBottom: 16 }}>
                {error}
              </p>
              <button onClick={() => { setStep("form"); setError(null); setSearchSteps([]); }}
                style={{ background: "none", border: "none", cursor: "pointer", fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(237,232,223,0.3)", fontFamily: "var(--font-dm-sans), sans-serif" }}>
                Try Again
              </button>
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes pulse { 0%, 100% { opacity: 0.3; } 50% { opacity: 1; } }
        input::placeholder { color: rgba(237,232,223,0.18); }
        input:focus { border-color: rgba(156,128,96,0.35) !important; }
      `}</style>
    </section>
  );
}
