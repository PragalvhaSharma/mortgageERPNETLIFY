'use client'

import { useState, useEffect } from 'react'
import { FaTimes } from 'react-icons/fa'
import QuickView from './client-modal/QuickView'
import PersonalInfo from './client-modal/PersonalInfo'
import AddressInfo from './client-modal/AddressInfo'
import EmploymentInfo from './client-modal/EmploymentInfo'
import IdentificationInfo from './client-modal/IdentificationInfo'
import DocumentUpload from './client-modal/DocumentUpload'
import type { Client } from '../components/types'
import { toast } from 'react-hot-toast'
import { getInitialClients, updateMockClients } from '../data/mockDataOperations'

type NestedKeys = 'address' | 'employment' | 'identification'
type NestedObjects = {
  address: Client['address'];
  employment: Client['employment'];
  identification: Client['identification'];
}

function isNestedKey(key: string): key is NestedKeys {
  return ['address', 'employment', 'identification'].includes(key)
}

interface ClientModalProps {
  clientId?: string
  isOpen: boolean
  onClose: () => void
  mode: 'view' | 'edit'
  onSave: (client: Client) => void
  onDelete?: (client: Client) => void
}

const emptyClient: Client = {
  id: '',
  firstName: '',
  middleName: '',
  lastName: '',
  email: '',
  phone: '',
  status: 'Draft',
  loanStage: 'Application Review',
  gender: '',
  dateOfBirth: '',
  age: '',
  primaryLanguage: '',
  maritalStatus: '',
  sourceOfWealth: '',
  primaryCitizenship: '',
  address: {
    streetNumber: '',
    streetName: '',
    unit: '',
    city: '',
    province: '',
    country: '',
    postalCode: '',
  },
  employment: {
    occupancyType: '',
    monthlyHousingCost: '',
    housingCostCurrency: 'CAD',
    annualIncome: '',
    incomeCurrency: 'CAD',
    primaryIncomeSource: '',
    employer: '',
    employmentStatus: '',
    employedSince: '',
    occupation: '',
    occupationDetails: '',
    previousEmployer: '',
    previousEmploymentStatus: '',
    previousEmployedFrom: '',
    previousEmployedTo: '',
    previousOccupation: '',
    previousOccupationDetails: '',
  },
  identification: {
    ssn: '',
    driverLicense: '',
    expirationDate: '',
  },
}

export default function ClientModal({ clientId, isOpen, onClose, mode, onSave, onDelete }: ClientModalProps) {
  const [client, setClient] = useState<Client | null>(null)
  const [formData, setFormData] = useState<Client>(emptyClient)
  const [documents, setDocuments] = useState<File[]>([])

  useEffect(() => {
    if (clientId) {
      const clients = getInitialClients()
      const selectedClient = clients.find(c => c.id === clientId)
      if (selectedClient) {
        setClient(selectedClient)
        setFormData(selectedClient)
      }
    } else {
      // Reset form data when adding a new client
      setClient(null)
      setFormData(emptyClient)
    }
  }, [clientId, isOpen]) // Add isOpen to dependencies to reset when modal opens

  const validateRequiredFields = () => {
    const requiredFields = {
      firstName: 'First Name',
      lastName: 'Last Name',
      email: 'Email',
      phone: 'Phone Number',
      'address.streetNumber': 'Street Number',
      'address.streetName': 'Street Name',
      'address.city': 'City',
      'address.province': 'Province',
      'address.country': 'Country',
      'address.postalCode': 'Postal Code',
      'identification.ssn': 'SSN',
    }

    const missingFields: string[] = []

    Object.entries(requiredFields).forEach(([field, label]) => {
      const [parent, child] = field.split('.')
      if (child) {
        if (isNestedKey(parent)) {
          const nestedObj = formData[parent] as NestedObjects[typeof parent]
          if (!nestedObj || typeof nestedObj !== 'object' || !nestedObj[child as keyof typeof nestedObj]) {
            missingFields.push(label)
          }
        }
      } else if (!formData[field as keyof Client]) {
        missingFields.push(label)
      }
    })

    return missingFields
  }

  const [activeTab, setActiveTab] = useState('quick-view')

  const [isFormComplete, setIsFormComplete] = useState(false)
  const [missingFieldsList, setMissingFieldsList] = useState<string[]>([])

  useEffect(() => {
    console.log('Client prop changed:', client)
    if (client) {
      console.log('Setting form data to client')
      setFormData(client)
    }
  }, [client])

  useEffect(() => {
    const missingFields = validateRequiredFields()
    setIsFormComplete(missingFields.length === 0)
    setMissingFieldsList(missingFields)
  }, [formData])

  if (!isOpen) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const missingFields = validateRequiredFields()
    
    if (missingFields.length > 0) {
      toast.error(
        <div>
          <p>Please fill in the following required fields:</p>
          <ul className="list-disc pl-4 mt-2">
            {missingFields.map((field) => (
              <li key={field}>{field}</li>
            ))}
          </ul>
        </div>,
        { duration: 5000 }
      )
      return
    }

    // Handle document upload here - you'll need to implement the actual upload logic
    if (documents.length > 0) {
      console.log('Documents to upload:', documents)
      // TODO: Implement document upload to your backend
    }

    // Get current clients and update the specific client
    const currentClients = getInitialClients()
    const updatedClients = currentClients.map(c => 
      c.id === formData.id ? { ...formData, status: formData.status as Client['status'] } : c
    )
    
    // Update both localStorage and mockClients
    updateMockClients(updatedClients)
    
    console.log('Form submitted with data:', formData)
    onSave(formData)
    toast.success('Client information saved successfully')
    onClose()
  }

  const handleSaveForLater = () => {
    // Get current clients and update the specific client
    const currentClients = getInitialClients()
    const updatedClients = currentClients.map(c => 
      c.id === formData.id ? { ...formData, status: 'Draft' as const } : c
    )
    
    // Update both localStorage and mockClients
    updateMockClients(updatedClients)
    
    console.log('Saving incomplete form data:', formData)
    onSave({ ...formData, status: 'Draft' as const })
    toast.success('Client information saved as draft', {
      duration: 4000,
      position: 'top-right',
    })
    onClose()
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    console.log('Handling change:', name, value)
    const [parent, child] = name.split('.')

    if (child) {
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...(prev[parent as keyof Client] as any || {}),
          [child]: value,
        },
      }))
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }))
    }
  }

  const handleDelete = () => {
    if (formData.status === 'Draft' && onDelete) {
      onDelete(formData)
    }
  }

  const tabs = [
    { id: 'quick-view', label: 'Quick View' },
    { id: 'personal-info', label: 'Personal Info' },
    { id: 'address', label: 'Address' },
    { id: 'employment', label: 'Employment Info' },
    { id: 'identification', label: 'Identification' },
    { id: 'documents', label: 'Documents' },
  ]

  const renderTabContent = () => {
    switch (activeTab) {
      case 'quick-view':
        return <QuickView formData={formData as Client} />
      case 'personal-info':
        return <PersonalInfo formData={formData as Client} handleChange={handleChange} mode={mode} />
      case 'address':
        return <AddressInfo formData={formData as Client} handleChange={handleChange} mode={mode} />
      case 'employment':
        return <EmploymentInfo formData={formData as Client} handleChange={handleChange} mode={mode} />
      case 'identification':
        return <IdentificationInfo formData={formData as Client} handleChange={handleChange} mode={mode} />
      case 'documents':
        return <DocumentUpload mode={mode} documents={documents} onDocumentsChange={setDocuments} />
      default:
        return null
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      <div className="fixed inset-0 bg-black opacity-50" onClick={onClose}></div>
      <div className="relative bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-full overflow-y-auto">
        <div className="flex justify-between items-center px-6 py-4 border-b">
          <h2 className="text-xl font-semibold text-gray-800">
            {mode === 'view' ? 'Client Details' : 'Edit Client'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
          >
            <FaTimes size={20} />
          </button>
        </div>

        <div className="px-6 pt-4">
          <nav className="flex space-x-4 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-2 px-3 whitespace-nowrap border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } focus:outline-none`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        <form onSubmit={handleSubmit} className="px-6 py-4 space-y-6">
          {renderTabContent()}

          {mode === 'edit' && (
            <div className="flex justify-end space-x-3 pt-4 border-t">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Cancel
              </button>
              {formData.status === 'Draft' && onDelete && (
                <button
                  type="button"
                  onClick={handleDelete}
                  className="px-4 py-2 border border-red-300 text-red-600 rounded-md hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  Delete Draft
                </button>
              )}
              <button
                type="button"
                onClick={handleSaveForLater}
                className="px-4 py-2 border border-blue-300 text-blue-600 rounded-md hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Save for Later
              </button>
              {activeTab === 'identification' && (
                <button
                  type="button"
                  onClick={() => {
                    if (!isFormComplete) {
                      toast.error(
                        <div>
                          <p className="font-semibold mb-2">Missing Required Fields:</p>
                          <ul className="list-disc pl-4">
                            {missingFieldsList.map((field) => (
                              <li key={field}>{field}</li>
                            ))}
                          </ul>
                        </div>,
                        {
                          duration: 5000,
                          position: 'top-center',
                          style: {
                            maxWidth: '400px',
                            padding: '16px',
                          },
                        }
                      );
                      return;
                    }
                    handleSubmit(new Event('submit') as any);
                  }}
                  className={`px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    isFormComplete 
                      ? 'bg-blue-600 text-white hover:bg-blue-700' 
                      : 'bg-gray-300 text-gray-500'
                  }`}
                >
                  Submit
                </button>
              )}
            </div>
          )}
        </form>
      </div>
    </div>
  )
}
