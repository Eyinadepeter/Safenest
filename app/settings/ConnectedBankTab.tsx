"use client";

import { useEffect, useState } from "react";
import { ShieldCheck } from "lucide-react";
import {
  listBankAccounts,
  disconnectBankAccount,
  type BankAccount,
} from "../lib/userSettingsApi";

/**
 * listBankAccounts()/disconnectBankAccount() are stubs (see
 * userSettingsApi.ts) — they throw rather than call the real endpoint, so
 * this starts empty and stays empty until that's wired up. UI/shape match
 * the real GET /bank-accounts array + DELETE /bank-accounts/:id contract.
 *
 * Linking a new account needs the Mono Connect widget flow, which is a
 * separate piece of work — not attempted here.
 */
export default function ConnectedBankTab() {
  const [accounts, setAccounts] = useState<BankAccount[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [disconnectingId, setDisconnectingId] = useState<string | null>(null);

  useEffect(() => {
    listBankAccounts()
      .then(setAccounts)
      .catch(() => {
        // Stubbed for now — starts empty rather than surfacing an error
        // on a page load nobody triggered.
      });
  }, []);

  const handleDisconnect = async (id: string) => {
    setError(null);
    setDisconnectingId(id);
    try {
      await disconnectBankAccount(id);
      setAccounts((prev) => prev.filter((a) => a.id !== id));
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Couldn't disconnect that account."
      );
    } finally {
      setDisconnectingId(null);
    }
  };

  return (
    <div>
      <p className="text-base font-bold text-navy">
        Manage how SafeNest reads your financial activity.
      </p>

      {error && <p className="mt-3 text-sm text-red-600">{error}</p>}

      {accounts.length === 0 ? (
        <p className="mt-6 text-sm text-slate-500">
          No bank accounts connected yet.
        </p>
      ) : (
        <div className="mt-6 flex flex-col gap-3">
          {accounts.map((account) => (
            <div
              key={account.id}
              className="flex items-center justify-between gap-4 rounded-2xl border border-slate-200 px-6 py-5"
            >
              <div className="flex items-center gap-3">
                <ShieldCheck className="h-6 w-6 text-teal-dark" />
                <div>
                  <p className="text-base font-semibold text-navy">
                    {account.bankName} ••••
                    {account.accountNumber.slice(-4)}
                  </p>
                  <p className="text-sm text-slate-500">
                    Connected via {account.provider} · Last synced{" "}
                    {new Date(account.lastSyncedAt).toLocaleString()}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="rounded-md bg-mint px-3 py-1 text-xs font-semibold text-teal-dark">
                  {account.status === "ACTIVE" ? "Active" : account.status}
                </span>
                <button
                  type="button"
                  onClick={() => handleDisconnect(account.id)}
                  disabled={disconnectingId === account.id}
                  className="rounded-lg border border-red-400 px-4 py-2 text-xs font-semibold text-red-500 transition hover:bg-red-50 disabled:opacity-60"
                >
                  {disconnectingId === account.id
                    ? "Disconnecting..."
                    : "Disconnect"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <p className="mt-6 rounded-lg bg-slate-50 px-5 py-4 text-sm text-slate-600">
        Read-only access, always. SafeNest can see your transactions to
        help calculate your plan, but can never move or spend your money.
      </p>
    </div>
  );
}
