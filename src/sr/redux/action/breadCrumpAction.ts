import {createAsyncThunk} from '@reduxjs/toolkit'
import {BreadcrumpItemsType} from 'sr/constants/breadcrumpInterface'

// Fetch all programs and map them by ID
export const setBreadcrumpItems = createAsyncThunk(
  'breadcrump/setBreadcrumpItems',
  (payload: BreadcrumpItemsType[]) => {
    return payload
  }
)
