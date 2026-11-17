import { ArrowUpRight, ListFilter } from 'lucide-react';
import { Suspense, lazy, useRef, useState } from 'react';
import { precosConfig } from '../config/precos';
import { siteConfig, type ServiceItem } from '../config/site';
import { buildWhatsAppUrl, formatServicePrice } from '../utils/formatting';
import { getStaggerDelay } from '../utils/motion';
import { FadeInSection } from './FadeInSection';
import { OptimizedPicture } from './OptimizedPicture';
import { ScrollReveal } from './ScrollReveal';
import { WhatsAppIcon } from './SocialIcons';

const loadPriceListModal = () => import('./PriceListModal');
const PriceListModal = lazy(() =>
  loadPriceListModal().then((module) => ({ default: module.PriceListModal })),
);

interface ServiceCardProps {
  servico: ServiceItem;
  index: number;
  whatsappUrl: string;
}

function ServiceCard({ servico, index, whatsappUrl }: ServiceCardProps) {
  const precoExibicao = formatServicePrice(servico.id, precosConfig);

  return (
    <ScrollReveal
      delay={getStaggerDelay(index, 0.08)}
      className="flex"
    >
      <article className="group flex w-full flex-col overflow-hidden rounded-2xl border border-[#E2D6CB] bg-[#FAF7F4] shadow-[0_1px_2px_0_rgba(28,25,23,0.04)] transition-[transform,translate,scale,box-shadow,border-color] duration-[380ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1.5 hover:scale-[1.02] hover:border-[#C4A276]/80 hover:shadow-[0_20px_38px_-14px_rgba(28,25,23,0.16),0_8px_18px_-6px_rgba(142,82,88,0.12)] focus-within:-translate-y-1.5 focus-within:scale-[1.02] focus-within:border-[#C4A276]/80 focus-within:shadow-[0_20px_38px_-14px_rgba(28,25,23,0.16),0_8px_18px_-6px_rgba(142,82,88,0.12)] motion-reduce:transition-none motion-reduce:hover:translate-y-0 motion-reduce:hover:scale-100 motion-reduce:focus-within:translate-y-0 motion-reduce:focus-within:scale-100">
        <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#ECE1D8]">
          {servico.imagem ? (
            <>
              <OptimizedPicture
                src={servico.imagem}
                alt={servico.alt}
                sizes="(min-width: 1024px) 265px, (min-width: 640px) 45vw, 92vw"
                width={720}
                height={900}
                loading="lazy"
                pictureClassName="block h-full w-full"
                className="h-full w-full object-cover transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06] group-focus-within:scale-[1.06] motion-reduce:transition-none motion-reduce:group-hover:scale-100 motion-reduce:group-focus-within:scale-100"
              />
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#1C1917]/15 via-transparent to-transparent opacity-0 transition-opacity duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:opacity-100 group-focus-within:opacity-100 motion-reduce:transition-none"
              />
            </>
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
              className="inline-flex min-h-[44px] w-full items-center justify-center gap-1.5 rounded-lg border border-[#8E5258]/35 bg-white px-3.5 py-2.5 text-center text-xs font-medium text-[#754046] transition-colors duration-200 hover:border-[#8E5258] hover:bg-[#8E5258] hover:text-white"
            >
              <WhatsAppIcon className="h-3.5 w-3.5 shrink-0" />
              <span>Consultar valores pelo WhatsApp</span>
              <ArrowUpRight className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
            </a>
          </div>
        </div>
      </article>
    </ScrollReveal>
  );
}

export function ServicesSection() {
  const [priceModalOpen, setPriceModalOpen] = useState(false);
  const [hasLoadedPriceModal, setHasLoadedPriceModal] = useState(false);
  const priceButtonRef = useRef<HTMLButtonElement>(null);
  const whatsappUrl = buildWhatsAppUrl();

  const handleOpenPriceModal = () => {
    setHasLoadedPriceModal(true);
    setPriceModalOpen(true);
  };

  return (
    <FadeInSection
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
                onMouseEnter={() => void loadPriceListModal()}
                onFocus={() => void loadPriceListModal()}
                onClick={handleOpenPriceModal}
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

      {hasLoadedPriceModal && (
        <Suspense fallback={null}>
          <PriceListModal
            isOpen={priceModalOpen}
            onClose={() => setPriceModalOpen(false)}
            openerRef={priceButtonRef}
          />
        </Suspense>
      )}
    </FadeInSection>
  );
}
