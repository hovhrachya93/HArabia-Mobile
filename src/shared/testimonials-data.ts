import type { Testimonial } from "./types";

// PLACEHOLDER reviews — invented to fill the layout, not real customers.
// Replace with genuine guest reviews (with their permission) before launch.
export const testimonials: Testimonial[] = [
  {
    id: "anna-dubai",
    author: "Anna M.",
    from: "Yerevan, Armenia",
    rating: 5,
    trip: "Hotel + transfers, Dubai",
    quote:
      "Everything was arranged before we landed — the driver was waiting at arrivals and the hotel had our room ready early. Completely stress-free.",
  },
  {
    id: "david-abu-dhabi",
    author: "David K.",
    from: "Tbilisi, Georgia",
    rating: 5,
    trip: "Family stay, Abu Dhabi",
    quote:
      "They found us a beach hotel with a great kids' club at a better price than we could get ourselves. Quick answers on WhatsApp the whole trip.",
  },
  {
    id: "lilit-doha",
    author: "Lilit S.",
    from: "Moscow, Russia",
    rating: 5,
    trip: "City break, Doha",
    quote:
      "First time in Qatar and the team suggested the perfect area near the souq. Airport pick-up and drop-off were right on time.",
  },
  {
    id: "mark-rak",
    author: "Mark T.",
    from: "Warsaw, Poland",
    rating: 4,
    trip: "Resort + transfers, Ras Al Khaimah",
    quote:
      "Lovely resort between the mountains and the sea. The private transfer from Dubai airport made a long journey feel easy.",
  },
];
