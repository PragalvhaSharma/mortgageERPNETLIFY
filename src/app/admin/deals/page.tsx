"use client";

import { useState, useMemo, useRef, useCallback } from "react";
import { Search, Filter, Plus, X, ChevronDown, FileText, Home, MoreVertical, MoreHorizontal, Clock, AlertCircle } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import SignatureCanvas from 'react-signature-canvas';
import { Toast } from "@/components/ui/toast";

interface Document {
  id: string;
  name: string;
  type: 'Income Verification' | 'Property Appraisal' | 'Credit Report' | 'Bank Statements' | 'Tax Returns' | 'Purchase Agreement' | 'Insurance' | 'Title Report';
  status: 'pending' | 'approved' | 'rejected';
  uploadedBy: string;
  uploadedAt: string;
  notes?: string;
}

interface AdminSignature {
  signatureData: string;
  signedBy: string;
  signedAt: string;
}

interface BankRepresentative {
  id: string;
  name: string;
  bank: string;
  email: string;
  phone: string;
}

interface Deal {
  id: string;
  clientName: string;
  propertyAddress: string;
  dealType: 'Purchase' | 'Refinance' | 'Home Equity' | 'Construction';
  loanAmount: number;
  status: 'pending' | 'approved' | 'closed' | 'rejected';
  lastUpdated: string;
  clientDetails: {
    email: string;
    phone: string;
    creditScore: number;
    annualIncome: number;
    occupation: string;
  };
  propertyDetails: {
    type: string;
    squareFeet: number;
    yearBuilt: number;
    appraisalValue: number;
    numberOfBedrooms: number;
    numberOfBathrooms: number;
  };
  loanDetails: {
    interestRate: number;
    term: number;
    monthlyPayment: number;
    downPayment: number;
    loanType: string;
    loanOfficer: string;
  };
  timeline: {
    applicationDate: string;
    approvalDate?: string;
    closingDate?: string;
    nextSteps?: string[];
  };
  documents: Document[];
  adminNotes?: string;
  assignedTo: string;
  reviewStatus: 'pending_review' | 'in_review' | 'approved' | 'on_hold' | 'rejected';
  reviewedBy?: string;
  reviewedAt?: string;
  submittedBy: string;
  submittedAt: string;
  priority: 'high' | 'medium' | 'low';
  adminReview: {
    status: 'pending_review' | 'in_review' | 'approved' | 'on_hold' | 'rejected';
    reviewedBy?: string;
    reviewedAt?: string;
    notes?: string;
    conditions?: string[];
  };
  adminSignature?: AdminSignature;
  bankRepresentative?: BankRepresentative;
}

const sampleDeals: Deal[] = [
  {
    id: "1",
    clientName: "John Doe",
    propertyAddress: "123 Main St, Boston, MA",
    dealType: "Purchase",
    loanAmount: 450000,
    status: "approved",
    lastUpdated: "2024-03-15",
    clientDetails: {
      email: "john.doe@email.com",
      phone: "(555) 123-4567",
      creditScore: 785,
      annualIncome: 120000,
      occupation: "Software Engineer"
    },
    propertyDetails: {
      type: "Single Family Home",
      squareFeet: 2400,
      yearBuilt: 2015,
      appraisalValue: 500000,
      numberOfBedrooms: 4,
      numberOfBathrooms: 2.5
    },
    loanDetails: {
      interestRate: 4.5,
      term: 30,
      monthlyPayment: 2280.27,
      downPayment: 90000,
      loanType: "Conventional",
      loanOfficer: "Sarah Johnson"
    },
    timeline: {
      applicationDate: "2024-02-15",
      approvalDate: "2024-03-10",
      nextSteps: ["Schedule closing", "Final walkthrough", "Wire transfer setup"]
    },
    documents: [
      {
        id: "doc1",
        name: "2023_W2.pdf",
        type: "Income Verification",
        status: "pending",
        uploadedBy: "John Smith",
        uploadedAt: "2024-03-14",
        notes: "Latest W2 from current employer"
      },
      {
        id: "doc2",
        name: "Property_Appraisal_123Main.pdf",
        type: "Property Appraisal",
        status: "approved",
        uploadedBy: "Sarah Johnson",
        uploadedAt: "2024-03-13"
      },
      // ... more documents
    ],
    adminNotes: "Waiting for updated bank statements",
    assignedTo: "Sarah Johnson",
    reviewStatus: "in_review",
    reviewedBy: "Admin User",
    reviewedAt: "2024-03-15",
    submittedBy: "Sarah Johnson",
    submittedAt: "2024-03-14",
    priority: "medium",
    adminReview: {
      status: "pending_review",
      reviewedBy: "Admin User",
      reviewedAt: "2024-03-15",
      notes: "Initial review",
      conditions: ["Verify income", "Check credit score"]
    }
  },
  {
    id: "2",
    clientName: "Jane Smith",
    propertyAddress: "456 Oak Ave, Chicago, IL",
    dealType: "Refinance",
    loanAmount: 325000,
    status: "pending",
    lastUpdated: "2024-03-14",
    clientDetails: {
      email: "jane.smith@email.com",
      phone: "(555) 987-6543",
      creditScore: 650,
      annualIncome: 90000,
      occupation: "Accountant"
    },
    propertyDetails: {
      type: "Condo",
      squareFeet: 1200,
      yearBuilt: 2010,
      appraisalValue: 350000,
      numberOfBedrooms: 2,
      numberOfBathrooms: 1.5
    },
    loanDetails: {
      interestRate: 5.0,
      term: 25,
      monthlyPayment: 1750.50,
      downPayment: 75000,
      loanType: "FHA",
      loanOfficer: "Michael Brown"
    },
    timeline: {
      applicationDate: "2024-02-20",
      approvalDate: "2024-03-13",
      nextSteps: ["Schedule closing", "Final walkthrough", "Wire transfer setup"]
    },
    documents: [
      {
        id: "doc3",
        name: "2023_Tax_Return.pdf",
        type: "Tax Returns",
        status: "pending",
        uploadedBy: "Jane Smith",
        uploadedAt: "2024-03-12",
        notes: "Latest tax return for 2023"
      },
      {
        id: "doc4",
        name: "Property_Appraisal_456Oak.pdf",
        type: "Property Appraisal",
        status: "approved",
        uploadedBy: "Sarah Johnson",
        uploadedAt: "2024-03-11"
      },
      // ... more documents
    ],
    adminNotes: "Waiting for updated bank statements",
    assignedTo: "Sarah Johnson",
    reviewStatus: "in_review",
    reviewedBy: "Admin User",
    reviewedAt: "2024-03-15",
    submittedBy: "Sarah Johnson",
    submittedAt: "2024-03-14",
    priority: "low",
    adminReview: {
      status: "pending_review",
      reviewedBy: "Admin User",
      reviewedAt: "2024-03-15",
      notes: "Initial review",
      conditions: ["Verify income", "Check credit score"]
    }
  },
  {
    id: "3",
    clientName: "Bob Johnson",
    propertyAddress: "789 Pine Rd, Miami, FL",
    dealType: "Home Equity",
    loanAmount: 550000,
    status: "closed",
    lastUpdated: "2024-03-13",
    clientDetails: {
      email: "bob.johnson@email.com",
      phone: "(555) 555-1234",
      creditScore: 720,
      annualIncome: 150000,
      occupation: "Real Estate Agent"
    },
    propertyDetails: {
      type: "Single Family Home",
      squareFeet: 3000,
      yearBuilt: 2018,
      appraisalValue: 600000,
      numberOfBedrooms: 5,
      numberOfBathrooms: 3
    },
    loanDetails: {
      interestRate: 4.2,
      term: 30,
      monthlyPayment: 2800.75,
      downPayment: 110000,
      loanType: "Conventional",
      loanOfficer: "Emily Davis"
    },
    timeline: {
      applicationDate: "2024-02-25",
      approvalDate: "2024-03-12",
      nextSteps: ["Schedule closing", "Final walkthrough", "Wire transfer setup"]
    },
    documents: [
      {
        id: "doc5",
        name: "2023_Bank_Statements.pdf",
        type: "Bank Statements",
        status: "pending",
        uploadedBy: "Bob Johnson",
        uploadedAt: "2024-03-10",
        notes: "Latest bank statements for 2023"
      },
      {
        id: "doc6",
        name: "Property_Appraisal_789Pine.pdf",
        type: "Property Appraisal",
        status: "approved",
        uploadedBy: "Sarah Johnson",
        uploadedAt: "2024-03-09"
      },
      // ... more documents
    ],
    adminNotes: "Waiting for updated bank statements",
    assignedTo: "Sarah Johnson",
    reviewStatus: "in_review",
    reviewedBy: "Admin User",
    reviewedAt: "2024-03-15",
    submittedBy: "Sarah Johnson",
    submittedAt: "2024-03-14",
    priority: "high",
    adminReview: {
      status: "pending_review",
      reviewedBy: "Admin User",
      reviewedAt: "2024-03-15",
      notes: "Initial review",
      conditions: ["Verify income", "Check credit score"]
    }
  },
  {
    id: "4",
    clientName: "Sarah Williams",
    propertyAddress: "321 Elm St, Seattle, WA",
    dealType: "Construction",
    loanAmount: 275000,
    status: "rejected",
    lastUpdated: "2024-03-12",
    clientDetails: {
      email: "sarah.williams@email.com",
      phone: "(555) 867-5309",
      creditScore: 580,
      annualIncome: 80000,
      occupation: "Marketing Manager"
    },
    propertyDetails: {
      type: "Condo",
      squareFeet: 1500,
      yearBuilt: 2012,
      appraisalValue: 300000,
      numberOfBedrooms: 3,
      numberOfBathrooms: 2
    },
    loanDetails: {
      interestRate: 5.5,
      term: 25,
      monthlyPayment: 1500.25,
      downPayment: 65000,
      loanType: "FHA",
      loanOfficer: "David Lee"
    },
    timeline: {
      applicationDate: "2024-02-18",
      approvalDate: "2024-03-11",
      nextSteps: ["Schedule closing", "Final walkthrough", "Wire transfer setup"]
    },
    documents: [
      {
        id: "doc7",
        name: "2023_Purchase_Agreement.pdf",
        type: "Purchase Agreement",
        status: "pending",
        uploadedBy: "Sarah Williams",
        uploadedAt: "2024-03-10",
        notes: "Latest purchase agreement for the property"
      },
      {
        id: "doc8",
        name: "Property_Appraisal_321Elm.pdf",
        type: "Property Appraisal",
        status: "approved",
        uploadedBy: "Sarah Johnson",
        uploadedAt: "2024-03-09"
      },
      // ... more documents
    ],
    adminNotes: "Waiting for updated bank statements",
    assignedTo: "Sarah Johnson",
    reviewStatus: "in_review",
    reviewedBy: "Admin User",
    reviewedAt: "2024-03-15",
    submittedBy: "Sarah Johnson",
    submittedAt: "2024-03-14",
    priority: "medium",
    adminReview: {
      status: "pending_review",
      reviewedBy: "Admin User",
      reviewedAt: "2024-03-15",
      notes: "Initial review",
      conditions: ["Verify income", "Check credit score"]
    }
  }
];

const sampleBankRepresentatives: BankRepresentative[] = [
  {
    id: "1",
    name: "Michael Thompson",
    bank: "RBC Royal Bank",
    email: "m.thompson@rbc.com",
    phone: "(416) 555-1234"
  },
  {
    id: "2",
    name: "Sarah Williams",
    bank: "TD Canada Trust",
    email: "s.williams@td.com",
    phone: "(647) 555-2345"
  },
  {
    id: "3",
    name: "David Chen",
    bank: "BMO Bank of Montreal",
    email: "d.chen@bmo.com",
    phone: "(905) 555-3456"
  },
  {
    id: "4",
    name: "Jennifer Lee",
    bank: "CIBC",
    email: "j.lee@cibc.com",
    phone: "(437) 555-4567"
  },
  {
    id: "5",
    name: "Robert Wilson",
    bank: "Scotiabank",
    email: "r.wilson@scotiabank.com",
    phone: "(289) 555-5678"
  },
  {
    id: "6",
    name: "Emily Tremblay",
    bank: "National Bank",
    email: "e.tremblay@nbc.ca",
    phone: "(514) 555-6789"
  },
  {
    id: "7",
    name: "James Murphy",
    bank: "HSBC Canada",
    email: "j.murphy@hsbc.ca",
    phone: "(604) 555-7890"
  }
];

const CANADIAN_BANKS = [
  "RBC Royal Bank",
  "TD Canada Trust",
  "BMO Bank of Montreal",
  "CIBC",
  "Scotiabank",
  "National Bank",
  "HSBC Canada",
  "Desjardins",
  "Laurentian Bank",
  "ATB Financial",
  "Other"
] as const;

interface Filters {
  status: Deal['status'] | 'all';
  dealType: Deal['dealType'] | 'all';
  minAmount: number | '';
  maxAmount: number | '';
  priority: Deal['priority'] | 'all';
  reviewStatus: Deal['adminReview']['status'] | 'all';
}

const separateDeals = (deals: Deal[]) => {
  return {
    pendingDeals: deals.filter(deal => 
      ['pending_review', 'in_review', 'on_hold'].includes(deal.adminReview.status)
    ),
    pastDeals: deals.filter(deal => 
      ['approved', 'rejected'].includes(deal.adminReview.status)
    )
  };
};

const getStatusColor = (status: Deal['adminReview']['status']) => {
  switch (status) {
    case 'approved':
      return 'bg-green-50 border-green-200 text-green-700';
    case 'rejected':
      return 'bg-red-50 border-red-200 text-red-700';
    case 'on_hold':
      return 'bg-yellow-50 border-yellow-200 text-yellow-700';
    default:
      return 'bg-gray-50 border-gray-200 text-gray-700';
  }
};

export default function DealsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDeal, setSelectedDeal] = useState<Deal | null>(null);
  const [isNewDealModalOpen, setIsNewDealModalOpen] = useState(false);
  const [filters, setFilters] = useState<Filters>({
    status: 'all',
    dealType: 'all',
    minAmount: '',
    maxAmount: '',
    priority: 'all',
    reviewStatus: 'all'
  });
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [showSignatureModal, setShowSignatureModal] = useState(false);
  const [dealToApprove, setDealToApprove] = useState<Deal | null>(null);
  const signatureRef = useRef<InstanceType<typeof SignatureCanvas> | null>(null);
  const [deals, setDeals] = useState<Deal[]>(sampleDeals);
  const [rejectReason, setRejectReason] = useState("");
  const [showReasonModal, setShowReasonModal] = useState(false);
  const [pendingAction, setPendingAction] = useState<{
    dealId: string;
    action: 'reject' | 'hold';
  } | null>(null);
  const [showBankRepModal, setShowBankRepModal] = useState(false);
  const [selectedBankRep, setSelectedBankRep] = useState<BankRepresentative | null>(null);
  const [newBankRep, setNewBankRep] = useState<Partial<BankRepresentative>>({});
  const [isAddingNewRep, setIsAddingNewRep] = useState(false);
  const [bankRepresentatives, setBankRepresentatives] = useState<BankRepresentative[]>(sampleBankRepresentatives);
  const [bankRepSearch, setBankRepSearch] = useState("");
  const [selectedBank, setSelectedBank] = useState<string>("all");
  const [tempSignature, setTempSignature] = useState<AdminSignature | null>(null);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleViewDeal = (deal: Deal) => {
    setSelectedDeal(deal);
  };

  const handleCloseModal = () => {
    setSelectedDeal(null);
    setIsNewDealModalOpen(false);
  };

  const handleNewDeal = () => {
    setIsNewDealModalOpen(true);
  };

  const getStatusStyle = (status: Deal['status']) => {
    const styles = {
      pending: "bg-yellow-100 text-yellow-800",
      approved: "bg-green-100 text-green-800",
      closed: "bg-blue-100 text-blue-800",
      rejected: "bg-red-100 text-red-800"
    };
    return styles[status];
  };

  const filteredDeals = useMemo(() => {
    return deals.filter(deal => {
      // Search term filter
      const matchesSearch = 
        deal.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        deal.propertyAddress.toLowerCase().includes(searchTerm.toLowerCase());
      
      // Status filter
      const matchesStatus = filters.status === 'all' || deal.status === filters.status;
      
      // Deal type filter
      const matchesDealType = filters.dealType === 'all' || deal.dealType === filters.dealType;
      
      // Amount filter
      const matchesAmount = 
        (!filters.minAmount || deal.loanAmount >= Number(filters.minAmount)) &&
        (!filters.maxAmount || deal.loanAmount <= Number(filters.maxAmount));
      
      // Priority filter
      const matchesPriority = filters.priority === 'all' || deal.priority === filters.priority;
      
      // Review status filter
      const matchesReviewStatus = 
        filters.reviewStatus === 'all' || 
        deal.adminReview.status === filters.reviewStatus;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesDealType &&
        matchesAmount &&
        matchesPriority &&
        matchesReviewStatus
      );
    });
  }, [deals, searchTerm, filters]);

  const separatedDeals = useMemo(() => ({
    pendingDeals: filteredDeals.filter(deal => 
      ['pending_review', 'in_review', 'on_hold'].includes(deal.adminReview.status)
    ),
    pastDeals: filteredDeals.filter(deal => 
      ['approved', 'rejected'].includes(deal.adminReview.status)
    )
  }), [filteredDeals]);

  const handleUpdateReviewStatus = useCallback((
    dealId: string,
    status: Deal['adminReview']['status'],
    reason?: string,
    signature?: AdminSignature,
    bankRep?: BankRepresentative
  ) => {
    setDeals(prevDeals => prevDeals.map(deal => {
      if (deal.id === dealId) {
        return {
          ...deal,
          adminReview: {
            ...deal.adminReview,
            status,
            reviewedBy: "Admin User",
            reviewedAt: new Date().toISOString(),
            notes: reason || deal.adminReview.notes
          },
          adminSignature: signature,
          bankRepresentative: bankRep
        };
      }
      return deal;
    }));
  }, []);

  const handleUpdateAdminNotes = (dealId: string, notes: string) => {
    // In real app, this would make an API call
    console.log(`Updating deal ${dealId} notes: ${notes}`);
  };

  const handleApproveWithSignature = (deal: Deal) => {
    setDealToApprove(deal);
    setShowSignatureModal(true);
  };

  const handleSignatureSubmit = () => {
    if (!signatureRef.current || !dealToApprove) return;
    
    const signatureData = signatureRef.current.toDataURL();
    const signature: AdminSignature = {
      signatureData,
      signedBy: "Admin User",
      signedAt: new Date().toISOString()
    };

    setTempSignature(signature);

    // Close signature modal and open bank representative modal
    setShowSignatureModal(false);
    setShowBankRepModal(true);
  };

  const clearSignature = () => {
    if (signatureRef.current) {
      signatureRef.current.clear();
    }
  };

  const handleActionWithReason = (dealId: string, action: 'reject' | 'hold') => {
    setPendingAction({ dealId, action });
    setShowReasonModal(true);
  };

  const handleReasonSubmit = () => {
    if (!pendingAction || !rejectReason) return;

    const status = pendingAction.action === 'reject' ? 'rejected' as const : 'on_hold' as const;
    handleUpdateReviewStatus(pendingAction.dealId, status, rejectReason);

    // Reset state
    setRejectReason("");
    setShowReasonModal(false);
    setPendingAction(null);
  };

  const handleResetFilters = () => {
    setFilters({
      status: 'all',
      dealType: 'all',
      minAmount: '',
      maxAmount: '',
      priority: 'all',
      reviewStatus: 'all'
    });
    setSearchTerm('');
  };

  const handleBankRepSubmit = () => {
    if (!dealToApprove || (!selectedBankRep && !isAddingNewRep)) return;

    const finalBankRep = isAddingNewRep ? {
      id: `new-${Date.now()}`,
      ...newBankRep
    } as BankRepresentative : selectedBankRep;

    if (isAddingNewRep) {
      setBankRepresentatives(prev => [...prev, finalBankRep as BankRepresentative]);
    }

    handleUpdateReviewStatus(
      dealToApprove.id,
      'approved',
      undefined,
      tempSignature !== null ? tempSignature : undefined,
      finalBankRep !== null ? finalBankRep : undefined
    );
    setTempSignature(null);

    // Reset and close modals
    setShowBankRepModal(false);
    setSelectedBankRep(null);
    setNewBankRep({});
    setIsAddingNewRep(false);
    setSelectedDeal(null);
    setDealToApprove(null);
  };

  const filteredBankReps = useMemo(() => {
    return bankRepresentatives.filter(rep => {
      const matchesSearch = 
        rep.name.toLowerCase().includes(bankRepSearch.toLowerCase()) ||
        rep.email.toLowerCase().includes(bankRepSearch.toLowerCase()) ||
        rep.bank.toLowerCase().includes(bankRepSearch.toLowerCase());
      
      const matchesBank = selectedBank === "all" || rep.bank === selectedBank;

      return matchesSearch && matchesBank;
    });
  }, [bankRepresentatives, bankRepSearch, selectedBank]);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Deal Review Dashboard</h1>
          <p className="text-sm text-muted-foreground mt-1">Review and manage mortgage applications</p>
        </div>
        <div className="flex gap-2">
          <Badge variant="outline" className="text-sm">
            <Clock className="w-4 h-4 mr-1" />
            {filteredDeals.filter(d => d.adminReview.status === 'pending_review').length} Pending Reviews
          </Badge>
          <Badge variant="outline" className="text-sm">
            <AlertCircle className="w-4 h-4 mr-1" />
            {filteredDeals.filter(d => d.priority === 'high').length} High Priority
          </Badge>
        </div>
      </div>

      <Tabs defaultValue="pending" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-4">
          <TabsTrigger value="pending" className="text-base">
            Pending Deals
          </TabsTrigger>
          <TabsTrigger value="past" className="text-base">
            Past Deals
          </TabsTrigger>
        </TabsList>

        {['pending', 'past'].map((tabValue) => (
          <TabsContent key={tabValue} value={tabValue}>
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex flex-col gap-4 mb-6">
                <div className="flex gap-4">
                  <div className="flex-1 relative">
                    <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search by client name or property..."
                      value={searchTerm}
                      onChange={handleSearch}
                      className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      aria-label="Search deals"
                    />
                  </div>
                  <Sheet>
                    <SheetTrigger asChild>
                      <Button variant="outline" className="flex items-center gap-2">
                        <Filter className="w-4 h-4" />
                        Filters
                      </Button>
                    </SheetTrigger>
                    <SheetContent>
                      <SheetHeader>
                        <SheetTitle>Filter Deals</SheetTitle>
                      </SheetHeader>
                      <div className="space-y-4 py-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Status</label>
                          <Select
                            value={filters.status}
                            onValueChange={(value) => setFilters(prev => ({ ...prev, status: value as Deal['status'] | 'all' }))}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="all">All Status</SelectItem>
                              <SelectItem value="pending">Pending</SelectItem>
                              <SelectItem value="approved">Approved</SelectItem>
                              <SelectItem value="closed">Closed</SelectItem>
                              <SelectItem value="rejected">Rejected</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Deal Type</label>
                          <Select
                            value={filters.dealType}
                            onValueChange={(value) => setFilters(prev => ({ ...prev, dealType: value as Deal['dealType'] | 'all' }))}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select deal type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="all">All Types</SelectItem>
                              <SelectItem value="Purchase">Purchase</SelectItem>
                              <SelectItem value="Refinance">Refinance</SelectItem>
                              <SelectItem value="Home Equity">Home Equity</SelectItem>
                              <SelectItem value="Construction">Construction</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Min Amount</label>
                          <Input
                            type="number"
                            value={filters.minAmount}
                            onChange={(e) => setFilters(prev => ({ ...prev, minAmount: e.target.value ? Number(e.target.value) : '' }))}
                            placeholder="Min amount"
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Max Amount</label>
                          <Input
                            type="number"
                            value={filters.maxAmount}
                            onChange={(e) => setFilters(prev => ({ ...prev, maxAmount: e.target.value ? Number(e.target.value) : '' }))}
                            placeholder="Max amount"
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Priority</label>
                          <Select
                            value={filters.priority}
                            onValueChange={(value) => setFilters(prev => ({ ...prev, priority: value as Deal['priority'] | 'all' }))}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select priority" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="all">All Priorities</SelectItem>
                              <SelectItem value="high">High Priority</SelectItem>
                              <SelectItem value="medium">Medium Priority</SelectItem>
                              <SelectItem value="low">Low Priority</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Review Status</label>
                          <Select
                            value={filters.reviewStatus}
                            onValueChange={(value) => setFilters(prev => ({ ...prev, reviewStatus: value as Deal['adminReview']['status'] | 'all' }))}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="all">All Statuses</SelectItem>
                              <SelectItem value="pending_review">Pending Review</SelectItem>
                              <SelectItem value="in_review">In Review</SelectItem>
                              <SelectItem value="approved">Approved</SelectItem>
                              <SelectItem value="on_hold">On Hold</SelectItem>
                              <SelectItem value="rejected">Rejected</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div className="flex justify-between mt-6">
                        <Button variant="outline" onClick={handleResetFilters}>
                          Reset Filters
                        </Button>
                        <Button onClick={() => setIsFiltersOpen(false)}>
                          Apply Filters
                        </Button>
                      </div>
                    </SheetContent>
                  </Sheet>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Submitted By
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Client
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Deal Type
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Amount
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Priority
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Review Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {tabValue === 'pending' ? 'Submitted' : 'Reviewed'}
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {(tabValue === 'pending' ? 
                      separatedDeals.pendingDeals : 
                      separatedDeals.pastDeals
                    ).map((deal) => (
                      <tr key={deal.id} className={cn(
                        "hover:bg-gray-50",
                        deal.priority === 'high' && tabValue === 'pending' && "bg-red-50/30"
                      )}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center">
                              {deal.submittedBy.split(' ').map(n => n[0]).join('')}
                            </div>
                            <span className="ml-2">{deal.submittedBy}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">{deal.clientName}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Badge variant="outline">{deal.dealType}</Badge>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          ${deal.loanAmount.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Badge variant={  
                            deal.priority === 'high' ? 'destructive' :
                            deal.priority === 'medium' ? 'secondary' :
                            'secondary'
                          }>
                            {deal.priority}
                          </Badge>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Badge variant={
                            deal.adminReview.status === 'approved' ? 'default' :
                            deal.adminReview.status === 'rejected' ? 'destructive' :
                            deal.adminReview.status === 'on_hold' ? 'secondary' :
                            'secondary'
                          }>
                            {deal.adminReview.status.replace('_', ' ')}
                          </Badge>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">
                            {tabValue === 'pending' 
                              ? new Date(deal.submittedAt).toLocaleDateString()
                              : new Date(deal.adminReview.reviewedAt || '').toLocaleDateString()
                            }
                          </div>
                          <div className="text-xs text-gray-400">
                            {tabValue === 'pending'
                              ? new Date(deal.submittedAt).toLocaleTimeString()
                              : new Date(deal.adminReview.reviewedAt || '').toLocaleTimeString()
                            }
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreHorizontal className="w-4 h-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => handleViewDeal(deal)}>
                                Review Details
                              </DropdownMenuItem>
                              {tabValue === 'pending' && (
                                <>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem onClick={() => handleApproveWithSignature(deal)}>
                                    Approve
                                  </DropdownMenuItem>
                                  <DropdownMenuItem onClick={() => handleActionWithReason(deal.id, 'hold')}>
                                    Put On Hold
                                  </DropdownMenuItem>
                                  <DropdownMenuItem 
                                    onClick={() => handleActionWithReason(deal.id, 'reject')}
                                    className="text-red-600"
                                  >
                                    Reject
                                  </DropdownMenuItem>
                                </>
                              )}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </TabsContent>
        ))}
      </Tabs>

      {/* View Deal Modal */}
      {selectedDeal && (
        <Dialog open={!!selectedDeal} onOpenChange={() => setSelectedDeal(null)}>
          <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <div className="flex justify-between items-start">
                <div>
                  <DialogTitle className="text-2xl font-bold">
                    Deal Review #{selectedDeal.id}
                  </DialogTitle>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge variant="outline">{selectedDeal.dealType}</Badge>
                    <div className={cn(
                      "px-2.5 py-1 rounded-full text-xs font-medium border",
                      getStatusColor(selectedDeal.adminReview.status)
                    )}>
                      {selectedDeal.adminReview.status.replace('_', ' ')}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">Submitted by</p>
                  <p className="font-medium">{selectedDeal.submittedBy}</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    {new Date(selectedDeal.submittedAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </DialogHeader>

            <div className="grid grid-cols-3 gap-6 mt-6">
              {/* Left Column - Main Info */}
              <div className="col-span-2 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Client Information</CardTitle>
                  </CardHeader>
                  <CardContent className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Name</p>
                      <p className="font-medium">{selectedDeal.clientName}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Credit Score</p>
                      <p className="font-medium">{selectedDeal.clientDetails.creditScore}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Annual Income</p>
                      <p className="font-medium">${selectedDeal.clientDetails.annualIncome.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Occupation</p>
                      <p className="font-medium">{selectedDeal.clientDetails.occupation}</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Loan Details</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div>
                          <p className="text-sm text-muted-foreground">Loan Amount</p>
                          <p className="text-xl font-bold">${selectedDeal.loanAmount.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Interest Rate</p>
                          <p className="font-medium">{selectedDeal.loanDetails.interestRate}%</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Monthly Payment</p>
                          <p className="font-medium">${selectedDeal.loanDetails.monthlyPayment.toLocaleString()}</p>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div>
                          <p className="text-sm text-muted-foreground">Down Payment</p>
                          <p className="font-medium">${selectedDeal.loanDetails.downPayment.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Term</p>
                          <p className="font-medium">{selectedDeal.loanDetails.term} years</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Loan Type</p>
                          <p className="font-medium">{selectedDeal.loanDetails.loanType}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Required Documents</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {selectedDeal.documents.map((doc) => (
                        <div key={doc.id} className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center gap-3">
                            <div className={cn(
                              "p-2 rounded-lg",
                              doc.status === 'approved' ? 'bg-green-50' : 
                              doc.status === 'rejected' ? 'bg-red-50' : 
                              'bg-gray-50'
                            )}>
                              <FileText className="w-4 h-4" />
                            </div>
                            <div>
                              <p className="font-medium">{doc.name}</p>
                              <p className="text-sm text-muted-foreground">{doc.type}</p>
                            </div>
                          </div>
                          <Badge variant={
                            doc.status === 'approved' ? 'default' :
                            doc.status === 'rejected' ? 'destructive' :
                            'secondary'
                          }>
                            {doc.status}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Right Column - Review & Actions */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Property Details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Address</p>
                      <p className="font-medium">{selectedDeal.propertyAddress}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Type</p>
                        <p className="font-medium">{selectedDeal.propertyDetails.type}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Size</p>
                        <p className="font-medium">{selectedDeal.propertyDetails.squareFeet} sq ft</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Bedrooms</p>
                        <p className="font-medium">{selectedDeal.propertyDetails.numberOfBedrooms}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Bathrooms</p>
                        <p className="font-medium">{selectedDeal.propertyDetails.numberOfBathrooms}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Review Notes</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Textarea
                      value={selectedDeal.adminNotes}
                      onChange={(e) => handleUpdateAdminNotes(selectedDeal.id, e.target.value)}
                      placeholder="Add your review notes here..."
                      className="min-h-[100px]"
                    />
                    {selectedDeal.adminReview.reviewedBy && (
                      <p className="text-sm text-muted-foreground mt-2">
                        Last reviewed by {selectedDeal.adminReview.reviewedBy} on{' '}
                        {new Date(selectedDeal.adminReview.reviewedAt || '').toLocaleDateString()}
                      </p>
                    )}
                  </CardContent>
                </Card>

                {/* Review Decision Card */}
                <Card className="bg-white border-t-2 shadow-lg">
                  <CardHeader>
                    <CardTitle>Review Decision</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {selectedDeal.adminReview.status === 'pending_review' || 
                       selectedDeal.adminReview.status === 'in_review' ? (
                        // Show action buttons only for pending/in-review deals
                        <>
                          <div className="grid grid-cols-2 gap-2">
                            <Button 
                              variant="outline" 
                              onClick={() => handleActionWithReason(selectedDeal.id, 'hold')}
                              className="w-full"
                            >
                              Put On Hold
                            </Button>
                            <Button 
                              variant="destructive"
                              onClick={() => handleActionWithReason(selectedDeal.id, 'reject')}
                              className="w-full"
                            >
                              Reject
                            </Button>
                          </div>
                          <Button 
                            className="w-full"
                            onClick={() => handleApproveWithSignature(selectedDeal)}
                          >
                            Approve Deal
                          </Button>
                        </>
                      ) : (
                        // Show decision details for past deals
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <Badge variant={
                              selectedDeal.adminReview.status === 'approved' ? 'default' :
                              selectedDeal.adminReview.status === 'rejected' ? 'destructive' :
                              'secondary'
                            }>
                              {selectedDeal.adminReview.status.replace('_', ' ')}
                            </Badge>
                            
                            {selectedDeal.adminSignature && (
                              <div className="text-sm text-muted-foreground text-right">
                                <div>Signed by {selectedDeal.adminSignature.signedBy}</div>
                                <div>on {new Date(selectedDeal.adminSignature.signedAt).toLocaleString()}</div>
                              </div>
                            )}
                          </div>

                          {selectedDeal.adminSignature && (
                            <div className="mt-4">
                              <div className="bg-gray-50 rounded-lg p-4">
                                <img 
                                  src={selectedDeal.adminSignature.signatureData} 
                                  alt="Admin signature" 
                                  className="max-h-[60px]"
                                />
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>

                {selectedDeal.bankRepresentative && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Bank Representative</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div>
                          <p className="text-sm text-muted-foreground">Name</p>
                          <p className="font-medium">{selectedDeal.bankRepresentative.name}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Bank</p>
                          <p className="font-medium">{selectedDeal.bankRepresentative.bank}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Contact</p>
                          <p className="font-medium">{selectedDeal.bankRepresentative.email}</p>
                          <p className="text-sm text-muted-foreground">{selectedDeal.bankRepresentative.phone}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* New Deal Modal */}
      {isNewDealModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Create New Deal</h2>
              <button
                onClick={handleCloseModal}
                className="text-gray-500 hover:text-gray-700"
                aria-label="Close modal"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Client Name</label>
                <input
                  type="text"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Property Address</label>
                <input
                  type="text"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Loan Amount</label>
                <input
                  type="number"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-4 py-2 border rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Create Deal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showSignatureModal && (
        <Dialog open={showSignatureModal} onOpenChange={() => setShowSignatureModal(false)}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Admin Signature Required</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="border rounded-lg p-4">
                <p className="text-sm text-muted-foreground mb-2">
                  Please sign below to approve this deal:
                </p>
                <div className="border rounded-lg bg-gray-50">
                  <SignatureCanvas
                    ref={signatureRef}
                    canvasProps={{
                      className: 'signature-canvas w-full h-[200px]',
                      style: { borderRadius: '0.5rem' }
                    }}
                    backgroundColor="rgb(249 250 251)"
                  />
                </div>
              </div>
              <div className="flex justify-between">
                <Button variant="outline" onClick={clearSignature}>
                  Clear Signature
                </Button>
                <div className="space-x-2">
                  <Button 
                    variant="outline" 
                    onClick={() => setShowSignatureModal(false)}
                  >
                    Cancel
                  </Button>
                  <Button onClick={handleSignatureSubmit}>
                    Submit & Approve
                  </Button>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Add Reason Modal */}
      <Dialog open={showReasonModal} onOpenChange={setShowReasonModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {pendingAction?.action === 'reject' ? 'Reject Deal' : 'Put Deal On Hold'}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">
                Please provide a reason
              </label>
              <Textarea
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
                placeholder={`Enter reason for ${pendingAction?.action === 'reject' ? 'rejection' : 'putting on hold'}...`}
                className="min-h-[100px]"
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => {
                  setShowReasonModal(false);
                  setRejectReason("");
                  setPendingAction(null);
                }}
              >
                Cancel
              </Button>
              <Button
                variant={pendingAction?.action === 'reject' ? 'destructive' : 'default'}
                onClick={handleReasonSubmit}
                disabled={!rejectReason}
              >
                Confirm {pendingAction?.action === 'reject' ? 'Rejection' : 'Hold'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Bank Representative Modal */}
      <Dialog open={showBankRepModal} onOpenChange={setShowBankRepModal}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Select Bank Representative</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            {!isAddingNewRep ? (
              <>
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <div className="flex-1 relative">
                      <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <Input
                        placeholder="Search representatives..."
                        value={bankRepSearch}
                        onChange={(e) => setBankRepSearch(e.target.value)}
                        className="pl-9"
                      />
                    </div>
                    <Select
                      value={selectedBank}
                      onValueChange={setSelectedBank}
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select bank" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Banks</SelectItem>
                        {CANADIAN_BANKS.map((bank) => (
                          <SelectItem key={bank} value={bank}>
                            {bank}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="max-h-[300px] overflow-y-auto space-y-2">
                    {filteredBankReps.length === 0 ? (
                      <div className="text-center py-4 text-muted-foreground">
                        No representatives found
                      </div>
                    ) : (
                      filteredBankReps.map((rep) => (
                        <div
                          key={rep.id}
                          className={cn(
                            "p-4 border rounded-lg cursor-pointer hover:bg-gray-50",
                            selectedBankRep?.id === rep.id && "border-blue-500 bg-blue-50"
                          )}
                          onClick={() => setSelectedBankRep(rep)}
                        >
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="font-medium">{rep.name}</p>
                              <p className="text-sm text-muted-foreground">{rep.bank}</p>
                            </div>
                            <div className="text-right text-sm text-muted-foreground">
                              <p>{rep.email}</p>
                              <p>{rep.phone}</p>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => setIsAddingNewRep(true)}
                >
                  + Add New Representative
                </Button>
              </>
            ) : (
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Name</label>
                  <Input
                    value={newBankRep.name || ''}
                    onChange={(e) => setNewBankRep(prev => ({ ...prev, name: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Bank</label>
                  <Select
                    value={newBankRep.bank || ''}
                    onValueChange={(value) => setNewBankRep(prev => ({ ...prev, bank: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select bank" />
                    </SelectTrigger>
                    <SelectContent>
                      {CANADIAN_BANKS.map((bank) => (
                        <SelectItem key={bank} value={bank}>
                          {bank}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Email</label>
                  <Input
                    type="email"
                    value={newBankRep.email || ''}
                    onChange={(e) => setNewBankRep(prev => ({ ...prev, email: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Phone</label>
                  <Input
                    value={newBankRep.phone || ''}
                    onChange={(e) => setNewBankRep(prev => ({ ...prev, phone: e.target.value }))}
                  />
                </div>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => setIsAddingNewRep(false)}
                >
                  Back to Existing Representatives
                </Button>
              </div>
            )}
            <div className="flex justify-end gap-2 mt-4">
              <Button
                variant="outline"
                onClick={() => {
                  setShowBankRepModal(false);
                  setSelectedBankRep(null);
                  setNewBankRep({});
                  setIsAddingNewRep(false);
                  setBankRepSearch("");
                  setSelectedBank("all");
                }}
              >
                Cancel
              </Button>
              <Button
                onClick={handleBankRepSubmit}
                disabled={!selectedBankRep && (!isAddingNewRep || !newBankRep.name || !newBankRep.bank)}
              >
                Confirm Selection
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
} 