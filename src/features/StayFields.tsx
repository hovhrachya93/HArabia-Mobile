import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { useSettings } from '../context/SettingsContext';
import { citySlug } from '../shared/countries';
import { HOTEL_CITIES } from '../shared/hotel-cities';
import { MAX_GUESTS, MAX_NIGHTS, nightsBetween, todayIso } from '../shared/stay';
import { AppText } from '../ui/AppText';
import { DateField } from '../ui/DateField';
import { CaretDownIcon, PinIcon } from '../ui/icons';
import { inputFill, INPUT_HEIGHT, INPUT_RADIUS } from '../ui/inputBox';
import { SelectSheet } from '../ui/SelectSheet';
import { Stepper } from '../ui/Stepper';
import { useLayout } from '../ui/useLayout';
import { addDaysIso, moveCheckOut } from '../util/dates';
import { ChildAges, fitChildAges } from './ChildAges';
import { cityName } from './cards';

export interface StayDraft {
  checkIn: string;
  checkOut: string;
  adults: number;
  children: number;
  childAges: number[];
}

export const emptyStay = (): StayDraft => ({
  checkIn: '',
  checkOut: '',
  adults: 2,
  children: 0,
  childAges: [],
});

export function draftOf(stay?: {
  checkIn: string;
  checkOut: string;
  adults: number;
  children: number;
  childAges?: number[];
}): StayDraft {
  if (!stay) return emptyStay();
  return {
    ...stay,
    childAges: fitChildAges(stay.childAges ?? [], stay.children),
  };
}

export function CityField({
  value,
  onChange,
}: {
  value: string;
  onChange: (slug: string) => void;
}) {
  const { dict, colors, isDark } = useSettings();
  const options = HOTEL_CITIES.map(c => ({
    value: citySlug(c.city),
    label: `${cityName(dict.cities, c.city)}, ${dict.countries[c.country]}`,
  }));
  const selected = options.find(o => o.value === value);

  return (
    <SelectSheet
      label={dict.hotelSearch.destination}
      value={value}
      options={options}
      onChange={onChange}
      renderField={open => (
        <View style={styles.wrap}>
          <AppText variant="label" muted>
            {dict.hotelSearch.destination}
          </AppText>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={`${dict.hotelSearch.destination}: ${
              selected?.label ?? dict.hotelSearch.destinationPlaceholder
            }`}
            onPress={open}
            style={({ pressed }) => [
              styles.field,
              {
                backgroundColor: inputFill(colors, isDark),
                opacity: pressed ? 0.7 : 1,
              },
            ]}
          >
            <PinIcon color={colors.accent} />
            <AppText
              variant="body"
              muted={!selected}
              style={styles.flex}
              numberOfLines={1}
            >
              {selected?.label ?? dict.hotelSearch.destinationPlaceholder}
            </AppText>
            <CaretDownIcon color={colors.accent} />
          </Pressable>
        </View>
      )}
    />
  );
}

export function StayFields({
  value,
  onChange,
  mode = 'stay',
  errors,
}: {
  value: StayDraft;
  onChange: (next: StayDraft) => void;
  mode?: 'stay' | 'day' | 'fixed';
  errors?: { checkIn?: string; checkOut?: string };
}) {
  const { dict } = useSettings();
  const { wide } = useLayout();
  const today = todayIso();

  function setCheckIn(checkIn: string) {
    const checkOut =
      mode === 'day'
        ? ''
        : value.checkOut && value.checkIn
        ? moveCheckOut(value.checkIn, value.checkOut, checkIn)
        : value.checkOut && value.checkOut > checkIn
        ? value.checkOut
        : addDaysIso(checkIn, 1);
    onChange({ ...value, checkIn, checkOut });
  }

  function setCheckOut(checkOut: string) {
    const nights = nightsBetween(value.checkIn, checkOut);
    onChange({
      ...value,
      checkOut:
        nights > MAX_NIGHTS ? addDaysIso(value.checkIn, MAX_NIGHTS) : checkOut,
    });
  }

  function setChildren(children: number) {
    onChange({
      ...value,
      children,
      childAges: fitChildAges(value.childAges, children),
    });
  }

  return (
    <View>
      {mode !== 'fixed' && (
        <View style={wide && styles.pair}>
          <View style={wide && styles.flex}>
            <DateField
              label={mode === 'day' ? dict.tourPage.date : dict.hotelSearch.checkIn}
              value={value.checkIn}
              onChange={setCheckIn}
              min={today}
              error={errors?.checkIn}
            />
          </View>
          {mode === 'stay' && (
            <View style={wide && styles.flex}>
              <DateField
                label={dict.hotelSearch.checkOut}
                value={value.checkOut}
                onChange={setCheckOut}
                min={addDaysIso(value.checkIn || today, 1)}
                error={errors?.checkOut}
              />
            </View>
          )}
        </View>
      )}
      <View style={styles.pair}>
        <View style={styles.flex}>
          <Stepper
            label={dict.hotelSearch.adults}
            value={value.adults}
            onChange={adults => onChange({ ...value, adults })}
            min={1}
            max={MAX_GUESTS}
          />
        </View>
        <View style={styles.flex}>
          <Stepper
            label={dict.hotelSearch.children}
            value={value.children}
            onChange={setChildren}
            min={0}
            max={MAX_GUESTS}
          />
        </View>
      </View>
      {mode === 'stay' && (
        <ChildAges
          ages={value.childAges}
          onChange={childAges => onChange({ ...value, childAges })}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  pair: { flexDirection: 'row', gap: 12 },
  wrap: { marginBottom: 16 },
  field: {
    marginTop: 6,
    height: INPUT_HEIGHT,
    borderRadius: INPUT_RADIUS,
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
});
