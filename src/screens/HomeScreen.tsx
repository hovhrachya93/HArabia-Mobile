import React, { useEffect, useRef, useState } from 'react';
import { Animated, Image, Pressable, StyleSheet, View } from 'react-native';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { CompositeScreenProps } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useSettings } from '../context/SettingsContext';
import {
  ArticleCard,
  countryPhoto,
  DestinationCard,
  PackageCard,
  TourCard,
} from '../features/cards';
import { EventCards } from '../features/EventCards';
import { CityField } from '../features/StayFields';
import { Card, Gradient, SectionHeader } from '../features/visual';
import { t } from '../i18n/format';
import type { RootStackParamList, TabParamList } from '../navigation/types';
import { articles } from '../shared/articles-data';
import { LIVE_COUNTRIES } from '../shared/countries';
import { liveDestinations } from '../shared/destinations-data';
import { packages } from '../shared/packages-data';
import { tours } from '../shared/tours-data';
import { brand } from '../theme/palette';
import { AppText } from '../ui/AppText';
import { Button } from '../ui/Button';
import { Grid } from '../ui/Grid';
import { HArabiaMark, HArabiaWordmark } from '../ui/HArabiaLogo';
import { SettingsIcon } from '../ui/icons';
import { Screen, Section } from '../ui/Screen';
import { useLayout } from '../ui/useLayout';
import { formatList } from '../util/format';

type Props = CompositeScreenProps<
  BottomTabScreenProps<TabParamList, 'Home'>,
  NativeStackScreenProps<RootStackParamList>
>;

function HeroPhotos() {
  const { isDark } = useSettings();
  const [index, setIndex] = useState(0);
  const fade = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const timer = setInterval(() => {
      Animated.timing(fade, {
        toValue: 0,
        duration: 400,
        useNativeDriver: true,
      }).start(() => {
        setIndex(i => (i + 1) % LIVE_COUNTRIES.length);
        Animated.timing(fade, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }).start();
      });
    }, 5000);
    return () => clearInterval(timer);
  }, [fade]);

  return (
    <Animated.View style={[StyleSheet.absoluteFill, { opacity: fade }]}>
      <Image
        source={{ uri: countryPhoto(LIVE_COUNTRIES[index].name, isDark) }}
        style={StyleSheet.absoluteFill}
        resizeMode="cover"
      />
      <View
        style={[
          StyleSheet.absoluteFill,
          {
            backgroundColor: isDark
              ? 'rgba(11,19,26,0.55)'
              : 'rgba(255,252,246,0.55)',
          },
        ]}
      />
    </Animated.View>
  );
}

export function HomeScreen({ navigation }: Props) {
  const { dict, locale, colors, isDark, strings } = useSettings();
  const insets = useSafeAreaInsets();
  const layout = useLayout();
  const columns = layout.columns(300);
  const [city, setCity] = useState('');
  const home = dict.home;
  const countries = formatList(
    locale,
    LIVE_COUNTRIES.map(c => dict.countriesIn[c.name]),
  );
  const essentials = Object.values(home.essentials);
  const why = Object.values(home.why);
  const heading = isDark ? '#FFFFFF' : brand.night;

  return (
    <Screen padded={false} maxWidth={layout.width}>
      <View style={[styles.hero, { paddingTop: insets.top + 12 }]}>
        <HeroPhotos />
        <View
          style={[
            styles.heroInner,
            { paddingHorizontal: layout.side(layout.pageWidth) },
          ]}
        >
          <View style={styles.topBar}>
            <View style={styles.brand}>
              <HArabiaMark size={36} />
              <HArabiaWordmark size={22} light={isDark} />
            </View>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel={strings.settings}
              onPress={() => navigation.navigate('Settings')}
              hitSlop={8}
              style={[styles.settings, { backgroundColor: colors.surface }]}
            >
              <SettingsIcon color={colors.text} size={20} />
            </Pressable>
          </View>
          <AppText variant="title" color={heading} style={styles.heading}>
            {t(dict.hero.heading, { countries })}
          </AppText>
          <AppText variant="body" color={heading} style={styles.heroBody}>
            {dict.hero.body}
          </AppText>
          <Card style={styles.search}>
            <CityField value={city} onChange={setCity} />
            <Button
              label={dict.hotelSearch.search}
              onPress={() =>
                navigation.navigate('Hotels', city ? { city } : undefined)
              }
            />
          </Card>
          <View style={styles.heroButtons}>
            <Button
              style={styles.flex}
              variant="secondary"
              label={dict.hero.exploreTours}
              onPress={() => navigation.navigate('Tours')}
            />
          </View>
        </View>
      </View>

      <View style={{ paddingHorizontal: layout.side(layout.pageWidth) }}>
        <Section>
          <SectionHeader title={home.whyTitle} />
          <Grid columns={layout.columns(240, layout.pageWidth, 4)}>
            {why.map(item => (
              <View key={item.title} style={styles.item}>
                <Card style={styles.feature}>
                  <AppText variant="label" color={colors.heading}>
                    {item.title}
                  </AppText>
                  <AppText variant="caption" muted>
                    {item.body}
                  </AppText>
                </Card>
              </View>
            ))}
          </Grid>
        </Section>

        <Section>
          <SectionHeader
            title={home.seasonsTitle}
            body={home.seasonsBody}
            action={home.seeAll}
            onAction={() => navigation.navigate('Packages')}
          />
          <Grid columns={layout.columns(320)}>
            {packages.map(item => (
              <View key={item.slug} style={styles.item}>
                <PackageCard
                  item={item}
                  onPress={() =>
                    navigation.navigate('PackageDetail', { slug: item.slug })
                  }
                />
              </View>
            ))}
          </Grid>
        </Section>

        <Section>
          <EventCards
            onConcerts={() => navigation.navigate('Concerts')}
            onQatar={() => navigation.navigate('QatarEvents')}
          />
        </Section>

        <Section>
          <SectionHeader
            title={home.popularTours}
            body={home.toursBody}
            action={home.seeAll}
            onAction={() => navigation.navigate('Tours')}
          />
          <Grid columns={columns}>
            {tours.slice(0, columns > 1 ? columns * 2 : 4).map(tour => (
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

        <Section>
          <SectionHeader
            title={home.destinationsTitle}
            body={home.destinationsBody}
          />
          <Grid columns={columns}>
            {liveDestinations.map(d => (
              <View key={d.country} style={styles.item}>
                <DestinationCard
                  country={d.country}
                  tagline={d.tagline[locale]}
                  onPress={() =>
                    navigation.navigate('DestinationDetail', {
                      country: d.country,
                    })
                  }
                />
              </View>
            ))}
          </Grid>
        </Section>

        <Section>
          <SectionHeader title={home.essentialsTitle} body={home.essentialsBody} />
          <Grid columns={layout.columns(240, layout.pageWidth, 4)}>
            {essentials.map(item => (
              <View key={item.title} style={styles.item}>
                <Card style={styles.feature}>
                  <AppText variant="label" color={colors.heading}>
                    {item.title}
                  </AppText>
                  <AppText variant="caption" muted>
                    {item.body}
                  </AppText>
                </Card>
              </View>
            ))}
          </Grid>
        </Section>

        <Section>
          <Card onPress={() => navigation.navigate('Vip')}>
            <Gradient
              colors={[brand.nightSoft, brand.night, brand.nightDark]}
              style={styles.vip}
            >
              <AppText
                variant="caption"
                color={brand.goldLight}
                style={styles.eyebrow}
              >
                {home.vipEyebrow}
              </AppText>
              <AppText variant="heading" color="#FFFFFF">
                {home.vipTitle}
              </AppText>
              <AppText variant="caption" color="#FFFFFFCC">
                {home.vipBody}
              </AppText>
              <AppText variant="label" color={brand.goldLight} style={styles.vipCta}>
                {home.vipCta} →
              </AppText>
            </Gradient>
          </Card>
        </Section>

        <Section>
          <SectionHeader
            title={dict.blog.latest}
            action={home.seeAll}
            onAction={() => navigation.navigate('Blog')}
          />
          <Grid columns={columns}>
            {articles.slice(0, columns > 1 ? columns : 3).map(article => (
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
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  hero: { overflow: 'hidden', paddingBottom: 24 },
  heroInner: { gap: 12 },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  brand: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  settings: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: { marginTop: 18 },
  heroBody: { opacity: 0.9 },
  search: { padding: 14, marginTop: 6 },
  heroButtons: { flexDirection: 'row', gap: 10 },
  item: { marginBottom: 16 },
  feature: { padding: 14, gap: 4, minHeight: 100 },
  vip: { padding: 20, gap: 8 },
  eyebrow: { fontWeight: '700', textTransform: 'uppercase', letterSpacing: 1 },
  vipCta: { marginTop: 6 },
});
