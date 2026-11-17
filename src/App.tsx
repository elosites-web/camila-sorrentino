import { MotionConfig } from 'motion/react';
import { useEffect } from 'react';
import { AboutSection } from './components/AboutSection';
import { ContactSection } from './components/ContactSection';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';
import { GallerySection } from './components/GallerySection';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { ScrollProgress } from './components/ScrollProgress';
import { SectionDivider } from './components/SectionDivider';
import { ServicesSection } from './components/ServicesSection';
import { TrainingSection } from './components/TrainingSection';
import { WhatsAppFloat } from './components/WhatsAppFloat';
import { enderecoConfig } from './config/endereco';
import { observeCoreImagePerformance } from './utils/imagePerformance';
import { buildLocalBusinessJsonLd } from './utils/seo';

export default function App() {
  const jsonLd = buildLocalBusinessJsonLd(enderecoConfig);

  useEffect(() => {
    return observeCoreImagePerformance();
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen overflow-x-clip bg-[#FAF7F4] text-[#1C1917]">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        <a
          href="#conteudo-principal"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-[#8E5258] focus:px-4 focus:py-2.5 focus:text-sm focus:font-medium focus:text-white"
        >
          Ir para o conteúdo principal
        </a>

        <ScrollProgress />
        <Header />

        <main id="conteudo-principal">
          <HeroSection />
          <ServicesSection />
          <SectionDivider tone="warm-to-light" />
          <GallerySection />
          <SectionDivider tone="light-to-warm" />
          <AboutSection />
          <SectionDivider tone="warm-to-light" />
          <TrainingSection />
          <SectionDivider tone="light-to-warm" />
          <FaqSection />
          <ContactSection />
        </main>

        <Footer />
        <WhatsAppFloat />
      </div>
    </MotionConfig>
  );
}
