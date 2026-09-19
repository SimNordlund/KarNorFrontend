import { useEffect, useRef, useState } from 'react';
import type { FormEvent, ReactNode } from 'react';
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';
import { ArrowLeftIcon, ArrowRightIcon, CheckCircleIcon, CreditCardIcon, DocumentArrowDownIcon, InformationCircleIcon, ShoppingBagIcon, TrashIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
import { ShopContext } from './ShopContext';
import type { Material } from './materials';
import { formatMaterialMeta, formatPrice } from './materials';
import MaterialCover from './MaterialCover';
import './shop.css';

export default function ShopProvider({ children }: { children: ReactNode }) {
  // Intentionally kept in memory: no storage, requests, payments or orders yet.
  const [cart, setCart] = useState<Material[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [view, setView] = useState<'cart' | 'checkout' | 'complete' | null>(null);
  const [notice, setNotice] = useState('');
  const noticeTimer = useRef<ReturnType<typeof setTimeout>>();
  const dialogTitleRef = useRef<HTMLHeadingElement | null>(null);
  const total = cart.reduce((sum, item) => sum + item.price, 0);

  useEffect(() => () => clearTimeout(noticeTimer.current), []);
  useEffect(() => {
    if (view) dialogTitleRef.current?.focus();
  }, [view]);

  function addToCart(material: Material) {
    setCart(current => current.some(item => item.id === material.id) ? current : [...current, material]);
    setNotice(`${material.title} finns i din varukorg.`);
    clearTimeout(noticeTimer.current);
    noticeTimer.current = setTimeout(() => setNotice(''), 4500);
  }

  function showOrderPreview(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (cart.length) setView('complete');
  }

  return (
    <ShopContext.Provider value={{
      cart, favorites, addToCart,
      removeFromCart: id => setCart(current => current.filter(item => item.id !== id)),
      toggleFavorite: id => setFavorites(current => current.includes(id) ? current.filter(item => item !== id) : [...current, id]),
      openCart: () => setView('cart'),
    }}>
      {children}
      <div className="shop-toast-region" role="status" aria-live="polite" aria-atomic="true">
        {notice && <div className="shop-toast"><CheckCircleIcon aria-hidden="true" /><span>{notice}</span><button type="button" onClick={() => setNotice('')} aria-label="Stäng meddelande"><XMarkIcon /></button></div>}
      </div>
      <Dialog open={view !== null} onClose={() => setView(null)} initialFocus={dialogTitleRef} className="shop-dialog shop-ui">
        <DialogBackdrop className="shop-backdrop" />
        <div className={`shop-dialog-position ${view === 'cart' ? 'shop-dialog-position--drawer' : ''}`}>
          <DialogPanel className={`shop-dialog-panel ${view === 'cart' ? 'shop-cart-panel' : 'shop-checkout-panel'}`}>
            <div className="shop-dialog-heading">
              <div><span className="shop-eyebrow">KARNOR MATERIALBUTIK</span><DialogTitle ref={dialogTitleRef} tabIndex={-1}>{view === 'cart' ? `Din varukorg (${cart.length})` : view === 'checkout' ? 'Kassan' : 'Din exempelorder'}</DialogTitle></div>
              <button type="button" className="shop-icon-button" onClick={() => setView(null)} aria-label="Stäng"><XMarkIcon /></button>
            </div>
            {view === 'cart' && <>
              {cart.length === 0 ? <div className="shop-empty-cart">
                <span className="shop-empty-icon"><ShoppingBagIcon aria-hidden="true" /></span>
                <h3>Här finns plats för nya idéer</h3><p>Hitta något som passar just ditt fritids och lägg det i varukorgen.</p>
                <Link to="/butik" className="shop-button shop-button--primary" onClick={() => setView(null)}>Utforska material <ArrowRightIcon aria-hidden="true" /></Link>
              </div> : <>
                <p className="shop-cart-intro"><DocumentArrowDownIcon aria-hidden="true" /> Digitala material · ingen frakt</p>
                <ul className="shop-cart-items">{cart.map(item => <li key={item.id}>
                  <div className="shop-cart-cover"><MaterialCover material={item} compact /></div>
                  <div className="shop-cart-item-copy"><h3>{item.title}</h3><p>{formatMaterialMeta(item)} · 1 exemplar</p><strong>{formatPrice(item.price)}</strong></div>
                  <button type="button" className="shop-icon-button" onClick={() => setCart(current => current.filter(product => product.id !== item.id))} aria-label={`Ta bort ${item.title}`}><TrashIcon /></button>
                </li>)}</ul>
                <div className="shop-cart-total"><span>Totalt</span><strong>{formatPrice(total)}</strong></div>
                <p className="shop-small-print">Exempelpriser i SEK. Varje digitalt material läggs till en gång.</p>
                <button type="button" className="shop-button shop-button--primary shop-button--full" onClick={() => setView('checkout')}>Till kassan <ArrowRightIcon aria-hidden="true" /></button>
                <button type="button" className="shop-text-button shop-continue" onClick={() => setView(null)}>Fortsätt titta på material</button>
              </>}
              <p className="shop-demo-note"><InformationCircleIcon aria-hidden="true" /> Det här är en förhandsvisning av butiken. Varukorgen töms när sidan laddas om.</p>
            </>}
            {view === 'checkout' && <>
              <button type="button" className="shop-text-button shop-back-button" onClick={() => setView('cart')}><ArrowLeftIcon aria-hidden="true" /> Tillbaka till varukorgen</button>
              <div className="shop-checkout-notice"><InformationCircleIcon aria-hidden="true" /><p><strong>Prova hur kassan kommer att fungera.</strong> Inget köp görs och inga uppgifter skickas eller sparas. Använd gärna påhittade uppgifter.</p></div>
              <form onSubmit={showOrderPreview} className="shop-checkout-form">
                <div className="shop-checkout-fields">
                  <h3>1. Dina uppgifter</h3>
                  <label htmlFor="shop-customer-name">Namn<input id="shop-customer-name" name="customerName" autoComplete="off" placeholder="Förnamn Efternamn" required maxLength={100} /></label>
                  <label htmlFor="shop-customer-email">E-post<input id="shop-customer-email" name="customerEmail" type="email" autoComplete="off" placeholder="namn@exempel.se" required maxLength={254} /></label>
                  <label htmlFor="shop-customer-school">Skola eller fritidshem <span>(valfritt)</span><input id="shop-customer-school" name="school" autoComplete="off" placeholder="Ditt fritidshem" maxLength={150} /></label>
                  <fieldset className="shop-payment-options"><legend>2. Betalsätt <span>– endast exempel</span></legend>
                    <label><input type="radio" name="payment" value="card" defaultChecked /><CreditCardIcon aria-hidden="true" /><span>Kort</span></label>
                    <label><input type="radio" name="payment" value="swish" /><span className="shop-swish-symbol" aria-hidden="true">S</span><span>Swish</span></label>
                  </fieldset>
                  <p className="shop-small-print">Betalning kopplas in senare. Inga kort- eller betalningsuppgifter behövs här.</p>
                </div>
                <div className="shop-order-summary"><h3>Dina material</h3>
                  <ul>{cart.map(item => <li key={item.id}><span>{item.title}</span><strong>{formatPrice(item.price)}</strong></li>)}</ul>
                  <div className="shop-cart-total"><span>Totalt</span><strong>{formatPrice(total)}</strong></div>
                  <p className="shop-small-print">Digitala material · exempelpriser i SEK</p>
                  <button type="submit" className="shop-button shop-button--primary shop-button--full" disabled={!cart.length}>Förhandsvisa order <ArrowRightIcon aria-hidden="true" /></button>
                  <p className="shop-small-print shop-centered">Ingen betalning genomförs.</p>
                </div>
              </form>
            </>}
            {view === 'complete' && <div className="shop-complete">
              <span className="shop-empty-icon"><CheckCircleIcon aria-hidden="true" /></span>
              <h3>Så kan din beställning se ut</h3><p>Du har valt {cart.length} material för totalt {formatPrice(total)}. När butiken är lanserad kommer köpta material att kunna laddas ner här.</p>
              <ul>{cart.map(item => <li key={item.id}><DocumentArrowDownIcon aria-hidden="true" /><span>{item.title}</span><span>{item.format}</span></li>)}</ul>
              <p className="shop-checkout-notice">Detta är en demo. Ingen order har skapats och inget belopp har dragits. Leverans av köpta material är inte aktiverad ännu.</p>
              <button type="button" className="shop-button shop-button--primary" onClick={() => setView(null)}>Fortsätt utforska</button>
            </div>}
          </DialogPanel>
        </div>
      </Dialog>
    </ShopContext.Provider>
  );
}
