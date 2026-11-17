import { m, useReducedMotion } from 'motion/react';
import type { ReactNode } from 'react';
import {
  DEFAULT_SCROLL_VIEWPORT,
  createFadeSlideUpVariants,
} from '../utils/motion';

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  distance?: number;
  duration?: number;
  immediate?: boolean;
}

export function ScrollReveal({
  children,
  className,
  delay = 0,
  distance = 22,
  duration = 0.6,
  immediate = false,
}: ScrollRevealProps) {
  const prefersReducedMotion = Boolean(useReducedMotion());

  // Render above-the-fold immediate content visibly at t=0 so FCP/LCP paint without JS opacity delay.
  if (immediate || prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  const variants = createFadeSlideUpVariants({
    reducedMotion: false,
    distance,
    duration,
    delay,
  });

  return (
    <m.div
      initial="hidden"
      whileInView="visible"
      viewport={DEFAULT_SCROLL_VIEWPORT}
      variants={variants}
      className={className}
    >
      {children}
    </m.div>
  );
}
