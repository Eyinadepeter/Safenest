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

const loginSchema = z.object({
  email: z.string().trim().min(1, "Email is required").email("Enter a valid email"),
  password: z.string().min(8, "Enter at least 8 characters"),
});

type LoginValues = z.infer<typeof loginSchema>;

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="mt-1 text-[11px] text-red-600">{message}</p>;
}

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    mode: "onBlur",
  });

  const onSubmit = async (values: LoginValues) => {
    await new Promise((resolve) => setTimeout(resolve, 600));
    console.log("Login values", values);
  };

  return (
    <div className="flex min-h-screen w-full bg-white">
      <div className="relative hidden w-1/2 overflow-hidden lg:flex lg:flex-col lg:items-center lg:justify-center">
        <Image src={background} alt="SafeNest background" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-teal-900/40" />

        <div className="relative z-10 flex max-w-sm flex-col items-center px-10 text-center">
          <div className="mb-10 flex h-24 w-24 items-center justify-center overflow-hidden rounded-full bg-teal-900/40 ring-1 ring-white/20 backdrop-blur-sm">
            <Image src={logo} alt="SafeNest logo" width={96} height={96} className="h-full w-full object-cover" />
          </div>

          <h1 className="text-2xl font-semibold leading-snug text-[#12355B]">
            Save for what matters.
            <br />
            Start from the right place.
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-teal-50/80">
            Log in to view your plan and continue building stronger savings habits.
          </p>
        </div>
      </div>

      <div className="flex w-full flex-col justify-between lg:w-1/2">
        <div className="flex justify-end px-6 pt-6 sm:px-12">
          <p className="text-xs text-slate-500">
            New to SafeNest?{" "}
            <a href="/signup" className="font-medium text-teal-700 hover:underline">
              Create account
            </a>
          </p>
        </div>

        <div className="mx-auto w-full max-w-sm flex-1 px-6 py-6 sm:px-0">
          <h2 className="text-xl font-semibold text-slate-800 text-center sm:text-2xl">
            Sign in to your account
          </h2>
          <p className="mt-1 text-sm text-slate-500 text-center sm:text-base">
            Enter your credentials to continue.
          </p>

          <form className="mt-6 space-y-4" onSubmit={handleSubmit(onSubmit)} noValidate>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-slate-600">Email Address</label>
              <input
                type="email"
                placeholder="you@example.com"
                {...register("email")}
                className={`w-full rounded-lg border bg-white px-3.5 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 outline-none transition focus:ring-2 ${
                  errors.email
                    ? "border-red-400 focus:border-red-400 focus:ring-red-100"
                    : "border-slate-200 focus:border-teal-500 focus:ring-teal-100"
                }`}
              />
              <FieldError message={errors.email?.message} />
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-medium text-slate-600">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  {...register("password")}
                  className={`w-full rounded-lg border bg-white px-3.5 py-2.5 pr-10 text-sm text-slate-800 placeholder:text-slate-400 outline-none transition focus:ring-2 ${
                    errors.password
                      ? "border-red-400 focus:border-red-400 focus:ring-red-100"
                      : "border-slate-200 focus:border-teal-500 focus:ring-teal-100"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((value) => !value)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              <FieldError message={errors.password?.message} />
            </div>

            <div className="pt-1">
              <div className="relative flex items-center py-2">
                <div className="flex-grow border-t border-slate-200" />
                <span className="mx-3 text-xs text-slate-400">Or sign in with</span>
                <div className="flex-grow border-t border-slate-200" />
              </div>

              <div className="flex items-center justify-center gap-3">
                {[
                  { src: googleIcon, label: "Google" },
                  { src: facebookIcon, label: "Facebook" },
                  { src: appleIcon, label: "Apple" },
                ].map(({ src, label }) => (
                  <button
                    key={label}
                    type="button"
                    className="flex h-11 w-20 items-center justify-center rounded-lg border border-slate-200 bg-white shadow-sm transition-all duration-200 hover:border-slate-300 hover:bg-slate-50 hover:shadow-md"
                  >
                    <Image src={src} alt={`${label} icon`} width={20} height={20} className="h-5 w-5" />
                  </button>
                ))}
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-2 w-full rounded-lg bg-teal-700 py-3 text-sm font-semibold text-white transition hover:bg-teal-800 focus:outline-none focus:ring-2 focus:ring-teal-300 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? "Signing in…" : "Sign In"}
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
