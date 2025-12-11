import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/Feed-me-master/', // GitHub Pages base URL
  plugins: [react()]
});