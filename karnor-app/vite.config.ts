import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    strictPort: true,
    watch: { ignored: ['**/server/data/**'] },
    fs: {
      strict: true,
      allow: ['.'],
      deny: ['.env', '.env.*', '*.crt', '*.pem', '**/.git/**', '**/server/**'],
    },
    proxy: {
      '/api': 'http://127.0.0.1:3001',
      '/media': 'http://127.0.0.1:3001',
    },
  },
  root: '.',  // This ensures Vite looks for `index.html` in the root directory
  base: '/',  // Set base URL for your project, use './' if you deploy in a subdirectory
  build: {
    rollupOptions: {
      input: './index.html',  // Explicitly define where the `index.html` is located
    },
  },
  assetsInclude: ['**/*.png', '**/*.PNG'],  // This part is fine for including assets
});
