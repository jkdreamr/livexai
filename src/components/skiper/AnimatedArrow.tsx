"use client";

import { cn } from "@/lib/cn";

/**
 * Animated arrow (adapted from Skiper UI). A chevron that nudges right and
 * grows a tail into a full arrow on `group-hover`. Parent must have `group`.
 */
export function AnimatedArrow({ className }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={cn("relative grid items-center justify-center", className)}
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="transition-transform duration-500 ease-out group-hover:translate-x-1"
      >
        <path d="m9 18 6-6-6-6" />
      </svg>
      <span className="absolute right-[9px] h-[1.5px] w-3 origin-right scale-x-0 rounded-[1px] bg-current transition-all duration-300 ease-out group-hover:right-[6px] group-hover:scale-x-100" />
    </span>
  );
}
