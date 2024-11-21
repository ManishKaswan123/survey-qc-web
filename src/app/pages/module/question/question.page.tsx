import React, {useEffect, useMemo, useState} from 'react'
import Pagination from 'sr/helpers/ui-components/dashboardComponents/Pagination'
import Filter from 'sr/helpers/ui-components/Filter'
import {FieldsArray} from 'sr/constants/fields'
import PaginationSkeleton from 'sr/helpers/ui-components/dashboardComponents/PaginationSkeleton'
import {useLocation, useNavigate} from 'react-router-dom'
import FilterHeader from 'sr/helpers/ui-components/filterHeader'
import {useQuery} from '@tanstack/react-query'
import DashboardWrapper from 'app/pages/dashboard/DashboardWrapper'
import {AnswerInterface, FilterProps, QuestionAnswer, QuestionInterface} from './question.interface'
import {fetchAnswers, fetchQuestions} from './question.helper'
import QuestionSkeleton from './question.component/question.skeleton'
import QuestionCard from './question.component/question.card'
import {statusObject} from 'sr/constants/status'
import {Breadcrumb} from 'sr/helpers/ui-components/Breadcrumb'

const Custom: React.FC = () => {
  const status = useMemo(
    () => [
      {name: 'Submitted', id: 'submitted'},
      {name: 'Approved', id: 'approved'},
      {name: 'Flagged', id: 'flagged'},
      {name: 'Re Submitted', id: 'resubmitted'},
      {name: 'Not Started', id: 'yetToStart'},
      {name: 'Rejected', id: 'rejected'},
      {name: 'In Progress', id: 'inProgress'},
    ],
    []
  )
  const filterFields: FieldsArray = useMemo(
    () => [
      {
        type: 'dropdown',
        label: 'status',
        name: statusObject,
        topLabel: 'Status',
        placeholder: 'Select Status',
        labelKey: 'value',
      },
    ],
    []
  )

  const [currentPage, setCurrentPage] = useState<number>(1)
  const [totalPages, setTotalPages] = useState<number>(1)
  const [totalResults, setTotalResults] = useState<number>(0)
  const [itemsPerPage, setItemsPerPage] = useState<number>(10)
  const [filters, setFilters] = useState<FilterProps>()
  const navigate = useNavigate()
  const [isExpanded, setIsExpanded] = useState(false)
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState<boolean>(false)
  const [mappedData, setMappedData] = useState<QuestionAnswer[]>([])
  const [check, setCheck] = useState<boolean>(false)
  const [answerData, setAnswerData] = useState<AnswerInterface[]>([])
  const [questionData, setQuestionData] = useState<QuestionInterface[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)

  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const programId = queryParams.get('programId') || ''
  const surveyId = queryParams.get('surveyId') || ''
  const sectionId = queryParams.get('sectionId') || ''
  const [reRender, setReRender] = useState<boolean>(false)

  const toggleExpand = () => {
    setIsExpanded(!isExpanded)
  }

  useEffect(() => {
    const handleQuestion = async () => {
      setIsLoading(true)
      const questions = await fetchQuestions({
        getAll: true,
        programId: programId,
        sectionId: sectionId,
      })
      if (questions?.status === 'success') {
        setIsLoading(false)
        setQuestionData(questions?.results?.results)
      }
    }
    handleQuestion()
  }, [])

  useEffect(() => {
    const handleAnswer = async () => {
      setIsLoading(true)
      const answers = await fetchAnswers({
        getAll: true,
        ...filters,
        programId: programId,
        sectionId: sectionId,
        surveyId: surveyId,
      })
      if (answers?.status === 'success') {
        setIsLoading(false)
        setAnswerData(answers?.results?.results)
      }
    }
    handleAnswer()
  }, [filters, reRender])

  useEffect(() => {
    if (questionData && answerData) {
      let mappedData = mapQuestionsAndAnswers()
      if (filters && filters?.status && filters?.status !== 'yetToStart') {
        mappedData = mappedData.filter((data) => data?.status === filters?.status)
      }
      setMappedData(mappedData)
    }
  }, [filters, answerData, questionData])

  const mapQuestionsAndAnswers = (): QuestionAnswer[] => {
    return (
      questionData?.map((question: QuestionInterface) => {
        const answer = answerData?.find((ans: AnswerInterface) => ans.questionId === question.id)

        return {
          programId: question?.programId,
          sectionId: question?.sectionId,
          questionCode: question?.questionCode,
          fieldName: question?.fieldName,
          questionType: question?.questionType,
          options: question?.options,
          status: answer?.status ?? 'yetToStart', // Default to 'yetToStart' if status is undefined
          questionId: question?.id,
          answerId: answer?.id,
          remarks: answer?.remarks,
          qaRemarks: answer?.qaRemarks,
          textResponse: answer?.textResponse,
          dateResponse: answer?.dateResponse,
          toDateResponse: answer?.toDateResponse,
          pinLocationResponse: answer?.pinLocationResponse,
          polygonResponse: answer?.polygonResponse,
          multipleChoiceResponse: answer?.multipleChoiceResponse,
          numberResponse: answer?.numberResponse,
          faId: answer?.faId,
          surveyId: answer?.surveyId,
        }
      }) || []
    )
  }

  const onPageChange = (page: number) => {
    setCurrentPage(page)
  }

  const onLimitChange = (newLimit: number) => {
    setItemsPerPage(newLimit)
    setCurrentPage(1)
  }

  const handleApplyFilter = (newFilters: FilterProps) => {
    setCheck(false)
    setFilters(newFilters)
  }

  return (
    <div className='container mx-auto px-4 sm:px-8'>
      <div className='py-6'>
        <Breadcrumb
          breadcrumbItems={[
            {
              label: 'Field Assesment',
              link: '/survey',
            },
            {
              label: 'Section',
              link: `/section?programId=${programId}&&surveyId=${surveyId}`,
            },
            {
              label: 'Questions',
              // link: `/all-questions?programId=${programId}&sectionId=${sectionId}`,
            },
          ]}
          wrapperClassName={'mb-8'}
        />
        <div className='flex items-center mb-4'>
          <h2 className='text-lg font-bold text-gray-700'>QUESTION</h2>
        </div>

        <FilterHeader onToggle={toggleExpand} isExpanded={isExpanded} />

        {isExpanded && (
          <div className='relative'>
            <Filter
              onApplyFilter={handleApplyFilter}
              preFilters={filters || {}}
              fields={filterFields}
            />
          </div>
        )}
        {isLoading ? (
          <QuestionSkeleton />
        ) : (
          <div className='mt-5'>
            {mappedData?.map((data: QuestionAnswer) => (
              <QuestionCard
                setReRender={setReRender}
                key={data?.questionId}
                data={data}
                setIsUpdateModalOpen={setIsUpdateModalOpen}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

const QuestionPage: React.FC = () => {
  return (
    <>
      <DashboardWrapper customComponent={Custom} selectedItem={'/question'}></DashboardWrapper>
    </>
  )
}
export default QuestionPage
