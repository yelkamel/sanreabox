import { useRouter } from 'expo-router';
import { Pressable, StyleSheet, View } from 'react-native';

import { ProductThumbnail } from '@/components/product-card';
import { ThemedText } from '@/components/themed-text';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Icon, type IconName } from '@/components/ui/icon';
import { Screen } from '@/components/ui/screen';
import { formatPrice } from '@/constants/mock-data';
import { Spacing } from '@/constants/theme';
import { useCart } from '@/hooks/use-cart';
import { useTheme } from '@/hooks/use-theme';

export default function CartScreen() {
  const theme = useTheme();
  const router = useRouter();
  const { lines, total, add, decrement, remove } = useCart();

  if (lines.length === 0) {
    return (
      <Screen contentStyle={styles.empty}>
        <Icon name="cart" size={40} color={theme.textSecondary} />
        <ThemedText type="subtitle">Panier vide</ThemedText>
        <ThemedText themeColor="textSecondary" style={styles.centerText}>
          Ajoutez un produit depuis la marketplace pour le retrouver ici.
        </ThemedText>
        <Button title="Parcourir les produits" onPress={() => router.replace('/marketplace')} />
      </Screen>
    );
  }

  return (
    <Screen>
      {lines.map(({ product, quantity }) => (
        <Card key={product.id} style={styles.line}>
          <ProductThumbnail product={product} size={56} />
          <View style={styles.lineText}>
            <ThemedText type="smallBold" numberOfLines={1}>
              {product.name}
            </ThemedText>
            <ThemedText type="small" themeColor="textSecondary" style={styles.figure}>
              {formatPrice(product.price * quantity)}
            </ThemedText>
          </View>
          <View style={styles.stepper}>
            {quantity > 1 ? (
              <StepperButton
                icon="minus"
                label={`Retirer un ${product.name}`}
                onPress={() => decrement(product.id)}
              />
            ) : (
              <StepperButton
                icon="trash"
                label={`Supprimer ${product.name} du panier`}
                onPress={() => remove(product.id)}
              />
            )}
            <ThemedText type="smallBold" style={[styles.figure, styles.quantity]}>
              {quantity}
            </ThemedText>
            <StepperButton
              icon="plus"
              label={`Ajouter un ${product.name}`}
              onPress={() => add(product.id)}
            />
          </View>
        </Card>
      ))}

      <View style={[styles.total, { borderTopColor: theme.border }]}>
        <ThemedText>Total</ThemedText>
        <ThemedText style={[styles.totalValue, styles.figure]}>{formatPrice(total)}</ThemedText>
      </View>
      {/* No payment backend yet: the button is the entry point to wire one in. */}
      <Button title="Passer la commande" disabled />
      <ThemedText type="small" themeColor="textSecondary" style={styles.centerText}>
        Le paiement n’est pas encore branché.
      </ThemedText>
    </Screen>
  );
}

function StepperButton({
  icon,
  label,
  onPress,
}: {
  icon: IconName;
  label: string;
  onPress: () => void;
}) {
  const theme = useTheme();

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      hitSlop={6}
      onPress={onPress}
      style={({ pressed }) => [
        styles.stepperButton,
        { backgroundColor: theme.backgroundSelected },
        pressed && styles.pressed,
      ]}>
      <Icon name={icon} size={14} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  empty: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.two,
  },
  centerText: {
    textAlign: 'center',
  },
  line: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
  },
  lineText: {
    flex: 1,
  },
  stepper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
  },
  stepperButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quantity: {
    minWidth: 20,
    textAlign: 'center',
  },
  figure: {
    fontVariant: ['tabular-nums'],
  },
  total: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: Spacing.three,
    marginTop: Spacing.two,
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  totalValue: {
    fontSize: 20,
    fontWeight: 700,
  },
  pressed: {
    opacity: 0.7,
  },
});
