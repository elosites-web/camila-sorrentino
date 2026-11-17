import { ArrowUpRight } from 'lucide-react';
import { Suspense, lazy, useCallback, useRef, useState } from 'react';
import { siteConfig } from '../config/site';
import { useNearViewport } from '../hooks/useNearViewport';
import { FadeInSection } from './FadeInSection';
import { OptimizedPicture } from './OptimizedPicture';
import { ScrollReveal } from './ScrollReveal';
import { InstagramIcon } from './SocialIcons';

const loadLightbox = () => import('./Lightbox');
const Lightbox = lazy(() =>
  loadLightbox().then((module) => ({ default: module.Lightbox })),
);

export function GallerySection() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const openerRef = useRef<HTMLElement | null>(null);
  const shouldLoadThumbnails = useNearViewport(sectionRef, '700px 0px');

  const handleOpen = (index: number, buttonElement: HTMLButtonElement) => {
    openerRef.current = buttonElement;
    setSelectedIndex(index);
  };

  const handleClose = useCallback(() => {
    setSelectedIndex(null);
  }, []);

  return (
    <FadeInSection
      ref={sectionRef}
      id="trabalhos"
      className="bg-[#FAF7F4] py-20 sm:py-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div className="max-w-2xl">
              <p className="text-xs font-medium tracking-[0.18em] text-[#785C57] uppercase">
                Portfólio
              </p>
              <h2 className="mt-3 text-balance font-serif text-3xl font-medium tracking-tight text-[#1C1917] sm:text-4xl lg:text-[2.75rem]">
                Trabalhos reais realizados em estúdio
              </h2>
            </div>

            <a
              href={siteConfig.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[44px] shrink-0 items-center justify-center gap-2 self-start whitespace-nowrap rounded-lg border border-[#1C1917]/20 bg-white px-5 py-2.5 text-sm font-medium text-[#1C1917] transition-colors duration-200 hover:border-[#8E5258] hover:bg-[#F4EDE6] md:self-auto"
            >
              <InstagramIcon className="h-4 w-4 shrink-0 text-[#8E5258]" />
              <span>Ver mais no Instagram</span>
              <ArrowUpRight className="h-4 w-4 shrink-0 text-[#6B5E59]" aria-hidden="true" />
            </a>
          </div>
        </ScrollReveal>

        <div className="mt-12 grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-4">
          {siteConfig.trabalhos.map((trabalho, index) => {
            const isLeadTile = index === 0;

            return (
              <button
                key={trabalho.id}
                type="button"
                onMouseEnter={() => void loadLightbox()}
                onFocus={() => void loadLightbox()}
                onClick={(event) => handleOpen(index, event.currentTarget)}
                aria-label={`Ampliar foto: ${trabalho.alt}`}
                className={`group relative w-full overflow-hidden rounded-xl border border-[#E5D9CF] bg-[#EFE6DF] text-left transition-transform duration-200 hover:-translate-y-0.5 ${
                  isLeadTile
                    ? 'col-span-2 row-span-2 aspect-[3/4] md:aspect-auto md:h-full'
                    : 'aspect-[3/4]'
                }`}
              >
                {shouldLoadThumbnails && (
                  <OptimizedPicture
                    src={trabalho.imagem}
                    alt={trabalho.alt}
                    mode="thumb"
                    sizes={
                      isLeadTile
                        ? '(min-width: 1024px) 535px, (min-width: 768px) 46vw, 92vw'
                        : '(min-width: 1024px) 258px, (min-width: 768px) 23vw, 45vw'
                    }
                    width={isLeadTile ? 900 : 600}
                    height={isLeadTile ? 1200 : 800}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                  />
                )}
                <span className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/65 via-black/20 to-transparent px-3.5 pb-3 pt-8 opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100">
                  <span className="block text-xs font-medium text-white">
                    {trabalho.categoria}
                  </span>
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {selectedIndex !== null && (
        <Suspense fallback={null}>
          <Lightbox
            items={siteConfig.trabalhos}
            currentIndex={selectedIndex}
            onClose={handleClose}
            onNavigate={setSelectedIndex}
            openerRef={openerRef}
          />
        </Suspense>
      )}
    </FadeInSection>
  );
}
