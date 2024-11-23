'use client'

import { useState } from 'react'

interface DailyMetrics {
  date: Date
  loansReviewed: number
  tasksCompleted: number
  avgProcessingTime: number // in hours
}

export default function ProductivityMetrics() {
  const [weeklyMetrics, setWeeklyMetrics] = useState<DailyMetrics[]>([
    {
      date: new Date('2024-03-18'),
      loansReviewed: 8,
      tasksCompleted: 15,
      avgProcessingTime: 2.5
    },
    {
      date: new Date('2024-03-19'),
      loansReviewed: 6,
      tasksCompleted: 12,
      avgProcessingTime: 3.0
    }
  ])

  const todayMetrics = weeklyMetrics[weeklyMetrics.length - 1]
  const weeklyGoal = {
    loansReviewed: 35,
    tasksCompleted: 70
  }

  const calculateProgress = (current: number, goal: number) => 
    Math.min((current / goal) * 100, 100)

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-6">Daily Progress</h2>

      {/* Today's Metrics */}
      <div className="space-y-6">
        <div>
          <div className="flex justify-between text-sm mb-2">
            <span>Loans Reviewed Today</span>
            <span className="font-medium">{todayMetrics.loansReviewed}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 rounded-full h-2"
              style={{ width: `${calculateProgress(todayMetrics.loansReviewed, 8)}%` }}
            ></div>
          </div>
        </div>

        <div>
          <div className="flex justify-between text-sm mb-2">
            <span>Tasks Completed</span>
            <span className="font-medium">{todayMetrics.tasksCompleted}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-green-600 rounded-full h-2"
              style={{ width: `${calculateProgress(todayMetrics.tasksCompleted, 15)}%` }}
            ></div>
          </div>

        </div>

        {/* Processing Time */}
        <div className="pt-4 border-t">
          <h3 className="text-sm font-medium mb-2">Average Processing Time</h3>
          <div className="text-2xl font-bold text-blue-600">
            {todayMetrics.avgProcessingTime} hrs
          </div>
          <p className="text-sm text-gray-500">per loan today</p>
        </div>

        {/* Weekly Summary */}
        <div className="pt-4 border-t">
          <h3 className="text-sm font-medium mb-2">Weekly Progress</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-2xl font-bold text-green-600">
                {weeklyMetrics.reduce((sum, day) => sum + day.loansReviewed, 0)}
              </div>
              <p className="text-sm text-gray-500">loans this week</p>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-600">
                {weeklyMetrics.reduce((sum, day) => sum + day.tasksCompleted, 0)}
              </div>
              <p className="text-sm text-gray-500">tasks completed</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 