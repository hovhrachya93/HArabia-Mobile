// Every country HArabia covers, in display order. `live` marks the countries
// we currently sell (hotels and transfers); the rest are shown as "coming
// soon". To launch a country, flip its `live` flag — its hotels appear on the
// site automatically. `flag` names its SVG in public/flags (from the MIT
// licensed flag-icons set, 4:3).
export const COUNTRIES = [
  { name: "UAE", slug: "uae", flag: "ae", live: true },
  { name: "Qatar", slug: "qatar", flag: "qa", live: true },
  { name: "Oman", slug: "oman", flag: "om", live: true },
] as const;

export type Country = (typeof COUNTRIES)[number]["name"];

export const LIVE_COUNTRIES = COUNTRIES.filter((country) => country.live);
export const UPCOMING_COUNTRIES = COUNTRIES.filter((country) => !country.live);

export const isLive = (name: Country) => LIVE_COUNTRIES.some((country) => country.name === name);

// "Abu Dhabi" -> "abu-dhabi", as used in the hotels page's ?city= filter.
export const citySlug = (city: string) => city.toLowerCase().replace(/\s+/g, "-");
