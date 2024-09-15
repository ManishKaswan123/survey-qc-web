import {remove} from 'sr/utils/axios/index'
import {toast} from 'react-toastify'

export const deleteDistrict = async (payload: any) => {
  try {
    const res = await remove<any>(`/district/${payload}`)
    return res
  } catch (e: any) {
    toast.error(e.message)
    return []
  }
}
