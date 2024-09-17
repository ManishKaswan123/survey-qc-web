// src/actions/programActions.ts
import {createAsyncThunk} from '@reduxjs/toolkit'
import {fetchPrograms} from 'app/pages/module/program/api'
import {Program} from 'app/pages/module/program/programInterfaces'

// Define an interface for the program data structure
interface ProgramMap {
  [key: string]: Program
}

// Fetch all programs and map them by ID
export const fetchProgramAction = createAsyncThunk(
  'program/fetchProgramAction',
  async (payload: any) => {
    // Fetch all programs with the "getAll: true" option

    const {results: programResults} = await fetchPrograms({getAll: true})
    // console.log('programResults', programResults)

    const totalPrograms = programResults.results
    const programIdMap: ProgramMap = {}

    // Populate the programIdMap
    totalPrograms.forEach((program) => {
      programIdMap[program._id] = program
    })

    // Return the mapped result
    return {
      totalPrograms, // Array of all programs
      programIdMap, // Map of program ID to program
    }
  }
)
