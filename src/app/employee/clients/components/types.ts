export interface Address {
  streetNumber: string
  streetName: string
  unit: string
  city: string
  province: string
  country: string
  postalCode: string
}

export interface Employment {
  // Housing Details
  occupancyType: 'rent' | 'own' | 'rentfree' | 'rentdown' | ''
  monthlyHousingCost: string
  housingCostCurrency: string

  // Income Details
  annualIncome: string
  incomeCurrency: string
  primaryIncomeSource: 'employment' | 'selfEmployed' | 'pension' | 'investment' | 'ccb' | 'rental' | ''

  // Current Employment Details
  employer: string
  employmentStatus: string
  employedSince: string
  occupation: string
  occupationDetails: string

  // Previous Employment Details
  previousEmployer: string
  previousEmploymentStatus: string
  previousEmployedFrom: string
  previousEmployedTo: string
  previousOccupation: string
  previousOccupationDetails: string
}

export interface Identification {
  ssn: string
  driverLicense: string
  expirationDate: string
}

export interface Client {
  id: string
  firstName: string
  middleName: string
  lastName: string
  gender: string
  dateOfBirth: string
  age: string
  primaryLanguage: string
  maritalStatus: string
  sourceOfWealth: string
  primaryCitizenship: string
  email: string
  phone: string
  status: 'Pending' | 'Active' | 'Inactive' | 'Draft'
  loanStage: string
  address: Address
  employment: Employment
  identification: Identification
}

export interface ClientModalProps {
  client?: Client
  isOpen: boolean
  onClose: () => void
  mode: 'view' | 'edit'
} 