// app/dashboard/page.tsx

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
    <div className="min-h-screen bg-slate-50">
        <DashboardHeader />
      <aside className="fixed left-0 top-0 h-screen w-64">
        {/* Your Sidebar component will go here */}
      </aside>

      {/* Main Content */}
      <main className="ml-64 min-h-screen p-8">
        {/* Header */}
        <div className="flex items-start justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold">
              Your Financial Insights
            </h1>
            <p className="text-gray-500 mt-2">
              Actionable observations based on your recent activity.
            </p>
          </div>

          <div className="flex gap-4">
            <Bell className="cursor-pointer" />
            <Settings className="cursor-pointer" />
            <div className="h-10 w-10 rounded-full bg-orange-400" />
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-12 gap-6">
          {/* Risk Alert */}
          <div className="col-span-8 bg-white rounded-2xl border p-6 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-red-100">
                <AlertTriangle className="text-red-500" />
              </div>

              <h2 className="text-2xl font-semibold">Risk Alert</h2>
            </div>

            <p className="mt-6 text-gray-600">
              You overspent ₦8,000 on dining out this month.
            </p>

            <div className="mt-8">
              <div className="flex justify-between mb-2">
                <span>Dining Budget</span>
                <span className="text-red-500 font-semibold">
                  ₦48,000 / ₦40,000
                </span>
              </div>

              <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-red-500 w-[85%]" />
              </div>
            </div>
          </div>

          {/* Savings */}
          <div className="col-span-4 bg-white rounded-2xl border p-6 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-green-100">
                <Award className="text-green-600" />
              </div>

              <h2 className="text-xl font-semibold">
                Saving Insights
              </h2>
            </div>

            <p className="mt-5 text-gray-600">
              You've maintained a 3-month contribution streak.
            </p>

            <div className="flex gap-3 mt-8">
              <div className="h-16 flex-1 bg-green-100 rounded" />
              <div className="h-16 flex-1 bg-green-200 rounded" />
              <div className="h-16 flex-1 bg-green-600 rounded" />
            </div>
          </div>

          {/* Goal */}
          <div className="col-span-8 bg-white rounded-2xl border p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-full bg-green-100">
                  <Target className="text-green-600" />
                </div>

                <h2 className="text-2xl font-semibold">
                  Goal Insight
                </h2>
              </div>

              <span className="bg-green-100 text-green-700 px-4 py-1 rounded-full text-sm">
                On Track
              </span>
            </div>

            <p className="mt-6 text-gray-600">
              You are on track to complete your certification goal
              2 weeks early.
            </p>

            <div className="mt-12">
              <div className="flex justify-between mb-2">
                <span>Progress</span>
                <span className="font-semibold text-green-600">
                  85%
                </span>
              </div>

              <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-green-500 w-[85%]" />
              </div>
            </div>
          </div>

          {/* Looking Ahead */}
          <div className="col-span-4 bg-white rounded-2xl border p-6 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-green-100">
                <Calendar className="text-green-600" />
              </div>

              <h2 className="text-xl font-semibold">
                Looking Ahead
              </h2>
            </div>

            <div className="mt-6 space-y-3">
              {[
                ["Rent", "Nov 1"],
                ["Insurance", "Dec 15"],
                ["Fees", "Jan 10"],
              ].map(([title, date]) => (
                <div
                  key={title}
                  className="bg-slate-50 rounded-lg p-4 flex justify-between"
                >
                  <span>{title}</span>
                  <span className="text-gray-500">{date}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}