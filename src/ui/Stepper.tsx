import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { useSettings } from '../context/SettingsContext';
import { AppText } from './AppText';
import { INPUT_HEIGHT, INPUT_RADIUS, inputFill } from './inputBox';

interface Props {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
}

export function Stepper({ label, value, onChange, min = 1, max = 999 }: Props) {
  const { colors, isDark } = useSettings();
  const step = (delta: number) =>
    onChange(Math.min(max, Math.max(min, value + delta)));

  const button = (symbol: string, delta: number, disabled: boolean) => (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={symbol === '+' ? '+' : '−'}
      disabled={disabled}
      onPress={() => step(delta)}
      style={[
        styles.button,
        { backgroundColor: colors.surface, opacity: disabled ? 0.4 : 1 },
      ]}
    >
      <AppText variant="heading" color={colors.accent}>
        {symbol}
      </AppText>
    </Pressable>
  );

  return (
    <View style={styles.wrap}>
      <AppText variant="label" muted>
        {label}
      </AppText>
      <View
        style={[styles.row, { backgroundColor: inputFill(colors, isDark) }]}
      >
        {button('−', -1, value <= min)}
        <AppText variant="subheading" style={styles.value}>
          {value}
        </AppText>
        {button('+', 1, value >= max)}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { marginBottom: 14 },
  row: {
    marginTop: 6,
    borderRadius: INPUT_RADIUS,
    minHeight: INPUT_HEIGHT,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 4,
  },
  button: {
    width: 40,
    height: 40,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  value: { minWidth: 40, textAlign: 'center' },
});
