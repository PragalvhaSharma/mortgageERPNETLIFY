'use client'

import { Client } from '../types'

interface AddressInfoProps {
  formData: Client
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void
  mode: 'view' | 'edit'
}

export default function AddressInfo({ formData, handleChange, mode }: AddressInfoProps) {
  return (
    <div className="space-y-8">
      {/* Primary Address Card */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <h3 className="text-lg font-medium text-gray-900 mb-6 flex items-center">
          <div className="p-2 bg-indigo-50 rounded-lg mr-3">
            <svg className="w-5 h-5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
          </div>
          Primary Address
        </h3>

        {/* Street Information */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Street Number</label>
            <input
              type="text"
              name="address.streetNumber"
              value={formData.address.streetNumber}
              onChange={handleChange}
              disabled={mode === 'view'}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 disabled:bg-gray-50"
            />
          </div>
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Street Name</label>
            <input
              type="text"
              name="address.streetName"
              value={formData.address.streetName}
              onChange={handleChange}
              disabled={mode === 'view'}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 disabled:bg-gray-50"
            />
          </div>
        </div>

        {/* Unit Number */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">Unit #</label>
          <input
            type="text"
            name="address.unit"
            value={formData.address.unit}
            onChange={handleChange}
            disabled={mode === 'view'}
            placeholder="Optional"
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 disabled:bg-gray-50"
          />
        </div>

        {/* City and Province */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
            <input
              type="text"
              name="address.city"
              value={formData.address.city}
              onChange={handleChange}
              disabled={mode === 'view'}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 disabled:bg-gray-50"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Province</label>
            <select
              name="address.province"
              value={formData.address.province}
              onChange={handleChange}
              disabled={mode === 'view'}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 disabled:bg-gray-50"
            >
              <option value="">Select Province</option>
              <option value="AB">Alberta</option>
              <option value="BC">British Columbia</option>
              <option value="MB">Manitoba</option>
              <option value="NB">New Brunswick</option>
              <option value="NL">Newfoundland and Labrador</option>
              <option value="NS">Nova Scotia</option>
              <option value="ON">Ontario</option>
              <option value="PE">Prince Edward Island</option>
              <option value="QC">Quebec</option>
              <option value="SK">Saskatchewan</option>
              <option value="NT">Northwest Territories</option>
              <option value="NU">Nunavut</option>
              <option value="YT">Yukon</option>
            </select>
          </div>
        </div>

        {/* Country and Postal Code */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
            <select
              name="address.country"
              value={formData.address.country}
              onChange={handleChange}
              disabled={mode === 'view'}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 disabled:bg-gray-50"
            >
              <option value="">Select Country</option>
              <option value="CA">Canada</option>
              <option value="US">United States</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Postal Code</label>
            <input
              type="text"
              name="address.postalCode"
              value={formData.address.postalCode}
              onChange={handleChange}
              disabled={mode === 'view'}
              placeholder="A1A 1A1"
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 disabled:bg-gray-50"
            />
          </div>
        </div>
      </div>
    </div>
  )
} 