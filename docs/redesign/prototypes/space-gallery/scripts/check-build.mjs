import assert from 'node:assert/strict';
import { readFile, access } from 'node:fs/promises';
import { resolve, join } from 'node:path';

const directory = resolve('dist');
const pages = new Map();
for (const name of ['index.html', 'archive.html', 'cherit.html']) {
  const html = await readFile(join(directory, name), 'utf8');
  const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]);
  assert.equal(new Set(ids).size, ids.length, `${name}: duplicate IDs`);
  assert.ok(html.includes('<main'), `${name}: missing prerendered content`);
  pages.set(name, { html, ids });
}
for (const [name, { html }] of pages) {
  for (const [, reference] of html.matchAll(/\b(?:src|href)="([^"]+)"/g)) {
    const url = new URL(reference.replaceAll('&amp;', '&'), 'https://portfolio.invalid/' + name);
    if (url.origin !== 'https://portfolio.invalid') continue;
    const target = decodeURIComponent(url.pathname.slice(1)) || 'index.html';
    await access(join(directory, target));
    if (url.hash && pages.has(target)) {
      assert.ok(pages.get(target).ids.includes(decodeURIComponent(url.hash.slice(1))), `${name}: missing anchor ${reference}`);
    }
  }
}
assert.ok(pages.get('index.html').html.includes('particle-source'), 'Semantic heading fallback missing');
assert.ok(pages.get('index.html').html.includes('John Francis Espiritu'), 'Identity missing');
const resume = await readFile(join(directory, 'assets/john-francis-espiritu-resume.pdf'));
assert.equal(resume.subarray(0, 4).toString(), '%PDF');
console.log('Three prerendered pages, unique IDs, local links/assets, semantic text, and resume verified.');
