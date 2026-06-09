"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

const LINKS = [
  { label: "Homes",        href: "#opportunities" },
  { label: "Services",     href: "#opportunities" },
  { label: "Neighborhood", href: "#neighborhood"  },
  { label: "Advisory",     href: "#search"        },
];

export default function Nav() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handler = () => setVisible(window.scrollY > window.innerHeight * 0.82);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <nav
      aria-hidden={!visible}
      style={{
        position:      "fixed",
        top:           0,
        left:          0,
        right:         0,
        zIndex:        50,
        padding:       "14px 24px",
        opacity:       visible ? 1 : 0,
        transform:     visible ? "translateY(0)" : "translateY(-10px)",
        pointerEvents: visible ? "auto" : "none",
        transition:    "opacity 0.45s ease, transform 0.45s ease",
      }}
    >
      <div
        className="max-w-7xl mx-auto rounded-xl flex items-center justify-between px-5 py-2.5"
        style={{
          background:           "rgba(20,17,14,0.90)",
          backdropFilter:       "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          border:               "1px solid rgba(237,232,223,0.07)",
          boxShadow:            "0 12px 40px rgba(0,0,0,0.45)",
        }}
      >
        {/* Logo */}
        <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center" }}>
          <img
            src="https://ceimsgmzh6rmomfx.public.blob.vercel-storage.com/photos/1780978715619-5428C628-F649-4F06-9765-48AFF403A02C.png"
            alt="Summit Lot"
            style={{ height: 44, width: "auto", objectFit: "contain" }}
          />
        </Link>

        {/* Center links */}
        <div className="hidden md:flex items-center gap-8">
          {LINKS.map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              style={{
                fontSize:        11,
                letterSpacing:   "0.14em",
                textTransform:   "uppercase",
                color:           "rgba(237,232,223,0.45)",
                textDecoration:  "none",
                fontFamily:      "var(--font-dm-sans), sans-serif",
                transition:      "color 0.2s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#EDE8DF")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(237,232,223,0.45)")}
            >
              {label}
            </Link>
          ))}
        </div>

        {/* CTA */}
        <Link
          href="#search"
          style={{
            fontSize:        11,
            letterSpacing:   "0.14em",
            textTransform:   "uppercase",
            color:           "#EDE8DF",
            textDecoration:  "none",
            fontFamily:      "var(--font-dm-sans), sans-serif",
            padding:         "8px 20px",
            borderRadius:    "8px",
            background:      "rgba(237,232,223,0.09)",
            border:          "1px solid rgba(237,232,223,0.14)",
            transition:      "background 0.2s ease, border-color 0.2s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background    = "rgba(237,232,223,0.16)";
            e.currentTarget.style.borderColor   = "rgba(237,232,223,0.28)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background    = "rgba(237,232,223,0.09)";
            e.currentTarget.style.borderColor   = "rgba(237,232,223,0.14)";
          }}
        >
          Begin Analysis
        </Link>
      </div>
    </nav>
  );
}
