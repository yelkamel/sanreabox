import { useLocalSearchParams } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import { ProductCard } from '@/components/product-card';
import { ThemedText } from '@/components/themed-text';
import { Avatar } from '@/components/ui/avatar';
import { Card } from '@/components/ui/card';
import { Screen } from '@/components/ui/screen';
import { getSeller, products } from '@/constants/mock-data';
import { Spacing } from '@/constants/theme';

export default function SellerScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const seller = getSeller(id);
  if (!seller) {
    return (
      <Screen contentStyle={styles.missing}>
        <ThemedText themeColor="textSecondary">Ce vendeur est introuvable.</ThemedText>
      </Screen>
    );
  }

  const sellerProducts = products.filter((product) => product.sellerId === seller.id);
  const figures = [
    { label: 'Note', value: `${seller.rating.toFixed(1).replace('.', ',')} / 5` },
    { label: 'Ventes', value: String(seller.sales) },
    { label: 'Produits', value: String(sellerProducts.length) },
  ];

  return (
    <Screen>
      <View style={styles.identity}>
        <Avatar name={seller.name} size={88} />
        <ThemedText type="subtitle" style={styles.centerText}>
          {seller.name}
        </ThemedText>
        <ThemedText type="small" themeColor="textSecondary">
          {seller.location}
        </ThemedText>
        <ThemedText themeColor="textSecondary" style={styles.centerText}>
          {seller.bio}
        </ThemedText>
      </View>

      <View style={styles.figures}>
        {figures.map((figure) => (
          <Card key={figure.label} style={styles.figure}>
            <ThemedText type="smallBold" style={styles.figureValue}>
              {figure.value}
            </ThemedText>
            <ThemedText type="small" themeColor="textSecondary">
              {figure.label}
            </ThemedText>
          </Card>
        ))}
      </View>

      <ThemedText type="smallBold" style={styles.sectionTitle}>
        Ses produits
      </ThemedText>
      <View style={styles.products}>
        {sellerProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  missing: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  identity: {
    alignItems: 'center',
    gap: Spacing.one,
    paddingVertical: Spacing.three,
  },
  centerText: {
    textAlign: 'center',
  },
  figures: {
    flexDirection: 'row',
    gap: Spacing.two,
  },
  figure: {
    flex: 1,
    alignItems: 'center',
    gap: Spacing.half,
  },
  figureValue: {
    fontVariant: ['tabular-nums'],
  },
  sectionTitle: {
    marginTop: Spacing.two,
  },
  products: {
    gap: Spacing.two,
  },
});
