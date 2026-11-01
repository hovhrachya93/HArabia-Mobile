import type { Locale } from './locales';
import { ar } from '../shared/i18n/dictionaries/ar';
import { en, type Dictionary } from '../shared/i18n/dictionaries/en';
import { hy } from '../shared/i18n/dictionaries/hy';
import { ru } from '../shared/i18n/dictionaries/ru';

export type { Dictionary };

const dictionaries: Record<Locale, Dictionary> = { hy, en, ru, ar };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}
