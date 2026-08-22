"use client";

import {
  Search,
  Plus,
  MoreVertical,
  Bell,
  Settings,
  UserCircle,
} from "lucide-react";
import DashboardHeader from "../components/DashboardHeader";

const goals = [
  {
    title: "Annual Rent",
    description: "Rent renewal",
    category: "Rent",
    categoryColor: "bg-blue-50 text-blue-700",
    target: "₦700,000",
    saved: "₦450,000",
    progress: 64,
    deadline: "Sept 2nd\n2026",
    status: "On Track",
    statusColor: "bg-emerald-50 text-emerald-600",
    icon: "🏠",
  },
  {
    title: "Education",
    description: "School fees for child",
    category: "Education",
    categoryColor: "bg-blue-50 text-blue-700",
    target: "₦300,000",
    saved: "₦120,000",
    progress: 40,
    deadline: "Nov 1st\n2026",
    status: "At Risk",
    statusColor: "bg-orange-50 text-orange-500",
    icon: "🎓",
  },
  {
    title: "Emergency Funds",
    description: "For unexpected needs",
    category: "Emergency",
    categoryColor: "bg-blue-50 text-blue-700",
    target: "₦500,000",
    saved: "₦500,000",
    progress: 100,
    deadline: "Dec 1st\n2026",
    status: "Completed",
    statusColor: "bg-emerald-50 text-emerald-600",
    icon: "💼",
  },
  {
    title: "Business Capital",
    description: "Grow my business",
    category: "Business Capital",
    categoryColor: "bg-blue-50 text-blue-700",
    target: "₦500,000",
    saved: "₦80,000",
    progress: 16,
    deadline: "Nov 31st\n2026",
    status: "At Risk",
    statusColor: "bg-red-50 text-red-500",
    icon: "💼",
  },
];

function SummaryCard({
  icon,
  title,
  value,
  iconBg,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
  iconBg: string;
}) {
  return (
    <div
      className={`flex min-h-[72px] items-center gap-3 rounded-xl px-4 py-3 ${iconBg}`}
    >
      
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/80">
        {icon}
      </div>

      <div className="min-w-0">
        <p className="text-[10px] font-medium text-slate-500">
          {title}
        </p>

        <p className="mt-0.5 truncate text-sm font-bold text-slate-800">
          {value}
        </p>
      </div>
    </div>
  );
}

export default function GoalsPage() {
  return (
    
<div className="min-h-screen w-full bg-[#f8fafc] lg:ml-[250px]">  
        <DashboardHeader />
      {/* ================= TOP HEADER ================= */}
<header className="fixed left-0 right-0 top-0 z-30 flex h-16 items-center justify-end gap-5 border-b border-slate-100 bg-white px-5 shadow-sm sm:px-8 lg:left-[250px] lg:px-10">  
        <button
          type="button"
          className="text-slate-600 transition hover:text-[#12355B]"
          aria-label="Notifications"
        >
          <Bell size={17} />
        </button>

        <button
          type="button"
          className="text-slate-600 transition hover:text-[#12355B]"
          aria-label="Settings"
        >
          <Settings size={17} />
        </button>

        <button
          type="button"
          className="text-slate-600 transition hover:text-[#12355B]"
          aria-label="Profile"
        >
          <UserCircle size={20} /> 
        </button>
      </header>

      {/* ================= CONTENT ================= */}
<main className="w-full px-4 pb-6 pt-24 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16">        {/* ================= PAGE HEADER ================= */}
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-xl font-bold text-slate-900 sm:text-2xl">
              My Goals
            </h1>

            <p className="mt-1 text-[11px] text-slate-400 sm:text-xs">
              Track and manage all your financial goals in one place.
            </p>
          </div>
        </div>

        {/* ================= SUMMARY CARDS ================= */}
        <div className="mt-6 grid w-full grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <SummaryCard
            title="Active Goals"
            value="4"
            icon={
              <span className="text-sm text-[#12355B]">
                ◉
              </span>
            }
            iconBg="bg-[#dff3f1]"
          />

          <SummaryCard
            title="Total Saved"
            value="₦450,000"
            icon={
              <span className="text-sm font-bold text-[#12355B]">
                ₦
              </span>
            }
            iconBg="bg-[#edf5fb]"
          />

          <SummaryCard
            title="Total Target"
            value="₦2,000,000"
            icon={
              <span className="text-sm font-bold text-[#12355B]">
                ▣
              </span>
            }
            iconBg="bg-[#edf5fb]"
          />

          <SummaryCard
            title="Next Deadline"
            value="Sept 12, 2026"
            icon={
              <span className="text-sm text-orange-500">
                ▰
              </span>
            }
            iconBg="bg-[#fff7e5]"
          />
        </div>

        {/* ================= SEARCH + FILTERS ================= */}
        <div className="mt-7 flex w-full flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
          {/* Search */}
          <div className="relative w-full xl:max-w-[320px]">
            <Search
              size={14}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="text"
              placeholder="Search Goals"
              className="h-9 w-full rounded-lg border border-slate-200 bg-white pl-9 pr-3 text-[10px] text-slate-700 outline-none placeholder:text-slate-400 transition focus:border-[#12355B]"
            />
          </div>

          {/* Filters */}
          <div className="flex w-full flex-wrap items-center gap-2 xl:w-auto">
            <button
              type="button"
              className="rounded-lg bg-[#12355B] px-4 py-2.5 text-[9px] font-medium text-white"
            >
              All Goals
            </button>

            <button
              type="button"
              className="rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-[9px] text-slate-600 transition hover:bg-slate-50"
            >
              On Track
            </button>

            <button
              type="button"
              className="rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-[9px] text-slate-600 transition hover:bg-slate-50"
            >
              At Risk
            </button>

            <button
              type="button"
              className="rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-[9px] text-slate-600 transition hover:bg-slate-50"
            >
              Completed
            </button>

            <button
              type="button"
              className="ml-0 flex items-center gap-1.5 rounded-lg bg-[#12355B] px-4 py-2.5 text-[9px] font-semibold text-white transition hover:bg-[#0e2d4d] sm:ml-auto xl:ml-2"
            >
              <Plus size={12} />
              Create Goal
            </button>
          </div>
        </div>

        {/* ================= GOALS TABLE ================= */}
        <div className="mt-6 w-full overflow-hidden rounded-xl border border-slate-100 bg-white shadow-sm">
          {/* Desktop table header */}
          <div className="hidden grid-cols-[minmax(180px,2fr)_minmax(100px,1.2fr)_minmax(90px,1fr)_minmax(90px,1fr)_minmax(150px,1.5fr)_minmax(100px,1fr)_minmax(90px,1fr)_35px] gap-4 border-b border-slate-100 px-5 py-4 lg:grid">
            <p className="text-[9px] font-semibold text-slate-500">
              Goals
            </p>

            <p className="text-[9px] font-semibold text-slate-500">
              Category
            </p>

            <p className="text-[9px] font-semibold text-slate-500">
              Target
            </p>

            <p className="text-[9px] font-semibold text-slate-500">
              Saved
            </p>

            <p className="text-[9px] font-semibold text-slate-500">
              Progress
            </p>

            <p className="text-[9px] font-semibold text-slate-500">
              Deadline
            </p>

            <p className="text-[9px] font-semibold text-slate-500">
              Status
            </p>

            <p className="text-[9px] font-semibold text-slate-500">
              Action
            </p>
          </div>

          {/* ================= GOAL ROWS ================= */}
          <div>
            {goals.map((goal) => (
              <div
                key={goal.title}
                className="border-b border-slate-100 last:border-b-0"
              >
                {/* ================= DESKTOP ================= */}
                <div className="hidden min-h-[72px] grid-cols-[minmax(180px,2fr)_minmax(100px,1.2fr)_minmax(90px,1fr)_minmax(90px,1fr)_minmax(150px,1.5fr)_minmax(100px,1fr)_minmax(90px,1fr)_35px] items-center gap-4 px-5 py-4 lg:grid">
                  {/* Goal */}
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#eef5fa] text-sm">
                      {goal.icon}
                    </div>

                    <div className="min-w-0">
                      <p className="truncate text-[10px] font-semibold text-slate-800">
                        {goal.title}
                      </p>

                      <p className="mt-0.5 truncate text-[8px] text-slate-400">
                        {goal.description}
                      </p>
                    </div>
                  </div>

                  {/* Category */}
                  <div>
                    <span
                      className={`inline-flex whitespace-nowrap rounded-md px-2.5 py-1.5 text-[8px] font-medium ${goal.categoryColor}`}
                    >
                      {goal.category}
                    </span>
                  </div>

                  {/* Target */}
                  <p className="text-[9px] font-semibold text-slate-800">
                    {goal.target}
                  </p>

                  {/* Saved */}
                  <p className="text-[9px] font-semibold text-slate-800">
                    {goal.saved}
                  </p>

                  {/* Progress */}
                  <div className="flex min-w-0 items-center gap-2">
                    <span className="w-7 shrink-0 text-[8px] font-semibold text-slate-700">
                      {goal.progress}%
                    </span>

                    <div className="h-1.5 min-w-0 flex-1 overflow-hidden rounded-full bg-slate-200">
                      <div
                        className={`h-full rounded-full ${
                          goal.progress === 100
                            ? "bg-[#126c67]"
                            : "bg-[#4db7b2]"
                        }`}
                        style={{
                          width: `${goal.progress}%`,
                        }}
                      />
                    </div>
                  </div>

                  {/* Deadline */}
                  <p className="whitespace-pre-line text-[8px] font-medium leading-tight text-slate-700">
                    {goal.deadline}
                  </p>

                  {/* Status */}
                  <div>
                    <span
                      className={`inline-flex whitespace-nowrap rounded-md px-2.5 py-1.5 text-[8px] font-medium ${goal.statusColor}`}
                    >
                      {goal.status}
                    </span>
                  </div>

                  {/* Action */}
                  <button
                    type="button"
                    className="flex h-7 w-7 items-center justify-center rounded-md text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                    aria-label={`Actions for ${goal.title}`}
                  >
                    <MoreVertical size={14} />
                  </button>
                </div>

                {/* ================= TABLET ================= */}
                <div className="hidden p-4 md:block lg:hidden">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex min-w-0 items-center gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#eef5fa]">
                        <span className="text-sm">{goal.icon}</span>
                      </div>

                      <div className="min-w-0">
                        <h3 className="truncate text-xs font-semibold text-slate-800">
                          {goal.title}
                        </h3>

                        <p className="mt-0.5 truncate text-[9px] text-slate-400">
                          {goal.description}
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      className="shrink-0 text-slate-400"
                    >
                      <MoreVertical size={15} />
                    </button>
                  </div>

                  <div className="mt-4 grid grid-cols-3 gap-4">
                    <div>
                      <p className="text-[8px] text-slate-400">
                        Category
                      </p>

                      <span
                        className={`mt-1 inline-flex rounded-md px-2 py-1 text-[8px] ${goal.categoryColor}`}
                      >
                        {goal.category}
                      </span>
                    </div>

                    <div>
                      <p className="text-[8px] text-slate-400">
                        Target
                      </p>

                      <p className="mt-1 text-[9px] font-semibold text-slate-800">
                        {goal.target}
                      </p>
                    </div>

                    <div>
                      <p className="text-[8px] text-slate-400">
                        Saved
                      </p>

                      <p className="mt-1 text-[9px] font-semibold text-slate-800">
                        {goal.saved}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4">
                    <div className="mb-1 flex justify-between">
                      <span className="text-[8px] text-slate-400">
                        Progress
                      </span>

                      <span className="text-[8px] font-semibold text-slate-700">
                        {goal.progress}%
                      </span>
                    </div>

                    <div className="h-1.5 overflow-hidden rounded-full bg-slate-200">
                      <div
                        className={`h-full rounded-full ${
                          goal.progress === 100
                            ? "bg-[#126c67]"
                            : "bg-[#4db7b2]"
                        }`}
                        style={{
                          width: `${goal.progress}%`,
                        }}
                      />
                    </div>
                  </div>

                  <div className="mt-4 flex items-center justify-between">
                    <div>
                      <p className="text-[8px] text-slate-400">
                        Deadline
                      </p>

                      <p className="mt-1 whitespace-pre-line text-[9px] font-medium leading-tight text-slate-700">
                        {goal.deadline}
                      </p>
                    </div>

                    <span
                      className={`inline-flex rounded-md px-2 py-1 text-[8px] font-medium ${goal.statusColor}`}
                    >
                      {goal.status}
                    </span>
                  </div>
                </div>

                {/* ================= MOBILE ================= */}
                <div className="p-4 md:hidden">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex min-w-0 items-center gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#eef5fa]">
                        <span className="text-sm">{goal.icon}</span>
                      </div>

                      <div className="min-w-0">
                        <h3 className="truncate text-xs font-semibold text-slate-800">
                          {goal.title}
                        </h3>

                        <p className="mt-0.5 truncate text-[9px] text-slate-400">
                          {goal.description}
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      className="shrink-0 text-slate-400"
                    >
                      <MoreVertical size={15} />
                    </button>
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-x-5 gap-y-4">
                    <div>
                      <p className="text-[8px] text-slate-400">
                        Category
                      </p>

                      <span
                        className={`mt-1 inline-flex rounded-md px-2 py-1 text-[8px] ${goal.categoryColor}`}
                      >
                        {goal.category}
                      </span>
                    </div>

                    <div>
                      <p className="text-[8px] text-slate-400">
                        Deadline
                      </p>

                      <p className="mt-1 whitespace-pre-line text-[9px] font-medium leading-tight text-slate-700">
                        {goal.deadline}
                      </p>
                    </div>

                    <div>
                      <p className="text-[8px] text-slate-400">
                        Target
                      </p>

                      <p className="mt-1 text-[9px] font-semibold text-slate-800">
                        {goal.target}
                      </p>
                    </div>

                    <div>
                      <p className="text-[8px] text-slate-400">
                        Saved
                      </p>

                      <p className="mt-1 text-[9px] font-semibold text-slate-800">
                        {goal.saved}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4">
                    <div className="mb-1 flex justify-between">
                      <span className="text-[8px] text-slate-400">
                        Progress
                      </span>

                      <span className="text-[8px] font-semibold text-slate-700">
                        {goal.progress}%
                      </span>
                    </div>

                    <div className="h-1.5 overflow-hidden rounded-full bg-slate-200">
                      <div
                        className={`h-full rounded-full ${
                          goal.progress === 100
                            ? "bg-[#126c67]"
                            : "bg-[#4db7b2]"
                        }`}
                        style={{
                          width: `${goal.progress}%`,
                        }}
                      />
                    </div>
                  </div>

                  <div className="mt-3">
                    <span
                      className={`inline-flex rounded-md px-2 py-1 text-[8px] font-medium ${goal.statusColor}`}
                    >
                      {goal.status}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ================= FOOTER ================= */}
        <footer className="mt-10 flex flex-col gap-5 border-t border-slate-200 py-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-2">
            <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#12355B]">
              <span className="text-[8px] text-white">✓</span>
            </div>

            <div>
              <p className="text-[8px] font-bold text-[#12355B]">
                SafeNest
              </p>

              <p className="max-w-[500px] text-[7px] leading-relaxed text-slate-400">
                Funds remain with licensed financial institutions.
                SafeNest does not hold user funds.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-5 text-[8px] text-slate-500">
            <a
              href="#"
              className="transition hover:text-[#12355B]"
            >
              Security
            </a>

            <a
              href="#"
              className="transition hover:text-[#12355B]"
            >
              Privacy Policy
            </a>

            <a
              href="#"
              className="transition hover:text-[#12355B]"
            >
              Terms of service
            </a>
          </div>
        </footer>
      </main>
    </div>
  );
}