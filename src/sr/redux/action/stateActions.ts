// src/actions/userActions.ts
import {createAsyncThunk} from '@reduxjs/toolkit'
import {fetchState} from 'sr/utils/api/fetchState'
export const fetchStateData = createAsyncThunk('state/fetchStateData', async () => {
  const response = await fetchState({getAll: true, projectBy: 'stateName,stateCode'})
  return {
    data: response,
    totalStates: response.results.length,
  }
})
