import { ArrowUpRight, MapPin, Navigation } from 'lucide-react';
import { useState } from 'react';
import { enderecoConfig } from '../config/endereco';
import { siteConfig } from '../config/site';
import {
  buildGoogleMapsDirectionsUrl,
  buildGoogleMapsEmbedUrl,
  buildWazeDirectionsUrl,
  formatEnderecoCompleto,
} from '../utils/formatting';
import { FadeInSection } from './FadeInSection';
import { OptimizedPicture } from './OptimizedPicture';
import { ScrollReveal } from './ScrollReveal';

function GoogleMapsLogo({ className = 'h-5 w-5 shrink-0' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 92.3 132.3"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      <path
        fill="#1A73E8"
        d="M60.2 2.2C55.8.8 51 0 46.1 0 32 0 19.3 6.4 10.8 16.5l21.8 18.3L60.2 2.2z"
      />
      <path
        fill="#EA4335"
        d="M10.8 16.5C4.1 24.5 0 34.9 0 46.1c0 8.7 1.7 15.7 4.6 22l28-33.3-21.8-18.3z"
      />
      <path
        fill="#4285F4"
        d="M46.2 28.5c9.8 0 17.7 7.9 17.7 17.7 0 4.3-1.6 8.3-4.2 11.4 0 0 13.9-16.6 27.5-32.7-5.6-10.8-15.3-19-27-22.7L32.6 34.8c3.3-3.8 8.1-6.3 13.6-6.3z"
      />
      <path
        fill="#FBBC04"
        d="M46.2 63.8c-9.8 0-17.7-7.9-17.7-17.7 0-4.3 1.5-8.3 4.1-11.3l-28 33.3c4.8 10.6 12.8 19.2 21 29.9l34.1-40.5c-3.3 3.9-8.1 6.3-13.5 6.3z"
      />
      <path
        fill="#34A853"
        d="M59.1 109.2c15.4-24.1 33.3-35 33.3-63 0-7.7-1.9-14.9-5.2-21.3L25.6 98c2.6 3.4 5.3 7.3 7.9 11.3 9.4 14.5 6.8 23.1 12.8 23.1s3.4-8.7 12.8-23.2z"
      />
    </svg>
  );
}

export function LocationSection() {
  const [isMapRequested, setIsMapRequested] = useState(false);
  const [isIframeLoaded, setIsIframeLoaded] = useState(false);
  const [hasMapError, setHasMapError] = useState(false);

  const enderecoCompleto = formatEnderecoCompleto(enderecoConfig);
  const googleMapsUrl = buildGoogleMapsDirectionsUrl(enderecoConfig);
  const wazeUrl = buildWazeDirectionsUrl(enderecoConfig);
  const embedUrl = buildGoogleMapsEmbedUrl(enderecoConfig);

  const handleRevealMap = () => {
    setIsMapRequested(true);
    setHasMapError(false);
  };

  return (
    <FadeInSection
      id="localizacao"
      className="bg-[#FAF7F4] py-20 sm:py-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-12">
            <div className="lg:col-span-6">
              <p className="text-xs font-medium tracking-[0.18em] text-[#785C57] uppercase">
                Localização
              </p>
              <h2 className="mt-3 text-balance font-serif text-3xl font-medium tracking-tight text-[#1C1917] sm:text-4xl lg:text-[2.75rem]">
                Onde estamos
              </h2>
              <p className="mt-4 max-w-xl text-sm leading-relaxed text-[#574E4A] sm:text-base">
                Conheça o endereço do estúdio e trace sua rota com praticidade antes do seu
                atendimento em {siteConfig.cidade}.
              </p>
            </div>

            <div className="lg:col-span-6">
              <div className="rounded-2xl border border-[#C4A276]/30 bg-[#25211F] p-7 shadow-[0_18px_44px_-26px_rgba(28,25,23,0.35)] sm:p-8">
                <div className="flex items-center gap-2.5 text-xs font-medium tracking-[0.16em] text-[#D7B98E] uppercase">
                  <MapPin className="h-4 w-4 shrink-0" aria-hidden="true" />
                  <span>Endereço do estúdio</span>
                </div>
                <p className="mt-4 font-serif text-2xl font-medium leading-snug text-white">
                  {enderecoCompleto}
                </p>
                <p className="mt-3 text-sm text-[#D8CFC8]">
                  Atendimento com hora marcada
                </p>
              </div>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.08} className="mt-10">
          <div className="relative overflow-hidden rounded-2xl border border-[#E5CFAF]/55 bg-[#F4EDE6] shadow-[0_18px_44px_-26px_rgba(28,25,23,0.28)]">
            <div className="relative h-[320px] w-full sm:h-[400px] lg:h-[440px]">
              {!isMapRequested ? (
                <button
                  type="button"
                  onClick={handleRevealMap}
                  aria-label={`Toque para visualizar o mapa de ${enderecoCompleto}`}
                  className="group relative flex h-full w-full cursor-pointer flex-col items-center justify-center overflow-hidden bg-[linear-gradient(116deg,rgba(130,72,78,0.88)_0%,rgba(142,82,88,0.85)_58%,rgba(166,116,108,0.83)_82%,rgba(204,172,129,0.80)_100%)] px-6 text-center backdrop-blur-md shadow-[inset_0_1px_0_rgba(255,248,240,0.40),inset_0_-1px_0_rgba(215,185,142,0.28)] transition-[box-shadow,filter] duration-300 hover:brightness-[1.03] focus-visible:outline-[#8E5258]"
                >
                  {/* Camadas de vidro jateado e filigrana reproduzindo o acabamento do cabeçalho */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 overflow-hidden"
                  >
                    {/* Fundo luminoso sutil para sensação de profundidade translúcida */}
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_42%,rgba(255,248,240,0.16)_0%,rgba(232,208,169,0.08)_46%,transparent_78%)]" />

                    {/* Textura microcristalina estática (mesma malha do cabeçalho) */}
                    <div className="absolute inset-0 bg-[radial-gradient(rgba(255,248,240,0.18)_0.55px,transparent_0.55px)] [background-size:3px_3px] opacity-60" />

                    {/* Reflexo diagonal acetinado no vidro */}
                    <div className="absolute inset-0 bg-[linear-gradient(104deg,rgba(255,255,255,0.18)_0%,transparent_28%,rgba(255,246,232,0.10)_52%,transparent_74%,rgba(232,208,169,0.18)_100%)]" />

                    {/* Filetes luminosos superior e inferior em palha champagne */}
                    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-[#FAF7F4]/45 via-[#E8D0A9]/75 to-[#FAF7F4]/35" />
                    <div className="absolute bottom-0 left-1/2 h-px w-64 -translate-x-1/2 bg-gradient-to-r from-transparent via-[#E8D0A9]/70 to-transparent" />

                    {/* Moldura interna delicada em champagne */}
                    <div className="absolute inset-3.5 rounded-xl border border-[#E8D0A9]/35 transition-colors duration-300 group-hover:border-[#E8D0A9]/60 sm:inset-5" />

                    {/* Gravação jateada esquerda: arcos delicados e microbrilhos */}
                    <svg
                      viewBox="0 0 180 80"
                      fill="none"
                      className="absolute -left-2 top-0 h-32 w-44 opacity-50 sm:h-40 sm:w-56"
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

                    {/* Gravação jateada direita: filigrana fluida e brilho sobre o tom champagne */}
                    <svg
                      viewBox="0 0 220 80"
                      fill="none"
                      className="absolute -right-2 bottom-0 h-32 w-52 opacity-55 sm:h-40 sm:w-64"
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

                  <div className="relative z-10 flex flex-col items-center">
                    <OptimizedPicture
                      src={siteConfig.imagens.logoPreto}
                      alt=""
                      aria-hidden="true"
                      sizes="(min-width: 640px) 220px, 180px"
                      width={220}
                      height={78}
                      loading="lazy"
                      className="pointer-events-none h-16 w-auto object-contain brightness-0 invert opacity-35 drop-shadow-[0_1px_8px_rgba(32,14,17,0.28)] transition-opacity duration-300 group-hover:opacity-45 sm:h-20"
                    />

                    <span className="mt-5 inline-flex min-h-[46px] items-center gap-2.5 rounded-full border border-[#E8D0A9]/80 bg-[#FAF7F4]/95 px-6 py-3 text-sm font-medium text-[#6B373D] shadow-[0_10px_28px_-12px_rgba(32,14,17,0.45)] transition-[background-color,border-color,color,transform] duration-200 group-hover:-translate-y-0.5 group-hover:border-[#E8D0A9] group-hover:bg-[#F3E5D0] group-hover:text-[#55282D] motion-reduce:transition-none motion-reduce:group-hover:translate-y-0">
                      <MapPin className="h-4 w-4 shrink-0" aria-hidden="true" />
                      <span>Toque para visualizar o mapa</span>
                    </span>
                  </div>
                </button>
              ) : hasMapError ? (
                <div className="flex h-full w-full flex-col items-center justify-center bg-[#F4EDE6] px-6 text-center">
                  <MapPin className="h-7 w-7 text-[#8E5258]" aria-hidden="true" />
                  <p className="mt-3 font-serif text-2xl font-medium text-[#1C1917]">
                    Não foi possível exibir o mapa incorporado
                  </p>
                  <p className="mt-2 max-w-md text-sm text-[#574E4A]">
                    Você pode abrir a localização diretamente pelo Google Maps ou pelo Waze
                    usando os botões abaixo.
                  </p>
                </div>
              ) : (
                <>
                  {!isIframeLoaded && (
                    <div
                      aria-live="polite"
                      className="pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-center gap-2 bg-[#F4EDE6]/85 text-sm text-[#574E4A]"
                    >
                      <MapPin className="h-5 w-5 text-[#8E5258]" aria-hidden="true" />
                      <span>Carregando mapa...</span>
                    </div>
                  )}

                  <iframe
                    src={embedUrl}
                    title={`Mapa interativo de localização: ${enderecoCompleto}`}
                    loading="eager"
                    referrerPolicy="no-referrer-when-downgrade"
                    allowFullScreen
                    onLoad={() => setIsIframeLoaded(true)}
                    onError={() => setHasMapError(true)}
                    className="h-full w-full border-0"
                  />

                  {/* Marca d'água discreta da identidade visual sobre o mapa */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute right-3 top-3 z-20 rounded-lg bg-[#FAF7F4]/55 px-2.5 py-1.5 sm:right-4 sm:top-4"
                  >
                    <OptimizedPicture
                      src={siteConfig.imagens.logoPreto}
                      alt=""
                      sizes="120px"
                      width={120}
                      height={42}
                      loading="lazy"
                      className="h-7 w-auto object-contain opacity-[0.14] sm:h-9"
                    />
                  </div>
                </>
              )}
            </div>
          </div>

          <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs text-[#6B5E59] sm:text-sm">
              Trace a rota até o endereço pelos aplicativos de navegação:
            </p>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[48px] items-center justify-center gap-2.5 whitespace-nowrap rounded-lg border border-[#DADCE0] bg-white px-5 py-3 text-sm font-medium text-[#1F1F1F] shadow-sm transition-colors duration-200 hover:border-[#4285F4]/50 hover:bg-[#F8FAFF]"
              >
                <GoogleMapsLogo className="h-5 w-5 shrink-0" />
                <span>Abrir no Google Maps</span>
                <ArrowUpRight className="h-4 w-4 shrink-0 text-[#5F6368]" aria-hidden="true" />
              </a>

              <a
                href={wazeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[48px] items-center justify-center gap-2.5 whitespace-nowrap rounded-lg border border-[#33CCFF] bg-[#33CCFF] px-5 py-3 text-sm font-semibold text-[#111827] shadow-sm transition-colors duration-200 hover:border-[#1AC2FA] hover:bg-[#4AD4FF]"
              >
                <Navigation className="h-4 w-4 shrink-0" aria-hidden="true" />
                <span>Abrir no Waze</span>
                <ArrowUpRight className="h-4 w-4 shrink-0 opacity-80" aria-hidden="true" />
              </a>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </FadeInSection>
  );
}
