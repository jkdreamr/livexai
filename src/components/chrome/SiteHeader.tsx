"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";

const NAV = [
  { href: "/college", label: "College" },
  { href: "/standard", label: "Standard" },
  { href: "/system", label: "System" },
];

export function SiteHeader() {
  const pathname = usePathname();
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
          ? "border-b border-line bg-void/70 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      )}
    >
      <div className="container-x flex h-16 items-center justify-between">
        <Link
          href="/"
          className="cursor-target group flex items-baseline gap-2"
          aria-label="LiveX Surface Map — home"
        >
          <span className="font-display text-[1.35rem] leading-none tracking-tight text-ink transition-opacity group-hover:opacity-80">
            LiveX
          </span>
          <span className="label-tight text-ink-dim transition-colors group-hover:text-ink-soft">
            / Surface&nbsp;Map
          </span>
        </Link>

        <nav aria-label="Primary" className="flex items-center gap-0.5">
          {NAV.map((item) => {
            const active =
              pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "cursor-target relative rounded-full px-3 py-1.5 label-tight transition-colors duration-300 sm:px-4",
                  active ? "text-ink" : "text-ink-dim hover:text-ink-soft"
                )}
              >
                {active && (
                  <span
                    aria-hidden
                    className="absolute inset-0 rounded-full border border-line-strong bg-white/5"
                  />
                )}
                <span className="relative">{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
