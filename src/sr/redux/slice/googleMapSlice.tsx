import {createSlice} from '@reduxjs/toolkit'

const initialState = {
  data: {},
  status: 'idle',
}

const googleMapSlice = createSlice({
  name: 'googleMap',
  initialState,
  reducers: {
    setGoogleMapData: (googleMap, data) => {
      googleMap.status = 'success'
      googleMap.data = data.payload
    },
  },
})

export const {setGoogleMapData} = googleMapSlice.actions

export default googleMapSlice.reducer
