"use client";

import { useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { cn } from "@/lib/cn";
import { useIsCoarsePointer, useMounted, useReducedMotion } from "@/lib/hooks";

const NAV = [
  { href: "/college", label: "College" },
  { href: "/standard", label: "Standard" },
  { href: "/docs", label: "Docs" },
];

/**
 * A magnifying dock nav - items swell and lift as the pointer nears (macOS
 * dock physics, framer springs). Falls back to a plain row on touch / reduced
 * motion. The active item keeps a sliding pill.
 */
export function DockNav() {
  const pathname = usePathname();
  const mouseX = useMotionValue(Infinity);
  const coarse = useIsCoarsePointer();
  const reduced = useReducedMotion();
  const mounted = useMounted();
  const live = mounted && !coarse && !reduced;

  return (
    <nav
      aria-label="Primary"
      onMouseMove={(e) => live && mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className="flex items-end gap-1 rounded-full border border-line bg-white/[0.03] px-1.5 py-1 backdrop-blur-md"
    >
      {NAV.map((item) => {
        const active =
          pathname === item.href || pathname.startsWith(item.href + "/");
        return (
          <DockItem
            key={item.href}
            href={item.href}
            label={item.label}
            active={active}
            mouseX={mouseX}
            live={live}
          />
        );
      })}
    </nav>
  );
}

function DockItem({
  href,
  label,
  active,
  mouseX,
  live,
}: {
  href: string;
  label: string;
  active: boolean;
  mouseX: MotionValue<number>;
  live: boolean;
}) {
  const ref = useRef<HTMLAnchorElement>(null);

  const distance = useTransform(mouseX, (val) => {
    const b = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - b.x - b.width / 2;
  });
  const scaleRaw = useTransform(distance, [-110, 0, 110], [1, 1.34, 1]);
  const liftRaw = useTransform(distance, [-110, 0, 110], [0, -5, 0]);
  const scale = useSpring(scaleRaw, { stiffness: 320, damping: 22, mass: 0.4 });
  const lift = useSpring(liftRaw, { stiffness: 320, damping: 22, mass: 0.4 });

  return (
    <Link
      ref={ref}
      href={href}
      aria-current={active ? "page" : undefined}
      className="cursor-target relative px-3 py-1.5 sm:px-3.5"
    >
      {active && (
        <motion.span
          layoutId="dock-active"
          aria-hidden
          className="absolute inset-0 rounded-full border border-line-strong bg-white/[0.06]"
          transition={{ type: "spring", stiffness: 380, damping: 30 }}
        />
      )}
      <motion.span
        style={live ? { scale, y: lift } : undefined}
        className={cn(
          "relative block origin-bottom label-tight transition-colors duration-300",
          active ? "text-ink" : "text-ink-dim hover:text-ink-soft"
        )}
      >
        {label}
      </motion.span>
    </Link>
  );
}
