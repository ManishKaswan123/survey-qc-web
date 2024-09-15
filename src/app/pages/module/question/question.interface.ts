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
  remarks?: string
  qaRemarks?: string
  status?: string
  programId?: string
  sectionId?: string
  questionId: string
  createdBy?: {}
  faId?: {}
  surveyId?: {}
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
}

export interface QuestionTableProps {
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
