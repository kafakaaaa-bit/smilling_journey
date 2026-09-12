import type { PlannerValues } from "../schemas/plannerSchema";

export interface SubmissionResult {
  ok: boolean;
  referenceId: string;
}

export async function submitTripLead(payload: PlannerValues): Promise<SubmissionResult> {
  // TODO: Replace simulated response with backend lead submission and WhatsApp handoff logging.
  void payload;
  await new Promise((resolve) => setTimeout(resolve, 650));
  return { ok: true, referenceId: `SJ-${Date.now()}` };
}
