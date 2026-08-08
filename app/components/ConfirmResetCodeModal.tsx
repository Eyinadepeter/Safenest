"use client";

import { X } from "lucide-react";
import Image from "next/image";
import confirmpassword from "../assets/images/confirmpassword.png"

interface ConfirmResetCodeModalProps {
  open: boolean;
  onClose: () => void;
  onProceed: () => void;
  email?: string;
}

export default function ConfirmResetCodeModal({
  open,
  onClose,
  onProceed,
  email,
}: ConfirmResetCodeModalProps) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 px-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="confirm-code-title"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl sm:p-8"
      >
        {/* Header */}
        <div className="flex items-start justify-between">
          <h2
            id="confirm-code-title"
            className="text-xl font-bold text-slate-800"
          >
            Confirm Code
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-red-50 text-red-500 transition hover:bg-red-100 cursor-pointer"
          >
            <X size={18} strokeWidth={2.5} />
          </button>
        </div>

        {/* Icon */}
        <div className="flex justify-center">
  <Image
    src={confirmpassword}
    alt="Confirm password"
    width={80}
    height={80}
    priority
    className="object-contain pb-8"
  />
</div>

        {/* Copy */}
        <h3 className="text-center text-lg font-bold text-slate-800">
          Confirm reset code
        </h3>
        <p className="mt-2 text-center text-sm leading-relaxed text-[#3A3A3A]">
          A password reset verification code has been sent to your
          registered email{email ? ` (${email})` : ""}. Kindly enter the
          verification code sent to your email to continue.
        </p>

        {/* Action */}
        <div className="mt-8 flex justify-end">
          <button
            type="button"
            onClick={onProceed}
            className="rounded-xl bg-[#12355B] px-20 py-3 text-sm font-semibold text-[white] transition  cursor-pointer"
          >
            Proceed
          </button>
        </div>
      </div>
    </div>
  );
}