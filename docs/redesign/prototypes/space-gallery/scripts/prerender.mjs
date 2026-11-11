import { createServer } from 'vite';
import { readFile, writeFile, cp } from 'node:fs/promises';
import { applyMetadata, siteUrl } from './metadata.mjs';

const server = await createServer({ server: { middlewareMode: true }, appType: 'custom' });
try {
  const { render } = await server.ssrLoadModule('/src/entry-server.tsx');
  for (const page of ['index.html', 'archive.html', 'cherit.html', '404.html']) {
    const path = 'dist/' + page;
    const template = await readFile(path, 'utf8');
    let html = applyMetadata(template.replace('<!--prerender-->', render(page)), page, { preview: process.env.VERCEL_ENV === 'preview' });
    // A 404 can be served at any depth; its bundles must resolve from the host root.
    if (page === '404.html') html = html.replaceAll('./assets/', '/assets/');
    await writeFile(path, html);
  }
  await cp('assets', 'dist/assets', { recursive: true });
  const preview = process.env.VERCEL_ENV === 'preview';
  await writeFile('dist/robots.txt', preview ? 'User-agent: *\nDisallow: /\n' : `User-agent: *\nAllow: /\nSitemap: ${siteUrl}sitemap.xml\n`);
  const locations = ['', 'archive.html', 'cherit.html'].map(path => `<url><loc>${siteUrl}${path}</loc></url>`).join('');
  await writeFile('dist/sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${locations}</urlset>`);
} finally {
  await server.close();
}
