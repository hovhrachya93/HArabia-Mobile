import React, { useState } from 'react';
import {
  Platform,
  StyleSheet,
  TextInput,
  View,
  type TextInputProps,
} from 'react-native';
import { useSettings } from '../context/SettingsContext';
import { AppText } from './AppText';
import { FONT_FAMILY } from '../theme/fonts';
import { inputFill } from './inputBox';

interface Props extends Omit<TextInputProps, 'onChange'> {
  label: string;
  error?: string | null;
  onChangeText: (value: string) => void;
  icon?: (props: { color: string; size?: number }) => React.ReactNode;
}

export function Field({
  label,
  error,
  style,
  multiline,
  icon: Icon,
  onFocus,
  onBlur,
  ...rest
}: Props) {
  const { colors, isDark } = useSettings();
  const [focused, setFocused] = useState(false);

  const fill = inputFill(colors, isDark);
  const borderColor = error
    ? colors.danger
    : focused
    ? colors.accent
    : 'transparent';
  const iconColor = error
    ? colors.danger
    : focused
    ? colors.accent
    : colors.textMuted;

  return (
    <View style={styles.wrap}>
      <AppText variant="label" muted style={styles.label}>
        {label}
      </AppText>
      <View
        style={[
          styles.box,
          multiline && styles.boxMultiline,
          {
            backgroundColor: focused ? colors.surface : fill,
            borderColor,
          },
          Platform.OS === 'ios' &&
            focused &&
            !error && [styles.glow, { shadowColor: colors.accent }],
        ]}
      >
        {Icon && (
          <View style={[styles.icon, multiline && styles.iconTop]}>
            <Icon color={iconColor} size={19} />
          </View>
        )}
        <TextInput
          {...rest}
          multiline={multiline}
          placeholderTextColor={colors.textMuted}
          onFocus={e => {
            setFocused(true);
            onFocus?.(e);
          }}
          onBlur={e => {
            setFocused(false);
            onBlur?.(e);
          }}
          style={[
            styles.input,
            multiline && styles.multiline,
            { color: colors.text },
            style,
          ]}
        />
      </View>
      <AppText variant="caption" color={colors.danger} style={styles.error}>
        {error ?? ' '}
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { marginBottom: 2 },
  label: { marginBottom: 6, fontWeight: '600' },
  box: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 52,
    borderRadius: 14,
    borderWidth: 1.5,
    paddingHorizontal: 14,
  },
  boxMultiline: { alignItems: 'flex-start' },
  glow: {
    shadowOpacity: 0.18,
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 8,
  },
  icon: { marginRight: 10 },
  iconTop: { marginTop: 14 },
  input: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 13,
    fontFamily: FONT_FAMILY,
  },
  multiline: { minHeight: 100, textAlignVertical: 'top' },
  error: { minHeight: 18, marginTop: 4 },
});
