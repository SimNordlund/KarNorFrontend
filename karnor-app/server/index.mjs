import { createServer } from 'node:http';
import { createHash, randomBytes, randomUUID, timingSafeEqual } from 'node:crypto';
import { readFile, writeFile } from 'node:fs/promises';
import { resolve, extname, sep } from 'node:path';
import { adminConfigured, appRoot, checkoutConfigured, config } from './config.mjs';
import { fail, readStore, updateStore, validateCatalog } from './store.mjs';
import { recordPayment, stripeRequest, verifyWebhook } from './stripe.mjs';

const sessions = new Map();
const attempts = new Map();
const secure = config.origin.startsWith('https:');
const digest = value => createHash('sha256').update(value).digest('hex');
const sessionDuration = 8 * 60 * 60 * 1000;
const purchaseDuration = 30 * 24 * 60 * 60 * 1000;
const mime = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8', '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.webp': 'image/webp', '.pdf': 'application/pdf', '.ico': 'image/x-icon' };

function send(res, status, value) {
  res.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' });
  res.end(JSON.stringify(value));
}
function cookie(req, name) {
  return (req.headers.cookie || '').split(';').map(part => part.trim()).find(part => part.startsWith(`${name}=`))?.slice(name.length + 1) || '';
}
function setCookie(res, name, value, maxAge, sameSite = 'Strict') {
  res.setHeader('Set-Cookie', `${name}=${value}; Path=/; HttpOnly; SameSite=${sameSite}; Max-Age=${maxAge}${secure ? '; Secure' : ''}`);
}
function ownsOrder(req, order) {
  return Boolean(order && order.buyerHash === digest(cookie(req, 'karnor_buyer')) && Date.parse(order.createdAt) + purchaseDuration > Date.now());
}
function sameOrigin(req) {
  if (req.headers.origin !== config.origin) fail(403, 'Anropet kommer från fel webbplats.');
}
function adminSession(req, mutate = false) {
  const session = sessions.get(cookie(req, 'karnor_admin'));
  if (!session || session.expires < Date.now()) fail(401, 'Logga in i administrationen igen.');
  if (mutate && req.headers['x-csrf-token'] !== session.csrf) fail(403, 'Sessionen behöver uppdateras. Logga in igen.');
  return session;
}
function throttle(req, scope, maximum) {
  const key = `${scope}:${req.socket.remoteAddress}`;
  const now = Date.now();
  const current = attempts.get(key);
  const entry = current && current.until > now ? current : { count: 0, until: now + 15 * 60 * 1000 };
  entry.count += 1;
  attempts.set(key, entry);
  if (entry.count > maximum) fail(429, 'För många försök. Vänta en stund och försök igen.');
}
async function body(req, limit = 1024 * 1024) {
  const chunks = [];
  let size = 0;
  for await (const chunk of req) {
    size += chunk.length;
    if (size > limit) fail(413, 'Filen eller innehållet är för stort.');
    chunks.push(chunk);
  }
  return Buffer.concat(chunks);
}
async function json(req) {
  if (!req.headers['content-type']?.startsWith('application/json')) fail(415, 'JSON krävs.');
  try {
    const value = JSON.parse((await body(req)).toString('utf8'));
    if (!value || typeof value !== 'object' || Array.isArray(value)) fail(400, 'Ogiltigt innehåll.');
    return value;
  }
  catch (error) { if (error.status) throw error; fail(400, 'Ogiltigt innehåll.'); }
}
function publicCatalog() {
  const { catalog, assets } = readStore();
  return {
    ...catalog, checkoutConfigured,
    products: catalog.products.filter(product => product.status === 'published').map(({ downloadAssetId, ...product }) => ({
      ...product, canPurchase: Boolean(downloadAssetId && assets[downloadAssetId]?.kind === 'file'),
    })),
  };
}
function adminCatalog() {
  const { catalog, assets } = readStore();
  return { ...catalog, checkoutConfigured, assets: Object.values(assets).map(({ filename, ...asset }) => asset) };
}
function detectFile(buffer) {
  if (buffer.subarray(0, 8).equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]))) return { ext: '.png', format: 'PNG', mime: 'image/png' };
  if (buffer[0] === 255 && buffer[1] === 216 && buffer[2] === 255) return { ext: '.jpg', format: 'JPG', mime: 'image/jpeg' };
  if (buffer.toString('ascii', 0, 4) === 'RIFF' && buffer.toString('ascii', 8, 12) === 'WEBP') return { ext: '.webp', format: 'WEBP', mime: 'image/webp' };
  if (buffer.toString('ascii', 0, 5) === '%PDF-') return { ext: '.pdf', format: 'PDF', mime: 'application/pdf' };
  fail(415, 'Tillåtna filer är PNG, JPG, WebP och PDF.');
}
async function serveAsset(res, asset, download = false) {
  const data = await readFile(resolve(config.dataDir, 'files', asset.filename));
  const name = encodeURIComponent(asset.name).replace(/['()*]/g, char => `%${char.charCodeAt(0).toString(16)}`);
  res.writeHead(200, {
    'Content-Type': asset.mime,
    'Content-Length': data.length,
    'Cache-Control': download ? 'private, no-store' : 'public, max-age=31536000, immutable',
    ...(download ? { 'Content-Disposition': `attachment; filename*=UTF-8''${name}` } : {}),
  });
  res.end(data);
}

async function handle(req, res) {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('Referrer-Policy', 'no-referrer');
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  const url = new URL(req.url, config.origin);
  const path = url.pathname;
  const method = req.method;

  if (path === '/api/stripe/webhook' && method === 'POST') {
    if (!config.webhookSecret) fail(503, 'Webhook är inte konfigurerad.');
    const event = verifyWebhook(await body(req), req.headers['stripe-signature']);
    if (['checkout.session.completed', 'checkout.session.async_payment_succeeded'].includes(event.type)) await recordPayment(event.data.object);
    send(res, 200, { received: true }); return;
  }
  if (['POST', 'PUT', 'DELETE', 'PATCH'].includes(method)) sameOrigin(req);

  if (path === '/api/catalog' && method === 'GET') { send(res, 200, publicCatalog()); return; }
  if (path === '/api/admin/session' && method === 'GET') {
    const session = sessions.get(cookie(req, 'karnor_admin'));
    send(res, 200, { configured: adminConfigured, authenticated: Boolean(session && session.expires > Date.now()), csrf: session && session.expires > Date.now() ? session.csrf : '' }); return;
  }
  if (path === '/api/admin/login' && method === 'POST') {
    throttle(req, 'login', 10);
    if (!adminConfigured) fail(503, 'Ange ADMIN_PASSWORD med minst 12 tecken på servern för att aktivera administrationen.');
    const input = await json(req);
    if (typeof input.password !== 'string' || input.password.length > 500 || !timingSafeEqual(Buffer.from(digest(input.password)), Buffer.from(digest(config.password)))) fail(401, 'Fel lösenord. Försök igen.');
    sessions.delete(cookie(req, 'karnor_admin'));
    const token = randomBytes(32).toString('hex');
    const csrf = randomBytes(32).toString('hex');
    sessions.set(token, { csrf, expires: Date.now() + sessionDuration });
    setCookie(res, 'karnor_admin', token, sessionDuration / 1000);
    send(res, 200, { authenticated: true, configured: true, csrf }); return;
  }
  if (path.startsWith('/api/admin/')) {
    adminSession(req, method !== 'GET');
    if (path === '/api/admin/logout' && method === 'POST') {
      sessions.delete(cookie(req, 'karnor_admin'));
      setCookie(res, 'karnor_admin', '', 0);
      send(res, 200, { ok: true }); return;
    }
    if (path === '/api/admin/catalog' && method === 'GET') { send(res, 200, adminCatalog()); return; }
    if (path === '/api/admin/catalog' && method === 'PUT') {
      const input = await json(req);
      await updateStore(state => {
        if (input.revision !== state.catalog.revision) fail(409, 'Produkterna har ändrats i en annan flik. Ladda om registret innan du sparar.');
        state.catalog = validateCatalog(input, state.assets);
      });
      send(res, 200, adminCatalog()); return;
    }
    if (path === '/api/admin/uploads' && method === 'POST') {
      const kind = url.searchParams.get('kind');
      if (!['image', 'file'].includes(kind)) fail(400, 'Välj produktbild eller säljfil.');
      const buffer = await body(req, (kind === 'image' ? 8 : 40) * 1024 * 1024);
      const type = detectFile(buffer);
      if (kind === 'image' && type.format === 'PDF') fail(415, 'Produktbilden behöver vara PNG, JPG eller WebP.');
      const id = randomUUID();
      const filename = `${id}${type.ext}`;
      const name = (url.searchParams.get('name') || filename).replace(/[\x00-\x1f\\/]/g, '-').slice(0, 150);
      const asset = { id, kind, filename, name, mime: type.mime, format: type.format, size: buffer.length, ...(kind === 'image' ? { url: `/media/${filename}` } : {}) };
      await writeFile(resolve(config.dataDir, 'files', filename), buffer, { flag: 'wx', mode: 0o600 });
      await updateStore(state => { state.assets[id] = asset; });
      const { filename: internalName, ...publicAsset } = asset;
      send(res, 201, publicAsset); return;
    }
    fail(404, 'Administrationssidan hittades inte.');
  }

  if (path === '/api/checkout' && method === 'POST') {
    throttle(req, 'checkout', 60);
    if (!checkoutConfigured) fail(503, 'Betalning är tillfälligt inte tillgänglig. Försök igen senare.');
    const input = await json(req);
    if (!Array.isArray(input.productIds) || !input.productIds.length || input.productIds.length > 30 || input.productIds.some(id => typeof id !== 'string') || !/^[a-f0-9-]{36}$/.test(input.requestId || '')) fail(400, 'Kontrollera varukorgen och försök igen.');
    if (input.acceptedTerms !== true || input.acceptedDigitalDelivery !== true) fail(400, 'Godkänn köpvillkoren och villkoret för omedelbar digital leverans för att fortsätta.');
    let buyer = cookie(req, 'karnor_buyer');
    if (!/^[a-f0-9]{64}$/.test(buyer)) buyer = randomBytes(32).toString('hex');
    setCookie(res, 'karnor_buyer', buyer, purchaseDuration / 1000, 'Lax');
    const buyerHash = digest(buyer);
    const requestKey = digest(`${buyer}:${input.requestId}`);
    const productIds = [...new Set(input.productIds)];
    const order = await updateStore(state => {
      const previous = Object.values(state.orders).find(item => item.requestKey === requestKey);
      if (previous) {
        if (previous.status === 'paid') fail(409, 'Den här beställningen är redan betald.');
        if (JSON.stringify(previous.items.map(item => item.id)) !== JSON.stringify(productIds)) fail(409, 'Varukorgen har ändrats. Försök igen.');
        return previous;
      }
      const items = productIds.map(id => {
        const product = state.catalog.products.find(item => item.id === id && item.status === 'published');
        if (!product || !state.assets[product.downloadAssetId] || state.assets[product.downloadAssetId].kind !== 'file') fail(409, 'Ett material är inte längre tillgängligt. Uppdatera varukorgen.');
        return { id: product.id, title: product.title, format: product.format, price: product.price, amount: Math.round(product.price * 100), assetId: product.downloadAssetId };
      });
      const createdAt = new Date().toISOString();
      const created = {
        id: randomUUID(), buyerHash, requestKey, items,
        amount: items.reduce((sum, item) => sum + item.amount, 0),
        status: 'pending', createdAt, termsVersion: '2026-09-21', digitalDeliveryConsentAt: createdAt,
      };
      state.orders[created.id] = created;
      return created;
    });
    if (order.checkoutUrl && order.expiresAt > Date.now() / 1000) { send(res, 200, { url: order.checkoutUrl }); return; }
    if (order.checkoutUrl) fail(409, 'Betalningssessionen har gått ut. Stäng varukorgen och försök igen.');
    const params = new URLSearchParams({
      mode: 'payment', locale: 'sv',
      'payment_method_types[0]': 'swish',
      success_url: `${config.origin}/butik/tack?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${config.origin}/butik?betalning=avbruten`,
      'metadata[orderId]': order.id,
    });
    order.items.forEach((item, index) => {
      params.set(`line_items[${index}][price_data][currency]`, 'sek');
      params.set(`line_items[${index}][price_data][unit_amount]`, String(item.amount));
      params.set(`line_items[${index}][price_data][product_data][name]`, item.title);
      params.set(`line_items[${index}][price_data][product_data][description]`, `${item.format} · Digital nedladdning`);
      params.set(`line_items[${index}][quantity]`, '1');
    });
    const session = await stripeRequest('checkout/sessions', params, order.id);
    if (!session.url || new URL(session.url).hostname !== 'checkout.stripe.com') fail(502, 'Betalningslänken kunde inte skapas.');
    await updateStore(state => Object.assign(state.orders[order.id], { sessionId: session.id, checkoutUrl: session.url, expiresAt: session.expires_at }));
    send(res, 200, { url: session.url }); return;
  }

  const orderMatch = path.match(/^\/api\/orders\/(cs_[a-zA-Z0-9_]+)$/);
  if (orderMatch && method === 'GET') {
    const sessionId = orderMatch[1];
    let order = Object.values(readStore().orders).find(item => item.sessionId === sessionId && ownsOrder(req, item));
    if (!order) fail(404, 'Beställningen hittades inte i den här webbläsaren.');
    if (order.status !== 'paid' && checkoutConfigured) {
      throttle(req, 'payment-status', 120);
      await recordPayment(await stripeRequest(`checkout/sessions/${encodeURIComponent(sessionId)}`));
      order = readStore().orders[order.id];
    }
    send(res, 200, {
      id: order.id, status: order.status, total: order.amount / 100, createdAt: order.createdAt,
      termsVersion: order.termsVersion, digitalDeliveryConsentAt: order.digitalDeliveryConsentAt,
      items: order.items.map(item => ({ id: item.id, title: item.title, format: item.format, ...(order.status === 'paid' ? { downloadUrl: `/api/downloads/${order.id}/${item.assetId}` } : {}) })),
    }); return;
  }
  const downloadMatch = path.match(/^\/api\/downloads\/([a-f0-9-]{36})\/([a-f0-9-]{36})$/);
  if (downloadMatch && method === 'GET') {
    const order = readStore().orders[downloadMatch[1]];
    if (!ownsOrder(req, order) || order.status !== 'paid' || !order.items.some(item => item.assetId === downloadMatch[2])) fail(403, 'Filen är tillgänglig för en betald beställning i samma webbläsare i upp till 30 dagar.');
    const asset = readStore().assets[downloadMatch[2]];
    if (!asset || asset.kind !== 'file') fail(404, 'Filen kunde inte hittas.');
    await serveAsset(res, asset, true); return;
  }
  if (path.startsWith('/media/') && method === 'GET') {
    const asset = Object.values(readStore().assets).find(item => item.kind === 'image' && item.url === path);
    if (!asset) fail(404, 'Bilden hittades inte.');
    await serveAsset(res, asset); return;
  }
  if (path.startsWith('/api/')) fail(404, 'Anropet kunde inte hittas.');
  if (method !== 'GET' && method !== 'HEAD') fail(405, 'Metoden stöds inte.');
  const dist = resolve(appRoot, 'dist');
  const requested = resolve(dist, `.${decodeURIComponent(path)}`);
  if (!requested.startsWith(`${dist}${sep}`) && requested !== dist) fail(403, 'Ogiltig sökväg.');
  let file = requested;
  let data;
  try { data = await readFile(file); }
  catch {
    if (extname(path)) fail(404, 'Filen hittades inte.');
    file = resolve(dist, 'index.html');
    try { data = await readFile(file); }
    catch { fail(503, 'Starta webbplatsen med npm run dev eller lägg en byggd webbplats i dist.'); }
  }
  res.writeHead(200, { 'Content-Type': mime[extname(file).toLowerCase()] || 'application/octet-stream', 'Cache-Control': extname(file) === '.html' ? 'no-cache' : 'public, max-age=3600' });
  res.end(method === 'HEAD' ? undefined : data);
}

const server = createServer((req, res) => {
  handle(req, res).catch(error => {
    if (!res.headersSent) send(res, error.status || 500, { message: error.status ? error.message : 'Något gick fel på servern. Försök igen.' });
    else res.end();
    if (!error.status) console.error('Server error:', error.code || error.name);
  });
});
server.requestTimeout = 60000;
server.headersTimeout = 15000;
server.listen(config.port, config.host, () => console.log(`Karnor API: http://${config.host}:${config.port}`));
setInterval(() => {
  for (const [key, entry] of sessions) if (entry.expires < Date.now()) sessions.delete(key);
  for (const [key, entry] of attempts) if (entry.until < Date.now()) attempts.delete(key);
}, 60000).unref();
