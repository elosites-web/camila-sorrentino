import { ArrowUpRight, Instagram, MapPin, MessageCircle } from 'lucide-react';
import { enderecoConfig } from '../config/endereco';
import { siteConfig } from '../config/site';
import {
  buildMapsSearchUrl,
  buildWhatsAppUrl,
  formatEnderecoLinha,
} from '../utils/formatting';
import { ScrollReveal } from './ScrollReveal';

export function ContactSection() {
  const whatsappUrl = buildWhatsAppUrl();
  const enderecoLinha = formatEnderecoLinha(enderecoConfig);
  const mapsUrl = buildMapsSearchUrl(enderecoConfig);

  return (
    <section
      id="contato"
      className="bg-[#1C1917] py-20 text-[#FAF7F4] sm:py-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-start lg:gap-14">
          <ScrollReveal className="lg:col-span-7">
            <p className="text-xs font-medium tracking-[0.18em] text-[#D7B98E] uppercase">
              Agendamento
            </p>
            <h2 className="mt-3 text-balance font-serif text-3xl font-medium tracking-tight text-white sm:text-4xl lg:text-[2.85rem]">
              Pronta para agendar o seu horário?
            </h2>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-[#D8CFC8]">
              Entre em contato diretamente pelo WhatsApp para consultar disponibilidade,
              tirar dúvidas sobre os serviços e combinar o melhor horário para você.
            </p>

            <div className="mt-8 flex flex-col gap-3.5 sm:flex-row sm:flex-wrap sm:items-center">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[48px] items-center justify-center gap-2.5 whitespace-nowrap rounded-lg bg-[#8E5258] px-7 py-3.5 text-sm font-medium text-white transition-colors duration-200 hover:bg-[#A6636A]"
              >
                <MessageCircle className="h-4 w-4" aria-hidden="true" />
                <span>Chamar no WhatsApp · {siteConfig.telefoneExibicao}</span>
              </a>

              <a
                href={siteConfig.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[48px] items-center justify-center gap-2 whitespace-nowrap rounded-lg border border-white/20 bg-white/5 px-5 py-3.5 text-sm font-medium text-[#FAF7F4] transition-colors duration-200 hover:border-[#D7B98E] hover:bg-white/10"
              >
                <Instagram className="h-4 w-4 text-[#D7B98E]" aria-hidden="true" />
                <span>Instagram</span>
                <ArrowUpRight className="h-4 w-4 opacity-75" aria-hidden="true" />
              </a>

              <a
                href={siteConfig.threadsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[48px] items-center justify-center gap-2 whitespace-nowrap rounded-lg border border-white/20 bg-white/5 px-5 py-3.5 text-sm font-medium text-[#FAF7F4] transition-colors duration-200 hover:border-[#D7B98E] hover:bg-white/10"
              >
                <span>Threads</span>
                <ArrowUpRight className="h-4 w-4 opacity-75" aria-hidden="true" />
              </a>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1} className="lg:col-span-5">
            <div className="rounded-2xl border border-[#C4A276]/30 bg-[#25211F] p-7 sm:p-8">
              <div className="flex items-center gap-2.5 text-xs font-medium tracking-[0.16em] text-[#D7B98E] uppercase">
                <MapPin className="h-4 w-4 shrink-0" aria-hidden="true" />
                <span>Onde atendo</span>
              </div>

              {enderecoLinha ? (
                <p className="mt-4 font-serif text-2xl font-medium leading-snug text-white">
                  {enderecoLinha}
                </p>
              ) : (
                <p className="mt-4 font-serif text-2xl font-medium leading-snug text-white">
                  {siteConfig.cidade}
                </p>
              )}

              <p className="mt-3 text-sm text-[#D8CFC8]">
                Atendimento com hora marcada
              </p>

              {mapsUrl && (
                <div className="mt-6 border-t border-white/10 pt-5">
                  <a
                    href={mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-[#D7B98E] transition-colors hover:text-white"
                  >
                    <span>Ver no mapa</span>
                    <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  </a>
                </div>
              )}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
