import React from 'react';
import { StyleSheet, type StyleProp, type TextStyle } from 'react-native';
import { useSettings } from '../context/SettingsContext';
import { AppText } from './AppText';

export function CountText({
  template,
  n,
  style,
}: {
  template: string;
  n: number;
  style?: StyleProp<TextStyle>;
}) {
  const { colors } = useSettings();
  const [before, after = ''] = template.split('{n}');
  return (
    <AppText variant="body" muted style={style}>
      {before}
      <AppText variant="body" color={colors.accent} style={styles.n}>
        {n}
      </AppText>
      {after}
    </AppText>
  );
}

const styles = StyleSheet.create({
  n: { fontWeight: '800' },
});
