import { useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ProductCard } from '@/components/product-card';
import { ThemedText } from '@/components/themed-text';
import { Input } from '@/components/ui/input';
import { getSeller, products } from '@/constants/mock-data';
import { MaxContentWidth, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export default function MarketplaceScreen() {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const [query, setQuery] = useState('');

  const needle = query.trim().toLowerCase();
  const results = products.filter((product) =>
    [product.name, getSeller(product.sellerId)?.name ?? '']
      .join(' ')
      .toLowerCase()
      .includes(needle),
  );

  return (
    <View style={[styles.fill, { backgroundColor: theme.background }]}>
      <View style={styles.search}>
        <Input
          value={query}
          onChangeText={setQuery}
          placeholder="Rechercher un produit ou un vendeur"
          accessibilityLabel="Rechercher"
          autoCapitalize="none"
          autoCorrect={false}
          clearButtonMode="while-editing"
          returnKeyType="search"
        />
      </View>
      <FlatList
        data={results}
        keyExtractor={(product) => product.id}
        renderItem={({ item }) => <ProductCard product={item} />}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
        contentContainerStyle={[styles.list, { paddingBottom: insets.bottom + Spacing.three }]}
        ListEmptyComponent={
          <ThemedText themeColor="textSecondary" style={styles.empty}>
            Aucun résultat pour « {query.trim()} ».
          </ThemedText>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  fill: {
    flex: 1,
  },
  search: {
    width: '100%',
    maxWidth: MaxContentWidth,
    alignSelf: 'center',
    padding: Spacing.three,
  },
  list: {
    width: '100%',
    maxWidth: MaxContentWidth,
    alignSelf: 'center',
    paddingHorizontal: Spacing.three,
    gap: Spacing.two,
  },
  empty: {
    textAlign: 'center',
    paddingVertical: Spacing.five,
  },
});
