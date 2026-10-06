import { Link } from 'expo-router';
import { StyleSheet } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Screen } from '@/components/ui/screen';
import { Spacing } from '@/constants/theme';

export default function NotFoundScreen() {
  return (
    <Screen contentStyle={styles.content}>
      <ThemedText type="subtitle">Page introuvable</ThemedText>
      <ThemedText themeColor="textSecondary" style={styles.centerText}>
        Cette page n’existe pas ou a été déplacée.
      </ThemedText>
      <Link href="/" replace>
        <ThemedText type="linkPrimary">Revenir à l’accueil</ThemedText>
      </Link>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.two,
  },
  centerText: {
    textAlign: 'center',
  },
});
