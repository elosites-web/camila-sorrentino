import { AnimatePresence, m, useReducedMotion } from 'motion/react';
import { useEffect, useState } from 'react';
import { buildWhatsAppUrl } from '../utils/formatting';
import { EDITORIAL_EASE } from '../utils/motion';
import { shouldShowWhatsAppFloat } from '../utils/whatsappFloatVisibility';
import { WhatsAppIcon } from './SocialIcons';

export function WhatsAppFloat() {
  const [isVisible, setIsVisible] = useState(false);
  const prefersReducedMotion = Boolean(useReducedMotion());
  const whatsappUrl = buildWhatsAppUrl();

  useEffect(() => {
    const heroEl = document.getElementById('inicio');
    const headerEl = document.querySelector('header');

    const updateVisibility = () => {
      if (document.body.style.position === 'fixed') {
        return;
      }

      if (!heroEl) {
        setIsVisible((prev) => (prev ? false : prev));
        return;
      }

      const heroBottom = heroEl.getBoundingClientRect().bottom;
      const headerBottom = headerEl ? headerEl.getBoundingClientRect().bottom : 80;
      const next = shouldShowWhatsAppFloat({ heroBottom, headerBottom });

      setIsVisible((prev) => (prev === next ? prev : next));
    };

    updateVisibility();
    window.addEventListener('scroll', updateVisibility, { passive: true });
    window.addEventListener('resize', updateVisibility, { passive: true });

    const resizeObserver =
      heroEl && typeof ResizeObserver !== 'undefined'
        ? new ResizeObserver(updateVisibility)
        : null;

    if (heroEl && resizeObserver) {
      resizeObserver.observe(heroEl);
    }

    return () => {
      window.removeEventListener('scroll', updateVisibility);
      window.removeEventListener('resize', updateVisibility);
      resizeObserver?.disconnect();
    };
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <m.div
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 12, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 12, scale: 0.96 }}
          transition={
            prefersReducedMotion
              ? { duration: 0 }
              : { duration: 0.25, ease: EDITORIAL_EASE }
          }
          className="fixed bottom-4 right-4 z-40 sm:bottom-6 sm:right-6"
        >
          {!prefersReducedMotion && (
            <span
              aria-hidden="true"
              className="whatsapp-pulse-ring pointer-events-none absolute inset-0 rounded-full border border-[#C4A276]/55 bg-[#8E5258]/30"
            />
          )}
          <m.a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Agendar ou consultar valores pelo WhatsApp"
            whileHover={prefersReducedMotion ? undefined : { scale: 1.05 }}
            transition={
              prefersReducedMotion
                ? { duration: 0 }
                : { duration: 0.2, ease: EDITORIAL_EASE }
            }
            className="relative inline-flex h-12 w-12 items-center justify-center rounded-full border border-[#FAF7F4]/30 bg-[#8E5258] text-white shadow-lg transition-colors duration-200 hover:bg-[#754046] sm:h-13 sm:w-auto sm:gap-2 sm:px-5"
          >
            <WhatsAppIcon className="h-5 w-5 shrink-0" />
            <span className="hidden text-sm font-medium whitespace-nowrap sm:inline">
              WhatsApp
            </span>
          </m.a>
        </m.div>
      )}
    </AnimatePresence>
  );
}
