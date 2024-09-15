import {remove} from 'sr/utils/axios/index'
import {toast} from 'react-toastify'

export const deleteContactUs = async (payload: any) => {
  try {
    const res = await remove<any>(`/contact-us/${payload}`)
    return res
  } catch (e: any) {
    toast.error(e.message)
    return []
  }
}
