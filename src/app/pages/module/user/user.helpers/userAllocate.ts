import {patch, post} from 'sr/utils/axios/index'
import {toast} from 'react-toastify'
import {allocateUserInterface} from '../user.interfaces'

export const allocateUser = async (payload: any) => {
  try {
    const res = await post<any>(`/users/allocate`, payload)
    return res
  } catch (e: any) {
    toast.error(e.message)
    return []
  }
}
