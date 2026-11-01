import type { Locale } from '../i18n/locales';
import type { Stay } from '../shared/stay';
import { postJson } from './client';

export type RequestTarget =
  | { kind: 'hotels'; hotelNames: Record<string, string> }
  | { kind: 'hotel'; hotelId: string; hotelName: string }
  | { kind: 'package'; packageSlug: string }
  | { kind: 'tour'; tourSlug: string };

export interface Contact {
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  message: string;
}

export function sendPriceRequest(
  target: RequestTarget,
  stay: Stay,
  contact: Contact,
  locale: Locale,
  fallback: string,
) {
  const hotelNames =
    target.kind === 'hotels'
      ? target.hotelNames
      : target.kind === 'hotel'
      ? { [target.hotelId]: target.hotelName }
      : undefined;
  return postJson<{ id: string }>(
    '/api/price-requests',
    {
      kind: target.kind,
      locale,
      hotelSlugs: hotelNames ? Object.keys(hotelNames) : undefined,
      hotelNames,
      packageSlug: target.kind === 'package' ? target.packageSlug : undefined,
      tourSlug: target.kind === 'tour' ? target.tourSlug : undefined,
      checkIn: stay.checkIn,
      checkOut: stay.checkOut,
      adults: stay.adults,
      children: stay.children,
      ages: stay.childAges?.join(','),
      ...contact,
    },
    fallback,
  );
}
