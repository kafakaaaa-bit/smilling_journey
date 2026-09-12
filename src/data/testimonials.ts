export interface TestimonialItem {
  id: string;
  quote: string;
  name: string;
  location?: string;
  trip?: string;
  rating: number;
  source: string;
  date?: string;
}

export const testimonials: TestimonialItem[] = [
  {
    id: "review-1",
    quote: "We booked a six-day Gujarat trip through Smiling Journey. The trip was planned excellently for our family, including hotels, food, and transport. We covered the Statue of Unity, Dwarkadhish, Somnath, Gir Forest, and Ahmedabad, and enjoyed the experience greatly.",
    name: "Shraddha Chaudhary",
    trip: "Gujarat Family Tour (6 Days)",
    rating: 5,
    source: "Verified Google Review",
    date: "Recent Traveller",
  },
  {
    id: "review-2",
    quote: "Awesome experience with Smiling Journey! Our 6 days Kashmir honeymoon package was smooth from pickup at Srinagar airport to Gulmarg gondola tickets and Pahalgam cab transfers. Driver was very polite and helpful.",
    name: "Rahul & Neha Sharma",
    trip: "Kashmir Honeymoon Package",
    rating: 5,
    source: "Verified Google Review",
    date: "Recent Traveller",
  },
  {
    id: "review-3",
    quote: "Very professional and transparent travel agency. They organized our family group tour to Himachal smoothly. Drivers were courteous, hotels were clean with great mountain views. Highly recommended for custom trips!",
    name: "Pooja Verma",
    trip: "Himachal Group Tour",
    rating: 5,
    source: "Verified Google Review",
    date: "Recent Traveller",
  },
  {
    id: "review-4",
    quote: "Best tour operator for Kashmir and domestic trips. Got custom itinerary according to our exact dates and budget. Quick response on WhatsApp throughout the journey whenever we needed guidance.",
    name: "Ankit Gupta",
    trip: "Customized Kashmir Trip",
    rating: 5,
    source: "Verified Google Review",
    date: "Recent Traveller",
  },
  {
    id: "review-5",
    quote: "We arranged a customized family trip to Kerala through Smiling Journey. Houseboat experience in Alleppey and stay in Munnar were top class. Continuous team support till we landed back home safely.",
    name: "Meenakshi Sundaram",
    trip: "Kerala Backwaters & Hills",
    rating: 5,
    source: "Verified Google Review",
    date: "Recent Traveller",
  },
];

// Single export for legacy compatibility
export const testimonial = testimonials[0];
