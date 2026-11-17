import assert from 'node:assert/strict';
import test from 'node:test';
import { siteConfig } from '../config/site';
import {
  getActiveLightboxItem,
  getNextLightboxIndex,
  getPrevLightboxIndex,
} from './lightbox';

test('siteConfig.trabalhos includes all 13 items ending with trabalho-13.jpg', () => {
  assert.equal(siteConfig.trabalhos.length, 13);
  assert.equal(siteConfig.trabalhos[12].id, 'trabalho-13');
  assert.equal(siteConfig.trabalhos[12].imagem, '/images/trabalho-13.jpg');
});

test('getNextLightboxIndex cycles cleanly across all 13 items including wrap-around', () => {
  const total = siteConfig.trabalhos.length;
  assert.equal(getNextLightboxIndex(0, total), 1);
  assert.equal(getNextLightboxIndex(11, total), 12);
  assert.equal(getNextLightboxIndex(12, total), 0);
});

test('getPrevLightboxIndex cycles backward cleanly across all 13 items including wrap-around', () => {
  const total = siteConfig.trabalhos.length;
  assert.equal(getPrevLightboxIndex(0, total), 12);
  assert.equal(getPrevLightboxIndex(12, total), 11);
  assert.equal(getPrevLightboxIndex(1, total), 0);
});

test('lightbox helpers handle empty or out-of-bounds indices safely', () => {
  assert.equal(getNextLightboxIndex(0, 0), null);
  assert.equal(getPrevLightboxIndex(0, 0), null);
  assert.equal(getNextLightboxIndex(13, 13), null);
  assert.equal(getPrevLightboxIndex(-1, 13), null);
  assert.equal(getActiveLightboxItem(siteConfig.trabalhos, null), null);
  assert.equal(getActiveLightboxItem(siteConfig.trabalhos, 13), null);
  assert.equal(getActiveLightboxItem(siteConfig.trabalhos, 12)?.id, 'trabalho-13');
});
