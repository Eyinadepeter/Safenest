"use client";

import { X } from "lucide-react";

interface PasswordIncorrectModalProps {
  open: boolean;
  onClose: () => void;
  onTryAgain: () => void;
  onResetPassword: () => void;
  message?: string;
}

export default function PasswordIncorrectModal({
  open,
  onClose,
  onTryAgain,
  onResetPassword,
  message = "The password you entered does not match. Please enter a correct password.",
}: PasswordIncorrectModalProps) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 px-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="password-incorrect-title"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md rounded-2xl border border-sky-200 bg-white p-8 shadow-xl"
      >
        {/* Header */}
        <div className="flex items-start justify-between">
          <h2
            id="password-incorrect-title"
            className="text-xl font-bold text-slate-800"
          >
            Password Incorrect
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-red-50 text-red-500 transition hover:bg-red-100"
          >
            <X size={18} strokeWidth={2.5} />
          </button>
        </div>

        {/* Icon */}
        <div className="flex justify-center py-8">
          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-red-50">
            <X className="h-10 w-10 text-red-500" strokeWidth={2.5} />
          </div>
        </div>

        {/* Message */}
        <p className="text-center text-sm leading-relaxed text-slate-600">
          {message}
        </p>

        {/* Actions */}
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={onTryAgain}
            className="flex-1 rounded-xl bg-slate-900 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            Try Again
          </button>
          <button
            type="button"
            onClick={onResetPassword}
            className="flex-1 rounded-xl border border-slate-300 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            Reset Password
          </button>
        </div>
      </div>
    </div>
  );
}