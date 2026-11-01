import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useSettings } from '../context/SettingsContext';
import {
  ArticleCard,
  cityName,
  countryPhoto,
  TourCard,
} from '../features/cards';
import { Card, SectionHeader } from '../features/visual';
import type { RootStackParamList } from '../navigation/types';
import { getArticle } from '../shared/articles-data';
import { citySlug } from '../shared/countries';
import { getDestination } from '../shared/destinations-data';
import { HOTEL_CITIES } from '../shared/hotel-cities';
import { tours } from '../shared/tours-data';
import type { Article } from '../shared/types';
import { AppText } from '../ui/AppText';
import { Button } from '../ui/Button';
import { Grid } from '../ui/Grid';
import { Screen, Section } from '../ui/Screen';
import { useLayout } from '../ui/useLayout';

type Props = NativeStackScreenProps<RootStackParamList, 'DestinationDetail'>;

export function DestinationDetailScreen({ navigation, route }: Props) {
  const { dict, locale, isDark, colors } = useSettings();
  const layout = useLayout();
  const destination = getDestination(route.params.country);
  if (!destination) return null;

  const country = destination.country;
  const countryTours = tours.filter(t => t.country === country).slice(0, 4);
  const related = destination.articles
    .map(slug => getArticle(slug))
    .filter((a): a is Article => !!a);
  const columns = layout.columns(300);

  const seeHotels = (city?: string) => {
    const hotelCity = HOTEL_CITIES.find(
      c => (city ? c.city === city : true) && c.country === country,
    );
    navigation.navigate('Tabs', {
      screen: 'Hotels',
      params: hotelCity ? { city: citySlug(hotelCity.city) } : undefined,
    });
  };

  return (
    <Screen maxWidth={layout.pageWidth}>
      <Image
        source={{ uri: countryPhoto(country, isDark) }}
        style={styles.photo}
        resizeMode="cover"
      />
      <AppText variant="title" color={colors.heading} style={styles.title}>
        {dict.countries[country]}
      </AppText>
      <AppText variant="subheading" muted>
        {destination.tagline[locale]}
      </AppText>
      <AppText variant="body" style={styles.intro}>
        {destination.intro[locale]}
      </AppText>

      <Section>
        <SectionHeader title={dict.destinations.factsTitle} />
        <View style={styles.facts}>
          {destination.facts.map(fact => (
            <Card key={fact.key} style={styles.fact}>
              <AppText variant="caption" muted>
                {dict.destinations.facts[fact.key]}
              </AppText>
              <AppText variant="label">{fact.value[locale]}</AppText>
            </Card>
          ))}
        </View>
      </Section>

      <Section>
        <SectionHeader title={dict.destinations.citiesTitle} />
        <View style={styles.stack}>
          {destination.cities.map(city => (
            <Card key={city.name} style={styles.padded}>
              <AppText variant="subheading" color={colors.heading}>
                {cityName(dict.cities, city.name)}
              </AppText>
              <AppText variant="body" muted>
                {city.body[locale]}
              </AppText>
              {HOTEL_CITIES.some(c => c.city === city.name) && (
                <Button
                  variant="secondary"
                  style={styles.button}
                  label={dict.destinations.seeHotels}
                  onPress={() => seeHotels(city.name)}
                />
              )}
            </Card>
          ))}
        </View>
      </Section>

      {[
        { title: dict.destinations.highlightsTitle, items: destination.highlights },
        { title: dict.destinations.tipsTitle, items: destination.tips },
      ].map(group => (
        <Section key={group.title}>
          <SectionHeader title={group.title} />
          <View style={styles.stack}>
            {group.items.map((item, i) => (
              <View key={i} style={styles.point}>
                <View style={[styles.dot, { backgroundColor: colors.action }]} />
                <View style={styles.flex}>
                  <AppText variant="label">{item.title[locale]}</AppText>
                  <AppText variant="body" muted>
                    {item.body[locale]}
                  </AppText>
                </View>
              </View>
            ))}
          </View>
        </Section>
      ))}

      {countryTours.length > 0 && (
        <Section>
          <SectionHeader
            title={dict.destinations.toursTitle}
            action={dict.home.seeAll}
            onAction={() =>
              navigation.navigate('Tabs', { screen: 'Tours', params: { country } })
            }
          />
          <Grid columns={columns}>
            {countryTours.map(tour => (
              <View key={tour.slug} style={styles.item}>
                <TourCard
                  tour={tour}
                  index={tours.indexOf(tour)}
                  onPress={() =>
                    navigation.navigate('TourDetail', { slug: tour.slug })
                  }
                />
              </View>
            ))}
          </Grid>
        </Section>
      )}

      {related.length > 0 && (
        <Section>
          <SectionHeader title={dict.destinations.articlesTitle} />
          <Grid columns={columns}>
            {related.map(article => (
              <View key={article.slug} style={styles.item}>
                <ArticleCard
                  article={article}
                  onPress={() =>
                    navigation.navigate('Article', { slug: article.slug })
                  }
                />
              </View>
            ))}
          </Grid>
        </Section>
      )}

      <Button
        style={styles.button}
        label={dict.destinations.seeHotels}
        onPress={() => seeHotels()}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  photo: { width: '100%', aspectRatio: 1983 / 793, borderRadius: 18 },
  title: { marginTop: 16 },
  intro: { marginTop: 12 },
  facts: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  fact: { flexGrow: 1, flexBasis: '45%', padding: 12, gap: 2 },
  stack: { gap: 12 },
  padded: { padding: 16, gap: 6 },
  button: { marginTop: 12 },
  point: { flexDirection: 'row', gap: 12 },
  dot: { width: 8, height: 8, borderRadius: 4, marginTop: 8 },
  item: { marginBottom: 16 },
});
