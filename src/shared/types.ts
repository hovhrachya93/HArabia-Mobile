import type { Country } from "./countries";
import type { Localized } from "./i18n/config";

export type { Country };

export interface Hotel {
  slug: string;
  name: string;
  city: string;
  country: Country;
  stars: 3 | 4 | 5;
  description: Localized;
  priceFromUsd: number;
}

export type TourCategory = "desert" | "city" | "culture" | "sea" | "adventure" | "tickets";

export interface Tour {
  slug: string;
  name: Localized;
  city: string;
  country: Country;
  category: TourCategory;
  // "ticket": entry to an attraction, no guide.
  type: "group" | "private" | "ticket";
  durationHours: number;
  description: Localized;
  priceFromUsd: number;
}

export interface Testimonial {
  id: string;
  author: string;
  from: string;
  rating: 1 | 2 | 3 | 4 | 5;
  trip: string;
  quote: string;
}

export type ArticleKind = "guide" | "news";

export interface ArticleSection {
  heading: Localized;
  // Wrap a phrase in ==double equals== to highlight it like a marker.
  body: Localized;
  // A practical note (e.g. what to carry): shown as a card beside the text on
  // desktop, after the text on phones.
  aside?: boolean;
  // A stop in a "where to go" guide: a numbered block with a picture (sides
  // alternate on desktop), the area it's in, and our tour there if we run one.
  place?: {
    area?: Localized;
    // 3:2 under public/; `night` is optional, for the dark theme.
    image?: { day: string; night?: string; alt: Localized };
    tour?: string;
  };
}

export interface Article {
  slug: string;
  kind: ArticleKind;
  // ISO date, YYYY-MM-DD.
  publishedAt: string;
  // Where the article is about, if one place; drives the "See hotels" link.
  city?: string;
  country?: Country;
  readMinutes: number;
  title: Localized;
  // A phrase from the title to stand out on the article cards (bold, accent
  // colour), e.g. "visa for Oman". Must appear in the title word for word.
  titleHighlight?: Localized;
  excerpt: Localized;
  sections: ArticleSection[];
  // Official pages backing the facts — shown under the article.
  sources?: { title: string; url: string }[];
  // Cover picture under public/, a day version for the light theme and a
  // night one for the dark theme (same framing).
  cover?: { day: string; night: string; alt: Localized };
  // The key numbers, shown as passport stamps under the lead.
  keyFacts?: { value: Localized; label: Localized }[];
}

export type ConcertGenre = "piano" | "pop" | "desertBlues" | "rock" | "hiphop";

export interface Concert {
  slug: string;
  artist: string;
  genre: ConcertGenre;
  // "YYYY-MM-DD", or "YYYY-MM" while the day isn't announced.
  date: string;
  city: string;
  venue: string;
  // 16:9 pictures under public/: day for the light theme, night for the dark
  // one. Without it the card falls back to the genre's colours.
  image?: { day: string; night: string };
}

// A cultural event in Qatar, listed inside the blog's Qatar events card.
// Dates are "YYYY-MM-DD": `to` alone means "until", `from` alone "from", both
// the same a single day, neither the whole year.
export interface QatarEvent {
  slug: string;
  from?: string;
  to?: string;
  title: Localized;
  place: Localized;
  details: Localized;
  // Dates listed publicly but not yet on the official calendar.
  expected?: boolean;
  // Named on the closed card.
  featured?: boolean;
  // A picture under public/images/qatar-events/: day for the light theme,
  // night (optional) for the dark one.
  image?: { day: string; night?: string };
}
