import React from 'react'
import DashboardHeader from '../components/DashboardHeader'

function Dashboard() {
  return (
    <div className="min-h-screen bg-slate-50">
      <DashboardHeader />
      <main className="ml-[174px] flex min-h-screen flex-col items-center justify-center px-6">
        <h1 className="text-4xl font-bold mb-4">Welcome to the Dashboard</h1>
        <p className="text-lg text-gray-600">Here you can manage your goals, savings, and insights.</p>
      </main>

    </div>
  )
}

export default Dashboard
