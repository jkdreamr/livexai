import { cn } from "@/lib/cn";
import type { Status } from "@/data/types";

/**
 * Readiness label. Rendered verbatim so a concept never reads as a committed
 * partnership. The dot is a quiet intensity cue — brighter for the flagship
 * activation, dimmer for early exploration — never a ranking ladder.
 */
const DOT: Record<Status, string> = {
  "Concept activation": "bg-ink",
  "Pilot hypothesis": "bg-ink-soft",
  Concept: "bg-ink-dim",
  Exploration: "bg-ink-dim",
};

export function StatusTag({
  status,
  className,
  tone = "default",
}: {
  status: Status;
  className?: string;
  tone?: "default" | "bare";
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 label-tight text-ink-soft",
        tone === "default" &&
          "rounded-full border border-line-strong bg-white/[0.03] px-3 py-1.5 backdrop-blur-sm",
        className
      )}
    >
      <span
        aria-hidden
        className={cn(
          "size-1.5 rounded-full",
          DOT[status],
          status === "Concept activation" && "shadow-[0_0_8px_rgba(236,238,243,0.8)]"
        )}
      />
      {status}
    </span>
  );
}
