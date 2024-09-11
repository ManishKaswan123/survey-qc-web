import {get} from 'sr/utils/axios/index'
import {PayloadType, SectionApiResponse} from './sectionInterfaces'

const filterPayload = (payload: PayloadType) => {
  return Object.fromEntries(
    Object.entries(payload).filter(([_, value]) => value !== undefined && value !== null)
  )
}

export const fetchSections = async (payload: PayloadType): Promise<SectionApiResponse> => {
  const filteredPayload = filterPayload(payload)

  try {
    const res = await get<SectionApiResponse>('/sections', filteredPayload)

    if (res.results && res.results.length > 0) {
      return res
    } else {
      throw new Error('No data found')
    }
  } catch (error) {
    throw new Error(
      `Failed to fetch sections: ${error instanceof Error ? error.message : 'Unknown error'}`
    )
  }
}
