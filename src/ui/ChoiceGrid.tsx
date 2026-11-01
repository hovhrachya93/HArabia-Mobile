import React from 'react';
import { Pressable, StyleSheet, View, useWindowDimensions } from 'react-native';
import { useSettings } from '../context/SettingsContext';
import { AppText } from './AppText';

interface Props<T extends string> {
  all: { value: T; label: string };
  options: { value: T; label: string }[];
  value: T;
  onChange: (value: T) => void;
  columns?: number;
}

export function ChoiceGrid<T extends string>({
  all,
  options,
  value,
  onChange,
  columns: preferred,
}: Props<T>) {
  const { colors } = useSettings();
  const { width } = useWindowDimensions();
  const columns =
    preferred ??
    (width < 360 ? 2 : width >= 900 ? Math.min(6, options.length) : 3);

  function tile(option: { value: T; label: string }, style?: object) {
    const active = option.value === value;
    return (
      <Pressable
        key={option.value}
        accessibilityRole="radio"
        accessibilityState={{ selected: active }}
        onPress={() => onChange(option.value)}
        style={({ pressed }) => [
          styles.tile,
          style,
          {
            backgroundColor: active ? colors.accent : colors.surface,
            borderColor: active ? colors.accent : colors.border,
          },
          pressed && styles.pressed,
        ]}
      >
        <AppText
          variant="label"
          numberOfLines={1}
          color={active ? '#FFFFFF' : colors.text}
          style={styles.label}
        >
          {option.label}
        </AppText>
      </Pressable>
    );
  }

  const rows: { value: T; label: string }[][] = [];
  for (let i = 0; i < options.length; i += columns) {
    rows.push(options.slice(i, i + columns));
  }

  return (
    <View style={styles.grid} accessibilityRole="radiogroup">
      {rows.map((row, r) => (
        <View key={r} style={styles.row}>
          {row.map(option => tile(option, styles.cell))}
          {Array.from({ length: columns - row.length }, (_, i) => (
            <View key={`blank${i}`} style={styles.cell} />
          ))}
        </View>
      ))}
      {tile(all)}
    </View>
  );
}

const styles = StyleSheet.create({
  grid: { gap: 8 },
  row: { flexDirection: 'row', gap: 8 },
  cell: { flex: 1 },
  tile: {
    borderWidth: 1,
    borderRadius: 12,
    minHeight: 36,
    paddingHorizontal: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressed: { opacity: 0.7 },
  label: { fontWeight: '600' },
});
