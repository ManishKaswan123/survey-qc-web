// src/reducers/programReducer.ts
import {createSlice} from '@reduxjs/toolkit'
import {Program} from 'app/pages/module/program/programInterfaces'
import {fetchProgramAction} from '../action/programActions'

interface ProgramState {
  totalPrograms: Program[] // Array of all programs
  programIdMap: Record<string, Program> // Map of program ID to program
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | null
}

const initialState: ProgramState = {
  totalPrograms: [],
  programIdMap: {},
  status: 'idle',
  error: null,
}

const programSlice = createSlice({
  name: 'program',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProgramAction.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchProgramAction.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.totalPrograms = action.payload.totalPrograms
        state.programIdMap = action.payload.programIdMap
      })
      .addCase(fetchProgramAction.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message || 'Failed to fetch program data'
      })
  },
})

export default programSlice.reducer
