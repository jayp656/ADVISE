"use client";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Search, MapPin, ArrowRight } from "lucide-react";

const SUGGESTIONS = [
  "123 Oak Street, San Diego, CA 92103",
  "4521 Mission Bay Dr, San Diego, CA 92109",
  "810 W Washington St, San Diego, CA 92103",
  "2890 Caminito Eastbluff, La Jolla, CA 92037",
  "701 Kettner Blvd, San Diego, CA 92101",
];

export default function HeroSearch() {
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleInput = (val: string) => {
    setQuery(val);
    if (val.length > 2) {
      setSuggestions(SUGGESTIONS.filter((s) => s.toLowerCase().includes(val.toLowerCase())).slice(0, 4));
    } else {
      setSuggestions([]);
    }
  };

  const handleSubmit = (address?: string) => {
    const target = address || query;
    if (!target.trim()) return;
    const slug = encodeURIComponent(target);
    router.push(`/report?address=${slug}`);
  };

  const showDropdown = focused && (suggestions.length > 0 || query.length === 0);
  const recentSearches = query.length === 0 && focused;

  return (
    <div className="relative w-full max-w-2xl">
      {/* Search bar */}
      <div
        className="relative flex items-center rounded-md overflow-hidden transition-all duration-300"
        style={{
          background: "rgba(237,232,223,0.06)",
          border: focused ? "1px solid rgba(255,255,255,0.6)" : "1px solid rgba(237,232,223,0.12)",
          boxShadow: focused ? "0 0 0 4px rgba(255,255,255,0.08), 0 20px 60px rgba(0,0,0,0.5)" : "0 8px 32px rgba(0,0,0,0.4)",
        }}
      >
        <div className="pl-5 pr-2 flex-shrink-0">
          <MapPin size={18} style={{ color: focused ? "var(--gold)" : "var(--muted)" }} className="transition-colors duration-200" />
        </div>
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => handleInput(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setTimeout(() => setFocused(false), 150)}
          onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
          placeholder="Enter your property address..."
          className="flex-1 py-4 px-2 text-sm bg-transparent outline-none placeholder:text-sm"
          style={{
            color: "var(--cream)",
            caretColor: "var(--gold)",
          }}
        />
        <button
          onClick={() => handleSubmit()}
          className="m-2 px-5 py-2.5 rounded-sm text-xs font-semibold tracking-widest uppercase flex items-center gap-2 transition-all duration-200 flex-shrink-0"
          style={{
            background: "var(--gold)",
            color: "var(--obsidian)",
            letterSpacing: "0.1em",
          }}
          onMouseEnter={(e) => ((e.currentTarget).style.background = "rgba(240,240,240,0.92)")}
          onMouseLeave={(e) => ((e.currentTarget).style.background = "var(--gold)")}
        >
          Analyze
          <ArrowRight size={13} />
        </button>
      </div>

      {/* Dropdown */}
      {showDropdown && (
        <div
          className="absolute top-full left-0 right-0 mt-2 rounded-md overflow-hidden z-10"
          style={{
            background: "#141414",
            border: "1px solid rgba(255,255,255,0.15)",
            boxShadow: "0 24px 64px rgba(0,0,0,0.7)",
          }}
        >
          {recentSearches ? (
            <div className="p-4">
              <p className="text-xs uppercase tracking-widest mb-3" style={{ color: "var(--muted)", letterSpacing: "0.14em" }}>
                Try an example
              </p>
              {SUGGESTIONS.slice(0, 3).map((s) => (
                <button
                  key={s}
                  onMouseDown={() => handleSubmit(s)}
                  className="w-full text-left px-3 py-2.5 rounded-sm flex items-center gap-3 transition-colors duration-150 text-sm"
                  style={{ color: "rgba(237,232,223,0.7)" }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.08)")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                >
                  <Search size={13} style={{ color: "var(--muted)", flexShrink: 0 }} />
                  {s}
                </button>
              ))}
            </div>
          ) : (
            <div className="py-2">
              {suggestions.map((s) => (
                <button
                  key={s}
                  onMouseDown={() => handleSubmit(s)}
                  className="w-full text-left px-4 py-3 flex items-center gap-3 transition-colors duration-150 text-sm"
                  style={{ color: "rgba(237,232,223,0.8)" }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.08)")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                >
                  <MapPin size={13} style={{ color: "var(--gold)", flexShrink: 0 }} />
                  {s}
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
