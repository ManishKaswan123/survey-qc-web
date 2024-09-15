// src/actions/sectionActions.ts
import {createAsyncThunk} from '@reduxjs/toolkit'
import {Section} from 'app/pages/module/section/section.interfaces'
import {fetchSections} from 'app/pages/module/section/section.helper'

// Define an interface for the section data structure
interface SectionMap {
  [key: string]: Section
}

// Fetch all sections and map them by ID
export const fetchSectionAction = createAsyncThunk(
  'section/fetchSectionAction',
  async (payload: any) => {
    // Fetch all sections with the "getAll: true" option
    const {results: sectionResults} = await fetchSections({getAll: true})

    // Initialize the totalSections array and sectionIdMap
    const totalSections = sectionResults.results
    const sectionIdMap: SectionMap = {}

    // Populate the sectionIdMap
    totalSections.forEach((section) => {
      sectionIdMap[section._id] = section
    })

    // Return the mapped result
    return {
      totalSections, // Array of all sections
      sectionIdMap, // Map of section ID to section
    }
  }
)
