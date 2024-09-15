// src/actions/userActions.ts
import {createAsyncThunk} from '@reduxjs/toolkit'
import {fetchDistrict} from 'sr/utils/api/fetchDistrict'
export const fetchDistrictData = createAsyncThunk('state/fetchDistrictData', async () => {
  const response = await fetchDistrict({getAll: true, projectBy: 'districtName,districtCode'})
  return {
    data: response,
    totalDistricts: response.results.length,
  }
})
