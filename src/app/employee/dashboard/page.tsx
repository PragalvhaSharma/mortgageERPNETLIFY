'use client'

import { useState, useRef, useEffect } from 'react'
import EmployeeDrawer from '../components/EmployeeDrawer'
import TaskOverview from './components/TaskOverview'
import LoanPipeline from './components/LoanPipeline'
import DocumentManager from './components/DocumentManager'
import AlertsPanel from './components/AlertsPanel'
import ProductivityMetrics from './components/ProductivityMetrics'
import { BellIcon, ArrowPathIcon, ChartBarIcon, ClipboardDocumentListIcon, CheckCircleIcon, XMarkIcon } from '@heroicons/react/24/outline'

export default function Dashboard() {
  const [isOpen, setIsOpen] = useState(false)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)
  const notificationRef = useRef<HTMLDivElement>(null)

  // Update stats state with more controlled random variations
  const [stats, setStats] = useState({
    loanVolume: 750000 + Math.floor(Math.random() * 100000), // Base of 750k ± 100k
    processingTime: 12 + Math.floor(Math.random() * 4), // Base of 12 ± 4 hours
    approvalRate: 85 + Math.floor(Math.random() * 6), // Base of 85% ± 6%
  })

  // Close notifications when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setShowNotifications(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleRefresh = () => {
    setIsRefreshing(true)
    setStats(prevStats => ({
      // Vary by ±5% of previous value
      loanVolume: prevStats.loanVolume + Math.floor((Math.random() - 0.5) * 0.1 * prevStats.loanVolume),
      // Vary by ±2 hours
      processingTime: Math.max(1, prevStats.processingTime + Math.floor((Math.random() - 0.5) * 4)),
      // Vary by ±2%
      approvalRate: Math.min(100, Math.max(70, prevStats.approvalRate + Math.floor((Math.random() - 0.5) * 4))),
    }))
    setTimeout(() => setIsRefreshing(false), 1000)
  }

  return (
    <EmployeeDrawer isOpen={isOpen} onClose={() => setIsOpen(false)}>
      <div className="min-h-screen bg-gray-100 p-4 md:p-6 space-y-6">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Welcome Back, John
            </h1>
            <p className="text-gray-600 mt-1">Here's what's happening today</p>
          </div>
          <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end">
            <button 
              onClick={handleRefresh}
              className="p-2 hover:bg-gray-100 rounded-full transition-all duration-200 hover:shadow-md"
            >
              <ArrowPathIcon 
                className={`w-6 h-6 text-gray-700 ${isRefreshing ? 'animate-spin' : ''}`} 
              />
            </button>
            <div className="relative" ref={notificationRef}>
              <button 
                onClick={() => setShowNotifications(!showNotifications)}
                className="p-2 hover:bg-gray-100 rounded-full transition-all duration-200 hover:shadow-md relative"
              >
                <BellIcon className="w-6 h-6 text-gray-700" />
                <span className="absolute top-0 right-0 h-3 w-3 bg-red-500 rounded-full ring-2 ring-white"></span>
              </button>
              
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-lg ring-1 ring-black ring-opacity-5 z-50">
                  <div className="p-4 border-b">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-semibold text-gray-900">Notifications</h3>
                      <button 
                        onClick={() => setShowNotifications(false)}
                        className="p-1 rounded-lg hover:bg-gray-100"
                      >
                        <XMarkIcon className="w-5 h-5 text-gray-500" />
                      </button>
                    </div>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {[
                      {
                        title: 'Loan Application Update',
                        description: 'New documents received for loan #12345',
                        time: '5 minutes ago',
                        type: 'info'
                      },
                      {
                        title: 'Task Deadline',
                        description: 'Review for Johnson application due in 2 hours',
                        time: '1 hour ago',
                        type: 'warning'
                      },
                      {
                        title: 'System Update',
                        description: 'New features available in document processing',
                        time: '2 hours ago',
                        type: 'success'
                      }
                    ].map((notification, index) => (
                      <div 
                        key={index}
                        className="p-4 hover:bg-gray-50 cursor-pointer border-b last:border-b-0"
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="text-sm font-medium text-gray-900">{notification.title}</h4>
                            <p className="text-sm text-gray-600 mt-1">{notification.description}</p>
                            <span className="text-xs text-gray-500 mt-1 block">{notification.time}</span>
                          </div>
                          <div className={`h-2 w-2 rounded-full ${
                            notification.type === 'info' ? 'bg-blue-500' :
                            notification.type === 'warning' ? 'bg-yellow-500' :
                            'bg-green-500'
                          }`} />
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="p-4 border-t">
                    <button 
                      className="w-full text-sm text-blue-600 hover:text-blue-700 font-medium"
                      onClick={() => setShowNotifications(false)}
                    >
                      View All Notifications
                    </button>
                  </div>
                </div>
              )}
            </div>
            <div className="text-right">
              <div className="text-sm font-medium text-gray-900">
                {new Date().toLocaleDateString('en-US', { 
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </div>
              <div className="text-xs text-gray-500">
                Last updated: {new Date().toLocaleTimeString()}
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {[
            { 
              title: 'Monthly Loan Volume', 
              value: `$${stats.loanVolume.toLocaleString()}`,
              icon: <ChartBarIcon className="w-6 h-6 text-blue-600" />, 
              trend: '+12.5%', 
              trendColor: 'text-green-500' 
            },
            { 
              title: 'Avg Processing Time',
              value: `${stats.processingTime} hrs`, 
              icon: <ClipboardDocumentListIcon className="w-6 h-6 text-purple-600" />, 
              trend: '-8.3%', 
              trendColor: 'text-green-500' 
            },
            { 
              title: 'Approval Rate',
              value: `${stats.approvalRate}%`, 
              icon: <CheckCircleIcon className="w-6 h-6 text-green-600" />, 
              trend: '+2.1%', 
              trendColor: 'text-green-500' 
            },
          ].map((stat, i) => (
            <div key={i} className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-all duration-200">
              <div className="flex items-center justify-between">
                <div className="text-sm font-medium text-gray-600">{stat.title}</div>
                <div className="bg-gray-50 p-2 rounded-lg">{stat.icon}</div>
              </div>
              <div className="mt-2 flex items-baseline">
                <div className="text-3xl font-bold text-gray-900">{stat.value}</div>
                <div className={`ml-2 text-sm ${stat.trendColor} font-medium`}>{stat.trend}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
          {/* Task Overview Section */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-all duration-200">
            <TaskOverview />
          </div>

          {/* Productivity Section */}
          <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-all duration-200">
            <ProductivityMetrics />
          </div>

          {/* Loan Pipeline Section */}
          <div className="lg:col-span-3 bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-all duration-200">
            <LoanPipeline />
          </div>

          {/* Document Management Section */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-all duration-200">
            <DocumentManager />
          </div>

          {/* Alerts Section */}
          <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-all duration-200">
            <AlertsPanel />
          </div>
        </div>
      </div>
    </EmployeeDrawer>
  )
} 