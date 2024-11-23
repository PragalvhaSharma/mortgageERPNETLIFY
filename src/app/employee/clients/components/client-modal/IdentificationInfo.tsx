'use client'

import { Client } from '../types'

interface IdentificationInfoProps {
  formData: Client
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  mode: 'view' | 'edit'
}

export default function IdentificationInfo({ formData, handleChange, mode }: IdentificationInfoProps) {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <div className="flex items-center mb-4">
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
                d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" 
              />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 ml-3">Identification Details</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Social Insurance Number (SIN)</label>
            <input
              type="text"
              name="identification.ssn"
              value={formData.identification.ssn}
              onChange={handleChange}
              disabled={mode === 'view'}
              placeholder="123-456-789"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 disabled:bg-gray-50"
            />
            <p className="mt-1 text-sm text-gray-500">Format: XXX-XXX-XXX</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Driver's License</label>
            <input
              type="text"
              name="identification.driverLicense"
              value={formData.identification.driverLicense}
              onChange={handleChange}
              disabled={mode === 'view'}
              placeholder="DL1234567"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 disabled:bg-gray-50"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">License Expiration Date</label>
            <input
              type="date"
              name="identification.expirationDate"
              value={formData.identification.expirationDate}
              onChange={handleChange}
              disabled={mode === 'view'}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 disabled:bg-gray-50"
            />
            {formData.identification.expirationDate && new Date(formData.identification.expirationDate) < new Date() && (
              <p className="mt-2 text-sm text-red-600">
                Warning: License has expired
              </p>
            )}
          </div>
        </div>

        <div className="mt-6 p-4 bg-gray-50 rounded-md">
          <div className="flex items-center">
            <svg 
              className="h-5 w-5 text-gray-400" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
              />
            </svg>
            <p className="ml-2 text-sm text-gray-500">
              All identification information is encrypted and stored securely. Access to this information is logged and monitored.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
} 