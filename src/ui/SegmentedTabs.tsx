import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { useSettings } from '../context/SettingsContext';
import { AppText } from './AppText';

interface Props<T extends string> {
  label?: string;
  options: { value: T; label: string }[];
  value: T;
  onChange: (value: T) => void;
}

export function SegmentedTabs<T extends string>({
  label,
  options,
  value,
  onChange,
}: Props<T>) {
  const { colors } = useSettings();
  return (
    <View style={styles.wrap}>
      {label && (
        <AppText variant="label" muted style={styles.label}>
          {label}
        </AppText>
      )}
      <View style={styles.row}>
        {options.map(option => {
          const active = option.value === value;
          return (
            <Pressable
              key={option.value}
              accessibilityRole="radio"
              accessibilityState={{ selected: active }}
              onPress={() => onChange(option.value)}
              style={[
                styles.pill,
                {
                  backgroundColor: active ? colors.accent : colors.surfaceMuted,
                },
              ]}
            >
              <AppText
                variant="label"
                color={active ? colors.background : colors.text}
              >
                {option.label}
              </AppText>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { marginBottom: 12 },
  label: { marginBottom: 6 },
  row: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  pill: { paddingHorizontal: 14, paddingVertical: 8, borderRadius: 999 },
});
