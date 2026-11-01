import React from 'react';
import { StyleSheet, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useMoney } from '../context/CurrencyContext';
import { useSettings } from '../context/SettingsContext';
import { cityName, TourCard, tourDuration } from '../features/cards';
import {
  Badge,
  Gradient,
  GRADIENTS,
  isLightGradient,
  Notice,
  SectionHeader,
} from '../features/visual';
import type { RootStackParamList } from '../navigation/types';
import { tours } from '../shared/tours-data';
import type { Tour } from '../shared/types';
import { brand } from '../theme/palette';
import { AppText } from '../ui/AppText';
import { Button } from '../ui/Button';
import { Grid } from '../ui/Grid';
import { Screen, Section } from '../ui/Screen';
import { useLayout } from '../ui/useLayout';
import { Summary } from './RequestScreen';

type Props = NativeStackScreenProps<RootStackParamList, 'TourDetail'>;

function similarTours(tour: Tour): Tour[] {
  const others = tours.filter(t => t.slug !== tour.slug);
  const sameCity = others.filter(t => t.city === tour.city);
  const sameCategory = others.filter(
    t => t.city !== tour.city && t.category === tour.category,
  );
  return [...sameCity, ...sameCategory].slice(0, 3);
}

export function TourDetailScreen({ navigation, route }: Props) {
  const { dict, locale } = useSettings();
  const { usd } = useMoney();
  const layout = useLayout();
  const tour = tours.find(t => t.slug === route.params.slug);
  if (!tour) return null;

  const index = tours.indexOf(tour);
  const gradient = GRADIENTS[index % GRADIENTS.length];
  const light = isLightGradient(gradient);
  const type =
    tour.type === 'private'
      ? dict.tours.private
      : tour.type === 'ticket'
      ? dict.tours.ticket
      : dict.tours.group;
  const similar = similarTours(tour);

  function request() {
    if (!tour) return;
    navigation.navigate('Request', {
      title: dict.tourPage.requestTitle,
      target: { kind: 'tour', tourSlug: tour.slug },
      stay: { checkIn: '', checkOut: '', adults: 2, children: 0 },
      mode: 'day',
      summary: [{ label: dict.nav.tours, value: tour.name[locale] }],
    });
  }

  return (
    <Screen maxWidth={layout.pageWidth}>
      <Gradient colors={gradient} style={styles.hero}>
        <Badge label={dict.tours.categories[tour.category]} />
        <AppText
          variant="title"
          color={light ? brand.nightDark : '#FFFFFF'}
          style={styles.title}
        >
          {tour.name[locale]}
        </AppText>
        <AppText variant="body" color={light ? brand.night : '#FFFFFFD9'}>
          {cityName(dict.cities, tour.city)}, {dict.countries[tour.country]}
        </AppText>
      </Gradient>

      <AppText variant="body" style={styles.description}>
        {tour.description[locale]}
      </AppText>

      <Summary
        rows={[
          {
            label: dict.tourPage.duration,
            value: tourDuration(tour.durationHours, dict.tours.overnight, locale),
          },
          { label: dict.tourPage.type, value: type },
          {
            label: dict.tourPage.price,
            value: `${usd(tour.priceFromUsd)} ${dict.tours.perPerson}`,
          },
        ]}
      />
      <Button
        style={styles.button}
        label={dict.tourPage.request}
        onPress={request}
      />

      <Section>
        <Notice text={dict.tours.localNote} />
        <Button
          style={styles.button}
          variant="secondary"
          label={dict.tours.seePackages}
          onPress={() => navigation.navigate('Tabs', { screen: 'Packages' })}
        />
      </Section>

      {similar.length > 0 && (
        <Section>
          <SectionHeader title={dict.tourPage.similar} />
          <Grid columns={layout.columns(300)}>
            {similar.map(other => (
              <View key={other.slug} style={styles.item}>
                <TourCard
                  tour={other}
                  index={tours.indexOf(other)}
                  onPress={() =>
                    navigation.push('TourDetail', { slug: other.slug })
                  }
                />
              </View>
            ))}
          </Grid>
        </Section>
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  hero: { borderRadius: 22, padding: 20, minHeight: 200, justifyContent: 'flex-end' },
  title: { marginTop: 16, marginBottom: 6 },
  description: { marginVertical: 18 },
  button: { marginTop: 16 },
  item: { marginBottom: 16 },
});
