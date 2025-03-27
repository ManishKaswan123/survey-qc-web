export interface SuveryGlobalResponse<T> {
  status: string
  results: {
    results: T[]
    page: number
    limit: number
    totalPages: number
    totalResults: number
  }
}
export interface GlobalPayloadType {
  limit?: number
  page?: number
  sortBy?: string
  projectBy?: string
  getAll?: boolean
}
export type Status =
  | 'active'
  | 'ACTIVE'
  | 'in progress'
  | 'publish'
  | 'completed'
  | 'pending'
  | 'approved'
  | 'draft'
  | 'rejected'
  | 'hired'
  | 'withdrawn'
  | 'shortlist'
  | 'awaiting-reviews'
  | 'pause'
  | 'contacting'
  | 'inactive'
  | 'deleted'
  | 'open'
  | 'closed'
  | 'accept'
  | 'pending_otp'
