export type ImageVariantMode = 'default' | 'thumb' | 'lightbox';

export interface ResponsiveImageConfig {
  key: string;
  width: number;
  height: number;
  widths: readonly number[];
  thumbWidths?: readonly number[];
  lightboxWidths?: readonly number[];
  hasAvif: boolean;
}

export interface ResponsiveImageSources {
  avifSrcSet?: string;
  webpSrcSet: string;
  fallbackSrc: string;
  width: number;
  height: number;
}

const IMAGE_MANIFEST: Record<string, ResponsiveImageConfig> = {
  '/assets/aistudio/logo-preto_669f957b.png': {
    key: 'logo-preto',
    width: 1600,
    height: 995,
    widths: [320, 640],
    hasAvif: false,
  },
  '/assets/aistudio/trabalho-11_a3b5ebb1.jpg': {
    key: 'hero',
    width: 1215,
    height: 2160,
    widths: [480, 800, 1215],
    hasAvif: true,
  },
  '/assets/aistudio/servico-alongamento_aab537df.jpg': {
    key: 'servico-alongamento',
    width: 1600,
    height: 1600,
    widths: [400, 720],
    hasAvif: false,
  },
  '/assets/aistudio/servico-gel_5e825312.jpg': {
    key: 'servico-gel',
    width: 900,
    height: 1600,
    widths: [400, 720],
    hasAvif: false,
  },
  '/images/servico-pes.jpg': {
    key: 'servico-pes',
    width: 720,
    height: 900,
    widths: [400, 720],
    hasAvif: false,
  },
  '/assets/aistudio/servico-manutencao_520a1e7d.jpg': {
    key: 'servico-manutencao',
    width: 900,
    height: 1600,
    widths: [400, 720],
    hasAvif: false,
  },
  '/images/camila.jpg': {
    key: 'camila',
    width: 1400,
    height: 1750,
    widths: [480, 800],
    hasAvif: false,
  },
  '/assets/aistudio/espaco-01_6fff77b0.jpg': {
    key: 'espaco-01',
    width: 901,
    height: 1600,
    widths: [320, 560],
    hasAvif: false,
  },
  '/assets/aistudio/espaco-02_5e2c2870.jpg': {
    key: 'espaco-02',
    width: 720,
    height: 1280,
    widths: [320, 560],
    hasAvif: false,
  },
  '/assets/aistudio/formacao-parede_9bebe613.jpg': {
    key: 'formacao-parede',
    width: 718,
    height: 691,
    widths: [480, 718],
    hasAvif: false,
  },
  '/assets/aistudio/trabalho-12_684a93ee.jpg': {
    key: 'trabalho-01',
    width: 900,
    height: 1600,
    widths: [480, 760, 900],
    thumbWidths: [480, 760],
    lightboxWidths: [900],
    hasAvif: false,
  },
  '/assets/aistudio/trabalho-02_ee986ead.jpg': {
    key: 'trabalho-02',
    width: 1600,
    height: 1600,
    widths: [320, 520, 1200],
    thumbWidths: [320, 520],
    lightboxWidths: [1200],
    hasAvif: false,
  },
  '/assets/aistudio/trabalho-03_42176128.jpg': {
    key: 'trabalho-03',
    width: 900,
    height: 1600,
    widths: [320, 520, 900],
    thumbWidths: [320, 520],
    lightboxWidths: [900],
    hasAvif: false,
  },
  '/assets/aistudio/trabalho-04_75133585.jpg': {
    key: 'trabalho-04',
    width: 900,
    height: 1600,
    widths: [320, 520, 900],
    thumbWidths: [320, 520],
    lightboxWidths: [900],
    hasAvif: false,
  },
  '/assets/aistudio/trabalho-05_3bdeaabb.jpg': {
    key: 'trabalho-05',
    width: 900,
    height: 1600,
    widths: [320, 520, 900],
    thumbWidths: [320, 520],
    lightboxWidths: [900],
    hasAvif: false,
  },
  '/assets/aistudio/trabalho-06_5ac404e4.jpg': {
    key: 'trabalho-06',
    width: 900,
    height: 1600,
    widths: [320, 520, 900],
    thumbWidths: [320, 520],
    lightboxWidths: [900],
    hasAvif: false,
  },
  '/assets/aistudio/trabalho-07_f54cdbb3.jpg': {
    key: 'trabalho-07',
    width: 900,
    height: 1600,
    widths: [320, 520, 900],
    thumbWidths: [320, 520],
    lightboxWidths: [900],
    hasAvif: false,
  },
  '/assets/aistudio/trabalho-08_cb6e0cc5.jpg': {
    key: 'trabalho-08',
    width: 900,
    height: 1600,
    widths: [320, 520, 900],
    thumbWidths: [320, 520],
    lightboxWidths: [900],
    hasAvif: false,
  },
  '/assets/aistudio/trabalho-09_e902d39f.jpg': {
    key: 'trabalho-09',
    width: 900,
    height: 1600,
    widths: [320, 520, 900],
    thumbWidths: [320, 520],
    lightboxWidths: [900],
    hasAvif: false,
  },
  '/assets/aistudio/trabalho-10_c5a7a624.jpg': {
    key: 'trabalho-10',
    width: 900,
    height: 1600,
    widths: [320, 520, 900],
    thumbWidths: [320, 520],
    lightboxWidths: [900],
    hasAvif: false,
  },
  '/assets/aistudio/hero_01b6af04.jpg': {
    key: 'trabalho-11',
    width: 1600,
    height: 1600,
    widths: [320, 520, 1200],
    thumbWidths: [320, 520],
    lightboxWidths: [1200],
    hasAvif: false,
  },
  '/assets/aistudio/trabalho-01_385caba4.jpg': {
    key: 'trabalho-12',
    width: 900,
    height: 1600,
    widths: [320, 520, 900],
    thumbWidths: [320, 520],
    lightboxWidths: [900],
    hasAvif: false,
  },
  '/images/trabalho-13.jpg': {
    key: 'trabalho-13',
    width: 720,
    height: 900,
    widths: [320, 520, 720],
    thumbWidths: [320, 520],
    lightboxWidths: [720],
    hasAvif: false,
  },
};

function selectWidths(
  entry: ResponsiveImageConfig,
  mode: ImageVariantMode,
): readonly number[] {
  if (mode === 'thumb' && entry.thumbWidths?.length) {
    return entry.thumbWidths;
  }
  if (mode === 'lightbox' && entry.lightboxWidths?.length) {
    return entry.lightboxWidths;
  }
  return entry.widths;
}

export function getResponsiveImageSources(
  src: string,
  mode: ImageVariantMode = 'default',
): ResponsiveImageSources | null {
  const entry = IMAGE_MANIFEST[src];
  if (!entry) {
    return null;
  }

  const widths = selectWidths(entry, mode);
  const webpSrcSet = widths
    .map((w) => `/assets/opt/${entry.key}-${w}w.webp ${w}w`)
    .join(', ');

  const avifSrcSet = entry.hasAvif
    ? widths.map((w) => `/assets/opt/${entry.key}-${w}w.avif ${w}w`).join(', ')
    : undefined;

  return {
    avifSrcSet,
    webpSrcSet,
    fallbackSrc: src,
    width: entry.width,
    height: entry.height,
  };
}
