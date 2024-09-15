// src/reducers/sectionReducer.ts
import {createSlice} from '@reduxjs/toolkit'
import {Section} from 'app/pages/module/section/section.interfaces'
import {fetchSectionAction} from '../action/sectionActions'

interface SectionState {
  totalSections: Section[] // Array of all sections
  sectionIdMap: Record<string, Section> // Map of section ID to section
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | null
}

const initialState: SectionState = {
  totalSections: [],
  sectionIdMap: {},
  status: 'idle',
  error: null,
}

const sectionSlice = createSlice({
  name: 'section',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSectionAction.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchSectionAction.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.totalSections = action.payload.totalSections
        state.sectionIdMap = action.payload.sectionIdMap
      })
      .addCase(fetchSectionAction.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message || 'Failed to fetch section data'
      })
  },
})

export default sectionSlice.reducer
