import { MessageCircle } from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { useEffect, useState } from 'react';
import { buildWhatsAppUrl } from '../utils/formatting';
import { EDITORIAL_EASE } from '../utils/motion';
import { shouldShowWhatsAppFloat } from '../utils/whatsappFloatVisibility';

export function WhatsAppFloat() {
  const [isVisible, setIsVisible] = useState(false);
  const prefersReducedMotion = Boolean(useReducedMotion());
  const whatsappUrl = buildWhatsAppUrl();

  useEffect(() => {
    const updateVisibility = () => {
      if (document.body.style.position === 'fixed') {
        return;
      }

      const heroEl = document.getElementById('inicio');
      if (!heroEl) {
        setIsVisible(false);
        return;
      }

      const headerEl = document.querySelector('header');
      const heroBottom = heroEl.getBoundingClientRect().bottom;
      const headerBottom = headerEl ? headerEl.getBoundingClientRect().bottom : 80;

      setIsVisible(shouldShowWhatsAppFloat({ heroBottom, headerBottom }));
    };

    updateVisibility();
    window.addEventListener('scroll', updateVisibility, { passive: true });
    window.addEventListener('resize', updateVisibility, { passive: true });

    const heroEl = document.getElementById('inicio');
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
        <motion.a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Agendar ou consultar valores pelo WhatsApp"
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 12, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 12, scale: 0.96 }}
          whileHover={prefersReducedMotion ? undefined : { scale: 1.05 }}
          transition={
            prefersReducedMotion
              ? { duration: 0 }
              : { duration: 0.25, ease: EDITORIAL_EASE }
          }
          className="fixed bottom-4 right-4 z-40 inline-flex h-12 w-12 items-center justify-center rounded-full border border-[#FAF7F4]/30 bg-[#8E5258] text-white shadow-lg transition-colors duration-200 hover:bg-[#754046] sm:bottom-6 sm:right-6 sm:h-13 sm:w-auto sm:gap-2 sm:px-5"
        >
          <MessageCircle className="h-5 w-5 shrink-0" aria-hidden="true" />
          <span className="hidden text-sm font-medium whitespace-nowrap sm:inline">
            WhatsApp
          </span>
        </motion.a>
      )}
    </AnimatePresence>
  );
}
