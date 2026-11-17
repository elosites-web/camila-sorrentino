export interface HeroVisibilityMetrics {
  heroBottom: number;
  headerBottom: number;
}

/**
 * Displays the floating WhatsApp button only after the Hero section (#inicio)
 * has scrolled past the header zone, so it never appears over or alongside the Hero.
 */
export function shouldShowWhatsAppFloat({
  heroBottom,
  headerBottom,
}: HeroVisibilityMetrics): boolean {
  const clearanceBoundary = Math.max(headerBottom, 80) + 1;
  return heroBottom <= clearanceBoundary;
}
