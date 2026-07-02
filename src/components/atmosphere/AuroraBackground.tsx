"use client";

import { motion } from "framer-motion";
import { useMounted, useReducedMotion } from "@/lib/hooks";

/**
 * College background — a slow flowing aurora (rotating conic sweep + drifting
 * glow), cyan-mint. Deliberately different from the landing's liquid metal.
 * Static under reduced motion.
 */
export function AuroraBackground() {
  const reduced = useReducedMotion();
  const mounted = useMounted();
  const on = mounted && !reduced;

  return (
    <div aria-hidden className="absolute inset-0 overflow-hidden">
      <motion.div
        className="absolute left-1/2 top-1/2 h-[160%] w-[160%] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-[0.45] blur-[120px]"
        style={{
          background:
            "conic-gradient(from 0deg, rgba(127,234,209,0.28), transparent 28%, rgba(33,195,154,0.22) 55%, transparent 78%, rgba(127,234,209,0.28))",
        }}
        animate={on ? { rotate: 360 } : undefined}
        transition={{ duration: 46, ease: "linear", repeat: Infinity }}
      />
      <motion.div
        className="absolute h-[55vh] w-[55vh] rounded-full opacity-[0.35] blur-[110px]"
        style={{ background: "radial-gradient(circle, rgba(127,234,209,0.5), transparent 70%)", left: "12%", top: "20%" }}
        animate={on ? { x: [0, 60, -20, 0], y: [0, 40, 10, 0] } : undefined}
        transition={{ duration: 24, ease: "easeInOut", repeat: Infinity }}
      />
      <motion.div
        className="absolute right-[10%] top-[35%] h-[45vh] w-[45vh] rounded-full opacity-[0.28] blur-[110px]"
        style={{ background: "radial-gradient(circle, rgba(45,212,168,0.5), transparent 70%)" }}
        animate={on ? { x: [0, -50, 20, 0], y: [0, -30, 20, 0] } : undefined}
        transition={{ duration: 30, ease: "easeInOut", repeat: Infinity }}
      />
      {/* veil back toward the void so it stays restrained */}
      <div className="absolute inset-0 [background:radial-gradient(120%_100%_at_50%_45%,transparent_25%,rgba(7,8,11,0.7)_70%,var(--color-void))]" />
    </div>
  );
}
