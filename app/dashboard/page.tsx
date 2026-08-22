"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  Bell,
  Settings,
  Home as HomeIcon,
  GraduationCap,
  CheckCircle2,
  AlertTriangle,
  PlusCircle,
  Wallet,
  BarChart3,
  CalendarDays,
  ChevronRight,
} from "lucide-react";

import { getCurrentDemoAccount, DemoAccount } from "../lib/demo-auth";
import DashboardHeader from "../components/DashboardHeader";
import GoalCard from "../goalCard";
import StatCard from "../components/statCard";
import logo from "../assets/images/logo.png";

const QUICK_ACTIONS = [
  { icon: PlusCircle, label: "Create Goal", href: "/dashboard/goals/new" },
  { icon: Wallet, label: "Add Contribution", href: "" },
  { icon: BarChart3, label: "View Budget", href: "" },
  { icon: CalendarDays, label: "View Calendar", href: "./financial-calendar" },
];

// TODO: replace with real goals data once the goals API is wired up
// (see app/lib/goals.ts — calculateGoalPlan is currently a stub).
const GOALS = [
  {
    icon: HomeIcon,
    category: "Rent",
    title: "Annual Rent",
    subtitle: "11 Months remaining",
    status: "On Track" as const,
    currentAmount: 450000,
    targetAmount: 700000,
    pct: 64,
    amountLeftLabel: "₦700,000 left",
  },
  {
    icon: GraduationCap,
    category: "Education",
    title: "Prof. Certification",
    subtitle: "Timeline Warning",
    status: "At Risk" as const,
    currentAmount: 50000,
    targetAmount: 300000,
    pct: 64,
    amountLeftLabel: "₦250,000 left",
  },
];

const TOTAL_TARGET_VALUE = 34000000;
const TOTAL_PROGRESS_VALUE = 1150000;
const TOTAL_PROGRESS_PCT = 65; // visual only — swap for a computed value once real goals exist
const ACTIVE_GOALS_COUNT = 3;
const GOALS_AT_RISK_COUNT = 1;
const AMOUNT_TO_TARGET = "₦15,000"; // amount left on the nearest upcoming goal

function getInitial(fullName?: string) {
  return fullName?.trim()?.[0]?.toUpperCase() ?? "U";
}

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good Morning";
  if (hour < 18) return "Good Afternoon";
  return "Good Evening";
}

export default function DashboardHomePage() {
  const router = useRouter();

  const [account, setAccount] = useState<DemoAccount | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const current = getCurrentDemoAccount();

    if (!current) {
      router.replace("/signin");
      return;
    }

    setAccount(current);
    setIsLoading(false);
  }, [router]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <p className="text-sm text-slate-400">Loading dashboard...</p>
      </div>
    );
  }

  if (!account) {
    return null;
  }

  const firstName = account.fullName.trim().split(/\s+/)[0] || "there";

  return (
    <div className="min-h-screen bg-white">
      <DashboardHeader />

      <main className="w-full px-4 pb-10 pt-20 sm:px-6 lg:ml-[250px] lg:w-[calc(100%-250px)] lg:px-8 lg:pt-8 xl:px-10">
        <div className="mx-auto max-w-7xl">
          {/* ================= TOP BAR ================= */}
          <section className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-navy sm:text-3xl">
                {getGreeting()}, {firstName}
              </h1>
              <p className="mt-1 text-sm text-slate-500 sm:text-base">
                You&apos;re {AMOUNT_TO_TARGET} away from your monthly rent target.
                You&apos;ve got this!
              </p>
            </div>

            <div className="flex items-center gap-4">
              <button
                type="button"
                aria-label="Notifications"
                className="text-navy transition hover:text-slate-700"
              >
                <Bell className="h-5 w-5" />
              </button>
              <button
                type="button"
                aria-label="Settings"
                className="text-navy transition hover:text-slate-700"
              >
                <Settings className="h-5 w-5" />
              </button>
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-amber-400 text-sm font-bold text-white">
                {getInitial(account.fullName)}
              </div>
            </div>
          </section>

          {/* ================= STAT ROW ================= */}
          <section className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
            {/* Total target value */}
            <div className="relative overflow-hidden rounded-2xl bg-mint p-6 md:col-span-2">
              <HomeIcon className="pointer-events-none absolute -right-6 top-1/2 h-40 w-40 -translate-y-1/2 text-navy/5" />

              <p className="relative text-xs font-bold uppercase tracking-wide text-slate-500">
                Total Target Value
              </p>
              <p className="relative mt-2 text-4xl font-bold text-navy">
                ₦{TOTAL_TARGET_VALUE.toLocaleString()}
              </p>

              <div className="relative mt-10 flex items-center justify-between text-xs font-semibold text-slate-500">
                <span>Total Progress</span>
                <span>₦{TOTAL_PROGRESS_VALUE.toLocaleString()}</span>
              </div>
              <div className="relative mt-2 h-2 overflow-hidden rounded-full bg-white/70">
                <div
                  className="h-full rounded-full bg-teal-dark"
                  style={{ width: `${TOTAL_PROGRESS_PCT}%` }}
                />
              </div>
            </div>

            {/* Active goals / at risk */}
            <div className="grid grid-cols-2 gap-4 md:grid-cols-1">
              <StatCard
                icon={CheckCircle2}
                label="Active Goals"
                value={ACTIVE_GOALS_COUNT}
                tone="positive"
              />
              <StatCard
                icon={AlertTriangle}
                label="Goals at Risk"
                value={GOALS_AT_RISK_COUNT}
                tone="warning"
              />
            </div>
          </section>

          {/* ================= ACTIVE GOALS + QUICK ACTIONS ================= */}
          <section className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-navy">Active Goals</h2>
                <Link
                  href=""
                  className="text-sm font-semibold text-teal-700 hover:underline"
                >
                  View All
                </Link>
              </div>

              <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2">
                {GOALS.map((goal) => (
                  <GoalCard key={goal.title} {...goal} />
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-base font-bold text-slate-900">Quick Actions</h2>
              <div className="mt-4 flex flex-col gap-3">
                {QUICK_ACTIONS.map(({ icon: Icon, label, href }) => (
                  <Link
                    key={label}
                    href={href}
                    className="group flex h-11 w-full items-center justify-between rounded-lg border border-navy px-4 transition hover:bg-slate-50"
                  >
                    <span className="flex items-center gap-2">
                      <Icon size={16} className="text-navy" strokeWidth={2} />
                      <span className="text-sm font-bold text-navy">{label}</span>
                    </span>
                    <ChevronRight
                      size={14}
                      className="text-navy transition-transform group-hover:translate-x-0.5"
                      strokeWidth={2.5}
                    />
                  </Link>
                ))}
              </div>
            </div>
          </section>

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
      </main>
    </div>
  );
}
