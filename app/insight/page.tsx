"use client";

import {
  Bell,
  Settings,
  AlertTriangle,
  Target,
  Calendar,
  Award,
} from "lucide-react";
import DashboardHeader from "../components/DashboardHeader";

export default function Dashboard() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-slate-50">
      {/* HEADER */}
      <DashboardHeader />

      {/* SIDEBAR SPACE */}
      <aside className="fixed left-0 top-0 z-40 hidden h-screen w-64 lg:block">
        {/* Your Sidebar component will go here */}
      </aside>

      {/* MAIN CONTENT */}
      <main className="min-h-screen px-4 pb-8 pt-20 sm:px-6 lg:ml-64 lg:px-8 lg:pt-24 xl:px-10">
        {/* PAGE HEADER */}
        <div className="mb-6 flex flex-col gap-5 sm:mb-8 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold leading-tight text-gray-900 sm:text-3xl lg:text-4xl">
              Your Financial Insights
            </h1>

            <p className="mt-2 max-w-xl text-sm text-gray-500 sm:text-base">
              Actionable observations based on your recent activity.
            </p>
          </div>

          <div className="flex items-center gap-4 text-gray-700">
            <button
              type="button"
              aria-label="Notifications"
              className="transition hover:text-green-600"
            >
              <Bell className="h-5 w-5 sm:h-6 sm:w-6" />
            </button>

            <button
              type="button"
              aria-label="Settings"
              className="transition hover:text-green-600"
            >
              <Settings className="h-5 w-5 sm:h-6 sm:w-6" />
            </button>

            <button
              type="button"
              aria-label="Profile"
              className="h-9 w-9 rounded-full bg-orange-400 transition hover:opacity-90 sm:h-10 sm:w-10"
            />
          </div>
        </div>

        {/* INSIGHTS GRID */}
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-12 lg:gap-6">
          {/* RISK ALERT */}
          <div className="rounded-2xl border bg-white p-5 shadow-sm sm:p-6 lg:col-span-8">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-100 sm:h-12 sm:w-12">
                <AlertTriangle className="h-5 w-5 text-red-500 sm:h-6 sm:w-6" />
              </div>

              <h2 className="text-xl font-semibold text-gray-900 sm:text-2xl">
                Risk Alert
              </h2>
            </div>

            <p className="mt-5 text-sm leading-6 text-gray-600 sm:mt-6 sm:text-base">
              You overspent ₦8,000 on dining out this month.
            </p>

            <div className="mt-6 sm:mt-8">
              <div className="mb-2 flex flex-col gap-1 text-sm sm:flex-row sm:items-center sm:justify-between">
                <span className="text-gray-700">Dining Budget</span>

                <span className="font-semibold text-red-500">
                  ₦48,000 / ₦40,000
                </span>
              </div>

              <div className="h-2.5 overflow-hidden rounded-full bg-gray-200 sm:h-3">
                <div className="h-full w-[85%] rounded-full bg-red-500" />
              </div>
            </div>
          </div>

          {/* SAVINGS */}
          <div className="rounded-2xl border bg-white p-5 shadow-sm sm:p-6 lg:col-span-4">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green-100 sm:h-12 sm:w-12">
                <Award className="h-5 w-5 text-green-600 sm:h-6 sm:w-6" />
              </div>

              <h2 className="text-xl font-semibold text-gray-900">
                Saving Insights
              </h2>
            </div>

            <p className="mt-5 text-sm leading-6 text-gray-600 sm:text-base">
              You've maintained a 3-month contribution streak.
            </p>

            <div className="mt-6 flex gap-2 sm:mt-8 sm:gap-3">
              <div className="h-14 flex-1 rounded bg-green-100 sm:h-16" />
              <div className="h-14 flex-1 rounded bg-green-200 sm:h-16" />
              <div className="h-14 flex-1 rounded bg-green-600 sm:h-16" />
            </div>
          </div>

          {/* GOAL INSIGHT */}
          <div className="rounded-2xl border bg-white p-5 shadow-sm sm:p-6 lg:col-span-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green-100 sm:h-12 sm:w-12">
                  <Target className="h-5 w-5 text-green-600 sm:h-6 sm:w-6" />
                </div>

                <h2 className="text-xl font-semibold text-gray-900 sm:text-2xl">
                  Goal Insight
                </h2>
              </div>

              <span className="w-fit rounded-full bg-green-100 px-4 py-1.5 text-sm text-green-700">
                On Track
              </span>
            </div>

            <p className="mt-5 text-sm leading-6 text-gray-600 sm:mt-6 sm:text-base">
              You are on track to complete your certification goal
              2 weeks early.
            </p>

            <div className="mt-8 sm:mt-12">
              <div className="mb-2 flex items-center justify-between text-sm">
                <span className="text-gray-700">Progress</span>

                <span className="font-semibold text-green-600">
                  85%
                </span>
              </div>

              <div className="h-2.5 overflow-hidden rounded-full bg-gray-200 sm:h-3">
                <div className="h-full w-[85%] rounded-full bg-green-500" />
              </div>
            </div>
          </div>

          {/* LOOKING AHEAD */}
          <div className="rounded-2xl border bg-white p-5 shadow-sm sm:p-6 lg:col-span-4">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green-100 sm:h-12 sm:w-12">
                <Calendar className="h-5 w-5 text-green-600 sm:h-6 sm:w-6" />
              </div>

              <h2 className="text-xl font-semibold text-gray-900">
                Looking Ahead
              </h2>
            </div>

            <div className="mt-5 space-y-3 sm:mt-6">
              {[
                ["Rent", "Nov 1"],
                ["Insurance", "Dec 15"],
                ["Fees", "Jan 10"],
              ].map(([title, date]) => (
                <div
                  key={title}
                  className="flex items-center justify-between rounded-lg bg-slate-50 p-3 text-sm sm:p-4"
                >
                  <span className="font-medium text-gray-700">
                    {title}
                  </span>

                  <span className="text-gray-500">
                    {date}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}