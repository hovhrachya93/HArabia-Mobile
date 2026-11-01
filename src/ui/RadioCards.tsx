import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { useSettings } from '../context/SettingsContext';
import { AppText } from './AppText';

interface Props<T extends string> {
  label?: string;
  options: { value: T; label: string; hint?: string }[];
  value: T;
  onChange: (value: T) => void;
}

export function RadioCards<T extends string>({
  label,
  options,
  value,
  onChange,
}: Props<T>) {
  const { colors, isDark } = useSettings();
  const tint = isDark ? 'rgba(56,168,156,0.12)' : 'rgba(20,124,114,0.05)';

  return (
    <View style={styles.wrap}>
      {label && (
        <AppText variant="label" muted style={styles.label}>
          {label}
        </AppText>
      )}
      <View accessibilityRole="radiogroup" style={styles.row}>
        {options.map(option => {
          const active = option.value === value;
          return (
            <Pressable
              key={option.value}
              accessibilityRole="radio"
              accessibilityState={{ selected: active }}
              onPress={() => onChange(option.value)}
              style={({ pressed }) => [
                styles.card,
                {
                  borderColor: active ? colors.accent : colors.border,
                  backgroundColor: active ? tint : colors.surface,
                },
                active && styles.cardActive,
                pressed && styles.pressed,
              ]}
            >
              <View
                style={[
                  styles.radio,
                  { borderColor: active ? colors.accent : colors.textMuted },
                ]}
              >
                {active && (
                  <View
                    style={[styles.dot, { backgroundColor: colors.accent }]}
                  />
                )}
              </View>
              <View style={styles.text}>
                <AppText
                  variant="label"
                  numberOfLines={1}
                  style={styles.name}
                  color={active ? colors.text : colors.textMuted}
                >
                  {option.label}
                </AppText>
                {option.hint && (
                  <AppText variant="caption" muted numberOfLines={1}>
                    {option.hint}
                  </AppText>
                )}
              </View>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { marginBottom: 16 },
  label: { marginBottom: 8 },
  row: { flexDirection: 'row', gap: 10 },
  card: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    borderWidth: 1,
    borderRadius: 14,
    paddingVertical: 12,
    paddingHorizontal: 12,
  },
  cardActive: { borderWidth: 1.5 },
  pressed: { opacity: 0.7 },
  radio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dot: { width: 10, height: 10, borderRadius: 5 },
  text: { flex: 1 },
  name: { fontWeight: '700' },
});
