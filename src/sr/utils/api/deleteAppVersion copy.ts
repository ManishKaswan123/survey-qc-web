import {remove} from 'sr/utils/axios/index'
import {toast} from 'react-toastify'

export const deleteAppVersion = async (payload: any) => {
  try {
    const res = await remove<any>(`/mobile-app-version-history/${payload}`)
    return res
  } catch (e: any) {
    toast.error(e.message)
    return []
  }
}
