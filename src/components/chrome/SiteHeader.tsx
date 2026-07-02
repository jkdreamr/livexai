"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";
import { DockNav } from "./DockNav";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,backdrop-filter,border-color] duration-500",
        scrolled
          ? "border-b border-line bg-void/60 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      )}
    >
      <div className="container-x flex h-16 items-center justify-between">
        <Link
          href="/"
          className="cursor-target group flex items-baseline gap-2"
          aria-label="LiveX — home"
        >
          <span className="font-display text-[1.35rem] leading-none tracking-tight text-ink transition-opacity group-hover:opacity-80">
            LiveX
          </span>
        </Link>

        <DockNav />
      </div>
    </header>
  );
}
