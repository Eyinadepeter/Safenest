"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Info } from "lucide-react";

import { getCurrentDemoAccount } from "../../../lib/demo-auth";
import DashboardHeader from "../../../components/DashboardHeader";
import DashboardTopBar from "../../../components/DashboardTopBar";
import {
  simulateGoalScenario,
  createGoal,
  type ContributionFrequency,
  type CreateGoalPayload,
} from "../../../lib/goalCalculationApi";

const CATEGORY_OPTIONS: { value: CreateGoalPayload["category"]; label: string }[] = [
  { value: "RENT", label: "Rent" },
  { value: "SCHOOL_FEES", label: "School Fees" },
  { value: "EMERGENCY", label: "Emergency" },
  { value: "VACATION", label: "Vacation" },
  { value: "CAPITAL", label: "Capital" },
  { value: "HOME", label: "Home" },
];

const FREQUENCY_OPTIONS: { value: ContributionFrequency; label: string }[] = [
  { value: "DAILY", label: "Daily" },
  { value: "WEEKLY", label: "Weekly" },
  { value: "MONTHLY", label: "Monthly" },
];

export default function NewGoalPage() {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const current = getCurrentDemoAccount();
    if (!current) {
      router.replace("/signin");
      return;
    }
    setIsLoading(false);
  }, [router]);

  // Form fields
  const [goalName, setGoalName] = useState("");
  const [category, setCategory] =
    useState<CreateGoalPayload["category"] | "">("");
  const [targetAmount, setTargetAmount] = useState("");
  const [currentAmount, setCurrentAmount] = useState("");
  const [deadline, setDeadline] = useState("");
  const [frequency, setFrequency] = useState<ContributionFrequency>("MONTHLY");

  // Live projection (right panel)
  const [requiredContribution, setRequiredContribution] = useState<
    number | null
  >(null);
  const [projectionNote, setProjectionNote] = useState<string | null>(null);

  // Create-goal submit state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Recalculate the "you need to save" panel as inputs change, debounced
  // so we're not firing a request per keystroke.
  useEffect(() => {
    const amount = Number(targetAmount);
    const isDeadlineValid =
      deadline.length > 0 && new Date(deadline) > new Date();

    if (!amount || amount <= 0 || !isDeadlineValid) {
      setRequiredContribution(null);
      setProjectionNote(null);
      return;
    }

    const handle = setTimeout(async () => {
      try {
        const result = await simulateGoalScenario({
          targetAmount: amount,
          deadline,
          frequency,
          currentAmount: Number(currentAmount) || 0,
        });
        setRequiredContribution(result.requiredContributionPerPeriod);
        setProjectionNote(null);
      } catch (err) {
        setRequiredContribution(null);
        setProjectionNote(
          err instanceof Error ? err.message : "Couldn't calculate a plan."
        );
      }
    }, 500);

    return () => clearTimeout(handle);
  }, [targetAmount, currentAmount, deadline, frequency]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    if (!goalName || !category || !targetAmount || !deadline) {
      setSubmitError("Please fill in all required fields.");
      return;
    }

    setIsSubmitting(true);
    try {
      await createGoal({
        goalName,
        category,
        targetAmount: Number(targetAmount),
        deadline,
        contributionFrequency: frequency,
        preferredContribution: Number(currentAmount) || undefined,
      });
      router.push("/dashboard");
    } catch (err) {
      setSubmitError(
        err instanceof Error ? err.message : "Something went wrong."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <p className="text-sm text-slate-400">Loading...</p>
      </div>
    );
  }

  const frequencyLabel =
    FREQUENCY_OPTIONS.find((f) => f.value === frequency)?.label.toLowerCase() ??
    "month";

  return (
    <div className="min-h-screen bg-white">
      <DashboardHeader />

      <main className="w-full px-4 pb-10 pt-20 sm:px-6 lg:ml-[250px] lg:w-[calc(100%-250px)] lg:px-8 lg:pt-8 xl:px-10">
        <div className="mx-auto max-w-7xl">
          <DashboardTopBar
            title="Create a New Goal"
            subtitle="Let's build a plan for your financial future, step by step."
          />

          <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-[1fr_360px]">
            <form
              onSubmit={handleSubmit}
              className="rounded-2xl border border-slate-200 p-6 sm:p-8"
            >
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <label className="block text-sm font-bold text-navy">
                  Goal Name
                  <input
                    type="text"
                    placeholder="e.g, Annual Rent"
                    value={goalName}
                    onChange={(e) => setGoalName(e.target.value)}
                    className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3 text-sm text-navy placeholder:text-slate-400 focus:border-teal-dark focus:outline-none"
                  />
                </label>

                <label className="block text-sm font-bold text-navy">
                  Category
                  <select
                    value={category}
                    onChange={(e) =>
                      setCategory(
                        e.target.value as CreateGoalPayload["category"]
                      )
                    }
                    className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3 text-sm text-navy focus:border-teal-dark focus:outline-none"
                  >
                    <option value="">Select a category</option>
                    {CATEGORY_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="block text-sm font-bold text-navy">
                  Target Amount (₦)
                  <input
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    value={targetAmount}
                    onChange={(e) => setTargetAmount(e.target.value)}
                    className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3 text-sm text-navy placeholder:text-slate-400 focus:border-teal-dark focus:outline-none"
                  />
                </label>

                <label className="block text-sm font-bold text-navy">
                  Current Amount (₦)
                  <input
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    value={currentAmount}
                    onChange={(e) => setCurrentAmount(e.target.value)}
                    className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3 text-sm text-navy placeholder:text-slate-400 focus:border-teal-dark focus:outline-none"
                  />
                </label>

                <label className="block text-sm font-bold text-navy">
                  Deadline
                  <input
                    type="date"
                    value={deadline}
                    onChange={(e) => setDeadline(e.target.value)}
                    className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3 text-sm text-navy focus:border-teal-dark focus:outline-none"
                  />
                </label>

                <label className="block text-sm font-bold text-navy">
                  Contribution Frequency
                  <select
                    value={frequency}
                    onChange={(e) =>
                      setFrequency(e.target.value as ContributionFrequency)
                    }
                    className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3 text-sm text-navy focus:border-teal-dark focus:outline-none"
                  >
                    {FREQUENCY_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </label>
              </div>

              {submitError && (
                <p className="mt-6 text-sm text-red-600">{submitError}</p>
              )}

              <div className="mt-8 flex items-center gap-4">
                <Link
                  href="/dashboard"
                  className="rounded-lg border border-slate-300 px-6 py-3 text-sm font-semibold text-navy transition hover:bg-slate-50"
                >
                  Cancel
                </Link>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="rounded-lg bg-navy px-6 py-3 text-sm font-semibold text-white transition hover:bg-navy/90 disabled:opacity-60"
                >
                  {isSubmitting ? "Creating..." : "Create Goal"}
                </button>
              </div>
            </form>

            <aside className="h-fit rounded-2xl bg-mint p-8">
              <p className="text-sm font-medium text-navy/60">
                You need to save
              </p>
              <p className="mt-2 text-3xl font-extrabold text-teal-dark">
                ₦
                {requiredContribution
                  ? requiredContribution.toLocaleString()
                  : "0"}
              </p>
              <p className="mt-1 text-sm text-navy/60">
                Per {frequencyLabel} to reach your goal.
              </p>

              {projectionNote && (
                <p className="mt-4 text-xs text-red-600">{projectionNote}</p>
              )}

              <div className="mt-8 flex items-start gap-2 rounded-lg border border-teal-dark/30 bg-white/60 p-4">
                <Info className="mt-0.5 h-4 w-4 shrink-0 text-teal-dark" />
                <p className="text-xs leading-relaxed text-navy/70">
                  Based on your inputs, this is a linear projection. Setting
                  up auto-save can help you stay on track effortlessly.
                </p>
              </div>
            </aside>
          </div>
        </div>

        <div className="mx-auto mt-16 max-w-7xl border-t border-slate-200 pt-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs text-slate-500">
              Funds remain with licensed financial institutions. SafeNest
              does not hold user funds.
            </p>
            <div className="flex items-center gap-6 text-xs font-medium text-navy">
              <Link href="#">Security</Link>
              <Link href="#">Privacy Policy</Link>
              <Link href="#">Terms of service</Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
