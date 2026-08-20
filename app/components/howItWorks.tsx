import { Plus, TrendingUp, ShieldCheck } from "lucide-react";
import Image from "next/image";
import growthChart from "../assets/images/growth-chart-illustration.png";

const steps = [
  {
    icon: Plus,
    label: "Step 1",
    title: "Set your Goals",
    description:
      "Tell us what you're saving for and when it's due rent, school fees, anything. We calculate exactly what you need to save each month.",
  },
  {
    icon: TrendingUp,
    label: "Step 2",
    title: "Stay on track",
    description:
      "Get gentle reminders, honest progress updates, and smart suggestions when you fall behind never judgment, just a nudge forward.",
  },
  {
    icon: ShieldCheck,
    label: "Step 3",
    title: "Hit your goal",
    description:
      "Pay directly from your own bank when the time comes. Celebrate the milestone, then set your next one.",
  },
];

export default function HowItWorks() {
  return (
    <section className="mx-auto max-w-[1320px] px-6 pb-20 md:px-10">
      <div className="grid grid-cols-1 overflow-hidden rounded-3xl md:grid-cols-2">
        {/* Illustration */}
        <div className="relative flex min-h-[360px] items-center justify-center overflow-hidden bg-gradient-to-br from-[#a9d8f7] to-[#d7f3ea] p-6 md:p-10">
          <Image
            src={growthChart}
            alt="Chart showing steady upward savings growth"
            className="h-auto w-full max-w-lg object-contain"
            priority
          />
        </div>

        {/* Steps */}
        <div className="bg-navy p-10 text-white md:p-12">
          <p className="text-sm font-bold uppercase tracking-wide text-teal">
            How it works
          </p>
          <h2 className="mt-3 text-3xl font-extrabold leading-tight md:text-4xl">
            Achieve Your Financial Goals in Three Simple Steps
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-white/70">
            Start saving with confidence. SafeNest makes it easy to plan, save,
            and grow your finances through a simple and secure process.
          </p>

          <div className="mt-8 flex flex-col">
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.title}
                  className={`flex gap-4 py-5 ${
                    i !== steps.length - 1 ? "border-b border-white/15" : ""
                  }`}
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-accent/80">
                    <Icon className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wide text-teal">
                      {step.label}
                    </p>
                    <h3 className="mt-1 text-base font-bold">{step.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-white/70">
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
