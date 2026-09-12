import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(2, "Enter your name").max(80),
  email: z.string().email("Enter a valid email"),
  phone: z.string().regex(/^\+?[0-9\s-]{8,16}$/, "Enter a valid phone number"),
  enquiryType: z.string().min(1, "Choose an enquiry type"),
  destination: z.string().max(80).optional(),
  dates: z.string().max(80).optional(),
  message: z.string().min(10, "Tell us a little more").max(700),
  consent: z.boolean().refine((value) => value, "Consent is required"),
});

export type ContactValues = z.infer<typeof contactSchema>;
