import { useEffect, useState } from 'react';
import type { FormEvent } from 'react';
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';
import { ArrowLeftIcon, ArrowRightOnRectangleIcon, ArrowUpTrayIcon, CheckCircleIcon, DocumentDuplicateIcon, FolderIcon, LockClosedIcon, MagnifyingGlassIcon, PencilSquareIcon, PlusIcon, ShoppingBagIcon, TrashIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
import { api, setCsrf } from '../api';
import { useCatalog } from '../shop/CatalogContext';
import type { Catalog, Material } from '../shop/materials';
import { formatPrice } from '../shop/materials';
import MaterialCover from '../shop/MaterialCover';
import './admin.css';

interface Session { configured: boolean; authenticated: boolean; csrf: string }
interface Asset { id: string; name: string; kind: 'image' | 'file'; url?: string; size: number; format: Material['format'] }
interface AdminCatalog extends Catalog { assets: Asset[] }

function newProduct(category: string): Material {
  return {
    id: crypto.randomUUID(), status: 'draft', title: '', coverTitle: '', subtitle: '', category,
    description: '', price: 0, format: 'PDF', pages: 1, ages: ['F–3'], theme: 'lilac', motif: 'friends', includes: [],
  };
}

async function dimensions(file: File): Promise<{ width: number; height: number }> {
  const image = new Image();
  const url = URL.createObjectURL(file);
  try {
    return await new Promise((resolve, reject) => {
      image.onload = () => resolve({ width: image.naturalWidth, height: image.naturalHeight });
      image.onerror = () => reject(new Error('Bilden kunde inte läsas. Välj PNG, JPG eller WebP.'));
      image.src = url;
    });
  } finally { URL.revokeObjectURL(url); }
}

function CategoryRow({ name, count, busy, rename, remove }: { name: string; count: number; busy: boolean; rename: (name: string) => void; remove: () => void }) {
  const [value, setValue] = useState(name);
  return <form className="cms-category-row" onSubmit={event => { event.preventDefault(); rename(value.trim()); }}>
    <FolderIcon aria-hidden="true" /><label><span className="sr-only">Kategorinamn</span><input value={value} maxLength={60} required onChange={event => setValue(event.target.value)} /></label>
    <span>{count} material</span><button className="shop-text-button" disabled={busy || value.trim() === name}>Spara namn</button>
    <button type="button" className="shop-icon-button" disabled={busy || count > 0} onClick={remove} aria-label={`Ta bort ${name}`} title={count ? 'Flytta kategoriens produkter först' : 'Ta bort kategori'}><TrashIcon /></button>
  </form>;
}

export default function Admin() {
  const { refresh } = useCatalog();
  const [session, setSession] = useState<Session | null>(null);
  const [catalog, setCatalog] = useState<AdminCatalog | null>(null);
  const [tab, setTab] = useState<'products' | 'categories'>('products');
  const [editing, setEditing] = useState<Material | null>(null);
  const [dirty, setDirty] = useState(false);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('all');
  const [busy, setBusy] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [categoryName, setCategoryName] = useState('');

  useEffect(() => {
    let active = true;
    api<Session>('/api/admin/session').then(result => {
      if (active) { setSession(result); setCsrf(result.csrf); }
    }).catch(() => {
      if (active) { setSession({ configured: true, authenticated: false, csrf: '' }); setError('Administrationen kunde inte nås. Kontrollera att servern är startad.'); }
    });
    return () => { active = false; };
  }, []);
  useEffect(() => {
    if (!session?.authenticated) return;
    let active = true;
    api<AdminCatalog>('/api/admin/catalog').then(result => { if (active) setCatalog(result); }).catch(failure => { if (active) setError(failure.message); });
    return () => { active = false; };
  }, [session?.authenticated]);
  useEffect(() => {
    const warn = (event: BeforeUnloadEvent) => { if (dirty) { event.preventDefault(); event.returnValue = ''; } };
    window.addEventListener('beforeunload', warn);
    return () => window.removeEventListener('beforeunload', warn);
  }, [dirty]);

  async function login(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const password = new FormData(event.currentTarget).get('password');
    setBusy(true); setError('');
    try {
      const result = await api<Session>('/api/admin/login', { method: 'POST', body: JSON.stringify({ password }) });
      setCsrf(result.csrf); setSession(result);
    } catch (failure) { setError(failure instanceof Error ? failure.message : 'Inloggningen misslyckades.'); }
    finally { setBusy(false); }
  }
  async function logout() {
    setBusy(true);
    try {
      await api('/api/admin/logout', { method: 'POST' });
      setSession({ authenticated: false, configured: true, csrf: '' }); setCsrf(''); setCatalog(null);
    } catch (failure) { setError(failure instanceof Error ? failure.message : 'Utloggningen misslyckades.'); }
    finally { setBusy(false); }
  }
  async function persist(next: Catalog) {
    setBusy(true); setError(''); setNotice('');
    try {
      const result = await api<AdminCatalog>('/api/admin/catalog', { method: 'PUT', body: JSON.stringify(next) });
      setCatalog(result); setNotice('Ändringarna är sparade.'); void refresh(); return result;
    } catch (failure) { setError(failure instanceof Error ? failure.message : 'Ändringarna kunde inte sparas.'); return null; }
    finally { setBusy(false); }
  }
  function patch(value: Partial<Material>) { setEditing(previous => previous ? { ...previous, ...value } : null); setDirty(true); }
  function closeEditor() {
    if (busy || uploading || (dirty && !window.confirm('Stäng utan att spara dina ändringar?'))) return;
    setEditing(null); setDirty(false); setError('');
  }
  function edit(product: Material) { setEditing(structuredClone(product)); setDirty(false); setError(''); setNotice(''); }
  async function saveProduct(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!editing || !catalog || uploading) return;
    const product = { ...editing, coverTitle: editing.title, includes: editing.includes.map(item => item.trim()).filter(Boolean) };
    const exists = catalog.products.some(item => item.id === product.id);
    const products = exists ? catalog.products.map(item => item.id === product.id ? product : item) : [product, ...catalog.products];
    if (await persist({ ...catalog, products })) { setEditing(null); setDirty(false); }
  }
  async function upload(file: File | undefined, kind: Asset['kind']) {
    if (!file || !editing) return;
    setUploading(true); setError('');
    try {
      if (file.size > (kind === 'image' ? 8 : 40) * 1024 * 1024) throw new Error(`Filen får vara högst ${kind === 'image' ? 8 : 40} MB.`);
      const size = kind === 'image' ? await dimensions(file) : null;
      const asset = await api<Asset>(`/api/admin/uploads?${new URLSearchParams({ kind, name: file.name })}`, { method: 'POST', body: file });
      setCatalog(previous => previous ? { ...previous, assets: [...previous.assets, asset] } : null);
      if (kind === 'image' && asset.url && size) patch({ image: { src: asset.url, alt: editing.title || file.name, ...size } });
      else patch({ downloadAssetId: asset.id, format: asset.format });
    } catch (failure) { setError(failure instanceof Error ? failure.message : 'Filen kunde inte laddas upp.'); }
    finally { setUploading(false); }
  }

  if (!session) return <main id="main-content" className="site-container site-section"><p role="status">Öppnar administrationen…</p></main>;
  if (!session.authenticated) return <main id="main-content" className="cms-login site-container">
    <div className="cms-login-card"><span className="cms-login-icon"><LockClosedIcon aria-hidden="true" /></span><span className="shop-eyebrow">KARNOR STUDIO</span><h1>Plats för dina idéer.</h1><p>Logga in för att ta hand om dina material och din butik.</p>
      {!session.configured && <p className="site-notice">Ange ADMIN_PASSWORD med minst 12 tecken i serverns .env-fil för att aktivera inloggningen.</p>}
      <form onSubmit={login}><label htmlFor="admin-password">Lösenord<input id="admin-password" name="password" type="password" autoComplete="current-password" required maxLength={500} /></label><button className="shop-button shop-button--primary shop-button--full" disabled={busy || !session.configured}>{busy ? 'Loggar in…' : 'Logga in'}</button></form>
      {error && <p role="alert" className="site-error">{error}</p>}<Link to="/butik" className="shop-text-button"><ArrowLeftIcon aria-hidden="true" /> Tillbaka till butiken</Link>
    </div><div className="cms-login-copy"><span className="shop-eyebrow">FRÅN DIN IDÉ TILL NÅGONS VARDAG</span><h2>Små material.<br /><em>Stor skillnad.</em></h2><p>Samla bilder, forma dina texter och ge varje material en plats i butiken. Allt på ett ställe.</p></div>
  </main>;

  const products = catalog?.products || [];
  const visible = products.filter(product => (status === 'all' || product.status === status) && `${product.title} ${product.category}`.toLocaleLowerCase('sv-SE').includes(search.toLocaleLowerCase('sv-SE')));
  return <main id="main-content" className="cms-page site-container">
    <header className="cms-header"><div><span className="shop-eyebrow">KARNOR STUDIO</span><h1>Din materialbutik</h1><p>Ge dina idéer en plats i fritidshemmets vardag.</p></div><div className="cms-header-actions"><Link to="/butik" className="shop-button shop-button--secondary">Visa butiken</Link><button type="button" onClick={() => void logout()} disabled={busy} className="shop-text-button"><ArrowRightOnRectangleIcon aria-hidden="true" /> Logga ut</button></div></header>
    {error && !editing && <p className="site-error" role="alert">{error} <button type="button" onClick={() => window.location.reload()}>Ladda om</button></p>}
    <p className="cms-notice" role="status">{notice}</p>
    {!catalog ? <p role="status">Hämtar ditt produktregister…</p> : <>
      <div className="cms-stats"><div><span>Publicerade material</span><strong>{products.filter(product => product.status === 'published').length}</strong><ShoppingBagIcon aria-hidden="true" /></div><div><span>Utkast att arbeta vidare med</span><strong>{products.filter(product => product.status === 'draft').length}</strong><PencilSquareIcon aria-hidden="true" /></div><div><span>Kategorier</span><strong>{catalog.categories.length}</strong><FolderIcon aria-hidden="true" /></div></div>
      <div className="cms-workspace"><aside className="cms-sidebar"><span className="shop-eyebrow">DIN BUTIK</span><button type="button" aria-pressed={tab === 'products'} onClick={() => setTab('products')}><ShoppingBagIcon aria-hidden="true" /> Produkter</button><button type="button" aria-pressed={tab === 'categories'} onClick={() => setTab('categories')}><FolderIcon aria-hidden="true" /> Kategorier</button><div className="cms-stripe-status"><LockClosedIcon aria-hidden="true" /><strong>Stripe Checkout</strong><p>{catalog.checkoutConfigured ? 'Betalningsanslutningen är konfigurerad.' : 'Ange STRIPE_SECRET_KEY och STRIPE_WEBHOOK_SECRET på servern för att aktivera betalning.'}</p><p>Ladda upp en separat säljfil för varje produkt som ska kunna köpas.</p></div></aside>
        <section className="cms-content">
          {tab === 'products' ? <>
            <div className="cms-section-heading"><div><h2>Alla produkter</h2><p>Redigera, publicera och hitta bland dina material.</p></div><button type="button" className="shop-button shop-button--primary" onClick={() => edit(newProduct(catalog.categories[0]))}><PlusIcon aria-hidden="true" /> Ny produkt</button></div>
            <div className="cms-filters"><label className="cms-search"><MagnifyingGlassIcon aria-hidden="true" /><span className="sr-only">Sök produkter</span><input value={search} onChange={event => setSearch(event.target.value)} placeholder="Sök på namn eller kategori…" type="search" /></label><label><span className="sr-only">Publiceringsstatus</span><select value={status} onChange={event => setStatus(event.target.value)}><option value="all">Alla statusar</option><option value="published">Publicerade</option><option value="draft">Utkast</option></select></label></div>
            <div className="cms-product-list">{visible.map(product => <article className="cms-product-row" key={product.id}>
              <button className="cms-product-thumbnail" type="button" onClick={() => edit(product)} aria-label={`Redigera ${product.title}`}><MaterialCover material={product} compact /></button>
              <div className="cms-product-name"><button type="button" onClick={() => edit(product)}>{product.title}</button><span>{product.category} · {product.format}</span>{!product.downloadAssetId && <small>Säljfil saknas</small>}</div>
              <span className={`cms-status cms-status--${product.status}`}>{product.status === 'published' ? 'Publicerad' : 'Utkast'}</span><strong className="cms-price">{formatPrice(product.price)}</strong>
              <div className="cms-row-actions"><button type="button" className="shop-icon-button" aria-label={`Redigera ${product.title}`} onClick={() => edit(product)}><PencilSquareIcon /></button><button type="button" className="shop-icon-button" aria-label={`Duplicera ${product.title}`} onClick={() => edit({ ...product, id: crypto.randomUUID(), title: `${product.title} – kopia`, status: 'draft' })}><DocumentDuplicateIcon /></button></div>
            </article>)}</div>
            {!visible.length && <div className="shop-no-results"><ShoppingBagIcon aria-hidden="true" /><h3>Här finns plats för material</h3><p>{search || status !== 'all' ? 'Ändra dina filter för att se fler produkter.' : 'Lägg till din första produkt för att komma igång.'}</p></div>}
          </> : <>
            <div className="cms-section-heading"><div><h2>Kategorier</h2><p>Hjälp besökarna att hitta rätt. Namnändringar uppdaterar även produkterna.</p></div></div>
            <form className="cms-add-category" onSubmit={async event => {
              event.preventDefault(); const name = categoryName.trim();
              if (!name || catalog.categories.some(item => item.toLocaleLowerCase('sv-SE') === name.toLocaleLowerCase('sv-SE'))) { setError('Kategorin finns redan eller saknar namn.'); return; }
              if (await persist({ ...catalog, categories: [...catalog.categories, name] })) setCategoryName('');
            }}><label><span className="sr-only">Ny kategori</span><input required value={categoryName} maxLength={60} onChange={event => setCategoryName(event.target.value)} placeholder="Namn på ny kategori" /></label><button disabled={busy} className="shop-button shop-button--primary"><PlusIcon aria-hidden="true" /> Lägg till</button></form>
            {catalog.categories.map(category => <CategoryRow key={category} name={category} busy={busy} count={products.filter(product => product.category === category).length} rename={name => {
              if (!name || catalog.categories.some(item => item !== category && item.toLocaleLowerCase('sv-SE') === name.toLocaleLowerCase('sv-SE'))) { setError('Kategorinamnet måste vara unikt.'); return; }
              void persist({ ...catalog, categories: catalog.categories.map(item => item === category ? name : item), products: products.map(product => product.category === category ? { ...product, category: name } : product) });
            }} remove={() => { if (catalog.categories.length > 1) void persist({ ...catalog, categories: catalog.categories.filter(item => item !== category) }); else setError('Behåll minst en kategori.'); }} />)}
          </>}
        </section>
      </div>
    </>}
    <Dialog open={editing !== null} onClose={closeEditor} className="shop-dialog shop-ui">
      <DialogBackdrop className="shop-backdrop" /><div className="shop-dialog-position">
        <DialogPanel className="shop-dialog-panel cms-editor">
          {editing && catalog && <form onSubmit={saveProduct}>
            <div className="shop-dialog-heading"><div><span className="shop-eyebrow">PRODUKTREDAKTÖR</span><DialogTitle>{products.some(product => product.id === editing.id) ? 'Redigera material' : 'Ett nytt material'}</DialogTitle></div><button type="button" className="shop-icon-button" onClick={closeEditor} disabled={busy || uploading} aria-label="Stäng redigeraren"><XMarkIcon /></button></div>
            <div className="cms-editor-grid"><div className="cms-editor-main">
              <label>Produktnamn<input value={editing.title} required maxLength={150} onChange={event => patch({ title: event.target.value })} placeholder="Ge materialet ett tydligt namn" /></label>
              <label>Kort beskrivning<input value={editing.subtitle} maxLength={200} onChange={event => patch({ subtitle: event.target.value })} placeholder="En mening om materialet" /></label>
              <label>Beskrivning<textarea rows={5} value={editing.description} required={editing.status === 'published'} maxLength={6000} onChange={event => patch({ description: event.target.value })} placeholder="Vad innehåller materialet och hur kan det användas?" /></label>
              <label>Det här ingår <span>En punkt per rad</span><textarea rows={4} value={editing.includes.join('\n')} maxLength={6000} onChange={event => patch({ includes: event.target.value.split('\n') })} /></label>
              <div className="cms-field-pair"><label>Kategori<select value={editing.category} onChange={event => patch({ category: event.target.value })}>{catalog.categories.map(category => <option key={category}>{category}</option>)}</select></label><label>Pris i SEK<input type="number" min="5" max="100000" step="0.01" required value={editing.price} onChange={event => patch({ price: Number(event.target.value) })} /></label></div>
              <div className="cms-field-pair"><label>Antal sidor<input type="number" min="1" max="10000" step="1" required value={editing.pages} onChange={event => patch({ pages: Number(event.target.value) })} /></label><label>Filformat<select disabled={Boolean(editing.downloadAssetId)} value={editing.format} onChange={event => patch({ format: event.target.value as Material['format'] })}>{['PDF', 'PNG', 'JPG', 'WEBP'].map(format => <option key={format}>{format}</option>)}</select></label></div>
              <fieldset className="cms-ages"><legend>Åldersgrupper i butikens filter</legend>{['F–3', '4–6'].map(age => <label key={age}><input type="checkbox" checked={editing.ages.includes(age)} onChange={event => patch({ ages: event.target.checked ? [...editing.ages, age] : editing.ages.filter(item => item !== age) })} /> Åk {age}</label>)}</fieldset>
              <label>Mer exakt ålder <span>Valfritt</span><input value={editing.ageLabel || ''} maxLength={50} onChange={event => patch({ ageLabel: event.target.value })} placeholder="Till exempel 5–6 år" /></label>
            </div><aside className="cms-editor-side">
              <div className="cms-upload-preview"><MaterialCover material={editing} /></div>
              <label className="cms-upload"><ArrowUpTrayIcon aria-hidden="true" /><span>{uploading ? 'Laddar upp…' : 'Välj produktbild'}</span><input type="file" accept="image/png,image/jpeg,image/webp" disabled={uploading || busy} onChange={event => { const file = event.target.files?.[0]; event.target.value = ''; void upload(file, 'image'); }} /></label>
              <p className="shop-small-print">PNG, JPG eller WebP, högst 8 MB. Produktbilden är offentlig. Använd en omslagsbild eller ett smakprov.</p>
              {editing.image && <label>Beskriv bilden <span>För skärmläsare</span><textarea rows={3} required maxLength={1000} value={editing.image.alt} onChange={event => patch({ image: editing.image ? { ...editing.image, alt: event.target.value } : undefined })} /></label>}
              <div className="cms-download-field"><h3>Säljfil</h3><p>{catalog.assets.find(asset => asset.id === editing.downloadAssetId)?.name || 'Ingen säljfil uppladdad'}</p><label className="cms-upload"><ArrowUpTrayIcon aria-hidden="true" /><span>Välj fil för köparen</span><input type="file" accept="application/pdf,image/png,image/jpeg,image/webp" disabled={uploading || busy} onChange={event => { const file = event.target.files?.[0]; event.target.value = ''; void upload(file, 'file'); }} /></label><small>PDF, PNG, JPG eller WebP, högst 40 MB. Levereras efter bekräftad betalning. En saknad säljfil gör att produkten inte kan köpas.</small></div>
              <label>Publicering<select value={editing.status} onChange={event => patch({ status: event.target.value as Material['status'] })}><option value="draft">Utkast – bara synligt här</option><option value="published">Publicerad – synlig i butiken</option></select></label>
              <label>Etikett <span>Valfritt</span><input maxLength={30} value={editing.badge || ''} onChange={event => patch({ badge: event.target.value })} placeholder="Till exempel Nyhet" /></label>
              <label>Bakgrundsfärg<select value={editing.theme} onChange={event => patch({ theme: event.target.value as Material['theme'] })}>{[['lilac', 'Lavendel'], ['sage', 'Salvia'], ['peach', 'Persika'], ['butter', 'Solgul'], ['sky', 'Himmelsblå'], ['rose', 'Rosa']].map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select></label>
            </aside></div>
            {error && <p role="alert" className="site-error">{error}</p>}
            <div className="cms-editor-footer">{products.some(product => product.id === editing.id) && <button type="button" className="cms-delete" disabled={busy || uploading} onClick={async () => {
              if (!window.confirm(`Ta bort ”${editing.title}” från produktregistret? Tidigare beställningar behålls.`)) return;
              if (await persist({ ...catalog, products: products.filter(product => product.id !== editing.id) })) { setEditing(null); setDirty(false); }
            }}><TrashIcon aria-hidden="true" /> Ta bort</button>}<button type="button" className="shop-button shop-button--secondary" onClick={closeEditor} disabled={busy || uploading}>Avbryt</button><button className="shop-button shop-button--primary" disabled={busy || uploading}><CheckCircleIcon aria-hidden="true" />{busy ? 'Sparar…' : 'Spara produkt'}</button></div>
          </form>}
        </DialogPanel>
      </div>
    </Dialog>
  </main>;
}
