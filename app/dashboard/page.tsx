"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  PlusCircle,
  Wallet,
  BarChart3,
  CalendarDays,
  ChevronRight,
  ArrowRight,
  Loader2,
} from "lucide-react";

import { getCurrentDemoAccount, DemoAccount } from "../lib/demo-auth";
import DashboardHeader from "../components/DashboardHeader";
import house from "../assets/images/Vector.png"
import infocircle from "../assets/images/info-circle.png"
import notification from "../assets/images/notification.png"
import settings from "../assets/images/setting.png"
import goal from "../assets/images/mage_goals-fill.png"
import risk from "../assets/images/reicon_danger.png"
import logo from "../assets/images/logo.png"


const QUICK_ACTIONS = [
  {
    icon: PlusCircle,
    label: "Create Goal",
    href: "/goals/new",
  },
  {
    icon: Wallet,
    label: "Add Contribution",
    href: "/payment",
  },
  {
    icon: BarChart3,
    label: "View Budget",
    href: "/insights",
  },
  {
    icon: CalendarDays,
    label: "View Calendar",
    href: "/calendar",
  },
];

function getInitials(fullName?: string) {
  if (!fullName) return "U";

  const parts = fullName.trim().split(/\s+/).filter(Boolean);

  const first = parts[0]?.[0] ?? "";
  const last =
    parts.length > 1 ? parts[parts.length - 1]?.[0] ?? "" : "";

  return (first + last).toUpperCase() || "U";
}

export default function ConnectBankPage() {
  const router = useRouter();

  const [account, setAccount] = useState<DemoAccount | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isConnecting, setIsConnecting] = useState(false);

  useEffect(() => {
    const current = getCurrentDemoAccount();

    if (!current) {
      router.replace("/signin");
      return;
    }

    setAccount(current);
    setIsLoading(false);
  }, [router]);

  const handleConnectBank = async () => {
    setIsConnecting(true);

    // Simulate bank connection
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsConnecting(false);

    // Replace this with your actual bank/API connection route.
    router.push("/payment");
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 animate-spin " />
          <p className="text-sm text-slate-400">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (!account) {
    return null;
  }

  const firstName =
    account.fullName.trim().split(/\s+/)[0] || "there";

  return (
    <div className="min-h-screen bg-white">
  <DashboardHeader />

  <main className="w-full px-4 py-6 sm:px-6 lg:ml-[240px] lg:w-[calc(100%-240px)] lg:px-8 xl:px-10">
    <div className="mx-auto max-w-7xl">

          {/* ================= TOP SECTION ================= */}
          <section className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
            <div className="max-w-xl">
              

              <h1 className="text-2xl font-bold tracking-tight text-[#12355B] sm:text-3xl">
                Welcome, {firstName}
              </h1>

              <p className="mt-2 max-w-lg text-sm leading-6 text-slate-500 sm:text-base">
               Connect your bank so we can help you plan accurately, securely, and without any access to move your money
              </p>
            </div>

            {/* User actions */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                aria-label="Notifications"
                className="flex h-10 w-10 items-center justify-center  bg-white text-[#12355B] transition hover:bg-slate-100 hover:text-slate-800" 
              >
                <Image
    src={notification}
    alt="Bank"
    width={70}
    height={70}
    className=" object-contain cursor-pointer"
  />
              </button>

              <Link
                href="/settings"
                aria-label="Settings"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 transition hover:bg-slate-100 hover:text-slate-800"
              >
                       <Image
    src={settings}
    alt="Bank"
    width={70}
    height={70}
    className=" object-contain cursor-pointer"
  />
              </Link>

              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-400 text-xs font-bold text-white">
                {getInitials(account.fullName)}
              </div>
            </div>
          </section>

          {/* ================= MAIN CONTENT ================= */}
          <section className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-8">

            {/* ================= LEFT CARD ================= */}
            <div className="lg:col-span-2">
              <div className="bg-white p-5 sm:p-8">

                {/* Icon */}
                <div className=" h-[100px] w-[100px] ml-[25%] rounded-2xl  ">
  <Image
    src={house}
    alt="Bank"
    width={98}
    height={98}
    className=" object-contain"
  />
</div>
                {/* Read-only information */}
<div className="mt-[80px] mr-[50%] mx-auto w-full max-w-[80%] rounded-none border border-dashed border-[#12355B] px-8 py-2">
  <div className="flex items-center justify-center gap-2">
    <Image
      src={infocircle}
      alt="Information"
      width={10}
      height={10}
      className="h-[20px] w-[20px] shrink-0 object-contain"
    />

    <p className="text-center text-[18px] font-medium leading-[30px] text-[#12355B]">
      Read-only access. We can see your transactions,
      but we can never move or spend your money.
    </p>
  </div>
</div>

{/* Buttons */}
<div className="mt-[80px] mr-[25%] flex flex-col items-center gap-2">
  <button
    type="button"
    onClick={handleConnectBank}
    disabled={isConnecting}
    className="flex h-[50px] w-full max-w-[90%] items-center justify-center gap-1 rounded-[5px] bg-[#12355B] px-3 text-[15px] font-semibold text-white transition hover:bg-[#0e2947] disabled:cursor-not-allowed disabled:opacity-70"
  >
    {isConnecting ? (
      <>
        <Loader2
          size={11}
          className="animate-spin"
        />
        Connecting...
      </>
    ) : (
      <>
        Connect via Read-Only API
        <ArrowRight size={20} />
      </>
    )}
  </button>

  <Link
    href="/bank/manual"
    className="flex h-[50px] w-full max-w-[90%] items-center justify-center gap-1 rounded-[5px] border border-[#12355B] bg-white px-3 text-[15px] font-semibold text-[#12355B] transition hover:bg-slate-50"
  >
    Enter details manually
  </Link>
</div>
               
              </div>
            </div>

            {/* ================= RIGHT COLUMN ================= */}
            <aside className="flex flex-col gap-6">

              {/* Stats */}
              <div className="grid grid-cols-2 gap-3 lg:grid-cols-1">
                {/* Active Goals */}
                <div className="rounded-2xl  bg-emerald-50 p-4 sm:p-5">
                  <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700">
                    <Image
    src={goal}
    alt="Bank"
    width={15}
    height={15}
    className=" object-contain cursor-pointer"
  />
                    Active Goals
                  </div>

                  <p className="mt-2 text-2xl font-bold text-emerald-700">
                    0
                  </p>
                </div>

                {/* Goals at Risk */}
                <div className="rounded-2xl   bg-emerald-50 p-4 sm:p-5">
                  <div className="flex items-center gap-2 text-xs font-semibold text-red-600">
                    <Image
    src={risk}
    alt="Bank"
    width={15}
    height={15}
    className=" object-contain cursor-pointer"
  />
                    Goals at Risk
                  </div>

                  <p className="mt-2 text-2xl font-bold text-red-600">
                    0
                  </p>

                 
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-white ml-5">
  <h2 className="text-[16px] font-bold text-slate-900">
    Quick Actions
  </h2>

  <div className="mt-4 flex flex-col gap-3 ">
    {QUICK_ACTIONS.map(({ icon: Icon, label, href }) => (
      <Link
        key={label}
        href={href}
        className="group flex h-[32px] w-full max-w-[190px] items-center justify-between rounded-[5px] border border-[#12355B] bg-white px-3 transition hover:bg-slate-50"
      >
        {/* Left side */}
        <span className="flex items-center gap-2">
          <Icon
            size={15}
            className="text-[#12355B] "
            strokeWidth={2}
          />

          <span className="text-[15px] font-bold text-[#12355B]">
            {label}
          </span>
        </span>

        {/* Right arrow */}
        <ChevronRight
          size={10}
          className="text-[#12355B] transition-transform group-hover:translate-x-0.5"
          strokeWidth={2.5}
        />
      </Link>
    ))}
  </div>
</div>
            </aside>
          </section>

          {/* ================= FOOTER ================= */}
          <footer className="mt-10 border-t border-slate-200 py-3">
            <div className='flex flex-row'>
              <Image
            src={logo}
            alt="SafeNest logo"
            className="h-5 w-5 object-contain"
            priority
          />

          <span className="text-1xl font-bold tracking-tight text-[#123b65]">
            Safe<span className="text-[#22a7a4]">Nest</span>
          </span>
            </div>
  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

    
    <div className="flex flex-rol gap-5 mt-5">
                 
      <p className="text-[13px] leading-[10px] text-slate-500">
        Funds remain with licensed financial institutions.
        SafeNest does not hold user funds.
      </p>
    </div>

    {/* Links */}
    <nav className="flex items-center gap-6 text-[13px] font-medium text-[#12355B]">
      <Link
        href="/security"
        className="transition hover:text-teal-700"
      >
        Security
      </Link>

      <Link
        href="/privacy"
        className="transition hover:text-teal-700"
      >
        Privacy Policy
      </Link>

      <Link
        href="/terms"
        className="transition hover:text-teal-700"
      >
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