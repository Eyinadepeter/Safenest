"use client";

import Image from "next/image";
import bellIcon from "../assets/images/topbar-bell.png";
import settingsIcon from "../assets/images/topbar-settings.png";
import avatar from "../assets/images/user-avatar.jpg";

interface DashboardTopBarProps {
  title: string;
  subtitle?: string;
}

/**
 * Title/subtitle + bell/settings/avatar cluster, shared shape across
 * dashboard pages. app/dashboard/page.tsx has its own inline version of
 * the bell/settings pair (Lucide icons, no avatar) — left as-is since it
 * wasn't part of this task; this is for new dashboard pages going forward.
 */
export default function DashboardTopBar({
  title,
  subtitle,
}: DashboardTopBarProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
      <div>
        <h1 className="text-2xl font-bold text-navy sm:text-3xl">{title}</h1>
        {subtitle && (
          <p className="mt-1 text-sm text-slate-500 sm:text-base">
            {subtitle}
          </p>
        )}
      </div>

      <div className="flex items-center gap-4">
        <button
          type="button"
          aria-label="Notifications"
          className="text-navy transition hover:opacity-70"
        >
          <Image src={bellIcon} alt="" className="h-5 w-5 object-contain" />
        </button>
        <button
          type="button"
          aria-label="Settings"
          className="text-navy transition hover:opacity-70"
        >
          <Image
            src={settingsIcon}
            alt=""
            className="h-5 w-5 object-contain"
          />
        </button>
        <Image
          src={avatar}
          alt="Your profile"
          className="h-9 w-9 rounded-full object-cover"
        />
      </div>
    </div>
  );
}
