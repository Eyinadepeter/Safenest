// app/lib/goalCalculationApi.ts
//
// Wires the frontend to the SafeNest backend's goal calculation service.
// Adapted from the backend team's reference client for this app's
// conventions: Next.js uses `process.env.NEXT_PUBLIC_*` for client-exposed
// env vars (not Vite's `import.meta.env.VITE_*`), and this base URL is
// intentionally separate from app/lib/api.ts's API_URL — that one talks to
// localhost:5052 with a different (unwrapped) response shape, this one
// talks to the deployed goals service and unwraps a {success,data,timestamp}
// envelope.
//
// NOTE: getAuthToken() below reads `accessToken` from localStorage, per the
// backend team's client. As of this writing, app/lib/demo-auth.ts is a
// local-only mock auth system (no real backend login yet), so nothing
// currently sets that key — calls from here will 401 until real backend
// auth is wired up. That's expected, not a bug in this file.

const API_BASE_URL =
  process.env.NEXT_PUBLIC_GOALS_API_URL ??
  "https://safe-nest-de6h.onrender.com/api/v1";

export type ContributionFrequency = "DAILY" | "WEEKLY" | "MONTHLY";

export interface SimulateGoalPayload {
  targetAmount: number;
  deadline: string; // ISO date string, e.g. "2026-09-03"
  frequency: ContributionFrequency;
  currentAmount?: number;
}

export interface GoalPlan {
  progressPercentage: number;
  amountRemaining: number;
  requiredContribution: number;
  daysRemaining: number;
  monthsRemaining: number;
  periodsRemaining: number;
  totalPeriods: number;
  elapsedPeriods: number;
  expectedAmountByNow: number;
  isOnTrack: boolean;
  status: string;
}

export interface ScenarioResult {
  targetAmount: number;
  deadline: string;
  frequency: ContributionFrequency;
  requiredContributionPerPeriod: number;
  totalPeriods: number;
  feasible: boolean;
  plan: GoalPlan;
}

interface ApiEnvelope<T> {
  success: boolean;
  data: T;
  timestamp: string;
}

function getAuthToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("accessToken");
}

async function goalsApiFetch<T>(
  path: string,
  options: RequestInit = {},
): Promise<T> {
  const token = getAuthToken();

  let response: Response;
  try {
    response = await fetch(`${API_BASE_URL}${path}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...options.headers,
      },
    });
  } catch {
    throw new Error("Couldn't reach the SafeNest server.");
  }

  if (!response.ok) {
    const errorBody = await response.json().catch(() => null);
    throw new Error(
      errorBody?.message || `Request failed with status ${response.status}`,
    );
  }

  const envelope: ApiEnvelope<T> = await response.json();
  return envelope.data;
}

/**
 * POST /api/v1/goals/simulate
 * Calculates a plan (required contribution, timeline, feasibility) WITHOUT
 * saving a goal. This is what "Calculate my Plan" calls.
 */
export function simulateGoalScenario(
  payload: SimulateGoalPayload,
): Promise<ScenarioResult> {
  return goalsApiFetch<ScenarioResult>("/goals/simulate", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

/**
 * POST /api/v1/goals
 * Creates and saves a real goal (final "Create Goal" submit, distinct from
 * the simulate-only preview above). Not called anywhere yet — included for
 * when that flow is built.
 */
export interface CreateGoalPayload {
  goalName: string;
  category?:
    | "RENT"
    | "SCHOOL_FEES"
    | "EMERGENCY"
    | "VACATION"
    | "CAPITAL"
    | "HOME";
  targetAmount: number;
  deadline: string; // YYYY-MM-DD, must be a future calendar date
  contributionFrequency: ContributionFrequency;
  preferredContribution?: number;
  description?: string;
  priority?: number;
}

export function createGoal(payload: CreateGoalPayload) {
  return goalsApiFetch("/goals", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

/** GET /api/v1/goals/:id/progress */
export function getGoalProgress(goalId: string) {
  return goalsApiFetch(`/goals/${goalId}/progress`);
}

/** GET /api/v1/goals/:id/health */
export function getGoalHealth(goalId: string) {
  return goalsApiFetch(`/goals/${goalId}/health`);
}

/** POST /api/v1/goals/:id/recovery-plan */
export function generateRecoveryPlan(goalId: string, missedAmount: number) {
  return goalsApiFetch(`/goals/${goalId}/recovery-plan`, {
    method: "POST",
    body: JSON.stringify({ missedAmount }),
  });
}
