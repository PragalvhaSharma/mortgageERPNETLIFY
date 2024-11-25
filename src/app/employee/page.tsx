"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function EmployeePage() {
  const router = useRouter();

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
      router.push("/employee/dashboard");
    }
  }, [router]);

  return null; // No need for content since we're redirecting
}
