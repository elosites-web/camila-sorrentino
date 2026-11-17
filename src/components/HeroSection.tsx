import { ArrowRight } from 'lucide-react';
import { siteConfig } from '../config/site';
import { buildWhatsAppUrl } from '../utils/formatting';
import { FadeInSection } from './FadeInSection';
import { OptimizedPicture } from './OptimizedPicture';
import { ScrollReveal } from './ScrollReveal';
import { WhatsAppIcon } from './SocialIcons';

export function HeroSection() {
  const whatsappUrl = buildWhatsAppUrl();

  return (
    <FadeInSection
      id="inicio"
      immediate
      className="relative overflow-hidden bg-[#FAF7F4] pb-14 pt-6 sm:pb-20 sm:pt-12 lg:pb-24 lg:pt-14"
    >
      <div className="mx-auto grid max-w-6xl items-center gap-8 px-4 sm:gap-10 sm:px-6 lg:grid-cols-12 lg:gap-14 lg:px-8">
        <ScrollReveal
          immediate
          className="order-2 flex flex-col items-start lg:order-1 lg:col-span-6"
        >
          <div className="mb-5 flex flex-wrap items-center gap-x-3 gap-y-1.5">
            <span className="font-serif text-xl font-medium tracking-tight text-[#1C1917] sm:text-2xl">
              {siteConfig.profissional}
            </span>
            <span aria-hidden="true" className="h-px w-6 bg-[#C4A276]" />
            <span className="text-xs font-medium tracking-[0.2em] text-[#785C57] uppercase">
              {siteConfig.subtituloMarca}
            </span>
          </div>

          <p className="mb-3.5 flex items-center gap-1.5 text-[10.5px] font-medium tracking-[0.05em] text-[#8E5258] uppercase max-sm:whitespace-nowrap max-[359px]:text-[9.5px] max-[359px]:tracking-[0.03em] sm:gap-2 sm:text-xs sm:tracking-[0.18em]">
            <span aria-hidden="true" className="shrink-0 text-[#C4A276]">
              ·
            </span>
            <span className="shrink-0">Atendimento com hora marcada</span>
          </p>

          <h1 className="max-w-xl text-balance font-serif text-[2.05rem] font-medium leading-[1.09] tracking-tight text-[#1C1917] sm:text-5xl lg:text-[3.4rem]">
            Unhas cuidadas nos mínimos detalhes para realçar sua elegância natural.
          </h1>

          <p className="mt-4 max-w-lg text-base leading-relaxed text-[#524946] sm:mt-6 sm:text-lg">
            Atendimento personalizado em nail design em {siteConfig.cidade}, unindo técnica,
            delicadeza e acabamento sofisticado em cada sessão.
          </p>

          <div className="mt-7 flex w-full flex-col gap-3 sm:mt-9 sm:w-auto sm:flex-row sm:items-center sm:gap-3.5">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[48px] items-center justify-center gap-2.5 whitespace-nowrap rounded-lg bg-[#8E5258] px-7 py-3.5 text-sm font-medium text-white transition-colors duration-200 hover:bg-[#754046]"
            >
              <WhatsAppIcon className="h-4 w-4 shrink-0" />
              <span>Agendar pelo WhatsApp</span>
              <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
            </a>

            <a
              href="#servicos"
              className="inline-flex min-h-[48px] items-center justify-center whitespace-nowrap rounded-lg border border-[#1C1917]/20 bg-transparent px-6 py-3.5 text-sm font-medium text-[#1C1917] transition-colors duration-200 hover:border-[#8E5258] hover:bg-[#F3ECE6]"
            >
              Conhecer os serviços
            </a>
          </div>
        </ScrollReveal>

        <ScrollReveal
          immediate
          className="order-1 lg:order-2 lg:col-span-6"
        >
          <div className="relative mx-auto max-w-[330px] sm:max-w-md lg:max-w-none">
            <div className="overflow-hidden rounded-t-[140px] rounded-b-2xl border border-[#DFD2C7] bg-[#EFE6DF] p-2 sm:rounded-t-[190px] sm:p-3">
              <div className="overflow-hidden rounded-t-[132px] rounded-b-xl sm:rounded-t-[178px]">
                <OptimizedPicture
                  src={siteConfig.imagens.hero}
                  alt={siteConfig.imagens.heroAlt}
                  sizes="(min-width: 1024px) 532px, (min-width: 640px) 448px, 330px"
                  loading="eager"
                  decoding="sync"
                  fetchPriority="high"
                  className="aspect-[5/4] w-full object-cover object-[center_35%] lg:aspect-square"
                />
              </div>
            </div>
            <div className="mt-3 flex items-center justify-between px-1 text-xs text-[#6B5E59] sm:mt-4">
              <span>
                {siteConfig.profissional} · {siteConfig.subtituloMarca}
              </span>
              <span aria-hidden="true" className="mx-3 h-px flex-1 bg-[#DFD2C7]" />
              <span>{siteConfig.cidade}</span>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </FadeInSection>
  );
}
