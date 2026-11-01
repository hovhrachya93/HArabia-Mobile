import React, { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { useSettings } from '../context/SettingsContext';
import { t } from '../i18n/format';
import { AppText } from '../ui/AppText';
import { inputFill } from '../ui/inputBox';

export const DEFAULT_CHILD_AGE = 8;
const AGES = Array.from({ length: 18 }, (_, i) => i);
const PER_ROW = 9;

export function fitChildAges(ages: number[], count: number): number[] {
  return Array.from({ length: count }, (_, i) => ages[i] ?? DEFAULT_CHILD_AGE);
}

export function ChildAges({
  ages,
  onChange,
}: {
  ages: number[];
  onChange: (ages: number[]) => void;
}) {
  const { colors, isDark, dict } = useSettings();
  const [active, setActive] = useState(0);
  const current = Math.min(active, Math.max(0, ages.length - 1));
  if (ages.length === 0) return null;

  const fill = inputFill(colors, isDark);
  const age = ages[current];

  function pick(value: number) {
    onChange(ages.map((a, i) => (i === current ? value : a)));
    if (current < ages.length - 1) setActive(current + 1);
  }

  return (
    <View style={styles.wrap}>
      {ages.length === 1 ? (
        <AppText variant="label" muted>
          {t(dict.liveHotels.childAge, { n: 1 })}
        </AppText>
      ) : (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={styles.tabs}
          accessibilityRole="tablist"
        >
          {ages.map((a, child) => {
            const selected = child === current;
            return (
              <Pressable
                key={child}
                accessibilityRole="tab"
                accessibilityState={{ selected }}
                onPress={() => setActive(child)}
                style={[
                  styles.tab,
                  selected
                    ? {
                        backgroundColor: colors.surface,
                        borderColor: colors.accent,
                      }
                    : { backgroundColor: fill, borderColor: 'transparent' },
                ]}
              >
                <AppText
                  variant="label"
                  color={selected ? colors.accent : colors.textMuted}
                >
                  {t(dict.liveHotels.childAge, { n: child + 1 })}
                  <AppText
                    variant="label"
                    color={selected ? colors.text : colors.textMuted}
                    style={styles.tabAge}
                  >
                    {'  ·  '}
                    {a}
                  </AppText>
                </AppText>
              </Pressable>
            );
          })}
        </ScrollView>
      )}
      {[AGES.slice(0, PER_ROW), AGES.slice(PER_ROW)].map((row, r) => (
        <View key={r} style={styles.row}>
          {row.map(value => {
            const selected = value === age;
            return (
              <Pressable
                key={value}
                accessibilityRole="radio"
                accessibilityState={{ selected }}
                accessibilityLabel={`${t(dict.liveHotels.childAge, {
                  n: current + 1,
                })}: ${value}`}
                onPress={() => pick(value)}
                style={[
                  styles.chip,
                  { backgroundColor: selected ? colors.action : fill },
                ]}
              >
                <AppText
                  variant="label"
                  color={selected ? colors.actionText : colors.text}
                >
                  {value}
                </AppText>
              </Pressable>
            );
          })}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { gap: 6, marginBottom: 16 },
  tabs: { gap: 8, paddingBottom: 4 },
  tab: {
    borderRadius: 999,
    borderWidth: 1.5,
    paddingHorizontal: 14,
    paddingVertical: 7,
  },
  tabAge: { fontWeight: '800' },
  row: { flexDirection: 'row', gap: 6 },
  chip: {
    flex: 1,
    height: 38,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
