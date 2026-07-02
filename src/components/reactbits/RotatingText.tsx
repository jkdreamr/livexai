"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, type Transition } from "framer-motion";
import { cn } from "@/lib/cn";
import { useReducedMotion } from "@/lib/hooks";

/**
 * Vendored from React Bits (RotatingText). Cycles a list of strings, animating
 * per-character in/out with a stagger. Reduced motion shows the first word.
 */
export function RotatingText({
  texts,
  rotationInterval = 2200,
  staggerDuration = 0.025,
  staggerFrom = "last",
  transition = { type: "spring", damping: 30, stiffness: 400 },
  initial = { y: "100%" },
  animate = { y: 0 },
  exit = { y: "-120%" },
  splitBy = "characters",
  mainClassName,
  splitLevelClassName,
  loop = true,
  auto = true,
}: {
  texts: string[];
  rotationInterval?: number;
  staggerDuration?: number;
  staggerFrom?: "first" | "last" | "center";
  transition?: Transition;
  initial?: Record<string, string | number>;
  animate?: Record<string, string | number>;
  exit?: Record<string, string | number>;
  splitBy?: "characters" | "words";
  mainClassName?: string;
  splitLevelClassName?: string;
  loop?: boolean;
  auto?: boolean;
}) {
  const reduced = useReducedMotion();
  const [index, setIndex] = useState(0);
  const current = texts[index % texts.length];

  const elements = useMemo(() => {
    if (splitBy === "words") return current.split(" ");
    return current.split("").map((c) => (c === " " ? " " : c));
  }, [current, splitBy]);

  const total = elements.length;
  const getDelay = useCallback(
    (i: number) => {
      if (staggerFrom === "last") return (total - 1 - i) * staggerDuration;
      if (staggerFrom === "center")
        return Math.abs(Math.floor(total / 2) - i) * staggerDuration;
      return i * staggerDuration;
    },
    [total, staggerFrom, staggerDuration]
  );

  useEffect(() => {
    if (!auto || reduced) return;
    const id = setInterval(
      () =>
        setIndex((p) =>
          loop ? (p + 1) % texts.length : Math.min(p + 1, texts.length - 1)
        ),
      rotationInterval
    );
    return () => clearInterval(id);
  }, [auto, reduced, loop, rotationInterval, texts.length]);

  if (reduced) {
    return <span className={mainClassName}>{texts[0]}</span>;
  }

  return (
    <span className={cn("inline-flex", mainClassName)}>
      <span className="sr-only">{current}</span>
      <AnimatePresence mode="wait" initial={false}>
        <motion.span key={index} aria-hidden className="inline-flex">
          {elements.map((el, i) => (
            <span
              key={i}
              className={cn("inline-block overflow-hidden", splitLevelClassName)}
            >
              <motion.span
                className="inline-block"
                initial={initial}
                animate={animate}
                exit={exit}
                transition={{ ...transition, delay: getDelay(i) }}
              >
                {el}
              </motion.span>
            </span>
          ))}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
