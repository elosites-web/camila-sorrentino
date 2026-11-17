import { useCallback, useEffect, useRef, useState, type RefObject } from 'react';
import {
  NAV_SECTION_IDS,
  buildUrlForSection,
  calculateAnchorScrollTop,
  getMeasuredHeaderHeight,
  getSectionAnchorExtraOffset,
  isDocumentScrollLocked,
  isNavSectionId,
  normalizeAnchorId,
  resolveActiveSectionId,
  type NavSectionId,
  type SectionPosition,
} from '../utils/anchorNavigation';

interface UseAnchorNavigationOptions {
  headerRef: RefObject<HTMLElement | null>;
  isScrollLocked: boolean;
  prefersReducedMotion: boolean;
}

interface NavigateOptions {
  behavior?: ScrollBehavior;
  updateHistory?: boolean;
}

interface ProgrammaticTarget {
  anchorId: string;
  targetTop: number;
  expiresAt: number;
}

function collectNavSectionPositions(): SectionPosition[] {
  const positions: SectionPosition[] = [];
  for (const id of NAV_SECTION_IDS) {
    const el = document.getElementById(id);
    if (el) {
      positions.push({ id, top: el.getBoundingClientRect().top });
    }
  }
  return positions;
}

export function useAnchorNavigation({
  headerRef,
  isScrollLocked,
  prefersReducedMotion,
}: UseAnchorNavigationOptions) {
  const [activeSectionId, setActiveSectionId] = useState<NavSectionId | null>(() => {
    if (typeof window === 'undefined') {
      return null;
    }
    const initialId = normalizeAnchorId(window.location.hash);
    return isNavSectionId(initialId) ? initialId : null;
  });

  const [headerHeight, setHeaderHeight] = useState<number>(65);
  const headerHeightRef = useRef<number>(65);
  const isScrollLockedRef = useRef<boolean>(isScrollLocked);
  const prefersReducedMotionRef = useRef<boolean>(prefersReducedMotion);
  const programmaticTargetRef = useRef<ProgrammaticTarget | null>(null);
  const userScrolledSinceMountRef = useRef<boolean>(false);

  isScrollLockedRef.current = isScrollLocked;
  prefersReducedMotionRef.current = prefersReducedMotion;

  const measureHeader = useCallback((): number => {
    const measured = getMeasuredHeaderHeight(headerRef.current);
    const effective = measured > 0 ? measured : headerHeightRef.current;
    headerHeightRef.current = effective;
    return effective;
  }, [headerRef]);

  const syncActiveSectionFromScroll = useCallback(
    (syncUrlHash: boolean) => {
      if (isScrollLockedRef.current || isDocumentScrollLocked()) {
        return;
      }

      const activeProgrammatic = programmaticTargetRef.current;
      if (activeProgrammatic) {
        const arrived = Math.abs(window.scrollY - activeProgrammatic.targetTop) <= 2;
        const expired = performance.now() >= activeProgrammatic.expiresAt;
        if (!arrived && !expired) {
          return;
        }
        programmaticTargetRef.current = null;
      }

      const currentHeaderHeight = measureHeader();
      const positions = collectNavSectionPositions();
      const nextActive = resolveActiveSectionId(positions, {
        headerHeight: currentHeaderHeight,
        scrollY: window.scrollY,
        viewportHeight: window.innerHeight,
        scrollHeight: document.documentElement.scrollHeight,
        sobreActivationOffset: getSectionAnchorExtraOffset('sobre', window.innerWidth),
      });

      setActiveSectionId((prev) => (prev === nextActive ? prev : nextActive));

      if (syncUrlHash) {
        const currentHashId = normalizeAnchorId(window.location.hash);
        if (nextActive === null && currentHashId === 'inicio' && window.scrollY <= 4) {
          return;
        }
        const nextUrl = buildUrlForSection(
          window.location.pathname,
          window.location.search,
          nextActive,
        );
        const currentUrl = `${window.location.pathname}${window.location.search}${window.location.hash}`;
        if (nextUrl !== currentUrl) {
          window.history.replaceState(null, '', nextUrl);
        }
      }
    },
    [measureHeader],
  );

  const navigateToHash = useCallback(
    (hashOrHref: string, options: NavigateOptions = {}) => {
      const anchorId = normalizeAnchorId(hashOrHref);
      if (!anchorId) {
        return false;
      }

      const targetElement = document.getElementById(anchorId);
      if (!targetElement) {
        return false;
      }

      const behavior: ScrollBehavior =
        options.behavior ?? (prefersReducedMotionRef.current ? 'auto' : 'smooth');
      const updateHistory = options.updateHistory ?? true;

      const currentHeaderHeight = measureHeader();
      const targetTop = calculateAnchorScrollTop({
        sectionTopInViewport: targetElement.getBoundingClientRect().top,
        currentScrollY: window.scrollY,
        headerHeight: currentHeaderHeight,
        documentScrollHeight: document.documentElement.scrollHeight,
        viewportHeight: window.innerHeight,
        extraTopOffset: getSectionAnchorExtraOffset(anchorId, window.innerWidth),
      });

      const nextNavId = isNavSectionId(anchorId) ? anchorId : null;
      setActiveSectionId(nextNavId);

      if (updateHistory) {
        const targetUrl = buildUrlForSection(
          window.location.pathname,
          window.location.search,
          anchorId,
        );
        const currentUrl = `${window.location.pathname}${window.location.search}${window.location.hash}`;
        if (targetUrl !== currentUrl) {
          window.history.pushState(null, '', targetUrl);
        }
      }

      programmaticTargetRef.current = {
        anchorId,
        targetTop,
        expiresAt: performance.now() + (behavior === 'instant' || behavior === 'auto' ? 120 : 1000),
      };

      window.scrollTo({
        top: targetTop,
        left: window.scrollX,
        behavior,
      });

      if (behavior === 'instant' || behavior === 'auto') {
        window.requestAnimationFrame(() => {
          programmaticTargetRef.current = null;
        });
      }

      return true;
    },
    [measureHeader],
  );

  // Measure live header height across responsive breakpoints via ResizeObserver
  useEffect(() => {
    const headerEl = headerRef.current;
    if (!headerEl) {
      return;
    }

    const updateHeight = () => {
      const nextHeight = getMeasuredHeaderHeight(headerEl);
      if (nextHeight > 0 && Math.abs(nextHeight - headerHeightRef.current) >= 0.5) {
        headerHeightRef.current = nextHeight;
        setHeaderHeight(nextHeight);
      } else if (nextHeight > 0) {
        headerHeightRef.current = nextHeight;
      }
    };

    updateHeight();

    if (typeof ResizeObserver === 'undefined') {
      return;
    }

    const resizeObserver = new ResizeObserver(() => {
      updateHeight();
    });
    resizeObserver.observe(headerEl);

    return () => {
      resizeObserver.disconnect();
    };
  }, [headerRef]);

  // IntersectionObserver with dynamic rootMargin tied to live header height
  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') {
      return;
    }

    const sectionElements = NAV_SECTION_IDS.map((id) => document.getElementById(id)).filter(
      (el): el is HTMLElement => Boolean(el),
    );

    if (sectionElements.length === 0) {
      return;
    }

    const topMargin = -Math.round(headerHeight);
    const observer = new IntersectionObserver(
      () => {
        syncActiveSectionFromScroll(true);
      },
      {
        root: null,
        rootMargin: `${topMargin}px 0px -55% 0px`,
        threshold: [0, 0.05, 0.25],
      },
    );

    for (const el of sectionElements) {
      observer.observe(el);
    }

    return () => {
      observer.disconnect();
    };
  }, [headerHeight, syncActiveSectionFromScroll]);

  // Scroll, resize, user-interaction cancellation, history navigation, and global anchor clicks
  useEffect(() => {
    let rafId: number | null = null;

    const scheduleSync = () => {
      if (rafId !== null) {
        return;
      }
      rafId = window.requestAnimationFrame(() => {
        rafId = null;
        syncActiveSectionFromScroll(true);
      });
    };

    const handleUserScrollInput = () => {
      userScrolledSinceMountRef.current = true;
      if (programmaticTargetRef.current) {
        programmaticTargetRef.current = null;
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (
        event.key === 'ArrowDown' ||
        event.key === 'ArrowUp' ||
        event.key === 'PageDown' ||
        event.key === 'PageUp' ||
        event.key === 'Home' ||
        event.key === 'End' ||
        event.key === ' '
      ) {
        handleUserScrollInput();
      }
    };

    const handleHistoryNavigation = () => {
      if (isScrollLockedRef.current || isDocumentScrollLocked()) {
        return;
      }

      const targetId = normalizeAnchorId(window.location.hash);
      window.requestAnimationFrame(() => {
        if (targetId && document.getElementById(targetId)) {
          navigateToHash(`#${targetId}`, {
            behavior: prefersReducedMotionRef.current ? 'auto' : 'smooth',
            updateHistory: false,
          });
          return;
        }

        if (!window.location.hash) {
          programmaticTargetRef.current = {
            anchorId: 'inicio',
            targetTop: 0,
            expiresAt: performance.now() + 900,
          };
          setActiveSectionId(null);
          window.scrollTo({
            top: 0,
            left: 0,
            behavior: prefersReducedMotionRef.current ? 'auto' : 'smooth',
          });
        } else {
          syncActiveSectionFromScroll(false);
        }
      });
    };

    const handleDocumentAnchorClick = (event: MouseEvent) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }

      const target = event.target as HTMLElement | null;
      const anchor = target?.closest('a[href^="#"]') as HTMLAnchorElement | null;
      if (!anchor) {
        return;
      }

      const href = anchor.getAttribute('href');
      if (!href || href === '#') {
        return;
      }

      const anchorId = normalizeAnchorId(href);
      if (!anchorId || !document.getElementById(anchorId)) {
        return;
      }

      event.preventDefault();
      navigateToHash(href, { updateHistory: true });
    };

    window.addEventListener('scroll', scheduleSync, { passive: true });
    window.addEventListener('resize', scheduleSync, { passive: true });
    window.addEventListener('wheel', handleUserScrollInput, { passive: true });
    window.addEventListener('touchstart', handleUserScrollInput, { passive: true });
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('popstate', handleHistoryNavigation);
    window.addEventListener('hashchange', handleHistoryNavigation);
    document.addEventListener('click', handleDocumentAnchorClick);

    return () => {
      if (rafId !== null) {
        window.cancelAnimationFrame(rafId);
      }
      window.removeEventListener('scroll', scheduleSync);
      window.removeEventListener('resize', scheduleSync);
      window.removeEventListener('wheel', handleUserScrollInput);
      window.removeEventListener('touchstart', handleUserScrollInput);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('popstate', handleHistoryNavigation);
      window.removeEventListener('hashchange', handleHistoryNavigation);
      document.removeEventListener('click', handleDocumentAnchorClick);
    };
  }, [navigateToHash, syncActiveSectionFromScroll]);

  // Initial mount: align initial URL hash right below header and sync active section
  useEffect(() => {
    const initialId = normalizeAnchorId(window.location.hash);

    const alignInitial = () => {
      if (userScrolledSinceMountRef.current) {
        return;
      }
      const currentHashId = normalizeAnchorId(window.location.hash);
      const targetId = currentHashId ?? initialId;
      if (targetId && document.getElementById(targetId)) {
        navigateToHash(`#${targetId}`, {
          behavior: 'instant',
          updateHistory: false,
        });
      } else {
        syncActiveSectionFromScroll(false);
      }
    };

    const rafId = window.requestAnimationFrame(alignInitial);
    const settleTimer = initialId ? window.setTimeout(alignInitial, 150) : null;

    const handleLoad = () => {
      window.requestAnimationFrame(alignInitial);
    };

    if (initialId) {
      window.addEventListener('load', handleLoad, { once: true });
    }

    let cancelled = false;
    if (initialId && document.fonts?.ready) {
      document.fonts.ready.then(() => {
        if (!cancelled && !userScrolledSinceMountRef.current) {
          window.requestAnimationFrame(alignInitial);
        }
      });
    }

    return () => {
      cancelled = true;
      window.cancelAnimationFrame(rafId);
      if (settleTimer !== null) {
        window.clearTimeout(settleTimer);
      }
      window.removeEventListener('load', handleLoad);
    };
  }, [navigateToHash, syncActiveSectionFromScroll]);

  return {
    activeSectionId,
    navigateToHash,
    syncActiveSectionFromScroll,
  };
}
