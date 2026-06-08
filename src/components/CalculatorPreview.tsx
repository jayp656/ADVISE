"use client";
import { useState } from "react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

function formatCurrency(n: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);
}

export default function CalculatorPreview() {
  const [buildCost, setBuildCost] = useState(180000);
  const [monthlyRent, setMonthlyRent] = useState(2800);
  const [downPct, setDownPct] = useState(20);
  const [annualExpenses, setAnnualExpenses] = useState(4200);

  const annualRent = monthlyRent * 12;
  const annualCashFlow = annualRent - annualExpenses;
  const capRate = buildCost > 0 ? ((annualCashFlow / buildCost) * 100).toFixed(1) : "0.0";
  const downPayment = buildCost * (downPct / 100);
  const cocReturn = downPayment > 0 ? ((annualCashFlow / downPayment) * 100).toFixed(1) : "0.0";
  const payback = annualCashFlow > 0 ? (buildCost / annualCashFlow).toFixed(1) : "—";
  const fiveYear = annualCashFlow * 5;

  return (
    <section id="calculators" className="py-24 px-6" style={{ background: "#0d0d0d" }}>
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 max-w-2xl">
          <p className="text-xs uppercase tracking-widest mb-4" style={{ color: "var(--gold)", letterSpacing: "0.2em" }}>
            ROI Calculator
          </p>
          <h2
            className="text-5xl lg:text-6xl font-light leading-tight"
            style={{ fontFamily: "var(--font-cormorant), Georgia, serif", color: "var(--cream)" }}
          >
            Run the numbers
            <br />
            <em>before you commit.</em>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-px" style={{ background: "rgba(255,255,255,0.04)" }}>
          {/* Inputs */}
          <div className="p-10 lg:p-14 space-y-8" style={{ background: "#0d0d0d" }}>
            {[
              { label: "Build / Project Cost", value: buildCost, set: setBuildCost, min: 10000, max: 600000, step: 5000 },
              { label: "Monthly Rent Income", value: monthlyRent, set: setMonthlyRent, min: 500, max: 8000, step: 50 },
              { label: "Down Payment %", value: downPct, set: setDownPct, min: 5, max: 100, step: 5, pct: true },
              { label: "Annual Expenses", value: annualExpenses, set: setAnnualExpenses, min: 0, max: 30000, step: 200 },
            ].map((field) => (
              <div key={field.label}>
                <div className="flex justify-between mb-3">
                  <label className="text-xs uppercase tracking-widest" style={{ color: "rgba(237,232,223,0.45)", letterSpacing: "0.14em" }}>
                    {field.label}
                  </label>
                  <span className="text-sm font-medium" style={{ color: "var(--gold)" }}>
                    {field.pct ? `${field.value}%` : formatCurrency(field.value)}
                  </span>
                </div>
                <input
                  type="range"
                  min={field.min}
                  max={field.max}
                  step={field.step}
                  value={field.value}
                  onChange={(e) => field.set(Number(e.target.value))}
                  className="w-full h-1 rounded-full appearance-none cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, var(--gold) ${((field.value - field.min) / (field.max - field.min)) * 100}%, rgba(255,255,255,0.1) 0%)`,
                    outline: "none",
                  }}
                />
              </div>
            ))}
          </div>

          {/* Outputs */}
          <div className="p-10 lg:p-14 flex flex-col" style={{ background: "var(--obsidian)" }}>
            <p className="text-xs uppercase tracking-widest mb-8" style={{ color: "var(--gold)", letterSpacing: "0.2em" }}>
              Your Projection
            </p>

            <div className="grid grid-cols-2 gap-px flex-1 mb-8" style={{ background: "rgba(255,255,255,0.05)" }}>
              {[
                { label: "Annual Cash Flow", val: formatCurrency(annualCashFlow), highlight: annualCashFlow > 0 },
                { label: "Cap Rate", val: `${capRate}%`, highlight: parseFloat(capRate) > 8 },
                { label: "Cash-on-Cash Return", val: `${cocReturn}%`, highlight: parseFloat(cocReturn) > 10 },
                { label: "Payback Period", val: `${payback} yrs`, highlight: false },
              ].map((m) => (
                <div
                  key={m.label}
                  className="p-6 flex flex-col justify-between"
                  style={{ background: "#0d0d0d" }}
                >
                  <span className="text-xs" style={{ color: "rgba(237,232,223,0.35)", letterSpacing: "0.1em" }}>{m.label}</span>
                  <span
                    className="text-2xl font-light mt-2"
                    style={{
                      fontFamily: "var(--font-cormorant), Georgia, serif",
                      color: m.highlight ? "var(--gold-light)" : "var(--cream)",
                    }}
                  >
                    {m.val}
                  </span>
                </div>
              ))}
            </div>

            {/* 5-year */}
            <div className="p-6 mb-8 rounded-sm" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.15)" }}>
              <div className="flex justify-between items-center">
                <span className="text-xs uppercase tracking-widest" style={{ color: "rgba(237,232,223,0.45)", letterSpacing: "0.14em" }}>
                  5-Year Cash Flow
                </span>
                <span className="text-3xl font-light" style={{ fontFamily: "var(--font-cormorant), Georgia, serif", color: "var(--gold)" }}>
                  {formatCurrency(fiveYear)}
                </span>
              </div>
            </div>

            <Link
              href="/report?demo=true"
              className="w-full py-4 text-center text-xs font-semibold tracking-widest uppercase flex items-center justify-center gap-2 rounded-sm transition-all duration-200"
              style={{ background: "var(--gold)", color: "var(--obsidian)", letterSpacing: "0.12em" }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(240,240,240,0.92)")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "var(--gold)")}
            >
              Get Your Property Analysis
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
