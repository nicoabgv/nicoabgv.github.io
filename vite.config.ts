import fs from 'node:fs';
import path from 'node:path';
import { defineConfig, Plugin } from 'vite';
import react from '@vitejs/plugin-react';

function copyStaticAssetsPlugin(): Plugin {
  return {
    name: 'copy-static-portfolio-assets',
    closeBundle() {
      const srcDir = path.resolve(__dirname, 'assets');
      const outDir = path.resolve(__dirname, 'dist/assets');
      if (!fs.existsSync(srcDir)) return;
      fs.mkdirSync(outDir, { recursive: true });
      for (const file of ['cv_es.pdf', 'cv_en.pdf']) {
        const from = path.join(srcDir, file);
        const to = path.join(outDir, file);
        if (fs.existsSync(from)) {
          fs.copyFileSync(from, to);
        }
      }
    },
  };
}

export default defineConfig({
  plugins: [react(), copyStaticAssetsPlugin()],
  build: {
    rollupOptions: {
      // One HTML entry per language so each version has its own <html lang>, title and meta.
      input: {
        es: path.resolve(__dirname, 'index.html'),
        en: path.resolve(__dirname, 'en/index.html'),
      },
    },
  },
  server: {
    port: 5173,
    host: true,
  },
});
