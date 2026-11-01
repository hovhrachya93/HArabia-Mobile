import React from 'react';
import { StyleSheet, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useMoney } from '../context/CurrencyContext';
import { useSettings } from '../context/SettingsContext';
import { cityName } from '../features/cards';
import {
  Gradient,
  LineIcon,
  Notice,
  SEASON_GRADIENTS,
  SEASON_ICONS,
  Stars,
} from '../features/visual';
import { t } from '../i18n/format';
import type { RootStackParamList } from '../navigation/types';
import { hotels } from '../shared/hotels-data';
import { getPackage } from '../shared/packages-data';
import { todayIso } from '../shared/stay';
import { brand } from '../theme/palette';
import { AppText } from '../ui/AppText';
import { Button } from '../ui/Button';
import { CheckIcon } from '../ui/icons';
import { Screen, Section } from '../ui/Screen';
import { useLayout } from '../ui/useLayout';
import { Summary } from './RequestScreen';

type Props = NativeStackScreenProps<RootStackParamList, 'PackageDetail'>;

export function PackageDetailScreen({ navigation, route }: Props) {
  const { dict, locale, colors } = useSettings();
  const { usd } = useMoney();
  const layout = useLayout();
  const item = getPackage(route.params.slug);
  if (!item) return null;

  const hotel = hotels.find(h => h.slug === item.hotelSlug);
  const ahead = item.checkIn >= todayIso();

  function request() {
    if (!item) return;
    navigation.navigate('Request', {
      title: dict.packages.requestTitle,
      target: { kind: 'package', packageSlug: item.slug },
      stay: {
        checkIn: ahead ? item.checkIn : '',
        checkOut: ahead ? item.checkOut : '',
        adults: 2,
        children: 0,
      },
      mode: 'stay',
      summary: [{ label: dict.nav.packages, value: item.title[locale] }],
    });
  }

  return (
    <Screen maxWidth={layout.pageWidth}>
      <Gradient colors={SEASON_GRADIENTS[item.season]} style={styles.hero}>
        <View style={styles.row}>
          <LineIcon
            path={SEASON_ICONS[item.season]}
            color={brand.goldLight}
            size={30}
          />
          <AppText variant="label" color={brand.goldLight}>
            {cityName(dict.cities, item.city)}, {dict.countries[item.country]}
          </AppText>
        </View>
        <AppText variant="title" color="#FFFFFF" style={styles.title}>
          {item.title[locale]}
        </AppText>
        <AppText variant="body" color="#FFFFFFCC">
          {item.summary[locale]}
        </AppText>
        <AppText variant="heading" color="#FFFFFF" style={styles.price}>
          {t(dict.packages.from, { price: usd(item.priceFromUsd) })}{' '}
          <AppText variant="caption" color="#FFFFFFB3">
            {dict.packages.perPerson}
          </AppText>
        </AppText>
      </Gradient>

      <View style={styles.block}>
        <Summary
          rows={[
            { label: dict.packages.when, value: item.when[locale] },
            { label: dict.packages.nightsLabel, value: String(item.nights) },
            {
              label: dict.packages.flight,
              value: `${item.flight.from} → ${item.flight.to} · ${t(
                dict.packages.baggage,
                { kg: item.flight.baggageKg },
              )}`,
            },
          ]}
        />
      </View>
      <Notice text={dict.packages.sampleNotice} />
      <Button style={styles.button} label={dict.packages.requestTitle} onPress={request} />

      <Section>
        <AppText variant="heading" color={colors.heading}>
          {dict.packages.includes}
        </AppText>
        <View style={styles.list}>
          {item.includes.map((line, i) => (
            <View key={i} style={styles.includes}>
              <CheckIcon color={colors.action} size={18} />
              <AppText variant="body" style={styles.flex}>
                {line[locale]}
              </AppText>
            </View>
          ))}
        </View>
      </Section>

      <Section>
        <AppText variant="heading" color={colors.heading}>
          {dict.packages.program}
        </AppText>
        <View style={[styles.program, { borderColor: colors.action }]}>
          {item.program.map((step, i) => (
            <View key={i} style={styles.step}>
              <View style={[styles.dot, { backgroundColor: colors.action }]} />
              <AppText variant="subheading">{step.title[locale]}</AppText>
              <AppText variant="body" muted>
                {step.body[locale]}
              </AppText>
            </View>
          ))}
        </View>
      </Section>

      {hotel && (
        <Section>
          <AppText variant="heading" color={colors.heading}>
            {dict.packages.hotel}
          </AppText>
          <View style={styles.hotel}>
            <Stars count={hotel.stars} />
            <AppText variant="subheading">{hotel.name}</AppText>
            <AppText variant="body" muted>
              {hotel.description[locale]}
            </AppText>
          </View>
        </Section>
      )}

      <Button style={styles.button} label={dict.packages.requestTitle} onPress={request} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  hero: { borderRadius: 22, padding: 20, gap: 6 },
  row: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  title: { marginTop: 12 },
  price: { marginTop: 14 },
  block: { marginVertical: 18 },
  button: { marginTop: 16 },
  list: { marginTop: 12, gap: 10 },
  includes: { flexDirection: 'row', gap: 10, alignItems: 'flex-start' },
  program: { marginTop: 14, borderStartWidth: 2, paddingStart: 18, gap: 18 },
  step: { gap: 4 },
  dot: {
    position: 'absolute',
    start: -25,
    top: 6,
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  hotel: { marginTop: 12, gap: 6 },
});
