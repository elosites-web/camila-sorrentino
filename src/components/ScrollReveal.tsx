import { motion, useReducedMotion } from 'motion/react';
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
  const variants = createFadeSlideUpVariants({
    reducedMotion: prefersReducedMotion,
    distance,
    duration,
    delay,
  });

  if (prefersReducedMotion) {
    return (
      <motion.div
        initial={false}
        animate="visible"
        variants={variants}
        className={className}
      >
        {children}
      </motion.div>
    );
  }

  if (immediate) {
    return (
      <motion.div
        initial="hidden"
        animate="visible"
        variants={variants}
        className={className}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={DEFAULT_SCROLL_VIEWPORT}
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  );
}
