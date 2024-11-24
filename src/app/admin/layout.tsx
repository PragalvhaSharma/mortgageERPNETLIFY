"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
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
  const [isDrawerOpen, setIsDrawerOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth < 768) {
        setIsDrawerOpen(false);
      } else {
        setIsDrawerOpen(true);
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

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Mobile Overlay */}
      {isMobile && isDrawerOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20"
          onClick={() => setIsDrawerOpen(false)}
        />
      )}

      {/* Drawer */}
      <aside 
        className={`
          fixed md:static bg-white shadow-lg z-30
          transition-all duration-300 ease-in-out
          ${isDrawerOpen ? 'w-64 translate-x-0' : 'w-0 -translate-x-full md:w-20 md:translate-x-0'}
        `}
      >
        <div className="flex flex-col h-full">
          <div className="p-6 flex items-center justify-between">
            <h1 className={`text-xl font-bold text-gray-900 ${!isDrawerOpen && 'md:hidden'}`}>
              Mortgage Admin
            </h1>
            {isMobile && (
              <button onClick={() => setIsDrawerOpen(false)}>
                <X className="w-6 h-6" />
              </button>
            )}
          </div>
          
          <nav className="flex-1 mt-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`
                  flex items-center gap-3 px-6 py-3 text-gray-700 hover:bg-gray-50 transition-colors
                  ${pathname === item.href ? 'bg-gray-100 border-r-4 border-blue-600' : ''}
                `}
                aria-label={item.label}
              >
                {item.icon}
                <span className={!isDrawerOpen ? 'md:hidden' : ''}>
                  {item.label}
                </span>
              </Link>
            ))}
          </nav>

          <div className="p-4 border-t">
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 w-full px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              aria-label="Logout from admin panel"
            >
              <LogOut className="w-5 h-5" />
              <span className={!isDrawerOpen ? 'md:hidden' : ''}>Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1">
        <header className="bg-white shadow-sm">
          <div className="flex items-center px-6 py-4">
            <button
              onClick={() => setIsDrawerOpen(!isDrawerOpen)}
              className="p-2 rounded-lg hover:bg-gray-100"
              aria-label="Toggle menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </header>
        <main className="p-6">
          {children}
        </main>
      </div>
      <Toaster />
    </div>
  );
} 