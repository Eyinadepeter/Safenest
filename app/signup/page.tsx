"use client";

import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { setCurrentAccount } from "../lib/demo-auth";
import { register as registerUser } from "../lib/authApi";
import { z } from "zod";
import Image from "next/image";
import { Eye, EyeOff } from "lucide-react";
import background from "../assets/images/background.png";
import logo from "../assets/images/logo.png";
import googleIcon from "../assets/images/googleicon.png";
import facebookIcon from "../assets/images/facebookicon.png";
import appleIcon from "../assets/images/appleIcon.png";
import Link from "next/link";

// ---------------- Validation schema ----------------
const signUpSchema = z
  .object({
    fullName: z
      .string()
      .trim()
      .min(2, "Enter your full name")
      .regex(/^[a-zA-Z\s'-]+$/, "Name can only contain letters"),

    phone: z
      .string()
      .trim()
      .regex(/^\+?[0-9]{10,14}$/, "Enter a valid phone number"),

    email: z
      .string()
      .trim()
      .min(1, "Email is required")
      .email("Enter a valid email"),

    password: z
      .string()
      .min(8, "At least 8 characters")
      .regex(/[a-z]/, "Add a lowercase letter")
      .regex(/[A-Z]/, "Add an uppercase letter")
      .regex(/[0-9]/, "Add a number")
      .regex(/[^A-Za-z0-9]/, "Add a special character"),

    // ADD THIS
    confirmPassword: z
      .string()
      .min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type SignUpValues = z.infer<typeof signUpSchema>;

// ---------------- Password strength ----------------
function getPasswordStrength(password: string) {
  let score = 0;
  if (password.length >= 8) score++;
  if (password.length >= 12) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  if (!password) return { score: 0, label: "", color: "bg-slate-200" };
  if (score <= 2) return { score, label: "Weak", color: "bg-red-500" };
  if (score <= 3) return { score, label: "Fair", color: "bg-amber-500" };
  if (score <= 4) return { score, label: "Good", color: "bg-teal-500" };
  return { score, label: "Strong", color: "bg-emerald-600" };
}

function PasswordStrengthMeter({ password }: { password: string }) {
  const { score, label, color } = useMemo(
    () => getPasswordStrength(password),
    [password]
  );
  const filled = Math.min(score, 4);

  if (!password) return null;

  return (
    <div className="mt-2">
      <div className="flex gap-1">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className={`h-1 flex-1 rounded-full transition-colors ${
              i < filled ? color : "bg-slate-200"
            }`}
          />
        ))}
      </div>
      <p className="mt-1 text-[11px] text-slate-500">{label}</p>
    </div>
  );
}

// ---------------- Reusable fields ----------------
function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="mt-1 text-[11px] text-red-600">{message}</p>;
}

export default function SignUpPage() {
const router = useRouter();

const [showPassword, setShowPassword] = useState(false);
const [showConfirm, setShowConfirm] = useState(false);

  

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<SignUpValues>({
    resolver: zodResolver(signUpSchema),
    mode: "onBlur",
  });

  const password = watch("password", "");

 const [submitError, setSubmitError] = useState<string | null>(null);

 const onSubmit = async (values: SignUpValues) => {
  setSubmitError(null);
  try {
    const result = await registerUser({
      fullName: values.fullName,
      email: values.email,
      phone: values.phone,
      password: values.password,
      confirmPassword: values.confirmPassword,
    });
    setCurrentAccount(
      { fullName: result.user.fullName, email: result.user.email },
      result.accessToken
    );
    router.push(`/welcome?name=${encodeURIComponent(result.user.fullName)}`);
  } catch (err) {
    setSubmitError(
      err instanceof Error ? err.message : "Something went wrong."
    );
  }
};

  return (
    <div className="flex min-h-screen w-full bg-white">
      {/* ---------------- Left panel ---------------- */}
      <div className="relative hidden w-1/2 overflow-hidden lg:flex lg:flex-col lg:items-center lg:justify-center">
        <Image src={background} alt="SafeNest background" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-teal-900/40" />

        <div className="relative z-10 flex max-w-sm flex-col items-center px-10 text-center">
          <div className="mb-10 flex h-24 w-24 items-center justify-center overflow-hidden rounded-full bg-teal-900/40 ring-1 ring-white/20 backdrop-blur-sm">
            <Image src={logo} alt="SafeNest logo" width={96} height={96} className="h-full w-full object-cover" />
          </div>

          <h1
            className="text-2xl font-bold leading-snug text-[#12355B] "
          >
            Save for what matters,
            <br /> one step at a time
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-teal-50/80 font-rounded">
            Create your account to start planning your first goal
          </p>

          <div className="mt-10 flex items-center gap-2">
            <span className="h-[26px] w-[20px] rounded-full bg-[#12355B]" />
            <span className="h-[26px] w-[26px] rounded-full bg-[#7DD3C7]" />
            <span className="h-[26px] w-[26px] rounded-full bg-[#7DD3C7]" />
          </div>
        </div>
      </div>

      {/* ---------------- Right panel ---------------- */}
      <div className="flex w-full flex-col justify-between lg:w-1/2">
        <div className="flex justify-end px-6 pt-6 sm:px-12">
          <p className="text-xs text-slate-500" style={{ fontFamily: "Inter, sans-serif" }}>
            Already have an account?{" "}
            <Link
              href="/signin"
              className="font-medium text-teal-700 hover:underline"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              Sign in
            </Link>
          </p>
        </div>

        <div className="mx-auto w-full max-w-sm flex-1 px-6 py-6 sm:px-0">

          <h2 className="text-xl font-semibold text-slate-800 text-center sm:text-2xl">
            Welcome Back to SafeNest!
          </h2>
          <p
            className="mt-1 text-sm font-sm text-slate-500 text-center sm:text-base"
          >
            Join SafeNest plan today, achieve tomorrow
          </p>

          <form className="mt-6 space-y-4" onSubmit={handleSubmit(onSubmit)} noValidate>
            {/* Full Name */}
            <div>
              <label className="mb-1.5 block text-xs font-medium text-slate-600">
                Full Name
              </label>
              <input
                type="text"
                placeholder="Enter full name"
                {...register("fullName")}
                className={`w-full rounded-lg border bg-white px-3.5 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 outline-none transition focus:ring-2 ${
                  errors.fullName
                    ? "border-red-400 focus:border-red-400 focus:ring-red-100"
                    : "border-slate-200 focus:border-teal-500 focus:ring-teal-100"
                }`}
              />
              <FieldError message={errors.fullName?.message} />
            </div>

            {/* Phone */}
            <div>
              <label className="mb-1.5 block text-xs font-medium text-slate-600">
                Phone Number
              </label>
              <input
                type="tel"
                placeholder="+234 0000000000"
                {...register("phone")}
                className={`w-full rounded-lg border bg-white px-3.5 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 outline-none transition focus:ring-2 ${
                  errors.phone
                    ? "border-red-400 focus:border-red-400 focus:ring-red-100"
                    : "border-slate-200 focus:border-teal-500 focus:ring-teal-100"
                }`}
              />
              <FieldError message={errors.phone?.message} />
            </div>

            {/* Email */}
            <div>
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
              <FieldError message={errors.email?.message} />
            </div>

            {/* Password */}
            <div>
              <label className="mb-1.5 block text-xs font-medium text-slate-600">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Minimum 8 characters"
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
              <PasswordStrengthMeter password={password} />
              <FieldError message={errors.password?.message} />
            </div>

            {/* Confirm Password */}
            <div>
              <label className="mb-1.5 block text-xs font-medium text-slate-600">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showConfirm ? "text" : "password"}
                  placeholder="Re-enter password"
                  {...register("confirmPassword")}
                  className={`w-full rounded-lg border bg-white px-3.5 py-2.5 pr-10 text-sm text-slate-800 placeholder:text-slate-400 outline-none transition focus:ring-2 ${
                    errors.confirmPassword
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
              <FieldError message={errors.confirmPassword?.message} />
            </div>

            <div className="pt-1 ">
              <div className="relative flex items-center py-2">
                <div className="flex-grow border-t border-slate-200 " />
                <span className="mx-3 text-xs text-slate-400 ">
                  Or sign in with
                </span>
                <div className="flex-grow border-t border-slate-200 " />
              </div>

              <div className="flex items-center justify-center gap-3  ">
  {[
    { src: googleIcon, label: "Google" },
    { src: facebookIcon, label: "Facebook" },
    { src: appleIcon, label: "Apple" },
  ].map(({ src, label }) => (
    <button
      key={label}
      type="button"
      className="flex cursor-pointer h-11 w-20 items-center justify-center rounded-lg border border-slate-200 bg-white shadow-sm transition-all duration-200 hover:border-slate-300 hover:bg-slate-50 hover:shadow-md"
    >
      <Image src={src} alt={`${label} icon`} width={20} height={20} className="h-5 w-5" />
    </button>
  ))}
</div>
            </div>
            {submitError && (
              <p className="text-sm text-red-600">{submitError}</p>
            )}
            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-2 w-full rounded-lg cursor-pointer bg-teal-700 py-3 text-sm font-semibold text-white transition hover:bg-teal-800 focus:outline-none focus:ring-2 focus:ring-teal-300 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? "Creating account…" : "Sign Up"}
            </button>
          </form>
        </div>

        <div className="flex items-center justify-between px-6 pb-6 text-xs text-slate-400 sm:px-12">
          <span>© 2026 SafeNest</span>
          <div className="flex gap-4">
            <a href="#" className="hover:text-slate-600">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-slate-600">
              Support
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
