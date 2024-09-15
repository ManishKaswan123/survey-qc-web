import {post} from 'sr/utils/axios/index'
import {toast} from 'react-toastify'

export const createAppVersion = async (payload: FormData) => {
  try {
    const res = await post<any>('/mobile-app-version-history', payload)
    return res
  } catch (e: any) {
    toast.error(e.message)
    return []
  }
}
