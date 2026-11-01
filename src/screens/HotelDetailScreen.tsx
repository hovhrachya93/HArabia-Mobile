import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ApiError } from '../api/client';
import {
  checkRate,
  fetchOffer,
  type HotelOffer,
  type LiveRate,
} from '../api/hotels';
import { useMoney } from '../context/CurrencyContext';
import { useSettings } from '../context/SettingsContext';
import { cityName } from '../features/cards';
import { draftOf, StayFields, type StayDraft } from '../features/StayFields';
import { Badge, Card, LineIcon, Notice, Stars } from '../features/visual';
import { t } from '../i18n/format';
import type { RootStackParamList, SummaryRow } from '../navigation/types';
import { citySlug } from '../shared/countries';
import { HOTEL_CITIES } from '../shared/hotel-cities';
import {
  facilitiesOf,
  HIGHLIGHTS,
  MAX_HIGHLIGHTS,
} from '../shared/hotel-facilities';
import { hotelTime } from '../shared/hotel-time';
import { hasChildAges, nightsBetween, type Stay } from '../shared/stay';
import { AppText } from '../ui/AppText';
import { Button } from '../ui/Button';
import { ChipRow } from '../ui/ChipRow';
import { CalendarIcon, GuestsIcon, PinIcon } from '../ui/icons';
import { ImageCarousel } from '../ui/ImageCarousel';
import { Screen, Section } from '../ui/Screen';
import { SheetModal } from '../ui/SheetModal';
import { Spinner } from '../ui/Spinner';
import { useLayout } from '../ui/useLayout';
import { formatRange } from '../util/format';
import { toStay } from './HotelsScreen';

type Props = NativeStackScreenProps<RootStackParamList, 'HotelDetail'>;

type State =
  | { status: 'loading' }
  | { status: 'error'; notFound: boolean }
  | { status: 'done'; offer: HotelOffer };

const MEAL_ICON =
  'M7 3v8m-3-8v5a3 3 0 0 0 6 0V3M7 11v10M17 21V3c-2.2 0-4 2.7-4 6v4h4';

function roomsOf(rates: LiveRate[]) {
  const byRoom = new Map<string, LiveRate[]>();
  for (const rate of rates)
    byRoom.set(rate.roomName, [...(byRoom.get(rate.roomName) ?? []), rate]);
  return [...byRoom]
    .map(([name, list]) => ({
      name,
      rates: [...list].sort((a, b) => a.netPrice - b.netPrice),
    }))
    .sort((a, b) => a.rates[0].netPrice - b.rates[0].netPrice);
}

function boardsOf(rates: LiveRate[]) {
  const cheapest = new Map<string, LiveRate>();
  for (const rate of rates) {
    const current = cheapest.get(rate.board);
    if (!current || rate.netPrice < current.netPrice)
      cheapest.set(rate.board, rate);
  }
  return [...cheapest.values()].sort((a, b) => a.netPrice - b.netPrice);
}

const titleCase = (text: string) =>
  text.toLowerCase().replace(/(^|\s)\S/g, c => c.toUpperCase());

export function HotelDetailScreen({ navigation, route }: Props) {
  const { id, city } = route.params;
  const { dict, locale, colors, strings } = useSettings();
  const { supplier } = useMoney();
  const layout = useLayout();
  const [stay, setStay] = useState<Stay>(route.params.stay);
  const [state, setState] = useState<State>({ status: 'loading' });
  const [board, setBoard] = useState<string>('');
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState<StayDraft>(draftOf(stay));
  const [checking, setChecking] = useState<string | null>(null);
  const [gone, setGone] = useState<string | null>(null);
  const [expanded, setExpanded] = useState(false);
  const labels = dict.liveHotels;
  const cityInfo = HOTEL_CITIES.find(c => citySlug(c.city) === city);

  const load = useCallback(() => {
    setState({ status: 'loading' });
    fetchOffer(id, city, stay, locale, '')
      .then(offer => {
        setState({ status: 'done', offer });
        setBoard('');
      })
      .catch(error =>
        setState({
          status: 'error',
          notFound: error instanceof ApiError && error.status === 404,
        }),
      );
  }, [id, city, stay, locale]);

  useEffect(load, [load]);

  const offer = state.status === 'done' ? state.offer : null;
  const boards = useMemo(() => (offer ? boardsOf(offer.rates) : []), [offer]);
  const activeBoard = board || boards[0]?.board || 'all';
  const rooms = useMemo(
    () =>
      offer
        ? roomsOf(
            activeBoard === 'all'
              ? offer.rates
              : offer.rates.filter(r => r.board === activeBoard),
          )
        : [],
    [offer, activeBoard],
  );

  const mealName = (rate: { board: string; boardName: string }) =>
    labels.boards[rate.board] ?? titleCase(rate.boardName);
  const nights = nightsBetween(stay.checkIn, stay.checkOut);
  const guests = t(strings.guestsSummary, {
    a: stay.adults,
    c: stay.children,
  });

  function applyStay() {
    const next = toStay(draft);
    if (!next || !hasChildAges(next)) return;
    setEditing(false);
    setStay(next);
  }

  async function choose(rate: LiveRate) {
    if (!offer) return;
    setChecking(rate.rateKey);
    setGone(null);
    try {
      const checked = await checkRate(rate.provider, rate.rateKey, '');
      if (!checked) {
        setGone(rate.rateKey);
        return;
      }
      const { rate: confirmed, currency } = checked;
      const total = supplier(confirmed.netPrice, currency);
      const ages = stay.childAges?.length
        ? `, ages ${stay.childAges.join(', ')}`
        : '';
      const description = `${offer.hotel.name} — ${confirmed.roomName}, ${confirmed.boardName}, ${total} (${offer.hotel.id}${ages})`;
      const rows: SummaryRow[] = [
        { label: dict.nav.hotels, value: offer.hotel.name },
        {
          label: strings.room,
          value: `${titleCase(confirmed.roomName)} · ${mealName({
            board: rate.board,
            boardName: confirmed.boardName,
          })}`,
        },
        {
          label: `${dict.hotelSearch.checkIn} – ${dict.hotelSearch.checkOut}`,
          value: `${formatRange(locale, stay.checkIn, stay.checkOut)} · ${t(
            dict.hotelSearch.nights,
            { n: nights },
          )}`,
        },
        { label: strings.guests, value: guests },
        { label: strings.total, value: total },
        ...confirmed.feesAtHotel.map(fee => ({
          label: labels.payAtHotel,
          value: t(labels.feeAtHotel, {
            amount: supplier(fee.amount, fee.currency),
          }),
        })),
        {
          label: labels.cancellation,
          value: [
            ...(confirmed.refundable ? [] : [labels.nonRefundable]),
            ...confirmed.cancellationPolicies.map(policy =>
              t(labels.cancellationFee, {
                amount: supplier(policy.amount, currency),
                date: hotelTime(policy.from),
              }),
            ),
          ].join('\n'),
        },
        ...(confirmed.comments
          ? [{ label: labels.hotelInfo, value: confirmed.comments }]
          : []),
      ];
      navigation.navigate('Request', {
        title: dict.request.title,
        target: {
          kind: 'hotel',
          hotelId: offer.hotel.id,
          hotelName: description,
        },
        stay,
        mode: 'fixed',
        summary: rows,
      });
    } catch {
      setGone(rate.rateKey);
    } finally {
      setChecking(null);
    }
  }

  if (state.status === 'loading') {
    return <Spinner label={labels.checking} fill />;
  }

  if (state.status === 'error' || !offer) {
    const notFound = state.status === 'error' && state.notFound;
    return (
      <Screen>
        <Notice text={notFound ? labels.notFound : labels.error} />
        <Button
          style={styles.retry}
          label={strings.tryAgain}
          onPress={load}
        />
        {cityInfo && (
          <Button
            style={styles.retry}
            variant="secondary"
            label={dict.hotelSearch.tabQuote}
            onPress={() =>
              navigation.navigate('Tabs', {
                screen: 'Hotels',
                params: { city, tab: 'quote' },
              })
            }
          />
        )}
      </Screen>
    );
  }

  const { hotel } = offer;
  const photos = hotel.photos.map(p => ({ uri: p.hdUrl ?? p.largeUrl }));
  const facilities = facilitiesOf(hotel.facilities);
  const highlights = HIGHLIGHTS.flatMap(key =>
    facilities.filter(f => f.key === key),
  ).slice(0, MAX_HIGHLIGHTS);
  const columns = layout.columns(320, layout.pageWidth, 3);

  return (
    <Screen maxWidth={layout.pageWidth}>
      {photos.length > 0 && (
        <ImageCarousel images={photos} height={layout.mediaHeight(240)} />
      )}

      <View style={styles.head}>
        {!!hotel.stars && <Stars count={hotel.stars} size={16} />}
        <AppText variant="title" color={colors.heading}>
          {hotel.name}
        </AppText>
        {!!(hotel.address ?? hotel.zone) && (
          <View style={styles.row}>
            <PinIcon color={colors.textMuted} size={18} />
            <AppText variant="caption" muted style={styles.flex}>
              {hotel.address ?? hotel.zone}
              {cityInfo ? `, ${cityName(dict.cities, cityInfo.city)}` : ''}
            </AppText>
          </View>
        )}
      </View>

      <Card style={styles.stay}>
        <View style={styles.stayBody}>
          <View style={styles.flex}>
            <View style={styles.row}>
              <CalendarIcon color={colors.accent} size={18} />
              <AppText variant="label">
                {formatRange(locale, stay.checkIn, stay.checkOut)}
              </AppText>
            </View>
            <View style={styles.row}>
              <GuestsIcon color={colors.accent} size={18} />
              <AppText variant="caption" muted>
                {t(dict.hotelSearch.nights, { n: nights })} · {guests}
              </AppText>
            </View>
          </View>
          <Pressable
            accessibilityRole="button"
            onPress={() => {
              setDraft(draftOf(stay));
              setEditing(true);
            }}
            hitSlop={8}
          >
            <AppText variant="label" color={colors.accent}>
              {strings.change}
            </AppText>
          </Pressable>
        </View>
      </Card>

      <Section>
        <AppText variant="heading" color={colors.heading}>
          {labels.rooms}
        </AppText>
        <AppText variant="caption" muted style={styles.prompt}>
          {labels.choosePrompt}
        </AppText>
        <ChipRow
          value={activeBoard}
          onChange={setBoard}
          options={[
            ...boards.map(rate => ({ value: rate.board, label: mealName(rate) })),
            { value: 'all', label: dict.common.all },
          ]}
        />
        <View style={styles.rooms}>
          {chunk(rooms, columns).map((row, i) => (
            <View key={i} style={styles.roomRow}>
              {row.map(room => (
                <Card key={room.name} style={styles.room}>
                  <AppText variant="subheading" color={colors.heading}>
                    {titleCase(room.name)}
                  </AppText>
                  {room.rates.map(rate => {
                    const firstFee = rate.cancellationPolicies[0];
                    return (
                      <View
                        key={rate.rateKey}
                        style={[styles.rate, { borderTopColor: colors.border }]}
                      >
                        <View style={styles.tags}>
                          <View style={styles.row}>
                            <LineIcon
                              path={MEAL_ICON}
                              color={colors.action}
                              size={14}
                            />
                            <AppText variant="caption">{mealName(rate)}</AppText>
                          </View>
                          <Badge
                            tone={rate.refundable ? 'accent' : 'muted'}
                            label={
                              rate.refundable
                                ? firstFee
                                  ? t(labels.freeCancellationUntil, {
                                      date: hotelTime(firstFee.from),
                                    })
                                  : labels.freeCancellation
                                : labels.nonRefundable
                            }
                          />
                          {rate.payAtHotel && <Badge label={labels.payAtHotel} />}
                        </View>
                        <View style={styles.priceRow}>
                          <AppText variant="heading" color={colors.heading}>
                            {supplier(rate.netPrice, offer.currency)}
                          </AppText>
                          <Button
                            label={
                              checking === rate.rateKey
                                ? labels.checking
                                : labels.select
                            }
                            loading={checking === rate.rateKey}
                            disabled={!!checking}
                            onPress={() => choose(rate)}
                            style={styles.select}
                          />
                        </View>
                        {gone === rate.rateKey && (
                          <AppText variant="caption" color={colors.danger}>
                            {labels.unavailable}
                          </AppText>
                        )}
                      </View>
                    );
                  })}
                </Card>
              ))}
            </View>
          ))}
        </View>
      </Section>

      {(!!hotel.description || highlights.length > 0) && (
        <Section>
          <AppText variant="heading" color={colors.heading}>
            {labels.about}
          </AppText>
          {highlights.length > 0 && (
            <View style={styles.chips}>
              {highlights.map(f => (
                <View
                  key={f.key}
                  style={[
                    styles.chip,
                    {
                      borderColor: colors.border,
                      backgroundColor: colors.surface,
                    },
                  ]}
                >
                  <LineIcon path={f.icon} color={colors.accent} size={16} />
                  <AppText variant="caption">{labels.facilities[f.key]}</AppText>
                </View>
              ))}
            </View>
          )}
          {!!hotel.description && (
            <Pressable onPress={() => setExpanded(e => !e)}>
              <AppText
                variant="body"
                numberOfLines={expanded ? undefined : 6}
                style={styles.description}
              >
                {hotel.description}
              </AppText>
            </Pressable>
          )}
        </Section>
      )}

      {facilities.length > 0 && (
        <Section>
          <AppText variant="heading" color={colors.heading}>
            {labels.facilitiesTitle}
          </AppText>
          <View style={styles.facilities}>
            {facilities.map(f => (
              <View
                key={f.key}
                style={[
                  styles.facility,
                  { width: layout.wide ? '33%' : layout.tablet ? '50%' : '100%' },
                ]}
              >
                <LineIcon path={f.icon} color={colors.accent} size={22} />
                <AppText variant="body" style={styles.flex}>
                  {labels.facilities[f.key]}
                  {f.paid && (
                    <AppText variant="caption" muted>
                      {` (${labels.facilityPaid})`}
                    </AppText>
                  )}
                </AppText>
              </View>
            ))}
          </View>
        </Section>
      )}

      <SheetModal visible={editing} onClose={() => setEditing(false)}>
        <StayFields value={draft} onChange={setDraft} />
        <Button label={labels.update} onPress={applyStay} />
      </SheetModal>
    </Screen>
  );
}

function chunk<T>(items: T[], size: number): T[][] {
  const rows: T[][] = [];
  for (let i = 0; i < items.length; i += size)
    rows.push(items.slice(i, i + size));
  return rows;
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  retry: { marginTop: 12 },
  head: { marginTop: 18, gap: 6 },
  row: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  stay: { marginTop: 18 },
  stayBody: {
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  prompt: { marginTop: 2, marginBottom: 12 },
  rooms: { marginTop: 14, gap: 14 },
  roomRow: { flexDirection: 'row', gap: 14 },
  room: { flex: 1, padding: 14 },
  rate: {
    borderTopWidth: StyleSheet.hairlineWidth,
    marginTop: 12,
    paddingTop: 12,
    gap: 10,
  },
  tags: { flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', gap: 8 },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  select: { minHeight: 42, paddingHorizontal: 18 },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 12 },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    borderWidth: 1,
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  description: { marginTop: 14 },
  facilities: { flexDirection: 'row', flexWrap: 'wrap', marginTop: 12 },
  facility: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 8,
    paddingEnd: 12,
  },
});
