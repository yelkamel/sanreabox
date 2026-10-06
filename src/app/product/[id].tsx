import { Link, useLocalSearchParams, useRouter } from 'expo-router';
import { Pressable, StyleSheet, View } from 'react-native';

import { ProductThumbnail } from '@/components/product-card';
import { ThemedText } from '@/components/themed-text';
import { Avatar } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Icon } from '@/components/ui/icon';
import { Screen } from '@/components/ui/screen';
import { formatPrice, getProduct, getSeller } from '@/constants/mock-data';
import { Spacing } from '@/constants/theme';
import { useCart } from '@/hooks/use-cart';
import { useTheme } from '@/hooks/use-theme';

export default function ProductScreen() {
  const theme = useTheme();
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { add, lines } = useCart();

  const product = getProduct(id);
  if (!product) {
    return (
      <Screen contentStyle={styles.missing}>
        <ThemedText themeColor="textSecondary">Ce produit n’existe plus.</ThemedText>
      </Screen>
    );
  }

  const seller = getSeller(product.sellerId);
  const inCart = lines.find((line) => line.product.id === product.id)?.quantity ?? 0;

  return (
    <Screen>
      <View style={styles.hero}>
        <ProductThumbnail product={product} size={160} />
      </View>

      <View style={styles.heading}>
        <ThemedText type="subtitle">{product.name}</ThemedText>
        <ThemedText style={styles.price}>{formatPrice(product.price)}</ThemedText>
      </View>
      <ThemedText themeColor="textSecondary">{product.description}</ThemedText>

      {seller && (
        <Link href={{ pathname: '/seller/[id]', params: { id: seller.id } }} asChild>
          <Pressable style={({ pressed }) => pressed && styles.pressed}>
            <Card style={styles.seller}>
              <Avatar name={seller.name} size={40} />
              <View style={styles.sellerText}>
                <ThemedText type="smallBold">{seller.name}</ThemedText>
                <ThemedText type="small" themeColor="textSecondary">
                  Voir le profil vendeur
                </ThemedText>
              </View>
              <Icon name="chevron" size={14} color={theme.textSecondary} />
            </Card>
          </Pressable>
        </Link>
      )}

      <View style={styles.actions}>
        <Button title="Ajouter au panier" onPress={() => add(product.id)} />
        {inCart > 0 && (
          <Button
            title={`Voir le panier (${inCart})`}
            variant="secondary"
            onPress={() => router.push('/cart')}
          />
        )}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  missing: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  hero: {
    alignItems: 'center',
    paddingVertical: Spacing.three,
  },
  heading: {
    gap: Spacing.one,
  },
  price: {
    fontSize: 20,
    fontWeight: 700,
    fontVariant: ['tabular-nums'],
  },
  seller: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
  },
  sellerText: {
    flex: 1,
  },
  actions: {
    gap: Spacing.two,
    marginTop: Spacing.two,
  },
  pressed: {
    opacity: 0.7,
  },
});
