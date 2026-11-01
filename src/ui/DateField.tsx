import React, { useState } from 'react';
import { Modal, Pressable, StyleSheet, View } from 'react-native';
import { useSettings } from '../context/SettingsContext';
import { addMonths, fromIso, toIso } from '../util/dates';
import {
  LABELS,
  WEEKDAYS_SHORT,
  formatFull,
  formatMonthYear,
  formatShort,
} from '../util/dateNames';
import { AppText } from './AppText';
import { CaretDownIcon } from './icons';
import { INPUT_HEIGHT, INPUT_RADIUS, inputFill } from './inputBox';
import { MODAL_ORIENTATIONS } from './sheet';

interface Props {
  label: string;
  value: string;
  onChange: (value: string) => void;
  min?: string;
  error?: string | null;
  renderField?: (open: () => void) => React.ReactNode;
}

export function DateField({
  label,
  value,
  onChange,
  min,
  error,
  renderField,
}: Props) {
  const { colors, locale, isDark } = useSettings();
  const labels = LABELS[locale];
  const [open, setOpen] = useState(false);
  const [view, setView] = useState(() => new Date());

  const todayIso = toIso(new Date());
  const minIso = min && min > todayIso ? min : todayIso;
  const minDate = fromIso(minIso) as Date;
  const selected = fromIso(value);

  function openPicker() {
    const anchor = selected && selected >= minDate ? selected : minDate;
    setView(new Date(anchor.getFullYear(), anchor.getMonth(), 1));
    setOpen(true);
  }

  function pick(iso: string) {
    onChange(iso);
    setOpen(false);
  }

  const monthStart = new Date(view.getFullYear(), view.getMonth(), 1);
  const leadingBlanks = (monthStart.getDay() + 6) % 7;
  const cells = Array.from(
    { length: 42 },
    (_, i) =>
      new Date(view.getFullYear(), view.getMonth(), 1 - leadingBlanks + i),
  );
  const canGoPrev = new Date(view.getFullYear(), view.getMonth(), 0) >= minDate;

  const field = renderField ? (
    renderField(openPicker)
  ) : (
    <>
      <AppText variant="label" muted>
        {label}
      </AppText>
      <Pressable
        accessibilityRole="button"
        onPress={openPicker}
        style={[
          styles.input,
          {
            backgroundColor: inputFill(colors, isDark),
            borderColor: error ? colors.danger : 'transparent',
          },
        ]}
      >
        <AppText color={selected ? colors.text : colors.textMuted}>
          {selected ? formatShort(selected, locale) : labels.select}
        </AppText>
        <CaretDownIcon color={colors.accent} />
      </Pressable>
      <AppText variant="caption" color={colors.danger} style={styles.error}>
        {error ?? ' '}
      </AppText>
    </>
  );

  return (
    <View style={renderField ? undefined : styles.wrap}>
      {field}

      <Modal
        visible={open}
        transparent
        animationType="fade"
        supportedOrientations={MODAL_ORIENTATIONS}
        onRequestClose={() => setOpen(false)}
      >
        <Pressable
          style={[styles.backdrop, { backgroundColor: colors.overlay }]}
          onPress={() => setOpen(false)}
        >
          <Pressable
            style={[styles.sheet, { backgroundColor: colors.surface }]}
            onPress={() => {}}
          >
            <View style={styles.header}>
              <Pressable
                accessibilityLabel={labels.prev}
                disabled={!canGoPrev}
                onPress={() => setView(addMonths(view, -1))}
                style={[styles.nav, { opacity: canGoPrev ? 1 : 0.3 }]}
              >
                <AppText variant="heading" color={colors.accent}>
                  ‹
                </AppText>
              </Pressable>
              <AppText variant="subheading">
                {formatMonthYear(view, locale)}
              </AppText>
              <Pressable
                accessibilityLabel={labels.next}
                onPress={() => setView(addMonths(view, 1))}
                style={styles.nav}
              >
                <AppText variant="heading" color={colors.accent}>
                  ›
                </AppText>
              </Pressable>
            </View>

            <View style={styles.weekRow}>
              {WEEKDAYS_SHORT[locale].map((weekday, i) => (
                <AppText key={i} variant="caption" muted style={styles.weekday}>
                  {weekday}
                </AppText>
              ))}
            </View>

            <View style={styles.grid}>
              {cells.map(date => {
                const iso = toIso(date);
                if (date.getMonth() !== view.getMonth())
                  return <View key={iso} style={styles.cell} />;
                const disabled = iso < minIso;
                const isSelected = iso === value;
                const isToday = iso === todayIso;
                return (
                  <Pressable
                    key={iso}
                    accessibilityLabel={formatFull(date, locale)}
                    accessibilityState={{ selected: isSelected, disabled }}
                    disabled={disabled}
                    onPress={() => pick(iso)}
                    style={styles.cell}
                  >
                    <View
                      style={[
                        styles.day,
                        isSelected && { backgroundColor: colors.accent },
                        !isSelected &&
                          isToday && {
                            borderWidth: 1,
                            borderColor: colors.accent,
                          },
                      ]}
                    >
                      <AppText
                        variant="body"
                        color={
                          isSelected
                            ? colors.background
                            : disabled
                            ? colors.border
                            : colors.text
                        }
                      >
                        {date.getDate()}
                      </AppText>
                    </View>
                  </Pressable>
                );
              })}
            </View>

            <View style={[styles.footer, { borderTopColor: colors.border }]}>
              <Pressable
                disabled={!value}
                onPress={() => pick('')}
                style={{ opacity: value ? 1 : 0.35 }}
              >
                <AppText variant="label" muted>
                  {labels.clear}
                </AppText>
              </Pressable>
              <Pressable onPress={() => pick(todayIso)}>
                <AppText variant="label" color={colors.accent}>
                  {labels.today}
                </AppText>
              </Pressable>
            </View>
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
}

const CELL = `${100 / 7}%` as const;

const styles = StyleSheet.create({
  wrap: { marginBottom: 2 },
  input: {
    marginTop: 6,
    borderWidth: 1.5,
    borderRadius: INPUT_RADIUS,
    minHeight: INPUT_HEIGHT,
    paddingHorizontal: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  error: { minHeight: 18, marginTop: 3 },
  backdrop: { flex: 1, justifyContent: 'center', padding: 24 },
  sheet: {
    width: '100%',
    maxWidth: 420,
    alignSelf: 'center',
    borderRadius: 20,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  nav: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  weekRow: { flexDirection: 'row', marginBottom: 4 },
  weekday: { width: CELL, textAlign: 'center' },
  grid: { flexDirection: 'row', flexWrap: 'wrap' },
  cell: {
    width: CELL,
    height: 42,
    alignItems: 'center',
    justifyContent: 'center',
  },
  day: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  footer: {
    marginTop: 8,
    paddingTop: 12,
    borderTopWidth: StyleSheet.hairlineWidth,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
