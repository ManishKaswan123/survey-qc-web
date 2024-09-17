export interface Program {
  _id: string
  name: string
  description: string
  startDate: string
  companyId: string
  createdBy: string
  isActive: boolean
}

export interface ProgramApiResponse {
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

export interface CreatePayloadType {
  name: string
  description?: string
  startDate: string
  companyId: string
  createdBy: string
}
