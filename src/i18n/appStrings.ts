import type { Locale } from './locales';

export interface AppStrings {
  home: string;
  settings: string;
  share: string;
  language: string;
  theme: string;
  system: string;
  light: string;
  dark: string;
  currency: string;
  currencyNames: Record<'AMD' | 'USD' | 'RUB' | 'EUR', string>;
  more: string;
  contactUs: string;
  call: string;
  whatsapp: string;
  website: string;
  openWebsite: string;
  follow: string;
  tryAgain: string;
  loadError: string;
  done: string;
  change: string;
  city: string;
  guests: string;
  guestsSummary: string;
  contactVia: string;
  channels: Record<'whatsapp' | 'viber' | 'telegram' | 'phone', string>;
  fieldRequired: string;
  emailInvalid: string;
  phoneInvalid: string;
  requestNumber: string;
  backHome: string;
  yourRequest: string;
  room: string;
  total: string;
  selected: string;
  details: string;
}

export const APP_STRINGS: Record<Locale, AppStrings> = {
  hy: {
    home: 'Գլխավոր',
    settings: 'Կարգավորումներ',
    share: 'Կիսվել',
    language: 'Լեզու',
    theme: 'Թեմա',
    system: 'Համակարգային',
    light: 'Լուսավոր',
    dark: 'Մուգ',
    currency: 'Արժույթ',
    currencyNames: {
      AMD: 'Դրամ (֏)',
      USD: 'Դոլար ($)',
      RUB: 'Ռուբլի (₽)',
      EUR: 'Եվրո (€)',
    },
    more: 'Ավելին',
    contactUs: 'Կապ մեզ հետ',
    call: 'Զանգահարել',
    whatsapp: 'Գրել WhatsApp-ով',
    website: 'Կայք',
    openWebsite: 'Բացել կայքում',
    follow: 'Հետևեք մեզ',
    tryAgain: 'Կրկին փորձել',
    loadError: 'Չհաջողվեց բեռնել։ Ստուգեք կապը և կրկին փորձեք։',
    done: 'Պատրաստ է',
    change: 'Փոխել',
    city: 'Քաղաք',
    guests: 'Հյուրեր',
    guestsSummary: 'Մեծահասակներ՝ {a} · Երեխաներ՝ {c}',
    contactVia: 'Ինչպե՞ս կապվենք ձեզ հետ',
    channels: {
      whatsapp: 'WhatsApp',
      viber: 'Viber',
      telegram: 'Telegram',
      phone: 'Զանգ',
    },
    fieldRequired: 'Պարտադիր դաշտ',
    emailInvalid: 'Մուտքագրեք ճիշտ էլ. հասցե',
    phoneInvalid: 'Մուտքագրեք ճիշտ հեռախոսահամար՝ երկրի կոդով',
    requestNumber: 'Հայտի համար',
    backHome: 'Վերադառնալ գլխավոր',
    yourRequest: 'Ձեր հայտը',
    room: 'Սենյակ',
    total: 'Ընդամենը',
    selected: 'Ընտրված՝ {n}',
    details: 'Մանրամասներ',
  },
  en: {
    home: 'Home',
    settings: 'Settings',
    share: 'Share',
    language: 'Language',
    theme: 'Theme',
    system: 'System',
    light: 'Light',
    dark: 'Dark',
    currency: 'Currency',
    currencyNames: {
      AMD: 'Dram (֏)',
      USD: 'US dollar ($)',
      RUB: 'Rouble (₽)',
      EUR: 'Euro (€)',
    },
    more: 'More',
    contactUs: 'Contact us',
    call: 'Call',
    whatsapp: 'Write on WhatsApp',
    website: 'Website',
    openWebsite: 'Open on the website',
    follow: 'Follow us',
    tryAgain: 'Try again',
    loadError: "Couldn't load. Check your connection and try again.",
    done: 'Done',
    change: 'Change',
    city: 'City',
    guests: 'Guests',
    guestsSummary: 'Adults: {a} · Children: {c}',
    contactVia: 'How should we contact you?',
    channels: {
      whatsapp: 'WhatsApp',
      viber: 'Viber',
      telegram: 'Telegram',
      phone: 'Phone call',
    },
    fieldRequired: 'Required',
    emailInvalid: 'Enter a valid email address',
    phoneInvalid: 'Enter a valid phone number with the country code',
    requestNumber: 'Request number',
    backHome: 'Back to home',
    yourRequest: 'Your request',
    room: 'Room',
    total: 'Total',
    selected: 'Selected: {n}',
    details: 'Details',
  },
  ru: {
    home: 'Главная',
    settings: 'Настройки',
    share: 'Поделиться',
    language: 'Язык',
    theme: 'Тема',
    system: 'Как в системе',
    light: 'Светлая',
    dark: 'Тёмная',
    currency: 'Валюта',
    currencyNames: {
      AMD: 'Драм (֏)',
      USD: 'Доллар ($)',
      RUB: 'Рубль (₽)',
      EUR: 'Евро (€)',
    },
    more: 'Ещё',
    contactUs: 'Связаться с нами',
    call: 'Позвонить',
    whatsapp: 'Написать в WhatsApp',
    website: 'Сайт',
    openWebsite: 'Открыть на сайте',
    follow: 'Мы в соцсетях',
    tryAgain: 'Повторить',
    loadError: 'Не удалось загрузить. Проверьте подключение и повторите.',
    done: 'Готово',
    change: 'Изменить',
    city: 'Город',
    guests: 'Гости',
    guestsSummary: 'Взрослые: {a} · Дети: {c}',
    contactVia: 'Как с вами связаться?',
    channels: {
      whatsapp: 'WhatsApp',
      viber: 'Viber',
      telegram: 'Telegram',
      phone: 'Звонок',
    },
    fieldRequired: 'Обязательное поле',
    emailInvalid: 'Введите корректный email',
    phoneInvalid: 'Введите корректный номер с кодом страны',
    requestNumber: 'Номер заявки',
    backHome: 'На главную',
    yourRequest: 'Ваша заявка',
    room: 'Номер',
    total: 'Итого',
    selected: 'Выбрано: {n}',
    details: 'Подробнее',
  },
  ar: {
    home: 'الرئيسية',
    settings: 'الإعدادات',
    share: 'مشاركة',
    language: 'اللغة',
    theme: 'المظهر',
    system: 'حسب النظام',
    light: 'فاتح',
    dark: 'داكن',
    currency: 'العملة',
    currencyNames: {
      AMD: 'الدرام (֏)',
      USD: 'الدولار ($)',
      RUB: 'الروبل (₽)',
      EUR: 'اليورو (€)',
    },
    more: 'المزيد',
    contactUs: 'تواصل معنا',
    call: 'اتصال',
    whatsapp: 'راسلنا على واتساب',
    website: 'الموقع',
    openWebsite: 'افتح على الموقع',
    follow: 'تابعنا',
    tryAgain: 'حاول مرة أخرى',
    loadError: 'تعذّر التحميل. تحقق من الاتصال وحاول مرة أخرى.',
    done: 'تم',
    change: 'تغيير',
    city: 'المدينة',
    guests: 'الضيوف',
    guestsSummary: 'البالغون: {a} · الأطفال: {c}',
    contactVia: 'كيف نتواصل معك؟',
    channels: {
      whatsapp: 'واتساب',
      viber: 'فايبر',
      telegram: 'تيليجرام',
      phone: 'مكالمة',
    },
    fieldRequired: 'حقل مطلوب',
    emailInvalid: 'أدخل بريدًا إلكترونيًا صحيحًا',
    phoneInvalid: 'أدخل رقم هاتف صحيحًا مع رمز الدولة',
    requestNumber: 'رقم الطلب',
    backHome: 'العودة إلى الرئيسية',
    yourRequest: 'طلبك',
    room: 'الغرفة',
    total: 'الإجمالي',
    selected: 'المحدد: {n}',
    details: 'التفاصيل',
  },
};
