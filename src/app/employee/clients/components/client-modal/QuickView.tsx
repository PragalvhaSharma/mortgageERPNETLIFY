'use client'

import { Client } from '../types'

interface QuickViewProps {
  formData: Client
}

export default function QuickView({ formData }: QuickViewProps) {
  const capitalizeFirstLetter = (str: string): string => {
    return str.charAt(0).toUpperCase() + str.slice(1)
  }

  return (
    <div className="space-y-8">
      {/* Client Header with Status */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900">
              {formData.firstName} {formData.lastName}
            </h2>
            <p className="text-gray-500 mt-1">Client ID: {formData.id}</p>
          </div>
          <div className="flex flex-col items-end">
            <span
              className={`px-4 py-2 rounded-full text-sm font-medium
                ${
                  formData.status === 'Active'
                    ? 'bg-green-50 text-green-700 border border-green-200'
                    : formData.status === 'Pending'
                    ? 'bg-yellow-50 text-yellow-700 border border-yellow-200'
                    : 'bg-red-50 text-red-700 border border-red-200'
                }`}
            >
              {formData.status}
            </span>
            <span className="text-sm text-gray-500 mt-2">
              Loan Stage: {formData.loanStage || 'Not Started'}
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Financial Summary Card */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center mb-4">
            <div className="p-2 bg-blue-50 rounded-lg">
              <svg
                className="w-5 h-5 text-blue-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 ml-3">Financial Summary</h3>
          </div>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-500">Annual Income</label>
              <p className="text-xl font-semibold text-gray-900 mt-1">
                {formData.employment.annualIncome
                  ? new Intl.NumberFormat('en-CA', {
                      style: 'currency',
                      currency: formData.employment.incomeCurrency,
                    }).format(Number(formData.employment.annualIncome))
                  : 'Not specified'}
              </p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Primary Income Source</label>
              <p className="text-gray-900 mt-1">
                {formData.employment.primaryIncomeSource
                  ? formData.employment.primaryIncomeSource
                      .replace(/([A-Z])/g, ' $1')
                      .replace(/^./, capitalizeFirstLetter)
                  : 'Not specified'}
              </p>
            </div>
          </div>
        </div>

        {/* Housing Details Card */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center mb-4">
            <div className="p-2 bg-purple-50 rounded-lg">
              <svg
                className="w-5 h-5 text-purple-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 ml-3">Housing Information</h3>
          </div>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-500">Housing Status</label>
              <p className="text-gray-900 mt-1">
                {formData.employment.occupancyType
                  ? formData.employment.occupancyType
                      .replace(/([A-Z])/g, ' $1')
                      .replace(/^./, capitalizeFirstLetter)
                  : 'Not specified'}
              </p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Monthly Housing Cost</label>
              <p className="text-xl font-semibold text-gray-900 mt-1">
                {formData.employment.monthlyHousingCost
                  ? new Intl.NumberFormat('en-CA', {
                      style: 'currency',
                      currency: formData.employment.housingCostCurrency,
                    }).format(Number(formData.employment.monthlyHousingCost))
                  : 'Not specified'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Employment Details Card */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <div className="flex items-center mb-6">
          <div className="p-2 bg-green-50 rounded-lg">
            <svg
              className="w-5 h-5 text-green-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 ml-3">Employment Details</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="text-sm font-medium text-gray-500">Current Employer</label>
            <p className="text-gray-900 mt-1">
              {formData.employment.employer || 'Not specified'}
            </p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-500">Employment Status</label>
            <p className="text-gray-900 mt-1">
              {formData.employment.employmentStatus
                ? formData.employment.employmentStatus
                    .replace(/([A-Z])/g, ' $1')
                    .replace(/^./, capitalizeFirstLetter)
                : 'Not specified'}
            </p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-500">Occupation</label>
            <p className="text-gray-900 mt-1">
              {formData.employment.occupation || 'Not specified'}
            </p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-500">Time at Current Job</label>
            <p className="text-gray-900 mt-1">
              {formData.employment.employedSince
                ? `${Math.floor(
                    (new Date().getTime() - new Date(formData.employment.employedSince).getTime()) /
                      (1000 * 60 * 60 * 24 * 365)
                  )} years`
                : 'Not specified'}
            </p>
          </div>
        </div>
      </div>

      {/* Contact Information Card */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <div className="flex items-center mb-6">
          <div className="p-2 bg-indigo-50 rounded-lg">
            <svg
              className="w-5 h-5 text-indigo-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 ml-3">Contact Information</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="text-sm font-medium text-gray-500">Email</label>
            <p className="text-gray-900 mt-1">{formData.email || 'Not specified'}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-500">Phone</label>
            <p className="text-gray-900 mt-1">{formData.phone || 'Not specified'}</p>
          </div>
          <div className="sm:col-span-2">
            <label className="text-sm font-medium text-gray-500">Address</label>
            <p className="text-gray-900 mt-1">
              {formData.address.streetNumber && formData.address.streetName
                ? `${formData.address.streetNumber} ${formData.address.streetName}${
                    formData.address.unit ? `, Unit ${formData.address.unit}` : ''
                  }, ${formData.address.city}, ${formData.address.province} ${
                    formData.address.postalCode
                  }`
                : 'Not specified'}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
} 