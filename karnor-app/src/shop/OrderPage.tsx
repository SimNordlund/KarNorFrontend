import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ArrowDownTrayIcon, CheckCircleIcon, ClockIcon } from '@heroicons/react/24/outline';
import { api } from '../api';
import { useShop } from './ShopContext';
import { formatPrice } from './materials';

interface Order {
  id: string; status: 'pending' | 'paid'; total: number;
  items: { id: string; title: string; format: string; downloadUrl?: string }[];
}

export default function OrderPage() {
  const [params] = useSearchParams();
  const sessionId = params.get('session_id');
  const [order, setOrder] = useState<Order | null>(null);
  const [error, setError] = useState('');
  const [attempt, setAttempt] = useState(0);
  const { completePurchase } = useShop();
  useEffect(() => {
    setOrder(null);
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
        if (result.status === 'paid') completePurchase(result.items.map(item => item.id));
        else if (++checks < 5) timer = setTimeout(() => void load(), 3000);
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
      <div className="site-order-files">{order.items.map(item => <a key={item.id} href={item.downloadUrl} className="site-card"><ArrowDownTrayIcon aria-hidden="true" /><span>{item.title}<small>{item.format} · Ladda ner</small></span></a>)}</div>
      <p className="shop-small-print">Spara filerna på din enhet. Den här beställningssidan är tillgänglig i samma webbläsare så länge din köpsession finns kvar, som längst 30 dagar.</p>
    </> : <>
      <ClockIcon className="site-order-icon" aria-hidden="true" /><h1>{error ? 'Vi kunde inte visa beställningen' : 'Vi inväntar din betalning'}</h1>
      <p>{error || 'Beställningen visas här så snart Stripe har bekräftat betalningen.'}</p>
      <button type="button" className="shop-button shop-button--secondary" onClick={() => setAttempt(value => value + 1)}>Uppdatera status</button>
    </>}
    <Link to="/butik" className="shop-text-button">Tillbaka till materialbutiken</Link>
  </main>;
}
