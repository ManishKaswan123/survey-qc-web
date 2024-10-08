import {QueryObserverResult} from '@tanstack/react-query'

export interface UserInterface {
  languagePreference: []
  sellerStatus?: string
  sellerPaymentPlanId?: string
  email: string
  mobile: string
  role: string
  isEmailVerified: boolean
  isMobileVerified: boolean
  firstName: string
  lastName: string
  createdAt: string
  updatedAt: string
  isActive: boolean
  comapnyId: string
  programId: string
  id: string
}

export interface PayloadType {
  limit?: number
  page?: number
  role?: string
  sellerStatus?: string
  isEmailVerified?: boolean
  sortBy?: string
  projectBy?: string
  getAll?: boolean
  isActive?: boolean
}

export interface fetchUserResponse {
  status: string
  results: {
    results: UserInterface[]
    page: number
    limit: number
    totalPages: number
    totalResults: number
  }
}

export interface userFilters {
  role?: string
  sellerStatus?: string
  isEmailVerified?: boolean
}

export interface UserTableProps {
  userData: UserInterface[] | undefined
  onSelectUser: React.Dispatch<React.SetStateAction<UserInterface | undefined>>
  setIsChangePasswordModalOpen: React.Dispatch<React.SetStateAction<boolean>>
  setIsUpdateModalOpen: React.Dispatch<React.SetStateAction<boolean>>
  setIsAllocateModalOpen: React.Dispatch<React.SetStateAction<boolean>>
  onDelete: (id: string) => void
}

export interface SellerDetailsApiResponse {
  accountNumber?: string
  routingNumber?: string
  storeName?: string
  street?: string
  city?: string
  state: string
  zip?: string
  country?: string
  storeHours?: string
  legalBusinessName?: string
  ein?: string
  businessOwnerName?: string
  businessStreet?: string
  businessCity?: string
  businessState: string
  businessZip?: string
  businessCountry?: string
  businessOwnerDOB?: string
  eSignatureConsent?: string
  smsAuthorization?: string
  feeConsent?: string
  attachment1?: string
  attachment2?: string
  attachment3?: string
  userId: string
  createdAt: string
  updatedAt: string
  id: string // `id` is required
}
export interface paymentPlanApiResponse {
  settlementDays?: number
  convenienceFee?: number
  planName?: string
  planDetails?: string
  createdBy?: UserInterface
  isActive?: boolean
  createdAt: string
  updatedAt: string
  id: string
}

export interface sellerDetailsCardProps {
  onGoBack: () => void
  selectedUser: UserInterface | undefined
  setSelectedUser: React.Dispatch<React.SetStateAction<UserInterface | undefined>>
  setReRender: () => Promise<QueryObserverResult<any, Error>>
}

export interface allocateUserInterface {
  userType: string
  userId: string
  surveyIds: string[]
}
