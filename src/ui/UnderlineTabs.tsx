import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { useSettings } from '../context/SettingsContext';
import { AppText } from './AppText';

interface Props<T extends string> {
  options: { value: T; label: string }[];
  value: T;
  onChange: (value: T) => void;
}

export function UnderlineTabs<T extends string>({
  options,
  value,
  onChange,
}: Props<T>) {
  const { colors } = useSettings();
  return (
    <View
      accessibilityRole="tablist"
      style={[styles.row, { borderBottomColor: colors.border }]}
    >
      {options.map(option => {
        const selected = option.value === value;
        return (
          <Pressable
            key={option.value}
            accessibilityRole="tab"
            accessibilityState={{ selected }}
            onPress={() => onChange(option.value)}
            style={[
              styles.tab,
              { borderBottomColor: selected ? colors.accent : 'transparent' },
            ]}
          >
            <AppText
              variant="subheading"
              muted={!selected}
              color={selected ? colors.text : undefined}
              numberOfLines={1}
              adjustsFontSizeToFit
              minimumFontScale={0.8}
              style={[styles.label, !selected && styles.idle]}
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
  row: {
    flexDirection: 'row',
    gap: 16,
    borderBottomWidth: 1,
    marginBottom: 18,
  },
  tab: {
    flex: 1,
    paddingBottom: 10,
    marginBottom: -1,
    borderBottomWidth: 2,
  },
  label: { textAlign: 'center' },
  idle: { fontWeight: '500' },
});
