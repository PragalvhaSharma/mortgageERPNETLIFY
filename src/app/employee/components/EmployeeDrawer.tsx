'use client'

import { useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { 
  UsersIcon, 
  XMarkIcon,
  Bars3Icon,
  HomeIcon,
} from '@heroicons/react/24/outline'
import { LogOut } from 'lucide-react'

interface DrawerProps {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
}

export default function EmployeeDrawer({ isOpen, onClose, children }: DrawerProps) {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  const menuItems = [
    { name: 'Dashboard', icon: HomeIcon, path: '/employee/dashboard' },
    { name: 'Clients', icon: UsersIcon, path: '/employee/clients' },
  ]

  const handleNavigation = (path: string) => {
    router.push(path)
    if (window.innerWidth < 1024) { // Close drawer on mobile after navigation
      onClose()
    }
  }

  const handleLogout = () => {
    sessionStorage.removeItem("user");
    router.push("/");
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Overlay - improved transition */}
      <div 
        className={`fixed inset-0 bg-black transition-opacity duration-300 ease-in-out lg:hidden ${
          isOpen ? 'opacity-50 z-40' : 'opacity-0 pointer-events-none -z-10'
        }`}
        onClick={onClose}
      />

      {/* Drawer - improved transition */}
      <div 
        className={`fixed lg:static min-h-screen bg-white shadow-lg 
          transform transition-transform duration-300 ease-in-out z-50
          flex flex-col
          ${isCollapsed ? 'w-20' : 'w-64'} 
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
      >
        {/* Header */}
        <div className="p-6 border-b flex justify-between items-center">
          <div className="flex items-center">
            <button 
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
            >
              <Bars3Icon className={`w-6 h-6 text-gray-500 transition-transform duration-300 ${
                isCollapsed ? 'rotate-180' : ''
              }`} />
            </button>
            {!isCollapsed && (
              <button 
                onClick={onClose}
                className="lg:hidden p-2 hover:bg-gray-100 rounded-full ml-2 transition-colors duration-200"
              >
                <XMarkIcon className="w-6 h-6 text-gray-500" />
              </button>
            )}
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 overflow-y-auto p-4">
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.name}>
                <button
                  onClick={() => handleNavigation(item.path)}
                  className={`w-full flex items-center p-3 rounded-lg transition-colors duration-200
                    hover:bg-blue-50 text-gray-700 hover:text-blue-600
                    ${pathname === item.path ? 'bg-blue-50 text-blue-600' : ''}
                    ${!isCollapsed ? 'space-x-3' : 'justify-center'}`}
                  title={isCollapsed ? item.name : ''}
                >
                  <item.icon className="w-6 h-6" />
                  {!isCollapsed && (
                    <span className="transition-opacity duration-300">{item.name}</span>
                  )}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Add Logout Button */}
        <div className="p-4 border-t">
          <button
            onClick={handleLogout}
            className={`w-full flex items-center p-3 rounded-lg transition-colors duration-200
              text-red-600 hover:bg-red-50
              ${!isCollapsed ? 'space-x-3' : 'justify-center'}`}
            title={isCollapsed ? 'Logout' : ''}
          >
            <LogOut className="w-6 h-6" />
            {!isCollapsed && (
              <span className="transition-opacity duration-300">Logout</span>
            )}
          </button>
        </div>
      </div>

      {/* Main content area */}
      <div className="flex-1 overflow-auto min-h-screen bg-gray-50">
        {children}
      </div>
    </div>
  )
} 