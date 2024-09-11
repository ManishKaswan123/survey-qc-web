import {QueryObserverResult} from '@tanstack/react-query'
import {UserInterface} from 'sr/constants/User'

export interface fetchUserResponse {
  results: UserInterface[]
  page: number
  limit: number
  totalPages: number
  totalResults: number
}

export interface userFilters {
  role?: string
  sellerStatus?: string
  isEmailVerified?: boolean
}
export interface UserTableProps {
  userData: UserInterface[] | undefined
  onSelectUser: React.Dispatch<React.SetStateAction<UserInterface | undefined>>
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
