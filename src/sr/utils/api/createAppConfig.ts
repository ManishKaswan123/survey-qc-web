import {post} from 'sr/utils/axios/index'
import {toast} from 'react-toastify'

export const createAppConfig = async (payload: any) => {
  try {
    const res = await post<any>('/mobile-app-config-history', payload)
    return res
  } catch (e: any) {
    toast.error(e.message)
    return []
  }
}
