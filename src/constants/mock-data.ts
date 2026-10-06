/**
 * Placeholder data so the screens have something to render before a backend exists.
 */

export type Seller = {
  id: string;
  name: string;
  bio: string;
  location: string;
  rating: number;
  sales: number;
};

export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  emoji: string;
  tint: string;
  sellerId: string;
};

export type Stat = {
  id: string;
  label: string;
  value: string;
  trend: string;
  positive: boolean;
};

export type Activity = {
  id: string;
  title: string;
  time: string;
};

export const sellers: Seller[] = [
  {
    id: 'atelier-nour',
    name: 'Atelier Nour',
    bio: 'Céramique tournée à la main, petites séries.',
    location: 'Lyon',
    rating: 4.8,
    sales: 312,
  },
  {
    id: 'maison-kobo',
    name: 'Maison Kobo',
    bio: 'Papeterie et objets de bureau en matériaux recyclés.',
    location: 'Nantes',
    rating: 4.6,
    sales: 187,
  },
];

export const products: Product[] = [
  {
    id: 'mug-gres',
    name: 'Mug en grès',
    description: 'Mug 30 cl émaillé, passe au lave-vaisselle. Chaque pièce est unique.',
    price: 24,
    emoji: '☕️',
    tint: '#F3D9C4',
    sellerId: 'atelier-nour',
  },
  {
    id: 'vase-bleu',
    name: 'Vase bleu nuit',
    description: 'Vase de 22 cm à l’émail mat, pour fleurs fraîches ou séchées.',
    price: 58,
    emoji: '🏺',
    tint: '#C9D8F2',
    sellerId: 'atelier-nour',
  },
  {
    id: 'bol-ramen',
    name: 'Bol à ramen',
    description: 'Grand bol de 90 cl avec encoche pour les baguettes.',
    price: 32,
    emoji: '🍜',
    tint: '#F2E3B8',
    sellerId: 'atelier-nour',
  },
  {
    id: 'carnet-a5',
    name: 'Carnet A5 pointillé',
    description: 'Carnet 120 pages, papier recyclé 100 g, reliure cousue.',
    price: 14,
    emoji: '📓',
    tint: '#D5E8D4',
    sellerId: 'maison-kobo',
  },
  {
    id: 'stylo-laiton',
    name: 'Stylo en laiton',
    description: 'Stylo bille rechargeable, corps en laiton brossé.',
    price: 39,
    emoji: '🖊️',
    tint: '#EADFC8',
    sellerId: 'maison-kobo',
  },
  {
    id: 'range-cables',
    name: 'Range-câbles en liège',
    description: 'Lot de trois attaches en liège pour ranger les câbles du bureau.',
    price: 12,
    emoji: '🧵',
    tint: '#E7D3C5',
    sellerId: 'maison-kobo',
  },
];

export const stats: Stat[] = [
  { id: 'revenue', label: 'Revenus', value: '12 480 €', trend: '+8,2 %', positive: true },
  { id: 'users', label: 'Utilisateurs actifs', value: '1 204', trend: '+3,1 %', positive: true },
  { id: 'conversion', label: 'Conversion', value: '4,6 %', trend: '+0,4 pt', positive: true },
  { id: 'churn', label: 'Désabonnements', value: '1,9 %', trend: '+0,2 pt', positive: false },
];

export const activities: Activity[] = [
  { id: '1', title: 'Nouvel abonnement Pro', time: 'Il y a 12 min' },
  { id: '2', title: 'Facture réglée', time: 'Il y a 1 h' },
  { id: '3', title: 'Nouveau membre invité', time: 'Hier' },
];

export function getProduct(id: string) {
  return products.find((product) => product.id === id);
}

export function getSeller(id: string) {
  return sellers.find((seller) => seller.id === id);
}

export function formatPrice(amount: number) {
  return `${amount.toFixed(2).replace('.', ',')} €`;
}
