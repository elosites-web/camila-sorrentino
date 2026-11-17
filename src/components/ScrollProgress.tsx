import { useEffect, useRef } from 'react';
import { calculateScrollProgress } from '../utils/motion';

export function ScrollProgress() {
  const containerRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const tipRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let rafId: number | null = null;

    const updateProgress = () => {
      rafId = null;
      const barEl = barRef.current;
      const tipEl = tipRef.current;
      const containerEl = containerRef.current;
      if (!barEl || !tipEl || !containerEl) {
        return;
      }

      const progress = calculateScrollProgress(
        window.scrollY,
        document.documentElement.scrollHeight,
        window.innerHeight,
      );

      barEl.style.transform = `scaleX(${progress})`;

      const width = containerEl.clientWidth || window.innerWidth;
      const tipX = progress * width;
      tipEl.style.transform = `translate3d(${tipX.toFixed(1)}px, 0, 0) translateX(-100%)`;

      if (progress <= 0) {
        tipEl.style.opacity = '0';
      } else if (progress < 0.015) {
        tipEl.style.opacity = (progress / 0.015).toFixed(2);
      } else if (progress >= 0.99) {
        tipEl.style.opacity = '0.85';
      } else {
        tipEl.style.opacity = '1';
      }
    };

    const scheduleUpdate = () => {
      if (rafId === null) {
        rafId = window.requestAnimationFrame(updateProgress);
      }
    };

    updateProgress();
    window.addEventListener('scroll', scheduleUpdate, { passive: true });
    window.addEventListener('resize', scheduleUpdate, { passive: true });

    return () => {
      if (rafId !== null) {
        window.cancelAnimationFrame(rafId);
      }
      window.removeEventListener('scroll', scheduleUpdate);
      window.removeEventListener('resize', scheduleUpdate);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 top-0 z-[45] h-4 overflow-x-clip bg-transparent"
    >
      <div className="relative h-[2.5px] w-full">
        <div
          ref={barRef}
          data-testid="scroll-progress"
          style={{ transform: 'scaleX(0)' }}
          className="h-full w-full origin-left bg-gradient-to-r from-[#F6EAD6] to-[#E5CFAF] will-change-transform"
        />

        <span
          ref={tipRef}
          data-testid="scroll-progress-silver-tip"
          style={{ opacity: 0, transform: 'translate3d(0px, 0, 0) translateX(-100%)' }}
          className="absolute left-0 top-0 h-[2.5px] w-[2.5px] rounded-full bg-[radial-gradient(circle_at_35%_35%,#FFFFFF_0%,#E8EEF7_58%,#C5D0DF_100%)] shadow-[0_0_4px_1.5px_rgba(255,255,255,0.95),0_0_9px_2.5px_rgba(190,202,220,0.78)] will-change-transform"
        />
      </div>
    </div>
  );
}
