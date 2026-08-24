"use client";

import { ShieldCheck } from "lucide-react";

/**
 * No bank-connection endpoints exist in the current API doc — this whole
 * tab is a visual stub matching the design, not wired to anything real.
 * "Disconnect Bank" doesn't call an endpoint; it just says so.
 */
export default function ConnectedBankTab() {
  return (
    <div>
      <p className="text-base font-bold text-navy">
        Manage how SafeNest reads your financial activity.
      </p>

      <div className="mt-6 flex items-center justify-between gap-4 rounded-2xl border border-slate-200 px-6 py-5">
        <div className="flex items-center gap-3">
          <ShieldCheck className="h-6 w-6 text-teal-dark" />
          <div>
            <p className="text-base font-semibold text-navy">
              GTBank ••••5460
            </p>
            <p className="text-sm text-slate-500">
              Connected via Read-Only API · Last synced 2 hours ago
            </p>
          </div>
        </div>
        <span className="rounded-md bg-mint px-3 py-1 text-xs font-semibold text-teal-dark">
          Active
        </span>
      </div>

      <button
        type="button"
        onClick={() =>
          alert("Bank connection isn't wired up to a real backend yet.")
        }
        className="mt-6 rounded-lg border border-red-400 px-5 py-2.5 text-sm font-semibold text-red-500 transition hover:bg-red-50"
      >
        Disconnect Bank
      </button>

      <p className="mt-6 rounded-lg bg-slate-50 px-5 py-4 text-sm text-slate-600">
        Read-only access, always. SafeNest can see your transactions to
        help calculate your plan, but can never move or spend your money.
      </p>
    </div>
  );
}
