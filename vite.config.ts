
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // Относительный путь позволяет запускать сайт в любой подпапке (например, username.github.io/repo-name/)
  base: './', 
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    minify: 'esbuild',
    // Гарантируем, что index.html будет в корне dist
    emptyOutDir: true
  }
});
