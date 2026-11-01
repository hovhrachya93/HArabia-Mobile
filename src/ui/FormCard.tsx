import React from 'react';
import { StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';
import { useSettings } from '../context/SettingsContext';
import { AppText } from './AppText';
import { SendIcon } from './icons';

export function FormCard({
  title,
  children,
  style,
}: {
  title?: string;
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}) {
  const { colors, isDark } = useSettings();
  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: colors.surface,
          borderColor: isDark ? colors.border : 'rgba(24,43,58,0.08)',
        },
        style,
      ]}
    >
      {!!title && (
      <View style={[styles.head, { borderBottomColor: colors.border }]}>
        <View
          style={[
            styles.badge,
            {
              backgroundColor: isDark
                ? 'rgba(56,168,156,0.16)'
                : 'rgba(20,124,114,0.08)',
            },
          ]}
        >
          <SendIcon color={colors.accent} size={20} />
        </View>
        <AppText variant="subheading" style={styles.title}>
          {title}
        </AppText>
      </View>
      )}
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderRadius: 24,
    padding: 18,
    marginTop: 24,
    shadowColor: '#182B3A',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 24,
    elevation: 4,
  },
  head: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingBottom: 14,
    marginBottom: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  badge: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: { fontWeight: '800', flex: 1 },
});
