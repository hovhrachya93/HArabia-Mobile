import type { Concert } from "./types";

// public/images/concerts/cards/<slug>.png and <slug>-night.png (1536×864).
const picture = (slug: string) => ({
  day: `/images/concerts/cards/${slug}.png`,
  night: `/images/concerts/cards/${slug}-night.png`,
});

// Concerts in the UAE, in date order. `date` is "YYYY-MM-DD", or "YYYY-MM"
// while only the month is announced. `city` matches the hotels catalog, so
// each card can link to the hotels there.
export const concerts: Concert[] = [
  { slug: "tony-ann-2027", artist: "Tony Ann", genre: "piano", date: "2027-01-10", city: "Dubai", venue: "Dubai Opera", image: picture("tony-ann-2027") },
  { slug: "ebru-gundes-2027", artist: "Ebru Gündeş", genre: "pop", date: "2027-01-15", city: "Abu Dhabi", venue: "Etihad Arena", image: picture("ebru-gundes-2027") },
  { slug: "bombino-2027", artist: "Bombino", genre: "desertBlues", date: "2027-01-29", city: "Abu Dhabi", venue: "The Red Theater", image: picture("bombino-2027") },
  { slug: "a1-music-travel-love-2027", artist: "A1 + Music Travel Love", genre: "pop", date: "2027-04-17", city: "Dubai", venue: "Coca-Cola Arena", image: picture("a1-music-travel-love-2027") },
  { slug: "richard-marx-2027", artist: "Richard Marx", genre: "rock", date: "2027-06-06", city: "Dubai", venue: "Coca-Cola Arena", image: picture("richard-marx-2027") },
  { slug: "timati-2027", artist: "Timati", genre: "hiphop", date: "2027-06", city: "Abu Dhabi", venue: "Etihad Arena", image: picture("timati-2027") },
];

// Cities in the order they first appear.
export const concertCities = Array.from(new Set(concerts.map((concert) => concert.city)));
