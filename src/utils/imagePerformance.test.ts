import assert from 'node:assert/strict';
import test from 'node:test';
import {
  extractAssetPath,
  formatImageLoadMetric,
  getCoreImagePaths,
  observeCoreImagePerformance,
} from './imagePerformance';

test('getCoreImagePaths includes hero, logo, portrait, training wall, and all 4 service images', () => {
  const paths = getCoreImagePaths();
  assert.equal(paths.length, 8);
  assert.ok(paths.includes('/assets/aistudio/logo-preto_669f957b.png'));
  assert.ok(paths.includes('/assets/aistudio/trabalho-11_a3b5ebb1.jpg'));
  assert.ok(paths.includes('/images/camila.jpg'));
  assert.ok(paths.includes('/images/servico-pes.jpg'));
  assert.ok(paths.includes('/assets/aistudio/formacao-parede_9bebe613.jpg'));
});

test('extractAssetPath normalizes full URLs and relative paths cleanly', () => {
  assert.equal(
    extractAssetPath('http://localhost:3000/images/camila.jpg?v=1'),
    '/images/camila.jpg',
  );
  assert.equal(extractAssetPath('/images/servico-pes.jpg'), '/images/servico-pes.jpg');
});

test('formatImageLoadMetric filters non-img or non-core resources and rounds timings', () => {
  const corePaths = getCoreImagePaths();

  assert.equal(
    formatImageLoadMetric(
      {
        name: 'http://localhost:3000/src/main.tsx',
        initiatorType: 'script',
        duration: 12.34,
        startTime: 10,
        responseEnd: 22.34,
      },
      corePaths,
    ),
    null,
  );

  assert.equal(
    formatImageLoadMetric(
      {
        name: 'http://localhost:3000/images/trabalho-13.jpg',
        initiatorType: 'img',
        duration: 18.7,
        startTime: 50,
        responseEnd: 68.7,
      },
      corePaths,
    ),
    null,
  );

  assert.deepEqual(
    formatImageLoadMetric(
      {
        name: 'http://localhost:3000/images/camila.jpg',
        initiatorType: 'img',
        duration: 24.56,
        startTime: 100,
        responseEnd: 124.56,
        transferSize: 45120,
      },
      corePaths,
    ),
    {
      path: '/images/camila.jpg',
      durationMs: 24.6,
      responseEndMs: 124.6,
      transferSize: 45120,
    },
  );
});

test('observeCoreImagePerformance is a safe no-op in non-browser SSR/test environments', () => {
  const cleanup = observeCoreImagePerformance();
  assert.equal(typeof cleanup, 'function');
  cleanup();
});
