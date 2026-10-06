import { createContext, use, useState, type PropsWithChildren } from 'react';

import { getProduct, type Product } from '@/constants/mock-data';

export type CartLine = {
  product: Product;
  quantity: number;
};

type CartContextValue = {
  lines: CartLine[];
  count: number;
  total: number;
  add: (productId: string) => void;
  decrement: (productId: string) => void;
  remove: (productId: string) => void;
  clear: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: PropsWithChildren) {
  const [quantities, setQuantities] = useState<Record<string, number>>({});

  const lines = Object.entries(quantities).flatMap(([id, quantity]) => {
    const product = getProduct(id);
    return product ? [{ product, quantity }] : [];
  });

  const setQuantity = (productId: string, change: (current: number) => number) =>
    setQuantities((previous) => {
      const { [productId]: current = 0, ...rest } = previous;
      const next = change(current);
      return next > 0 ? { ...rest, [productId]: next } : rest;
    });

  const value: CartContextValue = {
    lines,
    count: lines.reduce((sum, line) => sum + line.quantity, 0),
    total: lines.reduce((sum, line) => sum + line.quantity * line.product.price, 0),
    add: (productId) => setQuantity(productId, (current) => current + 1),
    decrement: (productId) => setQuantity(productId, (current) => current - 1),
    remove: (productId) => setQuantity(productId, () => 0),
    clear: () => setQuantities({}),
  };

  return <CartContext value={value}>{children}</CartContext>;
}

export function useCart() {
  const value = use(CartContext);
  if (!value) {
    throw new Error('useCart must be used inside <CartProvider>');
  }
  return value;
}
