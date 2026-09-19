import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ArrowDownIcon, ArrowUpRightIcon, CheckIcon, ChevronDownIcon, DocumentArrowDownIcon, EyeIcon, HeartIcon, MagnifyingGlassIcon, ShoppingBagIcon, SparklesIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { formatMaterialAge, formatMaterialMeta, formatPrice } from './shop/materials';
import { useCatalog } from './shop/CatalogContext';
import type { MaterialCategory } from './shop/materials';
import { useShop } from './shop/ShopContext';
import MaterialCover from './shop/MaterialCover';
import ProductDialog from './shop/ProductDialog';

export default function Shop() {
  const { catalog, error, loading, refresh } = useCatalog();
  const { products: materials, categories } = catalog;
  const [params] = useSearchParams();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState<MaterialCategory>('');
  const [age, setAge] = useState('Alla åldrar');
  const [sort, setSort] = useState('featured');
  const [favoritesOnly, setFavoritesOnly] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selected = materials.find(material => material.id === selectedId);
  const activeCategory = categories.includes(category) ? category : '';
  const { cart, favorites, addToCart, toggleFavorite, openCart } = useShop();

  const query = search.trim().toLocaleLowerCase('sv-SE');
  const filtered = materials.filter(material =>
    (!activeCategory || material.category === activeCategory) &&
    (age === 'Alla åldrar' || material.ages.includes(age)) &&
    (!favoritesOnly || favorites.includes(material.id)) &&
    (!query || `${material.title} ${material.category} ${material.description}`.toLocaleLowerCase('sv-SE').includes(query))
  ).sort((a, b) => sort === 'price-asc' ? a.price - b.price : sort === 'price-desc' ? b.price - a.price : sort === 'name' ? a.title.localeCompare(b.title, 'sv-SE') : 0);
  const hasFilters = Boolean(query) || Boolean(activeCategory) || age !== 'Alla åldrar' || favoritesOnly;

  function resetFilters() { setSearch(''); setCategory(''); setAge('Alla åldrar'); setFavoritesOnly(false); }

  return <main className="shop-page shop-ui" id="main-content">
    <div className="shop-preview-banner"><span className="shop-preview-dot" /> Digitala material för meningsfulla eftermiddagar <span className="shop-preview-divider">·</span><span>Med omtanke om fritids</span></div>
    <div className="shop-container">
      <nav aria-label="Brödsmulor" className="shop-breadcrumb"><Link to="/">Hem</Link><span>/</span><span aria-current="page">Materialbutik</span></nav>
      <section className="shop-hero" aria-labelledby="shop-title">
        <div className="shop-hero-copy"><span className="shop-eyebrow"><span /> IDÉER FÖR MENINGSFULLA EFTERMIDDAGAR</span>
          <h1 id="shop-title">Små material.<br /><em>Stora möjligheter.</em></h1>
          <p>Mer lek, mer gemenskap och fler nyfikna stunder. Upptäck material som gör det lite enklare att skapa ett riktigt fint fritids.</p>
          <a href="#material" className="shop-button shop-button--primary">Hitta ditt nästa material <ArrowDownIcon aria-hidden="true" /></a>
          <div className="shop-hero-caption"><HeartIcon aria-hidden="true" /> Med fritidshemmets vardag i fokus</div>
        </div>
        <div className="shop-hero-art" aria-hidden="true"><div className="shop-hero-orbit" /><span className="shop-hero-spark shop-hero-spark--one">✳</span><span className="shop-hero-spark shop-hero-spark--two">✦</span>
          {materials[1] && <div className="shop-hero-book shop-hero-book--back"><MaterialCover material={materials[1]} /></div>}
          {materials[0] && <div className="shop-hero-book shop-hero-book--front"><MaterialCover material={materials[0]} /></div>}
          <div className="shop-hero-sticker">För fler<br /><strong>aha!</strong><br />på fritids</div>
          <span className="shop-hero-handwriting">En idé kan bli ett helt äventyr.</span>
        </div>
      </section>
      <div className="shop-benefits"><div><DocumentArrowDownIcon aria-hidden="true" /><span><strong>Digitala material</strong><span>Bildstöd och inspiration för fritids</span></span></div><div><SparklesIcon aria-hidden="true" /><span><strong>Plats för upptäckarglädje</strong><span>Lek, lärande och skapande</span></span></div><div><HeartIcon aria-hidden="true" /><span><strong>Med omtanke om fritids</strong><span>För små och stora stunder</span></span></div></div>
      <section id="material" className="shop-catalog" aria-labelledby="material-title">
        {params.get('betalning') === 'avbruten' && <p className="site-notice" role="status">Betalningen avbröts. Dina material finns kvar i varukorgen.</p>}
        {error && <p className="site-error" role="alert">{error} <button type="button" className="shop-text-button" onClick={() => void refresh()}>Försök igen</button></p>}
        {loading && <p className="shop-small-print" role="status">Hämtar material…</p>}
        <div className="shop-section-heading"><div><span className="shop-eyebrow">INSPIRATION ATT TA MED IN I VARDAGEN</span><h2 id="material-title">Hitta något för ditt fritids</h2></div><button type="button" className={`shop-favorites-filter ${favoritesOnly ? 'is-active' : ''}`} aria-pressed={favoritesOnly} onClick={() => setFavoritesOnly(!favoritesOnly)}><HeartIcon aria-hidden="true" /> Mina favoriter <span>{favorites.length}</span></button></div>
        <div className="shop-category-list" role="group" aria-label="Filtrera på kategori">{(['', ...categories]).map(item => <button key={item} type="button" className={activeCategory === item ? 'is-active' : ''} aria-pressed={activeCategory === item} onClick={() => setCategory(item)}>{item || 'Alla material'}{!item && <span>{materials.length}</span>}</button>)}</div>
        <div className="shop-filter-bar"><div className="shop-search"><MagnifyingGlassIcon aria-hidden="true" /><label className="sr-only" htmlFor="material-search">Sök material</label><input id="material-search" type="search" value={search} onChange={event => setSearch(event.target.value)} placeholder="Vad vill ni hitta på idag? Sök material…" />{search && <button type="button" aria-label="Rensa sökning" onClick={() => setSearch('')}><XMarkIcon /></button>}</div>
          <div className="shop-select"><label className="sr-only" htmlFor="material-age">Årskurs</label><select id="material-age" value={age} onChange={event => setAge(event.target.value)}><option>Alla åldrar</option><option value="F–3">Förskoleklass – åk 3</option><option value="4–6">Årskurs 4–6</option></select><ChevronDownIcon aria-hidden="true" /></div>
          <div className="shop-select"><label className="sr-only" htmlFor="material-sort">Sortera material</label><select id="material-sort" value={sort} onChange={event => setSort(event.target.value)}><option value="featured">Utvald ordning</option><option value="price-asc">Lägst pris först</option><option value="price-desc">Högst pris först</option><option value="name">Namn A–Ö</option></select><ChevronDownIcon aria-hidden="true" /></div>
        </div>
        <div className="shop-results-summary"><p role="status" aria-live="polite">Visar <strong>{filtered.length}</strong> av {materials.length} material{favoritesOnly ? ' · Dina favoriter' : ''}</p>{hasFilters ? <button type="button" className="shop-text-button" onClick={resetFilters}>Rensa filter <XMarkIcon aria-hidden="true" /></button> : <span>Lite inspiration räcker långt.</span>}</div>
        {filtered.length > 0 ? <div className="shop-product-grid">{filtered.map(material => {
          const inCart = cart.some(item => item.id === material.id);
          const isFavorite = favorites.includes(material.id);
          return <article className="shop-product-card" key={material.id}>
            <div className="shop-card-visual"><button type="button" className="shop-cover-button" onClick={() => setSelectedId(material.id)} aria-label={`Förhandsvisa ${material.title}`}><MaterialCover material={material} /></button>{material.badge && <span className="shop-product-badge">{material.badge}</span>}<button type="button" className={`shop-icon-button shop-card-favorite ${isFavorite ? 'is-favorite' : ''}`} aria-pressed={isFavorite} aria-label={`${isFavorite ? 'Ta bort' : 'Spara'} ${material.title} ${isFavorite ? 'från' : 'som'} favorit`} onClick={() => toggleFavorite(material.id)}><HeartIcon /></button><button type="button" className="shop-quick-preview" onClick={() => setSelectedId(material.id)}><EyeIcon aria-hidden="true" /> Förhandsvisa</button></div>
            <div className="shop-card-copy"><span className="shop-card-category">{material.category}</span><h3><button type="button" onClick={() => setSelectedId(material.id)}>{material.title}</button></h3><p className="shop-card-meta">{formatMaterialMeta(material)} <span>{formatMaterialAge(material)}</span></p><div className="shop-card-bottom"><strong>{formatPrice(material.price)}</strong><button type="button" className={`shop-add-button ${inCart ? 'is-added' : ''}`} onClick={() => inCart ? openCart() : addToCart(material)} aria-label={`${inCart ? 'Visa varukorgen med' : 'Lägg i varukorg:'} ${material.title}`}>{inCart ? <CheckIcon aria-hidden="true" /> : <ShoppingBagIcon aria-hidden="true" />}<span>{inCart ? 'I varukorgen' : 'Lägg i varukorg'}</span></button></div></div>
          </article>;
        })}</div> : !loading && !error ? <div className="shop-no-results"><MagnifyingGlassIcon aria-hidden="true" /><h3>{favoritesOnly && favorites.length === 0 ? 'Dina favoriter väntar på att bli hittade' : materials.length === 0 ? 'Här kommer nya material' : 'Inga material hittades just nu'}</h3><p>{favoritesOnly && favorites.length === 0 ? 'Tryck på hjärtat vid ett material så samlas det här under ditt besök.' : materials.length === 0 ? 'Välkommen tillbaka för att upptäcka mer inspiration för fritids.' : 'Prova ett annat sökord eller välj en annan kategori.'}</p><button type="button" className="shop-button shop-button--secondary" onClick={resetFilters}>Visa alla material</button></div> : null}
        <p className="shop-catalog-disclaimer">Digitala material för din verksamhet. Priser i svenska kronor.</p>
      </section>
      <section className="shop-how-it-works" aria-labelledby="shop-how-title"><div><span className="shop-eyebrow">FRÅN IDÉ TILL AKTIVITET</span><h2 id="shop-how-title">En liten hjälp.<br />Mycket upptäckarglädje.</h2><p>Från en ny idé till något att göra tillsammans.</p></div><ol><li><span>01</span><h3>Hitta din inspiration</h3><p>Bläddra bland materialen och kika på ett smakprov.</p></li><li><span>02</span><h3>Välj dina favoriter</h3><p>Samla det som passar er i varukorgen och betala via Stripe.</p></li><li><span>03</span><h3>Gör något fint av dagen</h3><p>Ladda ner efter betalningen och låt idéerna ta plats på fritids.</p></li></ol></section>
      <section className="shop-about-strip"><span className="shop-about-mark" aria-hidden="true"><HeartIcon /></span><div><h2>Fritids är mer än tiden efter skolan.</h2><p>Det är vänskap, nya upptäckter och utrymme att växa. Det vill vi ge plats för.</p></div><Link to="/about">Lär känna Karnor <ArrowUpRightIcon aria-hidden="true" /></Link></section>
    </div>
    {selected && <ProductDialog key={selected.id} material={selected} onClose={() => setSelectedId(null)} />}
  </main>;
}
