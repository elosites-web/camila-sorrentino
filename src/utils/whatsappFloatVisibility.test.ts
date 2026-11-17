import assert from 'node:assert/strict';
import test from 'node:test';
import { shouldShowWhatsAppFloat } from './whatsappFloatVisibility.ts';

test('shouldShowWhatsAppFloat hides button while Hero is visible on desktop or mobile', () => {
  assert.equal(
    shouldShowWhatsAppFloat({ heroBottom: 760, headerBottom: 80 }),
    false,
  );
  assert.equal(
    shouldShowWhatsAppFloat({ heroBottom: 820, headerBottom: 64 }),
    false,
  );
  assert.equal(
    shouldShowWhatsAppFloat({ heroBottom: 180, headerBottom: 80 }),
    false,
  );
  assert.equal(
    shouldShowWhatsAppFloat({ heroBottom: 82, headerBottom: 80 }),
    false,
  );
});

test('shouldShowWhatsAppFloat shows button once Hero scrolls past the header boundary', () => {
  assert.equal(
    shouldShowWhatsAppFloat({ heroBottom: 80, headerBottom: 80 }),
    true,
  );
  assert.equal(
    shouldShowWhatsAppFloat({ heroBottom: 80, headerBottom: 64 }),
    true,
  );
  assert.equal(
    shouldShowWhatsAppFloat({ heroBottom: -240, headerBottom: 80 }),
    true,
  );
});
