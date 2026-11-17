import { ArrowUpRight, X } from 'lucide-react';
import { AnimatePresence, m, useReducedMotion } from 'motion/react';
import { useEffect, useMemo, useRef } from 'react';
import { precosConfig } from '../config/precos';
import { siteConfig } from '../config/site';
import { buildPriceListRows, buildWhatsAppUrl } from '../utils/formatting';
import { EDITORIAL_EASE } from '../utils/motion';
import { WhatsAppIcon } from './SocialIcons';

interface PriceListModalProps {
  isOpen: boolean;
  onClose: () => void;
  openerRef: React.RefObject<HTMLElement | null>;
}

const FOCUSABLE_SELECTOR =
  'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function PriceListModal({ isOpen, onClose, openerRef }: PriceListModalProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const wasOpenRef = useRef(false);
  const prefersReducedMotion = Boolean(useReducedMotion());

  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  const rows = useMemo(
    () => buildPriceListRows(siteConfig.servicos, precosConfig),
    [],
  );
  const hasAnyVisiblePrice = rows.some((row) => row.disponivel);
  const whatsappUrl = buildWhatsAppUrl();

  useEffect(() => {
    if (isOpen) {
      wasOpenRef.current = true;
      const previousOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';

      const focusTimer = window.setTimeout(() => {
        closeButtonRef.current?.focus();
      }, 0);

      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
          event.preventDefault();
          onCloseRef.current();
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

          if (
            !activeElement ||
            !dialogRef.current.contains(activeElement) ||
            activeElement === dialogRef.current
          ) {
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
        window.clearTimeout(focusTimer);
        window.removeEventListener('keydown', handleKeyDown);
        document.body.style.overflow = previousOverflow;
      };
    }

    if (wasOpenRef.current) {
      wasOpenRef.current = false;
      openerRef.current?.focus();
    }
  }, [isOpen, openerRef]);

  return (
    <AnimatePresence>
      {isOpen && (
        <m.div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby="price-list-modal-title"
          tabIndex={-1}
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
          transition={
            prefersReducedMotion
              ? { duration: 0 }
              : { duration: 0.2, ease: EDITORIAL_EASE }
          }
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#1C1917]/75 p-4 sm:p-6"
          onClick={(event) => {
            if (event.target === event.currentTarget) {
              onClose();
            }
          }}
        >
          <m.div
            initial={
              prefersReducedMotion
                ? { opacity: 1, y: 0, scale: 1 }
                : { opacity: 0, y: 16, scale: 0.985 }
            }
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={
              prefersReducedMotion
                ? { opacity: 1, y: 0, scale: 1 }
                : { opacity: 0, y: 10, scale: 0.99 }
            }
            transition={
              prefersReducedMotion
                ? { duration: 0 }
                : { duration: 0.24, ease: EDITORIAL_EASE }
            }
            className="relative flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl border border-[#DFD2C7] bg-[#FAF7F4] text-[#1C1917] shadow-[0_24px_60px_-20px_rgba(28,25,23,0.45)]"
          >
            <div className="flex items-start justify-between gap-4 border-b border-[#E7DDD5] bg-[#F4EDE6] px-5 py-4 sm:px-7 sm:py-5">
              <div>
                <p className="text-xs font-medium tracking-[0.18em] text-[#785C57] uppercase">
                  {siteConfig.marca}
                </p>
                <h3
                  id="price-list-modal-title"
                  className="mt-1 font-serif text-2xl font-medium tracking-tight text-[#1C1917] sm:text-3xl"
                >
                  Tabela de valores dos serviços
                </h3>
              </div>

              <button
                ref={closeButtonRef}
                type="button"
                onClick={onClose}
                aria-label="Fechar tabela de valores"
                className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-[#DFD2C7] bg-white text-[#1C1917] transition-colors hover:border-[#8E5258] hover:bg-[#EFE6DF]"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>

            <div className="overflow-y-auto px-5 py-5 sm:px-7 sm:py-6">
              {!hasAnyVisiblePrice && (
                <p className="mb-5 rounded-xl border border-[#E5D9CF] bg-[#F4EDE6]/70 px-4 py-3 text-sm leading-relaxed text-[#4B4340]">
                  Os valores são informados diretamente pelo WhatsApp de acordo com o
                  serviço desejado e as necessidades de cada atendimento.
                </p>
              )}

              <div className="overflow-hidden rounded-xl border border-[#E2D6CB] bg-white">
                <table className="w-full border-collapse text-left">
                  <thead className="border-b border-[#E7DDD5] bg-[#F4EDE6]/80">
                    <tr>
                      <th
                        scope="col"
                        className="px-4 py-3 text-xs font-medium tracking-[0.14em] text-[#785C57] uppercase sm:px-5"
                      >
                        Serviço
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3 text-right text-xs font-medium tracking-[0.14em] text-[#785C57] uppercase sm:px-5"
                      >
                        Valor
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#EEE4DC]">
                    {rows.map((row) => (
                      <tr key={row.id} className="align-top transition-colors hover:bg-[#FAF7F4]/70">
                        <th scope="row" className="px-4 py-4 font-normal sm:px-5">
                          <span className="block text-[11px] font-medium tracking-[0.14em] text-[#7D635D]">
                            {row.numero}
                          </span>
                          <span className="mt-0.5 block font-serif text-lg font-medium text-[#1C1917] sm:text-xl">
                            {row.titulo}
                          </span>
                          <span className="mt-1 block text-xs leading-relaxed text-[#574E4A] sm:text-sm">
                            {row.descricao}
                          </span>
                        </th>
                        <td className="whitespace-nowrap px-4 py-4 text-right align-middle sm:px-5">
                          {row.precoTexto ? (
                            <span className="inline-block font-serif text-lg font-medium tabular-nums text-[#1C1917]">
                              {row.precoTexto}
                            </span>
                          ) : (
                            <span className="inline-block text-xs font-medium text-[#754046] sm:text-sm">
                              Sob consulta
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="flex flex-col gap-3 border-t border-[#E7DDD5] bg-[#F4EDE6]/70 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-7">
              <p className="text-xs text-[#6B5E59]">
                Atendimento em {siteConfig.cidade} com hora marcada
              </p>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-lg bg-[#8E5258] px-5 py-2.5 text-sm font-medium text-white transition-colors duration-200 hover:bg-[#754046]"
              >
                <WhatsAppIcon className="h-4 w-4 shrink-0" />
                <span>Consultar valores pelo WhatsApp</span>
                <ArrowUpRight className="h-4 w-4 shrink-0" aria-hidden="true" />
              </a>
            </div>
          </m.div>
        </m.div>
      )}
    </AnimatePresence>
  );
}
