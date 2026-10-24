import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');
  // Accept the existing Render setting as well as the canonical Vite name.
  const apiBaseUrl = env.VITE_API_BASE_URL ?? env.VITE_BASE_URL ?? env.vitebaseurl ?? '';
  const backendUrl = env.KARNOR_BACKEND_URL || apiBaseUrl || 'http://127.0.0.1:8080';
  const proxy = {
    '/api': backendUrl,
    '/media': backendUrl,
    '/downloadPdf': backendUrl,
  };

  return {
    plugins: [react()],
    define: { 'import.meta.env.VITE_API_BASE_URL': JSON.stringify(apiBaseUrl) },
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
    preview: { host: '0.0.0.0', port: Number(env.PORT) || 5173, strictPort: true, proxy },
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
