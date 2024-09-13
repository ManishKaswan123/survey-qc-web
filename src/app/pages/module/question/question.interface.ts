export interface FilterProps {
  surveyId?: string
  programId?: string
  sectionId?: string
  status?: string
  createdBy?: string
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
export interface AnswerInterface {
  textResponse: string
  multipleChoiceResponse: string[]
  remarks?: string
  qaRemarks?: string
  status?: string
  programId?: string
  sectionId?: string
  questionId?: {
    questionCode: string
    name: string
    id: string
  }
  createdBy?: {}
  faId?: {}
  surveyId?: {}
  isActive?: boolean
  id: string
}

export interface QuestionResponse {
  status: string
  results: {
    results: AnswerInterface[]
    page: number
    limit: number
    totalPages: number
    totalResults: number
  }
}

export interface QuestionTableProps {
  key: string
  question: AnswerInterface
  setIsUpdateModalOpen?: (isOpen: boolean) => void
}
