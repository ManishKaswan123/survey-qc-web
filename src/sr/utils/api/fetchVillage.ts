import ApiResponse from 'sr/models/ApiResponse'
import {get} from 'sr/utils/axios/index'
import {alertService} from 'sr/utils/services/alert.service'
import {toast} from 'react-toastify'

interface payloadType {
  limit?: Number
  page?: Number
  getAll?: Boolean
  villageName?: String
  villageCode?: number
  stateCode?: number
  districtCode?: number
  subDistrictCode?: number
  sortBy?: string
  projectBy?: string
}
const filterPayload = (payload: payloadType) => {
  return Object.fromEntries(
    Object.entries(payload).filter(([_, value]) => value !== undefined && value !== null)
  )
}
export const fetchVillage = async (payload: payloadType) => {
  try {
    const filteredPayload = filterPayload(payload)
    const res = await get<any>(`/village`, filteredPayload)
    if (res.status != 'success') {
      toast.error('error while fetching village')
      return null
    }
    return res.results
  } catch (e: any) {
    toast.error(e.message)
    return []
  }
}
