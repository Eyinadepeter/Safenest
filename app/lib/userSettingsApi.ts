const API_BASE_URL =
  process.env.NEXT_PUBLIC_GOALS_API_URL ??
  "https://safe-nest-de6h.onrender.com/api/v1";

export interface UserProfile {
  id: string;
  email: string;
  phone: string;
  fullName: string;
  avatarUrl?: string | null;
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
    // Same network/CORS failure mode documented in goalCalculationApi.ts —
    // surface a clear message instead of the browser's bare error.
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

/** GET /users/me */
export function getMyProfile(): Promise<UserProfile> {
  return settingsApiFetch<UserProfile>("/users/me");
}

/** PUT /users/me — only fullName and phone are updatable per the API doc;
 * email is display-only here. */
export function updateMyProfile(
  payload: UpdateProfilePayload,
): Promise<UserProfile> {
  return settingsApiFetch<UserProfile>("/users/me", {
    method: "PUT",
    body: JSON.stringify(payload),
  });
}

/** PUT /auth/change-password */
export function changePassword(
  payload: ChangePasswordPayload,
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
  payload: Partial<NotificationSettings>,
): Promise<NotificationSettings> {
  return settingsApiFetch<NotificationSettings>("/users/me/settings", {
    method: "PUT",
    body: JSON.stringify(payload),
  });
}

export interface TwoFactorSetup {
  qrCodeDataUrl: string;
  manualEntryKey: string;
}

export interface BankAccount {
  id: string;
  provider: string;
  accountName: string;
  accountNumber: string;
  bankName: string;
  currency: string;
  status: string;
  lastSyncedAt: string;
  createdAt: string;
}

/** POST /users/me/avatar — multipart/form-data, field "file". STUB. */
export async function uploadAvatar(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  file: File,
): Promise<UserProfile> {
  throw new Error("uploadAvatar is not wired up yet.");
}

/** DELETE /users/me/avatar. STUB. */
export async function removeAvatar(): Promise<UserProfile> {
  throw new Error("removeAvatar is not wired up yet.");
}

/** POST /auth/2fa/setup. STUB. */
export async function setupTwoFactor(): Promise<TwoFactorSetup> {
  throw new Error("setupTwoFactor is not wired up yet.");
}

/** POST /auth/2fa/enable — { code }. STUB. */
export async function enableTwoFactor(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  code: string,
): Promise<{ message: string }> {
  throw new Error("enableTwoFactor is not wired up yet.");
}

/** POST /auth/2fa/disable — { password }. STUB. */
export async function disableTwoFactor(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  password: string,
): Promise<{ message: string }> {
  throw new Error("disableTwoFactor is not wired up yet.");
}

/** GET /bank-accounts. STUB. */
export async function listBankAccounts(): Promise<BankAccount[]> {
  throw new Error("listBankAccounts is not wired up yet.");
}

/** DELETE /bank-accounts/:id. STUB. */
export async function disconnectBankAccount(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  accountId: string,
): Promise<BankAccount> {
  throw new Error("disconnectBankAccount is not wired up yet.");
}

/** DELETE /users/me — { password }. STUB. */
export async function deleteAccount(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  password: string,
): Promise<{ message: string }> {
  throw new Error("deleteAccount is not wired up yet.");
}
