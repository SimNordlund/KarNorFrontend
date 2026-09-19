import { mkdir, readFile, writeFile, rename } from 'node:fs/promises';
import { resolve } from 'node:path';
import { appRoot, config } from './config.mjs';

await mkdir(config.dataDir, { recursive: true });
await mkdir(resolve(config.dataDir, 'files'), { recursive: true });
const filename = resolve(config.dataDir, 'store.json');
let state;
try { state = JSON.parse(await readFile(filename, 'utf8')); }
catch (error) {
  if (error.code !== 'ENOENT') throw error;
  state = {
    catalog: JSON.parse(await readFile(resolve(appRoot, 'src/shop/catalog.seed.json'), 'utf8')),
    assets: {}, orders: {},
  };
  await writeFile(filename, JSON.stringify(state, null, 2), { flag: 'wx', mode: 0o600 });
}

let queue = Promise.resolve();
export const readStore = () => state;
// One process owns the store. Every mutation is serialized and committed atomically.
export function updateStore(mutate) {
  const task = queue.then(async () => {
    const next = structuredClone(state);
    const result = await mutate(next);
    await writeFile(`${filename}.tmp`, JSON.stringify(next, null, 2), { mode: 0o600 });
    await rename(`${filename}.tmp`, filename);
    state = next;
    return result;
  });
  queue = task.catch(() => {});
  return task;
}

export function fail(status, message) {
  throw Object.assign(new Error(message), { status });
}

export function validateCatalog(input, assets) {
  if (!input || !Number.isInteger(input.revision) || !Array.isArray(input.categories) || !Array.isArray(input.products)) fail(400, 'Ogiltigt produktregister.');
  const categories = input.categories.map(value => text(value, 60));
  if (!categories.length || categories.length > 50 || new Set(categories.map(category => category.toLocaleLowerCase('sv-SE'))).size !== categories.length) fail(400, 'Kategorier måste vara unika och får vara högst 50.');
  if (input.products.length > 1000) fail(400, 'Produktregistret är fullt.');
  const ids = new Set();
  const products = input.products.map(product => {
    if (!product || typeof product !== 'object' || Array.isArray(product)) fail(400, 'Ogiltig produkt.');
    const id = text(product.id, 80);
    if (!/^[a-z0-9-]+$/.test(id) || ids.has(id)) fail(400, 'Varje produkt behöver ett unikt ID.');
    ids.add(id);
    if (!['draft', 'published'].includes(product.status)) fail(400, 'Välj publiceringsstatus.');
    if (!categories.includes(product.category)) fail(400, 'Välj en befintlig kategori.');
    if (!Number.isFinite(product.price) || product.price < 5 || product.price > 100000 || Math.abs(product.price * 100 - Math.round(product.price * 100)) > 0.0001) fail(400, 'Priset måste vara 5–100 000 kr med högst två decimaler.');
    if (!Number.isInteger(product.pages) || product.pages < 1 || product.pages > 10000) fail(400, 'Ange ett giltigt sidantal.');
    if (!['PDF', 'PNG', 'JPG', 'WEBP'].includes(product.format)) fail(400, 'Välj ett filformat.');
    if (!Array.isArray(product.ages) || !product.ages.length || product.ages.some(age => !['F–3', '4–6'].includes(age))) fail(400, 'Välj minst en åldersgrupp.');
    const image = product.image;
    if (image) {
      // Only bundled previews or images uploaded through this CMS can be published.
      const bundled = /^\/shop\/(argsolen|jag-kanner-mig-radd|vildhastarna|kanslan-arg|dans-och-musikvideos|samtalsfragor-om-ilska)\.png$/.test(image.src);
      const uploaded = Object.values(assets).some(asset => asset.kind === 'image' && asset.url === image.src);
      if (!bundled && !uploaded) fail(400, 'Ladda upp produktbilden via bildfältet.');
      if (!Number.isInteger(image.width) || !Number.isInteger(image.height) || image.width < 1 || image.height < 1 || image.width > 30000 || image.height > 30000) fail(400, 'Ogiltig bildstorlek.');
    }
    const download = product.downloadAssetId ? assets[product.downloadAssetId] : null;
    if (product.downloadAssetId && (!download || download.kind !== 'file' || download.format !== product.format)) fail(400, 'Säljfilens format stämmer inte med produktens format.');
    if (product.status === 'published' && !image) fail(400, 'Lägg till en produktbild före publicering.');
    if (!Array.isArray(product.includes) || product.includes.length > 30) fail(400, 'Ange högst 30 innehållspunkter.');
    return {
      id, status: product.status, title: text(product.title, 150),
      coverTitle: text(product.coverTitle || product.title, 150),
      subtitle: text(product.subtitle || '', 200, true),
      description: text(product.description, 6000, product.status === 'draft'), category: product.category,
      price: product.price, format: product.format, pages: product.pages,
      ages: [...new Set(product.ages)], ageLabel: text(product.ageLabel || '', 50, true),
      theme: ['lilac', 'sage', 'peach', 'butter', 'sky', 'rose'].includes(product.theme) ? product.theme : 'lilac',
      motif: 'friends', badge: text(product.badge || '', 30, true),
      includes: product.includes.map(item => text(item, 400)),
      ...(image ? { image: { src: image.src, alt: text(image.alt, 1000), width: image.width, height: image.height } } : {}),
      ...(download ? { downloadAssetId: product.downloadAssetId } : {}),
    };
  });
  return { revision: input.revision + 1, categories, products };
}

function text(value, max, optional = false) {
  if (typeof value !== 'string' || value.trim().length > max || (!optional && !value.trim())) fail(400, 'Kontrollera textfälten och deras längd.');
  return value.trim();
}
