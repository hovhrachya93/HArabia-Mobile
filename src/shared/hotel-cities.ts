import type { Country } from "./countries";
import type { ProviderId } from "./hotels/types";

export const HOTEL_CITIES: { city: string; country: Country; provider: ProviderId; code: string }[] = [
  { city: "Dubai", country: "UAE", provider: "hotelbeds", code: "DXB" },
  { city: "Abu Dhabi", country: "UAE", provider: "hotelbeds", code: "AUH" },
  { city: "Sharjah", country: "UAE", provider: "hotelbeds", code: "SHJ" },
  { city: "Ras Al Khaimah", country: "UAE", provider: "hotelbeds", code: "RKT" },
  { city: "Doha", country: "Qatar", provider: "hotelbeds", code: "DOH" },
  { city: "Muscat", country: "Oman", provider: "hotelbeds", code: "MCT" },
];
