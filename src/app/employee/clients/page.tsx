'use client'

import { useState } from 'react'
import EmployeeDrawer from '../components/EmployeeDrawer'
import { FaSearch, FaPlus, FaEye, FaEdit, FaTrash } from 'react-icons/fa'
import ClientModal from './components/ClientModal'
import { Toaster, toast } from 'react-hot-toast'
import { Client } from '@/types/client'
import { getInitialClients, updateMockClients } from './data/mockDataOperations'
import { v4 as uuidv4 } from 'uuid'

interface EditRequestModalProps {
  isOpen: boolean
  onClose: () => void
  client: Client | undefined
}

function EditRequestModal({ isOpen, onClose, client }: EditRequestModalProps) {
  const [reason, setReason] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      // TODO: Replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      toast.success('Edit request submitted successfully!', {
        duration: 4000,
        position: 'top-right',
      })
      setReason('') // Reset form
      onClose()
    } catch (error) {
      toast.error('Failed to submit edit request. Please try again.', {
        duration: 4000,
        position: 'top-right',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <h2 className="text-xl font-semibold mb-4">Request Client Edit Permission</h2>
        <p className="text-gray-600 mb-4">
          Submit a request to edit information for client: {client ? `${client.firstName} ${client.lastName}` : ''}
        </p>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Reason for Edit
            </label>
            <textarea
              className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              rows={4}
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              required
              placeholder="Please explain why you need to edit this client's information..."
            />
          </div>
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Request'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default function ClientsPage() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedClient, setSelectedClient] = useState<Client | undefined>(undefined)
  const [modalMode, setModalMode] = useState<'view' | 'edit'>('view')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isEditRequestModalOpen, setIsEditRequestModalOpen] = useState(false)
  const [clients, setClients] = useState<Client[]>(() => getInitialClients())

  const handleAddClient = () => {
    setSelectedClient(undefined)
    setModalMode('edit')
    setIsModalOpen(true)
  }

  const filteredClients = clients.filter(client => {
    const searchTerm = searchQuery.toLowerCase()
    return (
      client.firstName.toLowerCase().includes(searchTerm) ||
      client.lastName.toLowerCase().includes(searchTerm) ||
      client.email.toLowerCase().includes(searchTerm) ||
      client.phone.toLowerCase().includes(searchTerm)
    )
  })

  const handleClientUpdate = (updatedClient: Client) => {
    console.log('Handling client update:', updatedClient)
    
    // Set default status based on completeness
    const missingRequiredFields = validateClientCompleteness(updatedClient)
    let status: Client['status'] = missingRequiredFields ? 'Draft' : 'Pending'
    
    // Keep existing status if it's Active
    if (updatedClient.status === 'Active') {
      status = 'Active'
    }
    
    const clientWithStatus = {
      ...updatedClient,
      id: updatedClient.id || uuidv4(),
      status
    } as Client

    setClients(prevClients => {
      const clientIndex = prevClients.findIndex(c => c.id === clientWithStatus.id)
      const newClients = [...prevClients]
      
      if (clientIndex === -1) {
        // This is a new client
        console.log('Adding new client')
        newClients.push(clientWithStatus)
      } else {
        // This is an existing client update
        console.log('Updating existing client')
        newClients[clientIndex] = clientWithStatus
      }
      
      // Update the mock data
      updateMockClients(newClients)
      return newClients
    })
    
    setIsModalOpen(false)
    toast.success(
      status === 'Draft' 
        ? 'Client saved as draft' 
        : 'Client information saved successfully!',
      {
        duration: 4000,
        position: 'top-right',
      }
    )
  }

  const validateClientCompleteness = (client: Client): boolean => {
    const requiredFields = [
      client.firstName,
      client.lastName,
      client.email,
      client.phone,
      client.address?.streetNumber,
      client.address?.streetName,
      client.address?.city,
      client.address?.province,
      client.address?.country,
      client.address?.postalCode,
      client.identification?.ssn,
    ]

    return requiredFields.some(field => !field)
  }

  const handleViewClient = (client: Client) => {
    setSelectedClient(client)
    setModalMode('view')
    setIsModalOpen(true)
  }

  const handleEditClient = (client: Client) => {
    if (client.status === 'Draft') {
      setSelectedClient(client)
      setModalMode('edit')
      setIsModalOpen(true)
    } else {
      setSelectedClient(client)
      setIsEditRequestModalOpen(true)
    }
  }

  const handleDeleteDraft = (client: Client) => {
    if (client.status !== 'Draft') return

    setClients(prevClients => {
      const newClients = prevClients.filter(c => c.id !== client.id)
      // Update the mock data
      updateMockClients(newClients)
      return newClients
    })
    
    setIsModalOpen(false) // Close the modal if it's open
    toast.success('Draft client deleted successfully', {
      duration: 4000,
      position: 'top-right',
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-800 border-green-200'
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'Draft':
        return 'bg-gray-100 text-gray-800 border-gray-200'
      default:
        return 'bg-red-100 text-red-800 border-red-200'
    }
  }

  return (
    <EmployeeDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)}>
      <Toaster />
      <div className="p-8 max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Clients</h1>
            <p className="text-gray-500 mt-1">Manage and view client information</p>
          </div>
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg flex items-center gap-2 transition duration-200 shadow-sm"
            onClick={handleAddClient}
          >
            <FaPlus className="text-sm" /> Add Client
          </button>
        </div>

        <div className="relative mb-8">
          <div className="max-w-xl">
            <input
              type="text"
              placeholder="Search clients by name, email, or phone..."
              className="w-full px-4 py-3 pl-12 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <FaSearch className="absolute left-4 top-3.5 text-gray-400" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Contact</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Loan Stage</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {filteredClients.map((client) => (
                  <tr key={client.id} className="hover:bg-gray-50 transition duration-150">
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">
                        {`${client.firstName} ${client.lastName}`}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">{client.email}</div>
                      <div className="text-sm text-gray-500">{client.phone}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 text-sm font-medium rounded-full border ${getStatusColor(client.status)}`}>
                        {client.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">{client.loanStage}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex space-x-3">
                        <button 
                          className="text-gray-600 hover:text-blue-600 transition duration-150 flex items-center gap-1"
                          onClick={() => handleViewClient(client)}
                        >
                          <FaEye className="text-sm" />
                          <span>View</span>
                        </button>
                        <button 
                          className="text-gray-600 hover:text-blue-600 transition duration-150 flex items-center gap-1"
                          onClick={() => handleEditClient(client)}
                        >
                          <FaEdit className="text-sm" />
                          <span>Edit</span>
                        </button>
                        {client.status === 'Draft' && (
                          <button 
                            className="text-gray-600 hover:text-red-600 transition duration-150 flex items-center gap-1"
                            onClick={() => handleDeleteDraft(client)}
                          >
                            <FaTrash className="text-sm" />
                            <span>Delete</span>
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <ClientModal
        clientId={selectedClient?.id}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        mode={modalMode}
        onSave={handleClientUpdate}
        onDelete={handleDeleteDraft}
      />
      <EditRequestModal
        isOpen={isEditRequestModalOpen}
        onClose={() => setIsEditRequestModalOpen(false)}
        client={selectedClient}
      />
    </EmployeeDrawer>
  )
}
