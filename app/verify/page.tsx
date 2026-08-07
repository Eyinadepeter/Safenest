"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import achievementImage from "../assets/images/Authentication-pana 2.png";

const CODE_LENGTH = 6;
const RESEND_SECONDS = 30;

export default function VerifyAccountPage() {
  const router = useRouter();

  const [digits, setDigits] = useState<string[]>(
    Array(CODE_LENGTH).fill("")
  );

  const [secondsLeft, setSecondsLeft] =
    useState(RESEND_SECONDS);

  const [isVerifying, setIsVerifying] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);

  /* Countdown */
  useEffect(() => {
    if (secondsLeft <= 0) return;

    const timer = setInterval(() => {
      setSecondsLeft((s) => s - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [secondsLeft]);

  const formattedTime = `00:${secondsLeft
    .toString()
    .padStart(2, "0")}`;

  /* Handle OTP input */
  const handleChange = (index: number, value: string) => {
    const char = value.replace(/[^0-9]/g, "").slice(-1);

    const next = [...digits];
    next[index] = char;

    setDigits(next);
    setError(null);

    if (char && index < CODE_LENGTH - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  /* Handle backspace */
  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (
      e.key === "Backspace" &&
      !digits[index] &&
      index > 0
    ) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  /* Handle paste */
  const handlePaste = (
    e: React.ClipboardEvent<HTMLInputElement>
  ) => {
    const pasted = e.clipboardData
      .getData("text")
      .replace(/[^0-9]/g, "");

    if (!pasted) return;

    e.preventDefault();

    const next = Array(CODE_LENGTH).fill("");

    pasted
      .slice(0, CODE_LENGTH)
      .split("")
      .forEach((char, i) => {
        next[i] = char;
      });

    setDigits(next);

    const lastFilled =
      Math.min(pasted.length, CODE_LENGTH) - 1;

    inputsRef.current[Math.max(lastFilled, 0)]?.focus();
  };

  const code = digits.join("");
  const isComplete = code.length === CODE_LENGTH;

  /* Verify */
  const handleVerify = async () => {
    if (!isComplete) {
      setError("Enter the full 6-digit code");
      return;
    }

    setIsVerifying(true);
    setError(null);

    await new Promise((resolve) =>
      setTimeout(resolve, 700)
    );

    const isValid = true;

    setIsVerifying(false);

    if (!isValid) {
      setError(
        "That code didn't work. Please try again."
      );
      return;
    }

    router.push("/welcome");
  };

  /* Resend */
  const handleResend = () => {
    if (secondsLeft > 0) return;

    setSecondsLeft(RESEND_SECONDS);
    setDigits(Array(CODE_LENGTH).fill(""));
    setError(null);

    inputsRef.current[0]?.focus();
  };

  
    return (
  <main className="min-h-screen w-full bg-white px-5 py-6 sm:px-8 lg:px-10">
    <div className="mx-auto flex min-h-screen w-full max-w-2xl flex-col items-center">

      {/* Back button */}
      <div className="w-full">
        <button
          type="button"
          onClick={() => router.back()}
          aria-label="Go back"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-300 text-slate-500 transition hover:bg-slate-50"
        >
          <ArrowLeft size={15} strokeWidth={1.5} />
        </button>
      </div>

      {/* Main content - stacked vertically */}
      <div className="flex w-full flex-1 flex-col items-center justify-center text-center">

        {/* Illustration */}
        <div className="relative mb-6 h-[180px] w-[260px] sm:h-[220px] sm:w-[340px] lg:h-[300px] lg:w-[440px]">
          <Image
            src={achievementImage}
            alt="Verify your account"
            fill
            priority
            className="object-contain"
          />
        </div>

        {/* Heading */}
        <h1 className="font-rounded text-[18px] font-bold leading-tight text-slate-800 sm:text-[20px] lg:text-[22px]">
          Verify Your Account
        </h1>

        {/* Description */}
        <p className="mt-2 max-w-[420px] px-2 font-sans text-xs leading-[1.45] text-slate-500 sm:text-sm">
          We&apos;ve sent you a 6-digit verification code to your email or
          phone number. Enter it below to continue.
        </p>

        {/* OTP */}
        <div className="mt-6 flex justify-center gap-2 sm:mt-7">
          {digits.map((digit, index) => (
            <input
              key={index}
              ref={(el) => {
                inputsRef.current[index] = el;
              }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) =>
                handleChange(index, e.target.value)
              }
              onKeyDown={(e) =>
                handleKeyDown(index, e)
              }
              onPaste={handlePaste}
              aria-label={`Verification digit ${index + 1}`}
              className={`h-10 w-10 rounded-md border bg-white text-center font-sans text-base font-semibold text-slate-800 outline-none transition sm:h-11 sm:w-11 sm:text-lg ${
                error
                  ? "border-red-300 focus:border-red-400 focus:ring-2 focus:ring-red-100"
                  : "border-slate-300 focus:border-[#173F68] focus:ring-2 focus:ring-[#173F68]/10"
              }`}
            />
          ))}
        </div>

        {/* Error */}
        {error && (
          <p className="mt-2 font-sans text-xs text-red-600">
            {error}
          </p>
        )}

        {/* Resend */}
        <div className="mt-4 text-center">
          <p className="font-sans text-xs text-slate-500 sm:text-sm">
            Didn&apos;t receive the code?
          </p>

          {secondsLeft > 0 ? (
            <p className="mt-0.5 font-sans text-xs text-slate-700 sm:text-sm">
              Resend in{" "}
              <span className="font-semibold">
                {formattedTime}
              </span>
            </p>
          ) : (
            <button
              type="button"
              onClick={handleResend}
              className="mt-0.5 font-rounded text-xs font-bold text-[#173F68] hover:underline"
            >
              Resend code
            </button>
          )}
        </div>

        {/* Buttons */}
        <div className="mt-6 w-full max-w-[390px]">
          {/* Verify */}
          <button
            type="button"
            onClick={handleVerify}
            disabled={isVerifying}
            className="w-full rounded-md bg-[#173F68] py-3 font-rounded text-xs font-bold text-white transition hover:bg-[#123555] disabled:cursor-not-allowed disabled:opacity-60 sm:py-3.5 sm:text-sm"
          >
            {isVerifying ? "Verifying…" : "Verify"}
          </button>

          {/* Change email */}
          <button
            type="button"
            onClick={() => router.push("/signup")}
            className="mt-3 w-full rounded-md border border-[#173F68] py-3 font-rounded text-xs font-bold text-[#173F68] transition hover:bg-slate-50 sm:py-3.5 sm:text-sm"
          >
            Change email or phone number
          </button>
        </div>

      </div>
    </div>
  </main>
);
 
}