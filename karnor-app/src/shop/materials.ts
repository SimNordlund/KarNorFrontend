export type MaterialCategory = string;
export type MaterialTheme = 'lilac' | 'sage' | 'peach' | 'butter' | 'sky' | 'rose';
export type MaterialMotif = 'friends' | 'nature' | 'craft' | 'movement' | 'planner' | 'calm' | 'blocks' | 'seasons';

export interface Material {
  id: string;
  status: 'draft' | 'published';
  downloadAssetId?: string;
  canPurchase?: boolean;
  title: string;
  coverTitle: string;
  subtitle: string;
  category: MaterialCategory;
  price: number;
  format: 'PDF' | 'PNG' | 'JPG' | 'WEBP';
  pages: number;
  ages: string[];
  ageLabel?: string;
  theme: MaterialTheme;
  motif: MaterialMotif;
  badge?: string;
  description: string;
  includes: string[];
  image?: { src: string; alt: string; width: number; height: number };
  preview?: { title: string; instruction: string; prompts: string[] };
}

export interface Catalog { revision: number; categories: string[]; products: Material[]; checkoutConfigured?: boolean; }

export const formatPrice = (price: number) => `${new Intl.NumberFormat('sv-SE').format(price)} kr`;

export const formatMaterialMeta = (material: Material) =>
  `${material.format} · ${material.pages} ${material.pages === 1 ? 'sida' : 'sidor'}`;

export const formatMaterialAge = (material: Material) =>
  material.ageLabel || `Åk ${material.ages.length === 2 ? 'F–6' : material.ages[0]}`;
