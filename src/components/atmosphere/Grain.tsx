/**
 * Fixed film-grain overlay. Static (never animated) and extremely low
 * opacity - it adds tactile texture to the near-black base without touching
 * contrast or performance. Blends as soft-light so it only lifts the shadows.
 */
const NOISE =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.82' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E";

export function Grain() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[70]"
      style={{
        backgroundImage: `url("${NOISE}")`,
        backgroundSize: "160px 160px",
        opacity: 0.04,
        mixBlendMode: "soft-light",
      }}
    />
  );
}
