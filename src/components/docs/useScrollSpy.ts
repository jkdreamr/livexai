"use client";

import { useEffect, useState } from "react";

/**
 * Keeps track of which section is currently in view. Uses a single
 * IntersectionObserver over all anchors and picks the topmost visible one, so
 * the active nav item stays in sync as the reader scrolls the document.
 */
export function useScrollSpy(ids: string[]): string | null {
  const [activeId, setActiveId] = useState<string | null>(ids[0] ?? null);

  useEffect(() => {
    if (ids.length === 0) return;

    const visible = new Map<string, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            visible.set(entry.target.id, entry.boundingClientRect.top);
          } else {
            visible.delete(entry.target.id);
          }
        }

        if (visible.size > 0) {
          // Topmost visible section wins.
          const [topId] = [...visible.entries()].sort((a, b) => a[1] - b[1])[0];
          setActiveId(topId);
        }
      },
      {
        // A band near the top of the viewport so a section becomes "active"
        // once its heading has scrolled up to the reading zone.
        rootMargin: "-12% 0px -70% 0px",
        threshold: 0,
      }
    );

    const nodes = ids
      .map((id) => document.getElementById(id))
      .filter((n): n is HTMLElement => Boolean(n));

    nodes.forEach((node) => observer.observe(node));

    return () => observer.disconnect();
  }, [ids]);

  return activeId;
}
