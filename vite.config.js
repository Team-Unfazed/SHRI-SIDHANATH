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
    // The real-estate-agent-*.html entries are the location landing
    // pages (Panvel, Raigad, Navi Mumbai, Kharghar, Kamothe, Kalamboli —
    // src/data/content.js's `locationPages`), added for local SEO coverage
    // beyond the homepage.
    rollupOptions: {
      input: {
        main: resolve(import.meta.dirname, 'index.html'),
        projects: resolve(import.meta.dirname, 'projects.html'),
        showcase: resolve(import.meta.dirname, 'showcase.html'),
        panvel: resolve(import.meta.dirname, 'real-estate-agent-panvel.html'),
        raigad: resolve(import.meta.dirname, 'real-estate-agent-raigad.html'),
        naviMumbai: resolve(import.meta.dirname, 'real-estate-agent-navi-mumbai.html'),
        kharghar: resolve(import.meta.dirname, 'real-estate-agent-kharghar.html'),
        kamothe: resolve(import.meta.dirname, 'real-estate-agent-kamothe.html'),
        kalamboli: resolve(import.meta.dirname, 'real-estate-agent-kalamboli.html'),
      },
    },
  },
});
