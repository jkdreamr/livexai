import { cn } from "@/lib/cn";

/**
 * Editorial section marker: a monospace index + label with a leading tick.
 * The instrument-panel register that ties the whole map together.
 */
export function SectionLabel({
  index,
  children,
  className,
  accent,
}: {
  index?: string;
  children: React.ReactNode;
  className?: string;
  accent?: "college" | "standard";
}) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <span
        aria-hidden
        className={cn(
          "h-px w-6",
          accent === "college"
            ? "bg-college/60"
            : accent === "standard"
              ? "bg-standard/60"
              : "bg-line-strong"
        )}
      />
      {index && <span className="label-tight text-ink-faint">{index}</span>}
      <span className="label text-ink-dim">{children}</span>
    </div>
  );
}
