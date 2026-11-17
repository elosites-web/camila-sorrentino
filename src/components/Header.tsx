import { Menu, X } from 'lucide-react';
import { AnimatePresence, m, useReducedMotion } from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { siteConfig } from '../config/site';
import { buildWhatsAppUrl } from '../utils/formatting';
import { EDITORIAL_EASE } from '../utils/motion';
import { useAnchorNavigation } from '../hooks/useAnchorNavigation';
import { normalizeAnchorId } from '../utils/anchorNavigation';
import {
  applyScrollLockStyles,
  captureScrollLockSnapshot,
  restoreScrollLockStyles,
} from '../utils/scrollLock';
import { OptimizedPicture } from './OptimizedPicture';
import { WhatsAppIcon } from './SocialIcons';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const prefersReducedMotion = Boolean(useReducedMotion());
  const headerRef = useRef<HTMLElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const pendingAnchorRef = useRef<string | null>(null);
  const whatsappUrl = buildWhatsAppUrl();

  const { activeSectionId, navigateToHash, syncActiveSectionFromScroll } =
    useAnchorNavigation({
      headerRef,
      isScrollLocked: mobileMenuOpen,
      prefersReducedMotion,
    });

  useEffect(() => {
    const handleScroll = () => {
      if (document.body.style.position !== 'fixed') {
        const nextScrolled = window.scrollY > 12;
        setIsScrolled((prev) => (prev === nextScrolled ? prev : nextScrolled));
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body & html scroll (including touch gestures) while preserving scroll position
  useEffect(() => {
    if (!mobileMenuOpen) {
      return;
    }

    const htmlEl = document.documentElement;
    const bodyEl = document.body;
    const snapshot = captureScrollLockSnapshot(
      htmlEl,
      bodyEl,
      window.scrollX,
      window.scrollY,
    );

    applyScrollLockStyles(htmlEl, bodyEl, snapshot);

    return () => {
      restoreScrollLockStyles(htmlEl, bodyEl, snapshot, (x, y) => {
        window.scrollTo({ top: y, left: x, behavior: 'instant' });
      });

      const targetHash = pendingAnchorRef.current;
      pendingAnchorRef.current = null;

      if (targetHash) {
        window.requestAnimationFrame(() => {
          navigateToHash(targetHash, { updateHistory: true });
          setIsScrolled(window.scrollY > 12);
        });
      } else {
        window.requestAnimationFrame(() => {
          syncActiveSectionFromScroll(false);
        });
        setIsScrolled(window.scrollY > 12);
      }
    };
  }, [mobileMenuOpen, navigateToHash, syncActiveSectionFromScroll]);

  // Handle Escape key and viewport resize to desktop
  useEffect(() => {
    if (!mobileMenuOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        setMobileMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };

    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('resize', handleResize);
    };
  }, [mobileMenuOpen]);

  const handleInternalLinkClick = (
    event: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    if (!href.startsWith('#')) {
      setMobileMenuOpen(false);
      return;
    }

    event.preventDefault();

    if (mobileMenuOpen) {
      pendingAnchorRef.current = href;
      setMobileMenuOpen(false);
      return;
    }

    navigateToHash(href, { updateHistory: true });
  };

  const handleCloseMenu = () => {
    setMobileMenuOpen(false);
  };

  const backdropPortal =
    typeof document !== 'undefined'
      ? createPortal(
          <AnimatePresence>
            {mobileMenuOpen && (
              <m.div
                data-testid="mobile-menu-backdrop"
                aria-hidden="true"
                initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
                transition={
                  prefersReducedMotion
                    ? { duration: 0 }
                    : { duration: 0.2, ease: EDITORIAL_EASE }
                }
                onClick={handleCloseMenu}
                className="fixed inset-0 z-[42] touch-none bg-[#161312]/94 md:hidden"
              />
            )}
          </AnimatePresence>,
          document.body,
        )
      : null;

  return (
    <>
      {backdropPortal}

      {mobileMenuOpen && (
        <div aria-hidden="true" className="h-[65px] md:hidden" />
      )}

      <header
        ref={headerRef}
        data-scrolled={isScrolled ? 'true' : 'false'}
        className={`${
          mobileMenuOpen ? 'fixed inset-x-0 top-0' : 'sticky top-0'
        } z-[44] border-b transition-[border-color,box-shadow] duration-200 ${
          isScrolled || mobileMenuOpen
            ? 'border-[#E5CFAF]/55 bg-[linear-gradient(116deg,rgba(130,72,78,0.86)_0%,rgba(142,82,88,0.84)_64%,rgba(166,116,108,0.82)_84%,rgba(204,172,129,0.79)_100%)] backdrop-blur-md shadow-[inset_0_1px_0_rgba(255,248,240,0.40),inset_0_-1px_0_rgba(215,185,142,0.28),0_16px_38px_-16px_rgba(38,16,19,0.48)]'
            : 'border-[#E5CFAF]/45 bg-[linear-gradient(116deg,rgba(142,82,88,0.80)_0%,rgba(142,82,88,0.78)_64%,rgba(163,111,106,0.76)_84%,rgba(204,172,129,0.72)_100%)] backdrop-blur-md shadow-[inset_0_1px_0_rgba(255,248,240,0.36),inset_0_-1px_0_rgba(215,185,142,0.22),0_10px_28px_-16px_rgba(48,22,26,0.36)]'
        }`}
      >
        {/* Camadas decorativas leves de vidro jateado e detalhes gravados do ateliê */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 overflow-hidden"
        >
          {/* Textura microcristalina estática (zero custo de filtro SVG por frame) */}
          <div className="absolute inset-0 bg-[radial-gradient(rgba(255,248,240,0.18)_0.55px,transparent_0.55px)] [background-size:3px_3px] opacity-60" />

          {/* Reflexo diagonal acetinado no vidro */}
          <div className="absolute inset-0 bg-[linear-gradient(104deg,rgba(255,255,255,0.16)_0%,transparent_26%,rgba(255,246,232,0.09)_52%,transparent_74%,rgba(232,208,169,0.16)_100%)]" />

          {/* Filete luminoso na borda superior e detalhe central inferior em palha */}
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-[#FAF7F4]/45 via-[#E8D0A9]/75 to-[#FAF7F4]/35" />
          <div className="absolute bottom-0 left-1/2 h-px w-56 -translate-x-1/2 bg-gradient-to-r from-transparent via-[#E8D0A9]/65 to-transparent" />

          {/* Gravação jateada esquerda: arcos delicados em formato amendoado e microbrilhos */}
          <svg
            viewBox="0 0 180 80"
            fill="none"
            className="absolute -left-2 top-0 h-full w-44 opacity-50"
          >
            <path
              d="M12 80C12 42 36 16 64 16C92 16 110 42 110 80"
              stroke="rgba(250,247,244,0.28)"
              strokeWidth="1"
            />
            <path
              d="M26 80C26 50 44 30 64 30C84 30 96 50 96 80"
              stroke="rgba(232,208,169,0.36)"
              strokeWidth="0.9"
              strokeDasharray="3 4"
            />
            <path
              d="M132 22L134 27L139 29L134 31L132 36L130 31L125 29L130 27Z"
              fill="rgba(250,247,244,0.34)"
            />
            <circle cx="152" cy="52" r="1.4" fill="rgba(232,208,169,0.5)" />
          </svg>

          {/* Gravação jateada direita: filigrana fluida e brilho sutil sobre o tom palha */}
          <svg
            viewBox="0 0 220 80"
            fill="none"
            className="absolute -right-2 top-0 h-full w-56 opacity-55"
          >
            <path
              d="M220 14C178 14 156 44 128 62C108 75 82 78 62 78"
              stroke="rgba(250,247,244,0.3)"
              strokeWidth="1"
            />
            <path
              d="M220 28C186 28 168 54 142 70"
              stroke="rgba(232,208,169,0.42)"
              strokeWidth="0.9"
            />
            <path
              d="M94 18L95.8 22.2L100 24L95.8 25.8L94 30L92.2 25.8L88 24L92.2 22.2Z"
              fill="rgba(232,208,169,0.52)"
            />
            <circle cx="118" cy="36" r="1.3" fill="rgba(250,247,244,0.4)" />
            <circle cx="178" cy="18" r="1.1" fill="rgba(250,247,244,0.35)" />
          </svg>
        </div>

        <div className="relative z-10 mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6 md:gap-2.5 lg:h-20 lg:gap-8 lg:px-8">
          <a
            href="#inicio"
            onClick={(event) => handleInternalLinkClick(event, '#inicio')}
            className={`inline-flex shrink-0 items-center rounded-md py-1 focus-visible:outline-[#E8D0A9] focus-visible:outline-offset-4 max-md:absolute max-md:top-1/2 max-md:-translate-y-1/2 md:static md:translate-x-0 md:translate-y-0 ${
              prefersReducedMotion
                ? ''
                : 'max-md:transition-[left,translate,transform] max-md:duration-200 max-md:ease-[cubic-bezier(0.22,1,0.36,1)]'
            } ${
              mobileMenuOpen
                ? 'max-md:left-1/2 max-md:-translate-x-1/2'
                : 'max-md:left-4 sm:max-md:left-6 max-md:translate-x-0'
            }`}
            aria-label="Camila Sorrentino – Nail Designer, voltar ao início"
          >
            <OptimizedPicture
              src={siteConfig.imagens.logoPreto}
              alt={siteConfig.marca}
              sizes="(min-width: 1024px) 148px, 128px"
              width={148}
              height={52}
              loading="eager"
              decoding="sync"
              className="h-11 w-auto object-contain brightness-0 invert drop-shadow-[0_1px_6px_rgba(32,14,17,0.32)] md:h-10 lg:h-12"
            />
          </a>

          <nav
            aria-label="Navegação principal"
            className="hidden items-center md:flex md:gap-2.5 lg:gap-6"
          >
            {siteConfig.navegacao.map((item) => {
              const itemId = normalizeAnchorId(item.href);
              const isActive = itemId !== null && activeSectionId === itemId;

              return (
                <a
                  key={item.href}
                  href={item.href}
                  aria-current={isActive ? 'location' : undefined}
                  onClick={(event) => handleInternalLinkClick(event, item.href)}
                  className={`shrink-0 whitespace-nowrap border-b-2 py-1 font-medium drop-shadow-[0_1px_2px_rgba(38,16,19,0.3)] transition-[color,border-color,text-shadow] duration-200 focus-visible:outline-[#E8D0A9] md:text-[12.5px] lg:text-sm ${
                    isActive
                      ? 'border-[#E8D0A9] text-white [text-shadow:0_0_0.55px_currentColor,0_1px_2px_rgba(38,16,19,0.35)]'
                      : 'border-transparent text-white/90 hover:border-[#E8D0A9]/75 hover:text-white'
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>

          <div className="flex shrink-0 items-center gap-3 max-md:ml-auto">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden shrink-0 items-center gap-1.5 whitespace-nowrap rounded-lg border border-[#E8D0A9]/75 bg-[#FAF7F4]/95 font-medium text-[#6B373D] shadow-[0_6px_18px_-8px_rgba(32,14,17,0.38)] transition-[color,background-color,border-color,box-shadow] duration-200 hover:bg-[#F3E5D0] hover:text-[#55282D] focus-visible:border-[#8E5258] focus-visible:shadow-[0_0_18px_4px_rgba(142,82,88,0.55)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8E5258] focus-visible:ring-offset-2 focus-visible:ring-offset-[#FAF7F4] md:inline-flex md:px-3 md:py-1.5 md:text-xs lg:gap-2 lg:px-5 lg:py-2.5 lg:text-sm"
            >
              <WhatsAppIcon className="h-3.5 w-3.5 shrink-0 lg:h-4 lg:w-4" />
              <span>Agendar pelo WhatsApp</span>
            </a>

            <button
              ref={menuButtonRef}
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation"
              aria-label={mobileMenuOpen ? 'Fechar menu de navegação' : 'Abrir menu de navegação'}
              className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-[#E8D0A9]/50 bg-white/15 text-[#FAF7F4] backdrop-blur-sm transition-colors hover:bg-white/25 focus-visible:outline-[#E8D0A9] md:hidden"
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" aria-hidden="true" />
              ) : (
                <Menu className="h-5 w-5" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        <AnimatePresence initial={false}>
          {mobileMenuOpen && (
            <m.nav
              id="mobile-navigation"
              aria-label="Navegação móvel"
              initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: -8 }}
              transition={
                prefersReducedMotion
                  ? { duration: 0 }
                  : { duration: 0.18, ease: EDITORIAL_EASE }
              }
              className="absolute inset-x-0 top-full z-20 max-h-[calc(100vh-4.1rem)] supports-[height:100dvh]:max-h-[calc(100dvh-4.1rem)] overflow-y-auto overscroll-contain touch-pan-y border-t border-[#E8D0A9]/35 bg-[linear-gradient(180deg,rgba(116,62,68,0.97)_0%,rgba(142,82,88,0.96)_78%,rgba(173,132,106,0.95)_100%)] px-4 pb-6 pt-3 text-[#FAF7F4] shadow-[0_24px_48px_-16px_rgba(20,12,13,0.6)] backdrop-blur-md md:hidden"
            >
              <ul className="flex flex-col gap-1">
                {siteConfig.navegacao.map((item) => {
                  const itemId = normalizeAnchorId(item.href);
                  const isActive = itemId !== null && activeSectionId === itemId;

                  return (
                    <li key={item.href}>
                      <a
                        href={item.href}
                        aria-current={isActive ? 'location' : undefined}
                        onClick={(event) => handleInternalLinkClick(event, item.href)}
                        className={`flex min-h-[44px] items-center justify-between rounded-lg border-l-[3px] px-3 text-base transition-colors focus-visible:outline-[#E8D0A9] ${
                          isActive
                            ? 'border-[#E8D0A9] bg-white/18 font-semibold text-white shadow-[inset_0_1px_0_rgba(255,248,240,0.18)]'
                            : 'border-transparent font-medium text-[#FAF7F4]/95 hover:bg-white/12 hover:text-white'
                        }`}
                      >
                        <span>{item.label}</span>
                        {isActive && (
                          <span
                            aria-hidden="true"
                            className="h-1.5 w-4 rounded-full bg-[#E8D0A9]"
                          />
                        )}
                      </a>
                    </li>
                  );
                })}
              </ul>
              <div className="mt-4 border-t border-[#E8D0A9]/30 pt-4">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleCloseMenu}
                  className="flex min-h-[44px] w-full items-center justify-center gap-2 rounded-lg border border-[#E8D0A9]/75 bg-[#FAF7F4]/95 px-5 py-3 text-sm font-medium text-[#6B373D] transition-colors hover:bg-[#F3E5D0] hover:text-[#55282D] focus-visible:outline-[#FAF7F4]"
                >
                  <WhatsAppIcon className="h-4 w-4 shrink-0" />
                  <span>Agendar pelo WhatsApp</span>
                </a>
              </div>
            </m.nav>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
