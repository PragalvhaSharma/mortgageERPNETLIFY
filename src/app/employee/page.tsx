"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import EmployeeDrawer from "./components/EmployeeDrawer";

export default function EmployeePage() {
  const router = useRouter();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in and is employee
    const userStr = sessionStorage.getItem("user");
    if (!userStr) {
      router.push("/");
      return;
    }

    const user = JSON.parse(userStr);
    if (user.role !== "employee") {
      router.push("/");
    } else {
      setIsLoading(false);
    }
  }, [router]);

  if (isLoading) {
    return null; // or a loading spinner
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <EmployeeDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)}>
        <div className="p-8">
          <h1 className="text-2xl font-bold mb-6">Employee Dashboard</h1>
          {/* Add your dashboard content here */}
        </div>
      </EmployeeDrawer>
    </div>
  );
}
