export type Transaction = {
  date: string;
  description: string;
  category: string;
  amount: string;
  type: "income" | "expense";
};

export type TransactionFormValues = {
  description: string;
  category: string;
  date: string;
  amount: string;
  type: "income" | "expense";
};

const STORAGE_KEY = "safenest_transactions";
const EVENT_NAME = "safenest_transactions_updated";

function formatDateLabel(isoDate: string) {
  if (!isoDate) return "";
  const d = new Date(`${isoDate}T00:00:00`);
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

export function getStoredTransactions(): Transaction[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Transaction[]) : [];
  } catch {
    return [];
  }
}

export function addStoredTransaction(values: TransactionFormValues) {
  const numericAmount = Number(values.amount).toLocaleString("en-NG");
  const sign = values.type === "income" ? "+" : "-";

  const transaction: Transaction = {
    date: formatDateLabel(values.date),
    description: values.description,
    category: values.category,
    amount: `${sign}₦${numericAmount}`,
    type: values.type,
  };

  const existing = getStoredTransactions();
  const updated = [transaction, ...existing];

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  window.dispatchEvent(new Event(EVENT_NAME));

  return transaction;
}

export function subscribeToTransactions(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  window.addEventListener(EVENT_NAME, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(EVENT_NAME, callback);
    window.removeEventListener("storage", callback);
  };
}