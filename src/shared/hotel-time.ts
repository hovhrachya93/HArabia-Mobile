export function hotelTime(iso: string): string {
  const [date, time = ""] = iso.split("T");
  return `${date.split("-").reverse().join(".")} ${time.slice(0, 5)}`.trim();
}
