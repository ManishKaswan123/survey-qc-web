// src/reducers/userReducer.ts
import {createSlice} from '@reduxjs/toolkit'
import {fetchUserData} from '../action/userActions'
import {UserInterface} from 'sr/constants/User'

interface UserState {
  data: any
  statistics: any
  userRoleMap: Record<string, UserInterface[]>
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | null
}

const initialState: UserState = {
  userRoleMap: {
    SuperAdmin: [],
    QA: [],
    FA: [],
  },
  data: {},
  statistics: {},
  status: 'idle',
  error: null,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserData.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.userRoleMap = action.payload.userRoleMap
      })
      .addCase(fetchUserData.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message || 'Failed to fetch user data'
      })
  },
})

export default userSlice.reducer
