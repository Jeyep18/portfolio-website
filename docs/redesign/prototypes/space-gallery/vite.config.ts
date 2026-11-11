import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: './',
  plugins: [react()],
  publicDir: false,
  build: {
    rollupOptions: { input: ['index.html', 'archive.html', 'cherit.html', '404.html'] }
  },
  server: {
    host: '127.0.0.1',
    port: 8769,
    strictPort: true,
    headers: { 'Cache-Control': 'no-store' }
  }
});
