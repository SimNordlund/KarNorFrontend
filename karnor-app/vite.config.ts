import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const backendUrl = loadEnv(mode, '.', 'KARNOR_BACKEND_URL').KARNOR_BACKEND_URL || 'http://127.0.0.1:8080';
  const proxy = {
    '/api': backendUrl,
    '/media': backendUrl,
    '/downloadPdf': backendUrl,
  };

  return {
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
      proxy,
    },
    preview: { port: 5173, strictPort: true, proxy },
    root: '.',
    base: '/',
    build: {
      rollupOptions: {
        input: './index.html',
      },
    },
    assetsInclude: ['**/*.png', '**/*.PNG'],
  };
});
