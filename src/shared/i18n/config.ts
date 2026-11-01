// Shared by the proxy and the app, so keep this free of server-only imports.
export const LOCALES = ["hy", "en", "ru", "ar"] as const;
export type Locale = (typeof LOCALES)[number];

// Armenian is served at the bare URLs (/, /hotels); the others get a prefix
// (/en/hotels, /ru/hotels, /ar/hotels).
export const DEFAULT_LOCALE: Locale = "hy";

export const LOCALE_NAMES: Record<Locale, string> = {
  hy: "Հայերեն",
  en: "English",
  ru: "Русский",
  ar: "العربية",
};

export const isLocale = (value: string | undefined): value is Locale =>
  LOCALES.includes(value as Locale);

export const dirOf = (locale: Locale) => (locale === "ar" ? "rtl" : "ltr");

// `path` starts with "/" and has no locale prefix.
export function localePath(locale: Locale, path: string): string {
  if (locale === DEFAULT_LOCALE) return path;
  return path === "/" ? `/${locale}` : `/${locale}${path}`;
}

// Splits "/ru/hotels" into { locale: "ru", path: "/hotels" }; bare paths are the default locale.
export function splitLocale(pathname: string): { locale: Locale; path: string } {
  const [, first, ...rest] = pathname.split("/");
  if (isLocale(first)) return { locale: first, path: `/${rest.join("/")}` };
  return { locale: DEFAULT_LOCALE, path: pathname };
}

// Text fields of catalog data, one string per locale.
export type Localized = Record<Locale, string>;

// Canonical URL plus one hreflang link per language, for page metadata.
// Relative URLs are resolved against the layout's metadataBase.
export function alternatesFor(locale: Locale, path: string) {
  const languages: Record<string, string> = Object.fromEntries(LOCALES.map((l) => [l, localePath(l, path)]));
  languages["x-default"] = localePath(DEFAULT_LOCALE, path);
  return { canonical: localePath(locale, path), languages };
}
