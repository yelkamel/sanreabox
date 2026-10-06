import { useState } from 'react';
import { StyleSheet, Switch, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Screen } from '@/components/ui/screen';
import { Spacing } from '@/constants/theme';
import { useAuth } from '@/hooks/use-auth';
import { useTheme } from '@/hooks/use-theme';

const preferences = [
  { id: 'push', label: 'Notifications push', initial: true },
  { id: 'email', label: 'Résumé hebdomadaire par email', initial: true },
  { id: 'marketing', label: 'Offres et nouveautés', initial: false },
];

export default function SettingsScreen() {
  const theme = useTheme();
  const { user, signOut } = useAuth();
  const [enabled, setEnabled] = useState(() =>
    Object.fromEntries(preferences.map((preference) => [preference.id, preference.initial])),
  );

  const separator = { borderTopColor: theme.border, borderTopWidth: StyleSheet.hairlineWidth };

  return (
    <Screen>
      <ThemedText type="smallBold">Compte</ThemedText>
      <Card style={styles.list}>
        <View style={styles.row}>
          <ThemedText type="small" themeColor="textSecondary">
            Nom
          </ThemedText>
          <ThemedText type="small" style={styles.value} numberOfLines={1}>
            {user?.name}
          </ThemedText>
        </View>
        <View style={[styles.row, separator]}>
          <ThemedText type="small" themeColor="textSecondary">
            Email
          </ThemedText>
          <ThemedText type="small" style={styles.value} numberOfLines={1}>
            {user?.email}
          </ThemedText>
        </View>
      </Card>

      <ThemedText type="smallBold" style={styles.sectionTitle}>
        Notifications
      </ThemedText>
      <Card style={styles.list}>
        {preferences.map((preference, index) => (
          <View key={preference.id} style={[styles.row, index > 0 && separator]}>
            <ThemedText type="small" style={styles.label}>
              {preference.label}
            </ThemedText>
            <Switch
              accessibilityLabel={preference.label}
              value={enabled[preference.id]}
              onValueChange={(value) => setEnabled({ ...enabled, [preference.id]: value })}
              trackColor={{ true: theme.primary }}
            />
          </View>
        ))}
      </Card>

      <View style={styles.sectionTitle}>
        <Button title="Se déconnecter" variant="danger" onPress={signOut} />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  sectionTitle: {
    marginTop: Spacing.two,
  },
  list: {
    paddingVertical: 0,
    gap: 0,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: Spacing.three,
    minHeight: 52,
    paddingVertical: Spacing.two,
  },
  label: {
    flex: 1,
  },
  value: {
    flex: 1,
    textAlign: 'right',
  },
});
