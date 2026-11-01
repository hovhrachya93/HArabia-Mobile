// Dates and guests for a hotel search or a price request. On /hotels the
// search lives in the URL (?checkIn=…&checkOut=…&adults=…&children=…), so it
// survives a reload, a shared link and a language switch.
export interface Stay {
  checkIn: string;
  checkOut: string;
  adults: number;
  children: number;
  childAges?: number[];
}

export const MAX_NIGHTS = 30;
export const MAX_GUESTS = 10;

const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;

function parseIso(value: string): number | null {
  if (!ISO_DATE.test(value)) return null;
  const time = Date.parse(`${value}T00:00:00Z`);
  return Number.isNaN(time) ? null : time;
}

export function nightsBetween(checkIn: string, checkOut: string): number {
  const from = parseIso(checkIn);
  const to = parseIso(checkOut);
  if (from === null || to === null) return 0;
  return Math.round((to - from) / 86_400_000);
}

// Today in UTC as YYYY-MM-DD, the earliest allowed check-in.
export const todayIso = () => new Date().toISOString().slice(0, 10);

export function addDaysIso(iso: string, days: number): string {
  const time = parseIso(iso);
  if (time === null) return iso;
  return new Date(time + days * 86_400_000).toISOString().slice(0, 10);
}

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

function toInt(value: unknown, fallback: number): number {
  const parsed = Number.parseInt(String(value ?? ""), 10);
  return Number.isFinite(parsed) ? parsed : fallback;
}

// Anything from the URL or a request body is untrusted: a stay only comes
// back when the dates make sense; guest counts are clamped rather than rejected.
export function parseStay(input: Record<string, unknown>): Stay | null {
  const pick = (key: string) => {
    const value = input[key];
    return String(Array.isArray(value) ? value[0] : (value ?? ""));
  };
  const checkIn = pick("checkIn");
  const checkOut = pick("checkOut");
  const nights = nightsBetween(checkIn, checkOut);
  if (nights < 1 || nights > MAX_NIGHTS || checkIn < todayIso()) return null;

  const children = clamp(toInt(pick("children"), 0), 0, MAX_GUESTS);
  const ages = pick("ages").split(",").filter(Boolean).map(Number);
  const agesValid = ages.length === children && ages.every((age) => Number.isInteger(age) && age >= 0 && age <= 17);
  return {
    checkIn,
    checkOut,
    adults: clamp(toInt(pick("adults"), 2), 1, MAX_GUESTS),
    children,
    ...(children > 0 && agesValid ? { childAges: ages } : {}),
  };
}

export const hasChildAges = (stay: Stay) => stay.children === 0 || stay.childAges?.length === stay.children;

// A single day plus guests, for a tour request: the date must be today or
// later (and within a year); checkOut stays empty.
export function parseDay(input: Record<string, unknown>): Stay | null {
  const pick = (key: string) => String(input[key] ?? "");
  const day = pick("checkIn");
  const ahead = nightsBetween(todayIso(), day);
  if (!ISO_DATE.test(day) || ahead < 0 || ahead > 365) return null;

  return {
    checkIn: day,
    checkOut: "",
    adults: clamp(toInt(pick("adults"), 2), 1, MAX_GUESTS),
    children: clamp(toInt(pick("children"), 0), 0, MAX_GUESTS),
  };
}

export function stayAround(eventDay: string, nights = 7): Stay | null {
  const checkIn = [addDaysIso(eventDay, -Math.floor(nights / 2)), todayIso()].sort()[1];
  if (eventDay < checkIn) return null;
  return { checkIn, checkOut: addDaysIso(checkIn, nights), adults: 2, children: 0 };
}

export function stayToQuery(stay: Stay): string {
  const params = new URLSearchParams({
    checkIn: stay.checkIn,
    checkOut: stay.checkOut,
    adults: String(stay.adults),
    children: String(stay.children),
  });
  if (stay.children > 0 && stay.childAges?.length) params.set("ages", stay.childAges.join(","));
  return params.toString();
}

// PLACEHOLDER pricing until a supplier API is connected: the catalog's
// "from" rate per night, one room per two adults. Shown as a sample price.
export function samplePrice(pricePerNightUsd: number, stay: Stay): number {
  const rooms = Math.max(1, Math.ceil(stay.adults / 2));
  return pricePerNightUsd * nightsBetween(stay.checkIn, stay.checkOut) * rooms;
}
