import ApiResponse from 'sr/models/ApiResponse'
import {get, remove} from 'sr/utils/axios/index'
import {alertService} from 'sr/utils/services/alert.service'
import {toast} from 'react-toastify'

export const deleteState = async (payload: any) => {
  try {
    const res = await remove<any>(`/state/${payload}`)
    return res
  } catch (e: any) {
    toast.error(e.message)
    return []
  }
}
