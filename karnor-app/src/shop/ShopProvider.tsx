import { useCallback, useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';
import { ArrowRightIcon, CheckCircleIcon, DocumentArrowDownIcon, LockClosedIcon, ShoppingBagIcon, TrashIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
import { api } from '../api';
import { sellerConfigured } from '../legal/business';
import { ShopContext } from './ShopContext';
import { useCatalog } from './CatalogContext';
import type { Material } from './materials';
import { formatMaterialMeta, formatPrice } from './materials';
import MaterialCover from './MaterialCover';
import './shop.css';

function storedIds(key: string): string[] {
  try {
    const value: unknown = JSON.parse(localStorage.getItem(key) || '[]');
    return Array.isArray(value) ? value.filter((id): id is string => typeof id === 'string').slice(0, 100) : [];
  } catch { return []; }
}

export default function ShopProvider({ children }: { children: ReactNode }) {
  const { catalog, refresh } = useCatalog();
  const [cartIds, setCartIds] = useState(() => storedIds('karnor-cart'));
  const [favorites, setFavorites] = useState(() => storedIds('karnor-favorites'));
  const [open, setOpen] = useState(false);
  const [notice, setNotice] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [acceptedDigitalDelivery, setAcceptedDigitalDelivery] = useState(false);
  const noticeTimer = useRef<ReturnType<typeof setTimeout>>();
  const checkoutRequest = useRef({ key: '', id: '' });
  const cart = cartIds.flatMap(id => catalog.products.filter(product => product.id === id && product.status === 'published'));
  const total = cart.reduce((sum, item) => sum + Math.round(item.price * 100), 0) / 100;
  const canCheckout = Boolean(sellerConfigured && catalog.checkoutConfigured && cart.length && cart.every(item => item.canPurchase));

  useEffect(() => () => clearTimeout(noticeTimer.current), []);
  useEffect(() => { try { localStorage.setItem('karnor-cart', JSON.stringify(cartIds)); } catch { /* Keep working without browser storage. */ } }, [cartIds]);
  useEffect(() => { try { localStorage.setItem('karnor-favorites', JSON.stringify(favorites)); } catch { /* Keep working without browser storage. */ } }, [favorites]);
  const completePurchase = useCallback((ids: string[]) => setCartIds(previous => previous.filter(id => !ids.includes(id))), []);

  function addToCart(material: Material) {
    setCartIds(current => current.includes(material.id) ? current : [...current, material.id]);
    setNotice(`${material.title} finns i din varukorg.`);
    clearTimeout(noticeTimer.current);
    noticeTimer.current = setTimeout(() => setNotice(''), 4500);
  }
  async function checkout() {
    if (!canCheckout || !acceptedTerms || !acceptedDigitalDelivery || busy) return;
    setBusy(true);
    setError('');
    const key = JSON.stringify([catalog.revision, cart.map(item => item.id)]);
    if (checkoutRequest.current.key !== key) checkoutRequest.current = { key, id: crypto.randomUUID() };
    try {
      const result = await api<{ url: string }>('/api/checkout', {
        method: 'POST', body: JSON.stringify({
          productIds: cart.map(item => item.id),
          requestId: checkoutRequest.current.id,
          acceptedTerms: true,
          acceptedDigitalDelivery: true,
        }),
      });
      const url = new URL(result.url);
      if (url.protocol !== 'https:' || url.hostname !== 'checkout.stripe.com') throw new Error('Betalningslänken kunde inte verifieras.');
      window.location.assign(url.href);
    } catch (failure) {
      setError(failure instanceof Error ? failure.message : 'Betalningen kunde inte startas.');
      void refresh();
    } finally { setBusy(false); }
  }
  function closeCart() {
    if (busy) return;
    setOpen(false);
    setAcceptedTerms(false);
    setAcceptedDigitalDelivery(false);
    checkoutRequest.current = { key: '', id: '' };
  }

  return (
    <ShopContext.Provider value={{
      cart, favorites, addToCart, completePurchase,
      removeFromCart: id => setCartIds(current => current.filter(item => item !== id)),
      toggleFavorite: id => setFavorites(current => current.includes(id) ? current.filter(item => item !== id) : [...current, id]),
      openCart: () => { setError(''); setAcceptedTerms(false); setAcceptedDigitalDelivery(false); setOpen(true); void refresh(); },
    }}>
      {children}
      <div className="shop-toast-region" role="status" aria-live="polite" aria-atomic="true">
        {notice && <div className="shop-toast"><CheckCircleIcon aria-hidden="true" /><span>{notice}</span><button type="button" onClick={() => setNotice('')} aria-label="Stäng meddelande"><XMarkIcon /></button></div>}
      </div>
      <Dialog open={open} onClose={closeCart} className="shop-dialog shop-ui">
        <DialogBackdrop className="shop-backdrop" />
        <div className="shop-dialog-position shop-dialog-position--drawer">
          <DialogPanel className="shop-dialog-panel shop-cart-panel">
            <div className="shop-dialog-heading">
              <div><span className="shop-eyebrow">KARNOR MATERIALBUTIK</span><DialogTitle>Din varukorg ({cart.length})</DialogTitle></div>
              <button type="button" className="shop-icon-button" onClick={closeCart} disabled={busy} aria-label="Stäng"><XMarkIcon /></button>
            </div>
            {cart.length === 0 ? <div className="shop-empty-cart">
              <span className="shop-empty-icon"><ShoppingBagIcon aria-hidden="true" /></span>
              <h3>Här finns plats för nya idéer</h3><p>Hitta något som passar just ditt fritids och lägg det i varukorgen.</p>
              <Link to="/butik" className="shop-button shop-button--primary" onClick={closeCart}>Utforska material <ArrowRightIcon aria-hidden="true" /></Link>
            </div> : <>
              <p className="shop-cart-intro"><DocumentArrowDownIcon aria-hidden="true" /> Digitala material · ingen frakt</p>
              <ul className="shop-cart-items">{cart.map(item => <li key={item.id}>
                <div className="shop-cart-cover"><MaterialCover material={item} compact /></div>
                <div className="shop-cart-item-copy"><h3>{item.title}</h3><p>{formatMaterialMeta(item)} · 1 exemplar</p><strong>{formatPrice(item.price)}</strong>{!item.canPurchase && <p>Inte tillgängligt för köp just nu</p>}</div>
                <button type="button" className="shop-icon-button" disabled={busy} onClick={() => setCartIds(current => current.filter(id => id !== item.id))} aria-label={`Ta bort ${item.title}`}><TrashIcon /></button>
              </li>)}</ul>
              <div className="shop-cart-total"><span>Totalt</span><strong>{formatPrice(total)}</strong></div>
              <p className="shop-small-print">Priser i svenska kronor. Eventuell moms ingår. Digital leverans utan frakt.</p>
              <div className="shop-checkout-consents">
                <label><input type="checkbox" checked={acceptedTerms} onChange={event => setAcceptedTerms(event.target.checked)} /><span>Jag har läst och accepterar <Link to="/kopvillkor" target="_blank">köpvillkoren</Link>.</span></label>
                <label><input type="checkbox" checked={acceptedDigitalDelivery} onChange={event => setAcceptedDigitalDelivery(event.target.checked)} /><span>Jag samtycker till att det digitala innehållet levereras direkt efter betalningen och godkänner att ångerrätten därmed upphör när leveransen börjar.</span></label>
              </div>
              {!canCheckout && <p className="site-notice">{!sellerConfigured ? 'Butiken öppnar för betalning när säljarens kontakt- och företagsuppgifter har lagts in.' : catalog.checkoutConfigured ? 'Ta bort material som inte är tillgängliga för att fortsätta.' : 'Betalning är tillfälligt inte tillgänglig. Dina material ligger kvar i varukorgen.'}</p>}
              {error && <p role="alert" className="site-error">{error}</p>}
              <button type="button" className="shop-button shop-button--primary shop-button--full" disabled={!canCheckout || !acceptedTerms || !acceptedDigitalDelivery || busy} onClick={() => void checkout()}>{busy ? 'Öppnar betalningen…' : 'Till säker betalning'} <ArrowRightIcon aria-hidden="true" /></button>
              <p className="shop-small-print shop-centered"><LockClosedIcon className="site-inline-icon" aria-hidden="true" /> Betalningen hanteras av Stripe. <Link to="/integritet" target="_blank">Så hanterar vi personuppgifter.</Link></p>
              <button type="button" className="shop-text-button shop-continue" disabled={busy} onClick={closeCart}>Fortsätt titta på material</button>
            </>}
          </DialogPanel>
        </div>
      </Dialog>
    </ShopContext.Provider>
  );
}
