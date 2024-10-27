import {get, post} from 'sr/utils/axios'
import {FilterProps, SurveyApiResponse, SurveySectionMappingApiResponse} from './survey.interfaces'
import {toast} from 'react-toastify'

const filterPayload = (payload: FilterProps) => {
  return Object.fromEntries(
    Object.entries(payload).filter(([_, value]) => value !== undefined && value !== null)
  )
}

export const fetchSurveys = async (payload?: FilterProps): Promise<SurveyApiResponse> => {
  const filteredPayload = filterPayload(payload ?? {})

  try {
    const res = await get<SurveyApiResponse>(`/survey`, filteredPayload)

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
export const getSurveySectionMapping = async ({
  surveyId,
}: {
  surveyId: string
}): Promise<SurveySectionMappingApiResponse> => {
  try {
    const res = await get<SurveySectionMappingApiResponse>(`/survey-section-mapping`, {
      surveyId,
      getAll: true,
    })

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
export const updateSurveyStatus = async (id: string) => {
  try {
    const res = await post<any>(`/survey/updateStatus`, {
      id,
      status: 'approved'
    })
    if (res) {
      toast.success('Survey Approved')
      return true
    }
  } catch (e: any) {
    toast.error(e.message)
    return false
  }
}
