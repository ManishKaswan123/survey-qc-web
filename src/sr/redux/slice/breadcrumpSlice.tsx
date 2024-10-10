import {createSlice} from '@reduxjs/toolkit'
import {BreadcrumpItemsType} from 'sr/constants/breadcrumpInterface'
import {setBreadcrumpItems} from '../action/breadCrumpAction'

interface breadCrumpState {
  breadCrumps: BreadcrumpItemsType[]
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | null
}

const initialState: breadCrumpState = {
  breadCrumps: [] as BreadcrumpItemsType[],
  status: 'idle',
  error: null,
}

const breadcrumpSlice = createSlice({
  name: 'breadcrump',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(setBreadcrumpItems.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(setBreadcrumpItems.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.breadCrumps = action.payload
      })
      .addCase(setBreadcrumpItems.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message || 'Failed to fetch program data'
      })
  },
})

export default breadcrumpSlice.reducer
