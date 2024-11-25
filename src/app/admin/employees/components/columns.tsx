"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, UserCog } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export type Employee = {
  id: string;
  name: string;
  email: string;
  role: "Broker" | "Loan Officer" | "Processor" | "Administrator";
  status: "Active" | "Pending" | "Inactive";
  joinDate: string;
  lastLogin?: string;
  phone?: string;
  deals?: number;
  department?: string;
  address?: {
    street?: string;
    city?: string;
    state?: string;
    zipCode?: string;
  };
  performance?: {
    closedDeals: number;
    activeDeals: number;
    revenue: number;
  };
};

export const columns: ColumnDef<Employee>[] = [
  {
    accessorKey: "name",
    header: "NAME",
    cell: ({ row }) => {
      const employee = row.original;
      const initials = employee.name.split(' ').map(n => n[0]).join('');
      return (
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-semibold text-sm">
            {initials}
          </div>
          <div className="font-medium">{employee.name}</div>
        </div>
      );
    },
  },
  {
    accessorKey: "role",
    header: "ROLE",
    cell: ({ row }) => {
      const role = row.getValue("role") as string;
      return (
        <div className="font-medium">
          {role}
        </div>
      );
    },
  },
  {
    accessorKey: "department",
    header: "DEPARTMENT",
    cell: ({ row }) => {
      const department = row.getValue("department") as string;
      return (
        <div className="font-medium">
          {department || "—"}
        </div>
      );
    },
  },
  {
    accessorKey: "deals",
    header: "DEALS",
    cell: ({ row }) => {
      const deals = row.getValue("deals") as number;
      return (
        <div className="font-medium">
          {deals || "0"}
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: "STATUS",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      return (
        <Badge variant="outline" className={
          status === "Active" 
            ? "bg-green-50 text-green-700 border-green-200"
            : status === "Pending"
            ? "bg-yellow-50 text-yellow-700 border-yellow-200"
            : "bg-gray-50 text-gray-700 border-gray-200"
        }>
          {status}
        </Badge>
      );
    },
  },
  {
    accessorKey: "joinDate",
    header: "JOIN DATE",
    cell: ({ row }) => {
      const date = new Date(row.getValue("joinDate"));
      return (
        <div className="font-medium text-gray-600">
          {date.toLocaleDateString()}
          <div className="text-xs text-gray-400">
            {date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </div>
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const employee = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem>View details</DropdownMenuItem>
            <DropdownMenuItem>Edit employee</DropdownMenuItem>
            <DropdownMenuItem>View deals</DropdownMenuItem>
            <DropdownMenuItem className="text-red-600">
              Deactivate account
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
]; 