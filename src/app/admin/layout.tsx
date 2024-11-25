"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { 
  BarChart3, 
  FileText, 
  Users, 
  FolderOpen, 
  LayoutDashboard,
  LogOut,
  Menu,
  X
} from "lucide-react";
import { Toaster } from "@/components/ui/toaster"
import React from "react";

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
}

const navItems: NavItem[] = [
  {
    label: "Dashboard",
    href: "/admin",
    icon: <LayoutDashboard className="w-5 h-5" />
  },
  {
    label: "Deals",
    href: "/admin/deals",
    icon: <FolderOpen className="w-5 h-5" />
  },
  {
    label: "Employees",
    href: "/admin/employees",
    icon: <Users className="w-5 h-5" />
  },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isOpen, setIsOpen] = useState(true);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
      if (window.innerWidth < 1024) {
        setIsOpen(false);
      } else {
        setIsOpen(true);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem("user");
    router.push("/");
  };

  const onClose = () => setIsOpen(false);

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Overlay */}
      <div 
        className={`fixed inset-0 bg-black transition-opacity duration-300 ease-in-out lg:hidden ${
          isOpen ? 'opacity-50 z-40' : 'opacity-0 pointer-events-none -z-10'
        }`}
        onClick={onClose}
      />

      {/* Drawer */}
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
              <Menu className={`w-6 h-6 text-gray-500 transition-transform duration-300 ${
                isCollapsed ? 'rotate-180' : ''
              }`} />
            </button>
            {!isCollapsed && (
              <button 
                onClick={onClose}
                className="lg:hidden p-2 hover:bg-gray-100 rounded-full ml-2 transition-colors duration-200"
              >
                <X className="w-6 h-6 text-gray-500" />
              </button>
            )}
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-4">
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.href}>
                <button
                  onClick={() => router.push(item.href)}
                  className={`w-full flex items-center p-3 rounded-lg transition-colors duration-200
                    hover:bg-blue-50 text-gray-700 hover:text-blue-600
                    ${pathname === item.href ? 'bg-blue-50 text-blue-600' : ''}
                    ${!isCollapsed ? 'space-x-3' : 'justify-center'}`}
                  title={isCollapsed ? item.label : ''}
                >
                  {item.icon}
                  {!isCollapsed && (
                    <span className="transition-opacity duration-300">{item.label}</span>
                  )}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Logout Button */}
        <div className="p-4 border-t">
          <button
            onClick={handleLogout}
            className={`w-full flex items-center p-3 rounded-lg transition-colors duration-200
              text-red-600 hover:bg-red-50
              ${!isCollapsed ? 'space-x-3' : 'justify-center'}`}
            title={isCollapsed ? 'Logout' : ''}
          >
            <LogOut className="w-5 h-5" />
            {!isCollapsed && (
              <span className="transition-opacity duration-300">Logout</span>
            )}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto min-h-screen bg-gray-50">
        <main className="p-6">
          {children}
        </main>
      </div>
      <Toaster />
    </div>
  );
} 