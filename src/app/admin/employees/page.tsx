"use client";

import { useState } from "react";
import { UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DataTable } from "./components/data-table";
import { columns, Employee } from "./components/columns";
import { EmployeeDialog } from "./components/employee-dialog";

const mockEmployees: Employee[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    email: "sarah.j@mortgage.com",
    role: "Broker",
    status: "Active",
    joinDate: "2024-03-13T20:00:00",
    department: "Sales",
    deals: 45,
    phone: "+1 (555) 123-4567",
    performance: {
      closedDeals: 45,
      activeDeals: 12,
      revenue: 450000,
    }
  },
  {
    id: "2",
    name: "John Smith",
    email: "john.s@mortgage.com",
    role: "Loan Officer",
    status: "Active",
    joinDate: "2024-03-13T20:00:00",
    department: "Processing",
    deals: 32,
    phone: "+1 (555) 987-6543",
    performance: {
      closedDeals: 32,
      activeDeals: 8,
      revenue: 320000,
    }
  },
  {
    id: "3",
    name: "Michael Brown",
    email: "michael.b@mortgage.com",
    role: "Processor",
    status: "Pending",
    joinDate: "2024-03-13T20:00:00",
    department: "Processing",
    deals: 0,
    phone: "+1 (555) 456-7890",
  },
  {
    id: "4",
    name: "Emily Davis",
    email: "emily.d@mortgage.com",
    role: "Administrator",
    status: "Active",
    joinDate: "2024-03-13T20:00:00",
    department: "Management",
    deals: 28,
    phone: "+1 (555) 234-5678",
    performance: {
      closedDeals: 28,
      activeDeals: 5,
      revenue: 280000,
    }
  }
];

export default function EmployeesPage() {
  const [employees] = useState<Employee[]>(mockEmployees);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | undefined>();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMode, setDialogMode] = useState<"create" | "edit">("create");

  const handleEmployeeClick = (employee: Employee) => {
    setSelectedEmployee(employee);
    setDialogMode("edit");
    setDialogOpen(true);
  };

  const handleAddEmployee = () => {
    setDialogMode("create");
    setSelectedEmployee(undefined);
    setDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Employee Management</h1>
          <p className="text-gray-500 mt-2">
            Manage your mortgage brokerage staff and their permissions
          </p>
        </div>
        <Button 
          onClick={handleAddEmployee} 
          className="gap-2"
          aria-label="Add new employee"
        >
          <UserPlus className="h-4 w-4" />
          Add Employee
        </Button>
      </div>

      <DataTable
        columns={columns}
        data={employees}
        onRowClick={handleEmployeeClick}
      />

      <EmployeeDialog
        employee={selectedEmployee}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        mode={dialogMode}
      />
    </div>
  );
} 