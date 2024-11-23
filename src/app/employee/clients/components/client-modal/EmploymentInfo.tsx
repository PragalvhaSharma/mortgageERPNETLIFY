'use client'

import { Client } from '../types'

interface EmploymentInfoProps {
  formData: Client
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void
  mode: 'view' | 'edit'
}

export default function EmploymentInfo({ formData, handleChange, mode }: EmploymentInfoProps) {
  const employmentStartDate = new Date(formData.employment.employedSince)
  const today = new Date()
  const employmentLength = employmentStartDate ? today.getFullYear() - employmentStartDate.getFullYear() : 0
  const showPreviousEmployment = employmentLength < 2

  return (
    <div className="space-y-6">
      {/* Housing Details Section */}
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
          <h3 className="text-lg font-semibold text-gray-900 ml-3">Housing Details</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="text-sm font-medium text-gray-500">Occupancy Type</label>
            <select
              name="employment.occupancyType"
              value={formData.employment.occupancyType}
              onChange={handleChange}
              disabled={mode === 'view'}
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-white"
            >
              <option value="">Select Occupancy Type</option>
              <option value="rent">Rent</option>
              <option value="own">Own</option>
              <option value="rentfree">Rent Free</option>
              <option value="rentdown">Rent Down</option>
            </select>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-500">Monthly Housing Cost</label>
            <div className="mt-1 flex rounded-lg shadow-sm">
              <input
                type="number"
                name="employment.monthlyHousingCost"
                value={formData.employment.monthlyHousingCost}
                onChange={handleChange}
                disabled={mode === 'view'}
                className="block w-full rounded-l-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500"
              />
              <select
                name="employment.housingCostCurrency"
                value={formData.employment.housingCostCurrency}
                onChange={handleChange}
                disabled={mode === 'view'}
                className="rounded-r-lg border-l-0 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="CAD">CAD</option>
                <option value="USD">USD</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Income Details Section */}
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
          <h3 className="text-lg font-semibold text-gray-900 ml-3">Income Details</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Primary Income Source</label>
            <select
              name="employment.primaryIncomeSource"
              value={formData.employment.primaryIncomeSource}
              onChange={handleChange}
              disabled={mode === 'view'}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="">Select Income Source</option>
              <option value="employment">Employment Income</option>
              <option value="selfEmployed">Business (Self-Employed)</option>
              <option value="pension">Pension</option>
              <option value="investment">Investment Income</option>
              <option value="ccb">CCB Income</option>
              <option value="rental">Rental Income</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Annual Income</label>
            <div className="mt-1 flex rounded-md shadow-sm">
              <input
                type="number"
                name="employment.annualIncome"
                value={formData.employment.annualIncome}
                onChange={handleChange}
                disabled={mode === 'view'}
                className="block w-full rounded-l-md border-gray-300 focus:border-blue-500 focus:ring-blue-500"
              />
              <select
                name="employment.incomeCurrency"
                value={formData.employment.incomeCurrency}
                onChange={handleChange}
                disabled={mode === 'view'}
                className="rounded-r-md border-l-0 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="CAD">CAD</option>
                <option value="USD">USD</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Current Employment Details Section */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <div className="flex items-center mb-4">
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
          <h3 className="text-lg font-semibold text-gray-900 ml-3">Current Employment Details</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Employer</label>
            <input
              type="text"
              name="employment.employer"
              value={formData.employment.employer}
              onChange={handleChange}
              disabled={mode === 'view'}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Employment Status</label>
            <select
              name="employment.employmentStatus"
              value={formData.employment.employmentStatus}
              onChange={handleChange}
              disabled={mode === 'view'}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            >
              <option value="">Select Status</option>
              <option value="fullTime">Full Time</option>
              <option value="partTime">Part Time</option>
              <option value="contract">Contract</option>
              <option value="seasonal">Seasonal</option>
              <option value="selfEmployed">Self Employed</option>
              <option value="unemployed">Unemployed</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Employed Since</label>
            <input
              type="date"
              name="employment.employedSince"
              value={formData.employment.employedSince}
              onChange={handleChange}
              disabled={mode === 'view'}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Occupation</label>
            <input
              type="text"
              name="employment.occupation"
              value={formData.employment.occupation}
              onChange={handleChange}
              disabled={mode === 'view'}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-gray-700">Occupation Details</label>
            <textarea
              name="employment.occupationDetails"
              value={formData.employment.occupationDetails}
              onChange={handleChange}
              disabled={mode === 'view'}
              rows={3}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Previous Employment Section */}
      {showPreviousEmployment && (
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <div className="p-2 bg-amber-50 rounded-lg">
                <svg
                  className="w-5 h-5 text-amber-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 ml-3">Previous Employment Details</h3>
            </div>
            <span className="text-sm text-amber-600 bg-amber-50 px-3 py-1 rounded-full">
              Required - Current employment less than 2 years
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Previous Employer</label>
              <input
                type="text"
                name="employment.previousEmployer"
                value={formData.employment.previousEmployer}
                onChange={handleChange}
                disabled={mode === 'view'}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Employment Status</label>
              <select
                name="employment.previousEmploymentStatus"
                value={formData.employment.previousEmploymentStatus}
                onChange={handleChange}
                disabled={mode === 'view'}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required={showPreviousEmployment}
              >
                <option value="">Select Status</option>
                <option value="fullTime">Full Time</option>
                <option value="partTime">Part Time</option>
                <option value="contract">Contract</option>
                <option value="seasonal">Seasonal</option>
                <option value="selfEmployed">Self Employed</option>
                <option value="unemployed">Unemployed</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Employed From</label>
              <input
                type="date"
                name="employment.previousEmployedFrom"
                value={formData.employment.previousEmployedFrom}
                onChange={handleChange}
                disabled={mode === 'view'}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Employed To</label>
              <input
                type="date"
                name="employment.previousEmployedTo"
                value={formData.employment.previousEmployedTo}
                onChange={handleChange}
                disabled={mode === 'view'}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Previous Occupation</label>
              <input
                type="text"
                name="employment.previousOccupation"
                value={formData.employment.previousOccupation}
                onChange={handleChange}
                disabled={mode === 'view'}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700">Previous Occupation Details</label>
              <textarea
                name="employment.previousOccupationDetails"
                value={formData.employment.previousOccupationDetails}
                onChange={handleChange}
                disabled={mode === 'view'}
                rows={3}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
} 