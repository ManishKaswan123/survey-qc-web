import {remove} from 'sr/utils/axios/index'
import {toast} from 'react-toastify'

export const deleteAppConfig = async (payload: any) => {
  try {
    const res = await remove<any>(`/mobile-app-config-history/${payload}`)
    return res
  } catch (e: any) {
    toast.error(e.message)
    return []
  }
}
