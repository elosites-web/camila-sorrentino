import { useRef } from 'react';
import { siteConfig } from '../config/site';
import { useNearViewport } from '../hooks/useNearViewport';
import { FadeInSection } from './FadeInSection';
import { OptimizedPicture } from './OptimizedPicture';
import { ScrollReveal } from './ScrollReveal';

export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const shouldLoadPhotos = useNearViewport(sectionRef, '700px 0px');
  const hasSpacePhotos = siteConfig.espaco.length > 0;

  return (
    <FadeInSection
      ref={sectionRef}
      id="sobre"
      className="bg-[#F4EDE6] pb-20 pt-[2px] sm:pb-24 lg:py-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <ScrollReveal className="lg:col-span-6">
            <div className="-mx-2 grid grid-cols-12 items-stretch gap-3 sm:-mx-3 sm:gap-4 lg:mx-0 lg:gap-5">
              <div className={hasSpacePhotos ? 'col-span-8 flex' : 'col-span-12'}>
                <div className="aspect-[4/5] h-full w-full overflow-hidden rounded-t-full rounded-b-2xl border border-[#DFD2C7] bg-[#FAF7F4] p-2">
                  {shouldLoadPhotos ? (
                    <OptimizedPicture
                      src={siteConfig.imagens.camila}
                      alt={siteConfig.imagens.camilaAlt}
                      sizes="(min-width: 1024px) 365px, 60vw"
                      width={800}
                      height={1000}
                      loading="lazy"
                      className="h-full w-full rounded-t-full rounded-b-xl object-cover object-top"
                    />
                  ) : (
                    <div
                      aria-hidden="true"
                      className="h-full w-full rounded-t-full rounded-b-xl bg-[#EFE6DF]"
                    />
                  )}
                </div>
              </div>

              {hasSpacePhotos && (
                <div className="col-span-4 flex flex-col gap-4">
                  {siteConfig.espaco.map((foto) => (
                    <div
                      key={foto.id}
                      className="overflow-hidden rounded-xl border border-[#DFD2C7] bg-[#FAF7F4] p-1.5"
                    >
                      <div className="aspect-[7/10] w-full overflow-hidden rounded-lg bg-[#EFE6DF] lg:aspect-[3/4]">
                        {shouldLoadPhotos && (
                          <OptimizedPicture
                            src={foto.imagem}
                            alt={foto.alt}
                            sizes="(min-width: 1024px) 175px, 30vw"
                            width={450}
                            height={600}
                            loading="lazy"
                            className="h-full w-full rounded-lg object-cover"
                          />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1} className="lg:col-span-6">
            <p className="text-xs font-medium tracking-[0.18em] text-[#785C57] uppercase">
              Sobre a profissional
            </p>
            <h2 className="mt-3 text-balance font-serif text-3xl font-medium tracking-tight text-[#1C1917] sm:text-4xl lg:text-[2.75rem]">
              Delicadeza, cuidado e atenção em cada detalhe
            </h2>

            <div className="mt-6 space-y-4 text-base leading-relaxed text-[#4B4340]">
              <p>
                Com atendimento dedicado em {siteConfig.cidade}, {siteConfig.profissional}{' '}
                realiza cada procedimento com foco em naturalidade, conforto e acabamento
                cuidadoso.
              </p>
              <p>
                Do preparo minucioso das unhas à escolha dos tons e formatos que melhor
                combinam com cada cliente, o trabalho é conduzido em ambiente acolhedor,
                organizado e pensado para proporcionar um momento tranquilo de autocuidado.
              </p>
            </div>

            <div className="mt-8 border-t border-[#DFD2C7] pt-6">
              <p className="text-sm font-medium text-[#1C1917]">
                {siteConfig.marca}
              </p>
              <p className="mt-1 text-sm text-[#6B5E59]">
                Atendimento em {siteConfig.cidade} com hora marcada
              </p>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </FadeInSection>
  );
}
