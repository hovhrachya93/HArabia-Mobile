import React from 'react';
import { StyleSheet, Text, type TextProps } from 'react-native';
import { useSettings } from '../context/SettingsContext';
import { FONT_FAMILY } from '../theme/fonts';

export type TextVariant =
  | 'title'
  | 'heading'
  | 'subheading'
  | 'body'
  | 'caption'
  | 'label';

interface Props extends TextProps {
  variant?: TextVariant;
  muted?: boolean;
  color?: string;
}

export function AppText({
  variant = 'body',
  muted,
  color,
  style,
  ...rest
}: Props) {
  const { colors } = useSettings();
  return (
    <Text
      {...rest}
      style={[
        styles.font,
        styles[variant],
        { color: color ?? (muted ? colors.textMuted : colors.text) },
        style,
      ]}
    />
  );
}

const styles = StyleSheet.create({
  font: { fontFamily: FONT_FAMILY },
  title: { fontSize: 28, lineHeight: 34, fontWeight: '700' },
  heading: { fontSize: 20, lineHeight: 26, fontWeight: '700' },
  subheading: { fontSize: 17, lineHeight: 23, fontWeight: '600' },
  body: { fontSize: 16, lineHeight: 24 },
  caption: { fontSize: 14, lineHeight: 19 },
  label: { fontSize: 14, lineHeight: 19, fontWeight: '600' },
});
