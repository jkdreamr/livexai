/**
 * Minimal className joiner. Intentionally dependency-free — we keep the
 * bundle lean and our class usage disciplined enough not to need conflict
 * resolution.
 */
export function cn(
  ...parts: Array<string | false | null | undefined>
): string {
  return parts.filter(Boolean).join(" ");
}
