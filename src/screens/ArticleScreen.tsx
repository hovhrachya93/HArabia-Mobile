import React from 'react';
import { Image, Linking, Pressable, StyleSheet, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { imageUrl } from '../config';
import { useSettings } from '../context/SettingsContext';
import { ArticleCard, cityName } from '../features/cards';
import { MarkedText } from '../features/MarkedText';
import { Badge, Card, SectionHeader } from '../features/visual';
import { t } from '../i18n/format';
import type { RootStackParamList } from '../navigation/types';
import { articles, getArticle } from '../shared/articles-data';
import { citySlug, isLive } from '../shared/countries';
import { HOTEL_CITIES } from '../shared/hotel-cities';
import { tours } from '../shared/tours-data';
import { AppText } from '../ui/AppText';
import { Button } from '../ui/Button';
import { ExternalIcon } from '../ui/icons';
import { Grid } from '../ui/Grid';
import { Screen, Section } from '../ui/Screen';
import { useLayout } from '../ui/useLayout';
import { formatDate } from '../util/format';

type Props = NativeStackScreenProps<RootStackParamList, 'Article'>;

export function ArticleScreen({ navigation, route }: Props) {
  const { dict, locale, colors, isDark } = useSettings();
  const layout = useLayout();
  const article = getArticle(route.params.slug);
  if (!article) return null;

  const main = article.sections.filter(s => !s.aside && !s.place);
  const asides = article.sections.filter(s => s.aside);
  const places = article.sections.filter(s => s.place);
  const related = articles.filter(a => a.slug !== article.slug).slice(0, 3);
  const place = article.city
    ? cityName(dict.cities, article.city)
    : article.country
    ? dict.countries[article.country]
    : null;
  const hotelCity = HOTEL_CITIES.find(c => c.city === article.city);
  const cover =
    article.cover && imageUrl(isDark ? article.cover.night : article.cover.day);

  return (
    <Screen maxWidth={layout.pageWidth}>
      <View style={styles.badges}>
        <Badge
          label={dict.blog.kinds[article.kind]}
          tone={article.kind === 'news' ? 'gold' : 'accent'}
        />
        {!!place && <Badge label={place} />}
      </View>
      <AppText variant="title" color={colors.heading} style={styles.title}>
        {article.title[locale]}
      </AppText>
      <AppText variant="caption" muted>
        {formatDate(locale, article.publishedAt)} ·{' '}
        {t(dict.blog.readTime, { n: article.readMinutes })}
      </AppText>
      <AppText variant="body" style={styles.excerpt}>
        {article.excerpt[locale]}
      </AppText>
      {!!cover && (
        <Image
          source={{ uri: cover }}
          style={styles.cover}
          resizeMode="cover"
          accessibilityLabel={article.cover?.alt[locale]}
        />
      )}

      {!!article.keyFacts?.length && (
        <Section>
          <AppText variant="label" muted style={styles.upper}>
            {dict.blog.atAGlance}
          </AppText>
          <View style={styles.facts}>
            {article.keyFacts.map((fact, i) => (
              <View
                key={i}
                style={[
                  styles.fact,
                  { borderColor: colors.action, backgroundColor: colors.surface },
                ]}
              >
                <AppText variant="subheading" color={colors.heading}>
                  {fact.value[locale]}
                </AppText>
                <AppText variant="caption" muted>
                  {fact.label[locale]}
                </AppText>
              </View>
            ))}
          </View>
        </Section>
      )}

      {main.map((section, i) => (
        <Section key={i}>
          <AppText variant="heading" color={colors.heading}>
            {section.heading[locale]}
          </AppText>
          <AppText variant="body" style={styles.paragraph}>
            <MarkedText text={section.body[locale]} />
          </AppText>
        </Section>
      ))}

      {asides.map((section, i) => (
        <Section key={`aside${i}`}>
          <View
            style={[
              styles.aside,
              { backgroundColor: colors.surfaceMuted, borderColor: colors.action },
            ]}
          >
            <AppText variant="subheading" color={colors.heading}>
              {section.heading[locale]}
            </AppText>
            <AppText variant="body" style={styles.paragraph}>
              <MarkedText text={section.body[locale]} />
            </AppText>
          </View>
        </Section>
      ))}

      {places.map((section, i) => {
        const info = section.place!;
        const tour = info.tour && tours.find(x => x.slug === info.tour);
        const picture =
          info.image &&
          imageUrl(isDark && info.image.night ? info.image.night : info.image.day);
        return (
          <Section key={`place${i}`}>
            <Card>
              {!!picture && (
                <Image
                  source={{ uri: picture }}
                  style={styles.placeImage}
                  resizeMode="cover"
                  accessibilityLabel={info.image?.alt[locale]}
                />
              )}
              <View style={styles.placeBody}>
                <View style={styles.placeHead}>
                  <View style={[styles.number, { backgroundColor: colors.action }]}>
                    <AppText variant="label" color={colors.actionText}>
                      {i + 1}
                    </AppText>
                  </View>
                  <View style={styles.flex}>
                    <AppText variant="subheading" color={colors.heading}>
                      {section.heading[locale]}
                    </AppText>
                    {!!info.area && (
                      <AppText variant="caption" muted>
                        {info.area[locale]}
                      </AppText>
                    )}
                  </View>
                </View>
                <AppText variant="body">
                  <MarkedText text={section.body[locale]} />
                </AppText>
                {!!tour && (
                  <Pressable
                    accessibilityRole="link"
                    onPress={() =>
                      navigation.navigate('TourDetail', { slug: tour.slug })
                    }
                  >
                    <AppText variant="label" color={colors.accent}>
                      {dict.blog.ourTour}: {tour.name[locale]} →
                    </AppText>
                  </Pressable>
                )}
              </View>
            </Card>
          </Section>
        );
      })}

      <Section>
        <Card style={styles.cta}>
          <AppText variant="subheading" color={colors.heading}>
            {dict.blog.ctaTitle}
          </AppText>
          <AppText variant="caption" muted>
            {dict.blog.ctaBody}
          </AppText>
          <View style={styles.ctaRow}>
            <Button
              style={styles.flex}
              label={dict.blog.ctaHotels}
              onPress={() =>
                navigation.navigate('Tabs', {
                  screen: 'Hotels',
                  params: hotelCity ? { city: citySlug(hotelCity.city) } : undefined,
                })
              }
            />
            <Button
              style={styles.flex}
              variant="secondary"
              label={dict.blog.ctaTours}
              onPress={() =>
                navigation.navigate('Tabs', {
                  screen: 'Tours',
                  params:
                    article.country && isLive(article.country)
                      ? { country: article.country }
                      : undefined,
                })
              }
            />
          </View>
        </Card>
      </Section>

      {!!article.sources?.length && (
        <Section>
          <AppText variant="label" muted style={styles.upper}>
            {dict.blog.sources}
          </AppText>
          {article.sources.map(source => (
            <Pressable
              key={source.url}
              accessibilityRole="link"
              onPress={() => Linking.openURL(source.url)}
              style={styles.source}
            >
              <AppText variant="caption" color={colors.accent} style={styles.flex}>
                {source.title}
              </AppText>
              <ExternalIcon color={colors.accent} size={14} />
            </Pressable>
          ))}
        </Section>
      )}

      <Section>
        <SectionHeader title={dict.blog.related} />
        <Grid columns={layout.columns(300)}>
          {related.map(other => (
            <View key={other.slug} style={styles.item}>
              <ArticleCard
                article={other}
                onPress={() => navigation.push('Article', { slug: other.slug })}
              />
            </View>
          ))}
        </Grid>
      </Section>
    </Screen>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  badges: { flexDirection: 'row', gap: 8 },
  title: { marginTop: 12, marginBottom: 6 },
  excerpt: { marginTop: 14, fontSize: 18, lineHeight: 27 },
  cover: {
    marginTop: 18,
    width: '100%',
    aspectRatio: 3 / 2,
    borderRadius: 18,
  },
  upper: { textTransform: 'uppercase', letterSpacing: 0.6 },
  facts: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginTop: 10 },
  fact: {
    flexGrow: 1,
    flexBasis: '45%',
    borderWidth: 1.5,
    borderStyle: 'dashed',
    borderRadius: 14,
    padding: 12,
    gap: 2,
  },
  paragraph: { marginTop: 10, lineHeight: 26 },
  aside: { borderRadius: 16, borderStartWidth: 4, padding: 16 },
  placeImage: { width: '100%', aspectRatio: 3 / 2 },
  placeBody: { padding: 16, gap: 10 },
  placeHead: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  number: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cta: { padding: 16, gap: 6 },
  ctaRow: { flexDirection: 'row', gap: 10, marginTop: 10 },
  source: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 6,
  },
  item: { marginBottom: 16 },
});
