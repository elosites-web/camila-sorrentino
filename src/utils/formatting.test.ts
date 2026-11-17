import test from 'node:test';
import assert from 'node:assert/strict';
import {
  buildGoogleMapsDirectionsUrl,
  buildGoogleMapsEmbedUrl,
  buildMapsSearchUrl,
  buildPriceListRows,
  buildWazeDirectionsUrl,
  buildWhatsAppUrl,
  formatEnderecoCompleto,
  formatEnderecoLinha,
  formatServicePrice,
} from './formatting';
import { buildLocalBusinessJsonLd } from './seo';
import { enderecoConfig } from '../config/endereco';
import { siteConfig } from '../config/site';
import type { EnderecoConfig } from '../config/endereco';
import type { PrecosConfig } from '../config/precos';

test('buildWhatsAppUrl encodes the prefilled consultation message', () => {
  const url = buildWhatsAppUrl();
  assert.ok(url.startsWith('https://wa.me/5511911764182?text='));
  const decoded = decodeURIComponent(url.split('?text=')[1] ?? '');
  assert.equal(
    decoded,
    'Olá! Conheci seu trabalho pelo site e gostaria de consultar informações sobre os serviços e agendamento.',
  );
});

test('formatServicePrice hides prices when mostrarPrecos is false or value is null/zero', () => {
  const hiddenConfig: PrecosConfig = {
    confirmado: false,
    mostrarPrecos: false,
    valores: { alongamento: 180, manutencao: 120, gel: 90, pes: 80 },
  };
  assert.equal(formatServicePrice('alongamento', hiddenConfig), null);

  const nullValueConfig: PrecosConfig = {
    confirmado: false,
    mostrarPrecos: true,
    valores: { alongamento: null, manutencao: 0, gel: -10, pes: 95 },
  };
  assert.equal(formatServicePrice('alongamento', nullValueConfig), null);
  assert.equal(formatServicePrice('manutencao', nullValueConfig), null);
  assert.equal(formatServicePrice('gel', nullValueConfig), null);
  assert.equal(formatServicePrice('pes', nullValueConfig), 'a partir de R$ 95');
});

test('buildPriceListRows maps all services and respects mostrarPrecos without placeholders', () => {
  const hiddenRows = buildPriceListRows(siteConfig.servicos, {
    confirmado: false,
    mostrarPrecos: false,
    valores: { alongamento: null, manutencao: null, gel: null, pes: null },
  });
  assert.equal(hiddenRows.length, 4);
  assert.ok(hiddenRows.every((row) => row.precoTexto === null && row.disponivel === false));

  const visibleRows = buildPriceListRows(siteConfig.servicos, {
    confirmado: true,
    mostrarPrecos: true,
    valores: { alongamento: 180, manutencao: 110, gel: 95, pes: null },
  });
  assert.equal(visibleRows[0]?.precoTexto, 'a partir de R$ 180');
  assert.equal(visibleRows[0]?.disponivel, true);
  assert.equal(visibleRows[2]?.precoTexto, null);
  assert.equal(visibleRows[2]?.disponivel, false);
});

test('formatEnderecoLinha and buildMapsSearchUrl respect mostrarEndereco and confirmado flags', () => {
  const provisional: EnderecoConfig = {
    rua: 'Rua Exemplo',
    numero: '123',
    bairro: 'Centro',
    cidade: 'Jundiaí',
    estado: 'SP',
    confirmado: false,
    mostrarEndereco: true,
  };
  assert.equal(formatEnderecoLinha(provisional), 'Rua Exemplo, 123 – Centro, Jundiaí/SP');
  assert.equal(buildMapsSearchUrl(provisional), null);

  const hidden: EnderecoConfig = { ...provisional, mostrarEndereco: false };
  assert.equal(formatEnderecoLinha(hidden), null);

  const confirmed: EnderecoConfig = { ...provisional, confirmado: true };
  assert.ok(buildMapsSearchUrl(confirmed)?.includes('google.com/maps/search'));
});

test('buildLocalBusinessJsonLd includes only confirmed data and omits unconfirmed address', () => {
  const provisional: EnderecoConfig = {
    rua: 'Rua Exemplo',
    numero: '123',
    bairro: 'Centro',
    cidade: 'Jundiaí',
    estado: 'SP',
    confirmado: false,
    mostrarEndereco: true,
  };
  const schemaProvisional = buildLocalBusinessJsonLd(provisional);
  assert.equal(schemaProvisional.name, 'Camila Sorrentino – Nail Designer');
  assert.equal(schemaProvisional.telephone, '+55 11 91176-4182');
  assert.equal(schemaProvisional.areaServed.name, 'Jundiaí');
  assert.deepEqual(schemaProvisional.sameAs, [
    'https://www.instagram.com/cah_sorrentinonails_/',
    'https://www.threads.com/@cah_sorrentinonails_',
  ]);
  assert.equal('address' in schemaProvisional, false);

  const confirmedSchema = buildLocalBusinessJsonLd({ ...provisional, confirmado: true });
  assert.equal(confirmedSchema.address?.addressLocality, 'Jundiaí');
  assert.equal(confirmedSchema.address?.addressRegion, 'SP');
});

test('official enderecoConfig formats complete address and builds Google Maps and Waze links', () => {
  assert.equal(enderecoConfig.confirmado, true);
  assert.equal(
    formatEnderecoCompleto(enderecoConfig),
    'Av. Ângelo Riveli, 542 – Jardim da Fonte, Jundiaí – SP',
  );

  const encoded = encodeURIComponent('Av. Ângelo Riveli, 542 – Jardim da Fonte, Jundiaí – SP');
  assert.equal(
    buildGoogleMapsDirectionsUrl(enderecoConfig),
    `https://www.google.com/maps/dir/?api=1&destination=${encoded}`,
  );
  assert.equal(
    buildWazeDirectionsUrl(enderecoConfig),
    `https://waze.com/ul?q=${encoded}&navigate=yes`,
  );
  assert.equal(
    buildGoogleMapsEmbedUrl(enderecoConfig),
    `https://www.google.com/maps?q=${encoded}&hl=pt-BR&z=16&output=embed`,
  );
});
