import type { ContactValues } from "../schemas/contactSchema";
import type { SubmissionResult } from "./leadService";

export async function submitContactMessage(payload: ContactValues): Promise<SubmissionResult> {
  // TODO: Replace simulated response with backend email/contact adapter.
  void payload;
  await new Promise((resolve) => setTimeout(resolve, 650));
  return { ok: true, referenceId: `SJ-CONTACT-${Date.now()}` };
}
