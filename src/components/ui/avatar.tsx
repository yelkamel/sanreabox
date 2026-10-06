import { Image } from 'expo-image';
import { StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { useTheme } from '@/hooks/use-theme';

type AvatarProps = {
  name: string;
  photoUrl?: string;
  size?: number;
};

export function Avatar({ name, photoUrl, size = 56 }: AvatarProps) {
  const theme = useTheme();
  const initials = name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0].toUpperCase())
    .join('');

  return (
    <View
      style={[
        styles.avatar,
        { width: size, height: size, borderRadius: size / 2, backgroundColor: theme.primary },
      ]}>
      <ThemedText type="smallBold" style={{ color: theme.onPrimary, fontSize: size * 0.36 }}>
        {initials}
      </ThemedText>
      {photoUrl && (
        <Image source={photoUrl} style={StyleSheet.absoluteFill} accessibilityLabel={name} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  avatar: {
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
});
