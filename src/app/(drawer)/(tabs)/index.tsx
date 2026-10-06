import { Link, type Href } from 'expo-router';
import { Pressable, StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Card } from '@/components/ui/card';
import { Icon, type IconName } from '@/components/ui/icon';
import { Screen } from '@/components/ui/screen';
import { Spacing } from '@/constants/theme';
import { useAuth } from '@/hooks/use-auth';
import { useTheme } from '@/hooks/use-theme';

const shortcuts: { href: Href; icon: IconName; title: string; text: string }[] = [
  {
    href: '/dashboard',
    icon: 'dashboard',
    title: 'Tableau de bord',
    text: 'Vos statistiques du moment',
  },
  {
    href: '/marketplace',
    icon: 'store',
    title: 'Marketplace',
    text: 'Parcourir les produits',
  },
  {
    href: '/settings',
    icon: 'settings',
    title: 'Paramètres',
    text: 'Compte et préférences',
  },
];

export default function HomeScreen() {
  const theme = useTheme();
  const { user } = useAuth();
  const firstName = user?.name.split(' ')[0];

  return (
    <Screen tabInset>
      <View style={styles.header}>
        <ThemedText type="subtitle">Bonjour{firstName ? `, ${firstName}` : ''}</ThemedText>
        <ThemedText themeColor="textSecondary">Par où voulez-vous commencer ?</ThemedText>
      </View>

      {shortcuts.map((shortcut) => (
        <Link key={shortcut.title} href={shortcut.href} asChild>
          <Pressable style={({ pressed }) => pressed && styles.pressed}>
            <Card style={styles.shortcut}>
              <Icon name={shortcut.icon} size={24} color={theme.primary} />
              <View style={styles.shortcutText}>
                <ThemedText type="smallBold">{shortcut.title}</ThemedText>
                <ThemedText type="small" themeColor="textSecondary">
                  {shortcut.text}
                </ThemedText>
              </View>
              <Icon name="chevron" size={14} color={theme.textSecondary} />
            </Card>
          </Pressable>
        </Link>
      ))}
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: {
    gap: Spacing.one,
    marginBottom: Spacing.two,
  },
  shortcut: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
  },
  shortcutText: {
    flex: 1,
  },
  pressed: {
    opacity: 0.7,
  },
});
