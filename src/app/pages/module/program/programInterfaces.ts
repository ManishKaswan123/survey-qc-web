export interface Program {
  _id: string
  name: string
  description: string
  details: string
  startDate: string
  endDate: string
}

export interface ProgramApiResponse {
  // results: Program[]
  // page: number
  // limit: number
  // totalPages: number
  // totalResults: number
  status: string
  results: {
    results: Program[]
    page: number
    limit: number
    totalPages: number
    totalResults: number
  }
}

export interface ProgramFilters {
  name?: string
}

export interface PayloadType {
  limit?: number
  page?: number
  sortBy?: string
  getAll?: boolean
}
