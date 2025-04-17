import { defineConfig } from 'vite';
import { resolve } from 'path';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  root: './', // Set root folder
  base: './',
  server: {
    port: 3000, // Port untuk development server
    hot: true,
    open: true, // Automatically open browser
  },
  build: {
    outDir: 'dist', // Output folder untuk build
    assetsDir: 'assets',
    emptyOutDir: true,
    sourcemap: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        panorama: resolve(__dirname, 'panorama.html')
      },
      output: {
        manualChunks: {
          vendor: ['gsap'],
        },
      },
    },
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
      },
    },
  },
  optimizeDeps: {
    include: ['gsap'],
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
});