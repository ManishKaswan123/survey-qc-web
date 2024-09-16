import {remove} from 'sr/utils/axios/index'
import {toast} from 'react-toastify'

export const deleteVillage = async (payload: any) => {
  try {
    const res = await remove<any>(`/village/${payload}`)
    return res
  } catch (e: any) {
    toast.error(e.message)
    return []
  }
}