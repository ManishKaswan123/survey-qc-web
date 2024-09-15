import ApiResponse from 'sr/models/ApiResponse'
import {get, post} from 'sr/utils/axios/index'
import {alertService} from 'sr/utils/services/alert.service'
import {toast} from 'react-toastify'

export const createState = async (payload: any) => {
  try {
    const res = await post<any>('/state', payload)
    return res
  } catch (e: any) {
    toast.error(e.message)
    return []
  }
}
