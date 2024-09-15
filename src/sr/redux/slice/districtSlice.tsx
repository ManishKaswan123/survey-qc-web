// src/reducers/userReducer.ts
import {createSlice} from '@reduxjs/toolkit'
import {fetchDistrictData} from '../action/districtActions'

interface DistrictTypeState {
  data: any
  totalDistricts: number | null
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | null
}

const initialState: DistrictTypeState = {
  data: null,
  totalDistricts: null,
  status: 'idle',
  error: null,
}

const districtSlice = createSlice({
  name: 'district',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDistrictData.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchDistrictData.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.data = action.payload.data
        state.totalDistricts = action.payload.totalDistricts
      })
      .addCase(fetchDistrictData.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message || 'Failed to fetch district data'
      })
  },
})

export default districtSlice.reducer
