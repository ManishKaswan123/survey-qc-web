// src/reducers/userReducer.ts
import {createSlice} from '@reduxjs/toolkit'
import {fetchStateData} from '../action/stateActions'

interface StateTypeState {
  data: any
  totalStates: number | null
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | null
}

const initialState: StateTypeState = {
  data: null,
  totalStates: null,
  status: 'idle',
  error: null,
}

const stateSlice = createSlice({
  name: 'state',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStateData.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchStateData.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.data = action.payload.data
        state.totalStates = action.payload.totalStates
      })
      .addCase(fetchStateData.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message || 'Failed to fetch state data'
      })
  },
})

export default stateSlice.reducer
