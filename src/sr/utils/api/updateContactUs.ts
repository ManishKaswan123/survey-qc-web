import {patch, post} from 'sr/utils/axios/index'
import {toast} from 'react-toastify'

export const updateContactUs = async (payload: any, id: string) => {
  try {
    const res = await patch<any>(`/contact-us/${id}`, payload)
    return res
  } catch (e: any) {
    toast.error(e.message)
    return []
  }
}
