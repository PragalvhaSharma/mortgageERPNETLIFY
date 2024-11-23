'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  BellAlertIcon, 
  ExclamationTriangleIcon, 
  InformationCircleIcon, 
  CheckCircleIcon 
} from '@heroicons/react/24/outline'

interface Alert {
  id: string
  message: string
  type: 'critical' | 'warning' | 'info'
  timestamp: Date
  isRead: boolean
}

export default function AlertsPanel() {
  const [alerts, setAlerts] = useState<Alert[]>([
    {
      id: 'A1',
      message: 'Loan #56789 needs underwriting approval by tomorrow',
      type: 'critical',
      timestamp: new Date('2024-03-19'),
      isRead: false
    },
    {
      id: 'A2',
      message: 'Compliance audit required for 2 loans this week',
      type: 'warning',
      timestamp: new Date('2024-03-18'),
      isRead: false
    },
    {
      id: 'A3',
      message: 'New compliance guidelines updated',
      type: 'info',
      timestamp: new Date('2024-03-17'),
      isRead: true
    }
  ])

  const getAlertStyle = (type: string) => {
    const styles = {
      critical: 'bg-gradient-to-r from-red-50 to-red-100 border-red-200 text-red-700',
      warning: 'bg-gradient-to-r from-yellow-50 to-yellow-100 border-yellow-200 text-yellow-700',
      info: 'bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200 text-blue-700'
    }
    return styles[type as keyof typeof styles]
  }

  const getAlertIcon = (type: string) => {
    const icons = {
      critical: <BellAlertIcon className="w-5 h-5" />,
      warning: <ExclamationTriangleIcon className="w-5 h-5" />,
      info: <InformationCircleIcon className="w-5 h-5" />
    }
    return icons[type as keyof typeof icons]
  }

  const markAsRead = (alertId: string) => {
    setAlerts(alerts.map(alert => 
      alert.id === alertId ? { ...alert, isRead: true } : alert
    ))
  }

  return (
    <div className="bg-white rounded-xl p-6 border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-800">
          Alerts & Notifications
        </h2>
        <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
          {alerts.filter(a => !a.isRead).length} New
        </span>
      </div>
      
      <div className="space-y-4">
        <AnimatePresence>
          {alerts.map(alert => (
            <motion.div 
              key={alert.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className={`p-4 border rounded-xl shadow-sm transition-all duration-200 
                ${getAlertStyle(alert.type)} 
                ${alert.isRead ? 'opacity-60' : 'hover:shadow-md'}
              `}
            >
              <div className="flex gap-3">
                <div className="flex-shrink-0 mt-1">
                  {getAlertIcon(alert.type)}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <p className="font-medium leading-tight">{alert.message}</p>
                    {!alert.isRead && (
                      <button 
                        onClick={() => markAsRead(alert.id)}
                        className="flex items-center gap-1 text-xs hover:underline ml-2 transition-colors"
                      >
                        <CheckCircleIcon className="w-4 h-4" />
                        Mark as read
                      </button>
                    )}
                  </div>
                  <p className="text-sm mt-1 opacity-75">
                    {alert.timestamp.toLocaleString(undefined, {
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
} 