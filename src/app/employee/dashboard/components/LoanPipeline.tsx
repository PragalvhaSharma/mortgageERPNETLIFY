'use client'

import { useState } from 'react'
import { Pie, Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title
} from 'chart.js'

// Register ChartJS components
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title
)

interface Loan {
  id: string
  clientName: string
  amount: number
  stage: 'received' | 'review' | 'approved' | 'funded' | 'closed'
  type: 'Conventional' | 'FHA' | 'VA' | 'USDA'
  submittedDate: Date
}

export default function LoanPipeline() {
  const [loans, setLoans] = useState<Loan[]>([
    {
      id: 'L1234',
      clientName: 'John Doe',
      amount: 350000,
      stage: 'review',
      type: 'Conventional',
      submittedDate: new Date('2024-03-15')
    },
    {
      id: 'L1235',
      clientName: 'Jane Smith',
      amount: 275000,
      stage: 'received',
      type: 'FHA',
      submittedDate: new Date('2024-03-16')
    },
    {
      id: 'L1236',
      clientName: 'Robert Johnson',
      amount: 425000,
      stage: 'approved',
      type: 'VA',
      submittedDate: new Date('2024-03-14')
    },
    {
      id: 'L1237',
      clientName: 'Maria Garcia',
      amount: 225000,
      stage: 'review',
      type: 'USDA',
      submittedDate: new Date('2024-03-17')
    },
    {
      id: 'L1238',
      clientName: 'David Wilson',
      amount: 550000,
      stage: 'funded',
      type: 'Conventional',
      submittedDate: new Date('2024-03-13')
    }
  ])

  const stages = ['received', 'review', 'approved', 'funded', 'closed']
  
  const getStageCount = (stage: string) => 
    loans.filter(loan => loan.stage === stage).length

  const getTotalValue = () => 
    loans.reduce((sum, loan) => sum + loan.amount, 0)

  // Prepare data for Pie Chart (Loan Types Distribution)
  const loanTypeData = {
    labels: ['Conventional', 'FHA', 'VA', 'USDA'],
    datasets: [{
      data: [
        loans.filter(loan => loan.type === 'Conventional').length,
        loans.filter(loan => loan.type === 'FHA').length,
        loans.filter(loan => loan.type === 'VA').length,
        loans.filter(loan => loan.type === 'USDA').length,
      ],
      backgroundColor: [
        'rgba(34, 197, 94, 0.6)',  // green
        'rgba(59, 130, 246, 0.6)', // blue
        'rgba(168, 85, 247, 0.6)', // purple
        'rgba(234, 179, 8, 0.6)',  // yellow
      ],
      borderColor: [
        'rgba(34, 197, 94, 1)',
        'rgba(59, 130, 246, 1)',
        'rgba(168, 85, 247, 1)',
        'rgba(234, 179, 8, 1)',
      ],
      borderWidth: 1,
    }]
  }

  // Prepare data for Line Chart (Pipeline Stage Trend)
  const pipelineData = {
    labels: stages,
    datasets: [{
      label: 'Number of Loans',
      data: stages.map(stage => getStageCount(stage)),
      fill: true,
      borderColor: 'rgb(59, 130, 246)',
      backgroundColor: 'rgba(59, 130, 246, 0.1)',
      tension: 0.4,
    }]
  }

  // Update the line chart options for better scaling and display
  const lineOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Pipeline Stage Distribution',
        font: {
          size: 16
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
          precision: 0 // Ensure whole numbers
        }
      }
    }
  }

  // Add pie chart options for better configuration
  const pieOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right' as const,
        labels: {
          padding: 20,
          usePointStyle: true
        }
      }
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Loan Pipeline</h2>
          <p className="text-gray-500 mt-1">Track your active loan applications</p>
        </div>
        <div className="bg-blue-50 px-6 py-3 rounded-lg">
          <div className="text-sm text-blue-600 font-medium">Total Pipeline Value</div>
          <div className="text-2xl font-bold text-blue-700">
            ${getTotalValue().toLocaleString()}
          </div>
        </div>
      </div>

      {/* Pipeline Visualization */}
      <div className="grid grid-cols-5 gap-6 mb-8">
        {stages.map((stage, index) => (
          <div 
            key={stage}
            className={`
              relative overflow-hidden rounded-xl p-6
              ${getStageCount(stage) > 0 ? 'bg-gradient-to-br from-blue-50 to-indigo-50' : 'bg-gray-50'}
              border border-gray-100 transition-all duration-200 hover:shadow-md
            `}
          >
            <div className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-1">
              {stage}
            </div>
            <div className="text-3xl font-bold text-gray-800">
              {getStageCount(stage)}
            </div>
            <div className="text-sm text-gray-500">Active Loans</div>
            {index < stages.length - 1 && (
              <div className="absolute -right-4 top-1/2 transform -translate-y-1/2 text-gray-300">
                →
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Update the Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Loan Type Distribution</h3>
          <div className="h-[300px] w-full">
            <Pie data={loanTypeData} options={pieOptions} />
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Pipeline Stage Trend</h3>
          <div className="h-[300px] w-full">
            <Line options={lineOptions} data={pipelineData} />
          </div>
        </div>
      </div>

      {/* Loan List */}
      <div className="overflow-x-auto rounded-lg border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Loan ID
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Client
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Amount
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Type
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Stage
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {loans.map(loan => (
              <tr 
                key={loan.id} 
                className="hover:bg-gray-50 transition-colors duration-150"
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">
                  {loan.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {loan.clientName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  ${loan.amount.toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  <span className={`
                    px-2 py-1 rounded-full text-xs font-medium
                    ${loan.type === 'Conventional' ? 'bg-green-100 text-green-800' : ''}
                    ${loan.type === 'FHA' ? 'bg-blue-100 text-blue-800' : ''}
                    ${loan.type === 'VA' ? 'bg-purple-100 text-purple-800' : ''}
                    ${loan.type === 'USDA' ? 'bg-yellow-100 text-yellow-800' : ''}
                  `}>
                    {loan.type}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <span className={`
                    px-2 py-1 rounded-full capitalize text-xs font-medium
                    ${loan.stage === 'received' ? 'bg-gray-100 text-gray-800' : ''}
                    ${loan.stage === 'review' ? 'bg-yellow-100 text-yellow-800' : ''}
                    ${loan.stage === 'approved' ? 'bg-green-100 text-green-800' : ''}
                    ${loan.stage === 'funded' ? 'bg-blue-100 text-blue-800' : ''}
                    ${loan.stage === 'closed' ? 'bg-purple-100 text-purple-800' : ''}
                  `}>
                    {loan.stage}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
} 