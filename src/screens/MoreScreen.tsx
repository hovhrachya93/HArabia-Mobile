import React from 'react';
import { Linking, Pressable, StyleSheet, View } from 'react-native';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { CompositeScreenProps } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { websiteLink } from '../config';
import { useSettings } from '../context/SettingsContext';
import type { RootStackParamList, TabParamList } from '../navigation/types';
import { CONTACT, phoneLink, SOCIAL, whatsappLink } from '../shared/contact';
import { AppText } from '../ui/AppText';
import { BRAND_COLORS, BRAND_ICONS } from '../ui/brandIcons';
import { HArabiaMark, HArabiaWordmark } from '../ui/HArabiaLogo';
import {
  ChevronRight,
  ExternalIcon,
  GlobeIcon,
  InstagramIcon,
  MusicIcon,
  PhoneIcon,
  SettingsIcon,
  SparkleIcon,
  ToursIcon,
} from '../ui/icons';
import { Screen } from '../ui/Screen';
import Svg, { Path } from 'react-native-svg';

type Props = CompositeScreenProps<
  BottomTabScreenProps<TabParamList, 'More'>,
  NativeStackScreenProps<RootStackParamList>
>;

type Row = {
  key: string;
  label: string;
  icon: React.ReactNode;
  onPress: () => void;
  external?: boolean;
};

function BrandIcon({ path, color }: { path: string; color: string }) {
  return (
    <Svg width={20} height={20} viewBox="0 0 24 24">
      <Path d={path} fill={color} />
    </Svg>
  );
}

export function MoreScreen({ navigation }: Props) {
  const { dict, strings, colors, locale, isDark } = useSettings();
  const whatsapp = whatsappLink('');
  const phone = phoneLink();

  const groups: { title: string; rows: Row[] }[] = [
    {
      title: 'HArabia',
      rows: [
        {
          key: 'destinations',
          label: dict.destinations.title,
          icon: <GlobeIcon color={colors.accent} />,
          onPress: () => navigation.navigate('Destinations'),
        },
        {
          key: 'concerts',
          label: dict.concerts.title,
          icon: <MusicIcon color={colors.accent} />,
          onPress: () => navigation.navigate('Concerts'),
        },
        {
          key: 'qatar',
          label: dict.qatarEvents.title,
          icon: <ToursIcon color={colors.accent} size={20} />,
          onPress: () => navigation.navigate('QatarEvents'),
        },
        {
          key: 'vip',
          label: dict.nav.vip,
          icon: <SparkleIcon color={colors.accent} />,
          onPress: () => navigation.navigate('Vip'),
        },
        {
          key: 'settings',
          label: strings.settings,
          icon: <SettingsIcon color={colors.accent} size={20} />,
          onPress: () => navigation.navigate('Settings'),
        },
      ],
    },
    {
      title: strings.contactUs,
      rows: [
        ...(phone
          ? [
              {
                key: 'phone',
                label: `${strings.call} · ${CONTACT.phone}`,
                icon: <PhoneIcon color={colors.accent} />,
                onPress: () => Linking.openURL(phone),
                external: true,
              },
            ]
          : []),
        ...(whatsapp
          ? [
              {
                key: 'whatsapp',
                label: strings.whatsapp,
                icon: (
                  <BrandIcon
                    path={BRAND_ICONS.whatsapp}
                    color={BRAND_COLORS.whatsapp}
                  />
                ),
                onPress: () => Linking.openURL(whatsapp),
                external: true,
              },
            ]
          : []),
        ...(SOCIAL.instagram
          ? [
              {
                key: 'instagram',
                label: 'Instagram',
                icon: <InstagramIcon color="#E1306C" />,
                onPress: () => Linking.openURL(SOCIAL.instagram),
                external: true,
              },
            ]
          : []),
        ...(SOCIAL.facebook
          ? [
              {
                key: 'facebook',
                label: 'Facebook',
                icon: (
                  <BrandIcon
                    path={BRAND_ICONS.facebook}
                    color={BRAND_COLORS.facebook}
                  />
                ),
                onPress: () => Linking.openURL(SOCIAL.facebook),
                external: true,
              },
            ]
          : []),
        {
          key: 'website',
          label: strings.openWebsite,
          icon: <GlobeIcon color={colors.accent} />,
          onPress: () => Linking.openURL(websiteLink(locale, '/')),
          external: true,
        },
      ],
    },
  ];

  return (
    <Screen>
      {groups.map(group => (
        <View key={group.title} style={styles.group}>
          <AppText variant="label" muted style={styles.groupTitle}>
            {group.title}
          </AppText>
          <View
            style={[
              styles.card,
              { backgroundColor: colors.surface, borderColor: colors.border },
            ]}
          >
            {group.rows.map((row, i) => (
              <Pressable
                key={row.key}
                accessibilityRole={row.external ? 'link' : 'button'}
                onPress={row.onPress}
                style={({ pressed }) => [
                  styles.row,
                  i > 0 && {
                    borderTopColor: colors.border,
                    borderTopWidth: StyleSheet.hairlineWidth,
                  },
                  pressed && { backgroundColor: colors.surfaceMuted },
                ]}
              >
                <View
                  style={[styles.icon, { backgroundColor: colors.surfaceMuted }]}
                >
                  {row.icon}
                </View>
                <AppText variant="body" style={styles.flex}>
                  {row.label}
                </AppText>
                {row.external ? (
                  <ExternalIcon color={colors.textMuted} size={16} />
                ) : (
                  <ChevronRight color={colors.textMuted} />
                )}
              </Pressable>
            ))}
          </View>
        </View>
      ))}

      <View style={styles.signature}>
        <HArabiaMark size={44} />
        <HArabiaWordmark size={22} light={isDark} />
        <AppText variant="caption" muted style={styles.center}>
          {dict.meta.tagline}
        </AppText>
        <AppText variant="caption" muted style={styles.center}>
          © {new Date().getFullYear()} HTours. {dict.meta.rights}
        </AppText>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  group: { marginBottom: 20 },
  groupTitle: {
    marginBottom: 8,
    marginStart: 4,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  card: { borderRadius: 18, borderWidth: 1, overflow: 'hidden' },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  icon: {
    width: 36,
    height: 36,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  signature: { alignItems: 'center', gap: 6, marginTop: 12 },
  center: { textAlign: 'center' },
});
