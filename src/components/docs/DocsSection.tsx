import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import type { DocsAccent } from "./nav";

const ACCENT_TEXT: Record<DocsAccent, string> = {
  brand: "text-brand",
  college: "text-college",
  standard: "text-standard",
};

/**
 * A single document section. The `id` is the scroll anchor the nav targets;
 * `scroll-mt` keeps the heading clear of the sticky top chrome.
 */
export function DocsSection({
  id,
  eyebrow,
  title,
  accent = "brand",
  children,
}: {
  id: string;
  eyebrow?: string;
  title: string;
  accent?: DocsAccent;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      className="scroll-mt-28 border-t border-line pt-12 first:border-t-0 first:pt-0"
    >
      {eyebrow && (
        <p className={cn("label-tight mb-3", ACCENT_TEXT[accent])}>{eyebrow}</p>
      )}
      <h2 className="text-display fluid-h2 max-w-3xl text-balance text-ink">
        {title}
      </h2>
      <div className="mt-6 max-w-2xl">{children}</div>
    </section>
  );
}
