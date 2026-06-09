"use client";
import { useEffect, useRef, useState } from "react";

const PHOTOS = [
  {
    url: "https://ceimsgmzh6rmomfx.public.blob.vercel-storage.com/photos/1780967064328-IMG_7834.webp",
    label: "Kitchen · White oak cabinetry",
    span: "tall",
  },
  {
    url: "https://ceimsgmzh6rmomfx.public.blob.vercel-storage.com/photos/1780967052537-IMG_7833.webp",
    label: "Bath · Venetian plaster · Marble vessel",
    span: "short",
  },
  {
    url: "https://ceimsgmzh6rmomfx.public.blob.vercel-storage.com/photos/1780967068183-IMG_7835.webp",
    label: "Bath · Stone tile · Floating vanity",
    span: "short",
  },
  {
    url: "https://ceimsgmzh6rmomfx.public.blob.vercel-storage.com/photos/1780967073970-IMG_7836.webp",
    label: "Kitchen · Galley · Wine fridge · Skylight",
    span: "short",
  },
];

const STATS = [
  { value: "$550 – $1,000", label: "More per month\nwith premium finish" },
  { value: "18 – 26%", label: "Rent premium over\nunfinished units" },
  { value: "< 6 days", label: "Average days to lease\na designed unit" },
];

export default function SectionInteriorDesign() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);
  const triggered = useRef(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && !triggered.current) {
          triggered.current = true;
          setVisible(true);
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      style={{
        background: "#0C0A08",
        padding: "clamp(80px, 10vw, 140px) clamp(20px, 4vw, 48px)",
        overflow: "hidden",
      }}
    >
      <div style={{ maxWidth: 1360, margin: "0 auto" }}>

        {/* Header row */}
        <div
          className="flex flex-col lg:flex-row lg:items-end"
          style={{
            marginBottom: 56,
            gap: 32,
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(16px)",
            transition: "opacity 1.2s ease, transform 1.2s ease",
          }}
        >
          <div style={{ flex: 1 }}>
            <p
              style={{
                fontSize: 9,
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                color: "rgba(156,128,96,0.55)",
                fontFamily: "var(--font-dm-sans), sans-serif",
                marginBottom: 20,
              }}
            >
              Interior Design · Rental Optimization
            </p>
            <h2
              style={{
                fontFamily: "var(--font-cormorant), Georgia, serif",
                fontSize: "clamp(44px, 5.5vw, 88px)",
                fontWeight: 300,
                color: "#EDE8DF",
                letterSpacing: "-0.025em",
                lineHeight: 1.03,
                margin: 0,
              }}
            >
              Every finish is
              <br />
              <span style={{ opacity: 0.38 }}>a financial decision.</span>
            </h2>
          </div>

          <p
            style={{
              fontSize: 14,
              color: "rgba(237,232,223,0.28)",
              fontFamily: "var(--font-dm-sans), sans-serif",
              lineHeight: 1.88,
              maxWidth: 340,
              letterSpacing: "0.02em",
            }}
          >
            We design and furnish every ADU to attract the highest-quality
            tenants and the strongest rents in the market. The kitchen,
            the bathroom, the light — each detail is deliberate.
          </p>
        </div>

        {/* Photo grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gridTemplateRows: "auto auto",
            gap: 3,
          }}
        >
          {/* Tall left photo — spans 2 rows */}
          <div
            style={{
              gridRow: "1 / span 2",
              position: "relative",
              overflow: "hidden",
              aspectRatio: "3/4",
              opacity: visible ? 1 : 0,
              transition: "opacity 1.6s ease 0.2s",
            }}
          >
            <img
              src={PHOTOS[0].url}
              alt={PHOTOS[0].label}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "center",
                filter: "saturate(0.88) brightness(0.92)",
                transition: "transform 0.7s ease",
              }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLImageElement).style.transform =
                  "scale(1.03)")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLImageElement).style.transform =
                  "scale(1)")
              }
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(to top, rgba(12,10,8,0.72) 0%, rgba(12,10,8,0) 45%)",
              }}
            />
            <p
              style={{
                position: "absolute",
                bottom: 16,
                left: 16,
                fontSize: 8,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "rgba(156,128,96,0.6)",
                fontFamily: "var(--font-dm-sans), sans-serif",
              }}
            >
              {PHOTOS[0].label}
            </p>
          </div>

          {/* 3 smaller photos — right two columns */}
          {PHOTOS.slice(1).map((p, i) => (
            <div
              key={i}
              style={{
                position: "relative",
                overflow: "hidden",
                aspectRatio: "4/3",
                opacity: visible ? 1 : 0,
                transition: `opacity 1.6s ease ${0.35 + i * 0.15}s`,
              }}
            >
              <img
                src={p.url}
                alt={p.label}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: "center",
                  filter: "saturate(0.82) brightness(0.9)",
                  transition: "transform 0.7s ease",
                }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLImageElement).style.transform =
                    "scale(1.04)")
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLImageElement).style.transform =
                    "scale(1)")
                }
              />
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(to top, rgba(12,10,8,0.68) 0%, rgba(12,10,8,0) 50%)",
                }}
              />
              <p
                style={{
                  position: "absolute",
                  bottom: 12,
                  left: 12,
                  fontSize: 7,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "rgba(156,128,96,0.55)",
                  fontFamily: "var(--font-dm-sans), sans-serif",
                }}
              >
                {p.label}
              </p>
            </div>
          ))}
        </div>

        {/* Stats row */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            borderTop: "1px solid rgba(237,232,223,0.07)",
            marginTop: 48,
            opacity: visible ? 1 : 0,
            transition: "opacity 1.4s ease 0.9s",
          }}
        >
          {STATS.map((s, i) => (
            <div
              key={i}
              style={{
                padding: "32px 0",
                borderRight:
                  i < STATS.length - 1
                    ? "1px solid rgba(237,232,223,0.07)"
                    : "none",
                paddingLeft: i > 0 ? 32 : 0,
              }}
            >
              <p
                style={{
                  fontFamily: "var(--font-cormorant), Georgia, serif",
                  fontSize: "clamp(28px, 3vw, 48px)",
                  fontWeight: 300,
                  color: "#9C8060",
                  letterSpacing: "-0.02em",
                  lineHeight: 1,
                  marginBottom: 10,
                }}
              >
                {s.value}
              </p>
              <p
                style={{
                  fontSize: 10,
                  color: "rgba(237,232,223,0.25)",
                  fontFamily: "var(--font-dm-sans), sans-serif",
                  letterSpacing: "0.08em",
                  lineHeight: 1.6,
                  whiteSpace: "pre-line",
                }}
              >
                {s.label}
              </p>
            </div>
          ))}
        </div>

        {/* CTA line */}
        <div
          style={{
            marginTop: 40,
            display: "flex",
            alignItems: "center",
            gap: 16,
            opacity: visible ? 1 : 0,
            transition: "opacity 1.3s ease 1.2s",
          }}
        >
          <div
            style={{
              width: 36,
              height: 1,
              background: "rgba(156,128,96,0.3)",
            }}
          />
          <a
            href="#search"
            style={{
              fontSize: 9,
              letterSpacing: "0.28em",
              textTransform: "uppercase",
              color: "rgba(237,232,223,0.4)",
              textDecoration: "none",
              fontFamily: "var(--font-dm-sans), sans-serif",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#EDE8DF")}
            onMouseLeave={(e) =>
              (e.currentTarget.style.color = "rgba(237,232,223,0.4)")
            }
          >
            See what your property could earn →
          </a>
        </div>

      </div>
    </section>
  );
}
