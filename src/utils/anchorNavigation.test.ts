import assert from 'node:assert/strict';
import test from 'node:test';
import {
  buildUrlForSection,
  calculateAnchorScrollTop,
  isNavSectionId,
  normalizeAnchorId,
  resolveActiveSectionId,
  type SectionPosition,
} from './anchorNavigation';

test('normalizeAnchorId extracts valid section IDs from hashes and URLs', () => {
  assert.equal(normalizeAnchorId('#servicos'), 'servicos');
  assert.equal(normalizeAnchorId(' /#sobre '), 'sobre');
  assert.equal(normalizeAnchorId('formacao'), 'formacao');
  assert.equal(normalizeAnchorId('#'), null);
  assert.equal(normalizeAnchorId(''), null);
  assert.equal(normalizeAnchorId(null), null);
});

test('isNavSectionId matches only top-level navigation section IDs', () => {
  assert.equal(isNavSectionId('servicos'), true);
  assert.equal(isNavSectionId('trabalhos'), true);
  assert.equal(isNavSectionId('sobre'), true);
  assert.equal(isNavSectionId('formacao'), true);
  assert.equal(isNavSectionId('contato'), true);
  assert.equal(isNavSectionId('inicio'), false);
  assert.equal(isNavSectionId('duvidas'), false);
  assert.equal(isNavSectionId(null), false);
});

test('calculateAnchorScrollTop aligns section top to live header bottom and clamps within document bounds', () => {
  // Mobile/Tablet header height = 65px, scrolled from y=0 to #servicos at top=765
  assert.equal(
    calculateAnchorScrollTop({
      sectionTopInViewport: 765,
      currentScrollY: 0,
      headerHeight: 65,
      documentScrollHeight: 6000,
      viewportHeight: 844,
    }),
    700,
  );

  // Desktop header height = 81px, scrolled from y=1200 to #sobre currently at top=1381 (doc top = 2581)
  assert.equal(
    calculateAnchorScrollTop({
      sectionTopInViewport: 1381,
      currentScrollY: 1200,
      headerHeight: 81,
      documentScrollHeight: 6000,
      viewportHeight: 900,
    }),
    2500,
  );

  // Scrolling back up to Hero (#inicio) at sticky header top clamps cleanly to 0
  assert.equal(
    calculateAnchorScrollTop({
      sectionTopInViewport: -1400,
      currentScrollY: 1465,
      headerHeight: 65,
      documentScrollHeight: 6000,
      viewportHeight: 844,
    }),
    0,
  );

  // Bottom section near end of page clamps to maxScrollY instead of overshooting
  assert.equal(
    calculateAnchorScrollTop({
      sectionTopInViewport: 400,
      currentScrollY: 5000,
      headerHeight: 81,
      documentScrollHeight: 5900,
      viewportHeight: 900,
    }),
    5000,
  );
});

test('resolveActiveSectionId returns null while Hero is active above #servicos', () => {
  const sections: SectionPosition[] = [
    { id: 'servicos', top: 640 },
    { id: 'trabalhos', top: 1640 },
    { id: 'sobre', top: 2800 },
    { id: 'formacao', top: 3600 },
    { id: 'contato', top: 4800 },
  ];

  assert.equal(
    resolveActiveSectionId(sections, {
      headerHeight: 65,
      scrollY: 0,
      viewportHeight: 844,
      scrollHeight: 5800,
    }),
    null,
  );
});

test('resolveActiveSectionId selects the exact section whose top reached the header line', () => {
  // Exact alignment after clicking #sobre on desktop (top === headerHeight)
  const sectionsAtSobre: SectionPosition[] = [
    { id: 'servicos', top: -1800 },
    { id: 'trabalhos', top: -900 },
    { id: 'sobre', top: 81 },
    { id: 'formacao', top: 820 },
    { id: 'contato', top: 1950 },
  ];

  assert.equal(
    resolveActiveSectionId(sectionsAtSobre, {
      headerHeight: 81,
      scrollY: 2500,
      viewportHeight: 900,
      scrollHeight: 5800,
    }),
    'sobre',
  );

  // While scrolling through FAQ (#duvidas) between #formacao and #contato,
  // #formacao stays active until #contato enters header zone or bottom of page.
  const sectionsDuringFaq: SectionPosition[] = [
    { id: 'servicos', top: -3200 },
    { id: 'trabalhos', top: -2300 },
    { id: 'sobre', top: -1400 },
    { id: 'formacao', top: -620 },
    { id: 'contato', top: 480 },
  ];

  assert.equal(
    resolveActiveSectionId(sectionsDuringFaq, {
      headerHeight: 81,
      scrollY: 3900,
      viewportHeight: 900,
      scrollHeight: 5800,
    }),
    'formacao',
  );
});

test('resolveActiveSectionId activates #contato when reaching page bottom on tall desktop viewports', () => {
  const sectionsAtBottom: SectionPosition[] = [
    { id: 'servicos', top: -4300 },
    { id: 'trabalhos', top: -3400 },
    { id: 'sobre', top: -2500 },
    { id: 'formacao', top: -1700 },
    // Short footer stops scroll before #contato.top reaches headerHeight=81
    { id: 'contato', top: 210 },
  ];

  assert.equal(
    resolveActiveSectionId(sectionsAtBottom, {
      headerHeight: 81,
      scrollY: 4998,
      viewportHeight: 900,
      scrollHeight: 5900,
    }),
    'contato',
  );
});

test('buildUrlForSection formats clean URL hashes with search params preserved', () => {
  assert.equal(buildUrlForSection('/', '', 'servicos'), '/#servicos');
  assert.equal(buildUrlForSection('/', '?utm=ig', 'contato'), '/?utm=ig#contato');
  assert.equal(buildUrlForSection('/', '', null), '/');
});
