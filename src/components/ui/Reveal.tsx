"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { useMounted, useReducedMotion } from "@/lib/hooks";
import { ease } from "@/lib/motion";

/**
 * Scroll-into-view reveal. Framer's JS animation is NOT caught by the global
 * reduced-motion CSS rule, so we gate it explicitly: reduced-motion (and
 * pre-hydration) render children static and visible. Used for below-the-fold
 * content only — heroes animate on their own timeline.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 24,
  once = true,
  amount = 0.3,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  once?: boolean;
  amount?: number;
}) {
  const reduced = useReducedMotion();
  const mounted = useMounted();

  if (!mounted || reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount }}
      transition={{ duration: 0.8, ease: ease.out, delay }}
    >
      {children}
    </motion.div>
  );
}
