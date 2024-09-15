import ApiResponse from 'sr/models/ApiResponse'
import {get, remove} from 'sr/utils/axios/index'
import {alertService} from 'sr/utils/services/alert.service'
import {toast} from 'react-toastify'

export const deleteUser = async (payload: string) => {
  try {
    const res = await remove<any>(`/users/${payload}`)
    return res
  } catch (e: any) {
    toast.error(e.message)
    return []
  }
}
