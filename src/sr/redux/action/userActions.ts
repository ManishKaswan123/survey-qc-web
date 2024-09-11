// src/actions/userActions.ts
import {createAsyncThunk} from '@reduxjs/toolkit'
import {fetchUser} from 'sr/utils/api/fetchUser'
export const fetchUserData = createAsyncThunk('user/fetchUserData', async (payload: any) => {
  const {totalResults} = await fetchUser({})
  const response = await fetchUser({limit: totalResults})
  const statistics: any = {
    data: [
      {type: 'Seller', amount: 0, percentage: '', barColor: 'bg-blue-500'},
      {type: 'Retail User', amount: 0, percentage: '', barColor: 'bg-green-500'},
      {type: 'Business User', amount: 0, percentage: '', barColor: 'bg-pink-500'},
    ],
    totalUsers: totalResults,
  }
  // Update statistics based on user data
  response.results.forEach((user: any) => {
    if (user.role === 'retailUser') {
      statistics.data[1].amount++
    } else if (user.role === 'businessUser') {
      statistics.data[2].amount++
    }

    if (user.sellerStatus == 'approved') {
      statistics.data[0].amount++
    }
  })

  // Calculate percentages and assign bar colors
  statistics.data.forEach((stat: any) => {
    stat.percentage =
      totalResults > 0 ? ((stat.amount / totalResults) * 100).toFixed(1) + '%' : '0%'
  })
  return {
    data: response,
    statistics: statistics,
  }
})
