export interface GoalPlanRequest {
  goalName: string;
  targetAmount: number;
  deadline: string; // ISO date string
}

export interface GoalPlanResult {
  monthlyContribution: number;
  monthsRemaining: number;
}

/**
 * STUB — not wired to a real endpoint yet.
 *
 * Once the backend route for goal-plan calculation exists, replace the
 * body of this function with:
 *
 *   return apiFetch<GoalPlanResult>("/goals/calculate", {
 *     method: "POST",
 *     body: JSON.stringify(payload),
 *   });
 *
 * `apiFetch` (app/lib/api.ts) already handles the base URL, JSON headers,
 * and error normalization, so the form component calling this doesn't
 * need to change when the stub is swapped out.
 */
export async function calculateGoalPlan(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  payload: GoalPlanRequest
): Promise<GoalPlanResult> {
  throw new Error(
    "calculateGoalPlan is not implemented yet — backend endpoint pending."
  );
}
