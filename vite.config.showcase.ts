import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';

import path from 'node:path';
import { fileURLToPath } from 'node:url';
const dirname = path.dirname(fileURLToPath(import.meta.url));

// Builds the showcase site (index.html -> src/main.tsx -> src/App.tsx) as a
// regular static app, as opposed to vite.config.ts which builds the package
// (src/index.ts) as a library with no HTML entry point. Point Vercel's Build
// Command at `npm run build:showcase` so it serves an actual page instead of
// downloading dist/index.mjs.
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(dirname, 'src'),
    },
  },
  build: {
    outDir: 'dist-showcase',
  },
});
