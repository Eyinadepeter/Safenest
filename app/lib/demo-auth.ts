const ACCOUNTS_KEY = "safenest-demo-accounts";

type DemoAccount = {
  fullName: string;
  email: string;
  password: string;
};

function getAccounts(): DemoAccount[] {
  if (typeof window === "undefined") return [];

  try {
    const accounts = JSON.parse(localStorage.getItem(ACCOUNTS_KEY) ?? "[]");
    return Array.isArray(accounts) ? accounts : [];
  } catch {
    return [];
  }
}

export function saveDemoAccount(account: DemoAccount) {
  const accounts = getAccounts();
  const email = account.email.trim().toLowerCase();
  const nextAccount = { ...account, email };
  const existingAccount = accounts.findIndex((item) => item.email === email);

  if (existingAccount >= 0) {
    accounts[existingAccount] = nextAccount;
  } else {
    accounts.push(nextAccount);
  }

  localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(accounts));
}

export function authenticateDemoAccount(email: string, password: string) {
  return getAccounts().find(
    (account) =>
      account.email === email.trim().toLowerCase() && account.password === password
  );
}
