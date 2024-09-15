import React from 'react'
import {toast} from 'react-toastify'
import {get} from 'sr/utils/axios'

export const fetchConfigData = async () => {
  try {
    const res = await get<any>('/mobile-app-config-history/get-current-version')
    if (res?.status === 'success') {
      return res.results
    }
  } catch (e: any) {
    toast.error(e?.message)
  }
}
