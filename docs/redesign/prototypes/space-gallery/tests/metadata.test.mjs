import test from 'node:test';
import assert from 'node:assert/strict';
import { applyMetadata } from '../scripts/metadata.mjs';
const shell = '<head><title>Old</title><meta name="description" content="old"><meta name="robots" content="noindex"><link rel="icon" href="data:,"></head>';
test('production homepage has crawlable identity, canonical URL and structured site name', () => {
  const html = applyMetadata(shell, 'index.html');
  assert.match(html, /name="robots" content="index,follow"/);
  assert.match(html, /rel="canonical" href="https:\/\/portfolio-space-gallery.vercel.app\/"/);
  const json = JSON.parse(html.match(/<script type="application\/ld\+json">(.*?)<\/script>/)[1]);
  assert.equal(json['@type'], 'WebSite');
  assert.equal(json.name, 'John Francis Espiritu');
  assert.match(html, /href="\/assets\/favicon.svg"/);
});
test('previews remain noindex; missing pages have no canonical to an existing page', () => {
  assert.match(applyMetadata(shell, 'index.html', { preview: true }), /content="noindex,nofollow"/);
  const missing = applyMetadata(shell, '404.html');
  assert.match(missing, /content="noindex,nofollow"/);
  assert.doesNotMatch(missing, /rel="canonical"/);
});
test('project descriptions are distinct and retain team/prototype attribution', () => {
  const archive = applyMetadata(shell, 'archive.html');
  const cherit = applyMetadata(shell, 'cherit.html');
  assert.match(archive, /Project Archive/);
  assert.match(cherit, /team hackathon prototype/);
  assert.notEqual(archive, cherit);
});
