import { ArrowUpRight } from 'lucide-react';
import { enderecoConfig } from '../config/endereco';
import { siteConfig } from '../config/site';
import { buildWhatsAppUrl, formatEnderecoLinha } from '../utils/formatting';
import { ScrollReveal } from './ScrollReveal';

export function Footer() {
  const whatsappUrl = buildWhatsAppUrl();
  const enderecoLinha = formatEnderecoLinha(enderecoConfig);

  return (
    <footer className="border-t border-[#E5D9CF] bg-[#FAF7F4] pb-20 pt-12 sm:pb-24 sm:pt-14">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal distance={16} duration={0.5}>
          <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <div className="flex flex-col items-start gap-4">
            <a
              href="#inicio"
              aria-label="Camila Sorrentino – Nail Designer, voltar ao topo"
              className="inline-block rounded-md py-1"
            >
              <img
                src={siteConfig.imagens.logoPreto}
                alt={siteConfig.marca}
                width={156}
                height={55}
                loading="lazy"
                className="h-12 w-auto object-contain"
              />
            </a>
            <p className="text-sm text-[#574E4A]">
              {enderecoLinha ?? siteConfig.cidade}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm font-medium text-[#2C2624]">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[40px] items-center gap-1 transition-colors hover:text-[#8E5258]"
            >
              <span>WhatsApp</span>
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
            <a
              href={siteConfig.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[40px] items-center gap-1 transition-colors hover:text-[#8E5258]"
            >
              <span>Instagram</span>
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
            <a
              href={siteConfig.threadsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[40px] items-center gap-1 transition-colors hover:text-[#8E5258]"
            >
              <span>Threads</span>
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
          </div>
        </div>

        <div className="mt-8 border-t border-[#E7DDD5] pt-6 text-xs text-[#6B5E59]">
          <p>© {siteConfig.profissional}</p>
        </div>
        </ScrollReveal>
      </div>
    </footer>
  );
}
