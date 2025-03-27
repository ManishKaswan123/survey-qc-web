import {GlobalPayloadType, SuveryGlobalResponse} from 'sr/constants/globalInterfaces'

export interface Program {
  _id: string
  name: string
  description: string
  startDate: string
  companyId: string
  createdBy: string
  isActive: boolean
  __v: number
}

export type ProgramApiResponse = SuveryGlobalResponse<Program>

export interface ProgramFilters extends GlobalPayloadType {
  isActive?: boolean
  programName?: string
}

export interface ProgramCreatePayloadType {
  name: string
  description: string
  startDate: string
  endDate?: string
  isActive?: boolean
}
