import { accentClasses, THEME } from "./theme";
import type { VisualTheme } from "@/data/types";

/**
 * A quiet, procedural hero backdrop that varies by motif so detail pages
 * stay in one system without feeling templated. Static SVG + layered radial
 * light — no animation, no noise, restrained accent only.
 */
const SCATTER = [
  [12, 24],
  [28, 62],
  [41, 18],
  [55, 44],
  [63, 78],
  [72, 30],
  [84, 58],
  [90, 22],
  [18, 82],
  [48, 88],
  [78, 84],
  [34, 40],
];

const LINKS: [number, number][] = [
  [0, 3],
  [2, 3],
  [3, 5],
  [5, 6],
  [1, 8],
  [3, 11],
  [6, 7],
  [4, 9],
];

function primitiveFor(motif: string): "scatter" | "rings" | "grid" | "rays" | "ticks" {
  switch (motif) {
    case "orbit":
      return "rings";
    case "lab":
    case "concourse":
      return "grid";
    case "arena":
    case "stage":
      return "rays";
    case "sprint":
      return "ticks";
    default:
      return "scatter";
  }
}

export function StrategyBackdrop({ theme }: { theme: VisualTheme }) {
  const { accent, motif } = THEME[theme];
  const a = accentClasses(accent);
  const stroke = a.stroke;
  const primitive = primitiveFor(motif);

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Accent light wash */}
      <div
        className="absolute -top-1/3 right-[-10%] h-[70vh] w-[70vh] rounded-full opacity-[0.14] blur-[110px]"
        style={{ background: stroke }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-void/0 via-void/40 to-void" />

      {/* Motif */}
      <svg
        className="absolute inset-0 h-full w-full opacity-[0.5]"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid slice"
      >
        {primitive === "scatter" && (
          <g stroke={stroke} strokeWidth="0.12" fill={stroke}>
            {LINKS.map(([i, j], k) => (
              <line
                key={k}
                x1={SCATTER[i][0]}
                y1={SCATTER[i][1]}
                x2={SCATTER[j][0]}
                y2={SCATTER[j][1]}
                opacity="0.28"
              />
            ))}
            {SCATTER.map(([x, y], i) => (
              <circle key={i} cx={x} cy={y} r={i % 4 === 0 ? 0.7 : 0.4} opacity="0.6" />
            ))}
          </g>
        )}

        {primitive === "rings" &&
          [10, 20, 30, 42].map((r, i) => (
            <circle
              key={i}
              cx="72"
              cy="42"
              r={r}
              fill="none"
              stroke={stroke}
              strokeWidth="0.15"
              opacity={0.4 - i * 0.06}
            />
          ))}

        {primitive === "grid" && (
          <g stroke={stroke} strokeWidth="0.1" opacity="0.35">
            {Array.from({ length: 11 }).map((_, i) => (
              <line key={`v${i}`} x1={i * 10} y1="0" x2={i * 10} y2="100" />
            ))}
            {Array.from({ length: 11 }).map((_, i) => (
              <line key={`h${i}`} x1="0" y1={i * 10} x2="100" y2={i * 10} />
            ))}
          </g>
        )}

        {primitive === "rays" && (
          <g stroke={stroke} strokeWidth="0.14" opacity="0.4">
            {Array.from({ length: 14 }).map((_, i) => {
              const angle = (i / 14) * Math.PI - Math.PI / 2;
              return (
                <line
                  key={i}
                  x1="50"
                  y1="108"
                  x2={50 + Math.cos(angle) * 90}
                  y2={108 + Math.sin(angle) * 90}
                />
              );
            })}
          </g>
        )}

        {primitive === "ticks" && (
          <g stroke={stroke} strokeWidth="0.16" opacity="0.4">
            <line x1="6" y1="50" x2="94" y2="50" strokeWidth="0.12" opacity="0.5" />
            {Array.from({ length: 9 }).map((_, i) => (
              <line key={i} x1={10 + i * 10} y1="46" x2={10 + i * 10} y2="54" />
            ))}
          </g>
        )}
      </svg>
    </div>
  );
}
