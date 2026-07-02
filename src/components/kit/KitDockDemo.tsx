"use client";

import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import {
  Compass,
  Layers,
  Map,
  Radar,
  Signal,
  Waypoints,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/cn";
import { useIsCoarsePointer, useReducedMotion } from "@/lib/hooks";

const ITEMS: { icon: LucideIcon; label: string }[] = [
  { icon: Map, label: "Map" },
  { icon: Layers, label: "Surfaces" },
  { icon: Radar, label: "Scan" },
  { icon: Signal, label: "Signals" },
  { icon: Waypoints, label: "Routes" },
  { icon: Compass, label: "Explore" },
];

const BASE = 44;
const MAX = 72;

function DockIcon({
  icon: Icon,
  label,
  mouseX,
  active,
}: {
  icon: LucideIcon;
  label: string;
  mouseX: MotionValue<number>;
  active: boolean;
}) {
  const ref = useRef<HTMLButtonElement>(null);

  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect();
    if (!bounds || !active) return Infinity;
    return val - (bounds.x + bounds.width / 2);
  });

  const sizeTarget = useTransform(distance, [-140, 0, 140], [BASE, MAX, BASE]);
  const size = useSpring(sizeTarget, {
    stiffness: 320,
    damping: 22,
    mass: 0.6,
  });

  return (
    <div className="group relative flex flex-col items-center justify-end">
      <motion.button
        ref={ref}
        type="button"
        style={{ width: size, height: size }}
        className="cursor-target grid place-items-center rounded-2xl border border-line bg-white/[0.04] text-ink-soft transition-colors hover:border-line-strong hover:text-ink"
        aria-label={label}
      >
        <Icon className="size-1/2" strokeWidth={1.6} />
      </motion.button>
      <span className="pointer-events-none absolute -top-8 whitespace-nowrap rounded-md border border-line bg-charcoal px-2 py-1 text-[11px] text-ink-soft opacity-0 transition-opacity group-hover:opacity-100">
        {label}
      </span>
    </div>
  );
}

/**
 * macOS-style magnifying dock: tiles lift + grow as the pointer nears.
 * Falls back to a static row on touch / reduced motion.
 */
export default function KitDockDemo() {
  const reduced = useReducedMotion();
  const coarse = useIsCoarsePointer();
  const active = !reduced && !coarse;
  const mouseX = useMotionValue(Infinity);

  return (
    <div className="flex min-h-[220px] w-full flex-col items-center justify-center gap-5 p-8">
      <motion.div
        onMouseMove={(e) => active && mouseX.set(e.clientX)}
        onMouseLeave={() => mouseX.set(Infinity)}
        className={cn(
          "flex items-end gap-3 rounded-[26px] border border-line bg-charcoal/80 px-4 py-3 backdrop-blur",
          "shadow-2xl shadow-black/40"
        )}
      >
        {active ? (
          ITEMS.map((item) => (
            <DockIcon
              key={item.label}
              icon={item.icon}
              label={item.label}
              mouseX={mouseX}
              active={active}
            />
          ))
        ) : (
          ITEMS.map(({ icon: Icon, label }) => (
            <button
              key={label}
              type="button"
              aria-label={label}
              style={{ width: BASE, height: BASE }}
              className="cursor-target grid place-items-center rounded-2xl border border-line bg-white/[0.04] text-ink-soft transition-colors hover:border-line-strong hover:text-ink"
            >
              <Icon className="size-1/2" strokeWidth={1.6} />
            </button>
          ))
        )}
      </motion.div>
      <span className="label-tight text-ink-dim">
        {active ? "Hover to magnify" : "Surface dock"}
      </span>
    </div>
  );
}
