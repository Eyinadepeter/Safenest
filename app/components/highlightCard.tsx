import type { LucideIcon } from "lucide-react";
import Image, { type StaticImageData } from "next/image";

interface HighlightCardProps {
  /** Lucide icon, wrapped in a colored circle. Omit when using `iconImage`. */
  icon?: LucideIcon;
  /**
   * A self-contained badge image (already circular/complete artwork) —
   * rendered as-is, without the extra circle wrapper `icon` gets, so it
   * doesn't end up double-circled. Provide exactly one of `icon` /
   * `iconImage`.
   */
  iconImage?: StaticImageData | string;
  iconTone?: "teal" | "amber";
  title: string;
  description: string;
  footnote?: string;
}

/**
 * Navy rounded card with a centered icon circle, used for "Connect via
 * Read-Only API" and "Goal Achieved!" on How it works.
 */
export default function HighlightCard({
  icon: Icon,
  iconImage,
  iconTone = "teal",
  title,
  description,
  footnote,
}: HighlightCardProps) {
  return (
    <div className="flex h-full flex-col items-center justify-center rounded-3xl bg-navy p-10 text-center">
      {iconImage ? (
        <Image src={iconImage} alt="" className="h-14 w-14 object-contain" />
      ) : Icon ? (
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
      ) : null}
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
