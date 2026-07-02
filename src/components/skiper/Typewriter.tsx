"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";
import { useReducedMotion } from "@/lib/hooks";

/**
 * Typewriter (adapted from Skiper UI). Types through a list of strings, deleting
 * and cycling. Reduced motion shows the first line statically.
 */
export function Typewriter({
  texts,
  baseText = "",
  typingSpeed = 55,
  deletingSpeed = 28,
  pause = 1500,
  loop = true,
  className,
}: {
  texts: string[];
  baseText?: string;
  typingSpeed?: number;
  deletingSpeed?: number;
  pause?: number;
  loop?: boolean;
  className?: string;
}) {
  const reduced = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [sub, setSub] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (reduced) return;
    const current = texts[index % texts.length];
    // fully typed → pause, then start deleting
    if (!deleting && sub === current.length) {
      if (!loop && index === texts.length - 1) return; // type once, keep
      const t = setTimeout(() => setDeleting(true), pause);
      return () => clearTimeout(t);
    }
    // fully deleted → advance to the next line (deferred, not synchronous)
    if (deleting && sub === 0) {
      const t = setTimeout(() => {
        setDeleting(false);
        setIndex((v) => (v + 1) % texts.length);
      }, 200);
      return () => clearTimeout(t);
    }
    const t = setTimeout(
      () => setSub((v) => v + (deleting ? -1 : 1)),
      deleting ? deletingSpeed : typingSpeed
    );
    return () => clearTimeout(t);
  }, [sub, deleting, index, texts, typingSpeed, deletingSpeed, pause, reduced, loop]);

  const current = texts[index % texts.length];
  const shown = reduced ? texts[0] : current.slice(0, sub);

  return (
    <span className={cn("inline", className)}>
      {baseText}
      {shown}
      {!reduced && (
        <span className="ml-0.5 inline-block w-[1px] animate-pulse bg-current align-middle">
          &nbsp;
        </span>
      )}
    </span>
  );
}
