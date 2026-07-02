"use client";

import { useEffect, useState } from "react";

/** True only after the component has hydrated on the client. */
export function useMounted(): boolean {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted;
}

/** Reactive media-query hook (SSR-safe: defaults to `false`). */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia(query);
    const update = () => setMatches(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, [query]);
  return matches;
}

/** Respect the user's motion preference. */
export function useReducedMotion(): boolean {
  return useMediaQuery("(prefers-reduced-motion: reduce)");
}

/** Coarse breakpoint used to simplify heavy 3D scenes on phones. */
export function useIsMobile(): boolean {
  return useMediaQuery("(max-width: 820px)");
}

/** Coarse pointer (touch) — used to drop pointer-parallax affordances. */
export function useIsCoarsePointer(): boolean {
  return useMediaQuery("(pointer: coarse)");
}
