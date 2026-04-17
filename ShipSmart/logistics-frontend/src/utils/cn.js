/**
 * Tiny className merger — avoids installing clsx/tailwind-merge
 * as a dependency just for this.
 */
export function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}
