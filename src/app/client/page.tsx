"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface User {
  username: string;
  role: string;
}

export default function ClientPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Check authentication on component mount
    const storedUser = sessionStorage.getItem("user");
    if (!storedUser) {
      router.push("/");
      return;
    }

    const parsedUser = JSON.parse(storedUser);
    if (parsedUser.role !== "client") {
      router.push("/");
      return;
    }

    setUser(parsedUser);
  }, [router]);

  const handleLogout = () => {
    sessionStorage.removeItem("user");
    router.push("/");
  };

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Client Dashboard</h1>
            <p className="text-gray-600">Welcome, {user.username}</p>
          </div>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200"
            aria-label="Logout"
          >
            Logout
          </button>
        </div>
        
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Client Content</h2>
          <p className="text-gray-600">
            This is a protected client page. Only users with client role can access this content.
          </p>
        </div>
      </div>
    </div>
  );
}
