import React from 'react';
import { StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';
import { AppText } from './AppText';
import { ArrowRightIcon } from './icons';

export function LinkLabel({
  label,
  color,
  style,
}: {
  label: string;
  color: string;
  style?: StyleProp<ViewStyle>;
}) {
  return (
    <View style={[styles.row, style]}>
      <AppText variant="label" color={color}>
        {label.replace(/\s*→\s*$/, '')}
      </AppText>
      <ArrowRightIcon color={color} size={16} />
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', gap: 6 },
});
