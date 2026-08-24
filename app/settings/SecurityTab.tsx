"use client";

import { useState } from "react";
import Image from "next/image";
import {
  changePassword,
  setupTwoFactor,
  enableTwoFactor,
  disableTwoFactor,
  type TwoFactorSetup,
} from "../lib/userSettingsApi";

export default function SecurityTab() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Two-factor authentication — UI/flow only, matching the real
  // setup -> enable / disable contract, but the calls themselves are
  // stubbed in userSettingsApi.ts until backend integration is turned on.
  const [twoFactorOn, setTwoFactorOn] = useState(false);
  const [setupData, setSetupData] = useState<TwoFactorSetup | null>(null);
  const [enableCode, setEnableCode] = useState("");
  const [disablePassword, setDisablePassword] = useState("");
  const [twoFactorError, setTwoFactorError] = useState<string | null>(null);
  const [twoFactorBusy, setTwoFactorBusy] = useState(false);

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

  const handleStartSetup = async () => {
    setTwoFactorError(null);
    setTwoFactorBusy(true);
    try {
      const data = await setupTwoFactor();
      setSetupData(data);
    } catch (err) {
      setTwoFactorError(
        err instanceof Error ? err.message : "Couldn't start setup."
      );
    } finally {
      setTwoFactorBusy(false);
    }
  };

  const handleConfirmEnable = async () => {
    setTwoFactorError(null);
    setTwoFactorBusy(true);
    try {
      await enableTwoFactor(enableCode);
      setTwoFactorOn(true);
      setSetupData(null);
      setEnableCode("");
    } catch (err) {
      setTwoFactorError(
        err instanceof Error ? err.message : "Couldn't confirm that code."
      );
    } finally {
      setTwoFactorBusy(false);
    }
  };

  const handleDisable = async () => {
    setTwoFactorError(null);
    setTwoFactorBusy(true);
    try {
      await disableTwoFactor(disablePassword);
      setTwoFactorOn(false);
      setDisablePassword("");
    } catch (err) {
      setTwoFactorError(
        err instanceof Error ? err.message : "Couldn't disable 2FA."
      );
    } finally {
      setTwoFactorBusy(false);
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

      <div className="mt-10 border-t border-slate-200 pt-6">
        <div className="flex items-start justify-between gap-6">
          <div>
            <p className="text-base font-bold text-navy">
              Two-Factor authentication
            </p>
            <p className="mt-1 text-sm text-slate-500">
              Add an extra layer of security to your account.
              {/* Login-time enforcement (the "enter your code" step during
                  sign-in) lives on the sign-in page, not here — out of
                  scope for this tab. */}
            </p>
          </div>
          <button
            type="button"
            role="switch"
            aria-checked={twoFactorOn}
            disabled={twoFactorBusy}
            onClick={() =>
              twoFactorOn ? setDisablePassword("") : handleStartSetup()
            }
            className={`relative h-6 w-11 shrink-0 rounded-full transition disabled:opacity-60 ${
              twoFactorOn ? "bg-navy" : "bg-slate-300"
            }`}
          >
            <span
              className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition ${
                twoFactorOn ? "left-5" : "left-0.5"
              }`}
            />
          </button>
        </div>

        {twoFactorError && (
          <p className="mt-3 text-sm text-red-600">{twoFactorError}</p>
        )}

        {/* Setup step: show QR + manual key, ask for a confirmation code */}
        {setupData && !twoFactorOn && (
          <div className="mt-4 rounded-lg border border-slate-200 p-5">
            <p className="text-sm font-medium text-navy">
              Scan this QR code with your authenticator app
            </p>
            <Image
              src={setupData.qrCodeDataUrl}
              alt="Two-factor authentication QR code"
              width={160}
              height={160}
              className="mt-3 h-40 w-40"
              unoptimized
            />
            <p className="mt-3 text-xs text-slate-500">
              Or enter this key manually:{" "}
              <span className="font-mono">{setupData.manualEntryKey}</span>
            </p>

            <label className="mt-4 block max-w-xs">
              <span className="text-sm font-medium text-navy">
                Enter the 6-digit code
              </span>
              <input
                type="text"
                inputMode="numeric"
                maxLength={6}
                value={enableCode}
                onChange={(e) => setEnableCode(e.target.value)}
                className="mt-2 w-full rounded-lg border border-teal-dark/40 px-4 py-2.5 text-sm text-navy focus:border-teal-dark focus:outline-none"
              />
            </label>

            <button
              type="button"
              onClick={handleConfirmEnable}
              disabled={twoFactorBusy}
              className="mt-4 rounded-lg bg-navy px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-navy/90 disabled:opacity-60"
            >
              {twoFactorBusy ? "Confirming..." : "Confirm & Enable"}
            </button>
          </div>
        )}

        {/* Disable step: ask for current password */}
        {twoFactorOn && (
          <div className="mt-4 max-w-xs">
            <label className="block">
              <span className="text-sm font-medium text-navy">
                Enter your password to disable 2FA
              </span>
              <input
                type="password"
                value={disablePassword}
                onChange={(e) => setDisablePassword(e.target.value)}
                className="mt-2 w-full rounded-lg border border-teal-dark/40 px-4 py-2.5 text-sm text-navy focus:border-teal-dark focus:outline-none"
              />
            </label>
            <button
              type="button"
              onClick={handleDisable}
              disabled={twoFactorBusy || !disablePassword}
              className="mt-3 rounded-lg border border-red-400 px-5 py-2.5 text-sm font-semibold text-red-500 transition hover:bg-red-50 disabled:opacity-60"
            >
              {twoFactorBusy ? "Disabling..." : "Disable 2FA"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
