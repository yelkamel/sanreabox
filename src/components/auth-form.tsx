import type { PropsWithChildren, ReactNode } from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Screen } from '@/components/ui/screen';
import { Spacing } from '@/constants/theme';

type AuthFormProps = PropsWithChildren<{
  title: string;
  subtitle: string;
  footer: ReactNode;
}>;

/** Shared frame for the sign-in and sign-up screens. */
export function AuthForm({ title, subtitle, footer, children }: AuthFormProps) {
  return (
    <KeyboardAvoidingView
      style={styles.fill}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <Screen topInset contentStyle={styles.content}>
        <View style={styles.header}>
          <ThemedText type="subtitle">{title}</ThemedText>
          <ThemedText themeColor="textSecondary">{subtitle}</ThemedText>
        </View>
        <View style={styles.fields}>{children}</View>
        <View style={styles.footer}>{footer}</View>
      </Screen>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  fill: {
    flex: 1,
  },
  content: {
    justifyContent: 'center',
    maxWidth: 420,
    gap: Spacing.four,
  },
  header: {
    gap: Spacing.one,
  },
  fields: {
    gap: Spacing.three,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: Spacing.one,
  },
});
