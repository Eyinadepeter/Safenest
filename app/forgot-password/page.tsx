"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowLeft, KeyRound, Lock } from "lucide-react";
import ConfirmResetCodeModal from "./../components/ConfirmResetCodeModal";
import Image from "next/image";
import resetpassword from "../assets/images/Reset password-pana 1.png";

const forgotPasswordSchema = z.object({
  email: z.string().trim().min(1, "Email is required").email("Enter a valid email"),
});

type ForgotPasswordValues = z.infer<typeof forgotPasswordSchema>;

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [isSent, setIsSent] = useState(false);
  const [sentTo, setSentTo] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordValues>({
    resolver: zodResolver(forgotPasswordSchema),
    mode: "onBlur",
  });

  const onSubmit = async (values: ForgotPasswordValues) => {
    // Replace with your actual request, e.g.
    // await fetch("/api/forgot-password", { method: "POST", body: JSON.stringify(values) });
    await new Promise((r) => setTimeout(r, 600));
    setSentTo(values.email);
    setIsSent(true);
  };

  return (
    <>
      <div className="relative flex min-h-screen w-full items-center justify-center bg-slate-100 px-4 py-10">
        {/* Back button */}
        <button
          type="button"
          onClick={() => router.back()}
          aria-label="Go back"
          className="absolute left-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 transition hover:bg-slate-50 sm:left-6 sm:top-6"
        >
          <ArrowLeft size={16} />
        </button>

        <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-sm sm:p-8">
       

        {/* Illustration */}
        
          <div className="flex pb-8 items-center justify-center ">
            <Image
              src={resetpassword}
              alt="Reset password"
              width={280}
              height={280}
              priority
            />
          </div>

        <h1 className="text-center text-lg font-semibold text-[#3A3A3A]">
          Password Reset
        </h1>
        <p className="mt-2 text-center text-sm leading-relaxed text-[#3A3A3A]">
          Enter the email associated with your account and we will send
          an email with instructions to reset your password.
        </p>

        <form
          className="mt-6"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          <label className="mb-1.5 block text-xs font-medium text-slate-600">
            Email Address
          </label>
          <input
            type="email"
            placeholder="you@gmail.com"
            {...register("email")}
            className={`w-full rounded-lg border bg-white px-3.5 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 outline-none transition focus:ring-2 ${
              errors.email
                ? "border-red-400 focus:border-red-400 focus:ring-red-100"
                : "border-slate-200 focus:border-teal-500 focus:ring-teal-100"
            }`}
          />
          {errors.email && (
            <p className="mt-1 text-[11px] text-red-600">
              {errors.email.message}
            </p>
          )}

          <div className="mt-6 flex gap-3">
            <button
              type="button"
              onClick={() => router.back()}
              className="flex-1 rounded-lg border border-slate-300 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 rounded-lg bg-blue-500 py-3 text-sm font-semibold text-white transition hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? "Sending…" : "Send"}
            </button>
          </div>
        </form>
      </div>

      <ConfirmResetCodeModal
        open={isSent}
        onClose={() => setIsSent(false)}
        onProceed={() =>
          router.push(
            `/verify?context=reset&email=${encodeURIComponent(sentTo)}`
          )
        }
        email={sentTo}
      />
    </div>
    </>
  );
}