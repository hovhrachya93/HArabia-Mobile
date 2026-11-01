import React from 'react';
import { Pressable, ScrollView, StyleSheet } from 'react-native';
import { useSettings } from '../context/SettingsContext';
import { AppText } from './AppText';

interface Props<T extends string> {
  options: { value: T; label: string }[];
  value: T;
  onChange: (value: T) => void;
  bleed?: number;
}

export function ChipRow<T extends string>({
  options,
  value,
  onChange,
  bleed = 20,
}: Props<T>) {
  const { colors } = useSettings();
  const chips = options.map(option => {
    const active = option.value === value;
    return (
      <Pressable
        key={option.value}
        accessibilityRole="radio"
        accessibilityState={{ selected: active }}
        onPress={() => onChange(option.value)}
        style={({ pressed }) => [
          styles.chip,
          {
            backgroundColor: active ? colors.accent : colors.surface,
            borderColor: active ? colors.accent : colors.border,
          },
          pressed && styles.pressed,
        ]}
      >
        <AppText
          variant="label"
          color={active ? '#FFFFFF' : colors.text}
          style={styles.label}
        >
          {option.label}
        </AppText>
      </Pressable>
    );
  });

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={{ marginHorizontal: -bleed }}
      contentContainerStyle={[styles.row, { paddingHorizontal: bleed }]}
      accessibilityRole="radiogroup"
    >
      {chips}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  row: { gap: 8 },
  chip: {
    borderWidth: 1,
    borderRadius: 999,
    paddingHorizontal: 16,
    paddingVertical: 9,
  },
  pressed: { opacity: 0.7 },
  label: { fontWeight: '600' },
});
