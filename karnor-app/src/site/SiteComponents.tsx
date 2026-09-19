import { useState } from 'react';
import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRightIcon, ArrowUpRightIcon, DocumentArrowDownIcon, HeartIcon } from '@heroicons/react/24/outline';

export function PageIntro({ eyebrow, title, description, children }: { eyebrow: string; title: string; description: string; children?: ReactNode }) {
  return <header className="site-page-intro"><nav className="shop-breadcrumb" aria-label="Brödsmulor"><Link to="/">Hem</Link><span>/</span><span aria-current="page">{eyebrow}</span></nav><span className="shop-eyebrow">{eyebrow}</span><h1>{title}</h1><p>{description}</p>{children}</header>;
}

export function SiteCta() {
  return <section className="site-cta"><HeartIcon aria-hidden="true" /><div><span className="shop-eyebrow">EN LITEN IDÉ KAN BLI NÅGOT STORT</span><h2>Vad vill ni upptäcka tillsammans?</h2><p>Hitta material för gemenskap, rörelse och nyfikna eftermiddagar.</p></div><Link to="/butik" className="shop-button shop-button--primary">Utforska material <ArrowRightIcon aria-hidden="true" /></Link></section>;
}

export function ResourceLink({ title, description, filename }: { title: string; description: string; filename: string }) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  async function download() {
    const base = import.meta.env.VITE_API_BASE_URL;
    if (!base) { setError('Dokumentet är inte tillgängligt just nu.'); return; }
    const tab = window.open('about:blank', '_blank');
    setBusy(true); setError('');
    try {
      if (!tab) throw new Error('Tillåt en ny flik för att öppna dokumentet.');
      const response = await fetch(`${base}/downloadPdfByFileName/${encodeURIComponent(filename)}`);
      if (!response.ok || !response.headers.get('content-type')?.includes('application/pdf')) throw new Error('Dokumentet kunde inte hämtas. Försök igen senare.');
      const url = URL.createObjectURL(await response.blob());
      tab.location.href = url;
      setTimeout(() => URL.revokeObjectURL(url), 60000);
    } catch (failure) { tab?.close(); setError(failure instanceof Error ? failure.message : 'Dokumentet kunde inte öppnas.'); }
    finally { setBusy(false); }
  }
  return <article className="site-card site-resource"><span className="site-card-icon"><DocumentArrowDownIcon aria-hidden="true" /></span><h2>{title}</h2><p>{description}</p><button type="button" className="shop-text-button" disabled={busy} onClick={() => void download()}>{busy ? 'Hämtar dokument…' : 'Öppna dokument'}<ArrowUpRightIcon aria-hidden="true" /></button>{error && <p className="site-error" role="alert">{error}</p>}</article>;
}
