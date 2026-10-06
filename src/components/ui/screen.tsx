import type { PropsWithChildren } from 'react';
import { Platform, ScrollView, StyleSheet, View, type ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { BottomTabInset, MaxContentWidth, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

type ScreenProps = PropsWithChildren<{
  /** Set to false when the screen owns its scrolling (e.g. a FlatList). */
  scroll?: boolean;
  /** Screens without a navigation header need to clear the status bar themselves. */
  topInset?: boolean;
  /** Screens rendered inside the tab bar need to clear it. */
  tabInset?: boolean;
  contentStyle?: ViewStyle;
}>;

export function Screen({
  children,
  scroll = true,
  topInset = false,
  tabInset = false,
  contentStyle,
}: ScreenProps) {
  const theme = useTheme();
  const insets = useSafeAreaInsets();

  const padding: ViewStyle = {
    paddingTop: (topInset ? insets.top : 0) + webTabListInset(tabInset) + Spacing.three,
    paddingBottom: insets.bottom + (tabInset ? BottomTabInset : 0) + Spacing.three,
    paddingLeft: insets.left + Spacing.three,
    paddingRight: insets.right + Spacing.three,
  };
  const content = <View style={[styles.content, contentStyle]}>{children}</View>;

  if (!scroll) {
    return (
      <View style={[styles.fill, styles.center, { backgroundColor: theme.background }, padding]}>
        {content}
      </View>
    );
  }

  return (
    <ScrollView
      style={[styles.fill, { backgroundColor: theme.background }]}
      contentContainerStyle={[styles.center, styles.grow, padding]}
      keyboardShouldPersistTaps="handled">
      {content}
    </ScrollView>
  );
}

/** On web the tab list floats over the top of the screen instead of sitting at the bottom. */
function webTabListInset(tabInset: boolean) {
  return tabInset && Platform.OS === 'web' ? Spacing.six : 0;
}

const styles = StyleSheet.create({
  fill: {
    flex: 1,
  },
  grow: {
    flexGrow: 1,
  },
  center: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    maxWidth: MaxContentWidth,
    gap: Spacing.three,
  },
});
