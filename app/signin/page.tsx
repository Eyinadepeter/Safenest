"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Image from "next/image";
import { Eye, EyeOff } from "lucide-react";
import background from "../assets/images/background.png";
import logo from "../assets/images/logo.png";
import googleIcon from "../assets/images/googleicon.png";
import facebookIcon from "../assets/images/facebookicon.png";
import appleIcon from "../assets/images/appleIcon.png";

import PasswordIncorrectModal from "../components/PasswordIncorrectModal";

// =========================
// Validation
// =========================

const signInSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "Email is required")
    .email("Enter a valid email"),

  password: z
    .string()
    .min(1, "Password is required"),
});

type SignInValues = z.infer<typeof signInSchema>;

function FieldError({ message }: { message?: string }) {
  if (!message) return null;

  return (
    <p className="mt-1 text-xs text-red-500">
      {message}
    </p>
  );
}

// =========================
// Sign In Page
// =========================

export default function SignInPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showIncorrectModal, setShowIncorrectModal] = useState(false);

  const {
    register,
    handleSubmit,
    setFocus,
    formState: { errors, isSubmitting },
  } = useForm<SignInValues>({
    resolver: zodResolver(signInSchema),
    mode: "onBlur",
  });

  const onSubmit = async (values: SignInValues) => {
    // Replace this with your backend API request
    await new Promise((resolve) => setTimeout(resolve, 600));

    console.log("Sign in values:", values);

    setShowIncorrectModal(true);
  };

  const handleTryAgain = () => {
    setShowIncorrectModal(false);
    setFocus("password");
  };

  const handleResetPassword = () => {
    setShowIncorrectModal(false);
    window.location.href = "/forgot-password";
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-50">
      <Image src={background} alt="SafeNest background" fill className="object-cover" priority />
      <div className="absolute inset-0 bg-slate-950/30" />

      <div className="relative z-10 flex min-h-screen items-center justify-center  ">
        <div className="w-full max-w-2xl  bg-white/95 shadow-2xl shadow-slate-900/10 ring-1 ring-slate-900/5 backdrop-blur-xl">
          <div className="px-6 py-6 sm:px-8 sm:py-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-teal-50">
                  <Image src={logo} alt="SafeNest logo" width={50} height={50} className="h-10 w-10" />
                </div>
                <div className="flex items-center">
  <span className="text-[18px] font-bold tracking-[-0.4px] text-[#12355B]">
    Safe
  </span>
  <span className="text-[18px] font-bold tracking-[-0.4px] text-[#42a7b3]">
    Nest
  </span>
</div>
              </div>

              <p className="text-sm text-slate-600">
                Don&apos;t have an account?{" "}
                <a href="/signup" className="font-semibold text-[#12355B] underline underline-offset-2 hover:text-teal-800">
                  Sign Up
                </a>
              </p>
            </div>

            <div className="mx-auto mt-8 text-center">
              <h1 className="font-bold text-[#3A3A3A] sm:text-4xl">
                Welcome Back to SafeNest!
              </h1>
              <p className="mt-3 text-sm text-slate-500 sm:text-base">
                Log in to check your savings progress.
              </p>
            </div>

            <div className="mt-8 space-y-4">
              {[
                { src: googleIcon, label: "Google" },
                { src: facebookIcon, label: "Facebook" },
                { src: appleIcon, label: "Apple" },
              ].map(({ src, label }) => (
                <button
                  key={label}
                  type="button"
                  aria-label={`Sign in with ${label}`}
                  className="flex h-12 w-full items-center justify-center gap-3 rounded-2xl border border-slate-200 bg-white text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50"
                >
                  <Image src={src} alt={`${label} icon`} width={20} height={20} className="h-5 w-5" />
                  <span>Sign In with {label}</span>
                </button>
              ))}
            </div>

            <div className="my-7 flex items-center gap-3 text-sm text-slate-400">
              <div className="h-px flex-1 bg-slate-200" />
              <span>Or sign in with</span>
              <div className="h-px flex-1 bg-slate-200" />
            </div>

            <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5 px-4 sm:px-0">
              <div>
                <label htmlFor="email" className="mb-2 block text-sm font-medium text-slate-700">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="NestSafe@gmail.com"
                  {...register("email")}
                  className={`w-full rounded-2xl border bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 ${
                    errors.email
                      ? "border-red-400 focus:ring-2 focus:ring-red-100"
                      : "border-slate-200 focus:border-teal-500 focus:ring-teal-100"
                  }`}
                />
                <FieldError message={errors.email?.message} />
              </div>

              <div>
                <label htmlFor="password" className="mb-2 block text-sm font-medium text-slate-700">
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="SafeNestAt12"
                    {...register("password")}
                    className={`w-full rounded-2xl border bg-white px-4 py-3 pr-12 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 ${
                      errors.password
                        ? "border-red-400 focus:ring-2 focus:ring-red-100"
                        : "border-slate-200 focus:border-teal-500 focus:ring-teal-100"
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((value) => !value)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-800"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                <FieldError message={errors.password?.message} />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-2 h-12 w-full rounded-2xl bg-[#12355B] text-sm font-semibold text-white transition hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-300 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting ? "Signing in..." : "Sign In"}
              </button>

              <div className="pt-2 text-center">
                <a href="/forgot-password" className="text-sm font-semibold text-rose-600 hover:underline">
                  Forgot Password?
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* ================= MODAL ================= */}

      <PasswordIncorrectModal
        open={showIncorrectModal}
        onClose={() => setShowIncorrectModal(false)}
        onTryAgain={handleTryAgain}
        onResetPassword={handleResetPassword}
      />
    </main>
  );
}
