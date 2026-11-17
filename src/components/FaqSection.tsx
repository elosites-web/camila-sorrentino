import { ArrowUpRight, ChevronDown } from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { useState } from 'react';
import { siteConfig } from '../config/site';
import { toggleFaqId } from '../utils/faq';
import { buildWhatsAppUrl } from '../utils/formatting';
import { EDITORIAL_EASE, getStaggerDelay } from '../utils/motion';
import { ScrollReveal } from './ScrollReveal';

export function FaqSection() {
  const [openId, setOpenId] = useState<string | null>(
    siteConfig.duvidasFrequentes[0]?.id ?? null,
  );
  const prefersReducedMotion = Boolean(useReducedMotion());
  const whatsappUrl = buildWhatsAppUrl();

  const handleToggle = (id: string) => {
    setOpenId((current) => toggleFaqId(current, id));
  };

  return (
    <section
      id="duvidas"
      className="bg-[#F4EDE6] py-20 sm:py-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-start lg:gap-14">
          <ScrollReveal className="lg:col-span-4 lg:sticky lg:top-28">
            <p className="text-xs font-medium tracking-[0.18em] text-[#785C57] uppercase">
              Dúvidas frequentes
            </p>
            <h2 className="mt-3 text-balance font-serif text-3xl font-medium tracking-tight text-[#1C1917] sm:text-4xl">
              Orientações sobre preparo, durabilidade e cuidados
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-[#574E4A] sm:text-base">
              Reunimos as perguntas mais comuns antes e depois do atendimento para que você
              tenha uma experiência tranquila e preserve o acabamento das suas unhas.
            </p>

            <div className="mt-7">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-lg border border-[#8E5258]/35 bg-white px-5 py-2.5 text-sm font-medium text-[#754046] transition-colors duration-200 hover:border-[#8E5258] hover:bg-[#8E5258] hover:text-white"
              >
                <span>Tirar dúvidas pelo WhatsApp</span>
                <ArrowUpRight className="h-4 w-4 shrink-0" aria-hidden="true" />
              </a>
            </div>
          </ScrollReveal>

          <div className="space-y-4 lg:col-span-8">
            {siteConfig.duvidasFrequentes.map((item, index) => {
              const isOpen = openId === item.id;
              const triggerId = `faq-trigger-${item.id}`;
              const panelId = `faq-panel-${item.id}`;

              return (
                <ScrollReveal key={item.id} delay={getStaggerDelay(index, 0.06, 0.24)}>
                  <article
                    className={`overflow-hidden rounded-2xl border transition-colors duration-200 ${
                      isOpen
                        ? 'border-[#8E5258]/35 bg-white shadow-[0_12px_28px_-18px_rgba(28,25,23,0.12)]'
                        : 'border-[#E2D6CB] bg-[#FAF7F4] hover:border-[#D4C3B6]'
                    }`}
                  >
                    <h3 className="m-0 font-serif">
                      <button
                        id={triggerId}
                        type="button"
                        aria-expanded={isOpen}
                        aria-controls={panelId}
                        onClick={() => handleToggle(item.id)}
                        className="flex min-h-[44px] w-full items-start justify-between gap-4 px-5 py-5 text-left transition-colors sm:px-7 sm:py-6"
                      >
                        <span className="flex-1">
                          <span className="block font-sans text-xs font-medium tracking-[0.14em] text-[#7D635D]">
                            {item.numero}
                            <span className="mx-2 text-[#C4A276]" aria-hidden="true">
                              /
                            </span>
                            <span>{item.categoria}</span>
                          </span>
                          <span className="mt-1.5 block font-serif text-xl font-medium leading-snug text-[#1C1917] sm:text-[1.4rem]">
                            {item.pergunta}
                          </span>
                        </span>

                        <span
                          aria-hidden="true"
                          className={`mt-2 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-colors duration-200 ${
                            isOpen
                              ? 'border-[#8E5258] bg-[#8E5258] text-white'
                              : 'border-[#DFD2C7] bg-white text-[#754046]'
                          }`}
                        >
                          <ChevronDown
                            className={`h-4 w-4 ${
                              prefersReducedMotion ? '' : 'transition-transform duration-200'
                            } ${isOpen ? 'rotate-180' : 'rotate-0'}`}
                          />
                        </span>
                      </button>
                    </h3>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          id={panelId}
                          role="region"
                          aria-labelledby={triggerId}
                          initial={
                            prefersReducedMotion
                              ? { opacity: 1, height: 'auto' }
                              : { opacity: 0, height: 0 }
                          }
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={
                            prefersReducedMotion
                              ? { opacity: 1, height: 'auto' }
                              : { opacity: 0, height: 0 }
                          }
                          transition={
                            prefersReducedMotion
                              ? { duration: 0 }
                              : { duration: 0.24, ease: EDITORIAL_EASE }
                          }
                          className="overflow-hidden"
                        >
                          <div className="border-t border-[#EEE4DC] px-5 pb-6 pt-4 sm:px-7">
                            <p className="text-sm leading-relaxed text-[#4B4340] sm:text-base">
                              {item.resposta}
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </article>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
