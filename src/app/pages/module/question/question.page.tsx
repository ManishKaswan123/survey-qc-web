import React, {useEffect, useMemo, useState} from 'react'
import Pagination from 'sr/helpers/ui-components/dashboardComponents/Pagination'
import Filter from 'sr/helpers/ui-components/Filter'
import {FieldsArray} from 'sr/constants/fields'
import PaginationSkeleton from 'sr/helpers/ui-components/dashboardComponents/PaginationSkeleton'
import {useLocation, useNavigate} from 'react-router-dom'
import FilterHeader from 'sr/helpers/ui-components/filterHeader'
import {useQuery} from '@tanstack/react-query'
import DashboardWrapper from 'app/pages/dashboard/DashboardWrapper'
import {AnswerInterface, FilterProps} from './question.interface'
import {fetchQuestions} from './question.helper'
import QuestionSkeleton from './question.component/question.skeleton'
import QuestionCard from './question.component/question.card'

const Custom: React.FC = () => {
  const filterFields: FieldsArray = useMemo(
    () => [
      {type: 'text', label: 'Status', name: 'status', placeholder: 'Enter Status'},
      {type: 'text', label: 'Program Id', name: 'programId', placeholder: 'Enter Program Id'},
      {type: 'text', label: 'Section Id', name: 'sectionId', placeholder: 'Enter Section Id'},
      {type: 'text', label: 'Survey Id', name: 'surveyId', placeholder: 'Enter Survey Id'},
      {type: 'text', label: 'Created By', name: 'createdBy', placeholder: 'Enter Created By'},
      {type: 'text', label: 'FA Id', name: 'faId', placeholder: 'Enter FA Id'},
    ],
    []
  )

  const [currentPage, setCurrentPage] = useState<number>(1)
  const [totalPages, setTotalPages] = useState<number>(1)
  const [totalResults, setTotalResults] = useState<number>(0)
  const [itemsPerPage, setItemsPerPage] = useState<number>(10)
  const [filters, setFilters] = useState<FilterProps>()
  const navigate = useNavigate()
  const location = useLocation()
  const {programId} = location.state || {}
  const [isExpanded, setIsExpanded] = useState(false)
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState<boolean>(false)

  const toggleExpand = () => {
    setIsExpanded(!isExpanded)
  }

  let dummyData = {
    status: 'success',
    results: {
      results: [
        {
          textResponse: '',
          multipleChoiceResponse: ['Option 1', 'Option 2'],
          remarks: 'Sample remark 1',
          qaRemarks: 'Sample QA remark 1',
          status: 'Completed',
          programId: '84213840-6caa-4b9a-a750-41542393c829',
          sectionId: '366b8fcb-8d00-4e72-b18a-dae6b0633be7',
          questionId: {
            id: '582f1177-1ce1-4524-ac53-f71909a574b3',
            name: 'What is your name?',
            questionCode: 'Q1',
          },
          createdBy: {
            id: '5166b557-1f7c-4fde-9d56-17ce508786bd',
            name: 'Creator Name 1',
          },
          faId: {
            id: '0e9c09e6-0535-47e1-8cd7-9c2a66cc6425',
            name: 'FA Name 1',
          },
          surveyId: {
            id: 'aa8f6b0f-b7fc-4b57-81e1-9d98d4a4ebbb',
            name: 'Survey Name 1',
          },
          isActive: true,
          id: '185d3fef-3900-4963-a944-724a61e473ec',
        },
        {
          textResponse: '25',
          multipleChoiceResponse: [],
          remarks: 'Sample remark 2',
          qaRemarks: 'Sample QA remark 2',
          status: 'Completed',
          programId: '7a7934d7-b2f1-497d-9699-0766c5e22335',
          sectionId: 'f00a6b61-b99f-4b82-b79f-2987d2a0b3fb',
          questionId: {
            id: 'fa134927-eceb-409a-9661-69c7583a8b64',
            name: 'What is your age?',
            questionCode: 'Q2',
          },
          createdBy: {
            id: 'c6083a0d-f1f5-4981-bcde-e3e2e8fac759',
            name: 'Creator Name 2',
          },
          faId: {
            id: '9366e69c-8dde-4649-acdf-de960d6636ad',
            name: 'FA Name 2',
          },
          surveyId: {
            id: '0bd21388-51c4-4b2e-bfec-6f497b2414e4',
            name: 'Survey Name 2',
          },
          isActive: true,
          id: 'da6935a8-e432-44ef-b248-d9d8b8d9f2ab',
        },
        {
          textResponse: '  ',
          multipleChoiceResponse: ['Option 2', 'Option 1', 'Option 3'],
          remarks: 'Sample remark 3',
          qaRemarks: 'Sample QA remark 3',
          status: 'Completed',
          programId: '7b604be6-6a81-4850-84aa-cc9c29ba62c1',
          sectionId: 'a3d3f412-b35e-4ea6-82db-85bac195f691',
          questionId: {
            id: '95ea564d-ce21-4352-97cb-d7061187934e',
            name: 'What is your favorite color?',
            questionCode: 'Q3',
          },
          createdBy: {
            id: '317d45c8-4a20-4a9b-9d89-4ab22a63c122',
            name: 'Creator Name 3',
          },
          faId: {
            id: '7533e806-12ea-4c25-86eb-c79bc12c9e0a',
            name: 'FA Name 3',
          },
          surveyId: {
            id: 'e1996b35-97cd-408b-93f3-dbb02e9834ff',
            name: 'Survey Name 3',
          },
          isActive: true,
          id: '631bb7a8-c9c1-4e0a-9d13-f5ef6113d273',
        },
        {
          textResponse: 'Reading',
          multipleChoiceResponse: [],
          remarks: 'Sample remark 4',
          qaRemarks: 'Sample QA remark 4',
          status: 'Completed',
          programId: 'f2133cd5-65c2-44fd-aedc-1a376b97182b',
          sectionId: 'efba0f84-6f5f-43d3-9406-b031b16032f9',
          questionId: {
            id: '7781b7a6-ce37-47c3-9198-9e5d14bbb242',
            name: 'What is your hobby?',
            questionCode: 'Q4',
          },
          createdBy: {
            id: '2b6abc29-249e-4e76-afd0-3123cc15d6f3',
            name: 'Creator Name 4',
          },
          faId: {
            id: '56ee1c62-6c4c-4c37-84d3-f62763259750',
            name: 'FA Name 4',
          },
          surveyId: {
            id: 'ab58822c-8361-4d14-b0be-5360612b5703',
            name: 'Survey Name 4',
          },
          isActive: false,
          id: '9945849c-dc3a-47d0-8d06-3c65f33a1922',
        },
        {
          textResponse: 'New York',
          multipleChoiceResponse: [],
          remarks: 'Sample remark 5',
          qaRemarks: 'Sample QA remark 5',
          status: 'Completed',
          programId: '5259d043-2713-4e75-a38f-e5387439db13',
          sectionId: '77946ca1-73a1-4af1-a38f-af2bef758e74',
          questionId: {
            id: '1aed3a28-d849-4073-8845-e8731b4170ab',
            name: 'What city do you live in?',
            questionCode: 'Q5',
          },
          createdBy: {
            id: '41556205-2fcd-4283-b340-4c2d2a9ad75c',
            name: 'Creator Name 5',
          },
          faId: {
            id: '1b703bb7-c479-4c25-99ea-24c8a054c61a',
            name: 'FA Name 5',
          },
          surveyId: {
            id: 'c473e6fc-2168-4519-b1f3-d85b143cb365',
            name: 'Survey Name 5',
          },
          isActive: true,
          id: '4f5c8f2a-f11a-43f8-94bd-0fda92b44f28',
        },
      ],
      page: 1,
      limit: 5,
      totalPages: 1,
      totalResults: 5,
    },
  }

  const {data, error, isLoading, isError, refetch} = useQuery({
    queryKey: ['surveys', {limit: itemsPerPage, page: currentPage, ...filters}],
    queryFn: async () =>
      fetchQuestions({
        limit: itemsPerPage,
        page: currentPage,
        ...filters,
        populate: `createdBy,updatedBy,questionId`,
      }),
    // placeholderData: keepPreviousData,
  })

  const onPageChange = (page: number) => {
    setCurrentPage(page)
  }

  const onLimitChange = (newLimit: number) => {
    setItemsPerPage(newLimit)
    setCurrentPage(1)
  }

  const handleApplyFilter = (newFilters: FilterProps) => {
    setFilters(newFilters)
    setCurrentPage(1)
  }

  return (
    <div className='container mx-auto px-4 sm:px-8'>
      <div className='py-6'>
        <h2 className='text-lg font-bold text-gray-700 mb-4'>QUESTION</h2>
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
            {dummyData?.results?.results?.map((question: AnswerInterface) => (
              <QuestionCard
                key={question?.id}
                question={question}
                setIsUpdateModalOpen={setIsUpdateModalOpen}
              />
            ))}
          </div>
        )}
        {isLoading ? (
          <PaginationSkeleton />
        ) : (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalResults={totalResults}
            onPageChange={onPageChange}
            itemsPerPage={itemsPerPage}
            name='Survey'
            onLimitChange={onLimitChange}
            disabled={isLoading}
          />
        )}
      </div>
    </div>
  )
}

const QuestionPage: React.FC = () => {
  return (
    <>
      <DashboardWrapper customComponent={Custom} selectedItem={'/survey'}></DashboardWrapper>
    </>
  )
}
export default QuestionPage
