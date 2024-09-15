import ApiResponse from 'sr/models/ApiResponse'
import {get} from 'sr/utils/axios/index'
import {alertService} from 'sr/utils/services/alert.service'
import {toast} from 'react-toastify'

interface payloadType {
  limit?: Number
  page?: Number
  getAll?: Boolean
  districtName?: String
  districtCode?: number
  stateCode?: number
  sortBy?: string
  projectBy?: string
}
const filterPayload = (payload: payloadType) => {
  return Object.fromEntries(
    Object.entries(payload).filter(([_, value]) => value !== undefined && value !== null)
  )
}
export const fetchDistrict = async (payload: payloadType) => {
  try {
    const filteredPayload = filterPayload(payload)
    const res = await get<any>(`/district`, filteredPayload)
    if (res.status != 'success') {
      toast.error('error while fetching district')
      return null
    }
    return res.results
  } catch (e: any) {
    toast.error(e.message)
    return []
  }
}
