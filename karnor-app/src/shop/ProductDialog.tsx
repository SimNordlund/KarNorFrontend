import { useState } from 'react';
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';
import { ArrowTopRightOnSquareIcon, CheckIcon, ChevronLeftIcon, ChevronRightIcon, DocumentTextIcon, HeartIcon, ShoppingBagIcon, XMarkIcon } from '@heroicons/react/24/outline';
import type { Material } from './materials';
import { formatMaterialAge, formatMaterialMeta, formatPrice } from './materials';
import { useShop } from './ShopContext';
import MaterialCover from './MaterialCover';

export default function ProductDialog({ material, onClose }: { material: Material; onClose: () => void }) {
  const [page, setPage] = useState(0);
  const { cart, favorites, addToCart, toggleFavorite, openCart } = useShop();
  const inCart = cart.some(item => item.id === material.id);
  const isFavorite = favorites.includes(material.id);
  const sample = material.preview;

  return <Dialog open onClose={onClose} className="shop-dialog shop-ui">
    <DialogBackdrop className="shop-backdrop" />
    <div className="shop-dialog-position">
      <DialogPanel className="shop-dialog-panel shop-product-panel">
        <button type="button" className="shop-icon-button shop-product-close" aria-label="Stäng förhandsvisning" onClick={onClose}><XMarkIcon /></button>
        <div className="shop-product-preview">
          {material.image ? (
            <figure className="shop-image-preview">
              <a href={material.image.src} target="_blank" rel="noopener noreferrer" aria-label={`Öppna ${material.title} i full storlek (ny flik)`}>
                <img src={material.image.src} alt={material.image.alt} width={material.image.width} height={material.image.height} decoding="async" />
              </a>
              <figcaption>
                <span>Förhandsvisning av materialet</span>
                <a className="shop-text-button" href={material.image.src} target="_blank" rel="noopener noreferrer">
                  Öppna i full storlek <ArrowTopRightOnSquareIcon aria-hidden="true" />
                  <span className="sr-only">(öppnas i ny flik)</span>
                </a>
              </figcaption>
            </figure>
          ) : (
            <>
              {page === 0 || !sample ? <MaterialCover material={material} /> : <div className={`shop-sample-page material-cover--${material.theme}`}>
                <span className="shop-eyebrow">KARNOR · SMAKPROV</span><h3>{sample.title}</h3><p>{sample.instruction}</p>
                <div className={`shop-sample-prompts ${sample.prompts.length > 3 ? 'shop-sample-prompts--grid' : ''}`}>{sample.prompts.map((prompt, index) => <div key={prompt}><span>{index + 1}</span><p>{prompt}</p></div>)}</div>
                <span className="shop-sample-footer">EXEMPELSIDA · {material.coverTitle}</span>
              </div>}
              {sample && <div className="shop-preview-controls"><button type="button" className="shop-icon-button" onClick={() => setPage(0)} disabled={page === 0} aria-label="Visa omslag"><ChevronLeftIcon /></button><span aria-live="polite">{page === 0 ? 'Omslag' : 'Exempelsida'} · {page + 1} av 2</span><button type="button" className="shop-icon-button" onClick={() => setPage(1)} disabled={page === 1} aria-label="Visa exempelsida"><ChevronRightIcon /></button></div>}
            </>
          )}
        </div>
        <div className="shop-product-details">
          <span className="shop-eyebrow">{material.category}</span><DialogTitle>{material.title}</DialogTitle>
          {material.subtitle && <p className="shop-product-subtitle">{material.subtitle}</p>}
          <p className="shop-product-description">{material.description}</p>
          <div className="shop-product-meta"><span><DocumentTextIcon aria-hidden="true" /> {formatMaterialMeta(material)}</span><span>{formatMaterialAge(material)}</span></div>
          {material.includes.length > 0 && <><h3>Det här ingår</h3><ul className="shop-includes">{material.includes.map((item, index) => <li key={index}><CheckIcon aria-hidden="true" />{item}</li>)}</ul></>}
          <div className="shop-detail-price"><strong>{formatPrice(material.price)}</strong><span>Digitalt material · SEK</span></div>
          <div className="shop-detail-actions"><button type="button" className="shop-button shop-button--primary" onClick={() => { if (inCart) { onClose(); openCart(); } else { addToCart(material); } }}><ShoppingBagIcon aria-hidden="true" />{inCart ? 'Visa varukorgen' : 'Lägg i varukorg'}</button><button type="button" className={`shop-icon-button shop-favorite ${isFavorite ? 'is-favorite' : ''}`} onClick={() => toggleFavorite(material.id)} aria-pressed={isFavorite} aria-label={isFavorite ? 'Ta bort från favoriter' : 'Spara som favorit'}><HeartIcon /></button></div>
          <p className="shop-small-print">{material.canPurchase ? 'Säljfilen blir tillgänglig på din beställningssida efter bekräftad betalning.' : 'Materialet är inte tillgängligt för köp just nu.'}</p>
        </div>
      </DialogPanel>
    </div>
  </Dialog>;
}
