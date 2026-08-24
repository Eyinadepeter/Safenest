// app/lib/demo-auth.ts
//
// Despite the filename (kept to avoid touching every page that imports
// from "../lib/demo-auth" — dashboard, connect-bank, settings, ProfileTab,
// AccountTab all use these exact function names), this now backs onto a
// real session: a real accessToken from app/lib/authApi.ts, stored under
// the same "accessToken" key that goalCalculationApi.ts and
// userSettingsApi.ts already read.
//
// saveDemoAccount()/authenticateDemoAccount() (the old synchronous,
// fake-network mock functions) are gone — signin/page.tsx and
// signup/page.tsx now call authApi.ts's login()/register() directly (real,
// async, real error handling) and then call setCurrentAccount() below to
// persist the session.

const CURRENT_ACCOUNT_KEY = "safenest-current-account";
const ACCESS_TOKEN_KEY = "accessToken";

// Kept as "DemoAccount" (not renamed) since it's imported by type in
// several other files — renaming would mean touching all of them for no
// functional benefit.
export type DemoAccount = {
  fullName: string;
  email: string;
};

export function setCurrentAccount(account: DemoAccount, accessToken: string) {
  if (typeof window === "undefined") return;
  localStorage.setItem(CURRENT_ACCOUNT_KEY, JSON.stringify(account));
  localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
}

export function getCurrentDemoAccount(): DemoAccount | null {
  if (typeof window === "undefined") return null;

  try {
    const account = JSON.parse(
      localStorage.getItem(CURRENT_ACCOUNT_KEY) ?? "null"
    );
    return account && typeof account.email === "string" ? account : null;
  } catch {
    return null;
  }
}

export function clearCurrentDemoAccount() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(CURRENT_ACCOUNT_KEY);
  localStorage.removeItem(ACCESS_TOKEN_KEY);
}
