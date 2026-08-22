// app/lib/goals.ts
export const CATEGORIES = [
  "Rent",
  "Education",
  "Emergency Fund",
  "Travel",
  "Wedding",
  "Personal",
  "Other",
] as const;

export const FREQUENCIES = ["Weekly", "Monthly", "Quarterly"] as const;

export type GoalValues = {
  goalName: string;
  category: string;
  targetAmount: number;
  currentAmount: number;
  deadline: string; // ISO date string, e.g. "2026-09-02"
  frequency: (typeof FREQUENCIES)[number];
};

export type StoredGoal = GoalValues & { id: string; createdAt: string };

const GOALS_KEY = "safenest_goals";

/**
 * Reads all saved goals from localStorage.
 * Safe to call from the client; returns [] if nothing is stored yet
 * or if called during SSR (no `window`).
 */
export function getStoredGoals(): StoredGoal[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(GOALS_KEY) || "[]");
  } catch {
    return [];
  }
}

/**
 * Appends a new goal to localStorage and returns the stored record
 * (with generated id + createdAt).
 *
 * TODO: replace with a real API call once the goals module
 * controller/DTO are available, e.g.
 * await fetch(`${API_BASE_URL}/goals`, {
 *   method: "POST",
 *   headers: { Authorization: `Bearer ${getToken()}`, "Content-Type": "application/json" },
 *   body: JSON.stringify(values),
 * });
 */
export function saveGoal(values: GoalValues): StoredGoal {
  const existing = getStoredGoals();

  const newGoal: StoredGoal = {
    ...values,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
  };

  localStorage.setItem(GOALS_KEY, JSON.stringify([...existing, newGoal]));
  return newGoal;
}

export function formatNaira(amount: number) {
  return `₦${Math.max(0, Math.round(amount)).toLocaleString("en-NG")}`;
}