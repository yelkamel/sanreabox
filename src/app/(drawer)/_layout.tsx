import { Link } from 'expo-router';
import { Drawer } from 'expo-router/drawer';
import { Pressable, StyleSheet, type ColorValue } from 'react-native';

import { AppDrawerContent } from '@/components/app-drawer';
import { ThemedText } from '@/components/themed-text';
import { Icon, type IconName } from '@/components/ui/icon';
import { Spacing } from '@/constants/theme';
import { useCart } from '@/hooks/use-cart';

const drawerIcon = (name: IconName) =>
  function DrawerIcon({ color, size }: { color: ColorValue; size: number }) {
    return <Icon name={name} color={color} size={size} />;
  };

export default function DrawerLayout() {
  return (
    <Drawer drawerContent={(props) => <AppDrawerContent {...props} />}>
      <Drawer.Screen
        name="(tabs)"
        options={{ title: 'Sanreabox', drawerLabel: 'Accueil', drawerIcon: drawerIcon('home') }}
      />
      <Drawer.Screen
        name="dashboard"
        options={{ title: 'Tableau de bord', drawerIcon: drawerIcon('dashboard') }}
      />
      <Drawer.Screen
        name="marketplace"
        options={{
          title: 'Marketplace',
          drawerIcon: drawerIcon('store'),
          headerRight: () => <CartButton />,
        }}
      />
      <Drawer.Screen
        name="settings"
        options={{ title: 'Paramètres', drawerIcon: drawerIcon('settings') }}
      />
    </Drawer>
  );
}

function CartButton() {
  const { count } = useCart();

  return (
    <Link href="/cart" asChild>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`Panier, ${count} article${count > 1 ? 's' : ''}`}
        style={({ pressed }) => [styles.cartButton, pressed && styles.pressed]}>
        <Icon name="cart" />
        {count > 0 && <ThemedText type="smallBold">{count}</ThemedText>}
      </Pressable>
    </Link>
  );
}

const styles = StyleSheet.create({
  cartButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.one,
    minHeight: 44,
    paddingHorizontal: Spacing.three,
  },
  pressed: {
    opacity: 0.7,
  },
});
