import React from 'react';
import { Image, Linking, StyleSheet, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { imageUrl } from '../config';
import { useSettings } from '../context/SettingsContext';
import { cityName, ConcertCard } from '../features/cards';
import { Card, Notice, SectionHeader } from '../features/visual';
import { t } from '../i18n/format';
import type { RootStackParamList } from '../navigation/types';
import { concerts } from '../shared/concerts-data';
import { whatsappLink } from '../shared/contact';
import { citySlug } from '../shared/countries';
import { HOTEL_CITIES } from '../shared/hotel-cities';
import { stayAround } from '../shared/stay';
import { AppText } from '../ui/AppText';
import { Button } from '../ui/Button';
import { Grid } from '../ui/Grid';
import { Screen, Section } from '../ui/Screen';
import { useLayout } from '../ui/useLayout';
import { formatDate } from '../util/format';
import { Summary } from './RequestScreen';

type Props = NativeStackScreenProps<RootStackParamList, 'ConcertDetail'>;

export function ConcertDetailScreen({ navigation, route }: Props) {
  const { dict, locale, isDark, colors } = useSettings();
  const layout = useLayout();
  const concert = concerts.find(c => c.slug === route.params.slug);
  if (!concert) return null;

  const city = cityName(dict.cities, concert.city);
  const knownDay = concert.date.length === 10;
  const date = knownDay
    ? formatDate(locale, concert.date)
    : `${formatDate(locale, concert.date)} · ${dict.concerts.dateTba}`;
  const picture =
    concert.image && imageUrl(isDark ? concert.image.night : concert.image.day);
  const hotelCity = HOTEL_CITIES.find(c => c.city === concert.city);
  const stay = knownDay ? stayAround(concert.date) : null;
  const message = whatsappLink(
    t(dict.concerts.message, { artist: concert.artist, date, city }),
  );
  const more = concerts.filter(c => c.slug !== concert.slug).slice(0, 2);
  const trip = dict.concerts.trip;

  return (
    <Screen maxWidth={layout.pageWidth}>
      {!!picture && (
        <Image source={{ uri: picture }} style={styles.picture} resizeMode="cover" />
      )}
      <AppText variant="caption" color={colors.accent} style={styles.eyebrow}>
        {dict.concerts.genres[concert.genre]}
      </AppText>
      <AppText variant="title" color={colors.heading}>
        {t(dict.concerts.pageTitle, { artist: concert.artist, city })}
      </AppText>
      <View style={styles.block}>
        <Summary
          rows={[
            { label: dict.concerts.facts.date, value: date },
            { label: dict.concerts.facts.venue, value: concert.venue },
            { label: dict.concerts.facts.city, value: city },
          ]}
        />
      </View>

      <Section>
        <SectionHeader title={dict.concerts.tripTitle} body={dict.concerts.tripBody} />
        <View style={styles.trip}>
          <Card style={styles.tripCard}>
            <AppText variant="subheading">{t(trip.hotel.title, { city })}</AppText>
            <AppText variant="caption" muted>
              {trip.hotel.body}
            </AppText>
            <Button
              style={styles.tripButton}
              label={trip.hotel.cta}
              onPress={() =>
                navigation.navigate('Tabs', {
                  screen: 'Hotels',
                  params: {
                    city: hotelCity ? citySlug(hotelCity.city) : undefined,
                    stay: stay ?? undefined,
                  },
                })
              }
            />
          </Card>
          <Card style={styles.tripCard}>
            <AppText variant="subheading">{trip.transfer.title}</AppText>
            <AppText variant="caption" muted>
              {trip.transfer.body}
            </AppText>
          </Card>
          <Card style={styles.tripCard}>
            <AppText variant="subheading">{trip.tours.title}</AppText>
            <AppText variant="caption" muted>
              {trip.tours.body}
            </AppText>
            <Button
              style={styles.tripButton}
              variant="secondary"
              label={trip.tours.cta}
              onPress={() =>
                navigation.navigate('Tabs', {
                  screen: 'Tours',
                  params: { country: 'UAE' },
                })
              }
            />
          </Card>
        </View>
        {!!message && (
          <Button
            style={styles.tripButton}
            label={dict.concerts.plan}
            onPress={() => Linking.openURL(message)}
          />
        )}
      </Section>

      <Section>
        <Notice text={dict.concerts.note} />
      </Section>

      <Section>
        <SectionHeader
          title={dict.concerts.more}
          action={dict.concerts.seeAll}
          onAction={() => navigation.navigate('Concerts')}
        />
        <Grid columns={layout.columns(300)}>
          {more.map(other => (
            <View key={other.slug} style={styles.item}>
              <ConcertCard
                concert={other}
                onPress={() =>
                  navigation.push('ConcertDetail', { slug: other.slug })
                }
              />
            </View>
          ))}
        </Grid>
      </Section>
    </Screen>
  );
}

const styles = StyleSheet.create({
  picture: { width: '100%', aspectRatio: 16 / 9, borderRadius: 18 },
  eyebrow: {
    marginTop: 16,
    marginBottom: 4,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  block: { marginTop: 16 },
  trip: { gap: 12 },
  tripCard: { padding: 16, gap: 4 },
  tripButton: { marginTop: 12 },
  item: { marginBottom: 16 },
});
