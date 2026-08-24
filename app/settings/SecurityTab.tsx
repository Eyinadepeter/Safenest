"use client";

import { useState } from "react";
import { changePassword } from "../lib/userSettingsApi";

export default function SecurityTab() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [twoFactor, setTwoFactor] = useState(false);

  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleUpdate = async () => {
    setMessage(null);
    setError(null);

    if (newPassword !== confirmPassword) {
      setError("New password and confirmation don't match.");
      return;
    }

    setIsSaving(true);
    try {
      const result = await changePassword({
        oldPassword: currentPassword,
        newPassword,
        confirmPassword,
      });
      setMessage(result.message ?? "Password updated.");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div>
      <p className="text-base font-bold text-navy">
        Manage your password and login preferences.
      </p>

      <div className="mt-6 grid gap-6 sm:grid-cols-2">
        <label className="block">
          <span className="text-base font-medium text-navy">
            Current Password
          </span>
          <input
            type="password"
            placeholder="Enter current password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            className="mt-2 w-full rounded-lg border border-teal-dark/40 px-4 py-3 text-sm text-navy placeholder:text-slate-400 focus:border-teal-dark focus:outline-none"
          />
        </label>

        <label className="block">
          <span className="text-base font-medium text-navy">
            New Password
          </span>
          <input
            type="password"
            placeholder="Enter new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="mt-2 w-full rounded-lg border border-teal-dark/40 px-4 py-3 text-sm text-navy placeholder:text-slate-400 focus:border-teal-dark focus:outline-none"
          />
        </label>

        {/*
          Not in the original design, but /auth/change-password requires
          a confirmation field — added since the endpoint can't be called
          correctly without it.
        */}
        <label className="block">
          <span className="text-base font-medium text-navy">
            Confirm New Password
          </span>
          <input
            type="password"
            placeholder="Re-enter new password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="mt-2 w-full rounded-lg border border-teal-dark/40 px-4 py-3 text-sm text-navy placeholder:text-slate-400 focus:border-teal-dark focus:outline-none"
          />
        </label>
      </div>

      {error && <p className="mt-4 text-sm text-red-600">{error}</p>}
      {message && <p className="mt-4 text-sm text-teal-dark">{message}</p>}

      <button
        type="button"
        onClick={handleUpdate}
        disabled={isSaving}
        className="mt-4 rounded-lg bg-navy px-6 py-3 text-sm font-semibold text-white transition hover:bg-navy/90 disabled:opacity-60"
      >
        {isSaving ? "Updating..." : "Update password"}
      </button>

      <div className="mt-10 flex items-start justify-between gap-6 border-t border-slate-200 pt-6">
        <div>
          <p className="text-base font-bold text-navy">
            Two-Factor authentication
          </p>
          <p className="mt-1 text-sm text-slate-500">
            Add an extra layer of security to your account.
          </p>
        </div>
        {/* No backend endpoint documented yet — local toggle only. */}
        <button
          type="button"
          role="switch"
          aria-checked={twoFactor}
          onClick={() => setTwoFactor((v) => !v)}
          className={`relative h-6 w-11 shrink-0 rounded-full transition ${
            twoFactor ? "bg-navy" : "bg-slate-300"
          }`}
        >
          <span
            className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition ${
              twoFactor ? "left-5" : "left-0.5"
            }`}
          />
        </button>
      </div>
    </div>
  );
}
