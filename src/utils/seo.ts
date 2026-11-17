import type { EnderecoConfig } from '../config/endereco';
import { siteConfig } from '../config/site';

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
