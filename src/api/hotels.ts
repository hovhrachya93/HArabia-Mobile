import type { Locale } from '../i18n/locales';
import type { CancellationPolicy } from '../shared/hotels/types';
import type { Stay } from '../shared/stay';
import { stayToQuery } from '../shared/stay';
import { getJson, postJson } from './client';

export interface HotelPhoto {
  url: string;
  largeUrl: string;
  hdUrl?: string;
}

export interface LiveHotel {
  id: string;
  name: string;
  stars: number | null;
  zone: string | null;
  address: string | null;
  photo: HotelPhoto | null;
  minPrice: number;
  currency: string;
  board: string | null;
  refundable: boolean;
}

export interface LiveRate {
  provider: string;
  rateKey: string;
  roomName: string;
  board: string;
  boardName: string;
  netPrice: number;
  refundable: boolean;
  payAtHotel: boolean;
  cancellationPolicies: CancellationPolicy[];
  feesAtHotel: { amount: number; currency: string }[];
}

export interface HotelOffer {
  hotel: {
    id: string;
    name: string;
    stars: number | null;
    zone: string | null;
    address: string | null;
    description: string | null;
    latitude: number | null;
    longitude: number | null;
    photos: HotelPhoto[];
    facilities: { code: string; fee?: boolean }[];
  };
  currency: string;
  rates: LiveRate[];
}

export interface QuoteHotel {
  id: string;
  name: string;
  stars: number | null;
  photo: HotelPhoto | null;
}

export interface CheckedRate {
  rateKey: string;
  roomName: string;
  boardName: string;
  boardCode?: string;
  netPrice: number;
  refundable: boolean;
  cancellationPolicies: CancellationPolicy[];
  comments?: string;
  feesAtHotel: { amount: number; currency: string }[];
}

function query(city: string, stay: Stay | null, locale: Locale, extra = {}) {
  const params = new URLSearchParams({ city, lang: locale, ...extra });
  if (stay) new URLSearchParams(stayToQuery(stay)).forEach((v, k) => params.set(k, v));
  return params.toString();
}

export function searchCity(
  city: string,
  stay: Stay,
  locale: Locale,
  fallback: string,
) {
  return getJson<{ total: number; hotels: LiveHotel[] }>(
    `/api/hotels/city?${query(city, stay, locale)}`,
    fallback,
  );
}

export function fetchOffer(
  id: string,
  city: string,
  stay: Stay,
  locale: Locale,
  fallback: string,
) {
  return getJson<HotelOffer>(
    `/api/hotels/offer?${query(city, stay, locale, { id })}`,
    fallback,
  );
}

export function fetchQuoteHotels(city: string, locale: Locale, fallback: string) {
  return getJson<{ hotels: QuoteHotel[] }>(
    `/api/hotels/quote?${query(city, null, locale)}`,
    fallback,
  ).then(res => res.hotels);
}

export async function checkRate(
  provider: string,
  rateKey: string,
  fallback: string,
): Promise<{ rate: CheckedRate; currency: string } | null> {
  const { hotel } = await postJson<{
    hotel: { currency: string; rates: CheckedRate[] } | null;
  }>('/api/hotels/checkrate', { provider, rateKeys: [rateKey] }, fallback);
  const rate = hotel?.rates[0];
  return rate && hotel ? { rate, currency: hotel.currency } : null;
}
