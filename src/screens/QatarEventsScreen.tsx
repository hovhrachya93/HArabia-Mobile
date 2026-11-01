import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { imageUrl } from '../config';
import { useSettings } from '../context/SettingsContext';
import { Badge, Card, Notice } from '../features/visual';
import { t } from '../i18n/format';
import type { RootStackParamList } from '../navigation/types';
import { qatarEvents, qatarEventsBanner } from '../shared/qatar-events-data';
import type { QatarEvent } from '../shared/types';
import { AppText } from '../ui/AppText';
import { Button } from '../ui/Button';
import { Grid } from '../ui/Grid';
import { Screen, Section } from '../ui/Screen';
import { useLayout } from '../ui/useLayout';
import { formatDate, formatRange } from '../util/format';

type Props = NativeStackScreenProps<RootStackParamList, 'QatarEvents'>;

export function QatarEventsScreen({ navigation }: Props) {
  const { dict, locale, isDark, colors } = useSettings();
  const layout = useLayout();
  const labels = dict.qatarEvents;

  function when(event: QatarEvent) {
    if (event.from && event.to)
      return event.from === event.to
        ? formatDate(locale, event.from)
        : formatRange(locale, event.from, event.to);
    if (event.to) return t(labels.until, { date: formatDate(locale, event.to) });
    if (event.from) return t(labels.from, { date: formatDate(locale, event.from) });
    return labels.allYear;
  }

  return (
    <Screen maxWidth={layout.pageWidth}>
      <Image
        source={{
          uri: imageUrl(isDark ? qatarEventsBanner.night : qatarEventsBanner.day),
        }}
        style={styles.banner}
        resizeMode="cover"
      />
      <AppText variant="caption" color={colors.accent} style={styles.eyebrow}>
        {labels.eyebrow}
      </AppText>
      <AppText variant="body" style={styles.intro}>
        {labels.intro}
      </AppText>
      <Grid columns={layout.columns(320)}>
        {qatarEvents.map(event => {
          const picture =
            event.image &&
            imageUrl(isDark && event.image.night ? event.image.night : event.image.day);
          return (
            <View key={event.slug} style={styles.item}>
              <Card>
                {!!picture && (
                  <Image
                    source={{ uri: picture }}
                    style={styles.picture}
                    resizeMode="cover"
                  />
                )}
                <View style={styles.body}>
                  <View style={styles.row}>
                    <AppText variant="caption" color={colors.accent}>
                      {when(event)}
                    </AppText>
                    {event.expected && <Badge label={labels.expected} tone="gold" />}
                  </View>
                  <AppText variant="subheading" color={colors.heading}>
                    {event.title[locale]}
                  </AppText>
                  <AppText variant="caption" muted>
                    {event.place[locale]}
                  </AppText>
                  <AppText variant="body">{event.details[locale]}</AppText>
                </View>
              </Card>
            </View>
          );
        })}
      </Grid>
      <Section>
        <Notice text={labels.note} />
        <Button
          style={styles.button}
          label={dict.blog.ctaHotels}
          onPress={() =>
            navigation.navigate('Tabs', {
              screen: 'Hotels',
              params: { city: 'doha' },
            })
          }
        />
      </Section>
    </Screen>
  );
}

const styles = StyleSheet.create({
  banner: { width: '100%', aspectRatio: 2048 / 576, borderRadius: 18 },
  eyebrow: {
    marginTop: 16,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  intro: { marginTop: 6, marginBottom: 16 },
  item: { marginBottom: 16 },
  picture: { width: '100%', aspectRatio: 16 / 9 },
  body: { padding: 14, gap: 6 },
  row: { flexDirection: 'row', alignItems: 'center', gap: 8, flexWrap: 'wrap' },
  button: { marginTop: 16 },
});
