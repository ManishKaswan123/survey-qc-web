export interface Program {
  id: string
  name: string
  description: string
  details: string
  startDate: string
  endDate: string
}

export interface ProgramApiResponse {
  results: Program[]
  page: number
  limit: number
  totalPages: number
  totalResults: number
}

export interface ProgramFilters {
  name?: string
}

export interface PayloadType {
  limit?: number
  page?: number
  sortBy?: string
}
