import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { imageUrl } from '../config';
import { useSettings } from '../context/SettingsContext';
import { qatarEventsBanner } from '../shared/qatar-events-data';
import { AppText } from '../ui/AppText';
import { Card } from './visual';

export const CONCERTS_BANNER = {
  day: '/images/concerts/uae-concerts-calendar.png',
  night: '/images/concerts/uae-concerts-calendar-night.png',
};

export function EventBanner({
  banner,
  eyebrow,
  title,
  body,
  onPress,
}: {
  banner: { day: string; night: string };
  eyebrow: string;
  title: string;
  body: string;
  onPress: () => void;
}) {
  const { isDark, colors } = useSettings();
  return (
    <Card onPress={onPress} accessibilityLabel={title}>
      <Image
        source={{ uri: imageUrl(isDark ? banner.night : banner.day) }}
        style={styles.banner}
        resizeMode="cover"
      />
      <View style={styles.body}>
        <AppText variant="caption" color={colors.accent} style={styles.eyebrow}>
          {eyebrow}
        </AppText>
        <AppText variant="subheading" color={colors.heading}>
          {title}
        </AppText>
        <AppText variant="caption" muted>
          {body}
        </AppText>
      </View>
    </Card>
  );
}

export function EventCards({
  onConcerts,
  onQatar,
}: {
  onConcerts: () => void;
  onQatar: () => void;
}) {
  const { dict } = useSettings();
  return (
    <View style={styles.list}>
      <EventBanner
        banner={CONCERTS_BANNER}
        eyebrow={dict.concerts.eyebrow}
        title={dict.concerts.title}
        body={dict.concerts.homeBody}
        onPress={onConcerts}
      />
      <EventBanner
        banner={qatarEventsBanner}
        eyebrow={dict.qatarEvents.eyebrow}
        title={dict.qatarEvents.title}
        body={dict.qatarEvents.homeBody}
        onPress={onQatar}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  list: { gap: 16 },
  banner: { width: '100%', aspectRatio: 2048 / 576 },
  body: { padding: 14, gap: 4 },
  eyebrow: { fontWeight: '700', textTransform: 'uppercase', letterSpacing: 1 },
});
