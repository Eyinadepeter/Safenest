"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { calculateGoalPlan, type GoalPlanResult } from "../lib/goals";

const goalFormSchema = z.object({
  goalName: z.string().min(2, "Give your goal a name"),
  targetAmount: z.coerce
    .number({ message: "Enter an amount" })
    .positive("Target amount must be greater than 0"),
  deadline: z
    .string()
    .min(1, "Pick a deadline")
    .refine((val) => new Date(val) > new Date(), {
      message: "Deadline must be in the future",
    }),
});

type GoalFormInput = z.input<typeof goalFormSchema>;
type GoalFormValues = z.output<typeof goalFormSchema>;

export default function GoalCalculatorForm() {
  const [result, setResult] = useState<GoalPlanResult | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<GoalFormInput, unknown, GoalFormValues>({
    resolver: zodResolver(goalFormSchema),
  });

  const onSubmit = async (values: GoalFormValues) => {
    setSubmitError(null);
    setResult(null);
    try {
      const plan = await calculateGoalPlan({
        goalName: values.goalName,
        targetAmount: values.targetAmount,
        deadline: values.deadline,
      });
      setResult(plan);
    } catch (err) {
      // calculateGoalPlan is currently a stub (no backend endpoint yet),
      // so this will always land here until it's wired up for real.
      setSubmitError(
        err instanceof Error ? err.message : "Something went wrong."
      );
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="rounded-3xl bg-mint p-8 md:p-10"
      noValidate
    >
      <label className="block text-sm font-bold text-navy">
        Goal Name
        <input
          type="text"
          placeholder="e.g, Annual Rent"
          {...register("goalName")}
          className="mt-2 w-full rounded-lg border border-navy/15 bg-white px-4 py-3 text-sm text-navy placeholder:text-navy/40 focus:border-teal-dark focus:outline-none"
        />
      </label>
      {errors.goalName && (
        <p className="mt-1 text-xs text-red-600">{errors.goalName.message}</p>
      )}

      <label className="mt-5 block text-sm font-bold text-navy">
        Target Amount (₦)
        <input
          type="number"
          step="0.01"
          placeholder="0.00"
          {...register("targetAmount")}
          className="mt-2 w-full rounded-lg border border-navy/15 bg-white px-4 py-3 text-sm text-navy placeholder:text-navy/40 focus:border-teal-dark focus:outline-none"
        />
      </label>
      {errors.targetAmount && (
        <p className="mt-1 text-xs text-red-600">
          {errors.targetAmount.message}
        </p>
      )}

      <label className="mt-5 block text-sm font-bold text-navy">
        Deadline
        <input
          type="date"
          {...register("deadline")}
          className="mt-2 w-full rounded-lg border border-navy/15 bg-white px-4 py-3 text-sm text-navy focus:border-teal-dark focus:outline-none"
        />
      </label>
      {errors.deadline && (
        <p className="mt-1 text-xs text-red-600">{errors.deadline.message}</p>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-6 rounded-lg bg-navy px-6 py-3 text-sm font-semibold text-white transition hover:bg-navy/90 disabled:opacity-60"
      >
        {isSubmitting ? "Calculating..." : "Calculate my Plan"}
      </button>

      {submitError && (
        <p className="mt-4 text-sm text-red-600">{submitError}</p>
      )}

      {result && (
        <div className="mt-4 rounded-lg bg-white p-4 text-sm text-navy">
          Save ₦{result.monthlyContribution.toLocaleString()} / month for{" "}
          {result.monthsRemaining} months.
        </div>
      )}
    </form>
  );
}
