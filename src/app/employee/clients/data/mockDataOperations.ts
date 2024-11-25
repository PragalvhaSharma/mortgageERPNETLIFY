import { Client } from '../components/types'
import { mockClients } from './mockClients'
import { toast } from 'react-hot-toast'

const STORAGE_KEY = 'mortgage-erp-clients'

export const getInitialClients = (): Client[] => {
  if (typeof window === 'undefined') return mockClients
  
  const storedClients = localStorage.getItem(STORAGE_KEY)
  if (!storedClients) {
    // First time loading - store mock data
    localStorage.setItem(STORAGE_KEY, JSON.stringify(mockClients))
    return mockClients
  }
  
  try {
    const parsedClients = JSON.parse(storedClients)
    // Update mockClients array to stay in sync
    mockClients.length = 0
    mockClients.push(...parsedClients)
    return parsedClients
  } catch (error) {
    console.error('Error parsing stored clients:', error)
    return mockClients
  }
}

export const updateMockClients = (clients: Client[]) => {
  if (typeof window === 'undefined') return
  
  try {
    // Update localStorage
    localStorage.setItem(STORAGE_KEY, JSON.stringify(clients))
    
    // Update mockClients array
    mockClients.length = 0
    mockClients.push(...clients)
  } catch (error) {
    console.error('Error updating clients:', error)
    toast.error('Failed to save client data')
  }
} 