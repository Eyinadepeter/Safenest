// app/lib/userSettingsApi.ts
//
// Wires the Settings page to the real SafeNest backend. Mirrors the same
// conventions as app/lib/goalCalculationApi.ts (same base URL, same
// envelope unwrapping, same Bearer token from localStorage). See that
// file's header comment for why this is separate from app/lib/api.ts.
//
// NOTE: same caveat as goalCalculationApi.ts — nothing currently sets a
// real `accessToken` in localStorage (auth is still app/lib/demo-auth.ts,
// a local mock), so calls from here will 401 until real backend auth is
// wired up. That's a separate, deliberately out-of-scope task for this
// page — not something broken in this file.

const API_BASE_URL =
  process.env.NEXT_PUBLIC_GOALS_API_URL ??
  "https://safe-nest-de6h.onrender.com/api/v1";

export interface UserProfile {
  id: string;
  email: string;
  phone: string;
  fullName: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface UpdateProfilePayload {
  fullName?: string;
  phone?: string;
}

export interface ChangePasswordPayload {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface NotificationSettings {
  pushEnabled: boolean;
  emailEnabled: boolean;
  theme?: string;
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

async function settingsApiFetch<T>(
  path: string,
  options: RequestInit = {}
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
    // Same network/CORS failure mode documented in goalCalculationApi.ts —
    // surface a clear message instead of the browser's bare error.
    throw new Error(
      "Couldn't reach the SafeNest server. This usually means the API " +
        "isn't reachable from this origin (a CORS setting on the backend) " +
        "or you're not signed in with a real account yet."
    );
  }

  if (!response.ok) {
    const errorBody = await response.json().catch(() => null);
    throw new Error(
      errorBody?.message || `Request failed with status ${response.status}`
    );
  }

  const envelope: ApiEnvelope<T> = await response.json();
  return envelope.data;
}

/** GET /users/me */
export function getMyProfile(): Promise<UserProfile> {
  return settingsApiFetch<UserProfile>("/users/me");
}

/** PUT /users/me — only fullName and phone are updatable per the API doc;
 * email is display-only here. */
export function updateMyProfile(
  payload: UpdateProfilePayload
): Promise<UserProfile> {
  return settingsApiFetch<UserProfile>("/users/me", {
    method: "PUT",
    body: JSON.stringify(payload),
  });
}

/** PUT /auth/change-password */
export function changePassword(
  payload: ChangePasswordPayload
): Promise<{ message: string }> {
  return settingsApiFetch<{ message: string }>("/auth/change-password", {
    method: "PUT",
    body: JSON.stringify(payload),
  });
}

/** GET /users/me/settings */
export function getNotificationSettings(): Promise<NotificationSettings> {
  return settingsApiFetch<NotificationSettings>("/users/me/settings");
}

/** PUT /users/me/settings — send only what changed */
export function updateNotificationSettings(
  payload: Partial<NotificationSettings>
): Promise<NotificationSettings> {
  return settingsApiFetch<NotificationSettings>("/users/me/settings", {
    method: "PUT",
    body: JSON.stringify(payload),
  });
}
