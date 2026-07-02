import { cn } from "@/lib/cn";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import type { Accent } from "./theme";

/** Consistent editorial section rhythm for detail pages. */
export function Section({
  index,
  label,
  title,
  intro,
  accent,
  children,
  className,
  bleed = false,
}: {
  index?: string;
  label: string;
  title?: string;
  intro?: string;
  accent?: Accent;
  children?: React.ReactNode;
  className?: string;
  /** Full-bleed (no reading max-width on the header). */
  bleed?: boolean;
}) {
  return (
    <section className={cn("container-x py-20 sm:py-28", className)}>
      <Reveal>
        <SectionLabel index={index} accent={accent}>
          {label}
        </SectionLabel>
        {title && (
          <h2
            className={cn(
              "text-display fluid-h2 mt-6 text-balance",
              !bleed && "max-w-3xl"
            )}
          >
            {title}
          </h2>
        )}
        {intro && (
          <p className="body-measure mt-6 max-w-2xl text-ink-soft">{intro}</p>
        )}
      </Reveal>
      {children && <div className="mt-12">{children}</div>}
    </section>
  );
}
