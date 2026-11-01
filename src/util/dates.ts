const pad = (n: number) => String(n).padStart(2, '0');

export function toIso(date: Date): string {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(
    date.getDate(),
  )}`;
}

export function fromIso(iso: string): Date | null {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso);
  if (!match) return null;
  return new Date(Number(match[1]), Number(match[2]) - 1, Number(match[3]));
}

export function addDays(date: Date, days: number): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() + days);
}

export function addMonths(date: Date, months: number): Date {
  const target = new Date(date.getFullYear(), date.getMonth() + months, 1);
  const lastDay = new Date(
    target.getFullYear(),
    target.getMonth() + 1,
    0,
  ).getDate();
  return new Date(
    target.getFullYear(),
    target.getMonth(),
    Math.min(date.getDate(), lastDay),
  );
}

export function addDaysIso(iso: string, days: number): string {
  const date = fromIso(iso);
  return date ? toIso(addDays(date, days)) : '';
}

export function moveCheckOut(
  prevCheckIn: string,
  prevCheckOut: string,
  nextCheckIn: string,
): string {
  const from = fromIso(prevCheckIn);
  const to = fromIso(prevCheckOut);
  const nights =
    from && to ? Math.max(1, Math.round((+to - +from) / 86_400_000)) : 1;
  return addDaysIso(nextCheckIn, nights);
}

export function formatDateTime(iso: string): string {
  const date = new Date(iso);
  return `${date.toLocaleDateString('en-GB')} ${date.toLocaleTimeString(
    'en-GB',
    { hour: '2-digit', minute: '2-digit' },
  )}`;
}
