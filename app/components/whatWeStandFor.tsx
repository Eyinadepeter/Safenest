import { coreValues } from "./coreValuesData";

// Approximate gradient treatment per value, matching the design's
// asymmetric card grid (not brand tokens — these are illustrative
// "brand personality" colors distinct from the rest of the site palette).
const cardStyles: Record<string, { className: string; text: string }> = {
  Trust: {
    className: "bg-gradient-to-br from-emerald-800 to-emerald-950",
    text: "text-white",
  },
  Consistency: {
    className: "bg-gradient-to-br from-slate-200 to-slate-400",
    text: "text-navy",
  },
  Simplicity: {
    className: "bg-gradient-to-br from-orange-400 to-amber-300",
    text: "text-navy",
  },
  Progress: {
    className: "bg-gradient-to-br from-teal-300 to-cyan-500",
    text: "text-navy",
  },
};

export default function WhatWeStandFor() {
  return (
    <section className="mx-auto max-w-[1320px] px-6 py-20 md:px-10">
      <div className="text-center">
        <h2 className="text-3xl font-extrabold text-navy md:text-4xl">
          What we stand for
        </h2>
        <p className="mt-3 text-[15px] text-navy/70">
          The principles behind every plan we help you build.
        </p>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-3">
        {coreValues.map((value) => {
          const style = cardStyles[value.title] ?? cardStyles.Trust;
          const isProgress = value.title === "Progress";
          return (
            <div
              key={value.number}
              className={`rounded-2xl p-8 ${style.className} ${
                isProgress ? "md:col-start-2" : ""
              }`}
            >
              <h3 className={`text-lg font-bold uppercase ${style.text}`}>
                {value.title}
              </h3>
              <p className={`mt-3 text-sm leading-relaxed ${style.text} opacity-90`}>
                {value.shortDescription}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
