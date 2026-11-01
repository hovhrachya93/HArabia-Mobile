import React from 'react';
import { Pressable, Share, StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useSettings } from '../context/SettingsContext';
import { AppText } from '../ui/AppText';
import { HArabiaMark } from '../ui/HArabiaLogo';
import { websiteLink } from '../config';
import { SettingsIcon, ShareIcon } from '../ui/icons';
import type { RootStackParamList } from './types';
import { useLayout } from '../ui/useLayout';

const BAR_HEIGHT = 56;
const SIDE = 64;

export function AppHeader({
  title,
  onLogoPress,
  onSettingsPress,
  settingsLabel,
}: {
  title: string;
  onLogoPress: () => void;
  onSettingsPress: () => void;
  settingsLabel: string;
}) {
  const { colors } = useSettings();
  const insets = useSafeAreaInsets();
  const layout = useLayout();

  return (
    <View
      style={[
        styles.wrap,
        {
          paddingTop: insets.top,
          backgroundColor: colors.primary,
          borderBottomColor: colors.border,
        },
      ]}
    >
      <View
        style={[
          styles.bar,
          { paddingHorizontal: layout.side(layout.pageWidth) },
        ]}
      >
        <View style={styles.side}>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="HArabia"
            onPress={onLogoPress}
            hitSlop={8}
            style={({ pressed }) => [styles.logo, pressed && styles.pressed]}
          >
            <HArabiaMark size={36} />
          </Pressable>
        </View>

        <AppText
          accessibilityRole="header"
          variant="subheading"
          color={colors.primaryText}
          numberOfLines={1}
          adjustsFontSizeToFit
          minimumFontScale={0.8}
          style={styles.title}
        >
          {title}
        </AppText>

        <View style={[styles.side, styles.sideRight]}>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={settingsLabel}
            onPress={onSettingsPress}
            hitSlop={8}
            style={({ pressed }) => [
              styles.action,
              { backgroundColor: colors.surfaceMuted },
              pressed && styles.pressed,
            ]}
          >
            <SettingsIcon color={colors.primaryText} size={20} />
          </Pressable>
        </View>
      </View>
    </View>
  );
}

export function HeaderSettingsButton() {
  const { colors, strings } = useSettings();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={strings.settings}
      onPress={() => navigation.navigate('Settings')}
      hitSlop={8}
      style={({ pressed }) => [
        styles.action,
        { backgroundColor: colors.surfaceMuted },
        pressed && styles.pressed,
      ]}
    >
      <SettingsIcon color={colors.primaryText} size={20} />
    </Pressable>
  );
}

export function HeaderShareActions({
  path,
  title,
}: {
  path: string;
  title?: string;
}) {
  const { colors, locale, strings } = useSettings();
  const url = websiteLink(locale, path);
  return (
    <View style={styles.actions}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={strings.share}
        onPress={() =>
          Share.share({ title, message: title ? `${title}\n${url}` : url })
        }
        hitSlop={8}
        style={({ pressed }) => [
          styles.action,
          { backgroundColor: colors.surfaceMuted },
          pressed && styles.pressed,
        ]}
      >
        <ShareIcon color={colors.primaryText} size={20} />
      </Pressable>
      <HeaderSettingsButton />
    </View>
  );
}

const styles = StyleSheet.create({
  actions: { flexDirection: 'row', gap: 10 },
  wrap: { borderBottomWidth: StyleSheet.hairlineWidth },
  bar: {
    height: BAR_HEIGHT,
    flexDirection: 'row',
    alignItems: 'center',
  },
  side: { width: SIDE, justifyContent: 'center' },
  sideRight: { alignItems: 'flex-end' },
  title: {
    flex: 1,
    textAlign: 'center',
    fontSize: 17,
    fontWeight: '700',
    letterSpacing: 0.2,
  },
  logo: {
    width: 36,
    height: 36,
    borderRadius: 10,
    overflow: 'hidden',
  },
  action: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressed: { opacity: 0.6 },
});
