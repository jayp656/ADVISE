// GPU-only grain: SVG feTurbulence + CSS background-position animation.
// Zero canvas, zero RAF, zero CPU per frame.
export default function FilmGrain() {
  const svgGrain =
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.72' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23g)'/%3E%3C/svg%3E";

  return (
    <div
      aria-hidden
      style={{
        position: "fixed",
        // Oversized so the shift keyframe never reveals an edge
        inset: "-150%",
        width: "400%",
        height: "400%",
        zIndex: 9999,
        pointerEvents: "none",
        opacity: 0.055,
        mixBlendMode: "overlay",
        backgroundImage: `url("${svgGrain}")`,
        backgroundRepeat: "repeat",
        backgroundSize: "200px 200px",
        animation: "grain 0.45s steps(1) infinite",
        willChange: "transform",
      }}
    />
  );
}
