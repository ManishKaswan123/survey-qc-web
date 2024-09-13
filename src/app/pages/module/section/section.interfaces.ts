export interface FilterProps {
  programId?: string
  limit?: number
  page?: number
  getAll?: boolean
  projectBy?: string
  sortBy?: string
  populate?: string
}
export interface Section {
  _id: string
  programId: string
  sectionName: string
  lableName: Record<string, any>
  sectionCode: string
  displayOrder: number
  description: string
  __v: number
}
export interface SectionApiResponse {
  status: string
  results: {
    results: Section[]
    page: number
    limit: number
    totalPages: number
    totalResults: number
  }
}
export interface SectionTableProps {
  sectionData: Section[]
  receivedData: Record<string, any>
}
