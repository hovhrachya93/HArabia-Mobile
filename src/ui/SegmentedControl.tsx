import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { useSettings } from '../context/SettingsContext';
import { AppText } from './AppText';

interface Props<T extends string> {
  options: { value: T; label: string }[];
  value: T;
  onChange: (value: T) => void;
}

export function SegmentedControl<T extends string>({
  options,
  value,
  onChange,
}: Props<T>) {
  const { colors, isDark } = useSettings();
  return (
    <View
      accessibilityRole="radiogroup"
      style={[styles.track, { backgroundColor: colors.surfaceMuted }]}
    >
      {options.map(option => {
        const active = option.value === value;
        return (
          <Pressable
            key={option.value}
            accessibilityRole="radio"
            accessibilityState={{ selected: active }}
            onPress={() => onChange(option.value)}
            style={[
              styles.segment,
              active && [
                styles.active,
                { backgroundColor: isDark ? colors.border : colors.surface },
              ],
            ]}
          >
            <AppText
              variant="label"
              numberOfLines={1}
              adjustsFontSizeToFit
              minimumFontScale={0.8}
              color={active ? colors.text : colors.textMuted}
              style={styles.label}
            >
              {option.label}
            </AppText>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  track: { flexDirection: 'row', borderRadius: 14, padding: 4 },
  segment: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 9,
    paddingHorizontal: 6,
    borderRadius: 10,
  },
  active: {
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 2,
  },
  label: { fontWeight: '700' },
});
