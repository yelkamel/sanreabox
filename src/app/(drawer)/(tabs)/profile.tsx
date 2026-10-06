import { StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Avatar } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Screen } from '@/components/ui/screen';
import { Spacing } from '@/constants/theme';
import { useAuth } from '@/hooks/use-auth';

export default function ProfileScreen() {
  const { user, signOut } = useAuth();

  if (!user) return null;

  return (
    <Screen tabInset>
      <View style={styles.identity}>
        <Avatar name={user.name} photoUrl={user.photoUrl} size={88} />
        <ThemedText type="subtitle" style={styles.centerText}>
          {user.name}
        </ThemedText>
        <ThemedText themeColor="textSecondary">{user.email}</ThemedText>
      </View>
      <Button title="Se déconnecter" variant="danger" onPress={signOut} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  identity: {
    alignItems: 'center',
    gap: Spacing.one,
    paddingVertical: Spacing.four,
  },
  centerText: {
    textAlign: 'center',
  },
});
