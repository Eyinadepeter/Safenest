"use client";

import { useMemo } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Bell, Settings, Info, CalendarDays } from "lucide-react";
import DashboardHeader from "@/app/components/DashboardHeader";
import Link from "next/link";
import Image from "next/image";
import logo from "../assets/images/logo.png";

const CATEGORIES = [
  "Rent",
  "Education",
  "Emergency Fund",
  "Travel",
  "Wedding",
  "Personal",
  "Other",
];

const FREQUENCIES = ["Weekly", "Monthly", "Quarterly"] as const;

const goalSchema = z
  .object({
    goalName: z.string().trim().min(2, "Enter a goal name"),
    category: z.string().min(1, "Select a category"),
    targetAmount: z.coerce.number().positive("Enter a target amount"),
    currentAmount: z.coerce.number().min(0, "Can't be negative").default(0),
    deadline: z.string().min(1, "Select a deadline"),
    frequency: z.enum(FREQUENCIES),
  })
  .refine((data) => data.currentAmount <= data.targetAmount, {
    message: "Current amount can't exceed the target",
    path: ["currentAmount"],
  })
  .refine((data) => new Date(data.deadline).getTime() > Date.now(), {
    message: "Deadline must be in the future",
    path: ["deadline"],
  });

type GoalFormInput = z.input<typeof goalSchema>;
type GoalValues = z.output<typeof goalSchema>;
function formatNaira(amount: number) {
  return `₦${Math.max(0, Math.round(amount)).toLocaleString("en-NG")}`;
}

export default function NewGoalPage() {
  const router = useRouter();

  const {
  register,
  handleSubmit,
  watch,
  formState: { errors, isSubmitting },
} = useForm<GoalFormInput, any, GoalValues>({
  resolver: zodResolver(goalSchema),
  mode: "onBlur",
  defaultValues: {
    currentAmount: 0,
    frequency: "Monthly",
  },
});

  const target = watch("targetAmount");
  const current = watch("currentAmount");
  const deadline = watch("deadline");
  const frequency = watch("frequency");

  const monthlyNeeded = useMemo(() => {
    const targetNum = Number(target) || 0;
    const currentNum = Number(current) || 0;
    const remaining = targetNum - currentNum;

    if (!deadline || remaining <= 0) return 0;

    const deadlineDate = new Date(deadline);
    const now = new Date();
    const msRemaining = deadlineDate.getTime() - now.getTime();
    if (msRemaining <= 0) return 0;

    const monthsRemaining = Math.max(
      msRemaining / (1000 * 60 * 60 * 24 * 30.44),
      1 / 30 // avoid divide-by-near-zero for very close deadlines
    );

    return remaining / monthsRemaining;
  }, [target, current, deadline]);

  const onSubmit = async (values: GoalValues) => {
    // TODO: replace with your actual goals endpoint once the goals
    // module controller/DTO are available, e.g.
    // await fetch(`${API_BASE_URL}/goals`, {
    //   method: "POST",
    //   headers: { Authorization: `Bearer ${getToken()}`, "Content-Type": "application/json" },
    //   body: JSON.stringify(values),
    // });
    await new Promise((r) => setTimeout(r, 600));
    console.log("New goal", values);
    router.push("/dashboard");
  };

  return (
    <>
              <DashboardHeader />
      
      <div className="min-h-screen w-full bg-slate-50 px-6 py-6 pt-20 sm:px-10 lg:pl-[calc(250px+2.5rem)] lg:pt-6">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-xl font-semibold text-slate-800">
              Create a New Goal
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Let&apos;s build a plan for your financial future, step by
              step.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-slate-500 hover:bg-slate-50"
              aria-label="Notifications"
            >
              <Bell size={16} />
            </button>
            <a
              href="/settings"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-slate-500 hover:bg-slate-50"
              aria-label="Settings"
            >
              <Settings size={16} />
            </a>
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-amber-400 text-xs font-bold text-white">
              U
            </div>
          </div>
        </div>

        {/* Form + projection */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="mt-8 grid gap-6 lg:grid-cols-3"
        >
          {/* Form card */}
          <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm lg:col-span-2">
            <div className="grid gap-5 sm:grid-cols-2">
              {/* Goal Name */}
              <div>
                <label className="mb-1.5 block text-xs font-medium text-slate-600">
                  Goal Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Annual Rent"
                  {...register("goalName")}
                  className={`w-full rounded-lg border bg-white px-3.5 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 outline-none transition focus:ring-2 ${
                    errors.goalName
                      ? "border-red-400 focus:border-red-400 focus:ring-red-100"
                      : "border-slate-200 focus:border-teal-500 focus:ring-teal-100"
                  }`}
                />
                {errors.goalName && (
                  <p className="mt-1 text-[11px] text-red-600">
                    {errors.goalName.message}
                  </p>
                )}
              </div>

              {/* Category */}
              <div>
                <label className="mb-1.5 block text-xs font-medium text-slate-600">
                  Category
                </label>
                <select
                  defaultValue=""
                  {...register("category")}
                  className={`w-full rounded-lg border bg-white px-3.5 py-2.5 text-sm text-slate-800 outline-none transition focus:ring-2 ${
                    errors.category
                      ? "border-red-400 focus:border-red-400 focus:ring-red-100"
                      : "border-slate-200 focus:border-teal-500 focus:ring-teal-100"
                  }`}
                >
                  <option value="" disabled>
                    Select a category
                  </option>
                  {CATEGORIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
                {errors.category && (
                  <p className="mt-1 text-[11px] text-red-600">
                    {errors.category.message}
                  </p>
                )}
              </div>

              {/* Target Amount */}
              <div>
                <label className="mb-1.5 block text-xs font-medium text-slate-600">
                  Target Amount (₦)
                </label>
                <div className="relative">
                  <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-sm text-slate-400">
                    ₦
                  </span>
                  <input
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    {...register("targetAmount")}
                    className={`w-full rounded-lg border bg-white py-2.5 pl-8 pr-3.5 text-sm text-slate-800 placeholder:text-slate-400 outline-none transition focus:ring-2 ${
                      errors.targetAmount
                        ? "border-red-400 focus:border-red-400 focus:ring-red-100"
                        : "border-slate-200 focus:border-teal-500 focus:ring-teal-100"
                    }`}
                  />
                </div>
                {errors.targetAmount && (
                  <p className="mt-1 text-[11px] text-red-600">
                    {errors.targetAmount.message}
                  </p>
                )}
              </div>

              {/* Current Amount */}
              <div>
                <label className="mb-1.5 block text-xs font-medium text-slate-600">
                  Current Amount (₦)
                </label>
                <div className="relative">
                  <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-sm text-slate-400">
                    ₦
                  </span>
                  <input
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    {...register("currentAmount")}
                    className={`w-full rounded-lg border bg-white py-2.5 pl-8 pr-3.5 text-sm text-slate-800 placeholder:text-slate-400 outline-none transition focus:ring-2 ${
                      errors.currentAmount
                        ? "border-red-400 focus:border-red-400 focus:ring-red-100"
                        : "border-slate-200 focus:border-teal-500 focus:ring-teal-100"
                    }`}
                  />
                </div>
                {errors.currentAmount && (
                  <p className="mt-1 text-[11px] text-red-600">
                    {errors.currentAmount.message}
                  </p>
                )}
              </div>

              {/* Deadline */}
              <div>
                <label className="mb-1.5 block text-xs font-medium text-slate-600">
                  Deadline
                </label>
                <div className="relative">
                  <input
                    type="date"
                    {...register("deadline")}
                    className={`w-full rounded-lg border bg-white px-3.5 py-2.5 pr-10 text-sm text-slate-800 outline-none transition focus:ring-2 ${
                      errors.deadline
                        ? "border-red-400 focus:border-red-400 focus:ring-red-100"
                        : "border-slate-200 focus:border-teal-500 focus:ring-teal-100"
                    }`}
                  />
                  <CalendarDays
                    size={16}
                    className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                  />
                </div>
                {errors.deadline && (
                  <p className="mt-1 text-[11px] text-red-600">
                    {errors.deadline.message}
                  </p>
                )}
              </div>

              {/* Contribution Frequency */}
              <div>
                <label className="mb-1.5 block text-xs font-medium text-slate-600">
                  Contribution Frequency
                </label>
                <select
                  {...register("frequency")}
                  className="w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-800 outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-100"
                >
                  {FREQUENCIES.map((f) => (
                    <option key={f} value={f}>
                      {f}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-8 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => router.back()}
                className="rounded-lg border border-slate-300 px-6 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="rounded-lg bg-slate-900 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting ? "Creating…" : "Create Goal"}
              </button>
            </div>
          </div>

          {/* Projection card */}
          <div className="flex flex-col gap-4">
            <div className="rounded-2xl border border-teal-100 bg-teal-50/60 p-5">
              <p className="text-sm font-semibold text-slate-700">
                You need to save
              </p>
              <p className="mt-2 text-3xl font-bold text-teal-700">
                {formatNaira(monthlyNeeded)}
              </p>
              <p className="mt-1 text-xs text-slate-500">
                Per {frequency === "Monthly" ? "month" : frequency.toLowerCase().replace(/ly$/, "")}{" "}
                to reach your goal.
              </p>
            </div>

            <div className="flex items-start gap-2 rounded-2xl border border-slate-100 bg-white p-4">
              <Info size={15} className="mt-0.5 shrink-0 text-slate-400" />
              <p className="text-xs leading-relaxed text-slate-500">
                Based on your inputs, this is a linear projection. Setting up
                auto-save can help you stay on track effortlessly.
              </p>
            </div>
          </div>
        </form>
         {/* ================= FOOTER ================= */}
                <footer className="mt-12 border-t border-slate-200 py-6">
                  <div className="flex items-center gap-2">
                    <Image
                      src={logo}
                      alt="SafeNest logo"
                      className="h-6 w-6 object-contain"
                      priority
                    />
                    <span className="text-base font-bold tracking-tight text-[#123b65]">
                      Safe<span className="text-[#22a7a4]">Nest</span>
                    </span>
                  </div>
      
                  <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-xs text-slate-500">
                      Funds remain with licensed financial institutions. SafeNest does
                      not hold user funds.
                    </p>
      
                    <nav className="flex items-center gap-6 text-xs font-medium text-[#12355B]">
                      <Link href="/security" className="transition hover:text-teal-700">
                        Security
                      </Link>
                      <Link href="/privacy" className="transition hover:text-teal-700">
                        Privacy Policy
                      </Link>
                      <Link href="/terms" className="transition hover:text-teal-700">
                        Terms of service
                      </Link>
                    </nav>
                  </div>
                </footer>
        
      </div>
      
    </>
  );
}