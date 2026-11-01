import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { Appearance } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { defaultLocale, isLocale, type Locale } from '../i18n/locales';
import { APP_STRINGS, type AppStrings } from '../i18n/appStrings';
import { getDictionary, type Dictionary } from '../i18n/dictionary';
import { darkColors, lightColors, type Colors } from '../theme/palette';

export type ThemeMode = 'system' | 'light' | 'dark';

const LOCALE_KEY = 'settings.locale';
const THEME_KEY = 'settings.theme';

interface SettingsValue {
  locale: Locale;
  dict: Dictionary;
  strings: AppStrings;
  setLocale: (locale: Locale) => void;
  themeMode: ThemeMode;
  setThemeMode: (mode: ThemeMode) => void;
  isDark: boolean;
  rtl: boolean;
  colors: Colors;
  ready: boolean;
}

const SettingsContext = createContext<SettingsValue | null>(null);

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(defaultLocale);
  const [themeMode, setThemeModeState] = useState<ThemeMode>('system');
  const [systemScheme, setSystemScheme] = useState(Appearance.getColorScheme());
  const [ready, setReady] = useState(false);

  useEffect(() => {
    AsyncStorage.getMany([LOCALE_KEY, THEME_KEY])
      .then(stored => {
        const storedLocale = stored[LOCALE_KEY];
        const storedTheme = stored[THEME_KEY];
        if (storedLocale && isLocale(storedLocale))
          setLocaleState(storedLocale);
        if (
          storedTheme === 'light' ||
          storedTheme === 'dark' ||
          storedTheme === 'system'
        ) {
          setThemeModeState(storedTheme);
        }
      })
      .finally(() => setReady(true));
  }, []);

  useEffect(() => {
    const subscription = Appearance.addChangeListener(({ colorScheme }) =>
      setSystemScheme(colorScheme),
    );
    return () => subscription.remove();
  }, []);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    AsyncStorage.setItem(LOCALE_KEY, next).catch(() => {});
  }, []);

  const setThemeMode = useCallback((next: ThemeMode) => {
    setThemeModeState(next);
    AsyncStorage.setItem(THEME_KEY, next).catch(() => {});
  }, []);

  const isDark =
    themeMode === 'system' ? systemScheme === 'dark' : themeMode === 'dark';

  const value = useMemo<SettingsValue>(
    () => ({
      locale,
      dict: getDictionary(locale),
      strings: APP_STRINGS[locale],
      setLocale,
      themeMode,
      setThemeMode,
      isDark,
      rtl: locale === 'ar',
      colors: isDark ? darkColors : lightColors,
      ready,
    }),
    [locale, setLocale, themeMode, setThemeMode, isDark, ready],
  );

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings(): SettingsValue {
  const value = useContext(SettingsContext);
  if (!value)
    throw new Error('useSettings must be used inside SettingsProvider');
  return value;
}
