import {get, post} from 'sr/utils/axios'
import {FilterProps, SectionApiResponse, SectionCreatePayload} from './section.interfaces'
import {toast} from 'react-toastify'

const filterPayload = (payload: FilterProps) => {
  return Object.fromEntries(
    Object.entries(payload).filter(([_, value]) => value !== undefined && value !== null)
  )
}

export const fetchSections = async (payload?: FilterProps): Promise<SectionApiResponse> => {
  const filteredPayload = filterPayload(payload ?? {})

  try {
    const res = await get<SectionApiResponse>(`/section`, filteredPayload)

    if (res && res.status == 'success') {
      return res // Return the fetched data
    } else {
      // Handle the case where results are not present
      throw new Error('No data found')
    }
  } catch (error) {
    // Throw the error to be handled by the caller
    throw new Error(`Failed to fetch : ${error instanceof Error ? error.message : 'Unknown error'}`)
  }
}

export const createSection = async (payload: Record<string, any>) => {
  try {
    const res = await post<Record<string, any>>('/section', payload)
    if (res) {
      toast.success('Section created successfully')
      return true
    } else return false
  } catch (e: any) {
    toast.error(e.message)
    return false
  }
}
