// src/actions/userActions.ts
import {createAsyncThunk} from '@reduxjs/toolkit'
import { fetchConfigData } from 'sr/utils/api/config/fetchConfigData'
export const fetchAppConfigData = createAsyncThunk('appConfig/fetchAppConfigData', async () => {
  const response = await fetchConfigData()
  // console.log('response from fetch action : ', response)
  return {
    data: response,
  }
})
