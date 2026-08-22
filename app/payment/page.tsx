"use client";

import {
  Bell,
  Settings,
  CircleUserRound,
  Plus,
  MoreVertical,
  Lightbulb,
} from "lucide-react";
import DashboardHeader from "../components/DashboardHeader";

const transactions = [
  {
    date: "Oct 15",
    description: "Monthly Salary",
    category: "Income",
    amount: "+₦250,000",
    type: "income",
  },
  {
    date: "Oct 16",
    description: "Rent Payment",
    category: "Housing",
    amount: "-₦120,000",
    type: "expense",
  },
  {
    date: "Oct 18",
    description: "Supermarket",
    category: "Groceries",
    amount: "-₦20,000",
    type: "expense",
  },
  {
    date: "Oct 20",
    description: "Annual Rent Fund",
    category: "Goals",
    amount: "-₦50,000",
    type: "expense",
  },
];

const expenseBreakdown = [
  {
    name: "Rent",
    percentage: 66,
    color: "bg-[#126968]",
  },
  {
    name: "Groceries",
    percentage: 21,
    color: "bg-[#8c9bc7]",
  },
  {
    name: "Utilities",
    percentage: 8,
    color: "bg-[#d7dce2]",
  },
  {
    name: "Transport",
    percentage: 5,
    color: "bg-[#102d49]",
  },
];

export default function PaymentPage() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-white lg:ml-64 lg:pt-16">
      <DashboardHeader />

      <main className="min-h-[calc(100vh-64px)] w-full px-4 py-5 sm:px-5 md:px-6 lg:px-6 xl:px-8 2xl:px-10">
        {/* HEADER */}
        <header className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-xl font-bold text-[#111827] sm:text-2xl">
              Budget Planner
            </h1>

            <p className="mt-1 text-sm text-gray-400">
              Plan your budget with ease
            </p>
          </div>

          <div className="flex items-center gap-4 text-[#123b65] sm:gap-5">
            <button
              type="button"
              aria-label="Notifications"
              className="transition hover:scale-105"
            >
              <Bell className="h-5 w-5" strokeWidth={2.5} />
            </button>

            <button
              type="button"
              aria-label="Settings"
              className="transition hover:scale-105"
            >
              <Settings className="h-5 w-5" strokeWidth={2.5} />
            </button>

            <button
              type="button"
              aria-label="Profile"
              className="transition hover:scale-105"
            >
              <CircleUserRound className="h-6 w-6" strokeWidth={2} />
            </button>
          </div>
        </header>

        {/* SUMMARY CARDS */}
        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {/* Available Balance */}
          <div className="rounded-lg bg-[#e8f2f8] p-4">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-[#1f2937]">
                Available Balance
              </p>

              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-[#123b65] text-white">
                ₦
              </span>
            </div>

            <p className="mt-3 text-xl font-bold text-[#111827]">
              ₦80,000
            </p>

            <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white">
              <div className="h-full w-[32%] rounded-full bg-[#123b65]" />
            </div>

            <p className="mt-2 text-right text-xs text-gray-500">
              32% of income
            </p>
          </div>

          {/* Monthly Income */}
          <div className="rounded-lg bg-[#e8f2f8] p-4">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-[#1f2937]">
                Monthly Income
              </p>

              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[#22a7a4] text-[#22a7a4]">
                <Plus className="h-4 w-4" />
              </span>
            </div>

            <p className="mt-6 text-xl font-bold text-[#111827]">
              ₦250,000
            </p>
          </div>

          {/* Fixed Expenses */}
          <div className="rounded-lg bg-[#e8f2f8] p-4">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-[#1f2937]">
                Fixed Expenses
              </p>

              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[#ef4444] text-[#ef4444]">
                <Plus className="h-4 w-4" />
              </span>
            </div>

            <p className="mt-3 text-xl font-bold text-[#111827]">
              ₦120,000
            </p>

            <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white">
              <div className="h-full w-[46%] rounded-full bg-[#123b65]" />
            </div>

            <p className="mt-2 text-right text-xs text-gray-500">
              46% of income
            </p>
          </div>

          {/* Goal Allocations */}
          <div className="rounded-lg bg-[#e8f2f8] p-4">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-[#1f2937]">
                Goal Allocations
              </p>

              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-[#123b65] text-white">
                ⚑
              </span>
            </div>

            <p className="mt-3 text-xl font-bold text-[#111827]">
              ₦50,000
            </p>

            <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white">
              <div className="h-full w-[20%] rounded-full bg-[#123b65]" />
            </div>

            <p className="mt-2 text-right text-xs text-gray-500">
              20% of income
            </p>
          </div>
        </section>

        {/* ACTION BUTTONS */}
        <section className="mt-6 grid grid-cols-1 gap-3 sm:flex sm:flex-wrap">
          <button
            type="button"
            className="flex h-10 w-full items-center justify-center gap-2 rounded-md bg-[#123b65] px-6 text-sm font-medium text-white transition hover:bg-[#0d3154] sm:w-auto"
          >
            <Plus className="h-4 w-4" />
            Add Expense
          </button>

          <button
            type="button"
            className="flex h-10 w-full items-center justify-center gap-2 rounded-md border border-[#123b65] bg-white px-6 text-sm font-medium text-[#123b65] transition hover:bg-[#f4f8fb] sm:w-auto"
          >
            <Plus className="h-4 w-4" />
            Add Income
          </button>
        </section>

        {/* MAIN CONTENT */}
        <section className="mt-5 grid grid-cols-1 gap-5 xl:grid-cols-[minmax(0,2fr)_minmax(280px,1fr)]">
          {/* RECENT ACTIVITY */}
          <div className="min-w-0 overflow-hidden rounded-lg border border-gray-200">
            <div className="flex items-center justify-between border-b border-gray-100 px-4 py-4 sm:px-5">
              <h2 className="text-sm font-bold text-[#111827]">
                Recent Activity
              </h2>

              <button
                type="button"
                className="text-xs font-medium text-[#278c68] hover:underline"
              >
                View All
              </button>
            </div>

            {/* DESKTOP TABLE HEADER */}
            <div className="hidden grid-cols-[0.7fr_1.5fr_1fr_0.8fr] gap-4 px-5 py-3 sm:grid">
              <p className="text-xs font-semibold text-[#111827]">
                Date
              </p>

              <p className="text-xs font-semibold text-[#111827]">
                Description
              </p>

              <p className="text-xs font-semibold text-[#111827]">
                Category
              </p>

              <p className="text-right text-xs font-semibold text-[#111827]">
                Amount
              </p>
            </div>

            {/* TRANSACTIONS */}
            {transactions.map((transaction, index) => (
              <div
                key={`${transaction.date}-${transaction.description}`}
                className={`px-4 py-4 sm:px-5 sm:py-5 ${
                  index !== transactions.length - 1
                    ? "border-b border-gray-50"
                    : ""
                }`}
              >
                {/* MOBILE */}
                <div className="flex items-center justify-between gap-3 sm:hidden">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <p className="text-xs text-gray-500">
                        {transaction.date}
                      </p>

                      <span
                        className={`inline-flex rounded px-2 py-1 text-[10px] font-medium ${
                          transaction.category === "Income"
                            ? "bg-[#d9f6df] text-[#23924d]"
                            : transaction.category === "Goals"
                            ? "bg-[#123b65] text-white"
                            : "bg-[#e7edf3] text-[#42617d]"
                        }`}
                      >
                        {transaction.category}
                      </span>
                    </div>

                    <p className="mt-1 truncate text-xs font-medium text-[#1f2937]">
                      {transaction.description}
                    </p>
                  </div>

                  <p
                    className={`shrink-0 text-right text-xs font-semibold ${
                      transaction.type === "income"
                        ? "text-[#20a15b]"
                        : "text-[#ef4444]"
                    }`}
                  >
                    {transaction.amount}
                  </p>
                </div>

                {/* TABLET / DESKTOP */}
                <div className="hidden grid-cols-[0.7fr_1.5fr_1fr_0.8fr] items-center gap-4 sm:grid">
                  <p className="text-xs text-gray-600">
                    {transaction.date}
                  </p>

                  <p className="truncate text-xs font-medium text-[#1f2937]">
                    {transaction.description}
                  </p>

                  <div>
                    <span
                      className={`inline-flex rounded px-2 py-1 text-[10px] font-medium ${
                        transaction.category === "Income"
                          ? "bg-[#d9f6df] text-[#23924d]"
                          : transaction.category === "Goals"
                          ? "bg-[#123b65] text-white"
                          : "bg-[#e7edf3] text-[#42617d]"
                      }`}
                    >
                      {transaction.category}
                    </span>
                  </div>

                  <p
                    className={`text-right text-xs font-medium ${
                      transaction.type === "income"
                        ? "text-[#20a15b]"
                        : "text-[#ef4444]"
                    }`}
                  >
                    {transaction.amount}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* RIGHT SIDE */}
          <div className="flex min-w-0 flex-col gap-5">
            {/* SMART INSIGHT */}
            <div className="rounded-lg bg-[#e8f7e9] p-4 sm:p-5">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#d4eee1]">
                  <Lightbulb
                    className="h-4 w-4 text-[#126968]"
                    fill="currentColor"
                  />
                </div>

                <h2 className="text-sm font-bold text-[#111827]">
                  Smart Insight
                </h2>
              </div>

              <p className="mt-3 text-xs leading-5 text-[#374151]">
                Your current spending allows you to meet your Annual Rent
                target by December. Keep it up!
              </p>
            </div>

            {/* EXPENSE BREAKDOWN */}
            <div className="rounded-lg border border-gray-200 p-4 sm:p-5">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-sm font-bold text-[#111827]">
                    Expenses
                  </h2>

                  <p className="text-sm font-bold text-[#111827]">
                    Breakdown
                  </p>
                </div>

                <button type="button" aria-label="More options">
                  <MoreVertical className="h-5 w-5 text-gray-500" />
                </button>
              </div>

              {/* DONUT */}
              <div className="relative mx-auto mt-6 h-32 w-32 sm:h-36 sm:w-36">
                <div
                  className="absolute inset-0 rounded-full"
                  style={{
                    background:
                      "conic-gradient(#126968 0deg 237.6deg, #8c9bc7 237.6deg 313.2deg, #d7dce2 313.2deg 342deg, #102d49 342deg 360deg)",
                  }}
                />

                <div className="absolute inset-5 flex flex-col items-center justify-center rounded-full bg-white">
                  <span className="text-xs text-gray-500">
                    Total
                  </span>

                  <span className="text-base font-bold text-[#111827]">
                    ₦120K
                  </span>
                </div>
              </div>

              {/* BREAKDOWN */}
              <div className="mt-6 space-y-3">
                {expenseBreakdown.map((item) => (
                  <div
                    key={item.name}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2">
                      <span
                        className={`h-2 w-2 shrink-0 rounded-full ${item.color}`}
                      />

                      <span className="text-xs text-gray-600">
                        {item.name}
                      </span>
                    </div>

                    <span className="text-xs font-semibold text-[#111827]">
                      {item.percentage}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="mt-8 border-t border-gray-200 pt-5">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#123b65] text-xs text-white">
                  S
                </span>

                <span className="text-sm font-bold text-[#123b65]">
                  SafeNest
                </span>
              </div>

              <p className="mt-2 max-w-xl text-xs leading-5 text-gray-500">
                Funds remain with licensed financial institutions.
                SafeNest does not hold user funds.
              </p>
            </div>

            <div className="flex flex-wrap gap-x-5 gap-y-2 text-xs font-medium text-[#123b65]">
              <button type="button" className="hover:underline">
                Security
              </button>

              <button type="button" className="hover:underline">
                Privacy Policy
              </button>

              <button type="button" className="hover:underline">
                Terms of service
              </button>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}