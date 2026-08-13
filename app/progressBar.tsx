interface ProgressBarProps {
  label: string;
  amount: string;
  pct: number;
  variant?: "teal" | "amber";
}

/**
 * Shared label + track + fill + amount progress bar. app/problemSection.tsx
 * has its own inline version of this same markup (left as-is since it's
 * reused wholesale, unchanged, on the Why SafeNest page) — this primitive
 * is for new usages like the "Annual Rent" widget on How it works, so we
 * don't re-fork the same bar styling a third time.
 */
export default function ProgressBar({
  label,
  amount,
  pct,
  variant = "teal",
}: ProgressBarProps) {
  return (
    <div className="flex items-center gap-4">
      <span className="shrink-0 text-sm text-navy/60">{label}</span>
      <div className="h-2 flex-1 overflow-hidden rounded-full bg-navy-track/20">
        <div
          className={`h-full rounded-full ${
            variant === "amber" ? "bg-amber" : "bg-teal"
          }`}
          style={{ width: `${Math.min(100, Math.max(0, pct))}%` }}
        />
      </div>
      <span
        className={`shrink-0 text-right text-sm font-bold ${
          variant === "amber" ? "text-amber" : "text-navy"
        }`}
      >
        {amount}
      </span>
    </div>
  );
}
