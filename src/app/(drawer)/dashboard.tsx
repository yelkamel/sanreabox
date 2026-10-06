import { StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Card } from '@/components/ui/card';
import { Screen } from '@/components/ui/screen';
import { activities, stats } from '@/constants/mock-data';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export default function DashboardScreen() {
  const theme = useTheme();

  return (
    <Screen>
      <ThemedText type="small" themeColor="textSecondary">
        30 derniers jours
      </ThemedText>

      <View style={styles.grid}>
        {stats.map((stat) => (
          <Card key={stat.id} style={styles.stat}>
            <ThemedText type="small" themeColor="textSecondary">
              {stat.label}
            </ThemedText>
            <ThemedText style={styles.value}>{stat.value}</ThemedText>
            <ThemedText type="smallBold" themeColor={stat.positive ? 'success' : 'danger'}>
              {stat.trend}
            </ThemedText>
          </Card>
        ))}
      </View>

      <ThemedText type="smallBold" style={styles.sectionTitle}>
        Activité récente
      </ThemedText>
      <Card style={styles.list}>
        {activities.map((activity, index) => (
          <View
            key={activity.id}
            style={[
              styles.row,
              index > 0 && { borderTopColor: theme.border, borderTopWidth: StyleSheet.hairlineWidth },
            ]}>
            <ThemedText type="small" style={styles.rowTitle}>
              {activity.title}
            </ThemedText>
            <ThemedText type="small" themeColor="textSecondary">
              {activity.time}
            </ThemedText>
          </View>
        ))}
      </Card>
    </Screen>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.three,
  },
  stat: {
    flexGrow: 1,
    flexBasis: 150,
    gap: Spacing.one,
  },
  value: {
    fontSize: 24,
    lineHeight: 32,
    fontWeight: 700,
    fontVariant: ['tabular-nums'],
  },
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
    gap: Spacing.three,
    paddingVertical: Spacing.three,
  },
  rowTitle: {
    flex: 1,
  },
});
