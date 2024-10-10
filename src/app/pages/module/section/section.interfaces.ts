import {SurveySectionMapping} from '../survey/survey.interfaces'

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
  lableName: Record<string, string>
  sectionCode: string
  displayOrder: number
  description: string
  __v?: number
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
  surveySectionMapping?: SurveySectionMapping[]
  sectionData: Section[]
  receivedData?: Record<string, any>
  surveyId: string
  programId: string
  totalAttemptedQuestionsMap: Record<
    string,
    {
      count: number
      status: string
    }
  >
  totalQuestionsMap: Record<string, number>
}

export interface SectionCreatePayload {
  programId: string
  sectionName: string
  labelName?: Record<string, string>
  description: string
  displayOrder: string
  sectionCode: string
  isActive?: boolean
}
