import assert from 'node:assert/strict';
import test from 'node:test';
import {
  DEFAULT_SCROLL_VIEWPORT,
  EDITORIAL_EASE,
  SCROLL_PROGRESS_SPRING,
  calculateScrollProgress,
  createCardInteractionVariants,
  createFadeSlideUpVariants,
  getStaggerDelay,
} from './motion';

test('createFadeSlideUpVariants enables fade-in and slide-up when reducedMotion is false', () => {
  const variants = createFadeSlideUpVariants({
    reducedMotion: false,
    distance: 24,
    duration: 0.65,
    delay: 0.12,
  });

  assert.deepEqual(variants.hidden, { opacity: 0, y: 24 });
  assert.deepEqual(variants.visible, {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      delay: 0.12,
      ease: EDITORIAL_EASE,
    },
  });
});

test('createFadeSlideUpVariants disables opacity hide, displacement, and duration when reducedMotion is true', () => {
  const variants = createFadeSlideUpVariants({
    reducedMotion: true,
    distance: 24,
    duration: 0.65,
    delay: 0.2,
  });

  assert.deepEqual(variants.hidden, { opacity: 1, y: 0 });
  assert.deepEqual(variants.visible, {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0,
      delay: 0,
    },
  });
});

test('getStaggerDelay caps delay and returns zero for index 0 or reducedMotion', () => {
  assert.equal(getStaggerDelay(0, 0.08, 0.24, false), 0);
  assert.equal(getStaggerDelay(2, 0.08, 0.24, false), 0.16);
  assert.equal(getStaggerDelay(5, 0.08, 0.24, false), 0.24);
  assert.equal(getStaggerDelay(3, 0.08, 0.24, true), 0);
});

test('DEFAULT_SCROLL_VIEWPORT triggers once as soon as any part enters viewport', () => {
  assert.equal(DEFAULT_SCROLL_VIEWPORT.once, true);
  assert.equal(DEFAULT_SCROLL_VIEWPORT.amount, 'some');
});

test('createCardInteractionVariants applies subtle scale and shadow only when reducedMotion is false', () => {
  const normal = createCardInteractionVariants(false);
  const rest = normal.rest as { scale: number; y: number; boxShadow: string };
  const active = normal.active as { scale: number; y: number; boxShadow: string };
  assert.equal(rest.scale, 1);
  assert.equal(rest.y, 0);
  assert.ok(active.scale > 1 && active.scale <= 1.03);
  assert.ok(active.y < 0);
  assert.notEqual(active.boxShadow, rest.boxShadow);

  const reduced = createCardInteractionVariants(true);
  const reducedRest = reduced.rest as {
    scale: number;
    y: number;
    transition: { duration: number };
  };
  const reducedActive = reduced.active as {
    scale: number;
    y: number;
    boxShadow: string;
    transition: { duration: number };
  };
  assert.equal(reducedActive.scale, 1);
  assert.equal(reducedActive.y, 0);
  assert.equal(reducedActive.transition.duration, 0);
  assert.equal(reducedRest.transition.duration, 0);
});

test('calculateScrollProgress clamps values cleanly across scroll boundaries', () => {
  assert.equal(calculateScrollProgress(0, 3000, 900), 0);
  assert.equal(calculateScrollProgress(-40, 3000, 900), 0);
  assert.equal(calculateScrollProgress(1050, 3000, 900), 0.5);
  assert.equal(calculateScrollProgress(2100, 3000, 900), 1);
  assert.equal(calculateScrollProgress(2500, 3000, 900), 1);
  assert.equal(calculateScrollProgress(100, 900, 900), 0);
  assert.equal(calculateScrollProgress(Number.NaN, 3000, 900), 0);
});

test('SCROLL_PROGRESS_SPRING uses smooth damped spring parameters', () => {
  assert.ok(SCROLL_PROGRESS_SPRING.stiffness > 0);
  assert.ok(SCROLL_PROGRESS_SPRING.damping >= 20);
});

