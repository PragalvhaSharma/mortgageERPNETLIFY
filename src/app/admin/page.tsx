"use client";

import { useEffect, useState } from "react";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts";
import {
  ArrowUpRight,
  ArrowDownRight,
  MoreHorizontal,
  CheckCircle,
  Clock,
  XCircle,
  Users,
  DollarSign,
  ChevronDown,
  Calendar,
} from "lucide-react";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@/components/ui/table";

const monthlyData = [
  { name: "Jan", value: 45000 },
  { name: "Feb", value: 38000 },
  { name: "Mar", value: 52000 },
  { name: "Apr", value: 61000 },
  { name: "May", value: 55000 },
  { name: "Jun", value: 68000 },
  { name: "Jul", value: 72000 },
  { name: "Aug", value: 69000 },
  { name: "Sep", value: 75000 },
  { name: "Oct", value: 80000 },
  { name: "Nov", value: 82000 },
  { name: "Dec", value: 90000 },
];

const topBrokersData = [
  { name: "John Doe", deals: 35 },
  { name: "Jane Smith", deals: 28 },
  { name: "Mike Johnson", deals: 24 },
  { name: "Emily Davis", deals: 20 },
  { name: "William Brown", deals: 18 },
];

const dealStatusData = [
  {
    name: "Approved",
    value: 18,
    color: "#10B981",
    description: "Ready for closing",
    change: "+3 from last month",
  },
  {
    name: "Pending",
    value: 12,
    color: "#F59E0B",
    description: "In underwriting",
    change: "+3 from last month",
  },
  {
    name: "Rejected",
    value: 7,
    color: "#EF4444",
    description: "Did not qualify",
    change: "-1 from last month",
  },
  {
    name: "Closed",
    value: 5,
    color: "#6366F1",
    description: "Completed this month",
    change: "Same as last month",
  },
];

const loanPerformanceData = [
  { name: "Jan", approved: 30, pending: 10, rejected: 5 },
  { name: "Feb", approved: 25, pending: 15, rejected: 8 },
  { name: "Mar", approved: 35, pending: 12, rejected: 6 },
  { name: "Apr", approved: 40, pending: 18, rejected: 4 },
  { name: "May", approved: 38, pending: 20, rejected: 7 },
  { name: "Jun", approved: 45, pending: 22, rejected: 5 },
];

const teamMembers = [
  {
    id: 1,
    name: "John Doe",
    role: "Senior Broker",
    avatar: "/images/avatar1.jpg",
    performance: 80,
  },
  {
    id: 2,
    name: "Jane Smith",
    role: "Broker",
    avatar: "/images/avatar2.jpg",
    performance: 70,
  },
  {
    id: 3,
    name: "Mike Johnson",
    role: "Associate Broker",
    avatar: "/images/avatar3.jpg",
    performance: 65,
  },
];

const upcomingAppointments = [
  {
    id: 1,
    client: "David Wilson",
    date: "2023-10-22",
    time: "10:00 AM",
    broker: "John Doe",
    status: "Confirmed",
  },
  {
    id: 2,
    client: "Laura Martinez",
    date: "2023-10-23",
    time: "1:00 PM",
    broker: "Jane Smith",
    status: "Pending",
  },
  {
    id: 3,
    client: "James Anderson",
    date: "2023-10-24",
    time: "3:30 PM",
    broker: "Mike Johnson",
    status: "Rescheduled",
  },
];

const recentActivity = [
  {
    id: 1,
    action: "New Mortgage Application",
    client: "Sarah Johnson",
    amount: "$285,000",
    time: "2 hours ago",
    status: "Pending",
  },
  {
    id: 2,
    action: "Pre-Approval Completed",
    client: "Mike Smith",
    amount: "$425,000",
    time: "4 hours ago",
    status: "Approved",
  },
  {
    id: 3,
    action: "Loan Closed",
    client: "Emily Brown",
    amount: "$320,000",
    time: "6 hours ago",
    status: "Closed",
  },
  {
    id: 4,
    action: "Application Rejected",
    client: "Robert Lee",
    amount: "$300,000",
    time: "8 hours ago",
    status: "Rejected",
  },
];

// Define props interface for StatCard
interface StatCardProps {
  title: string;
  value: string | number;
  change: number;
  isPositive: boolean;
  icon: React.ReactNode;
}

function StatCard({ title, value, change, isPositive, icon }: StatCardProps) {
  return (
    <Card className="hover:shadow-xl transition-all duration-200 hover:-translate-y-1 bg-white border-none">
      <CardHeader className="flex items-center justify-between p-6">
        <div className="space-y-1">
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="text-3xl font-bold text-gray-900">{value}</p>
        </div>
        <div className="p-3 bg-indigo-50 rounded-xl text-indigo-600">{icon}</div>
      </CardHeader>
      <CardFooter className="px-6 pb-6 pt-0">
        <div
          className={`flex items-center text-sm font-medium ${
            isPositive ? "text-emerald-600" : "text-rose-600"
          }`}
        >
          {isPositive ? (
            <ArrowUpRight className="w-4 h-4 mr-1.5" />
          ) : (
            <ArrowDownRight className="w-4 h-4 mr-1.5" />
          )}
          <span>{Math.abs(change)}% from last month</span>
        </div>
      </CardFooter>
    </Card>
  );
}

// Update the BarChart component styling
function ModernBarChart({ data }: { data: typeof topBrokersData }) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data} layout="vertical" margin={{ left: 20, right: 20 }}>
        <XAxis 
          type="number" 
          stroke="#94a3b8"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          type="category"
          dataKey="name"
          stroke="#94a3b8"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <Tooltip
          cursor={{ fill: '#f8fafc' }}
          contentStyle={{
            backgroundColor: '#ffffff',
            borderRadius: '8px',
            border: 'none',
            boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
            padding: '12px',
          }}
        />
        <Bar
          dataKey="deals"
          fill="#818cf8"
          radius={[4, 4, 4, 4]}
          barSize={24}
        >
          {data.map((entry, index) => (
            <Cell 
              key={`cell-${index}`}
              fill={index === 0 ? '#4f46e5' : '#818cf8'}
              opacity={1 - (index * 0.15)}
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

// Update the appointments section
function AppointmentCard({ appointment }: { appointment: typeof upcomingAppointments[0] }) {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'confirmed': return 'bg-emerald-50 text-emerald-700';
      case 'pending': return 'bg-amber-50 text-amber-700';
      case 'rescheduled': return 'bg-blue-50 text-blue-700';
      default: return 'bg-gray-50 text-gray-700';
    }
  };

  return (
    <div className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg transition-all">
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center">
          <span className="text-indigo-600 font-medium">
            {appointment.client.charAt(0)}
          </span>
        </div>
        <div>
          <p className="font-medium text-gray-900">{appointment.client}</p>
          <p className="text-sm text-gray-500">
            {appointment.date} at {appointment.time}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-600">{appointment.broker}</span>
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(appointment.status)}`}>
          {appointment.status}
        </span>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <div className="max-w-[1600px] mx-auto p-8 bg-gray-50 min-h-screen">
      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Monthly Revenue"
          value="$90,000"
          change={15.0}
          isPositive={true}
          icon={<DollarSign className="w-8 h-8" />}
        />
        <StatCard
          title="Active Applications"
          value="42"
          change={5.5}
          isPositive={true}
          icon={<CheckCircle className="w-8 h-8" />}
        />
        <StatCard
          title="New Clients"
          value="22"
          change={10.2}
          isPositive={true}
          icon={<Users className="w-8 h-8" />}
        />
        <StatCard
          title="Approval Rate"
          value="78%"
          change={3.5}
          isPositive={true}
          icon={<ArrowUpRight className="w-8 h-8" />}
        />
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-8">
          {/* Monthly Revenue Chart */}
          <Card className="shadow-md border-none bg-white">
            <CardHeader className="p-6 pb-0">
              <h2 className="text-xl font-semibold text-gray-900">
                Monthly Revenue
              </h2>
            </CardHeader>
            <CardContent className="h-80 p-4">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={monthlyData}>
                  <defs>
                    <linearGradient
                      id="colorRevenue"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop
                        offset="5%"
                        stopColor="#4F46E5"
                        stopOpacity={0.8}
                      />
                      <stop
                        offset="95%"
                        stopColor="#4F46E5"
                        stopOpacity={0}
                      />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis dataKey="name" stroke="#6B7280" />
                  <YAxis stroke="#6B7280" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#fff",
                      borderRadius: "8px",
                      border: "1px solid #E5E7EB",
                      boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke="#4F46E5"
                    fillOpacity={1}
                    fill="url(#colorRevenue)"
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Loan Performance Line Chart */}
          <Card className="shadow-lg">
            <CardHeader className="p-4">
              <h2 className="text-lg font-bold text-gray-900">
                Loan Performance Overview
              </h2>
            </CardHeader>
            <CardContent className="h-80 p-4">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={loanPerformanceData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis dataKey="name" stroke="#6B7280" />
                  <YAxis stroke="#6B7280" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#fff",
                      borderRadius: "8px",
                      border: "1px solid #E5E7EB",
                      boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="approved"
                    stroke="#10B981"
                    strokeWidth={2}
                  />
                  <Line
                    type="monotone"
                    dataKey="pending"
                    stroke="#F59E0B"
                    strokeWidth={2}
                  />
                  <Line
                    type="monotone"
                    dataKey="rejected"
                    stroke="#EF4444"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card className="shadow-lg">
            <CardHeader className="flex justify-between items-center p-4">
              <h2 className="text-lg font-bold text-gray-900">
                Recent Activity
              </h2>
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="w-5 h-5 text-gray-600" />
              </Button>
            </CardHeader>
            <CardContent className="p-4">
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div
                    key={activity.id}
                    className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg transition-all duration-200 cursor-pointer"
                  >
                    <div>
                      <h3 className="font-semibold text-gray-800">
                        {activity.action}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {activity.client} •{" "}
                        <span className="text-gray-800 font-medium">
                          {activity.amount}
                        </span>
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline">{activity.status}</Badge>
                      <span className="text-sm text-gray-500">
                        {activity.time}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column */}
        <div className="space-y-8">
          {/* Top Brokers Chart */}
          <Card className="shadow-sm border-none bg-white">
            <CardHeader className="p-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">
                  Top Brokers
                </h2>
                <Button variant="ghost" size="sm" className="text-gray-500 hover:text-gray-700">
                  This Month <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-6 pt-0">
              <ModernBarChart data={topBrokersData} />
            </CardContent>
          </Card>

          {/* Loan Pipeline Status */}
          <Card className="shadow-lg">
            <CardHeader className="p-4">
              <h2 className="text-lg font-bold text-gray-900">
                Loan Pipeline Status
              </h2>
            </CardHeader>
            <CardContent className="p-4">
              <div className="flex flex-col items-center">
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie
                      data={dealStatusData}
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {dealStatusData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={entry.color}
                          stroke="none"
                        />
                      ))}
                    </Pie>
                    <Tooltip
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          const data = payload[0].payload;
                          return (
                            <div className="bg-white p-3 rounded-lg shadow-lg border border-gray-100">
                              <p className="font-semibold text-gray-800">
                                {data.name}
                              </p>
                              <p className="text-sm text-gray-600">
                                {data.value} applications
                              </p>
                              <p className="text-xs text-gray-500">
                                {data.description}
                              </p>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
                <div className="mt-4 w-full">
                  {dealStatusData.map((status, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between py-2"
                    >
                      <div className="flex items-center space-x-2">
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: status.color }}
                        />
                        <span className="text-sm text-gray-700">
                          {status.name}
                        </span>
                      </div>
                      <span className="text-sm text-gray-600">
                        {status.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Team Performance */}
          <Card className="shadow-md border-none bg-white">
            <CardHeader className="p-6">
              <h2 className="text-xl font-semibold text-gray-900">
                Team Performance
              </h2>
            </CardHeader>
            <CardContent className="p-6 pt-2 space-y-6">
              {teamMembers.map((member) => (
                <div
                  key={member.id}
                  className="flex items-center space-x-4 p-4 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <Avatar
                    fallback={member.name.charAt(0)}
                    className="w-12 h-12 border-2 border-white shadow-sm"
                  >
                    <img
                      src={member.avatar}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900 truncate">
                      {member.name}
                    </p>
                    <p className="text-sm text-gray-500">{member.role}</p>
                    <div className="mt-2 w-full">
                      <Progress
                        value={member.performance}
                        className="h-2"
                      />
                    </div>
                  </div>
                  <span className="text-sm font-medium text-gray-900">
                    {member.performance}%
                  </span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Update the Appointments section */}
      <Card className="shadow-sm border-none bg-white mt-8">
        <CardHeader className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                Upcoming Appointments
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                You have {upcomingAppointments.length} appointments scheduled
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Calendar className="mr-2 h-4 w-4" />
                View Calendar
              </Button>
              <Button size="sm">
                Add New
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6 pt-0">
          <div className="space-y-1">
            {upcomingAppointments.map((appointment) => (
              <AppointmentCard 
                key={appointment.id} 
                appointment={appointment} 
              />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
