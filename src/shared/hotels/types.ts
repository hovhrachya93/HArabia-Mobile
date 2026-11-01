
export const providerIds = ['hotelbeds'] as const;
export type ProviderId = (typeof providerIds)[number];

export type RoomRequest = { adults: number; childAges: number[] };

export type HotelLocation =
  | { type: 'destination'; code: string }
  | { type: 'geo'; latitude: number; longitude: number; radiusKm: number }
  | { type: 'area'; north: number; south: number; east: number; west: number }
  | { type: 'hotels'; ids: string[] };

export type HotelSearchParams = {
  checkIn: string;
  checkOut: string;
  rooms: RoomRequest[];
  location: HotelLocation;
};

export type CancellationPolicy = { amount: number; from: string };

export type HotelRate = {
  provider: ProviderId;
  rateKey: string;
  roomName: string;
  boardCode?: string;
  boardName: string;
  netPrice: number;
  minSellingPrice?: number;
  payAtHotel: boolean;
  bookable: boolean;
  refundable: boolean;
  cancellationPolicies: CancellationPolicy[];
  comments?: string;
  feesAtHotel: { amount: number; currency: string }[];
  discounts: { name: string; amount: number }[];
  promotions: string[];
  rooms: number;
  adults: number;
  childAges: number[];
};

export type HotelOffer = {
  id: string;
  provider: ProviderId;
  hotelId: string;
  name: string;
  stars?: number;
  category?: string;
  destination?: string;
  zone?: string;
  latitude?: number;
  longitude?: number;
  minPrice: number;
  currency: string;
  rates: HotelRate[];
  upgrades?: HotelRate[];
  cardRequired?: boolean;
};

export type HotelDetails = {
  id: string;
  provider: ProviderId;
  hotelId: string;
  name: string;
  description?: string;
  stars?: number;
  address?: string;
  city?: string;
  postalCode?: string;
  countryCode?: string;
  destinationCode?: string;
  latitude?: number;
  longitude?: number;
  email?: string;
  phones: string[];
  website?: string;
  images: { url: string; largeUrl: string; hdUrl?: string; type?: string }[];
  facilities?: { code: string; fee?: boolean }[];
};

export type HotelSummary = { hotelId: string; name: string; stars?: number };

export type Destination = {
  provider: ProviderId;
  code: string;
  name: string;
  countryCode: string;
  zones: { code: string; name: string }[];
};

export type Guest = {
  type: 'adult' | 'child';
  firstName: string;
  lastName: string;
  age?: number;
  room?: number;
};

export type BookingRequest = {
  holder: { firstName: string; lastName: string };
  rooms: { rateKey: string; guests: Guest[] }[];
  clientReference: string;
  remark?: string;
  priceTolerance?: number;
};

export type BookingStatus = 'confirmed' | 'cancelled' | 'pending';

export type Booking = {
  provider: ProviderId;
  reference: string;
  clientReference?: string;
  status: BookingStatus;
  createdAt?: string;
  holder?: { firstName: string; lastName: string };
  hotelId?: string;
  hotelName?: string;
  checkIn?: string;
  checkOut?: string;
  rooms: {
    roomName: string;
    boardName?: string;
    refundable?: boolean;
    cancellationPolicies: CancellationPolicy[];
    comments?: string;
    guests: Guest[];
  }[];
  totalPrice: number;
  pendingAmount?: number;
  currency: string;
  supplier?: { name: string; vatNumber?: string };
};

export type BookingListQuery = {
  start: string;
  end: string;
  dateType: 'checkin' | 'creation';
  status: 'all' | 'confirmed' | 'cancelled';
  page: number;
};

export type BookingChange = {
  holder?: { firstName: string; lastName: string };
  rooms?: { guests: { firstName: string; lastName: string }[] }[];
};

export interface HotelProvider {
  id: ProviderId;
  status(): Promise<void>;
  search(params: HotelSearchParams): Promise<HotelOffer[]>;
  checkRate(rateKeys: string[]): Promise<HotelOffer | null>;
  book(request: BookingRequest): Promise<Booking>;
  getBooking(reference: string): Promise<Booking>;
  listBookings(query: BookingListQuery): Promise<{ total: number; bookings: Booking[] }>;
  changeBooking(reference: string, change: BookingChange, options?: { simulate?: boolean }): Promise<Booking>;
  cancel(reference: string, options?: { simulate?: boolean }): Promise<Booking>;
  getHotelDetails(hotelIds: string[], language: string): Promise<HotelDetails[]>;
  getDestinations(countryCode: string, language: string): Promise<Destination[]>;
  getHotelList(destinationCode: string, language: string): Promise<HotelSummary[]>;
}

export const isQuotaError = (error: unknown) =>
  (error instanceof ProviderError && (error.status === 429 || error.status === 403)) ||
  (error instanceof Error && /quota|rate limit/i.test(error.message));

export function logSupplierError(context: string, error: unknown) {
  if (isQuotaError(error)) console.warn(`${context}: the supplier's request quota is used up for now.`);
  else console.error(`${context}:`, error);
}

export class ProviderError extends Error {
  constructor(
    readonly provider: ProviderId,
    message: string,
    readonly status?: number,
    readonly code?: string,
  ) {
    super(`[${provider}] ${message}`);
  }
}
