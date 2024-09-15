import {get} from 'sr/utils/axios'

export const fetchDashboard = async (): Promise<any> => {
  try {
    const res = await get<any>(`/dashboard/summary`)

    if (res && res.status == 'success') {
      return res // Return the fetched data
    } else {
      // Handle the case where results are not present
      throw new Error('No data found')
    }
  } catch (error) {
    // Throw the error to be handled by the caller
    throw new Error(`Failed to fetch : ${error instanceof Error ? error.message : 'Unknown error'}`)
  }
}