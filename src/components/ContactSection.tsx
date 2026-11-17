import { ArrowUpRight } from 'lucide-react';
import { siteConfig } from '../config/site';
import { buildWhatsAppUrl } from '../utils/formatting';
import { FadeInSection } from './FadeInSection';
import { ScrollReveal } from './ScrollReveal';
import { InstagramIcon, ThreadsIcon, WhatsAppIcon } from './SocialIcons';

export function ContactSection() {
  const whatsappUrl = buildWhatsAppUrl();

  return (
    <FadeInSection
      id="contato"
      className="bg-[#1C1917] py-20 text-[#FAF7F4] sm:py-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-medium tracking-[0.18em] text-[#D7B98E] uppercase">
            Agendamento
          </p>
          <h2 className="mt-3 text-balance font-serif text-3xl font-medium tracking-tight text-white sm:text-4xl lg:text-[2.85rem]">
            Pronta para agendar o seu horário?
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-[#D8CFC8]">
            Entre em contato diretamente pelo WhatsApp para consultar disponibilidade,
            tirar dúvidas sobre os serviços e combinar o melhor horário para você.
          </p>

          <div className="mt-8 flex flex-col items-stretch justify-center gap-3.5 sm:flex-row sm:flex-wrap sm:items-center">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[48px] items-center justify-center gap-2.5 whitespace-nowrap rounded-lg bg-[#8E5258] px-7 py-3.5 text-sm font-medium text-white transition-colors duration-200 hover:bg-[#A6636A]"
            >
              <WhatsAppIcon className="h-4 w-4 shrink-0" />
              <span>Agendar pelo WhatsApp</span>
            </a>

            <a
              href={siteConfig.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[48px] items-center justify-center gap-2 whitespace-nowrap rounded-lg border border-white/20 bg-white/5 px-5 py-3.5 text-sm font-medium text-[#FAF7F4] transition-colors duration-200 hover:border-[#D7B98E] hover:bg-white/10"
            >
              <InstagramIcon className="h-4 w-4 shrink-0 text-[#D7B98E]" />
              <span>Instagram</span>
              <ArrowUpRight className="h-4 w-4 shrink-0 opacity-75" aria-hidden="true" />
            </a>

            <a
              href={siteConfig.threadsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[48px] items-center justify-center gap-2 whitespace-nowrap rounded-lg border border-white/20 bg-white/5 px-5 py-3.5 text-sm font-medium text-[#FAF7F4] transition-colors duration-200 hover:border-[#D7B98E] hover:bg-white/10"
            >
              <ThreadsIcon className="h-4 w-4 shrink-0 text-[#D7B98E]" />
              <span>Threads</span>
              <ArrowUpRight className="h-4 w-4 shrink-0 opacity-75" aria-hidden="true" />
            </a>
          </div>
        </ScrollReveal>
      </div>
    </FadeInSection>
  );
}
