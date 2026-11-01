import React, { useEffect, useMemo, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { CompositeScreenProps } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ApiError } from '../api/client';
import {
  fetchQuoteHotels,
  searchCity,
  type LiveHotel,
  type QuoteHotel,
} from '../api/hotels';
import { useSettings } from '../context/SettingsContext';
import { LiveHotelCard, QuoteHotelCard, cityName } from '../features/cards';
import {
  CityField,
  draftOf,
  StayFields,
  type StayDraft,
} from '../features/StayFields';
import { Notice } from '../features/visual';
import { t } from '../i18n/format';
import type {
  HotelsTab,
  RootStackParamList,
  TabParamList,
} from '../navigation/types';
import { citySlug } from '../shared/countries';
import { HOTEL_CITIES } from '../shared/hotel-cities';
import { hasChildAges, nightsBetween, type Stay } from '../shared/stay';
import { AppText } from '../ui/AppText';
import { Button } from '../ui/Button';
import { ChipRow } from '../ui/ChipRow';
import { Field } from '../ui/Field';
import { FormCard } from '../ui/FormCard';
import { Grid } from '../ui/Grid';
import { SearchIcon } from '../ui/icons';
import { Screen, Section } from '../ui/Screen';
import { Spinner } from '../ui/Spinner';
import { UnderlineTabs } from '../ui/UnderlineTabs';
import { useLayout } from '../ui/useLayout';

type Props = CompositeScreenProps<
  BottomTabScreenProps<TabParamList, 'Hotels'>,
  NativeStackScreenProps<RootStackParamList>
>;

type Results =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'error'; quota: boolean }
  | { status: 'done'; total: number; hotels: LiveHotel[]; stay: Stay; city: string };

export function toStay(draft: StayDraft): Stay | null {
  const nights = nightsBetween(draft.checkIn, draft.checkOut);
  if (!draft.checkIn || nights < 1) return null;
  return {
    checkIn: draft.checkIn,
    checkOut: draft.checkOut,
    adults: draft.adults,
    children: draft.children,
    ...(draft.children ? { childAges: draft.childAges } : {}),
  };
}

export function HotelsScreen({ navigation, route }: Props) {
  const { dict, locale } = useSettings();
  const layout = useLayout();
  const columns = layout.columns(300);
  const [tab, setTab] = useState<HotelsTab>('search');
  const [city, setCity] = useState('');
  const [draft, setDraft] = useState<StayDraft>(draftOf());
  const [errors, setErrors] = useState<{ city?: string; checkIn?: string }>(
    {},
  );
  const [results, setResults] = useState<Results>({ status: 'idle' });
  const [sort, setSort] = useState<'price' | 'stars'>('price');
  const [name, setName] = useState('');

  const [quote, setQuote] = useState<
    | { status: 'idle' | 'loading' | 'error' }
    | { status: 'done'; city: string; hotels: QuoteHotel[] }
  >({ status: 'idle' });
  const [picked, setPicked] = useState<string[]>([]);

  const params = route.params;
  useEffect(() => {
    if (!params) return;
    if (params.city) setCity(params.city);
    if (params.stay) setDraft(draftOf(params.stay));
    if (params.tab) setTab(params.tab);
    if (params.city && params.stay && params.tab !== 'quote') {
      search(params.city, draftOf(params.stay));
    }
    navigation.setParams({ city: undefined, stay: undefined, tab: undefined });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  useEffect(() => {
    if (tab !== 'quote' || !city) return;
    if (quote.status === 'done' && quote.city === city) return;
    setQuote({ status: 'loading' });
    setPicked([]);
    fetchQuoteHotels(city, locale, '')
      .then(hotels => setQuote({ status: 'done', city, hotels }))
      .catch(() => setQuote({ status: 'error' }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tab, city, locale]);

  function search(slug = city, current = draft) {
    const stay = toStay(current);
    const next: typeof errors = {};
    if (!slug) next.city = dict.hotelSearch.destinationPlaceholder;
    if (!stay) next.checkIn = dict.hotelSearch.hint;
    setErrors(next);
    if (!stay || !slug) return;
    if (!hasChildAges(stay)) return;
    setResults({ status: 'loading' });
    searchCity(slug, stay, locale, '')
      .then(res =>
        setResults({ status: 'done', ...res, stay, city: slug }),
      )
      .catch(error =>
        setResults({
          status: 'error',
          quota: error instanceof ApiError && error.code === 'unavailable',
        }),
      );
  }

  const shown = useMemo(() => {
    if (results.status !== 'done') return [];
    const words = name.toLowerCase().split(/\s+/).filter(Boolean);
    return results.hotels
      .filter(h => words.every(w => h.name.toLowerCase().includes(w)))
      .sort(
        (a, b) =>
          (sort === 'stars' ? (b.stars ?? 0) - (a.stars ?? 0) : 0) ||
          a.minPrice - b.minPrice,
      );
  }, [results, name, sort]);

  const cityInfo = HOTEL_CITIES.find(c => citySlug(c.city) === city);

  function requestQuote() {
    if (quote.status !== 'done' || !cityInfo) return;
    const names = Object.fromEntries(
      quote.hotels
        .filter(h => picked.includes(h.id))
        .map(h => [h.id, `${h.name}, ${cityInfo.city}`]),
    );
    navigation.navigate('Request', {
      title: dict.request.title,
      target: { kind: 'hotels', hotelNames: names },
      stay: toStay(draft) ?? {
        checkIn: '',
        checkOut: '',
        adults: draft.adults,
        children: draft.children,
      },
      mode: 'stay',
      summary: [
        {
          label: dict.request.selected,
          value: Object.values(names).join('\n'),
        },
      ],
    });
  }

  return (
    <Screen maxWidth={layout.pageWidth}>
      <UnderlineTabs
        value={tab}
        onChange={setTab}
        options={[
          { value: 'search', label: dict.hotelSearch.tabSearch },
          { value: 'quote', label: dict.hotelSearch.tabQuote },
        ]}
      />

      {tab === 'search' ? (
        <>
          <FormCard style={styles.form}>
            <CityField value={city} onChange={setCity} />
            {!!errors.city && !city && (
              <AppText variant="caption" color="#C62828" style={styles.error}>
                {errors.city}
              </AppText>
            )}
            <StayFields
              value={draft}
              onChange={setDraft}
              errors={{ checkIn: toStay(draft) ? undefined : errors.checkIn }}
            />
            {draft.children > 0 &&
              draft.childAges.length !== draft.children && (
                <AppText variant="caption" muted>
                  {dict.liveHotels.agesNeeded}
                </AppText>
              )}
            <Button
              label={dict.hotelSearch.search}
              onPress={() => search()}
              loading={results.status === 'loading'}
            />
          </FormCard>

          {results.status === 'idle' && (
            <Section>
              <Notice text={dict.hotelSearch.hint} />
            </Section>
          )}
          {results.status === 'loading' && (
            <Spinner label={dict.liveHotels.checking} />
          )}
          {results.status === 'error' && (
            <Section style={styles.gap}>
              <Notice text={dict.liveHotels.error} />
              <Button
                variant="secondary"
                label={dict.hotelSearch.tabQuote}
                onPress={() => setTab('quote')}
              />
            </Section>
          )}
          {results.status === 'done' && (
            <Section>
              <AppText variant="heading">
                {cityInfo ? cityName(dict.cities, cityInfo.city) : ''}
              </AppText>
              <AppText variant="caption" muted style={styles.count}>
                {t(dict.liveHotels.results, { n: results.total })}
              </AppText>
              {results.hotels.length === 0 ? (
                <Notice text={dict.liveHotels.noResults} />
              ) : (
                <>
                  <Notice text={dict.liveHotels.liveNotice} />
                  <View style={styles.filters}>
                    <Field
                      label={dict.liveHotels.filterName}
                      icon={SearchIcon}
                      value={name}
                      onChangeText={setName}
                      autoCorrect={false}
                    />
                    <ChipRow
                      value={sort}
                      onChange={setSort}
                      options={[
                        { value: 'price', label: dict.liveHotels.sortPrice },
                        { value: 'stars', label: dict.liveHotels.sortStars },
                      ]}
                    />
                  </View>
                  <Grid columns={columns}>
                    {shown.map(hotel => (
                      <View key={hotel.id} style={styles.item}>
                        <LiveHotelCard
                          hotel={hotel}
                          onPress={() =>
                            navigation.navigate('HotelDetail', {
                              id: hotel.id,
                              city: results.city,
                              stay: results.stay,
                              name: hotel.name,
                            })
                          }
                        />
                      </View>
                    ))}
                  </Grid>
                </>
              )}
            </Section>
          )}
        </>
      ) : (
        <>
          <FormCard style={styles.form}>
            <AppText variant="caption" muted style={styles.intro}>
              {dict.hotelSearch.quoteIntro}
            </AppText>
            <CityField value={city} onChange={setCity} />
          </FormCard>
          {!city && (
            <Section>
              <Notice text={dict.liveHotels.quoteChooseCity} />
            </Section>
          )}
          {quote.status === 'loading' && (
            <Spinner label={dict.liveHotels.checking} />
          )}
          {quote.status === 'error' && (
            <Section>
              <Notice text={dict.liveHotels.error} />
            </Section>
          )}
          {quote.status === 'done' && (
            <Section>
              <Notice text={dict.request.selectPrompt} />
              <View style={styles.list}>
                <Grid columns={columns}>
                  {quote.hotels.map(hotel => (
                    <View key={hotel.id} style={styles.item}>
                      <QuoteHotelCard
                        hotel={hotel}
                        selected={picked.includes(hotel.id)}
                        onToggle={() =>
                          setPicked(current =>
                            current.includes(hotel.id)
                              ? current.filter(id => id !== hotel.id)
                              : [...current, hotel.id],
                          )
                        }
                      />
                    </View>
                  ))}
                </Grid>
              </View>
              <Button
                label={`${dict.request.title} (${picked.length})`}
                disabled={!picked.length}
                onPress={requestQuote}
              />
            </Section>
          )}
        </>
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  form: { marginTop: 16 },
  error: { marginTop: -10, marginBottom: 12 },
  gap: { gap: 12 },
  count: { marginTop: 2, marginBottom: 12 },
  filters: { marginTop: 16 },
  item: { marginBottom: 16 },
  list: { marginVertical: 16 },
  intro: { marginBottom: 12 },
});
