import { defineConfig } from 'vite';
import { resolve } from 'node:path';
import react from '@vitejs/plugin-react';
import seoFallback from './scripts/seo-fallback.js';

export default defineConfig({
  plugins: [react(), seoFallback()],
  server: {
    port: 5173,
    host: true,
  },
  build: {
    outDir: 'dist',
    // The photographs are the content. Inlining any of them as base64 makes the
    // JS bundle carry image bytes the browser cannot cache separately.
    assetsInlineLimit: 0,
    // Separate entries keep the showcase independent of the existing homepage.
    rollupOptions: {
      input: {
        main: resolve(import.meta.dirname, 'index.html'),
        projects: resolve(import.meta.dirname, 'projects.html'),
        showcase: resolve(import.meta.dirname, 'showcase.html'),
      },
    },
  },
});
