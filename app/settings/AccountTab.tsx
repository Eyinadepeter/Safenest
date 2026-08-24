"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { clearCurrentDemoAccount } from "../lib/demo-auth";
import { deleteAccount } from "../lib/userSettingsApi";

export default function AccountTab() {
  const router = useRouter();

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deletePassword, setDeletePassword] = useState("");
  const [deleteError, setDeleteError] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleLogout = () => {
    clearCurrentDemoAccount();
    router.replace("/signin");
  };

  const handleDeleteAccount = async () => {
    setDeleteError(null);
    setIsDeleting(true);
    try {
      await deleteAccount(deletePassword);
      // deleteAccount() is currently a stub and always throws — this path
      // isn't reachable yet, but is wired correctly for when it's live:
      // it should sign the person out same as a normal logout.
      clearCurrentDemoAccount();
      router.replace("/signin");
    } catch (err) {
      setDeleteError(
        err instanceof Error ? err.message : "Couldn't delete your account."
      );
    } finally {
      setIsDeleting(false);
    }
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
          onClick={() => setShowDeleteConfirm((v) => !v)}
          className="rounded-lg border border-red-400 px-5 py-2.5 text-sm font-semibold text-red-500 transition hover:bg-red-50"
        >
          Delete Account
        </button>
      </div>

      {showDeleteConfirm && (
        <div className="mt-4 max-w-xs rounded-lg border border-red-200 bg-red-50 p-4">
          <label className="block">
            <span className="text-sm font-medium text-navy">
              Enter your password to confirm
            </span>
            <input
              type="password"
              value={deletePassword}
              onChange={(e) => setDeletePassword(e.target.value)}
              className="mt-2 w-full rounded-lg border border-red-300 bg-white px-4 py-2.5 text-sm text-navy focus:border-red-400 focus:outline-none"
            />
          </label>
          {deleteError && (
            <p className="mt-2 text-sm text-red-600">{deleteError}</p>
          )}
          <button
            type="button"
            onClick={handleDeleteAccount}
            disabled={isDeleting || !deletePassword}
            className="mt-3 rounded-lg bg-red-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700 disabled:opacity-60"
          >
            {isDeleting ? "Deleting..." : "Permanently delete my account"}
          </button>
        </div>
      )}
    </div>
  );
}
