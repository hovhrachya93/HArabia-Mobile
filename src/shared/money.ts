import type { Country } from "./countries";
import type { Locale } from "./i18n/config";

// Dram per 1 unit of each currency (see lib/exchange-rate).
export interface Rates {
  USD: number;
  RUB: number;
  AED: number;
  QAR: number;
  OMR: number;
  EUR: number;
}

export type ForeignCurrency = keyof Rates;
export type Currency = "AMD" | ForeignCurrency;

// The currency prices are shown in for each language; the others appear on hover.
export const MAIN_CURRENCY: Record<Locale, Currency> = { hy: "AMD", ru: "RUB", en: "USD", ar: "USD" };

// The currency travellers spend on the spot, shown alongside dollars and roubles.
export const LOCAL_CURRENCY: Partial<Record<Country, ForeignCurrency>> = { UAE: "AED", Qatar: "QAR", Oman: "OMR" };

// Arabic keeps Western digits, as elsewhere on the site.
const intlLocale = (locale: Locale) => (locale === "ar" ? "ar-u-nu-latn" : locale);

// Dram rounded to the nearest 100: "from" prices shouldn't look falsely exact.
export function usdToAmd(usd: number, rates: Rates): number {
  return Math.round((usd * rates.USD) / 100) * 100;
}

export function amdTo(amd: number, currency: ForeignCurrency, rates: Rates): number {
  return amd / rates[currency];
}

export function formatAmd(locale: Locale, amd: number): string {
  return `${new Intl.NumberFormat(intlLocale(locale), { maximumFractionDigits: 0 }).format(amd)} ֏`;
}

// A dollar price in any currency: dollars as entered, dram via the bank's
// dollar rate (rounded to 100), the rest from that dram amount.
export function convertUsd(usd: number, currency: Currency, rates: Rates): number {
  if (currency === "USD") return usd;
  const amd = usdToAmd(usd, rates);
  return currency === "AMD" ? amd : amdTo(amd, currency, rates);
}

export function supplierToUsd(amount: number, currency: string, rates: Rates): number | null {
  if (currency === "USD") return amount;
  const perUnit = rates[currency as keyof Rates];
  return perUnit ? (amount * perUnit) / rates.USD : null;
}

export function formatMoney(locale: Locale, amount: number, currency: Currency): string {
  return currency === "AMD" ? formatAmd(locale, amount) : formatForeign(locale, amount, currency);
}

// "$65", "6 050 ₽", "AED 239" — roubles to the nearest 10, the rest whole.
export function formatForeign(locale: Locale, amount: number, currency: ForeignCurrency): string {
  const rounded = currency === "RUB" ? Math.round(amount / 10) * 10 : Math.round(amount);
  return new Intl.NumberFormat(intlLocale(locale), {
    style: "currency",
    currency,
    currencyDisplay: currency === "USD" || currency === "RUB" ? "narrowSymbol" : "code",
    maximumFractionDigits: 0,
  }).format(rounded);
}
