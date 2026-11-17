export const NAV_SECTION_IDS = [
  'servicos',
  'trabalhos',
  'sobre',
  'formacao',
  'duvidas',
  'contato',
] as const;

export type NavSectionId = (typeof NAV_SECTION_IDS)[number];

export const HERO_ANCHOR_ID = 'inicio';

export interface SectionPosition {
  id: NavSectionId;
  /** Element's current getBoundingClientRect().top relative to the viewport. */
  top: number;
}

export interface AnchorScrollCalculationInput {
  sectionTopInViewport: number;
  currentScrollY: number;
  headerHeight: number;
  documentScrollHeight: number;
  viewportHeight: number;
}

export interface ActiveSectionMetrics {
  headerHeight: number;
  scrollY: number;
  viewportHeight: number;
  scrollHeight: number;
  /** Small pixel tolerance below header bottom so exact alignment counts as active. */
  activationTolerance?: number;
}

export function normalizeAnchorId(hashOrHref: string | null | undefined): string | null {
  if (!hashOrHref) {
    return null;
  }
  const trimmed = hashOrHref.trim();
  const hashIndex = trimmed.indexOf('#');
  const rawId = hashIndex >= 0 ? trimmed.slice(hashIndex + 1) : trimmed;
  if (!rawId) {
    return null;
  }
  try {
    return decodeURIComponent(rawId);
  } catch {
    return rawId;
  }
}

export function isNavSectionId(id: string | null | undefined): id is NavSectionId {
  if (!id) {
    return false;
  }
  return (NAV_SECTION_IDS as readonly string[]).includes(id);
}

/**
 * Computes the exact window.scrollY needed so a section's top edge aligns
 * flush with the lower edge of the fixed/sticky header, clamped to valid
 * document bounds.
 */
export function calculateAnchorScrollTop({
  sectionTopInViewport,
  currentScrollY,
  headerHeight,
  documentScrollHeight,
  viewportHeight,
}: AnchorScrollCalculationInput): number {
  const safeHeaderHeight = Math.max(0, headerHeight);
  const sectionTopInDocument = sectionTopInViewport + currentScrollY;
  const rawTargetTop = Math.round(sectionTopInDocument - safeHeaderHeight);
  const maxScrollY = Math.max(0, Math.round(documentScrollHeight - viewportHeight));

  return Math.min(Math.max(0, rawTargetTop), maxScrollY);
}

/**
 * Determines which navigation section currently owns the reading line
 * immediately below the header.
 *
 * Rules:
 * - While the user is above the first navigation section (e.g. viewing Hero),
 *   returns null so no menu section is prematurely selected.
 * - Otherwise picks the last navigation section in document order whose top
 *   edge has reached or passed (headerHeight + activationTolerance).
 * - When scrolled to the very bottom of the page on tall viewports where the
 *   final section (#contato) cannot scroll all the way up to headerHeight,
 *   returns the final visible navigation section so "Contato" still activates.
 */
export function resolveActiveSectionId(
  sections: readonly SectionPosition[],
  {
    headerHeight,
    scrollY,
    viewportHeight,
    scrollHeight,
    activationTolerance = 16,
  }: ActiveSectionMetrics,
): NavSectionId | null {
  if (sections.length === 0) {
    return null;
  }

  const safeHeaderHeight = Math.max(0, headerHeight);
  const activationLine = safeHeaderHeight + Math.max(0, activationTolerance);

  let activeId: NavSectionId | null = null;
  for (const section of sections) {
    if (section.top <= activationLine) {
      activeId = section.id;
    }
  }

  const maxScrollY = Math.max(0, scrollHeight - viewportHeight);
  const isAtPageBottom = maxScrollY > 0 && scrollY >= maxScrollY - 12;

  if (isAtPageBottom) {
    const lastSection = sections[sections.length - 1];
    const availableHeight = Math.max(0, viewportHeight - safeHeaderHeight);
    if (lastSection && lastSection.top < safeHeaderHeight + availableHeight * 0.75) {
      return lastSection.id;
    }
  }

  return activeId;
}

export function buildUrlForSection(
  pathname: string,
  search: string,
  sectionId: string | null,
): string {
  const base = `${pathname}${search}`;
  return sectionId ? `${base}#${sectionId}` : base;
}

export function getMeasuredHeaderHeight(headerElement: HTMLElement | null): number {
  if (!headerElement) {
    return 0;
  }
  return headerElement.getBoundingClientRect().height;
}

export function isDocumentScrollLocked(): boolean {
  if (typeof document === 'undefined') {
    return false;
  }
  return document.body.style.position === 'fixed';
}
