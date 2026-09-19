import { createContext, useContext } from 'react';
import type { Material } from './materials';

export interface ShopState {
  cart: Material[];
  favorites: string[];
  addToCart: (material: Material) => void;
  removeFromCart: (id: string) => void;
  toggleFavorite: (id: string) => void;
  openCart: () => void;
  completePurchase: (ids: string[]) => void;
}

export const ShopContext = createContext<ShopState | null>(null);

export function useShop() {
  const context = useContext(ShopContext);
  if (!context) throw new Error('useShop must be used within ShopProvider');
  return context;
}
