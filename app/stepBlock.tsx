import { Check } from "lucide-react";

interface StepBlockProps {
  badge: string;
  title: string;
  description: string;
  checklist: React.ReactNode[];
  align?: "left" | "right";
}

/**
 * "STEP 0X: ..." pill + heading + copy + checkmark bullet list, repeated
 * for each of the 4 steps on the How it works page.
 */
export default function StepBlock({
  badge,
  title,
  description,
  checklist,
  align = "left",
}: StepBlockProps) {
  return (
    <div className={align === "right" ? "md:text-left" : ""}>
      <span className="inline-block rounded-md bg-mint px-3 py-1 text-xs font-bold uppercase tracking-wide text-teal-dark">
        {badge}
      </span>
      <h3 className="mt-4 text-2xl font-extrabold text-navy md:text-3xl">
        {title}
      </h3>
      <p className="mt-3 max-w-lg text-[15px] leading-relaxed text-navy/70">
        {description}
      </p>
      <ul className="mt-5 flex flex-col gap-3">
        {checklist.map((item, i) => (
          <li key={i} className="flex items-start gap-3">
            <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-teal-dark">
              <Check className="h-3 w-3 text-white" />
            </span>
            <span className="text-[15px] leading-relaxed text-navy/80">
              {item}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
