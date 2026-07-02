import { cn } from "@/lib/cn";
import { SURFACES, type SurfaceKey } from "@/data/types";

/**
 * Custom geometric surface icons, drawn as primitives, never emoji or stock.
 * 24×24 grid, 1.5 stroke, currentColor, so they inherit ink/world accents.
 */
export function SurfaceGlyph({
  surface,
  size = 20,
  className,
}: {
  surface: SurfaceKey;
  size?: number;
  className?: string;
}) {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.5,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    className,
    "aria-hidden": true,
  };

  switch (surface) {
    case "physical":
      // A luminous presence standing in space.
      return (
        <svg {...common}>
          <circle cx="12" cy="5" r="1.6" />
          <path d="M12 7.4v7.6" />
          <ellipse cx="12" cy="18.4" rx="5.2" ry="1.4" opacity="0.55" />
        </svg>
      );
    case "qr":
      // Scan frame - the bridge moment.
      return (
        <svg {...common}>
          <path d="M5 8.5V5h3.5" />
          <path d="M15.5 5H19v3.5" />
          <path d="M5 15.5V19h3.5" />
          <path d="M19 15.5V19h-3.5" />
          <circle cx="12" cy="12" r="1.5" />
        </svg>
      );
    case "mobile":
      return (
        <svg {...common}>
          <rect x="7.5" y="3" width="9" height="18" rx="2.4" />
          <path d="M11 6h2" />
          <circle cx="12" cy="17.5" r="1" />
        </svg>
      );
    case "web":
      return (
        <svg {...common}>
          <rect x="4" y="5" width="16" height="14" rx="2.2" />
          <path d="M4 9.2h16" />
          <circle cx="7" cy="7.1" r="0.55" />
        </svg>
      );
    case "voice":
      return (
        <svg {...common}>
          <circle cx="7.5" cy="12" r="1.6" />
          <path d="M12 8.2a6 6 0 0 1 0 7.6" />
          <path d="M14.8 6a9.4 9.4 0 0 1 0 12" />
        </svg>
      );
    case "followup":
      // A return arrow - memory reappearing.
      return (
        <svg {...common}>
          <path d="M20 11a8 8 0 1 1-2.3-5.7L20 7.6" />
          <path d="M20 3.6v4h-4" />
        </svg>
      );
    case "partner":
      // One surface embedded inside another.
      return (
        <svg {...common}>
          <rect x="4" y="7.5" width="11" height="11" rx="2.2" />
          <rect x="9" y="4" width="11" height="11" rx="2.2" opacity="0.5" />
        </svg>
      );
    default:
      return null;
  }
}

/** Compact surface chip: glyph + short label. */
export function SurfaceChip({
  surface,
  primary = false,
  className,
}: {
  surface: SurfaceKey;
  primary?: boolean;
  className?: string;
}) {
  const meta = SURFACES[surface];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border px-3 py-1.5 label-tight transition-colors",
        primary
          ? "border-line-strong bg-white/[0.05] text-ink"
          : "border-line text-ink-dim",
        className
      )}
    >
      <SurfaceGlyph surface={surface} size={15} />
      {meta.short}
    </span>
  );
}
