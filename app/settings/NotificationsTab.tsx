"use client";

import { useEffect, useState } from "react";
import {
  getNotificationSettings,
  updateNotificationSettings,
} from "../lib/userSettingsApi";

// The backend only has two fields: pushEnabled and emailEnabled. The
// design shows 5 independent toggles. Per Option B: "Email Updates" maps
// to the real emailEnabled field; the other 4 are local-only until the
// backend adds per-category notification preferences.
const LOCAL_ONLY_TOGGLES = [
  {
    key: "contributionReminders",
    title: "Contribution Reminders",
    description: "Get a nudge when a monthly contribution is coming up.",
    defaultOn: true,
  },
  {
    key: "missedContributionAlerts",
    title: "Missed Contribution Alerts",
    description: "Know right away if you fall behind on a goal.",
    defaultOn: true,
  },
  {
    key: "milestoneCelebrations",
    title: "Milestone Celebrations",
    description: "Get notified when you hit a savings milestone.",
    defaultOn: true,
  },
  {
    key: "smartInsights",
    title: "Smart Insights",
    description: "Receive personalized suggestions to help you save more.",
    defaultOn: true,
  },
] as const;

function Toggle({
  on,
  onToggle,
}: {
  on: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      onClick={onToggle}
      className={`relative h-6 w-11 shrink-0 rounded-full transition ${
        on ? "bg-navy" : "bg-slate-300"
      }`}
    >
      <span
        className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition ${
          on ? "left-5" : "left-0.5"
        }`}
      />
    </button>
  );
}

export default function NotificationsTab() {
  const [localToggles, setLocalToggles] = useState<Record<string, boolean>>(
    () =>
      Object.fromEntries(
        LOCAL_ONLY_TOGGLES.map((t) => [t.key, t.defaultOn])
      )
  );
  const [emailEnabled, setEmailEnabled] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getNotificationSettings()
      .then((settings) => setEmailEnabled(settings.emailEnabled))
      .catch(() => {
        // Keep the default (false) if unreachable.
      });
  }, []);

  const handleEmailToggle = async () => {
    const next = !emailEnabled;
    setEmailEnabled(next); // optimistic
    setError(null);
    try {
      await updateNotificationSettings({ emailEnabled: next });
    } catch (err) {
      setEmailEnabled(!next); // revert on failure
      setError(err instanceof Error ? err.message : "Couldn't save that.");
    }
  };

  return (
    <div>
      <p className="text-base font-bold text-navy">
        Choose what you want to be notified about.
      </p>

      {error && <p className="mt-3 text-sm text-red-600">{error}</p>}

      <div className="mt-6 flex flex-col divide-y divide-slate-200">
        {LOCAL_ONLY_TOGGLES.map((t) => (
          <div
            key={t.key}
            className="flex items-start justify-between gap-6 py-5"
          >
            <div>
              <p className="text-lg font-medium text-navy">{t.title}</p>
              <p className="mt-1 text-sm text-slate-500">{t.description}</p>
            </div>
            <Toggle
              on={localToggles[t.key]}
              onToggle={() =>
                setLocalToggles((prev) => ({
                  ...prev,
                  [t.key]: !prev[t.key],
                }))
              }
            />
          </div>
        ))}

        <div className="flex items-start justify-between gap-6 py-5">
          <div>
            <p className="text-lg font-medium text-navy">Email Updates</p>
            <p className="mt-1 text-sm text-slate-500">
              Occasional product news and financial tips.
            </p>
          </div>
          <Toggle on={emailEnabled} onToggle={handleEmailToggle} />
        </div>
      </div>
    </div>
  );
}
