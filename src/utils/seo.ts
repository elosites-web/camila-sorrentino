import type { EnderecoConfig } from '../config/endereco';
import { siteConfig } from '../config/site';

export const OG_IMAGE_PATH = '/images/og-camila-sorrentino-logo-oficial.png';

export function normalizeSiteUrl(rawUrl?: string | null): string {
  const trimmed = rawUrl?.trim();
  if (!trimmed) {
    return '';
  }

  try {
    const parsed = new URL(trimmed);
    if (parsed.protocol !== 'https:' && parsed.protocol !== 'http:') {
      return '';
    }
    return parsed.origin;
  } catch {
    return '';
  }
}

export function resolveOgImageUrl(
  assetPath: string = OG_IMAGE_PATH,
  siteUrl?: string | null,
): string {
  const normalizedPath = assetPath.startsWith('/') ? assetPath : `/${assetPath}`;
  const origin = normalizeSiteUrl(siteUrl);
  return origin ? `${origin}${normalizedPath}` : normalizedPath;
}

export interface LocalBusinessJsonLd {
  '@context': 'https://schema.org';
  '@type': 'NailSalon';
  name: string;
  telephone: string;
  areaServed: {
    '@type': 'City';
    name: string;
    containedInPlace: {
      '@type': 'State';
      name: string;
    };
  };
  sameAs: string[];
  address?: {
    '@type': 'PostalAddress';
    streetAddress: string;
    addressLocality: string;
    addressRegion: string;
    addressCountry: string;
  };
}

export function buildLocalBusinessJsonLd(endereco: EnderecoConfig): LocalBusinessJsonLd {
  const schema: LocalBusinessJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'NailSalon',
    name: siteConfig.marca,
    telephone: siteConfig.telefoneSchema,
    areaServed: {
      '@type': 'City',
      name: endereco.cidade,
      containedInPlace: {
        '@type': 'State',
        name: endereco.estado,
      },
    },
    sameAs: [siteConfig.instagramUrl, siteConfig.threadsUrl],
  };

  if (endereco.confirmado && endereco.mostrarEndereco) {
    schema.address = {
      '@type': 'PostalAddress',
      streetAddress: `${endereco.rua}, ${endereco.numero} - ${endereco.bairro}`,
      addressLocality: endereco.cidade,
      addressRegion: endereco.estado,
      addressCountry: 'BR',
    };
  }

  return schema;
}
