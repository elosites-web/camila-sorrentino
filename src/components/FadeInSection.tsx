import { m, useReducedMotion } from 'motion/react';
import { forwardRef, type ReactNode } from 'react';
import {
  DEFAULT_SCROLL_VIEWPORT,
  createSectionFadeVariants,
} from '../utils/motion';

interface FadeInSectionProps {
  id?: string;
  className?: string;
  children: ReactNode;
  immediate?: boolean;
  duration?: number;
}

export const FadeInSection = forwardRef<HTMLElement, FadeInSectionProps>(
  function FadeInSection(
    { id, className, children, immediate = false, duration = 0.55 },
    ref,
  ) {
    const prefersReducedMotion = Boolean(useReducedMotion());

    if (immediate || prefersReducedMotion) {
      return (
        <m.section id={id} ref={ref} className={className}>
          {children}
        </m.section>
      );
    }

    const variants = createSectionFadeVariants({
      reducedMotion: false,
      duration,
    });

    return (
      <m.section
        id={id}
        ref={ref}
        initial="hidden"
        whileInView="visible"
        viewport={DEFAULT_SCROLL_VIEWPORT}
        variants={variants}
        className={className}
      >
        {children}
      </m.section>
    );
  },
);
