import type { Locale } from '../i18n/locales';
import { MONTHS } from './dateNames';

const AND: Record<Locale, string> = {
  hy: ' և ',
  en: ' and ',
  ru: ' и ',
  ar: ' و',
};

export function formatList(locale: Locale, items: string[]): string {
  if (items.length < 2) return items.join('');
  return `${items.slice(0, -1).join(', ')}${AND[locale]}${
    items[items.length - 1]
  }`;
}

const GENITIVE: Partial<Record<Locale, string[]>> = {
  hy: [
    'հունվարի',
    'փետրվարի',
    'մարտի',
    'ապրիլի',
    'մայիսի',
    'հունիսի',
    'հուլիսի',
    'օգոստոսի',
    'սեպտեմբերի',
    'հոկտեմբերի',
    'նոյեմբերի',
    'դեկտեմբերի',
  ],
  ru: [
    'января',
    'февраля',
    'марта',
    'апреля',
    'мая',
    'июня',
    'июля',
    'августа',
    'сентября',
    'октября',
    'ноября',
    'декабря',
  ],
};

const capital = (text: string) => text.charAt(0).toUpperCase() + text.slice(1);

export function formatDate(locale: Locale, iso: string): string {
  const [y, m, d] = iso.split('-').map(Number);
  if (!y || !m) return iso;
  const month = MONTHS[locale][m - 1];
  if (!d) return `${capital(month)} ${y}`;
  const dayMonth = GENITIVE[locale]?.[m - 1] ?? month;
  return `${d} ${locale === 'en' ? capital(dayMonth) : dayMonth} ${y}`;
}

export function formatRange(locale: Locale, from: string, to: string) {
  return `${formatDate(locale, from)} – ${formatDate(locale, to)}`;
}

export function formatHours(locale: Locale, n: number): string {
  if (locale === 'hy') return `${n} ժամ`;
  if (locale === 'en') return `${n} ${n === 1 ? 'hour' : 'hours'}`;
  if (locale === 'ru') {
    const last = n % 10;
    const lastTwo = n % 100;
    const word =
      last === 1 && lastTwo !== 11
        ? 'час'
        : last >= 2 && last <= 4 && (lastTwo < 12 || lastTwo > 14)
        ? 'часа'
        : 'часов';
    return `${n} ${word}`;
  }
  if (n === 1) return 'ساعة واحدة';
  if (n === 2) return 'ساعتان';
  return `${n} ${n <= 10 ? 'ساعات' : 'ساعة'}`;
}
