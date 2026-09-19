import { createContext, useContext } from 'react';
import type { Catalog } from './materials';

export const CatalogContext = createContext<{
  catalog: Catalog;
  loading: boolean;
  error: string;
  refresh: () => Promise<void>;
} | null>(null);

export function useCatalog() {
  const context = useContext(CatalogContext);
  if (!context) throw new Error('CatalogProvider saknas.');
  return context;
}
