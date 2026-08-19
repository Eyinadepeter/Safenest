import type { LucideIcon } from "lucide-react";

interface HighlightCardProps {
  icon: LucideIcon;
  iconTone?: "teal" | "amber";
  title: string;
  description: string;
  footnote?: string;
}

/**
 * Navy rounded card with a centered icon circle, used for "Connect via
 * Read-Only API" and "Goal Achieved!" on How it works, and reused again
 * for "Goal Achieved!" on Why SafeNest.
 */
export default function HighlightCard({
  icon: Icon,
  iconTone = "teal",
  title,
  description,
  footnote,
}: HighlightCardProps) {
  return (
    <div className="flex h-full flex-col items-center justify-center rounded-3xl bg-navy p-10 text-center">
      <div
        className={`flex h-14 w-14 items-center justify-center rounded-full ${
          iconTone === "amber" ? "bg-amber" : "bg-white/15"
        }`}
      >
        <Icon
          className={`h-6 w-6 ${
            iconTone === "amber" ? "text-navy" : "text-white"
          }`}
        />
      </div>
      <p className="mt-5 text-base font-bold text-white">{title}</p>
      <p className="mt-2 max-w-xs text-sm leading-relaxed text-white/70">
        {description}
      </p>
      {footnote && (
        <p className="mt-4 text-xs font-medium text-white/50">{footnote}</p>
      )}
    </div>
  );
}
