import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => ({
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
      '/api': mode === 'kotlin' ? 'http://127.0.0.1:8080' : 'http://127.0.0.1:3001',
      '/media': mode === 'kotlin' ? 'http://127.0.0.1:8080' : 'http://127.0.0.1:3001',
      ...(mode === 'kotlin' ? { '/downloadPdfByFileName': 'http://127.0.0.1:8080' } : {}),
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
}));
