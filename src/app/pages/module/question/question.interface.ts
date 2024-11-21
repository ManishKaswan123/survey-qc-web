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
  textResponse?: string
  dateResponse?: string
  toDateResponse?: string
  multipleChoiceResponse?: string[]
  numberResponse?: number
  pinLocationResponse?: any
  polygonResponse?: any
  remarks?: string
  qaRemarks?: string
  status?: string
  programId?: string
  sectionId?: string
  questionId: string
  createdBy?: string
  faId?: string
  surveyId?: string
  isActive?: boolean
  id: string
}

export interface DataSourceConfig {
  dynamicParams: any[]
  fixedParams: any[]
}

export interface DataSource {
  config: DataSourceConfig
  source: string
  labelKey: string
  valueKey: string
}

export interface OptionLabelName {
  en: string
  hi: string
}

export interface Option {
  fieldName: string
  fieldValue: string
  labelName: OptionLabelName
  _id: string
}

export interface LabelName {
  en: string
  hi: string
}

export interface QuestionInterface {
  dataSource: DataSource
  programId: string
  sectionId: string
  questionCode: string
  fieldName: string
  questionType: string
  isMandatory: boolean
  fieldRegex: string
  displayOrder: number
  visibleOnFieldIds: any[]
  options: Option[]
  labelName: LabelName
  createdBy: string
  isActive: boolean
  createdAt: string
  updatedAt: string
  id: string
}

export interface OptionInterface {
  fieldName: string
  fieldValue: string
  labelName: LabelName
  _id: string
}

export interface QuestionAnswer {
  programId: string
  sectionId: string
  questionCode: string
  fieldName: string
  questionType: string
  options: OptionInterface[]
  status: string
  questionId: string
  answerId?: string
  remarks?: string
  qaRemarks?: string | null
  textResponse?: string
  dateResponse?: string
  toDateResponse?: string
  multipleChoiceResponse?: string[]
  numberResponse?: number
  pinLocationResponse?: any
  polygonResponse?: any
  faId?: string
  surveyId?: string
}

export interface QuestionTableProps {
  setReRender: React.Dispatch<React.SetStateAction<boolean>>;
  key: string
  data: QuestionAnswer
  setIsUpdateModalOpen?: (isOpen: boolean) => void
}
export interface QuestionResponse {
  status: string
  results: {
    results: QuestionInterface[]
    page: number
    limit: number
    totalPages: number
    totalResults: number
  }
}

export interface AnswerResponse {
  status: string
  results: {
    results: AnswerInterface[]
    page: number
    limit: number
    totalPages: number
    totalResults: number
  }
}

// question.interface.ts

export interface OptionQuestion {
  fieldName: string
  fieldValue: string
  labelName: Record<string, string> // language code to label map
}

export interface DataSourceQuestion {
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
  options: OptionQuestion[] // Array of options
  dataSource: DataSourceQuestion // Data source configuration
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
  dataSource?: DataSourceQuestion
  displayOrder: number
  programId: string
  sectionId: string
  questionConfig: {}
}

export interface FilterAnswerProps {
  textResponse?: string
  dateResponse?: string
  toDateResponse?: string
  multipleChoiceResponse?: string[]
  numberResponse?: number
  pinLocationResponse?: any
  polygonResponse?: any
  remarks: string
  status: string
  questionId: string
  faId: string
  surveyId: string
  programId: string
  sectionId: string
}
export interface StaticQuestionsApiResponse {
  status: string
  results: {
    results: Question[]
    page?: number
    limit?: number
    totalPages?: number
    totalResults?: number
  }
}
