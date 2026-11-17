import { useRef, useState } from 'react';
import { siteConfig } from '../config/site';
import { Lightbox } from './Lightbox';
import { ScrollReveal } from './ScrollReveal';

export function TrainingSection() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const openerRef = useRef<HTMLElement | null>(null);

  const hasIndividualCertificates = siteConfig.certificadosIndividuais.length > 0;

  return (
    <section id="formacao" className="bg-[#FAF7F4] py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
          <ScrollReveal className="lg:col-span-5">
            <p className="text-xs font-medium tracking-[0.18em] text-[#785C57] uppercase">
              Qualificação
            </p>
            <h2 className="mt-3 text-balance font-serif text-3xl font-medium tracking-tight text-[#1C1917] sm:text-4xl">
              Formação e atualização profissional
            </h2>
            <p className="mt-5 text-base leading-relaxed text-[#4B4340]">
              Atualização constante com cursos e certificações na área de unhas.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-[#6B5E59]">
              O aperfeiçoamento contínuo reflete o compromisso com técnicas atuais,
              acabamento preciso e cuidado seguro em cada atendimento.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.1} className="lg:col-span-7">
            {hasIndividualCertificates ? (
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                {siteConfig.certificadosIndividuais.map((cert, index) => (
                  <button
                    key={cert.id}
                    type="button"
                    onClick={(event) => {
                      openerRef.current = event.currentTarget;
                      setSelectedIndex(index);
                    }}
                    aria-label={`Ampliar certificado: ${cert.alt}`}
                    className="overflow-hidden rounded-xl border border-[#E2D6CB] bg-white p-2 transition-transform duration-200 hover:-translate-y-0.5"
                  >
                    <img
                      src={cert.imagem}
                      alt={cert.alt}
                      width={400}
                      height={300}
                      loading="lazy"
                      className="aspect-[4/3] w-full rounded-lg object-cover"
                    />
                  </button>
                ))}
              </div>
            ) : (
              <div className="overflow-hidden rounded-2xl border border-[#DFD2C7] bg-white p-3">
                <img
                  src={siteConfig.imagens.formacaoParede}
                  alt={siteConfig.imagens.formacaoParedeAlt}
                  width={1000}
                  height={900}
                  loading="lazy"
                  className="aspect-[10/9] w-full rounded-xl object-cover"
                />
              </div>
            )}
          </ScrollReveal>
        </div>
      </div>

      {hasIndividualCertificates && (
        <Lightbox
          items={siteConfig.certificadosIndividuais}
          currentIndex={selectedIndex}
          onClose={() => setSelectedIndex(null)}
          onNavigate={setSelectedIndex}
          openerRef={openerRef}
        />
      )}
    </section>
  );
}
