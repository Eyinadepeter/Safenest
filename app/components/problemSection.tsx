const bars = [
  { label: "January", amount: "₦45k", pct: 22, color: "teal" },
  { label: "February", amount: "₦45k", pct: 22, color: "teal" },
  { label: "March", amount: "₦45k", pct: 22, color: "teal" },
  { label: "Rent Due", amount: "₦700k", pct: 90, color: "amber" },
];

export default function ProblemSection() {
  return (
    <section className="mx-auto max-w-[1320px] px-6 py-20 md:px-10">
      <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-16">
        <div>
          <p className="text-sm font-bold uppercase tracking-wide text-teal-dark">
            The Problem
          </p>
          <h2 className="mt-3 text-4xl font-extrabold leading-tight text-navy md:text-5xl">
            Steady Income.
            <br />
            Sudden Bills.
          </h2>
          <p className="mt-5 max-w-md text-[15px] leading-relaxed text-navy/70">
            Rent, school fees, and emergencies rarely arrive in small pieces
            they show up all at once, no matter how consistent your income is.
            Most tools help you store money. SafeNest helps you actually get
            there.
          </p>
        </div>

        <div className="rounded-3xl bg-navy p-8 md:p-10">
          <div className="flex flex-col gap-6">
            {bars.map((bar) => (
              <div key={bar.label} className="flex items-center gap-4">
                <span className="w-20 shrink-0 text-sm text-white/70">
                  {bar.label}
                </span>
                <div className="h-2 flex-1 overflow-hidden rounded-full bg-navy-track">
                  <div
                    className={`h-full rounded-full ${
                      bar.color === "amber" ? "bg-amber" : "bg-teal"
                    }`}
                    style={{ width: `${bar.pct}%` }}
                  />
                </div>
                <span
                  className={`w-16 shrink-0 text-right text-sm font-bold ${
                    bar.color === "amber" ? "text-amber" : "text-white"
                  }`}
                >
                  {bar.amount}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
