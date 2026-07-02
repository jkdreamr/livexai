"use client";

import { motion } from "framer-motion";
import { useReducedMotion } from "@/lib/hooks";

export type RoomId = "stage" | "checkin" | "wsA" | "sponsor" | "wsB" | "dining";

const ROOMS: { id: RoomId; name: string; x: number; y: number; w: number; h: number }[] = [
  { id: "stage", name: "Main Stage", x: 24, y: 22, w: 118, h: 58 },
  { id: "checkin", name: "Check-in", x: 158, y: 22, w: 78, h: 40 },
  { id: "wsA", name: "Workshop A", x: 256, y: 22, w: 80, h: 52 },
  { id: "sponsor", name: "Sponsor Bay", x: 24, y: 104, w: 104, h: 72 },
  { id: "wsB", name: "Workshop B", x: 146, y: 116, w: 78, h: 52 },
  { id: "dining", name: "Dining", x: 248, y: 104, w: 88, h: 72 },
];
const YOU = { x: 184, y: 192 };

const center = (id: RoomId) => {
  const r = ROOMS.find((x) => x.id === id)!;
  return { x: r.x + r.w / 2, y: r.y + r.h / 2 };
};

/** A projected, tilted floor plan. The route to the chosen room draws itself in. */
export function HoloMap({ target }: { target: RoomId | null }) {
  const reduced = useReducedMotion();
  const t = target ? center(target) : null;
  const routeD = t ? `M ${YOU.x} ${YOU.y} L ${t.x} ${YOU.y} L ${t.x} ${t.y}` : "";

  return (
    <div className="relative flex h-full w-full items-center justify-center" style={{ perspective: 900 }}>
      <div
        aria-hidden
        className="absolute inset-x-6 bottom-6 top-8 rounded-2xl"
        style={{ background: "radial-gradient(120% 80% at 50% 100%, rgba(47,128,255,0.14), transparent 70%)" }}
      />
      <div style={{ transform: "rotateX(46deg) rotateZ(0deg)", transformStyle: "preserve-3d" }} className="w-full max-w-md">
        <svg viewBox="0 0 360 214" className="w-full drop-shadow-[0_0_20px_rgba(47,128,255,0.25)]" aria-label="Venue map">
          {/* floor grid */}
          <g stroke="rgba(47,128,255,0.16)" strokeWidth="0.5">
            {Array.from({ length: 10 }).map((_, i) => (
              <line key={`v${i}`} x1={i * 40} y1="0" x2={i * 40} y2="214" />
            ))}
            {Array.from({ length: 6 }).map((_, i) => (
              <line key={`h${i}`} x1="0" y1={i * 40} x2="360" y2={i * 40} />
            ))}
          </g>

          {/* rooms */}
          {ROOMS.map((r) => {
            const on = target === r.id;
            return (
              <g key={r.id}>
                <rect x={r.x} y={r.y + 4} width={r.w} height={r.h} rx="4" fill="rgba(47,128,255,0.08)" />
                <rect
                  x={r.x}
                  y={r.y}
                  width={r.w}
                  height={r.h}
                  rx="4"
                  fill={on ? "rgba(47,128,255,0.2)" : "rgba(10,16,28,0.6)"}
                  stroke={on ? "#7fead1" : "rgba(120,170,255,0.5)"}
                  strokeWidth={on ? "1.6" : "0.8"}
                />
                <text x={r.x + r.w / 2} y={r.y + r.h / 2 + 3} textAnchor="middle" fontSize="9" fill={on ? "#cdeafd" : "rgba(180,205,240,0.75)"} className="font-mono">
                  {r.name}
                </text>
              </g>
            );
          })}

          {/* route */}
          {t && (
            <motion.path
              d={routeD}
              fill="none"
              stroke="#7fead1"
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray="4 5"
              initial={reduced ? undefined : { pathLength: 0 }}
              animate={reduced ? undefined : { pathLength: 1 }}
              transition={{ duration: 0.9, ease: "easeOut" }}
              style={{ filter: "drop-shadow(0 0 4px #7fead1)" }}
            />
          )}

          {/* you are here */}
          <circle cx={YOU.x} cy={YOU.y} r="5" fill="#2f80ff" />
          <motion.circle
            cx={YOU.x}
            cy={YOU.y}
            r="5"
            fill="none"
            stroke="#2f80ff"
            strokeWidth="1.5"
            initial={reduced ? undefined : { scale: 1, opacity: 0.8 }}
            animate={reduced ? undefined : { scale: 2.6, opacity: 0 }}
            transition={{ duration: 1.8, ease: "easeOut", repeat: Infinity }}
            style={{ transformOrigin: `${YOU.x}px ${YOU.y}px` }}
          />

          {/* target pin */}
          {t && (
            <g>
              <line x1={t.x} y1={t.y} x2={t.x} y2={t.y - 22} stroke="#7fead1" strokeWidth="1.4" />
              <circle cx={t.x} cy={t.y - 24} r="4" fill="#7fead1" style={{ filter: "drop-shadow(0 0 6px #7fead1)" }} />
            </g>
          )}
        </svg>
      </div>
    </div>
  );
}
