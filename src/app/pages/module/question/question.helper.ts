import {get, patch, post, remove} from 'sr/utils/axios'
import {
  AnswerResponse,
  FilterAnswerProps,
  FilterProps,
  QuestionResponse,
  StaticQuestionsApiResponse,
} from './question.interface'

const filterPayload = (payload: FilterProps) => {
  return Object.fromEntries(
    Object.entries(payload).filter(([_, value]) => value !== undefined && value !== null)
  )
}

export const fetchQuestions = async (payload?: FilterProps): Promise<QuestionResponse> => {
  const filteredPayload = filterPayload(payload ?? {})

  try {
    const res = await get<QuestionResponse>(`/question`, filteredPayload)

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

export const fetchAnswers = async (payload?: FilterProps): Promise<AnswerResponse> => {
  const filteredPayload = filterPayload(payload ?? {})

  try {
    const res = await get<AnswerResponse>(`/answer`, filteredPayload)

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
export const fetchStaticQuestions = async (
  payload?: FilterProps
): Promise<StaticQuestionsApiResponse> => {
  const filteredPayload = filterPayload(payload ?? {})

  try {
    const res = await get<StaticQuestionsApiResponse>(`/question`, {...filteredPayload})

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
export const createQuestion = async (payload: Record<string, any>): Promise<boolean> => {
  try {
    const res = await post<any>(`/question`, payload)
    if (res) {
      return true
    }
    throw new Error('Create failed')
  } catch (e: any) {
    throw new Error(e.message)
  }
}
export const updateQuestion = async (
  payload: Record<string, any>,
  id: string
): Promise<boolean> => {
  try {
    const res = await patch<any>(`/question/${id}`, payload)
    if (res) {
      return true
    }
    throw new Error('Update failed')
  } catch (e: any) {
    throw new Error(e.message)
  }
}
export const deleteQuestion = async (payload: string): Promise<boolean> => {
  try {
    const res = await remove<any>(`/question/${payload}`)
    return true
  } catch (e: any) {
    throw new Error(e.message)
  }
}

export const UpdateAnswers = async (
  answerId: string,
  // payload?: FilterAnswerProps
  payload?: any
): Promise<any> => {
  const filteredPayload = filterPayload(payload ?? {})

  try {
    const res = await patch<any>(`/answer/${answerId}`, filteredPayload)

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
