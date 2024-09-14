import {statusType} from 'sr/constants/status'

export interface FilterProps {
  programId?: string
  status?: string
  createdBy?: string
  qaId?: string
  faId?: string
  limit?: number
  page?: number
  getAll?: boolean
  projectBy?: string
  sortBy?: string
  populate?: string
}
export interface Section {
  sectionId: string
  status: string
  _id: string
}
export interface Survey {
  email: string
  mobile: string
  firstName: string
  lastName: string
  sections: Section[]
  status: statusType
  createdBy: Record<string, any>
  programId: Record<string, any>
  isActive: boolean
  createdAt: string
  updatedAt: string
  faId?: Record<string, any>
  qaId?: Record<string, any>
  remarks: string
  updatedBy: Record<string, any>
  id: string
}
export interface SurveyApiResponse {
  status: string
  results: {
    results: Survey[]
    page: number
    limit: number
    totalPages: number
    totalResults: number
  }
}
export interface SurveyTableProps {
  surveyData: Survey[]
}