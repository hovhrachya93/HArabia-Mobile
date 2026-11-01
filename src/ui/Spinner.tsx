import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { useSettings } from '../context/SettingsContext';

export function Spinner({
  label,
  size = 'large',
  fill = false,
}: {
  label: string;
  size?: 'small' | 'large';
  fill?: boolean;
}) {
  const { colors } = useSettings();
  return (
    <View
      accessible
      accessibilityRole="progressbar"
      accessibilityLabel={label}
      style={[
        fill ? styles.fill : styles.block,
        fill && { backgroundColor: colors.background },
      ]}
    >
      <ActivityIndicator size={size} color={colors.accent} />
    </View>
  );
}

const styles = StyleSheet.create({
  fill: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  block: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
});
