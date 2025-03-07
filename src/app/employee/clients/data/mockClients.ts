import { Client } from '../components/types'

export const mockClients: Client[] = [
  {
    id: '1',
    firstName: 'John',
    middleName: '',
    lastName: 'Doe',
    email: 'john@example.com',
    phone: '(555) 123-4567',
    status: 'Active',
    loanStage: 'Application Review',
    gender: 'male',
    dateOfBirth: '1980-01-01',
    age: '43',
    primaryLanguage: 'english',
    maritalStatus: 'single',
    sourceOfWealth: 'employment',
    primaryCitizenship: 'canadian',
    address: {
      streetNumber: '123',
      streetName: 'Main St',
      unit: '',
      city: 'Toronto',
      province: 'ON',
      country: 'CA',
      postalCode: 'M5V 2T6'
    },
    employment: {
      occupancyType: 'own',
      monthlyHousingCost: '2000',
      housingCostCurrency: 'CAD',
      annualIncome: '85000',
      incomeCurrency: 'CAD',
      primaryIncomeSource: 'employment',
      employer: 'Tech Corp',
      employmentStatus: 'fullTime',
      employedSince: '2022-06-01',
      occupation: 'Software Developer',
      occupationDetails: 'Permanent full-time position with Tech Corp. Base salary of $85,000 with annual performance bonus of 10-15%. Completed 1-year probation period. No expected changes in employment status. Stable tech sector employment with growing company (500+ employees). All income verified through T4s and pay stubs.',
      previousEmployer: 'Startup Inc',
      previousEmploymentStatus: 'Full-time',
      previousEmployedFrom: '2019-03-01',
      previousEmployedTo: '2022-05-30',
      previousOccupation: 'Junior Software Developer',
      previousOccupationDetails: 'Permanent full-time position. Base salary was $65,000 at time of departure. Left voluntarily for career advancement. Can provide T4s and ROE for verification. Same industry as current role.'
    },
    identification: {
      ssn: '123-45-6789',
      driverLicense: 'D1234-56789-00',
      expirationDate: '2025-01-01'
    }
  },
  {
    id: '2',
    firstName: 'Jane',
    middleName: '',
    lastName: 'Smith',
    email: 'jane@example.com',
    phone: '(555) 987-6543',
    status: 'Pending',
    loanStage: 'Document Collection',
    gender: 'female',
    dateOfBirth: '1985-05-15',
    age: '38',
    primaryLanguage: 'french',
    maritalStatus: 'married',
    sourceOfWealth: 'investment',
    primaryCitizenship: 'permanent',
    address: {
      streetNumber: '456',
      streetName: 'Elm St',
      unit: '',
      city: 'New York',
      province: 'NY',
      country: 'US',
      postalCode: '10001'
    },
    employment: {
      occupancyType: 'own',
      monthlyHousingCost: '3000',
      housingCostCurrency: 'USD',
      annualIncome: '120000',
      incomeCurrency: 'USD',
      primaryIncomeSource: 'investment',
      employer: 'Finance Corp',
      employmentStatus: 'fullTime',
      employedSince: '2018-06-01',
      occupation: 'Senior Financial Analyst',
      occupationDetails: 'Permanent position with major financial institution. Base salary $120,000 with consistent annual bonus history (25-30% of base). 5+ years in current role. Additional deferred compensation vesting annually. Income verified through T4s and employer letter. Strong employment stability in financial sector.',
      previousEmployer: '',
      previousEmploymentStatus: '',
      previousEmployedFrom: '',
      previousEmployedTo: '',
      previousOccupation: '',
      previousOccupationDetails: ''
    },
    identification: {
      ssn: '987-65-4321',
      driverLicense: 'D9876-54321-00',
      expirationDate: '2024-05-15'
    }
  },
  {
    id: '3',
    firstName: 'Miguel',
    middleName: 'Antonio',
    lastName: 'Rodriguez',
    email: 'miguel.rodriguez@example.com',
    phone: '(555) 234-5678',
    status: 'Active',
    loanStage: 'Underwriting',
    gender: 'male',
    dateOfBirth: '1990-03-20',
    age: '33',
    primaryLanguage: 'spanish',
    maritalStatus: 'married',
    sourceOfWealth: 'selfEmployed',
    primaryCitizenship: 'permanent',
    address: {
      streetNumber: '789',
      streetName: 'Oak Avenue',
      unit: '12B',
      city: 'Vancouver',
      province: 'BC',
      country: 'CA',
      postalCode: 'V6B 2W9'
    },
    employment: {
      occupancyType: 'rent',
      monthlyHousingCost: '2500',
      housingCostCurrency: 'CAD',
      annualIncome: '150000',
      incomeCurrency: 'CAD',
      primaryIncomeSource: 'selfEmployed',
      employer: 'Rodriguez Consulting Ltd',
      employmentStatus: 'selfEmployed',
      employedSince: '2015-01-15',
      occupation: 'Business Owner',
      occupationDetails: 'Owner of successful IT consulting firm. Business shows steady growth over 8 years. Average annual revenue $500K with 30% profit margin. Personal income drawn as salary and dividends. All business and personal tax returns available for verification.',
      previousEmployer: 'Tech Solutions Inc',
      previousEmploymentStatus: 'fullTime',
      previousEmployedFrom: '2012-06-01',
      previousEmployedTo: '2014-12-31',
      previousOccupation: 'IT Consultant',
      previousOccupationDetails: 'Senior consultant position with established tech firm. Left to start own business.'
    },
    identification: {
      ssn: '345-67-8901',
      driverLicense: 'BC1234567',
      expirationDate: '2026-03-20'
    }
  },
  {
    id: '4',
    firstName: 'Sarah',
    middleName: 'Elizabeth',
    lastName: 'Chen',
    email: 'sarah.chen@example.com',
    phone: '(555) 345-6789',
    status: 'Active',
    loanStage: 'Approved',
    gender: 'female',
    dateOfBirth: '1988-11-12',
    age: '35',
    primaryLanguage: 'mandarin',
    maritalStatus: 'married',
    sourceOfWealth: 'employment',
    primaryCitizenship: 'canadian',
    address: {
      streetNumber: '567',
      streetName: 'Queen Street West',
      unit: '1505',
      city: 'Toronto',
      province: 'ON',
      country: 'CA',
      postalCode: 'M5V 2B7'
    },
    employment: {
      occupancyType: 'own',
      monthlyHousingCost: '4000',
      housingCostCurrency: 'CAD',
      annualIncome: '200000',
      incomeCurrency: 'CAD',
      primaryIncomeSource: 'employment',
      employer: 'Global Bank Corp',
      employmentStatus: 'fullTime',
      employedSince: '2016-08-01',
      occupation: 'Investment Banking Director',
      occupationDetails: 'Senior position in investment banking division. Base salary $200K plus significant performance bonuses (100-150% of base). Consistent promotion history. Secure position with major financial institution.',
      previousEmployer: 'Investment Partners LLC',
      previousEmploymentStatus: 'fullTime',
      previousEmployedFrom: '2013-05-01',
      previousEmployedTo: '2016-07-31',
      previousOccupation: 'Investment Banking Associate',
      previousOccupationDetails: 'Worked in M&A division. Left for promotion opportunity.'
    },
    identification: {
      ssn: '456-78-9012',
      driverLicense: 'O7654321',
      expirationDate: '2025-11-12'
    }
  },
  {
    id: '5',
    firstName: 'Ahmed',
    middleName: '',
    lastName: 'Hassan',
    email: 'ahmed.hassan@example.com',
    phone: '(555) 456-7890',
    status: 'Pending',
    loanStage: 'Pre-Approval',
    gender: 'male',
    dateOfBirth: '1995-07-08',
    age: '28',
    primaryLanguage: 'arabic',
    maritalStatus: 'single',
    sourceOfWealth: 'employment',
    primaryCitizenship: 'permanent',
    address: {
      streetNumber: '123',
      streetName: 'Wellington Street',
      unit: '303',
      city: 'Ottawa',
      province: 'ON',
      country: 'CA',
      postalCode: 'K1P 5G3'
    },
    employment: {
      occupancyType: 'rent',
      monthlyHousingCost: '1800',
      housingCostCurrency: 'CAD',
      annualIncome: '95000',
      incomeCurrency: 'CAD',
      primaryIncomeSource: 'employment',
      employer: 'Government of Canada',
      employmentStatus: 'fullTime',
      employedSince: '2020-09-01',
      occupation: 'Policy Analyst',
      occupationDetails: 'Permanent position with federal government. Annual salary $95K with defined benefit pension plan. Regular salary increases based on collective agreement. Stable public sector employment.',
      previousEmployer: 'Provincial Ministry',
      previousEmploymentStatus: 'contract',
      previousEmployedFrom: '2019-01-15',
      previousEmployedTo: '2020-08-31',
      previousOccupation: 'Junior Policy Analyst',
      previousOccupationDetails: 'Contract position that led to current permanent role.'
    },
    identification: {
      ssn: '567-89-0123',
      driverLicense: 'ON543210',
      expirationDate: '2027-07-08'
    }
  },
  {
    id: '6',
    firstName: 'Robert',
    middleName: 'James',
    lastName: 'Wilson',
    email: 'rob.wilson@example.com',
    phone: '(555) 567-8901',
    status: 'Inactive',
    loanStage: 'Credit Check',
    gender: 'male',
    dateOfBirth: '1992-04-15',
    age: '31',
    primaryLanguage: 'english',
    maritalStatus: 'divorced',
    sourceOfWealth: 'employment',
    primaryCitizenship: 'canadian',
    address: {
      streetNumber: '789',
      streetName: 'Yonge Street',
      unit: '405',
      city: 'Toronto',
      province: 'ON',
      country: 'CA',
      postalCode: 'M4W 2G8'
    },
    employment: {
      occupancyType: 'rent',
      monthlyHousingCost: '2200',
      housingCostCurrency: 'CAD',
      annualIncome: '72000',
      incomeCurrency: 'CAD',
      primaryIncomeSource: 'employment',
      employer: 'Retail Corp',
      employmentStatus: 'probation',
      employedSince: '2023-11-01',
      occupation: 'Store Manager',
      occupationDetails: 'Recently started new position, still in 6-month probation period. Previous retail management experience but gap in employment history. Credit score below threshold due to past credit card defaults.',
      previousEmployer: 'Fashion Outlet',
      previousEmploymentStatus: 'fullTime',
      previousEmployedFrom: '2020-03-01',
      previousEmployedTo: '2023-06-30',
      previousOccupation: 'Assistant Manager',
      previousOccupationDetails: '3-month employment gap between positions. Left previous role due to store closure.'
    },
    identification: {
      ssn: '678-90-1234',
      driverLicense: 'O8901234',
      expirationDate: '2026-04-15'
    }
  },
  {
    id: '7',
    firstName: 'Maria',
    middleName: 'Carmen',
    lastName: 'Garcia',
    email: 'maria.garcia@example.com',
    phone: '(555) 678-9012',
    status: 'Pending',
    loanStage: 'Income Verification',
    gender: 'female',
    dateOfBirth: '1987-09-23',
    age: '36',
    primaryLanguage: 'spanish',
    maritalStatus: 'married',
    sourceOfWealth: 'selfEmployed',
    primaryCitizenship: 'permanent',
    address: {
      streetNumber: '456',
      streetName: 'King Street West',
      unit: '202',
      city: 'Toronto',
      province: 'ON',
      country: 'CA',
      postalCode: 'M5V 1K4'
    },
    employment: {
      occupancyType: 'rent',
      monthlyHousingCost: '2500',
      housingCostCurrency: 'CAD',
      annualIncome: '65000',
      incomeCurrency: 'CAD',
      primaryIncomeSource: 'selfEmployed',
      employer: 'Garcia Cleaning Services',
      employmentStatus: 'selfEmployed',
      employedSince: '2022-01-01',
      occupation: 'Business Owner',
      occupationDetails: 'Small business owner with variable income. Business less than 2 years old. Previous year tax returns show lower income than current projections. Requiring additional documentation to verify income stability.',
      previousEmployer: 'Cleaning Masters Inc',
      previousEmploymentStatus: 'partTime',
      previousEmployedFrom: '2019-05-01',
      previousEmployedTo: '2021-12-31',
      previousOccupation: 'Cleaning Supervisor',
      previousOccupationDetails: 'Part-time position while building client base for own business.'
    },
    identification: {
      ssn: '789-01-2345',
      driverLicense: 'O9012345',
      expirationDate: '2025-09-23'
    }
  },
  {
    id: '8',
    firstName: 'David',
    middleName: '',
    lastName: 'Thompson',
    email: 'david.thompson@example.com',
    phone: '(555) 789-0123',
    status: 'Inactive',
    loanStage: 'Application Review',
    gender: 'male',
    dateOfBirth: '1983-12-05',
    age: '40',
    primaryLanguage: 'english',
    maritalStatus: 'separated',
    sourceOfWealth: 'employment',
    primaryCitizenship: 'canadian',
    address: {
      streetNumber: '234',
      streetName: 'Bay Street',
      unit: '1702',
      city: 'Toronto',
      province: 'ON',
      country: 'CA',
      postalCode: 'M5J 2R8'
    },
    employment: {
      occupancyType: 'own',
      monthlyHousingCost: '3500',
      housingCostCurrency: 'CAD',
      annualIncome: '135000',
      incomeCurrency: 'CAD',
      primaryIncomeSource: 'employment',
      employer: 'Marketing Solutions Inc',
      employmentStatus: 'contract',
      employedSince: '2023-01-15',
      occupation: 'Marketing Director',
      occupationDetails: 'One-year contract position with possibility of renewal. High income but recent separation affecting debt service ratio. Withdrew application due to ongoing divorce proceedings and property settlement negotiations.',
      previousEmployer: 'Digital Agency Co',
      previousEmploymentStatus: 'fullTime',
      previousEmployedFrom: '2018-03-01',
      previousEmployedTo: '2022-12-31',
      previousOccupation: 'Senior Marketing Manager',
      previousOccupationDetails: 'Left previous permanent position for higher-paying contract role.'
    },
    identification: {
      ssn: '890-12-3456',
      driverLicense: 'O0123456',
      expirationDate: '2026-12-05'
    }
  }
] 