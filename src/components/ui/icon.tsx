import { SymbolView, type AndroidSymbol } from 'expo-symbols';
import type { ColorValue } from 'react-native';
import type { SFSymbol } from 'sf-symbols-typescript';

import { useTheme } from '@/hooks/use-theme';

const symbols = {
  home: { ios: 'house.fill', material: 'home' },
  explore: { ios: 'safari.fill', material: 'explore' },
  favorites: { ios: 'heart.fill', material: 'favorite' },
  profile: { ios: 'person.fill', material: 'person' },
  dashboard: { ios: 'chart.bar.fill', material: 'bar_chart' },
  store: { ios: 'bag.fill', material: 'shopping_bag' },
  settings: { ios: 'gearshape.fill', material: 'settings' },
  cart: { ios: 'cart.fill', material: 'shopping_cart' },
  logout: { ios: 'rectangle.portrait.and.arrow.right', material: 'logout' },
  search: { ios: 'magnifyingglass', material: 'search' },
  chevron: { ios: 'chevron.right', material: 'chevron_right' },
  plus: { ios: 'plus', material: 'add' },
  minus: { ios: 'minus', material: 'remove' },
  star: { ios: 'star.fill', material: 'star' },
  trash: { ios: 'trash', material: 'delete' },
} satisfies Record<string, { ios: SFSymbol; material: AndroidSymbol }>;

export type IconName = keyof typeof symbols;

type IconProps = {
  name: IconName;
  size?: number;
  color?: ColorValue;
};

export function Icon({ name, size = 20, color }: IconProps) {
  const theme = useTheme();
  const { ios, material } = symbols[name];

  return (
    <SymbolView
      name={{ ios, android: material, web: material }}
      size={size}
      tintColor={color ?? theme.text}
    />
  );
}
