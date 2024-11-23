'use client'

import { useState } from 'react'
import { FiFileText, FiAlertCircle, FiCheckCircle, FiX } from 'react-icons/fi'

interface Document {
  id: string
  name: string
  status: 'verified' | 'needs_attention' | 'missing'
  uploadDate: Date
  type: 'income' | 'identity' | 'property' | 'other'
}

export default function DocumentManager() {
  const [documents, setDocuments] = useState<Document[]>([
    {
      id: 'DOC1',
      name: 'W-2 Form 2023',
      status: 'needs_attention',
      uploadDate: new Date('2024-03-15'),
      type: 'income'
    },
    {
      id: 'DOC2',
      name: 'Property Appraisal',
      status: 'verified',
      uploadDate: new Date('2024-03-14'),
      type: 'property'
    },
    {
      id: 'DOC3',
      name: 'Drivers License',
      status: 'missing',
      uploadDate: new Date('2024-03-13'),
      type: 'identity'
    },
    {
      id: 'DOC4',
      name: 'Bank Statements',
      status: 'verified',
      uploadDate: new Date('2024-03-16'),
      type: 'income'
    }
  ])

  const getStatusConfig = (status: string) => {
    const config = {
      verified: {
        color: 'bg-green-100 text-green-800 border-green-200',
        icon: <FiCheckCircle className="w-4 h-4" />,
      },
      needs_attention: {
        color: 'bg-yellow-100 text-yellow-800 border-yellow-200',
        icon: <FiAlertCircle className="w-4 h-4" />,
      },
      missing: {
        color: 'bg-red-100 text-red-800 border-red-200',
        icon: <FiX className="w-4 h-4" />,
      }
    }
    return config[status as keyof typeof config]
  }

  const getDocumentTypeStyle = (type: string) => {
    const styles = {
      income: 'text-purple-700 bg-purple-50 border-purple-100',
      identity: 'text-blue-700 bg-blue-50 border-blue-100',
      property: 'text-emerald-700 bg-emerald-50 border-emerald-100',
      other: 'text-gray-700 bg-gray-50 border-gray-100'
    }
    return styles[type as keyof typeof styles]
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100">
      <div className="border-b border-gray-100 p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">Required Documents</h2>
          <span className="text-sm text-gray-500">
            {documents.filter(d => d.status === 'verified').length} of {documents.length} verified
          </span>
        </div>
      </div>

      <div className="divide-y divide-gray-100">
        {documents.map(doc => (
          <div 
            key={doc.id}
            className="p-6 hover:bg-gray-50 transition-colors duration-200"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-gray-50 rounded-lg">
                  <FiFileText className="w-6 h-6 text-gray-600" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">{doc.name}</h3>
                  <div className="flex items-center space-x-3 mt-1">
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium 
                      ${getDocumentTypeStyle(doc.type)} border`}>
                      {doc.type}
                    </span>
                    <p className="text-sm text-gray-500">
                      Uploaded {doc.uploadDate.toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <span className={`px-3 py-1 rounded-full text-xs font-medium flex items-center 
                  space-x-1 border ${getStatusConfig(doc.status).color}`}>
                  {getStatusConfig(doc.status).icon}
                  <span>{doc.status.replace('_', ' ')}</span>
                </span>
                <div className="flex items-center space-x-2">
                  <button className="px-3 py-1.5 text-sm text-gray-700 hover:text-gray-900 
                    hover:bg-gray-100 rounded-lg transition-colors duration-200">
                    Download
                  </button>
                  <button className="px-3 py-1.5 text-sm text-blue-600 hover:text-blue-700 
                    hover:bg-blue-50 rounded-lg transition-colors duration-200 font-medium">
                    View
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
} 