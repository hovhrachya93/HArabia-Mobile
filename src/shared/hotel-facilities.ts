import type { HotelDetails } from "./hotels/types";

export type FacilityKey = (typeof FACILITIES)[number]["key"];

export const FACILITIES = [
  { key: "outdoorPool", codes: ["73/363", "73/364", "73/365", "73/615"], icon: "M8 4v10M16 4v10M8 8h8M8 12h8M2 18c2 1.5 4 1.5 6 0s4-1.5 6 0 4 1.5 6 0" },
  { key: "indoorPool", codes: ["73/360", "73/361", "73/362"], icon: "M3 10l9-6 9 6M3 14c2 1.5 4 1.5 6 0s4-1.5 6 0 4 1.5 6 0M3 18c2 1.5 4 1.5 6 0s4-1.5 6 0 4 1.5 6 0" },
  { key: "privateBeach", codes: ["70/574", "60/328"], icon: "M12 3a9 9 0 0 1 9 9H3a9 9 0 0 1 9-9zM12 12v8M8 20h8" },
  { key: "restaurant", codes: ["71/200"], icon: "M7 3v8m-3-8v5a3 3 0 0 0 6 0V3M7 11v10M17 21V3c-2.2 0-4 2.7-4 6v4h4" },
  { key: "bar", codes: ["71/130", "71/590", "71/570", "73/140"], icon: "M5 4h14l-7 8zM12 12v8M8 20h8" },
  { key: "snackBar", codes: ["71/555"], icon: "M4 11a8 7 0 0 1 16 0zM3 15h18M5 15v1a3 3 0 0 0 3 3h8a3 3 0 0 0 3-3v-1" },
  { key: "cafe", codes: ["71/80", "71/585"], icon: "M4 9h12v5a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5zM16 10h1.5a2.5 2.5 0 0 1 0 5H16M8 3v3M12 3v3" },
  { key: "wifi", codes: ["70/550", "60/261"], icon: "M2 9a15 15 0 0 1 20 0M5 12.5a10 10 0 0 1 14 0M8.5 16a5 5 0 0 1 7 0M12 19.5h.01" },
  { key: "parking", codes: ["70/320", "70/500", "70/560", "70/330"], icon: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM10 16V8h3a2.5 2.5 0 0 1 0 5h-3" },
  { key: "frontDesk", codes: ["70/30"], icon: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM12 7v5l3 2" },
  { key: "spa", codes: ["74/620", "74/460"], icon: "M12 20c-4 0-7-3-7-7 3 0 5.5 1.5 7 4 1.5-2.5 4-4 7-4 0 4-3 7-7 7zM12 17c-1.3-1.8-2-3.8-2-6s.8-4 2-5c1.2 1 2 3 2 5s-.7 4.2-2 6" },
  { key: "sauna", codes: ["74/420", "74/440", "60/307", "60/310"], icon: "M9 4c-1 1-1 2 0 3s1 2 0 3M14 4c-1 1-1 2 0 3s1 2 0 3M4 15h16M4 19h16" },
  { key: "gym", codes: ["70/470", "90/295", "60/308"], icon: "M6 8v8M3 10v4M18 8v8M21 10v4M6 12h12" },
  { key: "massage", codes: ["74/450"], icon: "M12 3l1.8 4.7 4.7 1.8-4.7 1.8L12 16l-1.8-4.7-4.7-1.8 4.7-1.8zM19 15l.8 2 2 .8-2 .8-.8 2-.8-2-2-.8 2-.8z" },
  { key: "beauty", codes: ["74/615", "74/120"], icon: "M6 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM6 21a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM20 4 8.1 15.9M14.5 14.5 20 20M8.1 8.1 12 12" },
  { key: "hotTub", codes: ["74/410", "60/305"], icon: "M3 14h18v3a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3zM8 10a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zM13 8a1 1 0 1 0 0-2 1 1 0 0 0 0 2zM16 11a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" },
  { key: "laundry", codes: ["70/280", "70/285"], icon: "M5 3h14v18H5zM5 7h14M12 18a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM8 5h.01" },
  { key: "roomService", codes: ["70/270"], icon: "M3 18h18M5 18a7 7 0 0 1 14 0M12 8V6M10 6h4" },
  { key: "airportShuttle", codes: ["70/562"], icon: "M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z" },
  { key: "accessible", codes: ["70/295", "60/250"], icon: "M12 6a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zM12 7v6h5l2 5M12 10h4M8.5 11a5 5 0 1 0 6.5 7" },
  { key: "kids", codes: ["73/340", "73/350", "73/385", "60/317"], icon: "M9 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM17 9a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM5 21v-6a4 4 0 0 1 8 0v6M14 21v-4a3 3 0 0 1 6 0v4" },
  { key: "nightlife", codes: ["73/150"], icon: "M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z" },
  { key: "meetings", codes: ["72/605", "72/170", "72/575"], icon: "M3 5h18v11H3zM8 21l4-5 4 5" },
  { key: "pets", codes: ["70/535", "70/536", "70/540", "70/541"], icon: "M12 20c-3 0-5-1.5-5-3.5S9 12 12 12s5 2.5 5 4.5-2 3.5-5 3.5zM6 11a1.8 1.8 0 1 0 0-3.6A1.8 1.8 0 0 0 6 11zM18 11a1.8 1.8 0 1 0 0-3.6 1.8 1.8 0 0 0 0 3.6zM9.5 7.5a1.8 1.8 0 1 0 0-3.6 1.8 1.8 0 0 0 0 3.6zM14.5 7.5a1.8 1.8 0 1 0 0-3.6 1.8 1.8 0 0 0 0 3.6z" },
  { key: "golf", codes: ["90/390"], icon: "M8 21V3l9 4-9 4M4 21h8" },
  { key: "tennis", codes: ["90/430"], icon: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM5.6 5.6a9 9 0 0 1 0 12.8M18.4 5.6a9 9 0 0 0 0 12.8" },
  { key: "lift", codes: ["70/70"], icon: "M5 3h14v18H5zM9 9l3-3 3 3M9 15l3 3 3-3" },
] as const;

export const HIGHLIGHTS: FacilityKey[] = ["outdoorPool", "indoorPool", "privateBeach", "wifi", "parking", "spa", "gym", "restaurant", "airportShuttle", "kids"];
export const MAX_HIGHLIGHTS = 8;

export function facilitiesOf(facilities: HotelDetails["facilities"]) {
  return FACILITIES.flatMap((facility) => {
    const matches = (facilities ?? []).filter((item) => (facility.codes as readonly string[]).includes(item.code));
    return matches.length ? [{ ...facility, paid: matches.every((item) => item.fee === true) }] : [];
  });
}
