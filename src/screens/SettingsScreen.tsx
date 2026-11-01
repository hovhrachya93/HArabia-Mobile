import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import {
  CURRENCIES,
  useMoney,
  type ShownCurrency,
} from '../context/CurrencyContext';
import { useSettings, type ThemeMode } from '../context/SettingsContext';
import { LOCALE_LABEL, locales } from '../i18n/locales';
import { AppText } from '../ui/AppText';
import { Screen } from '../ui/Screen';

const CURRENCY_SYMBOL: Record<ShownCurrency, string> = {
  AMD: '֏',
  USD: '$',
  RUB: '₽',
  EUR: '€',
};

const PREVIEW = {
  light: { page: '#FFFCF6', bar: '#EAD9BA', accent: '#147C72' },
  dark: { page: '#0B131A', bar: '#344A58', accent: '#38A89C' },
};

function Radio({ on }: { on: boolean }) {
  const { colors } = useSettings();
  return (
    <View
      style={[
        styles.radio,
        on
          ? { backgroundColor: colors.accent, borderColor: colors.accent }
          : { borderColor: colors.border, backgroundColor: colors.surface },
      ]}
    >
      {on && <View style={styles.radioDot} />}
    </View>
  );
}

function ThemePreview({ mode }: { mode: ThemeMode }) {
  const halves =
    mode === 'system'
      ? [PREVIEW.light, PREVIEW.dark]
      : [mode === 'dark' ? PREVIEW.dark : PREVIEW.light];
  return (
    <View style={styles.preview}>
      {halves.map((p, i) => (
        <View key={i} style={[styles.previewHalf, { backgroundColor: p.page }]}>
          <View style={[styles.previewBar, { backgroundColor: p.bar }]} />
          <View
            style={[
              styles.previewBar,
              styles.previewBarShort,
              { backgroundColor: p.bar },
            ]}
          />
          <View style={[styles.previewPill, { backgroundColor: p.accent }]} />
        </View>
      ))}
    </View>
  );
}

export function SettingsScreen() {
  const { colors, isDark, locale, setLocale, themeMode, setThemeMode, strings } =
    useSettings();
  const { currency, setCurrency } = useMoney();
  const page = isDark ? colors.background : '#FBF4E6';
  const badge = isDark ? 'rgba(56,168,156,0.16)' : 'rgba(20,124,114,0.08)';

  function tile(
    key: string,
    active: boolean,
    onPress: () => void,
    picture: React.ReactNode,
    label: string,
  ) {
    return (
      <Pressable
        key={key}
        accessibilityRole="radio"
        accessibilityState={{ selected: active }}
        accessibilityLabel={label}
        onPress={onPress}
        style={({ pressed }) => [
          styles.tile,
          {
            backgroundColor: colors.surface,
            borderColor: active ? colors.accent : 'transparent',
          },
          pressed && styles.pressed,
        ]}
      >
        <View>
          {picture}
          <View style={styles.tileRadio}>
            <Radio on={active} />
          </View>
        </View>
        <AppText
          variant="label"
          numberOfLines={1}
          adjustsFontSizeToFit
          minimumFontScale={0.75}
          style={styles.tileLabel}
        >
          {label}
        </AppText>
      </Pressable>
    );
  }

  function list(
    rows: {
      key: string;
      active: boolean;
      onPress: () => void;
      badge: string;
      name: string;
      note?: string;
    }[],
  ) {
    return (
      <View
        accessibilityRole="radiogroup"
        style={[styles.card, { backgroundColor: colors.surface }]}
      >
        {rows.map((r, i) => (
          <Pressable
            key={r.key}
            accessibilityRole="radio"
            accessibilityState={{ selected: r.active }}
            onPress={r.onPress}
            style={({ pressed }) => [
              styles.row,
              pressed && { backgroundColor: colors.surfaceMuted },
            ]}
          >
            <View
              style={[
                styles.code,
                { backgroundColor: r.active ? colors.accent : badge },
              ]}
            >
              <AppText
                variant="caption"
                color={r.active ? '#FFFFFF' : colors.accent}
                style={styles.codeText}
              >
                {r.badge}
              </AppText>
            </View>
            <View
              style={[
                styles.rowBody,
                i > 0 && [styles.divider, { borderTopColor: colors.border }],
              ]}
            >
              <AppText variant="body" style={styles.flex} numberOfLines={1}>
                <AppText variant="body" style={styles.native}>
                  {r.name}
                </AppText>
                {r.note && (
                  <AppText variant="body" muted>
                    {`  (${r.note})`}
                  </AppText>
                )}
              </AppText>
              <Radio on={r.active} />
            </View>
          </Pressable>
        ))}
      </View>
    );
  }

  return (
    <Screen background={page}>
      <AppText variant="label" muted style={styles.groupTitle}>
        {strings.language}
      </AppText>
      {list(
        locales.map(l => ({
          key: l,
          active: l === locale,
          onPress: () => setLocale(l),
          badge: l.toUpperCase(),
          name: LOCALE_LABEL[l],
        })),
      )}

      <AppText variant="label" muted style={styles.groupTitle}>
        {strings.theme}
      </AppText>
      <View style={styles.tiles} accessibilityRole="radiogroup">
        {(['system', 'light', 'dark'] as ThemeMode[]).map(mode =>
          tile(
            mode,
            themeMode === mode,
            () => setThemeMode(mode),
            <ThemePreview mode={mode} />,
            strings[mode],
          ),
        )}
      </View>

      <AppText variant="label" muted style={styles.groupTitle}>
        {strings.currency}
      </AppText>
      {list(
        CURRENCIES.map(code => ({
          key: code,
          active: currency === code,
          onPress: () => setCurrency(code),
          badge: CURRENCY_SYMBOL[code],
          name: code,
          note: strings.currencyNames[code],
        })),
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  pressed: { opacity: 0.85, transform: [{ scale: 0.98 }] },
  groupTitle: {
    marginTop: 22,
    marginBottom: 8,
    marginLeft: 4,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  card: { borderRadius: 18, overflow: 'hidden' },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 14,
    gap: 12,
  },
  code: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  codeText: { fontWeight: '800', letterSpacing: 0.5 },
  rowBody: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 16,
    paddingRight: 14,
  },
  divider: { borderTopWidth: StyleSheet.hairlineWidth },
  native: { fontWeight: '600' },
  radio: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#fff' },
  tiles: { flexDirection: 'row', gap: 10 },
  tile: {
    flex: 1,
    borderRadius: 18,
    borderWidth: 2,
    padding: 8,
    gap: 10,
  },
  tileRadio: { position: 'absolute', top: 6, right: 6 },
  tileLabel: { fontWeight: '600', textAlign: 'center', paddingBottom: 2 },
  preview: {
    flexDirection: 'row',
    height: 64,
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(0,0,0,0.12)',
  },
  previewHalf: { flex: 1, padding: 8, gap: 5 },
  previewBar: { height: 6, borderRadius: 3, width: '80%' },
  previewBarShort: { width: '50%' },
  previewPill: {
    marginTop: 'auto',
    height: 10,
    width: 26,
    borderRadius: 5,
  },
});
