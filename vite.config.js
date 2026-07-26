import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // GitHub Pages serves this project repository from this subpath.
  // Local development remains available at http://localhost:5173/.
  base: process.env.GITHUB_ACTIONS ? '/Nadeesha_UI.github.io/' : '/',
});
