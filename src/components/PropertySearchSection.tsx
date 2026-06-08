"use client";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { MapPin, ArrowRight, Search } from "lucide-react";

const EXAMPLES = [
  "123 Oak Street, San Diego, CA 92103",
  "4521 Mission Bay Dr, San Diego, CA 92109",
  "2890 Caminito Eastbluff, La Jolla, CA 92037",
  "701 Kettner Blvd, San Diego, CA 92101",
  "810 W Washington St, San Diego, CA 92103",
];

export default function PropertySearchSection() {
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleInput = (val: string) => {
    setQuery(val);
    setSuggestions(
      val.length > 2
        ? EXAMPLES.filter((s) => s.toLowerCase().includes(val.toLowerCase())).slice(0, 4)
        : []
    );
  };

  const submit = (addr?: string) => {
    const target = addr || query;
    if (!target.trim()) return;
    router.push(`/report?address=${encodeURIComponent(target)}`);
  };

  const showDrop = focused && (suggestions.length > 0 || query.length === 0);

  return (
    <section
      id="search"
      className="py-28 px-6"
      style={{ background: "#FAF8F4" }}
    >
      <div className="max-w-4xl mx-auto">
        {/* Label */}
        <div className="flex items-center gap-3 mb-10">
          <div className="w-px h-5" style={{ background: "rgba(156,128,96,0.45)" }} />
          <span
            className="text-xs uppercase"
            style={{
              color: "rgba(12,10,8,0.38)",
              letterSpacing: "0.22em",
              fontFamily: "var(--font-dm-sans), sans-serif",
            }}
          >
            Property Intelligence Platform
          </span>
        </div>

        {/* Headline */}
        <h2
          className="font-light leading-none mb-8"
          style={{
            fontFamily: "var(--font-cormorant), Georgia, serif",
            fontSize: "clamp(42px, 6vw, 82px)",
            color: "#1C1916",
            letterSpacing: "-0.02em",
          }}
        >
          What's the best investment
          <br />
          <em>you can make on your property?</em>
        </h2>

        <p
          className="text-base mb-12 max-w-lg leading-relaxed"
          style={{
            color: "rgba(12,10,8,0.45)",
            fontFamily: "var(--font-dm-sans), sans-serif",
          }}
        >
          Enter any Southern California address. We analyze every improvement
          opportunity and rank each by ROI for your specific property — before
          you spend a dollar.
        </p>

        {/* Search bar */}
        <div className="relative max-w-2xl">
          <div
            className="flex items-center rounded-sm transition-all duration-200"
            style={{
              background: "#fff",
              border: focused
                ? "1.5px solid rgba(156,128,96,0.6)"
                : "1.5px solid rgba(12,10,8,0.14)",
              boxShadow: focused
                ? "0 0 0 4px rgba(156,128,96,0.08), 0 12px 40px rgba(0,0,0,0.10)"
                : "0 4px 20px rgba(0,0,0,0.07)",
            }}
          >
            <div className="pl-5 pr-2">
              <MapPin
                size={17}
                style={{
                  color: focused ? "#9C8060" : "rgba(12,10,8,0.28)",
                  transition: "color 0.2s",
                }}
              />
            </div>
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => handleInput(e.target.value)}
              onFocus={() => setFocused(true)}
              onBlur={() => setTimeout(() => setFocused(false), 150)}
              onKeyDown={(e) => e.key === "Enter" && submit()}
              placeholder="Enter your property address..."
              className="flex-1 py-4 px-2 text-sm bg-transparent outline-none"
              style={{
                color: "#1C1916",
                caretColor: "#9C8060",
                fontFamily: "var(--font-dm-sans), sans-serif",
              }}
            />
            <button
              onClick={() => submit()}
              className="m-2 px-5 py-2.5 rounded-sm flex items-center gap-2 text-xs font-semibold uppercase transition-all duration-150 flex-shrink-0"
              style={{
                background: "#1C1916",
                color: "#FAF8F4",
                letterSpacing: "0.10em",
                fontFamily: "var(--font-dm-sans), sans-serif",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#272320")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "#1C1916")}
            >
              Analyze
              <ArrowRight size={13} />
            </button>
          </div>

          {/* Dropdown */}
          {showDrop && (
            <div
              className="absolute top-full left-0 right-0 mt-1.5 rounded-sm overflow-hidden z-10"
              style={{
                background: "#fff",
                border: "1.5px solid rgba(12,10,8,0.1)",
                boxShadow: "0 20px 60px rgba(0,0,0,0.12)",
              }}
            >
              {query.length === 0 ? (
                <div className="p-4">
                  <p
                    className="text-xs uppercase mb-3"
                    style={{
                      color: "rgba(12,10,8,0.3)",
                      letterSpacing: "0.16em",
                      fontFamily: "var(--font-dm-sans), sans-serif",
                    }}
                  >
                    Try an example
                  </p>
                  {EXAMPLES.slice(0, 3).map((s) => (
                    <button
                      key={s}
                      onMouseDown={() => submit(s)}
                      className="w-full text-left px-3 py-2.5 flex items-center gap-3 text-sm rounded-sm transition-colors"
                      style={{ color: "rgba(12,10,8,0.65)", fontFamily: "var(--font-dm-sans), sans-serif" }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.08)")}
                      onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                    >
                      <Search size={12} style={{ color: "rgba(12,10,8,0.25)", flexShrink: 0 }} />
                      {s}
                    </button>
                  ))}
                </div>
              ) : (
                <div className="py-2">
                  {suggestions.map((s) => (
                    <button
                      key={s}
                      onMouseDown={() => submit(s)}
                      className="w-full text-left px-4 py-3 flex items-center gap-3 text-sm transition-colors"
                      style={{ color: "rgba(12,10,8,0.7)", fontFamily: "var(--font-dm-sans), sans-serif" }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.07)")}
                      onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                    >
                      <MapPin size={12} style={{ color: "#9C8060", flexShrink: 0 }} />
                      {s}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        <p
          className="mt-4 text-xs"
          style={{
            color: "rgba(12,10,8,0.25)",
            letterSpacing: "0.08em",
            fontFamily: "var(--font-dm-sans), sans-serif",
          }}
        >
          Free analysis · No account required · Southern California
        </p>
      </div>
    </section>
  );
}
