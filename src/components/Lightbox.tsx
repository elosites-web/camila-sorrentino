import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { useEffect, useRef } from 'react';
import {
  getActiveLightboxItem,
  getNextLightboxIndex,
  getPrevLightboxIndex,
} from '../utils/lightbox';
import { OptimizedPicture } from './OptimizedPicture';

export interface LightboxImage {
  id: string;
  imagem: string;
  alt: string;
  categoria?: string;
}

interface LightboxProps {
  items: LightboxImage[];
  currentIndex: number | null;
  onClose: () => void;
  onNavigate: (newIndex: number) => void;
  openerRef: React.RefObject<HTMLElement | null>;
}

const FOCUSABLE_SELECTOR =
  'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function Lightbox({
  items,
  currentIndex,
  onClose,
  onNavigate,
  openerRef,
}: LightboxProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  const currentItem = getActiveLightboxItem(items, currentIndex);
  const isOpen = currentItem !== null && currentIndex !== null;

  const stateRef = useRef({
    currentIndex,
    totalItems: items.length,
    onClose,
    onNavigate,
  });
  stateRef.current = {
    currentIndex,
    totalItems: items.length,
    onClose,
    onNavigate,
  };

  // Lock body scroll, move initial focus into dialog on open, and restore opener focus only on close
  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    closeButtonRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      openerRef.current?.focus();
    };
  }, [isOpen, openerRef]);

  // Handle Escape, Arrow navigation, and strict Tab focus trapping while open
  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      const {
        currentIndex: activeIndex,
        totalItems,
        onClose: closeModal,
        onNavigate: navigateTo,
      } = stateRef.current;

      if (event.key === 'Escape') {
        event.preventDefault();
        closeModal();
        return;
      }

      if (event.key === 'ArrowRight' && activeIndex !== null && totalItems > 1) {
        event.preventDefault();
        const next = getNextLightboxIndex(activeIndex, totalItems);
        if (next !== null) {
          navigateTo(next);
        }
        return;
      }

      if (event.key === 'ArrowLeft' && activeIndex !== null && totalItems > 1) {
        event.preventDefault();
        const prev = getPrevLightboxIndex(activeIndex, totalItems);
        if (prev !== null) {
          navigateTo(prev);
        }
        return;
      }

      if (event.key === 'Tab' && dialogRef.current) {
        const focusable = Array.from(
          dialogRef.current.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR),
        ).filter((el) => el.offsetParent !== null || el === document.activeElement);

        if (focusable.length === 0) {
          event.preventDefault();
          return;
        }

        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        const activeElement = document.activeElement as HTMLElement | null;

        if (!activeElement || !dialogRef.current.contains(activeElement) || activeElement === dialogRef.current) {
          event.preventDefault();
          (event.shiftKey ? last : first).focus();
          return;
        }

        if (focusable.length === 1) {
          event.preventDefault();
          first.focus();
          return;
        }

        if (event.shiftKey && activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  if (!isOpen || currentIndex === null || !currentItem) {
    return null;
  }

  const hasMultiple = items.length > 1;
  const handlePrev = () => {
    const prev = getPrevLightboxIndex(currentIndex, items.length);
    if (prev !== null) {
      onNavigate(prev);
    }
  };
  const handleNext = () => {
    const next = getNextLightboxIndex(currentIndex, items.length);
    if (next !== null) {
      onNavigate(next);
    }
  };

  return (
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label="Visualização ampliada da fotografia"
      tabIndex={-1}
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#141110]/94 p-4 sm:p-6"
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="relative flex max-h-[92vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl border border-white/15 bg-[#1C1917] text-[#FAF7F4]">
        <div className="flex items-center justify-between border-b border-white/10 px-4 py-3 sm:px-6">
          <p className="text-xs font-medium tabular-nums tracking-[0.14em] text-[#D9CFC7]">
            {currentIndex + 1} / {items.length}
            {currentItem.categoria ? ` · ${currentItem.categoria}` : ''}
          </p>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label="Fechar visualização ampliada"
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/15 bg-white/5 text-white transition-colors hover:bg-white/15 focus-visible:outline-white"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        <div className="relative flex flex-1 items-center justify-center overflow-hidden bg-[#12100F] p-4 sm:p-6">
          {hasMultiple && (
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Foto anterior"
              className="absolute left-3 z-10 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-[#1C1917]/85 text-white transition-colors hover:bg-[#8E5258] focus-visible:outline-white sm:left-5"
            >
              <ChevronLeft className="h-5 w-5" aria-hidden="true" />
            </button>
          )}

          <OptimizedPicture
            key={currentItem.id}
            src={currentItem.imagem}
            alt={currentItem.alt}
            mode="lightbox"
            sizes="(min-width: 768px) 720px, 92vw"
            loading="eager"
            decoding="async"
            className="max-h-[68vh] w-auto max-w-full rounded-lg object-contain"
          />

          {hasMultiple && (
            <button
              type="button"
              onClick={handleNext}
              aria-label="Próxima foto"
              className="absolute right-3 z-10 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-[#1C1917]/85 text-white transition-colors hover:bg-[#8E5258] focus-visible:outline-white sm:right-5"
            >
              <ChevronRight className="h-5 w-5" aria-hidden="true" />
            </button>
          )}
        </div>

        <div className="border-t border-white/10 px-4 py-3.5 sm:px-6">
          <p className="text-sm leading-relaxed text-[#E7DDD5]">{currentItem.alt}</p>
        </div>
      </div>
    </div>
  );
}
