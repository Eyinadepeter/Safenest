const stats = [
  {
    value: "74.7%",
    description:
      "prefer breaking goals into monthly steps over saving a lump sum",
  },
  {
    value: "97%",
    description:
      "plan ahead instead of relying on loans when big bills are due",
  },
  {
    value: "₦0",
    description: "held by SafeNest, your money always stays in your own bank",
  },
];

export default function StatsSection() {
  return (
    <section className="mx-auto max-w-[1320px] px-6 pb-6 md:px-10">
      <div className="rounded-3xl bg-navy px-6 py-14 text-center md:px-16">
        <p className="text-sm font-bold uppercase tracking-wide text-teal">
          Backed by real behavior
        </p>
        <h2 className="mx-auto mt-3 max-w-2xl text-2xl font-extrabold leading-snug text-white md:text-3xl">
          People don&apos;t want another wallet. They want a plan that actually
          works.
        </h2>

        <div className="mt-10 grid grid-cols-1 divide-y divide-white/15 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {stats.map((stat) => (
            <div key={stat.value} className="px-6 py-6 sm:py-0">
              <p className="text-4xl font-extrabold text-white md:text-5xl">
                {stat.value}
              </p>
              <p className="mx-auto mt-3 max-w-[220px] text-sm text-white/70">
                {stat.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
