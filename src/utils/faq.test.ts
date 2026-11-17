import assert from 'node:assert/strict';
import test from 'node:test';
import { siteConfig } from '../config/site';
import { toggleFaqId } from './faq';

test('toggleFaqId opens closed items, switches active items, and collapses open items', () => {
  assert.equal(toggleFaqId(null, 'duvida-01'), 'duvida-01');
  assert.equal(toggleFaqId('duvida-01', 'duvida-02'), 'duvida-02');
  assert.equal(toggleFaqId('duvida-02', 'duvida-02'), null);
  assert.equal(toggleFaqId('duvida-01', ''), 'duvida-01');
});

test('siteConfig.duvidasFrequentes covers preparation, durability, and aftercare without invented claims', () => {
  const items = siteConfig.duvidasFrequentes;
  assert.ok(items.length >= 3);

  const combinedText = items
    .map((item) => `${item.categoria} ${item.pergunta} ${item.resposta}`)
    .join(' ')
    .toLowerCase();

  assert.ok(combinedText.includes('preparo'));
  assert.ok(combinedText.includes('durabilidade'));
  assert.ok(combinedText.includes('cuidados'));
  assert.equal(combinedText.includes('bruno10'), false);
  assert.equal(combinedText.includes('[preencher]'), false);
});
