"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { clearCurrentDemoAccount } from "../lib/demo-auth";

export default function AccountTab() {
  const router = useRouter();
  const [deleteMessage, setDeleteMessage] = useState<string | null>(null);

  const handleLogout = () => {
    clearCurrentDemoAccount();
    router.replace("/signin");
  };

  // No account-deletion endpoint is documented yet — stubbed with a
  // confirmation step so the interaction is real even though nothing is
  // actually deleted.
  const handleDeleteAccount = () => {
    const confirmed = window.confirm(
      "This will permanently delete your account and all associated data. Are you sure?"
    );
    if (!confirmed) return;
    setDeleteMessage("Account deletion isn't wired up to a real backend yet.");
  };

  return (
    <div>
      <p className="text-base font-bold text-navy">
        Manage your session and account status.
      </p>

      <div className="mt-6 flex items-center justify-between gap-6 border-b border-slate-200 pb-6">
        <div>
          <p className="text-lg font-medium text-navy">Log Out</p>
          <p className="mt-1 text-sm text-slate-500">
            Sign out of SafeNest on this device.
          </p>
        </div>
        <button
          type="button"
          onClick={handleLogout}
          className="rounded-lg border border-slate-300 px-5 py-2.5 text-sm font-semibold text-navy transition hover:bg-slate-50"
        >
          Log out
        </button>
      </div>

      <div className="flex items-center justify-between gap-6 pt-6">
        <div>
          <p className="text-lg font-medium text-red-600">Delete Account</p>
          <p className="mt-1 text-sm text-slate-500">
            Permanently delete your account and all associated data.
          </p>
        </div>
        <button
          type="button"
          onClick={handleDeleteAccount}
          className="rounded-lg border border-red-400 px-5 py-2.5 text-sm font-semibold text-red-500 transition hover:bg-red-50"
        >
          Delete Account
        </button>
      </div>

      {deleteMessage && (
        <p className="mt-4 text-sm text-slate-500">{deleteMessage}</p>
      )}
    </div>
  );
}
