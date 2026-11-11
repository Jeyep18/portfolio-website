import assert from 'node:assert/strict';
import { readFile, access } from 'node:fs/promises';
import { resolve, join } from 'node:path';

const directory = resolve('dist');
const pages = new Map();
for (const name of ['index.html', 'archive.html', 'cherit.html', '404.html']) {
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
assert.ok(pages.get('404.html').html.includes('Lost in space'), 'Custom 404 copy missing');
assert.ok(pages.get('404.html').html.includes('data-page="404.html"'), '404 hydration marker missing');
assert.ok(!pages.get('404.html').html.includes('./assets/'), '404 assets must work on nested missing paths');
for (const [name, { html }] of pages) {
  assert.ok(html.includes('property="og:site_name" content="John Francis Espiritu"'), `${name}: site name missing`);
  assert.ok(html.includes('/assets/favicon.svg'), `${name}: favicon missing`);
  if (name !== '404.html') assert.ok(html.includes('rel="canonical"'), `${name}: canonical missing`);
}
const site = JSON.parse(pages.get('index.html').html.match(/<script type="application\/ld\+json">(.*?)<\/script>/)[1]);
assert.equal(site['@type'], 'WebSite');
assert.equal(site.name, 'John Francis Espiritu');
await access(join(directory, 'robots.txt'));
await access(join(directory, 'sitemap.xml'));
const resume = await readFile(join(directory, 'assets/john-francis-espiritu-resume.pdf'));
assert.equal(resume.subarray(0, 4).toString(), '%PDF');
console.log('Four prerendered pages, unique IDs, local links/assets, semantic text, and resume verified.');
