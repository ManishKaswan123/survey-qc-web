// src/reducers/userReducer.ts
import {createSlice} from '@reduxjs/toolkit'
import {fetchAppConfigData} from '../action/appConfigActions'

interface AppConfigState {
  data: any
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | null
}

const initialState: AppConfigState = {
  data: null,
  status: 'idle',
  error: null,
}

const appConfigSlice = createSlice({
  name: 'appConfig',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAppConfigData.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchAppConfigData.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.data = action.payload.data
      })
      .addCase(fetchAppConfigData.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message || 'Failed to fetch state data'
      })
  },
})

export default appConfigSlice.reducer
