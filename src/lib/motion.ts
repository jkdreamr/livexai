import type { Variants, Transition } from "framer-motion";

/**
 * Shared motion language. Enter with expressive ease-out; exit faster than
 * enter (per motion principles). Springs are used for anything that tracks
 * a pointer or a gesture; tweens for scripted reveals.
 */

export const ease = {
  out: [0.16, 1, 0.3, 1] as const, // expo-style settle
  soft: [0.22, 1, 0.36, 1] as const,
  inOut: [0.65, 0, 0.35, 1] as const,
};

export const spring = {
  gentle: { type: "spring", stiffness: 120, damping: 22, mass: 0.9 },
  glide: { type: "spring", stiffness: 90, damping: 26, mass: 1 },
  snappy: { type: "spring", stiffness: 320, damping: 30 },
} satisfies Record<string, Transition>;

/** Staggered container for editorial reveals. */
export const stagger = (staggerChildren = 0.06, delayChildren = 0): Variants => ({
  hidden: {},
  show: {
    transition: { staggerChildren, delayChildren },
  },
});

/** A single line/element rising into place. */
export const riseIn: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: ease.out },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.7, ease: ease.out } },
};

/** Word/char reveal for hero display type (used with a clip-mask parent). */
export const maskUp: Variants = {
  hidden: { y: "110%" },
  show: (i: number = 0) => ({
    y: "0%",
    transition: { duration: 0.9, ease: ease.out, delay: 0.05 + i * 0.08 },
  }),
};

/** Viewport trigger config reused across scroll reveals. */
export const inView = {
  once: true,
  amount: 0.35,
} as const;
