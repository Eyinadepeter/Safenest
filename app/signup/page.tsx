"use client";

import { useMemo, useState, type ComponentProps } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Image from "next/image";
import { Eye, EyeOff, ShieldCheck } from "lucide-react";
import background from "../assets/images/background.png";
import logo from "../assets/images/logo.png";

// ---- Small inline brand icons (Google / Facebook / Apple) ----
function GoogleIcon(props: ComponentProps<"svg">) {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" {...props}>
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.76h3.55c2.08-1.92 3.29-4.74 3.29-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.55-2.76c-.99.66-2.25 1.06-3.73 1.06-2.87 0-5.3-1.94-6.17-4.53H2.18v2.85A10.98 10.98 0 0 0 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.83 14.11A6.6 6.6 0 0 1 5.48 12c0-.73.13-1.44.35-2.11V7.04H2.18A10.98 10.98 0 0 0 1 12c0 1.77.43 3.45 1.18 4.96l3.65-2.85z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 1.99 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.04l3.65 2.85C6.7 7.31 9.13 5.38 12 5.38z"
      />
    </svg>
  );
}

function FacebookIcon(props: ComponentProps<"svg">) {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="#1877F2" {...props}>
      <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5 3.66 9.15 8.44 9.94v-7.03H7.9v-2.91h2.54V9.85c0-2.5 1.49-3.89 3.78-3.89 1.1 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.44 2.91h-2.34V22c4.78-.79 8.44-4.94 8.44-9.94z" />
    </svg>
  );
}

function AppleIcon(props: ComponentProps<"svg">) {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="#111111" {...props}>
      <path d="M16.36 1.43c0 1.14-.42 2.2-1.24 3.03-.83.85-2.05 1.5-3.22 1.4-.15-1.1.42-2.24 1.22-3.04.82-.83 2.22-1.44 3.24-1.39zM20.6 17.34c-.53 1.21-.78 1.75-1.46 2.82-.95 1.5-2.29 3.36-3.95 3.38-1.47.02-1.85-.96-3.84-.95-1.99.01-2.4.97-3.87.95-1.66-.02-2.93-1.7-3.88-3.2-2.65-4.16-2.93-9.04-1.3-11.64 1.16-1.86 2.99-2.95 4.72-2.95 1.76 0 2.87 1 4.32 1 1.41 0 2.28-1 4.32-1 1.55 0 3.18.85 4.34 2.31-3.82 2.09-3.2 7.53.6 9.28z" />
    </svg>
  );
}

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
    email: z.string().trim().min(1, "Email is required").email("Enter a valid email"),
    password: z
      .string()
      .min(8, "At least 8 characters")
      .regex(/[A-Z]/, "Add an uppercase letter")
      .regex(/[0-9]/, "Add a number"),
    confirmPassword: z.string(),
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

  const onSubmit = async (values: SignUpValues) => {
    // Replace with your actual sign-up request
    await new Promise((r) => setTimeout(r, 600));
    console.log("Sign up values", values);
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
            className="text-2xl font-semibold leading-snug text-[#12355B] "
          >
            Save for what matters,
            <br /> one step at a time
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-teal-50/80">
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
            <a
              href="/signin"
              className="font-medium text-teal-700 hover:underline"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              Sign in
            </a>
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

            <div className="pt-1">
              <div className="relative flex items-center py-2">
                <div className="flex-grow border-t border-slate-200" />
                <span className="mx-3 text-xs text-slate-400">
                  Or sign in with
                </span>
                <div className="flex-grow border-t border-slate-200" />
              </div>

              <div className="flex items-center justify-center gap-3">
  {[
    { Icon: GoogleIcon, name: "Google" },
    { Icon: FacebookIcon, name: "Facebook" },
    { Icon: AppleIcon, name: "Apple" },
  ].map(({ Icon, name }) => (
    <button
      key={name}
      type="button"
      className="flex h-11 w-20 items-center justify-center rounded-lg border border-slate-200 bg-white shadow-sm transition-all duration-200 hover:border-slate-300 hover:bg-slate-50 hover:shadow-md"
    >
      <Icon className="h-5 w-5" />
    </button>
  ))}
</div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-2 w-full rounded-lg bg-teal-700 py-3 text-sm font-semibold text-white transition hover:bg-teal-800 focus:outline-none focus:ring-2 focus:ring-teal-300 disabled:cursor-not-allowed disabled:opacity-60"
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