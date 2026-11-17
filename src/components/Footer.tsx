import { ArrowUp, ArrowUpRight } from 'lucide-react';
import { HERO_ANCHOR_ID } from '../utils/anchorNavigation';
import { siteConfig } from '../config/site';
import { buildWhatsAppUrl } from '../utils/formatting';
import { OptimizedPicture } from './OptimizedPicture';
import { ScrollReveal } from './ScrollReveal';
import { InstagramIcon, ThreadsIcon, WhatsAppIcon } from './SocialIcons';

export function Footer() {
  const whatsappUrl = buildWhatsAppUrl();
  const heroHref = `#${HERO_ANCHOR_ID}`;

  return (
    <footer className="relative border-t border-[#E5D9CF] bg-[#FAF7F4] text-[#2C2624]">
      <div
        aria-hidden="true"
        className="pointer-events-none h-px w-full bg-gradient-to-r from-transparent via-[#C4A276]/60 to-transparent"
      />

      <div className="mx-auto max-w-6xl px-4 pb-20 pt-12 sm:px-6 sm:pb-24 sm:pt-14 lg:px-8">
        <ScrollReveal distance={14} duration={0.45}>
          {/* Nível principal: marca, navegação e canais sociais */}
          <div className="grid gap-10 md:grid-cols-12 md:gap-8 lg:gap-12">
            {/* Marca e localização */}
            <div className="flex flex-col items-start md:col-span-5">
              <a
                href={heroHref}
                aria-label="Camila Sorrentino – Nail Designer, voltar ao início"
                className="inline-block rounded-md py-1 focus-visible:outline-[#8E5258]"
              >
                <OptimizedPicture
                  src={siteConfig.imagens.logoPreto}
                  alt={siteConfig.marca}
                  sizes="168px"
                  width={156}
                  height={55}
                  loading="lazy"
                  className="h-12 w-auto object-contain sm:h-[52px]"
                />
              </a>

              <p className="mt-4 font-serif text-lg font-medium tracking-tight text-[#2C2624]">
                {siteConfig.profissional}
                <span className="mx-2 text-[#C4A276]" aria-hidden="true">
                  ·
                </span>
                <span className="font-normal text-[#6B5E59]">{siteConfig.subtituloMarca}</span>
              </p>

              <p className="mt-2 text-sm leading-relaxed text-[#574E4A]">
                {siteConfig.cidade}
                <span className="mx-2 text-[#C4A276]" aria-hidden="true">
                  ·
                </span>
                <span className="text-[#6B5E59]">Atendimento com hora marcada</span>
              </p>
            </div>

            {/* Navegação institucional */}
            <nav
              aria-label="Navegação do rodapé"
              className="md:col-span-4"
            >
              <p className="text-[11px] font-semibold tracking-[0.18em] text-[#7D5D35] uppercase">
                Navegação
              </p>
              <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-1.5">
                {siteConfig.navegacao.map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      className="inline-flex min-h-[36px] items-center text-sm text-[#4A413D] transition-colors duration-200 hover:text-[#8E5258] focus-visible:outline-[#8E5258] motion-reduce:transition-none"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Canais e redes sociais oficiais */}
            <div className="md:col-span-3">
              <p className="text-[11px] font-semibold tracking-[0.18em] text-[#7D5D35] uppercase">
                Canais
              </p>
              <div className="mt-4 flex flex-col gap-2.5">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex min-h-[42px] items-center justify-between rounded-xl border border-[#E5D9CF] bg-[#F4EDE6]/70 px-3.5 py-2 text-sm font-medium text-[#2C2624] transition-colors duration-200 hover:border-[#C4A276] hover:bg-[#F4EDE6] hover:text-[#8E5258] focus-visible:outline-[#8E5258] motion-reduce:transition-none"
                >
                  <span className="inline-flex items-center gap-2.5">
                    <WhatsAppIcon className="h-4 w-4 shrink-0 text-[#8E5258]" />
                    <span>WhatsApp</span>
                  </span>
                  <ArrowUpRight
                    className="h-3.5 w-3.5 shrink-0 text-[#7D5D35] transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0 motion-reduce:group-hover:translate-y-0"
                    aria-hidden="true"
                  />
                </a>

                <a
                  href={siteConfig.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex min-h-[42px] items-center justify-between rounded-xl border border-[#E5D9CF] bg-[#F4EDE6]/70 px-3.5 py-2 text-sm font-medium text-[#2C2624] transition-colors duration-200 hover:border-[#C4A276] hover:bg-[#F4EDE6] hover:text-[#8E5258] focus-visible:outline-[#8E5258] motion-reduce:transition-none"
                >
                  <span className="inline-flex items-center gap-2.5">
                    <InstagramIcon className="h-4 w-4 shrink-0 text-[#8E5258]" />
                    <span>Instagram</span>
                  </span>
                  <ArrowUpRight
                    className="h-3.5 w-3.5 shrink-0 text-[#7D5D35] transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0 motion-reduce:group-hover:translate-y-0"
                    aria-hidden="true"
                  />
                </a>

                <a
                  href={siteConfig.threadsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex min-h-[42px] items-center justify-between rounded-xl border border-[#E5D9CF] bg-[#F4EDE6]/70 px-3.5 py-2 text-sm font-medium text-[#2C2624] transition-colors duration-200 hover:border-[#C4A276] hover:bg-[#F4EDE6] hover:text-[#8E5258] focus-visible:outline-[#8E5258] motion-reduce:transition-none"
                >
                  <span className="inline-flex items-center gap-2.5">
                    <ThreadsIcon className="h-4 w-4 shrink-0 text-[#8E5258]" />
                    <span>Threads</span>
                  </span>
                  <ArrowUpRight
                    className="h-3.5 w-3.5 shrink-0 text-[#7D5D35] transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0 motion-reduce:group-hover:translate-y-0"
                    aria-hidden="true"
                  />
                </a>
              </div>
            </div>
          </div>

          {/* Nível intermediário: direitos autorais e botão Voltar ao topo */}
          <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-[#E5D9CF] pt-6 sm:mt-12 sm:flex-row">
            <p className="text-center text-xs leading-relaxed text-[#574E4A] sm:text-left">
              © 2026 Camila Sorrentino. Todos os direitos reservados.
            </p>

            <a
              href={heroHref}
              aria-label="Voltar ao topo da página"
              className="group inline-flex min-h-[40px] items-center gap-2 rounded-full border border-[#DFD2C7] bg-[#F4EDE6]/80 px-4 py-2 text-xs font-medium tracking-[0.06em] text-[#2C2624] transition-colors duration-200 hover:border-[#C4A276] hover:bg-[#F4EDE6] hover:text-[#8E5258] focus-visible:outline-[#8E5258] motion-reduce:transition-none"
            >
              <span>Voltar ao topo</span>
              <ArrowUp
                className="h-3.5 w-3.5 shrink-0 text-[#8E5258] transition-transform duration-200 group-hover:-translate-y-0.5 motion-reduce:transition-none motion-reduce:group-hover:translate-y-0"
                aria-hidden="true"
              />
            </a>
          </div>

          {/* Faixa de assinatura ēloSites */}
          <div className="mt-6 border-t border-[#EAE0D7] pt-6">
            <div className="flex flex-col items-center justify-center gap-2.5 text-center sm:flex-row sm:flex-wrap sm:gap-x-3 sm:gap-y-2">
              <span className="text-[11px] font-medium tracking-[0.14em] text-[#5F534E] uppercase">
                CRIADO E DESENVOLVIDO POR
              </span>
              <a
                href="https://elosites.ia.br"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="ēloSites – Estúdio de Desenvolvimento Web (abre em nova aba)"
                className="inline-flex items-center justify-center rounded-md px-1.5 py-1 transition-opacity duration-200 hover:opacity-80 focus-visible:outline-[#8E5258] motion-reduce:transition-none"
              >
                <img
                  src="/images/logo-elosites.png"
                  alt="ēloSites – Estúdio de Desenvolvimento Web"
                  width={1920}
                  height={476}
                  loading="lazy"
                  decoding="async"
                  className="h-[22px] w-auto shrink-0 object-contain sm:h-6"
                />
              </a>
              <span className="text-[11px] font-medium tracking-[0.14em] text-[#5F534E] uppercase">
                O MELHOR SITE PELO MELHOR PREÇO
              </span>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </footer>
  );
}
