"use client";

export const dynamic = "force-dynamic";

import { useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowLeft, Check, Eye, EyeOff, LockKeyhole, Monitor } from "lucide-react";
import Image from "next/image";
import ResetPassword from "@/app/assets/images/Reset password-cuate(1) 1.png"

const REQUIREMENTS = [
  {
    key: "length",
    label: "At least 8 characters long",
    test: (v: string) => v.length >= 8,
  },
  {
    key: "lowercase",
    label: "One lowercase character",
    test: (v: string) => /[a-z]/.test(v),
  },
  {
    key: "uppercase",
    label: "One uppercase character",
    test: (v: string) => /[A-Z]/.test(v),
  },
  {
    key: "numberSymbol",
    label: "One number, symbol, or whitespace character",
    test: (v: string) => /[0-9\s!@#$%^&*(),.?":{}|<>_\-+=[\]\\/;'`~]/.test(v),
  },
] as const;

const newPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, "At least 8 characters")
      .regex(/[a-z]/, "Add a lowercase character")
      .regex(/[A-Z]/, "Add an uppercase character")
      .regex(/[0-9\s!@#$%^&*(),.?":{}|<>_\-+=[\]\\/;'`~]/, "Add a number, symbol, or whitespace character"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password does not match",
    path: ["confirmPassword"],
  });

type NewPasswordValues = z.infer<typeof newPasswordSchema>;

export default function NewPasswordPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    resetField,
    formState: { errors, isSubmitting },
  } = useForm<NewPasswordValues>({
    resolver: zodResolver(newPasswordSchema),
    mode: "onChange",
    defaultValues: { password: "", confirmPassword: "" },
  });

  const password = watch("password", "");
  const confirmPassword = watch("confirmPassword", "");

  const metRequirements = useMemo(
    () => REQUIREMENTS.map((req) => ({ ...req, met: req.test(password) })),
    [password]
  );
  const metCount = metRequirements.filter((r) => r.met).length;

  const strengthColor =
    metCount <= 1
      ? "bg-red-500"
      : metCount === 2
      ? "bg-amber-500"
      : metCount === 3
      ? "bg-blue-400"
      : "bg-teal-600";

  const showMismatch =
    confirmPassword.length > 0 &&
    password !== confirmPassword &&
    !errors.confirmPassword;

  const onSubmit = async (values: NewPasswordValues) => {
    // Replace with your actual reset request, e.g.
    // await fetch("/api/reset-password", {
    //   method: "POST",
    //   body: JSON.stringify({ email, password: values.password }),
    // });
    await new Promise((r) => setTimeout(r, 700));
    router.push(
      `/signin${email ? `?resetSuccess=true&email=${encodeURIComponent(email)}` : "?resetSuccess=true"}`
    );
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-slate-100 px-4 py-10">
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
        <div className="relative mb-6 h-[180px] w-[260px] sm:h-[220px] sm:w-[340px] lg:h-[300px] lg:w-[440px]">
                  <Image
                    src={ResetPassword}
                    alt="Verify your account"
                    fill
                    priority
                    className="object-contain"
                  />
                </div>

        <h1 className="text-center text-lg font-semibold text-[#12355B]">
          Create new password
        </h1>
        <p className="mt-1 text-center text-sm text-slate-500">
          Enter your account password.
        </p>

        <form className="mt-6 space-y-4" onSubmit={handleSubmit(onSubmit)} noValidate>
          {/* Password */}
          <div>
            <label className="mb-1.5 block text-xs font-medium text-slate-600">
              Password <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter new password"
                {...register("password")}
                className={`w-full rounded-lg border bg-white px-3.5 py-2.5 pr-10 text-sm text-slate-800 placeholder:text-slate-400 outline-none transition focus:ring-2 ${
                  errors.password
                    ? "border-red-400 focus:border-red-400 focus:ring-red-100"
                    : "border-slate-200 focus:border-teal-500 focus:ring-teal-100"
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <div className="mb-1.5 flex items-center justify-between">
              <label className="text-xs font-medium text-slate-600">
                Confirm Password <span className="text-red-500">*</span>
              </label>
              {confirmPassword.length > 0 && (
                <button
                  type="button"
                  onClick={() => resetField("confirmPassword")}
                  className="text-xs font-medium text-teal-700 hover:underline"
                >
                  Clear
                </button>
              )}
            </div>
            <div className="relative">
              <input
                type={showConfirm ? "text" : "password"}
                placeholder="Re-enter new password"
                {...register("confirmPassword")}
                className={`w-full rounded-lg border bg-white px-3.5 py-2.5 pr-10 text-sm text-slate-800 placeholder:text-slate-400 outline-none transition focus:ring-2 ${
                  errors.confirmPassword || showMismatch
                    ? "border-red-400 focus:border-red-400 focus:ring-red-100"
                    : "border-slate-200 focus:border-teal-500 focus:ring-teal-100"
                }`}
              />
              <button
                type="button"
                onClick={() => setShowConfirm((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                aria-label={showConfirm ? "Hide password" : "Show password"}
              >
                {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            {(errors.confirmPassword || showMismatch) && (
              <p className="mt-1 text-[11px] text-red-600">
                {errors.confirmPassword?.message ?? "Password does not match"}
              </p>
            )}
          </div>

          {/* Strength bar */}
          <div className="flex gap-1">
            {Array.from({ length: 4 }).map((_, i) => (
              <span
                key={i}
                className={`h-1.5 flex-1 rounded-full transition-colors ${
                  i < metCount ? strengthColor : "bg-slate-200"
                }`}
              />
            ))}
          </div>

          {/* Requirements checklist */}
          <ul className="space-y-1.5 pt-1">
            {metRequirements.map((req) => (
              <li
                key={req.key}
                className="flex items-center gap-2 text-xs"
              >
                <span
                  className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full transition-colors ${
                    req.met ? "bg-teal-700" : "bg-slate-200"
                  }`}
                >
                  {req.met && (
                    <Check className="h-2.5 w-2.5 text-white" strokeWidth={3} />
                  )}
                </span>
                <span className={req.met ? "text-slate-700" : "text-slate-400"}>
                  {req.label}
                </span>
              </li>
            ))}
          </ul>

          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-4 w-full rounded-lg bg-[#12355B] py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? "Submitting…" : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
}