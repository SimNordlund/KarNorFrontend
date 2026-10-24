import { useEffect, useRef, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ArrowDownTrayIcon, CheckCircleIcon, ClockIcon } from '@heroicons/react/24/outline';
import { api, apiUrl } from '../api';
import { business } from '../legal/business';
import { useShop } from './ShopContext';
import { formatPrice } from './materials';

interface Order {
  id: string; status: 'pending' | 'paid'; total: number; createdAt?: string | number; termsVersion?: string; digitalDeliveryConsentAt?: string | number;
  items: { id: string; title: string; format: string; downloadUrl?: string }[];
  emailDelivery?: { status: 'pending' | 'sent' | 'failed'; email: string; attachmentCount: number };
}

function formatDateTime(value: string | number | undefined) {
  if (!value) return 'Ej angivet';
  return new Intl.DateTimeFormat('sv-SE', { dateStyle: 'long', timeStyle: 'short' }).format(new Date(value));
}

function downloadConfirmation(order: Order) {
  const termsVersion = order.termsVersion || '2026-09-21';
  const lines = [
    'KÖPBEKRÄFTELSE FRÅN KARNOR',
    '',
    `Säljare: ${business.legalName} (${business.brand})`,
    `Organisationsnummer: ${business.organizationNumber}`,
    `Postadress: ${business.address}`,
    `E-post: ${business.email}`,
    '',
    `Beställningsreferens: ${order.id}`,
    `Beställningsdatum: ${formatDateTime(order.createdAt)}`,
    `Totalt: ${formatPrice(order.total)}`,
    '',
    'Material:',
    ...order.items.map(item => `- ${item.title} (${item.format})`),
    '',
    `Köpvillkor: version ${termsVersion}`,
    `Villkor: ${window.location.origin}/kopvillkor`,
    `Kontakt och reklamation: ${window.location.origin}/kontakt`,
    '',
    'Samtycke till omedelbar digital leverans:',
    'Före betalningen samtyckte kunden aktivt till att det digitala innehållet levereras direkt och godkände att ångerrätten upphör när leveransen börjar.',
    `Samtycket registrerades: ${formatDateTime(order.digitalDeliveryConsentAt)}`,
  ];
  const url = URL.createObjectURL(new Blob([lines.join('\n')], { type: 'text/plain;charset=utf-8' }));
  const link = document.createElement('a');
  link.href = url;
  link.download = `karnor-kopbekraftelse-${order.id}.txt`;
  link.click();
  URL.revokeObjectURL(url);
}

export default function OrderPage() {
  const [params] = useSearchParams();
  const sessionId = params.get('session_id');
  const [order, setOrder] = useState<Order | null>(null);
  const [error, setError] = useState('');
  const [attempt, setAttempt] = useState(0);
  const completedSession = useRef('');
  const { completePurchase } = useShop();
  useEffect(() => { setOrder(null); }, [sessionId]);
  useEffect(() => {
    if (!sessionId || !/^cs_[a-zA-Z0-9_]+$/.test(sessionId)) { setError('Ingen beställning hittades i länken.'); return; }
    let active = true;
    let timer: ReturnType<typeof setTimeout>;
    let checks = 0;
    setError('');
    async function load() {
      try {
        const result = await api<Order>(`/api/orders/${encodeURIComponent(sessionId!)}`);
        if (!active) return;
        setOrder(result);
        if (result.status === 'paid' && completedSession.current !== sessionId) {
          completePurchase(result.items.map(item => item.id));
          completedSession.current = sessionId!;
        }
        if ((result.status !== 'paid' || result.emailDelivery?.status === 'pending') && ++checks < 12) timer = setTimeout(() => void load(), 3000);
      } catch (failure) { if (active) setError(failure instanceof Error ? failure.message : 'Beställningen kunde inte hämtas.'); }
    }
    void load();
    return () => { active = false; clearTimeout(timer); };
  }, [sessionId, completePurchase, attempt]);
  return <main id="main-content" className="site-container site-section site-order">
    <span className="shop-eyebrow">DIN BESTÄLLNING</span>
    {order?.status === 'paid' ? <>
      <CheckCircleIcon className="site-order-icon" aria-hidden="true" />
      <h1>Tack för din beställning!</h1><p>Betalningen på {formatPrice(order.total)} är bekräftad. Här finns dina material.</p>
      {error && <p role="alert" className="site-error">{error}</p>}
      {order.emailDelivery && <div className="site-order-email site-notice" role="status">
        {order.emailDelivery.status === 'sent' ? <><strong>Materialet har skickats till {order.emailDelivery.email}.</strong><p>{order.emailDelivery.attachmentCount > 0 ? 'Filerna är bifogade. Mejlet innehåller även skyddade nedladdningslänkar.' : 'Mejlet innehåller skyddade nedladdningslänkar eftersom filerna är för stora för att bifogas.'} Kontrollera även skräpposten.</p></> : order.emailDelivery.status === 'pending' ? <><strong>Vi förbereder ditt mejl till {order.emailDelivery.email}.</strong><p>Du kan ladda ner materialet här medan du väntar.</p><button type="button" className="shop-text-button" onClick={() => setAttempt(value => value + 1)}>Uppdatera mejlstatus</button></> : <><strong>Mejlleveransen kunde inte genomföras.</strong><p>Du kan fortfarande ladda ner dina filer här. <Link to="/kontakt">Kontakta oss</Link> om du behöver hjälp med mejlet.</p></>}
      </div>}
      <div className="site-order-files">{order.items.map(item => <a key={item.id} href={item.downloadUrl ? apiUrl(item.downloadUrl) : undefined} className="site-card"><ArrowDownTrayIcon aria-hidden="true" /><span>{item.title}<small>{item.format} · Ladda ner</small></span></a>)}</div>
      <p className="shop-small-print">Spara filerna på din enhet. Den här beställningssidan är tillgänglig i samma webbläsare så länge din köpsession finns kvar, som längst 30 dagar.</p>
      {order.digitalDeliveryConsentAt && <div className="site-order-confirmation"><strong>Bekräftelse av ditt samtycke</strong><p>Före betalningen samtyckte du aktivt till att det digitala innehållet levereras direkt och godkände att ångerrätten upphör när leveransen börjar. Köpvillkor version {order.termsVersion || '2026-09-21'} gäller för beställningen.</p><div className="site-order-confirmation-actions"><button type="button" className="shop-text-button" onClick={() => downloadConfirmation(order)}><ArrowDownTrayIcon aria-hidden="true" /> Ladda ner köpbekräftelse</button><Link to="/kopvillkor">Visa köpvillkoren</Link></div></div>}
    </> : <>
      <ClockIcon className="site-order-icon" aria-hidden="true" /><h1>{error ? 'Vi kunde inte visa beställningen' : 'Vi inväntar din betalning'}</h1>
      <p>{error || 'Beställningen visas här så snart Stripe har bekräftat betalningen.'}</p>
      <button type="button" className="shop-button shop-button--secondary" onClick={() => setAttempt(value => value + 1)}>Uppdatera status</button>
    </>}
    <Link to="/butik" className="shop-text-button">Tillbaka till materialbutiken</Link>
  </main>;
}
