import type { Variants } from 'motion/react';

export const EDITORIAL_EASE: readonly [number, number, number, number] = [0.22, 1, 0.36, 1];

export const DEFAULT_SCROLL_VIEWPORT = {
  once: true,
  amount: 'some',
} as const;

export interface FadeSlideUpOptions {
  reducedMotion: boolean;
  distance?: number;
  duration?: number;
  delay?: number;
}

export function createFadeSlideUpVariants({
  reducedMotion,
  distance = 22,
  duration = 0.6,
  delay = 0,
}: FadeSlideUpOptions): Variants {
  if (reducedMotion) {
    return {
      hidden: { opacity: 1, y: 0 },
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          duration: 0,
          delay: 0,
        },
      },
    };
  }

  return {
    hidden: { opacity: 0, y: distance },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration,
        delay,
        ease: EDITORIAL_EASE,
      },
    },
  };
}

export interface SectionFadeOptions {
  reducedMotion: boolean;
  duration?: number;
}

export function createSectionFadeVariants({
  reducedMotion,
  duration = 0.55,
}: SectionFadeOptions): Variants {
  if (reducedMotion) {
    return {
      hidden: { opacity: 1 },
      visible: {
        opacity: 1,
        transition: {
          duration: 0,
        },
      },
    };
  }

  return {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration,
        ease: EDITORIAL_EASE,
      },
    },
  };
}

export function getStaggerDelay(
  index: number,
  step = 0.07,
  maxDelay = 0.28,
  reducedMotion = false,
): number {
  if (reducedMotion || index <= 0) {
    return 0;
  }
  return Math.min(Number((index * step).toFixed(3)), maxDelay);
}

export function createCardInteractionVariants(reducedMotion: boolean): Variants {
  if (reducedMotion) {
    return {
      rest: {
        scale: 1,
        y: 0,
        boxShadow: '0 0 0 0 rgba(28, 25, 23, 0)',
        transition: { duration: 0 },
      },
      active: {
        scale: 1,
        y: 0,
        boxShadow: '0 0 0 0 rgba(28, 25, 23, 0)',
        transition: { duration: 0 },
      },
    };
  }

  return {
    rest: {
      scale: 1,
      y: 0,
      boxShadow: '0 1px 2px 0 rgba(28, 25, 23, 0.04)',
      transition: {
        duration: 0.26,
        ease: EDITORIAL_EASE,
      },
    },
    active: {
      scale: 1.015,
      y: -4,
      boxShadow:
        '0 18px 34px -14px rgba(28, 25, 23, 0.14), 0 6px 14px -6px rgba(142, 82, 88, 0.10)',
      transition: {
        duration: 0.28,
        ease: EDITORIAL_EASE,
      },
    },
  };
}

export const SCROLL_PROGRESS_SPRING = {
  stiffness: 220,
  damping: 32,
  restDelta: 0.001,
} as const;

export function calculateScrollProgress(
  scrollY: number,
  scrollHeight: number,
  clientHeight: number,
): number {
  if (
    !Number.isFinite(scrollY) ||
    !Number.isFinite(scrollHeight) ||
    !Number.isFinite(clientHeight)
  ) {
    return 0;
  }

  const maxScrollable = scrollHeight - clientHeight;
  if (maxScrollable <= 0 || scrollY <= 0) {
    return 0;
  }

  if (scrollY >= maxScrollable) {
    return 1;
  }

  return Number((scrollY / maxScrollable).toFixed(4));
}

