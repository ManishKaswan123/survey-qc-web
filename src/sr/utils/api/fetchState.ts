import ApiResponse from 'sr/models/ApiResponse'
import {get} from 'sr/utils/axios/index'
import {alertService} from 'sr/utils/services/alert.service'
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
export const fetchState = async (payload: payloadType) => {
  try {
    const filteredPayload = filterPayload(payload)
    const res = await get<any>(`/state`, filteredPayload)
    if (res.status != 'success') {
      toast.error('error while fetching state')
      return null
    }
    return res.results
  } catch (e: any) {
    toast.error(e.message)
    return []
  }
}
