import { createServer } from 'vite';
import { readFile, writeFile, cp } from 'node:fs/promises';

const server = await createServer({ server: { middlewareMode: true }, appType: 'custom' });
try {
  const { render } = await server.ssrLoadModule('/src/entry-server.tsx');
  for (const page of ['index.html', 'archive.html', 'cherit.html']) {
    const path = 'dist/' + page;
    const template = await readFile(path, 'utf8');
    await writeFile(path, template.replace('<!--prerender-->', render(page)));
  }
  await cp('assets', 'dist/assets', { recursive: true });
} finally {
  await server.close();
}
