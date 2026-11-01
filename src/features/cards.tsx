import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import type { LiveHotel, QuoteHotel } from '../api/hotels';
import { imageUrl } from '../config';
import { useMoney } from '../context/CurrencyContext';
import { useSettings } from '../context/SettingsContext';
import { t } from '../i18n/format';
import type { Country } from '../shared/countries';
import type { TravelPackage } from '../shared/packages-data';
import type { Article, Concert, Tour } from '../shared/types';
import { brand } from '../theme/palette';
import { AppText } from '../ui/AppText';
import { CheckIcon, PinIcon } from '../ui/icons';
import { formatDate, formatHours } from '../util/format';
import {
  Badge,
  Card,
  Gradient,
  GRADIENTS,
  isLightGradient,
  LineIcon,
  SEASON_GRADIENTS,
  SEASON_ICONS,
  Stars,
} from './visual';

export const cityName = (
  cities: Record<string, string>,
  city: string,
): string => cities[city] ?? city;

export function tourDuration(
  hours: number,
  overnight: string,
  locale: Parameters<typeof formatHours>[0],
) {
  return hours >= 12 ? overnight : formatHours(locale, hours);
}

export function TourCard({
  tour,
  index,
  onPress,
}: {
  tour: Tour;
  index: number;
  onPress: () => void;
}) {
  const { dict, locale, colors } = useSettings();
  const { usd } = useMoney();
  const gradient = GRADIENTS[index % GRADIENTS.length];
  const light = isLightGradient(gradient);
  const type =
    tour.type === 'private'
      ? dict.tours.private
      : tour.type === 'ticket'
      ? dict.tours.ticket
      : dict.tours.group;

  return (
    <Card onPress={onPress} accessibilityLabel={tour.name[locale]}>
      <Gradient colors={gradient} style={styles.tourTop}>
        <Badge label={dict.tours.categories[tour.category]} />
        <AppText
          variant="subheading"
          color={light ? brand.nightDark : '#FFFFFF'}
          numberOfLines={2}
          style={styles.tourName}
        >
          {tour.name[locale]}
        </AppText>
      </Gradient>
      <View style={styles.body}>
        <View style={styles.row}>
          <PinIcon color={colors.textMuted} size={16} />
          <AppText variant="caption" muted>
            {cityName(dict.cities, tour.city)} ·{' '}
            {tourDuration(tour.durationHours, dict.tours.overnight, locale)} ·{' '}
            {type}
          </AppText>
        </View>
        <AppText variant="caption" numberOfLines={2} style={styles.text}>
          {tour.description[locale]}
        </AppText>
        <AppText variant="label" color={colors.heading} style={styles.price}>
          {t(dict.common.priceFrom, { price: usd(tour.priceFromUsd) })}{' '}
          <AppText variant="caption" muted>
            {dict.tours.perPerson}
          </AppText>
        </AppText>
      </View>
    </Card>
  );
}

export function PackageCard({
  item,
  onPress,
}: {
  item: TravelPackage;
  onPress: () => void;
}) {
  const { dict, locale } = useSettings();
  const { usd } = useMoney();

  return (
    <Card onPress={onPress} accessibilityLabel={item.title[locale]}>
      <Gradient
        colors={SEASON_GRADIENTS[item.season]}
        style={styles.packageCard}
      >
        <View style={styles.row}>
          <LineIcon
            path={SEASON_ICONS[item.season]}
            color={brand.goldLight}
            size={28}
          />
          <AppText variant="caption" color={brand.sandLight}>
            {item.when[locale]}
          </AppText>
        </View>
        <AppText
          variant="heading"
          color="#FFFFFF"
          style={styles.packageTitle}
        >
          {item.title[locale]}
        </AppText>
        <AppText variant="caption" color="#FFFFFFD9" numberOfLines={3}>
          {item.summary[locale]}
        </AppText>
        <View style={styles.packageFooter}>
          <AppText variant="caption" color={brand.sandLight}>
            {t(dict.packages.nights, { n: item.nights })} ·{' '}
            {item.flight.from} → {item.flight.to}
          </AppText>
          <AppText variant="subheading" color={brand.goldLight}>
            {t(dict.packages.from, { price: usd(item.priceFromUsd) })}
          </AppText>
        </View>
      </Gradient>
    </Card>
  );
}

export function ConcertCard({
  concert,
  onPress,
}: {
  concert: Concert;
  onPress: () => void;
}) {
  const { dict, locale, isDark, colors } = useSettings();
  const picture = concert.image && (isDark ? concert.image.night : concert.image.day);
  const date =
    concert.date.length === 7
      ? `${formatDate(locale, concert.date)} · ${dict.concerts.dateTba}`
      : formatDate(locale, concert.date);

  return (
    <Card onPress={onPress} accessibilityLabel={concert.artist}>
      {picture ? (
        <Image
          source={{ uri: imageUrl(picture) }}
          style={styles.wide}
          resizeMode="cover"
        />
      ) : (
        <Gradient colors={GRADIENTS[0]} style={styles.wide} />
      )}
      <View style={styles.body}>
        <Badge label={dict.concerts.genres[concert.genre]} />
        <AppText variant="subheading" style={styles.title}>
          {concert.artist}
        </AppText>
        <AppText variant="caption" muted>
          {date}
        </AppText>
        <View style={styles.row}>
          <PinIcon color={colors.textMuted} size={16} />
          <AppText variant="caption" muted>
            {concert.venue}, {cityName(dict.cities, concert.city)}
          </AppText>
        </View>
      </View>
    </Card>
  );
}

export function ArticleCard({
  article,
  onPress,
}: {
  article: Article;
  onPress: () => void;
}) {
  const { dict, locale, isDark } = useSettings();
  const cover = article.cover && (isDark ? article.cover.night : article.cover.day);

  return (
    <Card onPress={onPress} accessibilityLabel={article.title[locale]}>
      {cover ? (
        <Image
          source={{ uri: imageUrl(cover) }}
          style={styles.wide}
          resizeMode="cover"
        />
      ) : (
        <Gradient colors={GRADIENTS[2]} style={styles.wide} />
      )}
      <View style={styles.body}>
        <View style={styles.row}>
          <Badge
            label={dict.blog.kinds[article.kind]}
            tone={article.kind === 'news' ? 'gold' : 'muted'}
          />
          <AppText variant="caption" muted>
            {formatDate(locale, article.publishedAt)} ·{' '}
            {t(dict.blog.readTime, { n: article.readMinutes })}
          </AppText>
        </View>
        <AppText variant="subheading" style={styles.title}>
          {article.title[locale]}
        </AppText>
        <AppText variant="caption" muted numberOfLines={3}>
          {article.excerpt[locale]}
        </AppText>
      </View>
    </Card>
  );
}

export const COUNTRY_SLIDES: Record<Country, string> = {
  UAE: 'uae',
  Qatar: 'qatar',
  Oman: 'oman',
};

export function countryPhoto(country: Country, isDark: boolean) {
  const slug = COUNTRY_SLIDES[country];
  return imageUrl(`/images/slider/${slug}-${isDark ? 'night' : 'day'}.jpg`);
}

export function DestinationCard({
  country,
  tagline,
  onPress,
}: {
  country: Country;
  tagline: string;
  onPress: () => void;
}) {
  const { dict, isDark } = useSettings();
  return (
    <Card onPress={onPress} accessibilityLabel={dict.countries[country]}>
      <Image
        source={{ uri: countryPhoto(country, isDark) }}
        style={styles.wide}
        resizeMode="cover"
      />
      <View style={styles.body}>
        <AppText variant="subheading">{dict.countries[country]}</AppText>
        <AppText variant="caption" muted numberOfLines={2}>
          {tagline}
        </AppText>
      </View>
    </Card>
  );
}

export function LiveHotelCard({
  hotel,
  onPress,
}: {
  hotel: LiveHotel;
  onPress: () => void;
}) {
  const { dict, colors } = useSettings();
  const { supplier } = useMoney();
  const board = hotel.board && (dict.liveHotels.boards[hotel.board] ?? hotel.board);

  return (
    <Card onPress={onPress} accessibilityLabel={hotel.name}>
      <HotelPhoto uri={hotel.photo?.largeUrl ?? hotel.photo?.url} />
      <View style={styles.body}>
        {!!hotel.stars && <Stars count={hotel.stars} />}
        <AppText variant="subheading" style={styles.title} numberOfLines={2}>
          {hotel.name}
        </AppText>
        {!!(hotel.address ?? hotel.zone) && (
          <View style={styles.row}>
            <PinIcon color={colors.textMuted} size={16} />
            <AppText
              variant="caption"
              muted
              numberOfLines={1}
              style={styles.flex}
            >
              {hotel.address ?? hotel.zone}
            </AppText>
          </View>
        )}
        <View style={styles.tags}>
          {!!board && <Badge label={board} />}
          {hotel.refundable && (
            <View style={styles.row}>
              <CheckIcon color={colors.accent} size={14} />
              <AppText variant="caption" color={colors.accent}>
                {dict.liveHotels.freeCancellation}
              </AppText>
            </View>
          )}
        </View>
        <View style={styles.priceRow}>
          <AppText variant="heading" color={colors.heading}>
            {supplier(hotel.minPrice, hotel.currency)}
          </AppText>
          <AppText variant="label" color={colors.accent}>
            {dict.liveHotels.seeRooms}
          </AppText>
        </View>
      </View>
    </Card>
  );
}

export function QuoteHotelCard({
  hotel,
  selected,
  onToggle,
}: {
  hotel: QuoteHotel;
  selected: boolean;
  onToggle: () => void;
}) {
  const { dict, colors } = useSettings();
  return (
    <Card
      onPress={onToggle}
      accessibilityLabel={`${dict.hotelSearch.select}: ${hotel.name}`}
      style={selected && { borderColor: colors.accent, borderWidth: 2 }}
    >
      <HotelPhoto uri={hotel.photo?.largeUrl ?? hotel.photo?.url} />
      <View style={[styles.body, styles.quoteBody]}>
        <View style={styles.flex}>
          {!!hotel.stars && <Stars count={hotel.stars} />}
          <AppText variant="subheading" numberOfLines={2}>
            {hotel.name}
          </AppText>
        </View>
        <View
          style={[
            styles.check,
            {
              borderColor: selected ? colors.accent : colors.border,
              backgroundColor: selected ? colors.accent : 'transparent',
            },
          ]}
        >
          {selected && <CheckIcon color="#FFFFFF" size={16} />}
        </View>
      </View>
    </Card>
  );
}

export function HotelPhoto({ uri }: { uri?: string }) {
  const { colors } = useSettings();
  if (!uri) {
    return (
      <View style={[styles.wide, { backgroundColor: colors.surfaceMuted }]} />
    );
  }
  return (
    <Image
      source={{ uri }}
      style={[styles.wide, { backgroundColor: colors.surfaceMuted }]}
      resizeMode="cover"
    />
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  wide: { width: '100%', aspectRatio: 16 / 9 },
  body: { padding: 14, gap: 6 },
  row: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  text: { marginTop: 2 },
  title: { marginTop: 2 },
  price: { marginTop: 6 },
  tourTop: { padding: 14, minHeight: 120, justifyContent: 'space-between' },
  tourName: { marginTop: 18 },
  packageCard: { padding: 18, gap: 8, minHeight: 220 },
  packageTitle: { marginTop: 6 },
  packageFooter: {
    marginTop: 'auto',
    paddingTop: 10,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: 6,
  },
  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: 10,
    marginTop: 4,
  },
  priceRow: {
    marginTop: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  quoteBody: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  check: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
