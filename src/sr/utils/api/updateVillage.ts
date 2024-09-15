import {patch} from 'sr/utils/axios/index'
import {toast} from 'react-toastify'

export const updateVillage = async (payload: any, id: string) => {
  try {
    const res = await patch<any>(`/village/${id}`, payload)
    return res
  } catch (e: any) {
    toast.error(e.message)
    return []
  }
}
