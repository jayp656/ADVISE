import type { Metadata } from "next";
import SectionCareers from "@/components/SectionCareers";

export const metadata: Metadata = {
  title: "Careers | Summit Lot",
  description: "Join the Summit Lot team. We're hiring a Property Strategy Assistant in San Diego.",
};

export default function CareersPage() {
  return (
    <main style={{ background: "#080604", minHeight: "100svh" }}>
      {/* Nav bar */}
      <div style={{
        padding: "28px clamp(20px, 4vw, 48px)",
        borderBottom: "1px solid rgba(237,232,223,0.06)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}>
        <a href="/" style={{ textDecoration: "none" }}>
          <img
            src="https://ceimsgmzh6rmomfx.public.blob.vercel-storage.com/photos/1780978715619-5428C628-F649-4F06-9765-48AFF403A02C.png"
            alt="Summit Lot"
            style={{ height: 36, width: "auto", objectFit: "contain" }}
          />
        </a>
        <a href="/" style={{
          fontSize: 9,
          letterSpacing: "0.22em",
          textTransform: "uppercase",
          color: "rgba(237,232,223,0.3)",
          textDecoration: "none",
          fontFamily: "sans-serif",
        }}>
          ← Back
        </a>
      </div>

      <SectionCareers />
    </main>
  );
}
