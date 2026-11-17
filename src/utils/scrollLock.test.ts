import assert from 'node:assert/strict';
import test from 'node:test';
import {
  applyScrollLockStyles,
  captureScrollLockSnapshot,
  restoreScrollLockStyles,
  type ScrollLockTarget,
} from './scrollLock';

function createMockTarget(initial: Partial<ScrollLockTarget['style']> = {}): ScrollLockTarget {
  return {
    style: {
      overflow: '',
      overscrollBehavior: '',
      position: '',
      top: '',
      left: '',
      right: '',
      width: '',
      touchAction: '',
      ...initial,
    },
  };
}

test('captureScrollLockSnapshot, applyScrollLockStyles, and restoreScrollLockStyles preserve scroll position and prior styles', () => {
  const html = createMockTarget({ overflow: 'visible' });
  const body = createMockTarget({ position: 'relative', touchAction: 'manipulation' });

  const snapshot = captureScrollLockSnapshot(html, body, 0, 540);
  applyScrollLockStyles(html, body, snapshot);

  assert.equal(html.style.overflow, 'hidden');
  assert.equal(html.style.overscrollBehavior, 'none');
  assert.equal(body.style.overflow, 'hidden');
  assert.equal(body.style.position, 'fixed');
  assert.equal(body.style.top, '-540px');
  assert.equal(body.style.left, '-0px');
  assert.equal(body.style.right, '0');
  assert.equal(body.style.width, '100%');
  assert.equal(body.style.touchAction, 'none');

  let restoredCoords: [number, number] | null = null;
  restoreScrollLockStyles(html, body, snapshot, (x, y) => {
    restoredCoords = [x, y];
  });

  assert.equal(html.style.overflow, 'visible');
  assert.equal(html.style.overscrollBehavior, '');
  assert.equal(body.style.overflow, '');
  assert.equal(body.style.position, 'relative');
  assert.equal(body.style.top, '');
  assert.equal(body.style.width, '');
  assert.equal(body.style.touchAction, 'manipulation');
  assert.deepEqual(restoredCoords, [0, 540]);
});
