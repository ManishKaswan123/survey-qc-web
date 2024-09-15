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

// question.interface.ts

export interface Option {
  fieldName: string
  fieldValue: string
  labelName: Record<string, string> // language code to label map
}

export interface DataSource {
  source: 'API' | 'INLINE' | 'CONFIG' // e.g., 'internal', 'external'
  labelKey?: string
  valueKey?: string
  config: {
    dynamicParams: {
      fieldId: string
      paramName: string
      isMandatory: boolean
    }[]
    fixedParams: {
      paramName: string
      paramValue: string
      isMandatory: boolean
    }[]
  }
  configKey?: string
}

export interface VisibleOnFieldId {
  questionId: string
  optionValue: string[] // Assuming it's an array of option values
}

export interface Question {
  labelName: Record<string, string> // Label names mapped to language codes
  questionCode: string
  fieldName: string
  questionType: string
  isMandatory: boolean
  displayOrder: number
  programId: string
  sectionId: string
  createdBy: string
  updatedBy: string
  isActive: boolean
  id: string
  fieldRegex?: string
  options: Option[] // Array of options
  dataSource: DataSource // Data source configuration
  visibleOnFieldIds: VisibleOnFieldId[] // Array of visible field configurations
  questionConfig: Record<string, any> // Additional config, dynamic key-value
}

export interface QuestionCardProps {
  question: Question
  expandedId: string | null
  setSelectedData: (data: Question) => void
  setIsUpdateModalOpen: (isOpen: boolean) => void
  setExpandedId: (id: string | null) => void
  onDelete: (id: string) => void
}

export interface QuestionCreatePayload {
  questionCode: string
  fieldName: string
  questionType: string
  isMandatory?: boolean
  fieldRegex?: string | null
  visibleOnFieldIds?: VisibleOnFieldId[]
  options?: Option[]
  labelName: Record<string, string>
  dataSource?: DataSource
  displayOrder: number
  programId: string
  sectionId: string
  questionConfig: {}
}
