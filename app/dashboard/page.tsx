import React from 'react'
import DashboardHeader from '../components/DashboardHeader'

function Dashboard() {
  return (
    <div className="min-h-screen bg-slate-50">
      <DashboardHeader />
     <main className="ml-0 flex min-h-screen flex-col items-center justify-center px-5 pt-16 text-center sm:px-8 lg:ml-[174px] lg:px-10 lg:pt-0">
  <h1 className="mb-3 text-2xl font-bold text-[#123b65] sm:text-3xl lg:text-4xl">
    Welcome to the Dashboard
  </h1>

  <p className="max-w-2xl text-sm text-gray-600 sm:text-base lg:text-lg">
    Here you can manage your goals, savings, and insights.
  </p>
</main>

    </div>
  )
}

export default Dashboard
