import { useCallback, useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { api } from '../api';
import { CatalogContext } from './CatalogContext';
import type { Catalog } from './materials';

export default function CatalogProvider({ children }: { children: ReactNode }) {
  const [catalog, setCatalog] = useState<Catalog>({ revision: 0, categories: [], products: [], checkoutConfigured: false });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const request = useRef(0);
  const refresh = useCallback(async () => {
    const current = ++request.current;
    try {
      const result = await api<Catalog>('/api/catalog');
      if (current !== request.current) return;
      setCatalog(result);
      setError('');
    } catch {
      if (current !== request.current) return;
      setCatalog(previous => ({ ...previous, checkoutConfigured: false }));
      setError('Butiken kunde inte uppdateras. Försök igen om en stund.');
    } finally { if (current === request.current) setLoading(false); }
  }, []);
  useEffect(() => {
    void refresh();
    const onFocus = () => { void refresh(); };
    window.addEventListener('focus', onFocus);
    return () => { request.current += 1; window.removeEventListener('focus', onFocus); };
  }, [refresh]);
  return <CatalogContext.Provider value={{ catalog, loading, error, refresh }}>{children}</CatalogContext.Provider>;
}
