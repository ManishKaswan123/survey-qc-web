import {patch} from 'sr/utils/axios/index'
import {toast} from 'react-toastify'

export const updateUser = async (payload: any, id: string) => {
  try {
    const res = await patch<any>(`/users/${id}`, payload)
    return res
  } catch (e: any) {
    toast.error(e.message)
    return []
  }
}
