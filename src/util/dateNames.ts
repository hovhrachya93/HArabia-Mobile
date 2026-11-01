import type { Locale } from '../i18n/locales';

export const LABELS: Record<
  Locale,
  { select: string; today: string; clear: string; prev: string; next: string }
> = {
  hy: {
    select: 'Ամսաթիվ',
    today: 'Այսօր',
    clear: 'Մաքրել',
    prev: 'Նախորդ ամիս',
    next: 'Հաջորդ ամիս',
  },
  en: {
    select: 'Select date',
    today: 'Today',
    clear: 'Clear',
    prev: 'Previous month',
    next: 'Next month',
  },
  ru: {
    select: 'Дата',
    today: 'Сегодня',
    clear: 'Очистить',
    prev: 'Предыдущий месяц',
    next: 'Следующий месяц',
  },
  ar: {
    select: 'اختر التاريخ',
    today: 'اليوم',
    clear: 'مسح',
    prev: 'الشهر السابق',
    next: 'الشهر التالي',
  },
};

export const MONTHS: Record<Locale, string[]> = {
  hy: [
    'հունվար',
    'փետրվար',
    'մարտ',
    'ապրիլ',
    'մայիս',
    'հունիս',
    'հուլիս',
    'օգոստոս',
    'սեպտեմբեր',
    'հոկտեմբեր',
    'նոյեմբեր',
    'դեկտեմբեր',
  ],
  en: [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ],
  ru: [
    'январь',
    'февраль',
    'март',
    'апрель',
    'май',
    'июнь',
    'июль',
    'август',
    'сентябрь',
    'октябрь',
    'ноябрь',
    'декабрь',
  ],
  ar: [
    'يناير',
    'فبراير',
    'مارس',
    'أبريل',
    'مايو',
    'يونيو',
    'يوليو',
    'أغسطس',
    'سبتمبر',
    'أكتوبر',
    'نوفمبر',
    'ديسمبر',
  ],
};

export const MONTHS_SHORT: Record<Locale, string[]> = {
  hy: [
    'հնվ',
    'փտվ',
    'մրտ',
    'ապր',
    'մյս',
    'հնս',
    'հլս',
    'օգս',
    'սեպ',
    'հոկ',
    'նոյ',
    'դեկ',
  ],
  en: [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ],
  ru: [
    'янв.',
    'февр.',
    'мар.',
    'апр.',
    'мая',
    'июн.',
    'июл.',
    'авг.',
    'сент.',
    'окт.',
    'нояб.',
    'дек.',
  ],
  ar: [
    'يناير',
    'فبراير',
    'مارس',
    'أبريل',
    'مايو',
    'يونيو',
    'يوليو',
    'أغسطس',
    'سبتمبر',
    'أكتوبر',
    'نوفمبر',
    'ديسمبر',
  ],
};

export const WEEKDAYS_SHORT: Record<Locale, string[]> = {
  hy: ['երկ', 'երք', 'չրք', 'հնգ', 'ուր', 'շբթ', 'կիր'],
  en: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  ru: ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс'],
  ar: ['إثن', 'ثلا', 'أرب', 'خمي', 'جمع', 'سبت', 'أحد'],
};

export const WEEKDAYS_FULL: Record<Locale, string[]> = {
  hy: [
    'երկուշաբթի',
    'երեքշաբթի',
    'չորեքշաբթի',
    'հինգշաբթի',
    'ուրբաթ',
    'շաբաթ',
    'կիրակի',
  ],
  en: [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ],
  ru: [
    'понедельник',
    'вторник',
    'среда',
    'четверг',
    'пятница',
    'суббота',
    'воскресенье',
  ],
  ar: [
    'الإثنين',
    'الثلاثاء',
    'الأربعاء',
    'الخميس',
    'الجمعة',
    'السبت',
    'الأحد',
  ],
};

export function formatShort(date: Date, locale: Locale): string {
  return `${date.getDate()} ${
    MONTHS_SHORT[locale][date.getMonth()]
  } ${date.getFullYear()}`;
}

export function formatDayMonth(date: Date, locale: Locale): string {
  return `${date.getDate()} ${MONTHS_SHORT[locale][date.getMonth()]}`;
}

export function formatFull(date: Date, locale: Locale): string {
  return `${WEEKDAYS_FULL[locale][(date.getDay() + 6) % 7]}, ${formatShort(
    date,
    locale,
  )}`;
}

export function formatMonthYear(date: Date, locale: Locale): string {
  return `${MONTHS[locale][date.getMonth()]} ${date.getFullYear()}`;
}
