import { StyleSheet } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Icon, type IconName } from '@/components/ui/icon';
import { Screen } from '@/components/ui/screen';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

type EmptyScreenProps = {
  title: string;
  icon: IconName;
};

/** Placeholder for a tab that has no content yet. */
export function EmptyScreen({ title, icon }: EmptyScreenProps) {
  const theme = useTheme();

  return (
    <Screen tabInset contentStyle={styles.content}>
      <Icon name={icon} size={40} color={theme.textSecondary} />
      <ThemedText type="subtitle">{title}</ThemedText>
      <ThemedText themeColor="textSecondary" style={styles.hint}>
        Écran vide, prêt à remplir.
      </ThemedText>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.two,
  },
  hint: {
    textAlign: 'center',
  },
});
