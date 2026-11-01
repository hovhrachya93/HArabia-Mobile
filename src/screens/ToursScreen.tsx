import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { CompositeScreenProps } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useSettings } from '../context/SettingsContext';
import { cityName, TourCard } from '../features/cards';
import { Notice, SectionHeader } from '../features/visual';
import type { RootStackParamList, TabParamList } from '../navigation/types';
import { LIVE_COUNTRIES, type Country } from '../shared/countries';
import { tours } from '../shared/tours-data';
import type { Tour, TourCategory } from '../shared/types';
import { AppText } from '../ui/AppText';
import { ChipRow } from '../ui/ChipRow';
import { Grid } from '../ui/Grid';
import { Screen, Section } from '../ui/Screen';
import { useLayout } from '../ui/useLayout';

type Props = CompositeScreenProps<
  BottomTabScreenProps<TabParamList, 'Tours'>,
  NativeStackScreenProps<RootStackParamList>
>;

const citiesOf = (list: Tour[]) => Array.from(new Set(list.map(t => t.city)));

export function ToursScreen({ navigation, route }: Props) {
  const { dict, colors } = useSettings();
  const layout = useLayout();
  const columns = layout.columns(300);
  const [country, setCountry] = useState<Country | 'all'>('all');
  const [category, setCategory] = useState<TourCategory | 'all'>('all');

  const params = route.params;
  useEffect(() => {
    if (!params) return;
    if (params.country) setCountry(params.country);
    if (params.category) setCategory(params.category);
    navigation.setParams({ country: undefined, category: undefined });
  }, [params, navigation]);

  const categories = (Object.keys(dict.tours.categories) as TourCategory[])
    .filter(value => tours.some(t => t.category === value))
    .map(value => ({ value, label: dict.tours.categories[value] }));

  const matching = tours.filter(
    t =>
      (country === 'all' || t.country === country) &&
      (category === 'all' || t.category === category),
  );
  const countries = LIVE_COUNTRIES.filter(c =>
    matching.some(t => t.country === c.name),
  );

  return (
    <Screen maxWidth={layout.pageWidth}>
      <AppText variant="caption" muted>
        {dict.tours.intro}
      </AppText>
      <View style={styles.filters}>
        <ChipRow
          value={country}
          onChange={setCountry}
          options={[
            { value: 'all', label: dict.common.all },
            ...LIVE_COUNTRIES.map(c => ({
              value: c.name,
              label: dict.countries[c.name],
            })),
          ]}
        />
        <ChipRow
          value={category}
          onChange={setCategory}
          options={[{ value: 'all', label: dict.common.all }, ...categories]}
        />
      </View>
      <Notice text={dict.tours.localNote} />
      {countries.map(c => (
        <Section key={c.name}>
          <SectionHeader title={dict.countries[c.name]} />
          {citiesOf(matching.filter(t => t.country === c.name)).map(city => (
            <View key={city} style={styles.city}>
              <AppText variant="label" color={colors.accent} style={styles.cityName}>
                {cityName(dict.cities, city)}
              </AppText>
              <Grid columns={columns}>
                {matching
                  .filter(t => t.city === city)
                  .map(tour => (
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
            </View>
          ))}
        </Section>
      ))}
    </Screen>
  );
}

const styles = StyleSheet.create({
  filters: { gap: 10, marginVertical: 14 },
  city: { marginBottom: 6 },
  cityName: { marginBottom: 8 },
  item: { marginBottom: 16 },
});
