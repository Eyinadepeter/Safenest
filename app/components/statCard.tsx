import type { LucideIcon } from "lucide-react";

interface StatCardProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
  tone?: "positive" | "warning";
}

/**
 * Compact mint stat card used in the dashboard Home top row
 * ("Active Goals", "Goals at Risk").
 */
export default function StatCard({
  icon: Icon,
  label,
  value,
  tone = "positive",
}: StatCardProps) {
  const toneClass = tone === "warning" ? "text-red-600" : "text-emerald-700";

  return (
    <div className="rounded-2xl bg-mint p-5">
      <div className={`flex items-center gap-2 text-xs font-semibold ${toneClass}`}>
        <Icon className="h-4 w-4" />
        {label}
      </div>
      <p className={`mt-2 text-3xl font-bold ${toneClass}`}>{value}</p>
    </div>
  );
}
