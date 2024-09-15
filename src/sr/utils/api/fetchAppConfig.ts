import {get} from 'sr/utils/axios/index'
import {toast} from 'react-toastify'

interface PayloadType {
  limit?: number
  page?: number
  title?: string
  code?: string
  createdBy?: string
  sortBy?: string
  projectBy?: string
  isActive?: boolean
}

const filterPayload = (payload: any) => {
  return Object.fromEntries(
    Object.entries(payload).filter(([_, value]) => value !== undefined && value !== null)
  )
}
export const fetchAppConfig = async (payload: any) => {
  try {
    const filtetedPayload = filterPayload(payload)
    const res = await get<any>(`/mobile-app-config-history`, filtetedPayload)
    if (res.status != 'success') {
      toast.error('Failed to fetch app config history')
    }
    return res.results
  } catch (e: any) {
    toast.error(e.message)
    return []
  }
}
