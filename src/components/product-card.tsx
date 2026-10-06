import { Link } from 'expo-router';
import { Pressable, StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Card } from '@/components/ui/card';
import { formatPrice, getSeller, type Product } from '@/constants/mock-data';
import { Spacing } from '@/constants/theme';

export function ProductThumbnail({ product, size = 64 }: { product: Product; size?: number }) {
  return (
    <View
      style={[
        styles.thumbnail,
        { width: size, height: size, borderRadius: size / 4, backgroundColor: product.tint },
      ]}>
      <ThemedText style={{ fontSize: size * 0.45, lineHeight: size * 0.6 }}>
        {product.emoji}
      </ThemedText>
    </View>
  );
}

export function ProductCard({ product }: { product: Product }) {
  const seller = getSeller(product.sellerId);

  return (
    <Link href={{ pathname: '/product/[id]', params: { id: product.id } }} asChild>
      <Pressable style={({ pressed }) => pressed && styles.pressed}>
        <Card style={styles.card}>
          <ProductThumbnail product={product} />
          <View style={styles.text}>
            <ThemedText type="smallBold" numberOfLines={1}>
              {product.name}
            </ThemedText>
            {seller && (
              <ThemedText type="small" themeColor="textSecondary" numberOfLines={1}>
                {seller.name}
              </ThemedText>
            )}
          </View>
          <ThemedText type="smallBold" style={styles.price}>
            {formatPrice(product.price)}
          </ThemedText>
        </Card>
      </Pressable>
    </Link>
  );
}

const styles = StyleSheet.create({
  thumbnail: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
  },
  text: {
    flex: 1,
  },
  price: {
    fontVariant: ['tabular-nums'],
  },
  pressed: {
    opacity: 0.7,
  },
});
