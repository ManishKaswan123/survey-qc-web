import ApiResponse from 'sr/models/ApiResponse'
import {get, patch, post} from 'sr/utils/axios/index'
import {alertService} from 'sr/utils/services/alert.service'
import {toast} from 'react-toastify'

export const createUser = async (payload: any) => {
  try {
    const res = await post<any>(`/users`, payload)
    return res
  } catch (e: any) {
    toast.error(e.message)
    return []
  }
}
