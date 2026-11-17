import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'motion/react';
import { SCROLL_PROGRESS_SPRING } from '../utils/motion';

export function ScrollProgress() {
  const prefersReducedMotion = Boolean(useReducedMotion());
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, SCROLL_PROGRESS_SPRING);
  const activeProgress = prefersReducedMotion ? scrollYProgress : smoothProgress;

  const tipLeft = useTransform(activeProgress, (value) => `${(value * 100).toFixed(3)}%`);
  const tipOpacity = useTransform(activeProgress, [0, 0.015, 0.99, 1], [0, 1, 1, 0.85]);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 top-0 z-[45] h-4 overflow-x-clip bg-transparent"
    >
      <div className="relative h-[2.5px] w-full">
        <motion.div
          data-testid="scroll-progress"
          style={{ scaleX: activeProgress }}
          className="h-full w-full origin-left bg-gradient-to-r from-[#F6EAD6] to-[#E5CFAF]"
        />

        <motion.span
          data-testid="scroll-progress-silver-tip"
          style={{ left: tipLeft, opacity: tipOpacity }}
          className="absolute top-0 h-[2.5px] w-[2.5px] -translate-x-full rounded-full bg-[radial-gradient(circle_at_35%_35%,#FFFFFF_0%,#E8EEF7_58%,#C5D0DF_100%)] shadow-[0_0_4px_1.5px_rgba(255,255,255,0.95),0_0_9px_2.5px_rgba(190,202,220,0.78)]"
        />
      </div>
    </div>
  );
}
