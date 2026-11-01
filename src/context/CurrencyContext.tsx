import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getJson } from '../api/client';
import type { Locale } from '../i18n/locales';
import {
  convertUsd,
  MAIN_CURRENCY,
  supplierToUsd,
  type Currency,
  type Rates,
} from '../shared/money';
import { useSettings } from './SettingsContext';

export const CURRENCIES = ['AMD', 'USD', 'RUB', 'EUR'] as const;
export type ShownCurrency = (typeof CURRENCIES)[number];

const CURRENCY_KEY = 'settings.currency';

const isCurrency = (value: unknown): value is ShownCurrency =>
  typeof value === 'string' &&
  (CURRENCIES as readonly string[]).includes(value);

const SEPARATOR: Record<Locale, string> = {
  hy: ' ',
  ru: ' ',
  en: ',',
  ar: ',',
};

export function groupDigits(amount: number, locale: Locale): string {
  return String(Math.round(amount)).replace(
    /\B(?=(\d{3})+(?!\d))/g,
    SEPARATOR[locale],
  );
}

export function formatCurrency(
  locale: Locale,
  amount: number,
  currency: Currency | string,
): string {
  if (currency === 'AMD') return `${groupDigits(amount, locale)} ֏`;
  if (currency === 'USD') return `$${groupDigits(amount, locale)}`;
  if (currency === 'EUR') return `€${groupDigits(amount, locale)}`;
  if (currency === 'RUB')
    return `${groupDigits(Math.round(amount / 10) * 10, locale)} ₽`;
  return `${currency} ${groupDigits(amount, locale)}`;
}

interface CurrencyValue {
  currency: ShownCurrency;
  setCurrency: (currency: ShownCurrency) => void;
  rates: Rates | null;
}

const CurrencyContext = createContext<CurrencyValue | null>(null);

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const { locale } = useSettings();
  const [chosen, setChosen] = useState<ShownCurrency | null>(null);
  const [rates, setRates] = useState<Rates | null>(null);

  useEffect(() => {
    AsyncStorage.getItem(CURRENCY_KEY)
      .then(value => {
        if (isCurrency(value)) setChosen(value);
      })
      .catch(() => {});
    getJson<{ rates: Rates | null }>('/api/exchange-rates', '')
      .then(res => setRates(res.rates))
      .catch(() => {});
  }, []);

  function setCurrency(next: ShownCurrency) {
    setChosen(next);
    AsyncStorage.setItem(CURRENCY_KEY, next).catch(() => {});
  }

  const fallback = MAIN_CURRENCY[locale];
  const currency = chosen ?? (isCurrency(fallback) ? fallback : 'USD');

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, rates }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useMoney() {
  const state = useContext(CurrencyContext);
  const { locale } = useSettings();
  if (!state)
    throw new Error('useMoney must be used inside a CurrencyProvider');
  const { currency, rates } = state;

  const usd = (amount: number) =>
    rates
      ? formatCurrency(locale, convertUsd(amount, currency, rates), currency)
      : formatCurrency(locale, amount, 'USD');

  return {
    ...state,
    usd,
    supplier: (amount: number, from: string) => {
      const inUsd = rates ? supplierToUsd(amount, from, rates) : null;
      return inUsd === null
        ? formatCurrency(locale, amount, from)
        : usd(inUsd);
    },
  };
}
