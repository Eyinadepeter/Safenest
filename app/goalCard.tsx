import type { LucideIcon } from "lucide-react";

interface GoalCardProps {
  icon: LucideIcon;
  category: string;
  title: string;
  subtitle: string;
  status: "On Track" | "At Risk";
  currentAmount: number;
  targetAmount: number;
  pct: number;
  amountLeftLabel: string;
}

/**
 * Individual goal card used in the "Active Goals" grid on the dashboard
 * Home page. Shows a category badge, status pill, progress bar, and an
 * "Add Funds" CTA. Color scheme (teal vs red) is driven by `status`.
 */
export default function GoalCard({
  icon: Icon,
  category,
  title,
  subtitle,
  status,
  currentAmount,
  targetAmount,
  pct,
  amountLeftLabel,
}: GoalCardProps) {
  const isAtRisk = status === "At Risk";

  return (
    <div
      className={`rounded-2xl border p-6 ${
        isAtRisk ? "border-red-200" : "border-slate-200"
      }`}
    >
      <div className="flex items-center justify-between">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
          <Icon className="h-3.5 w-3.5" />
          {category}
        </span>
        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${
            isAtRisk ? "bg-red-50 text-red-600" : "bg-emerald-50 text-emerald-700"
          }`}
        >
          {status}
        </span>
      </div>

      <h3 className="mt-4 text-xl font-bold text-navy">{title}</h3>
      <p className="mt-1 text-sm text-slate-500">{subtitle}</p>

      <div className="mt-4 flex items-baseline gap-2">
        <span className="text-2xl font-bold text-navy">
          ₦{currentAmount.toLocaleString()}
        </span>
        <span className="text-sm text-slate-400">
          of ₦{targetAmount.toLocaleString()}
        </span>
      </div>

      <div className="mt-3 flex items-center gap-3">
        <span className="text-xs font-semibold text-slate-500">{pct}%</span>
        <div className="h-2 flex-1 overflow-hidden rounded-full bg-slate-100">
          <div
            className={`h-full rounded-full ${isAtRisk ? "bg-red-500" : "bg-teal-dark"}`}
            style={{ width: `${Math.min(100, Math.max(0, pct))}%` }}
          />
        </div>
        <span className="text-xs font-medium text-slate-400">{amountLeftLabel}</span>
      </div>

      <button
        type="button"
        className="mt-5 w-full rounded-lg bg-navy py-3 text-sm font-semibold text-white transition hover:bg-navy/90"
      >
        Add Funds
      </button>
    </div>
  );
}
