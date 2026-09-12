export type TravelPackage = {
  slug: string;
  name: string;
  destination: string;
  duration: string;
  category: string;
  summary: string;
  highlights: string[];
  image: string;
  imageAlt: string;
  needsClientConfirmation?: string[];
};

export const packages: TravelPackage[] = [
  {
    slug: "fascinating-kashmir-with-sonamarg",
    name: "Fascinating Kashmir with Sonamarg",
    destination: "Kashmir",
    duration: "5 Nights · 6 Days",
    category: "Domestic",
    summary: "Discover Kashmir's valleys, mountain scenery, and the natural beauty of Sonamarg.",
    highlights: ["Srinagar and Sonamarg scenery", "Mountain views", "Personalized planning"],
    image: "https://images.unsplash.com/photo-1598091383021-15ddea10925d?q=80&w=1600&auto=format&fit=crop",
    imageAlt: "Kashmir mountain valley",
    needsClientConfirmation: ["Complete itinerary", "Package inclusions", "Terms note"],
  },
  {
    slug: "glorious-kashmir-tour-package",
    name: "Glorious Kashmir Tour Package",
    destination: "Kashmir",
    duration: "4 Nights · 5 Days",
    category: "Family",
    summary: "A compact Kashmir experience combining scenic locations, comfortable stays, and guided planning.",
    highlights: ["Compact Kashmir route", "Comfort-focused stay planning", "Guided coordination"],
    image: "https://images.unsplash.com/photo-1595815771614-ade9d652a65d?q=80&w=1600&auto=format&fit=crop",
    imageAlt: "Snowy Himalayan landscape",
    needsClientConfirmation: ["Complete itinerary", "Hotel category", "Inclusions and exclusions"],
  },
  {
    slug: "winter-special-escape",
    name: "Winter Special Escape",
    destination: "Himachal",
    duration: "6 Nights · 7 Days",
    category: "Seasonal",
    summary: "A winter escape designed for families and travellers who want memorable seasonal experiences.",
    highlights: ["Winter landscapes", "Family-friendly planning", "Transport coordination"],
    image: "https://images.unsplash.com/photo-1445543949571-ffc3e0e2f55e?q=80&w=1600&auto=format&fit=crop",
    imageAlt: "Winter mountain road",
    needsClientConfirmation: ["Destination route", "Seasonal availability", "Inclusions"],
  },
  {
    slug: "srinagar-gulmarg-pahalgam",
    name: "Srinagar, Gulmarg and Pahalgam",
    destination: "Kashmir",
    duration: "3 Nights · 4 Days",
    category: "Couple",
    summary: "Explore three of Kashmir's best-known destinations in one carefully planned journey.",
    highlights: ["Srinagar", "Gulmarg", "Pahalgam"],
    image: "https://images.unsplash.com/photo-1609948543911-7f01ff385be5?q=80&w=1600&auto=format&fit=crop",
    imageAlt: "Lake and mountains near Srinagar",
    needsClientConfirmation: ["Day-wise itinerary", "Inclusions and exclusions"],
  },
];
