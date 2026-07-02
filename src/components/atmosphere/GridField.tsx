"use client";

import { motion } from "framer-motion";
import { useMounted, useReducedMotion } from "@/lib/hooks";

/**
 * Standard background - an architectural amber grid with a slow drifting light
 * and a receding horizon line. Structured and still, distinct from College's
 * flowing aurora and the landing's liquid metal. Static under reduced motion.
 */
export function GridField() {
  const reduced = useReducedMotion();
  const mounted = useMounted();
  const on = mounted && !reduced;

  return (
    <div aria-hidden className="absolute inset-0 overflow-hidden">
      {/* the grid */}
      <div
        className="absolute inset-0 opacity-[0.55]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(234,173,120,0.07) 1px, transparent 1px), linear-gradient(to bottom, rgba(234,173,120,0.07) 1px, transparent 1px)",
          backgroundSize: "58px 58px",
          maskImage:
            "radial-gradient(120% 100% at 50% 40%, black 30%, transparent 78%)",
          WebkitMaskImage:
            "radial-gradient(120% 100% at 50% 40%, black 30%, transparent 78%)",
        }}
      />
      {/* horizon */}
      <div className="absolute left-0 right-0 top-1/2 h-px bg-standard/20" />
      {/* drifting light that warms the grid where it passes */}
      <motion.div
        className="absolute h-[60vh] w-[60vh] rounded-full opacity-[0.3] blur-[120px]"
        style={{ background: "radial-gradient(circle, rgba(234,173,120,0.45), transparent 70%)", left: "20%", top: "22%" }}
        animate={on ? { x: [0, 220, 40, 0], y: [0, 30, 90, 0] } : undefined}
        transition={{ duration: 34, ease: "easeInOut", repeat: Infinity }}
      />
      <div className="absolute inset-0 [background:radial-gradient(120%_100%_at_50%_45%,transparent_30%,rgba(7,8,11,0.6)_72%,var(--color-void))]" />
    </div>
  );
}
