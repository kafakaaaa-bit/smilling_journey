import { business } from "../config/business";
import type { PlannerValues } from "../schemas/plannerSchema";

export function buildWhatsAppUrl(message: string) {
  return `https://wa.me/${business.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export function buildTripMessage(data: PlannerValues) {
  const destination = data.mode === "known" ? data.destination : data.mood;
  return [
    "Hello Smiling Journey! I would like help planning a trip.",
    "",
    `Name: ${data.name}`,
    data.email ? `Email: ${data.email}` : "Email: Not provided",
    `Phone: ${data.phone}`,
    `Trip type: ${data.mode === "known" ? "I know my destination" : "Help me choose"}`,
    `Starting city: ${data.startingCity}`,
    `Destination or preference: ${destination}`,
    `Travel dates: ${data.departureDate} to ${data.returnDate}`,
    `Travellers: ${data.adults} adults, ${data.children} children`,
    `Budget: ${data.budget}`,
    data.notes ? `Notes: ${data.notes}` : "Notes: Not provided",
  ].join("\n");
}
