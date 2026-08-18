'use client';

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Home, LogOut } from 'lucide-react';

interface Event {
  id: string;
  date: number;
  title: string;
  category: 'completed' | 'due-soon' | 'upcoming' | 'missed';
  color: string;
}

interface Milestone {
  date: string;
  title: string;
  type: 'upcoming' | 'recent';
  category: 'completed' | 'due-soon' | 'upcoming' | 'missed';
}

const categoryColors = {
  completed: { bg: 'bg-green-100', border: 'border-green-300', dot: 'bg-green-500' },
  'due-soon': { bg: 'bg-yellow-100', border: 'border-yellow-300', dot: 'bg-yellow-500' },
  upcoming: { bg: 'bg-blue-100', border: 'border-blue-300', dot: 'bg-blue-500' },
  missed: { bg: 'bg-red-100', border: 'border-red-300', dot: 'bg-red-500' },
};

const categoryLabels = {
  completed: 'Completed',
  'due-soon': 'Due Soon',
  upcoming: 'Upcoming',
  missed: 'Missed',
};

export default function FinancialCalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date(2026, 7)); // August 2026
  const [events] = useState<Event[]>([
    { id: '1', date: 5, title: 'Tax Filing', category: 'upcoming', color: 'bg-blue-300' },
    { id: '2', date: 12, title: 'Loan Application', category: 'due-soon', color: 'bg-yellow-300' },
    { id: '3', date: 18, title: 'Bank Review', category: 'completed', color: 'bg-green-300' },
    { id: '4', date: 25, title: 'Investment Review', category: 'missed', color: 'bg-red-300' },
  ]);

  const [milestones] = useState<Milestone[]>([
    { date: '8/15/2026', title: 'Quarterly Review', type: 'upcoming', category: 'upcoming' },
    { date: '8/22/2026', title: 'Budget Update', type: 'upcoming', category: 'due-soon' },
    { date: '8/10/2026', title: 'Savings Target', type: 'recent', category: 'completed' },
  ]);

  const getDaysInMonth = (date: Date) => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  const getFirstDayOfMonth = (date: Date) => new Date(date.getFullYear(), date.getMonth(), 1).getDay();

  const daysInMonth = getDaysInMonth(currentDate);
  const firstDay = getFirstDayOfMonth(currentDate);
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  const getEventForDate = (date: number) => events.find(e => e.date === date);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">SF</span>
            </div>
            <span className="font-semibold text-slate-800">SafeNest</span>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-slate-100 rounded-full transition">
              <svg className="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </button>
            <button className="p-2 hover:bg-slate-100 rounded-full transition">
              <Home className="w-5 h-5 text-slate-600" />
            </button>
            <button className="p-2 hover:bg-slate-100 rounded-full transition">
              <LogOut className="w-5 h-5 text-slate-600" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg p-6 shadow-sm border border-slate-200">
              <h1 className="text-lg font-semibold text-slate-800 mb-4">Financial Calendar</h1>
              <p className="text-sm text-slate-600 mb-6">Manage your financials and upcoming schedules</p>

              {/* Notes Section */}
              <div className="mb-8">
                <h3 className="font-semibold text-slate-800 mb-4">Notes</h3>
                <div className="space-y-2">
                  {Object.entries(categoryColors).map(([key, colors]) => (
                    <div key={key} className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${colors.dot}`}></div>
                      <span className="text-sm text-slate-700">{categoryLabels[key as keyof typeof categoryLabels]}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Upcoming Milestones */}
              <div className="mb-8">
                <h3 className="font-semibold text-slate-800 mb-4">Upcoming Milestones</h3>
                <div className="space-y-3">
                  {milestones.filter(m => m.type === 'upcoming').map((milestone, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <div className={`w-2 h-2 rounded-full mt-1.5 ${categoryColors[milestone.category].dot}`}></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-slate-800">{milestone.date}</p>
                        <p className="text-xs text-slate-500">{milestone.title}</p>
                      </div>
                      <span className="text-xs text-blue-600 cursor-pointer hover:underline">Go back</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recently Met */}
              <div>
                <h3 className="font-semibold text-slate-800 mb-4">Recently Met</h3>
                <div className="space-y-3">
                  {milestones.filter(m => m.type === 'recent').map((milestone, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <div className={`w-2 h-2 rounded-full mt-1.5 ${categoryColors[milestone.category].dot}`}></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-slate-800">{milestone.date}</p>
                        <p className="text-xs text-slate-500">{milestone.title}</p>
                      </div>
                      <span className="text-xs text-amber-600 cursor-pointer hover:underline">Log it</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Calendar */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
              {/* Calendar Header */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h1 className="text-2xl font-bold text-slate-800">
                    {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                  </h1>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={prevMonth}
                    className="p-2 hover:bg-slate-100 rounded-lg transition"
                  >
                    <ChevronLeft className="w-5 h-5 text-slate-600" />
                  </button>
                  <button
                    onClick={goToToday}
                    className="px-4 py-2 bg-slate-800 text-white rounded-lg hover:bg-slate-900 transition font-medium text-sm"
                  >
                    Today
                  </button>
                  <button
                    onClick={nextMonth}
                    className="p-2 hover:bg-slate-100 rounded-lg transition"
                  >
                    <ChevronRight className="w-5 h-5 text-slate-600" />
                  </button>
                </div>
              </div>

              {/* Calendar Grid */}
              <div className="border border-slate-200 rounded-lg overflow-hidden">
                {/* Weekday Headers */}
                <div className="grid grid-cols-7 bg-slate-50 border-b border-slate-200">
                  {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                    <div key={day} className="p-4 text-center font-semibold text-slate-700 text-sm">
                      {day}
                    </div>
                  ))}
                </div>

                {/* Calendar Days */}
                <div className="grid grid-cols-7">
                  {/* Empty cells for days before month starts */}
                  {Array.from({ length: firstDay }).map((_, i) => (
                    <div key={`empty-${i}`} className="p-4 bg-slate-50 border border-slate-100 min-h-24"></div>
                  ))}

                  {/* Days of the month */}
                  {days.map(day => {
                    const event = getEventForDate(day);
                    const isToday = day === new Date().getDate() && 
                                   currentDate.getMonth() === new Date().getMonth() &&
                                   currentDate.getFullYear() === new Date().getFullYear();

                    return (
                      <div
                        key={day}
                        className={`p-4 border border-slate-100 min-h-24 flex flex-col justify-between transition hover:bg-slate-50 cursor-pointer ${
                          isToday ? 'bg-blue-50' : ''
                        }`}
                      >
                        <div className={`text-sm font-semibold ${isToday ? 'text-blue-600' : 'text-slate-800'}`}>
                          {day}
                        </div>
                        {event && (
                          <div className={`mt-2 p-2 rounded text-xs font-medium text-slate-800 ${event.color}`}>
                            {event.title}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 mt-12 py-6 text-center text-sm text-slate-600">
        <p>© 2026 SafeNest. All rights reserved. | <span className="hover:text-slate-800 cursor-pointer">Security</span> | <span className="hover:text-slate-800 cursor-pointer">Privacy Policy</span> | <span className="hover:text-slate-800 cursor-pointer">Terms of service</span></p>
      </footer>
    </div>
  );
}
