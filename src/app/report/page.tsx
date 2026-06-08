import ReportClient from "./ReportClient";
import { Suspense } from "react";

export default function ReportPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center" style={{ background: "var(--obsidian)" }}>
        <div className="text-center">
          <div className="animate-pulse-gold w-12 h-12 rounded-full mx-auto mb-6" style={{ background: "rgba(255,255,255,0.2)", border: "1px solid rgba(255,255,255,0.4)" }} />
          <p className="text-xs uppercase tracking-widest" style={{ color: "var(--gold)", letterSpacing: "0.2em" }}>
            Analyzing property...
          </p>
        </div>
      </div>
    }>
      <ReportClient />
    </Suspense>
  );
}
