import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Button } from '@/components/ui/button';
import { Icon, type IconName } from '@/components/ui/icon';
import { Screen } from '@/components/ui/screen';
import { Spacing } from '@/constants/theme';
import { useAuth } from '@/hooks/use-auth';
import { useTheme } from '@/hooks/use-theme';

const steps: { icon: IconName; title: string; text: string }[] = [
  {
    icon: 'dashboard',
    title: 'Suivez votre activité',
    text: 'Vos chiffres clés réunis sur un tableau de bord, à jour en un coup d’œil.',
  },
  {
    icon: 'store',
    title: 'Achetez et vendez',
    text: 'Parcourez la marketplace, ajoutez au panier et découvrez les vendeurs.',
  },
  {
    icon: 'settings',
    title: 'Réglez à votre façon',
    text: 'Notifications, compte et préférences se gèrent depuis les paramètres.',
  },
];

export default function OnboardingScreen() {
  const theme = useTheme();
  const { completeOnboarding } = useAuth();
  const [index, setIndex] = useState(0);

  const step = steps[index];
  const isLast = index === steps.length - 1;

  return (
    <Screen topInset scroll={false} contentStyle={styles.content}>
      <View style={styles.skip}>
        {!isLast && (
          <ThemedText type="link" themeColor="textSecondary" onPress={completeOnboarding}>
            Passer
          </ThemedText>
        )}
      </View>

      <View style={styles.step}>
        <View style={[styles.iconWrapper, { backgroundColor: theme.backgroundElement }]}>
          <Icon name={step.icon} size={48} color={theme.primary} />
        </View>
        <ThemedText type="subtitle" style={styles.centerText}>
          {step.title}
        </ThemedText>
        <ThemedText themeColor="textSecondary" style={styles.centerText}>
          {step.text}
        </ThemedText>
      </View>

      <View
        style={styles.dots}
        accessibilityLabel={`Étape ${index + 1} sur ${steps.length}`}
        accessibilityRole="progressbar">
        {steps.map((item, position) => (
          <View
            key={item.title}
            style={[
              styles.dot,
              { backgroundColor: position === index ? theme.primary : theme.backgroundSelected },
              position === index && styles.dotActive,
            ]}
          />
        ))}
      </View>

      <View style={styles.actions}>
        <Button
          title={isLast ? 'Commencer' : 'Continuer'}
          onPress={isLast ? completeOnboarding : () => setIndex(index + 1)}
        />
        {index > 0 && (
          <Button title="Retour" variant="secondary" onPress={() => setIndex(index - 1)} />
        )}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    gap: Spacing.four,
  },
  skip: {
    minHeight: 30,
    alignItems: 'flex-end',
  },
  step: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.three,
  },
  iconWrapper: {
    width: 112,
    height: 112,
    borderRadius: 56,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.three,
  },
  centerText: {
    textAlign: 'center',
  },
  dots: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: Spacing.two,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  dotActive: {
    width: 24,
  },
  actions: {
    gap: Spacing.two,
  },
});
