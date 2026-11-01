import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { sendPriceRequest } from '../api/requests';
import { useSettings } from '../context/SettingsContext';
import { ContactFields } from '../features/ContactFields';
import { useContactForm } from '../features/useContactForm';
import { draftOf, StayFields, type StayDraft } from '../features/StayFields';
import { Card } from '../features/visual';
import { t } from '../i18n/format';
import type { RootStackParamList, SummaryRow } from '../navigation/types';
import { hasChildAges, nightsBetween, type Stay } from '../shared/stay';
import { AppText } from '../ui/AppText';
import { Button } from '../ui/Button';
import { FormCard } from '../ui/FormCard';
import { Screen } from '../ui/Screen';
import { formatDate, formatRange } from '../util/format';
import { toStay } from './HotelsScreen';

type Props = NativeStackScreenProps<RootStackParamList, 'Request'>;

export function Summary({ rows }: { rows: SummaryRow[] }) {
  const { colors } = useSettings();
  return (
    <Card style={styles.summary}>
      {rows.map((row, i) => (
        <View
          key={row.label + i}
          style={[
            styles.summaryRow,
            i > 0 && {
              borderTopColor: colors.border,
              borderTopWidth: StyleSheet.hairlineWidth,
            },
          ]}
        >
          <AppText variant="caption" muted>
            {row.label}
          </AppText>
          <AppText variant="body" style={styles.value}>
            {row.value}
          </AppText>
        </View>
      ))}
    </Card>
  );
}

export function RequestScreen({ navigation, route }: Props) {
  const { target, mode, summary = [] } = route.params;
  const { dict, locale, strings, colors } = useSettings();
  const form = useContactForm();
  const [draft, setDraft] = useState<StayDraft>(draftOf(route.params.stay));
  const [dateError, setDateError] = useState<string>();
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function stayOf(): Stay | null {
    if (mode === 'fixed') return route.params.stay;
    if (mode === 'day') {
      return draft.checkIn
        ? {
            checkIn: draft.checkIn,
            checkOut: '',
            adults: draft.adults,
            children: draft.children,
          }
        : null;
    }
    const stay = toStay(draft);
    return stay && hasChildAges(stay) ? stay : null;
  }

  async function submit() {
    const stay = stayOf();
    setDateError(stay ? undefined : dict.request.invalid);
    const valid = form.validate();
    if (!stay || !valid) return;
    setSending(true);
    setError(null);
    try {
      const { id } = await sendPriceRequest(
        target,
        stay,
        form.values,
        locale,
        dict.request.failed,
      );
      const dates =
        mode === 'day'
          ? formatDate(locale, stay.checkIn)
          : `${formatRange(locale, stay.checkIn, stay.checkOut)} · ${t(
              dict.hotelSearch.nights,
              { n: nightsBetween(stay.checkIn, stay.checkOut) },
            )}`;
      const rows: SummaryRow[] =
        mode === 'fixed'
          ? summary
          : [
              ...summary,
              {
                label: mode === 'day' ? dict.tourPage.date : dict.packages.when,
                value: dates,
              },
              {
                label: strings.guests,
                value: t(strings.guestsSummary, {
                  a: stay.adults,
                  c: stay.children,
                }),
              },
            ];
      navigation.replace('Confirmation', {
        id,
        title: dict.request.successTitle,
        rows: [...rows, { label: dict.request.name, value: form.values.guestName }],
      });
    } catch {
      setError(dict.request.failed);
    } finally {
      setSending(false);
    }
  }

  return (
    <Screen>
      {summary.length > 0 && <Summary rows={summary} />}
      <FormCard title={strings.yourRequest}>
        {mode !== 'fixed' && (
          <StayFields
            value={draft}
            onChange={setDraft}
            mode={mode}
            errors={{ checkIn: dateError }}
          />
        )}
        <ContactFields
          form={form}
          labels={{
            name: dict.request.name,
            email: dict.request.email,
            phone: dict.request.phone,
            message: dict.request.message,
          }}
        />
        {!!error && (
          <AppText variant="caption" color={colors.danger} style={styles.error}>
            {error}
          </AppText>
        )}
        <Button
          label={sending ? dict.request.sending : dict.request.submit}
          loading={sending}
          onPress={submit}
        />
        <AppText variant="caption" muted style={styles.note}>
          {dict.common.paymentNote}
        </AppText>
      </FormCard>
    </Screen>
  );
}

const styles = StyleSheet.create({
  summary: { paddingHorizontal: 14 },
  summaryRow: { paddingVertical: 10, gap: 2 },
  value: { fontWeight: '600' },
  error: { marginBottom: 12 },
  note: { marginTop: 12, textAlign: 'center' },
});
