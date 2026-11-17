import { ArrowUpRight, ListFilter } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { useRef, useState } from 'react';
import { precosConfig } from '../config/precos';
import { siteConfig, type ServiceItem } from '../config/site';
import { buildWhatsAppUrl, formatServicePrice } from '../utils/formatting';
import { createCardInteractionVariants, getStaggerDelay } from '../utils/motion';
import { PriceListModal } from './PriceListModal';
import { ScrollReveal } from './ScrollReveal';

interface ServiceCardProps {
  servico: ServiceItem;
  index: number;
  whatsappUrl: string;
}

function ServiceCard({ servico, index, whatsappUrl }: ServiceCardProps) {
  const prefersReducedMotion = Boolean(useReducedMotion());
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const precoExibicao = formatServicePrice(servico.id, precosConfig);
  const cardVariants = createCardInteractionVariants(prefersReducedMotion);
  const isInteracting = !prefersReducedMotion && (isHovered || isFocused);

  return (
    <ScrollReveal
      delay={getStaggerDelay(index, 0.08)}
      className="flex"
    >
      <motion.article
        initial="rest"
        animate={isInteracting ? 'active' : 'rest'}
        variants={cardVariants}
        onHoverStart={() => {
          if (!prefersReducedMotion) {
            setIsHovered(true);
          }
        }}
        onHoverEnd={() => setIsHovered(false)}
        onFocus={() => {
          if (!prefersReducedMotion) {
            setIsFocused(true);
          }
        }}
        onBlur={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
            setIsFocused(false);
          }
        }}
        className="group flex w-full flex-col overflow-hidden rounded-2xl border border-[#E2D6CB] bg-[#FAF7F4]"
      >
        <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#ECE1D8]">
          {servico.imagem ? (
            <img
              src={servico.imagem}
              alt={servico.alt}
              width={720}
              height={900}
              loading="lazy"
              className={`h-full w-full object-cover ${
                prefersReducedMotion
                  ? ''
                  : 'transition-transform duration-300 group-hover:scale-[1.03] group-focus-within:scale-[1.03]'
              }`}
            />
          ) : (
            <div
              aria-hidden="true"
              className="relative flex h-full w-full items-center justify-center bg-gradient-to-br from-[#F2E7DF] via-[#E8D7CE] to-[#DFC8C2]"
            >
              <div className="h-36 w-24 rounded-t-full border border-[#C4A276]/45" />
              <div className="absolute h-28 w-16 rounded-t-full border border-[#8E5258]/25" />
            </div>
          )}
        </div>

        <div className="flex flex-1 flex-col justify-between p-6">
          <div>
            <p className="text-xs font-medium tracking-[0.14em] text-[#7D635D]">
              {servico.numero}
              <span className="mx-2 text-[#C4A276]" aria-hidden="true">
                /
              </span>
              <span>Serviço</span>
            </p>
            <h3 className="mt-2 font-serif text-2xl font-medium text-[#1C1917]">
              {servico.titulo}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-[#574E4A]">
              {servico.descricao}
            </p>
          </div>

          <div className="mt-6 border-t border-[#EAE0D7] pt-5">
            {precoExibicao && (
              <p className="mb-3 text-sm font-medium tabular-nums text-[#1C1917]">
                {precoExibicao}
              </p>
            )}

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-lg border border-[#8E5258]/35 bg-white px-4 py-2.5 text-center text-xs font-medium text-[#754046] transition-colors duration-200 hover:border-[#8E5258] hover:bg-[#8E5258] hover:text-white"
            >
              <span>Consultar valores pelo WhatsApp</span>
              <ArrowUpRight className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
            </a>
          </div>
        </div>
      </motion.article>
    </ScrollReveal>
  );
}

export function ServicesSection() {
  const [priceModalOpen, setPriceModalOpen] = useState(false);
  const priceButtonRef = useRef<HTMLButtonElement>(null);
  const whatsappUrl = buildWhatsAppUrl();

  return (
    <section
      id="servicos"
      className="border-t border-[#E7DDD5] bg-[#F4EDE6] py-20 sm:py-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div className="max-w-2xl">
              <p className="text-xs font-medium tracking-[0.18em] text-[#785C57] uppercase">
                Serviços
              </p>
              <h2 className="mt-3 text-balance font-serif text-3xl font-medium tracking-tight text-[#1C1917] sm:text-4xl lg:text-[2.75rem]">
                Cuidado pensado para valorizar suas mãos e pés
              </h2>
            </div>

            <div className="flex max-w-md flex-col items-start gap-4 md:items-end md:text-right">
              <p className="text-sm leading-relaxed text-[#574E4A] sm:text-base">
                Cada atendimento respeita o estilo e a necessidade de cada cliente, com atenção
                ao acabamento e à naturalidade.
              </p>
              <button
                ref={priceButtonRef}
                type="button"
                onClick={() => setPriceModalOpen(true)}
                className="inline-flex min-h-[44px] shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-lg border border-[#8E5258]/35 bg-white px-5 py-2.5 text-sm font-medium text-[#754046] transition-colors duration-200 hover:border-[#8E5258] hover:bg-[#8E5258] hover:text-white"
              >
                <ListFilter className="h-4 w-4 shrink-0" aria-hidden="true" />
                <span>Ver tabela de valores</span>
              </button>
            </div>
          </div>
        </ScrollReveal>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {siteConfig.servicos.map((servico, index) => (
            <ServiceCard
              key={servico.id}
              servico={servico}
              index={index}
              whatsappUrl={whatsappUrl}
            />
          ))}
        </div>
      </div>

      <PriceListModal
        isOpen={priceModalOpen}
        onClose={() => setPriceModalOpen(false)}
        openerRef={priceButtonRef}
      />
    </section>
  );
}
