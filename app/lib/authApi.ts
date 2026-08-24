// app/lib/authApi.ts
//
// Real /auth/register and /auth/login calls. Same base URL and envelope
// convention as goalCalculationApi.ts / userSettingsApi.ts. This is what
// finally makes those two work end-to-end — they've always been correctly
// wired, they just never had a real `accessToken` in localStorage to send,
// since login was a local-only mock until now.

const API_BASE_URL =
  process.env.NEXT_PUBLIC_GOALS_API_URL ??
  "https://safe-nest-de6h.onrender.com/api/v1";

export interface AuthUser {
  id: string;
  email: string;
  phone: string;
  fullName: string;
  createdAt: string;
}

export interface AuthResult {
  user: AuthUser;
  accessToken: string;
}

/** Returned by /auth/login instead of AuthResult when the account has 2FA
 * enabled. Not handled beyond detecting it — see signin/page.tsx. */
export interface MfaChallenge {
  mfaRequired: true;
  challengeToken: string;
}

interface ApiEnvelope<T> {
  success: boolean;
  data: T;
  timestamp: string;
}

async function authApiFetch<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  let response: Response;
  try {
    response = await fetch(`${API_BASE_URL}${path}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
    });
  } catch {
    throw new Error(
      "Couldn't reach the SafeNest server. Check your connection and try again."
    );
  }

  const envelope: (ApiEnvelope<T> & Partial<T>) | null = await response
    .json()
    .catch(() => null);

  if (!response.ok) {
    const message =
      (envelope as unknown as { message?: string })?.message ||
      `Request failed with status ${response.status}`;
    throw new Error(message);
  }

  // Envelope-wrapped like every other endpoint.
  return (envelope as ApiEnvelope<T>).data;
}

export interface RegisterPayload {
  fullName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

export function register(payload: RegisterPayload): Promise<AuthResult> {
  return authApiFetch<AuthResult>("/auth/register", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export interface LoginPayload {
  email: string;
  password: string;
}

export function login(
  payload: LoginPayload
): Promise<AuthResult | MfaChallenge> {
  return authApiFetch<AuthResult | MfaChallenge>("/auth/login", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}
