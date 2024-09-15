import {get} from 'sr/utils/axios/index'
import {toast} from 'react-toastify'

interface payloadType {
  limit?: Number
  page?: Number
  getAll?: Boolean
  stateName?: String
  stateCode?: number
  stateUT?: string
  sortBy?: string
  projectBy?: string
}
const filterPayload = (payload: payloadType) => {
  return Object.fromEntries(
    Object.entries(payload).filter(([_, value]) => value !== undefined && value !== null)
  )
}
export const fetchContactUs = async (payload: payloadType) => {
  try {
    const filteredPayload = filterPayload(payload)
    const res = await get<any>(`/contact-us`, filteredPayload)
    if (res.status != 'success') {
      toast.error('error while fetching contact-us')
      return null
    }
    return res.results
  } catch (e: any) {
    toast.error(e.message)
    return []
  }
}
