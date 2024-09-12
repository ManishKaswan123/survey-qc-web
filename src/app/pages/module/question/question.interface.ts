interface Option {
  value: string
  label: string
}
type QuestionType =
  | 'text'
  | 'number'
  | 'datepicker'
  | 'daterangepicker'
  | 'radio'
  | 'checkbox'
  | 'filetype'
export interface Question {
  questionNumber: number
  questionName: string
  questionType: QuestionType
  validation: string
  isMandatory: boolean
  dependentOnQuestion?: string
  dependentOnOption?: string
  answerType: 'single' | 'multiple'
  options: Option[]
  id: string
}

export interface QuestionApIResponse {
  results: Question[]
  page: number
  limit: number
  totalPages: number
  totalResults: number
}

export interface QuestionFilters {
  questionType?: string
  validation?: string
  isMandatory?: string
  dependentOnQuestion?: string
  answerType?: string
}

export interface TableProps {
  setSelectedData: React.Dispatch<React.SetStateAction<any>>
  setIsUpdateModalOpen: React.Dispatch<React.SetStateAction<boolean>>
  questions: Question[]
  handleDelete?: (id: string) => Promise<void>
  handleView?: (fileUrl: string | undefined) => Promise<void>
}
