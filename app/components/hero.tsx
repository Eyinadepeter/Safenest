import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight, Flag } from "lucide-react";

const calendarDays = [
  [1, 2, 3, 4, 5, 6],
  [7, 8, 9, 10, 11, 12, 13],
  [14, 15, 16, 17, 18, 19, 20],
  [21, 22, 23, 24, 25, 26, 27, 28],
  [29, 30, 31],
];

export default function Hero() {
  return (
    <section className="mx-auto max-w-[1320px] px-6 pb-0 md:px-10">
      <div className="relative overflow-hidden rounded-[32px] bg-teal px-6 pt-14 pb-0 md:px-16 md:pt-16">
        {/* decorative background shapes */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[32px]">
          <div className="absolute -left-10 top-24 h-72 w-52 rounded-[40px] bg-white/10" />
          <div className="absolute right-0 top-0 h-64 w-40 rounded-bl-[60px] bg-white/10" />
          <div className="absolute right-24 top-10 h-80 w-24 rounded-[40px] bg-white/10" />
        </div>

        <div className="relative text-center">
          <h1 className="mx-auto max-w-3xl text-4xl font-extrabold leading-tight text-navy md:text-5xl">
            Turn big goals into
            <br />
            simple <span className="text-blue-accent">monthly steps</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-[15px] font-medium leading-relaxed text-navy/90 md:text-base">
            SafeNest breaks down Financial Goals, and life&apos;s biggest
            expenses into a plan you can actually stick to with reminders,
            insights, and encouragement along the way
          </p>

          <div className="mt-8 flex items-center justify-center gap-4">
            <Link
              href="/signup"
              className="rounded-lg bg-navy px-6 py-3 text-sm font-semibold text-white transition hover:bg-navy/90"
            >
              Start Planning
            </Link>
            <Link
              href="/how-it-works"
              className="flex items-center gap-2 rounded-lg border border-navy/30 px-6 py-3 text-sm font-semibold text-navy transition hover:bg-white/20"
            >
              See how it works
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        {/* media row */}
        <div className="relative mt-14 grid grid-cols-1 items-end gap-0 md:grid-cols-[1fr_1.1fr_1fr]">
          {/* left: badge + blank card */}
          <div className="relative flex flex-col items-start">
            <span className="z-5 mb-[-9px] inline-block rounded-t-xl bg-navy px-13 py-3 text-sm font-semibold text-white">
              Your Financial Accountability Partner
            </span>
            <div className="h-64 w-full max-w-sm rounded-t-2xl rounded-br-2xl bg-white md:h-72" />
          </div>

          {/* center: man photo */}
          <div className="relative mx-auto h-64 w-full max-w-sm overflow-hidden rounded-t-2xl md:h-80">
            <Image
              src="/images/hero-man.png"
              alt="Man smiling while checking his phone at home"
              fill
              className="object-cover object-top"
              priority
            />
          </div>

          {/* right: calendar widget */}
          <div className="mx-auto w-full max-w-xs overflow-hidden rounded-t-2xl bg-[#0c1f33] p-4 text-white md:ml-auto">
            <div className="mb-3 flex items-center justify-between">
              <ChevronLeft className="h-4 w-4 text-white/60" />
              <ChevronRight className="h-4 w-4 text-white/60" />
            </div>
            <div className="grid grid-cols-7 gap-y-2 text-center text-[11px]">
              {["S", "M", "T", "W", "T", "F", "S"].map((d) => (
                <span key={d} className="text-white/50">
                  {d}
                </span>
              ))}
              {calendarDays.flat().map((day, i) => {
                const isSelected = day === 2 && i < 7;
                const isToday = day === 18;
                const isFlag = day === 19;
                return (
                  <span
                    key={`${day}-${i}`}
                    className={`relative flex h-7 items-center justify-center rounded-md ${
                      isSelected ? "bg-white/20" : ""
                    } ${isToday ? "ring-2 ring-amber" : ""}`}
                  >
                    {day}
                    {isFlag && (
                      <Flag className="absolute -top-1 right-0 h-3 w-3 text-amber" />
                    )}
                  </span>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
