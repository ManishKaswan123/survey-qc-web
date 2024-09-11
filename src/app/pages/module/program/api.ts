import {get} from 'sr/utils/axios/index'
import {PayloadType, ProgramApiResponse} from './programInterfaces'

const filterPayload = (payload: PayloadType) => {
  return Object.fromEntries(
    Object.entries(payload).filter(([_, value]) => value !== undefined && value !== null)
  )
}

export const fetchPrograms = async (payload: PayloadType): Promise<ProgramApiResponse> => {
  const filteredPayload = filterPayload(payload)

  try {
    const res = await get<ProgramApiResponse>('/programs', filteredPayload)

    if (res.results && res.results.length > 0) {
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
