"use client";

import DashboardHeader from "@/app/components/DashboardHeader";
import {
  Plus,
  TrendingUp,
  ChevronDown,
} from "lucide-react";
import goal from "../../assets/images/goal.png";
import wallet from "../../assets/images/wallet-money.png";
import fire from "../../assets/images/fire.png";
import logo from "../../assets/images/logo.png";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import Link from "next/link";
import Image from "next/image";

// TODO: replace with real data once the savings/contributions module
// endpoints are available (mirrors the pattern used for goals on /dashboard).
const GROWTH_DATA = [
  { month: "Jan", amount: 40000 },
  { month: "Feb", amount: 410000 },
  { month: "Mar", amount: 460000 },
  { month: "Apr", amount: 620000 },
  { month: "May", amount: 940000 },
  { month: "Jun", amount: 1150000 },
];

const UPCOMING_DUE = [
  { id: "1", title: "Annual Rent", amount: 90000, dueIn: "3 days", urgent: true },
  { id: "2", title: "School Fees", amount: 35000, dueIn: "15 days", urgent: false },
];

function formatNaira(amount: number) {
  return `₦${amount.toLocaleString("en-NG")}`;
}

function formatCompactNaira(amount: number) {
  if (amount >= 1000000) return `${(amount / 1000000).toFixed(1)}M`;
  if (amount >= 1000) return `${Math.round(amount / 1000)}k`;
  return `${amount}`;
}

function CustomTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: { value: number }[];
  label?: string;
}) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg border border-slate-100 bg-white px-3 py-2 text-xs shadow-md">
      <p className="font-medium text-slate-500">{label}</p>
      <p className="font-semibold text-teal-700">
        {formatNaira(payload[0].value)}
      </p>
    </div>
  );
}

export default function SavingsPage() {
  const monthlyTargetPct = 56;

  return (
    <>
      <DashboardHeader />
      <div className="min-h-screen w-full bg-slate-50 px-6 py-6 pt-20 sm:px-10 lg:pl-[calc(250px+2.5rem)] lg:pt-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-xl font-semibold text-slate-800">
            Savings &amp; Contributions
          </h1>
          <p className="mt-1 max-w-lg text-sm text-slate-500">
            Monitor your progress, review contributions, and stay on track
            with your financial serenity plan.
          </p>
        </div>

        <button
          type="button"
          className="flex shrink-0 items-center gap-2 rounded-lg bg-[#12355B] px-4 py-2.5 text-sm font-semibold text-white transition"
        >
          <Plus size={16} />
          Add Manual Contribution
        </button>
      </div>

      {/* Stats row */}
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-2xl border border-slate-100 bg-[#1266B71A] p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-black ">
              Total Saved
            </span>
            <span className="flex items-center gap-0.5 rounded-full bg-emerald-50 px-1.5 py-0.5 text-[10px] font-semibold text-emerald-600">
              <TrendingUp size={10} />
              +12%
            </span>
          </div>
          <p className="mt-2 text-lg font-bold text-slate-800">
            {formatNaira(1150000)}
          </p>
        </div>

        <div className="rounded-2xl border border-slate-100 bg-[#1266B71A] p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-black">
              Monthly Target
            </span>
            <img
  src={goal.src}
  alt="Monthly Target"
  className="h-5 w-5 object-contain"
/>
          </div>
          <p className="mt-2 text-lg font-bold text-slate-800">
            {formatNaira(150000)}
          </p>
          <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
            <div
              className="h-full rounded-full bg-[#12355B]"
              style={{ width: `${monthlyTargetPct}%` }}
            />
          </div>
          <p className="mt-1 text-[10px] text-slate-400">
            {monthlyTargetPct}% of Target
          </p>
        </div>

        <div className="rounded-2xl border border-slate-100 bg-[#1266B71A] p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-black">
              Contributed This Month
            </span>
           <img
  src={wallet.src}
  alt="Monthly Target"
  className="h-5 w-5 object-contain"
/>
          </div>
          <p className="mt-2 text-lg font-bold text-slate-800">
            {formatNaira(1150000)}
          </p>
        </div>

        <div className="rounded-2xl border border-slate-100 bg-[#1266B71A] p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-black">
              Current Streak
            </span>
              <img
  src={fire.src}
  alt="Monthly Target"
  className="h-5 w-5 object-contain"
/>
          </div>
          <p className="mt-2 text-lg font-bold text-slate-800">4 Months</p>
          <p className="mt-1 text-[10px] text-black">
            Keep it up to reach your goals faster
          </p>
        </div>
      </div>

      {/* Chart + Upcoming due */}
      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <div className="rounded-1xl border border-slate-400 bg-white p-5 shadow-sm lg:col-span-2">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-black">
              Savings Growth
            </h2>
            <button
              type="button"
              className="flex items-center gap-1 rounded-lg border border-slate-200 px-2.5 py-1.5 text-xs text-black hover:bg-slate-50"
            >
              Last 6 Months
              <ChevronDown size={12} />
            </button>
          </div>

          <div className="mt-4 h-64 w-full text-black">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={GROWTH_DATA} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
                <defs>
                  <linearGradient id="savingsFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#0f766e" stopOpacity={0.25} />
                    <stop offset="100%" stopColor="#0f766e" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis
                  dataKey="month"
                  tick={{ fontSize: 11, fill: "#94a3b8" }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tickFormatter={formatCompactNaira}
                  tick={{ fontSize: 11, fill: "#94a3b8" }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey="amount"
                  stroke="#0f766e"
                  strokeWidth={2}
                  fill="url(#savingsFill)"
                  dot={{ r: 4, fill: "#ffffff", stroke: "#0f766e", strokeWidth: 2 }}
                  activeDot={{ r: 5 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Upcoming due date */}
        <div className="rounded-2xl border border-[#12355B] bg-teal-white p-5">
          <h2 className="text-sm font-semibold text-slate-800">
            Upcoming Due Date
          </h2>
          <p className="mt-1 text-xs leading-relaxed text-slate-500">
            Maintain your 4-month streak by completing these upcoming
            contributions
          </p>

          <div className="mt-4 flex flex-col gap-3">
            {UPCOMING_DUE.map((item) => (
              <div
                key={item.id}
                className="rounded-xl border border-slate-100 bg-[#489EE81A] p-3.5"
              >
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold text-slate-800">
                    {item.title}
                  </p>
                  <p className="text-sm font-semibold text-slate-800">
                    {formatNaira(item.amount)}
                  </p>
                </div>
                <div className="mt-1.5 flex items-center justify-between">
                  <span
                    className={`text-[11px] ${
                      item.urgent ? "text-red-500" : "text-black"
                    }`}
                  >
                    Due in {item.dueIn}
                  </span>
                  <button
                    type="button"
                    className="text-[11px] font-semibold text-teal-700 hover:underline"
                  >
                    Pay Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ================= FOOTER ================= */}
                <footer className="mt-12 border-t border-slate-200 py-6">
                  <div className="flex items-center gap-2">
                    <Image
                      src={logo}
                      alt="SafeNest logo"
                      className="h-6 w-6 object-contain"
                      priority
                    />
                    <span className="text-base font-bold tracking-tight text-[#123b65]">
                      Safe<span className="text-[#22a7a4]">Nest</span>
                    </span>
                  </div>
      
                  <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-xs text-slate-500">
                      Funds remain with licensed financial institutions. SafeNest does
                      not hold user funds.
                    </p>
      
                    <nav className="flex items-center gap-6 text-xs font-medium text-[#12355B]">
                      <Link href="/security" className="transition hover:text-teal-700">
                        Security
                      </Link>
                      <Link href="/privacy" className="transition hover:text-teal-700">
                        Privacy Policy
                      </Link>
                      <Link href="/terms" className="transition hover:text-teal-700">
                        Terms of service
                      </Link>
                    </nav>
                  </div>
                </footer>
    </div>
    </>
  );
}