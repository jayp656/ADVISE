"use client";
import Link from "next/link";

const SERVICES = ["ADU Development", "Garage Conversion", "Kitchen Renovation", "Bath Remodel", "Interior Design", "Financing Strategy", "Grant Identification", "ROI Analysis", "Asset Management", "Leasing"];
const AREAS = ["San Diego", "Chula Vista", "Escondido", "El Cajon", "Santee", "La Mesa", "Lemon Grove", "National City", "Encinitas", "Oceanside", "Carlsbad", "Vista"];

export default function Footer() {
  return (
    <footer style={{ background: "#060606", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-4 gap-12">
        {/* Brand */}
        <div className="md:col-span-1">
          <div className="mb-4">
            <img
              src="https://ceimsgmzh6rmomfx.public.blob.vercel-storage.com/photos/1780978715619-5428C628-F649-4F06-9765-48AFF403A02C.png"
              alt="Summit Lot"
              style={{ height: 36, width: "auto", objectFit: "contain" }}
            />
          </div>
          <p className="text-xs leading-relaxed mb-4" style={{ color: "rgba(237,232,223,0.35)" }}>
            Property Intelligence and Improvement Advisory for Southern California homeowners and investors.
          </p>
          <p className="text-xs" style={{ color: "rgba(237,232,223,0.2)", letterSpacing: "0.08em" }}>
            Est. 2019 · San Diego County, CA
          </p>
        </div>

        {/* Services */}
        <div>
          <p className="text-xs uppercase tracking-widest mb-5" style={{ color: "rgba(237,232,223,0.3)", letterSpacing: "0.18em" }}>
            Services
          </p>
          <ul className="space-y-2">
            {SERVICES.map((s) => (
              <li key={s}>
                <span className="text-xs" style={{ color: "rgba(237,232,223,0.4)" }}>{s}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Navigate */}
        <div>
          <p className="text-xs uppercase tracking-widest mb-5" style={{ color: "rgba(237,232,223,0.3)", letterSpacing: "0.18em" }}>
            Navigate
          </p>
          <ul className="space-y-2">
            {[
              { label: "Property Analysis",  href: "#search"        },
              { label: "ADU Opportunities",  href: "#opportunities" },
              { label: "Case Studies",       href: "#case-studies"  },
              { label: "Neighborhood Map",   href: "#neighborhood"  },
              { label: "Free Consultation",  href: "#search"        },
            ].map(({ label, href }) => (
              <li key={label}>
                <Link href={href} className="text-xs transition-colors duration-150" style={{ color: "rgba(237,232,223,0.4)" }}
                  onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "var(--gold)")}
                  onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "rgba(237,232,223,0.4)")}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Areas */}
        <div>
          <p className="text-xs uppercase tracking-widest mb-5" style={{ color: "rgba(237,232,223,0.3)", letterSpacing: "0.18em" }}>
            Areas Served
          </p>
          <ul className="space-y-1.5">
            {AREAS.map((a) => (
              <li key={a}>
                <span className="text-xs" style={{ color: "rgba(237,232,223,0.35)" }}>{a}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div
        className="px-6 py-5 flex flex-col md:flex-row justify-between items-center gap-3"
        style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
      >
        <p className="text-xs" style={{ color: "rgba(237,232,223,0.2)", letterSpacing: "0.08em" }}>
          © 2025 Summit Lot · Advisory services only · Not a licensed contractor · DRE License Pending
        </p>
        <p className="text-xs" style={{ color: "rgba(237,232,223,0.15)" }}>
          Jason Umana · San Diego County, CA
        </p>
      </div>
    </footer>
  );
}
