import assert from 'node:assert/strict';
import test from 'node:test';
import { getResponsiveImageSources } from './responsiveImage';

test('hero image provides AVIF and WebP srcset variants while keeping original fallback', () => {
  const hero = getResponsiveImageSources('/assets/aistudio/trabalho-11_a3b5ebb1.jpg');
  assert.ok(hero);
  assert.equal(hero.fallbackSrc, '/assets/aistudio/trabalho-11_a3b5ebb1.jpg');
  assert.equal(hero.width, 1215);
  assert.equal(hero.height, 2160);
  assert.equal(
    hero.avifSrcSet,
    '/assets/opt/hero-480w.avif 480w, /assets/opt/hero-800w.avif 800w, /assets/opt/hero-1215w.avif 1215w',
  );
  assert.equal(
    hero.webpSrcSet,
    '/assets/opt/hero-480w.webp 480w, /assets/opt/hero-800w.webp 800w, /assets/opt/hero-1215w.webp 1215w',
  );
});

test('logo uses WebP variants with alpha transparency and excludes broken AVIF', () => {
  const logo = getResponsiveImageSources('/assets/aistudio/logo-preto_669f957b.png');
  assert.ok(logo);
  assert.equal(logo.avifSrcSet, undefined);
  assert.equal(
    logo.webpSrcSet,
    '/assets/opt/logo-preto-320w.webp 320w, /assets/opt/logo-preto-640w.webp 640w',
  );
});

test('gallery splits small thumbnail variants from on-demand lightbox full-resolution variants', () => {
  const thumb = getResponsiveImageSources('/assets/aistudio/trabalho-02_ee986ead.jpg', 'thumb');
  const lightbox = getResponsiveImageSources('/assets/aistudio/trabalho-02_ee986ead.jpg', 'lightbox');

  assert.ok(thumb);
  assert.ok(lightbox);
  assert.equal(
    thumb.webpSrcSet,
    '/assets/opt/trabalho-02-320w.webp 320w, /assets/opt/trabalho-02-520w.webp 520w',
  );
  assert.equal(lightbox.webpSrcSet, '/assets/opt/trabalho-02-1200w.webp 1200w');
});

test('unknown image path returns null safely', () => {
  assert.equal(getResponsiveImageSources('/images/unknown.jpg'), null);
});
