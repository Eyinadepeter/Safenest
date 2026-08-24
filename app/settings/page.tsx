"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { getCurrentDemoAccount, type DemoAccount } from "../lib/demo-auth";
import DashboardHeader from "../components/DashboardHeader";
import DashboardTopBar from "../components/DashboardTopBar";
import DashboardFooter from "../components/DashboardFooter";
import ProfileTab from "./ProfileTab";
import SecurityTab from "./SecurityTab";
import NotificationsTab from "./NotificationsTab";
import ConnectedBankTab from "./ConnectedBankTab";
import AccountTab from "./AccountTab";

const TABS = [
  "Profile",
  "Security",
  "Notifications",
  "Connected Bank",
  "Account",
] as const;

type Tab = (typeof TABS)[number];

export default function SettingsPage() {
  const router = useRouter();

  const [account, setAccount] = useState<DemoAccount | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<Tab>("Profile");

  useEffect(() => {
    const current = getCurrentDemoAccount();
    if (!current) {
      router.replace("/signin");
      return;
    }
    setAccount(current);
    setIsLoading(false);
  }, [router]);

  if (isLoading || !account) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <p className="text-sm text-slate-400">Loading...</p>
      </div>
    );
  }

  return (
    <>
      <DashboardHeader />

      <div className="min-h-screen w-full bg-white px-6 py-6 pt-20 sm:px-10 lg:pl-[calc(250px+2.5rem)] lg:pt-6">
        <DashboardTopBar
          title="Settings"
          subtitle="Manage your account settings and preference"
        />

        <div className="mt-8 flex flex-wrap gap-2 border-b border-slate-200 sm:gap-6">
          {TABS.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`rounded-t-lg px-4 py-2.5 text-sm font-bold transition sm:text-base ${
                activeTab === tab
                  ? "bg-navy text-white"
                  : "text-navy hover:bg-slate-50"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="mt-8">
          {activeTab === "Profile" && <ProfileTab account={account} />}
          {activeTab === "Security" && <SecurityTab />}
          {activeTab === "Notifications" && <NotificationsTab />}
          {activeTab === "Connected Bank" && <ConnectedBankTab />}
          {activeTab === "Account" && <AccountTab />}
        </div>

        <DashboardFooter />
      </div>
    </>
  );
}
