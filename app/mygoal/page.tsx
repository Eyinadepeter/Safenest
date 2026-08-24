"use client";

import { useEffect, useMemo, useState } from "react";
import { Search, Plus, MoreVertical, PiggyBank } from "lucide-react";
import Link from "next/link";
import DashboardHeader from "../components/DashboardHeader";
import { getStoredGoals, formatNaira, type StoredGoal } from "../lib/goals";

/* ---------------------------------------------------------------- */
/* Design tokens                                                     */
/* ---------------------------------------------------------------- */
const COLOR = {
  navy: "#0F2A47",
  navyDeep: "#091B2E",
  teal: "#1F9A93",
  tealSoft: "#E3F5F3",
  tealText: "#127C74",
  amber: "#E8A33D",
  amberSoft: "#FBF0DD",
  amberText: "#B4740C",
  mist: "#F3F6F8",
  ink: "#16324F",
  slate: "#64748B",
  line: "#E4E9EE",
};

type Status = "On Track" | "At Risk" | "Completed";

type DisplayGoal = {
  id: string;
  title: string;
  description: string;
  category: string;
  target: string;
  saved: string;
  progress: number;
  deadlineLabel: string;
  deadlineDate: Date;
  status: Status;
  icon: string;
};

const CATEGORY_ICON: Record<string, string> = {
  Rent: "🏠",
  Education: "🎓",
  "Emergency Fund": "💼",
  Travel: "✈️",
  Wedding: "💍",
  Personal: "👤",
  Other: "📌",
};

const STATUS_STYLES: Record<Status, { bg: string; text: string; ring: string }> = {
  "On Track": { bg: COLOR.tealSoft, text: COLOR.tealText, ring: COLOR.teal },
  "At Risk": { bg: COLOR.amberSoft, text: COLOR.amberText, ring: COLOR.amber },
  Completed: { bg: `${COLOR.navy}1A`, text: COLOR.navy, ring: COLOR.navy },
};

/* ---------------------------------------------------------------- */
/* Helpers                                                           */
/* ---------------------------------------------------------------- */
function ordinal(day: number) {
  if (day > 3 && day < 21) return "th";
  switch (day % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
}

function formatDeadlineLabel(dateStr: string) {
  const date = new Date(dateStr);
  const month = date.toLocaleString("en-US", { month: "short" });
  const day = date.getDate();
  const year = date.getFullYear();
  return `${month} ${day}${ordinal(day)}\n${year}`;
}

function computeStatus(progress: number, deadline: Date): Status {
  if (progress >= 100) return "Completed";
  const daysRemaining =
    (deadline.getTime() - Date.now()) / (1000 * 60 * 60 * 24);
  if (daysRemaining <= 0) return "At Risk";
  if (daysRemaining <= 30 && progress < 70) return "At Risk";
  return "On Track";
}

function toDisplayGoal(goal: StoredGoal): DisplayGoal {
  const progress =
    goal.targetAmount > 0
      ? Math.min(100, Math.round((goal.currentAmount / goal.targetAmount) * 100))
      : 0;
  const deadlineDate = new Date(goal.deadline);
  const status = computeStatus(progress, deadlineDate);

  return {
    id: goal.id,
    title: goal.goalName,
    description: goal.category,
    category: goal.category,
    target: formatNaira(goal.targetAmount),
    saved: formatNaira(goal.currentAmount),
    progress,
    deadlineLabel: formatDeadlineLabel(goal.deadline),
    deadlineDate,
    status,
    icon: CATEGORY_ICON[goal.category] ?? "📌",
  };
}

/* ---------------------------------------------------------------- */
/* Signature element — the Nest Ring                                 */
/* A twig-textured base ring with a solid progress arc, doubling as  */
/* the goal's avatar. This is SafeNest's one deliberate visual risk. */
/* ---------------------------------------------------------------- */
function NestRing({
  progress,
  status,
  icon,
  size = 44,
}: {
  progress: number;
  status: Status;
  icon: string;
  size?: number;
}) {
  const stroke = size < 40 ? 3 : 3.5;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - progress / 100);
  const color = STATUS_STYLES[status].ring;

  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="-rotate-90"
      >
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#CBD5E1"
          strokeWidth={stroke}
          strokeDasharray="0.5 3.2"
          strokeLinecap="round"
          opacity={0.7}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={stroke}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{ transition: "stroke-dashoffset 500ms ease" }}
        />
      </svg>
      <span
        className="absolute inset-0 flex items-center justify-center"
        style={{ fontSize: size * 0.36 }}
      >
        {icon}
      </span>
    </div>
  );
}

function ProgressBar({ progress, status }: { progress: number; status: Status }) {
  return (
    <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-200">
      <div
        className="h-full rounded-full transition-all"
        style={{ width: `${progress}%`, backgroundColor: STATUS_STYLES[status].ring }}
      />
    </div>
  );
}

function StatusPill({ status }: { status: Status }) {
  const s = STATUS_STYLES[status];
  return (
    <span
      className="inline-flex w-fit items-center gap-1 whitespace-nowrap rounded-full px-2.5 py-1.5 text-[8px] font-semibold"
      style={{ backgroundColor: s.bg, color: s.text }}
    >
      <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: s.text }} />
      {status}
    </span>
  );
}

function CategoryTag({ category }: { category: string }) {
  return (
    <span
      className="w-fit whitespace-nowrap rounded-full border px-2.5 py-1.5 text-[8px] font-medium uppercase tracking-wide"
      style={{ borderColor: COLOR.line, backgroundColor: COLOR.mist, color: COLOR.ink }}
    >
      {category}
    </span>
  );
}

const FILTERS: ("All Goals" | Status)[] = [
  "All Goals",
  "On Track",
  "At Risk",
  "Completed",
];

/* ---------------------------------------------------------------- */
/* Page                                                               */
/* ---------------------------------------------------------------- */
export default function GoalsPage() {
  const [goals, setGoals] = useState<DisplayGoal[]>([]);
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] =
    useState<(typeof FILTERS)[number]>("All Goals");

  useEffect(() => {
    setGoals(getStoredGoals().map(toDisplayGoal));
  }, []);

  const filteredGoals = useMemo(() => {
    return goals.filter((goal) => {
      const matchesSearch = goal.title
        .toLowerCase()
        .includes(search.trim().toLowerCase());
      const matchesFilter =
        activeFilter === "All Goals" || goal.status === activeFilter;
      return matchesSearch && matchesFilter;
    });
  }, [goals, search, activeFilter]);

  const summary = useMemo(() => {
    const activeGoals = goals.filter((g) => g.status !== "Completed").length;
    const totalSaved = goals.reduce(
      (sum, g) => sum + Number(g.saved.replace(/[^\d.-]/g, "")),
      0
    );
    const totalTarget = goals.reduce(
      (sum, g) => sum + Number(g.target.replace(/[^\d.-]/g, "")),
      0
    );
    const upcoming = goals
      .filter((g) => g.status !== "Completed")
      .sort((a, b) => a.deadlineDate.getTime() - b.deadlineDate.getTime())[0];

    return {
      activeGoals,
      totalSaved: formatNaira(totalSaved),
      totalTarget: formatNaira(totalTarget),
      nextDeadline: upcoming
        ? upcoming.deadlineDate.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })
        : "—",
    };
  }, [goals]);

  const summaryItems = [
    { label: "Active goals", value: String(summary.activeGoals) },
    { label: "Total saved", value: summary.totalSaved },
    { label: "Total target", value: summary.totalTarget },
    { label: "Next deadline", value: summary.nextDeadline },
  ];

  return (
    <div
      className="min-h-screen w-full overflow-x-hidden font-[Arial]"
      style={{ backgroundColor: COLOR.mist }}
    >
      <DashboardHeader />

      <main className="w-full px-4 pb-8 pt-20 sm:px-6 md:px-8 lg:ml-64 lg:px-8 lg:pt-24 xl:px-10 2xl:px-12">
        {/* PAGE HEADER */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p
              className="font-[Arial] text-[10px] font-medium uppercase tracking-[0.22em]"
              style={{ color: COLOR.teal }}
            >
              Savings overview
            </p>
            <h1
              className="mt-1 font-[Arial] text-[28px] font-semibold leading-tight sm:text-3xl"
              style={{ color: COLOR.navy }}
            >
              My Goals
            </h1>
            <p className="mt-1.5 text-[13px]" style={{ color: COLOR.slate }}>
              Track and manage all your financial goals in one place.
            </p>
          </div>
        </div>

        {/* SUMMARY STRIP */}
        <div
          className="mt-6 grid grid-cols-2 divide-y sm:grid-cols-4 sm:divide-x sm:divide-y-0 overflow-hidden rounded-2xl border bg-white"
          style={{ borderColor: COLOR.line }}
        >
          {summaryItems.map((item) => (
            <div key={item.label} className="px-5 py-5" style={{ borderColor: COLOR.line }}>
              <p
                className="font-[Arial] text-[10px] font-medium uppercase tracking-[0.14em]"
                style={{ color: COLOR.slate }}
              >
                {item.label}
              </p>
              <p
                className="mt-2 font-[Arial] text-xl font-semibold sm:text-2xl"
                style={{ color: COLOR.ink }}
              >
                {item.value}
              </p>
            </div>
          ))}
        </div>

        {/* SEARCH + FILTERS */}
        <div className="mt-7 flex w-full flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
          <div className="relative w-full xl:max-w-[320px]">
            <Search
              size={14}
              className="absolute left-4 top-1/2 -translate-y-1/2"
              style={{ color: COLOR.slate }}
            />
            <input
              type="text"
              placeholder="Search goals"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-10 w-full rounded-full border bg-white pl-10 pr-4 text-xs outline-none transition placeholder:text-slate-400"
              style={{ borderColor: COLOR.line, color: COLOR.ink }}
              onFocus={(e) => (e.currentTarget.style.borderColor = COLOR.teal)}
              onBlur={(e) => (e.currentTarget.style.borderColor = COLOR.line)}
            />
          </div>

          <div className="flex w-full flex-wrap items-center gap-2 xl:w-auto ">
            {FILTERS.map((filter) => {
              const active = activeFilter === filter;
              return (
                <button
                  key={filter}
                  type="button"
                  onClick={() => setActiveFilter(filter)}
                  className="rounded-2xl px-10 py-4 text-[10px] font-semibold transition"
                  style={
                    active
                      ? { backgroundColor: COLOR.navy, color: "#fff" }
                      : {
                          backgroundColor: "#fff",
                          color: COLOR.slate,
                          border: `1px solid ${COLOR.line}`,
                        }
                  }
                >
                  {filter}
                </button>
              );
            })}

            <Link
              href="/create-goal"
              className="flex items-center justify-center gap-1.5 rounded-full px-4 py-2.5 text-[9px] font-semibold text-white transition"
              style={{ backgroundColor: COLOR.navy }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = COLOR.navyDeep)}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = COLOR.navy)}
            >
              <Plus size={12} />
              Create goal
            </Link>
          </div>
        </div>

        {/* GOALS */}
        <div
          className="mt-6 w-full overflow-hidden rounded-2xl border bg-white"
          style={{ borderColor: COLOR.line }}
        >
          {filteredGoals.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-3 px-6 py-16 text-center">
              <div
                className="flex h-12 w-12 items-center justify-center rounded-full"
                style={{ backgroundColor: COLOR.tealSoft }}
              >
                <PiggyBank size={20} style={{ color: COLOR.teal }} />
              </div>
              <p
                className="font-[Arial] text-base font-semibold"
                style={{ color: COLOR.ink }}
              >
                {goals.length === 0 ? "Start your first goal" : "No goals match"}
              </p>
              <p className="max-w-xs text-xs" style={{ color: COLOR.slate }}>
                {goals.length === 0
                  ? "Give your savings a target — SafeNest tracks the rest."
                  : "Try another search term or filter."}
              </p>
              {goals.length === 0 && (
                <Link
                  href="/goals/new"
                  className="mt-2 flex items-center gap-1.5 rounded-full px-4 py-2.5 text-[10px] font-semibold text-white transition"
                  style={{ backgroundColor: COLOR.navy }}
                >
                  <Plus size={12} />
                  Create goal
                </Link>
              )}
            </div>
          ) : (
            <>
              {/* ================= DESKTOP TABLE ================= */}
              <div className="hidden lg:block">
                <div
                  className="grid grid-cols-[minmax(180px,2fr)_minmax(100px,1.2fr)_minmax(90px,1fr)_minmax(90px,1fr)_minmax(150px,1.5fr)_minmax(100px,1fr)_minmax(90px,1fr)_35px] gap-4 border-b px-5 py-4"
                  style={{ borderColor: COLOR.line }}
                >
                  {[
                    "Goals",
                    "Category",
                    "Target",
                    "Saved",
                    "Progress",
                    "Deadline",
                    "Status",
                    "Action",
                  ].map((heading) => (
                    <p
                      key={heading}
                      className="text-[9px] font-semibold uppercase tracking-wide"
                      style={{ color: COLOR.slate }}
                    >
                      {heading}
                    </p>
                  ))}
                </div>

                {filteredGoals.map((goal) => (
                  <div
                    key={goal.id}
                    className="grid min-h-[76px] grid-cols-[minmax(180px,2fr)_minmax(100px,1.2fr)_minmax(90px,1fr)_minmax(90px,1fr)_minmax(150px,1.5fr)_minmax(100px,1fr)_minmax(90px,1fr)_35px] items-center gap-4 border-b px-5 py-4 transition last:border-b-0 hover:bg-[#F3F6F8]"
                    style={{ borderColor: COLOR.line }}
                  >
                    <div className="flex min-w-0 items-center gap-3">
                      <NestRing progress={goal.progress} status={goal.status} icon={goal.icon} />
                      <div className="min-w-0">
                        <p className="truncate text-[10px] font-semibold" style={{ color: COLOR.ink }}>
                          {goal.title}
                        </p>
                        <p className="mt-0.5 truncate text-[8px]" style={{ color: COLOR.slate }}>
                          {goal.description}
                        </p>
                      </div>
                    </div>

                    <CategoryTag category={goal.category} />

                    <p
                      className="font-[Arial] text-[9px] font-semibold"
                      style={{ color: COLOR.ink }}
                    >
                      {goal.target}
                    </p>

                    <p
                      className="font-[Arial] text-[9px] font-semibold"
                      style={{ color: COLOR.ink }}
                    >
                      {goal.saved}
                    </p>

                    <div className="flex min-w-0 items-center gap-2">
                      <span
                        className="w-8 shrink-0 font-[Arial] text-[8px] font-semibold"
                        style={{ color: COLOR.ink }}
                      >
                        {goal.progress}%
                      </span>
                      <ProgressBar progress={goal.progress} status={goal.status} />
                    </div>

                    <p
                      className="whitespace-pre-line text-[8px] font-medium leading-tight"
                      style={{ color: COLOR.ink }}
                    >
                      {goal.deadlineLabel}
                    </p>

                    <StatusPill status={goal.status} />

                    <button
                      type="button"
                      aria-label={`Actions for ${goal.title}`}
                      className="flex h-7 w-7 items-center justify-center rounded-md transition hover:bg-slate-100"
                      style={{ color: COLOR.slate }}
                    >
                      <MoreVertical size={14} />
                    </button>
                  </div>
                ))}
              </div>

              {/* ================= TABLET + MOBILE ================= */}
              <div className="lg:hidden">
                {filteredGoals.map((goal) => (
                  <div key={goal.id} className="border-b p-4 last:border-b-0 sm:p-5" style={{ borderColor: COLOR.line }}>
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex min-w-0 items-center gap-3">
                        <NestRing progress={goal.progress} status={goal.status} icon={goal.icon} size={48} />
                        <div className="min-w-0">
                          <h3 className="truncate text-xs font-semibold sm:text-sm" style={{ color: COLOR.ink }}>
                            {goal.title}
                          </h3>
                          <p className="mt-0.5 truncate text-[9px] sm:text-[10px]" style={{ color: COLOR.slate }}>
                            {goal.description}
                          </p>
                        </div>
                      </div>

                      <button
                        type="button"
                        aria-label={`Actions for ${goal.title}`}
                        className="shrink-0 rounded-md p-1 hover:bg-slate-100"
                        style={{ color: COLOR.slate }}
                      >
                        <MoreVertical size={16} />
                      </button>
                    </div>

                    <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-4">
                      <div>
                        <p className="text-[8px]" style={{ color: COLOR.slate }}>
                          Category
                        </p>
                        <div className="mt-1">
                          <CategoryTag category={goal.category} />
                        </div>
                      </div>

                      <div>
                        <p className="text-[8px]" style={{ color: COLOR.slate }}>
                          Target
                        </p>
                        <p
                          className="mt-1 font-[Arial] text-[9px] font-semibold sm:text-[10px]"
                          style={{ color: COLOR.ink }}
                        >
                          {goal.target}
                        </p>
                      </div>

                      <div>
                        <p className="text-[8px]" style={{ color: COLOR.slate }}>
                          Saved
                        </p>
                        <p
                          className="mt-1 font-[Arial] text-[9px] font-semibold sm:text-[10px]"
                          style={{ color: COLOR.ink }}
                        >
                          {goal.saved}
                        </p>
                      </div>

                      <div>
                        <p className="text-[8px]" style={{ color: COLOR.slate }}>
                          Deadline
                        </p>
                        <p
                          className="mt-1 whitespace-pre-line text-[9px] font-medium leading-tight sm:text-[10px]"
                          style={{ color: COLOR.ink }}
                        >
                          {goal.deadlineLabel}
                        </p>
                      </div>
                    </div>

                    <div className="mt-5">
                      <div className="mb-1.5 flex items-center justify-between">
                        <span className="text-[8px]" style={{ color: COLOR.slate }}>
                          Progress
                        </span>
                        <span
                          className="font-[Arial] text-[8px] font-semibold"
                          style={{ color: COLOR.ink }}
                        >
                          {goal.progress}%
                        </span>
                      </div>
                      <ProgressBar progress={goal.progress} status={goal.status} />
                    </div>

                    <div className="mt-4">
                      <StatusPill status={goal.status} />
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        {/* FOOTER */}
        <footer
          className="mt-10 flex flex-col gap-5 border-t py-5 sm:flex-row sm:items-center sm:justify-between"
          style={{ borderColor: COLOR.line }}
        >
          <div className="flex items-start gap-2">
            <div
              className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full"
              style={{ backgroundColor: COLOR.navy }}
            >
              <span className="text-[8px] text-white">✓</span>
            </div>
            <div>
              <p
                className="font-[Arial] text-[9px] font-semibold"
                style={{ color: COLOR.navy }}
              >
                SafeNest
              </p>
              <p className="max-w-[500px] text-[7px] leading-relaxed" style={{ color: COLOR.slate }}>
                Funds remain with licensed financial institutions. SafeNest
                does not hold user funds.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-5 text-[8px]" style={{ color: COLOR.slate }}>
            <button type="button" className="transition hover:opacity-70">
              Security
            </button>
            <button type="button" className="transition hover:opacity-70">
              Privacy Policy
            </button>
            <button type="button" className="transition hover:opacity-70">
              Terms of service
            </button>
          </div>
        </footer>
      </main>
    </div>
  );
}