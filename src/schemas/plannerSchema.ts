import { z } from "zod";

const base = z.object({
  mode: z.enum(["known", "choose"]),
  name: z.string().min(2, "Enter your name").max(80),
  email: z.string().email("Enter a valid email address").or(z.literal("")).optional(),
  phone: z.string().regex(/^\+?[0-9\s-]{8,16}$/, "Enter a valid phone number"),
  startingCity: z.string().min(2, "Enter your starting city").max(80),
  departureDate: z.string().min(1, "Select a departure date"),
  returnDate: z.string().min(1, "Select a return date"),
  adults: z.number().min(1, "At least one adult is required").max(40),
  children: z.number().min(0, "Children cannot be negative").max(40),
  budget: z.string().min(2, "Add an approximate budget").max(80),
  notes: z.string().max(500, "Keep notes under 500 characters").optional(),
  consent: z.boolean().refine((value) => value, "Consent is required"),
});

export const plannerSchema = base
  .and(
    z.union([
      z.object({ mode: z.literal("known"), destination: z.string().min(2, "Enter a destination"), mood: z.string().optional() }),
      z.object({ mode: z.literal("choose"), mood: z.string().min(2, "Choose a travel mood"), destination: z.string().optional() }),
    ]),
  )
  .refine((data) => new Date(data.returnDate) > new Date(data.departureDate), {
    message: "Return date must be after departure date",
    path: ["returnDate"],
  });

export type PlannerValues = z.infer<typeof plannerSchema>;
