import {get, post, remove} from 'sr/utils/axios/index'
import {CreatePayloadType, PayloadType, ProgramApiResponse} from './programInterfaces'

const filterPayload = (payload: PayloadType) => {
  return Object.fromEntries(
    Object.entries(payload).filter(([_, value]) => value !== undefined && value !== null)
  )
}

export const fetchPrograms = async (payload: PayloadType): Promise<ProgramApiResponse> => {
  const filteredPayload = filterPayload(payload)

  try {
    const res = await get<ProgramApiResponse>('/program', filteredPayload)

    if (res && res.status == 'success') {
      return res // Return the fetched data
    } else {
      throw new Error('No data found')
    }
  } catch (error) {
    throw new Error(
      `Failed to fetch programs: ${error instanceof Error ? error.message : 'Unknown error'}`
    )
  }
}

export const CreatePrograms = async (payload: any): Promise<ProgramApiResponse> => {
  try {
    const res = await post<ProgramApiResponse>('/program', payload)

    if (res && res.status == 'success') {
      return res // Return the fetched data
    } else {
      throw new Error('No data found')
    }
  } catch (error) {
    throw new Error(
      `Failed to fetch programs: ${error instanceof Error ? error.message : 'Unknown error'}`
    )
  }
}

export const DeletePrograms = async (payload: string): Promise<any> => {
  try {
    const res = await remove<any>(`/program/${payload}`)

    if (res && res.status == 'success') {
      return res // Return the fetched data
    } else {
      throw new Error('Not able to delete')
    }
  } catch (error) {
    throw new Error(
      `Failed to fetch programs: ${error instanceof Error ? error.message : 'Unknown error'}`
    )
  }
}
