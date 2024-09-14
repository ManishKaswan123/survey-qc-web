import {get} from 'sr/utils/axios'
import {FilterProps, QuestionResponse} from './question.interface'

const filterPayload = (payload: FilterProps) => {
  return Object.fromEntries(
    Object.entries(payload).filter(([_, value]) => value !== undefined && value !== null)
  )
}

export const fetchQuestions = async (payload?: FilterProps): Promise<QuestionResponse> => {
  const filteredPayload = filterPayload(payload ?? {})

  try {
    const res = await get<QuestionResponse>(`/answer`, filteredPayload)

    // console.log('res of answer is this :-', res)
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
export const fetchStaticQuestions = async (payload?: FilterProps): Promise<any> => {
  const filteredPayload = filterPayload(payload ?? {})

  try {
    const res = await get<any>(`/question`, filteredPayload)

    // console.log('res of answer is this :-', res)
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
