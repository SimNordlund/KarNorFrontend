import { fileURLToPath } from 'node:url';
import { isAbsolute, relative, resolve, sep } from 'node:path';

export const appRoot = fileURLToPath(new URL('../', import.meta.url));
try { process.loadEnvFile(resolve(appRoot, '.env')); }
catch (error) { if (error.code !== 'ENOENT') throw error; }

export const config = {
  origin: new URL(process.env.APP_URL || 'http://localhost:5173').origin,
  port: Number(process.env.PORT || 3001),
  host: process.env.HOST || '127.0.0.1',
  dataDir: resolve(process.env.DATA_DIR || resolve(appRoot, 'server/data')),
  password: process.env.ADMIN_PASSWORD || '',
  stripeKey: process.env.STRIPE_SECRET_KEY || '',
  webhookSecret: process.env.STRIPE_WEBHOOK_SECRET || '',
};
// Persistent files must never live in a public or client-source directory.
const dataRelativeToApp = relative(appRoot, config.dataDir);
const dataOutsideApp = isAbsolute(dataRelativeToApp) || dataRelativeToApp === '..' || dataRelativeToApp.startsWith(`..${sep}`);
if (!dataOutsideApp && config.dataDir !== resolve(appRoot, 'server/data')) {
  throw new Error('DATA_DIR måste ligga utanför karnor-app eller vara standardmappen server/data.');
}
export const checkoutConfigured = Boolean(config.stripeKey && config.webhookSecret);
export const adminConfigured = config.password.length >= 12;
