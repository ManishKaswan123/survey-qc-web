import React, {useState, useEffect, useMemo, useCallback} from 'react'
import Pagination from 'sr/helpers/ui-components/dashboardComponents/Pagination'
import {AiOutlineFilter, AiOutlinePlus} from 'react-icons/ai'
import {Button} from 'sr/helpers'
import Filter from 'sr/helpers/ui-components/Filter'
import {useSelector} from 'react-redux'
// import {useActions} from 'sr/utils/helpers/useActions'
import {RootState} from 'sr/redux/store'
import {useQuery} from '@tanstack/react-query'
import DashboardWrapper from 'app/pages/dashboard/DashboardWrapper'

import {FieldsArray} from 'sr/constants/fields'
import {UserInterface} from 'sr/constants/User'
import PaginationSkeleton from 'sr/helpers/ui-components/dashboardComponents/PaginationSkeleton'
import {FilterProps, Question, QuestionCreatePayload} from './question.interface'
import {
  createQuestion,
  deleteQuestion,
  fetchStaticQuestions,
  updateQuestion,
} from './question.helper'

import QuestionSkeleton from './question.component/question.skeleton'
// import QuestionCard from './question.component/question.card'
import QuestionMasterCard from './question.component/question.master.card'
import DynamicModal from 'sr/helpers/ui-components/DynamicPopUpModal'
import CreateQuestionPopup from './question.component/question.create'
import FilterHeader from 'sr/helpers/ui-components/filterHeader'
import {useLocation} from 'react-router-dom'
import BackButton from 'sr/helpers/ui-components/BackButton'
import {Breadcrumb} from 'sr/helpers/ui-components/Breadcrumb'

const Custom: React.FC = () => {
  const [selectedData, setSelectedData] = useState<Question>()
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [filters, setFilters] = useState<FilterProps>({})
  const [isFilterVisible, setIsFilterVisible] = useState<boolean>(false)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false)
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState<boolean>(false)
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [itemsPerPage, setItemsPerPage] = useState(8)
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)

  const userRoleMap = useSelector((state: RootState) => state.user.userRoleMap)

  const [isExpanded, setIsExpanded] = useState(false)
  const handleToggleExpand = () => setIsExpanded(!isExpanded)
  const programId = useMemo(() => queryParams.get('programId') || undefined, [queryParams])
  const sectionId = useMemo(() => queryParams.get('sectionId') || undefined, [queryParams])
  useEffect(() => {
    setFilters({programId, sectionId})
  }, [programId, sectionId])

  const createFields: FieldsArray = useMemo(
    () => [
      {
        type: 'text',
        label: 'Question Code',
        name: 'questionCode',
        placeholder: 'Enter question code',
        required: true,
      },
      {
        type: 'text',
        label: 'Field Name',
        name: 'fieldName',
        placeholder: 'Enter field name',
        required: true,
      },
      {
        type: 'text',
        label: 'Question Type',
        name: 'questionType',
        placeholder: 'Enter question type',
        required: true,
      },
      {
        type: 'dropdown',
        label: 'isManadatory',
        name: [
          {name: 'True', id: 'true'},
          {name: 'False', id: 'false'},
        ],
        topLabel: 'Mandatory',
        placeholder: 'Select Mandatory',
      },
      {
        type: 'text',
        label: 'Field Regex',
        name: 'fieldRegex',
        placeholder: 'Enter field regex',
      },
      {
        type: 'dropdown',
        label: 'receiverId',
        name: userRoleMap['QA'],
        topLabel: 'Receiver',
        placeholder: 'Select Receiver',
        required: true,
      },
      {
        type: 'text',
        label: 'Question',
        name: 'questionText',
        placeholder: 'Enter your question',
        required: true,
      },
      {
        type: 'text',
        label: 'Correct Answer',
        name: 'correctAnswer',
        placeholder: 'Enter correct answer',
        required: true,
      },
      {
        type: 'text',
        label: 'Options',
        name: 'options',
        placeholder: 'Enter options (comma separated)',
        required: true,
      },
    ],
    [userRoleMap]
  )

  const updateFields: FieldsArray = useMemo(
    () => [
      {
        type: 'dropdown',
        label: 'receiverId',
        name: userRoleMap['QA'],
        topLabel: 'Receiver',
        placeholder: 'Select Receiver',
        required: true,
      },
      {
        type: 'text',
        label: 'Question',
        name: 'questionText',
        placeholder: 'Enter your question',
        required: true,
      },
      {
        type: 'text',
        label: 'Correct Answer',
        name: 'correctAnswer',
        placeholder: 'Enter correct answer',
        required: true,
      },
      {
        type: 'text',
        label: 'Options',
        name: 'options',
        placeholder: 'Enter options (comma separated)',
        required: true,
      },
    ],
    [userRoleMap]
  )

  const {data, isLoading, refetch} = useQuery({
    queryKey: ['staticQuestions', {limit: itemsPerPage, page: currentPage, ...filters}],
    queryFn: async () => fetchStaticQuestions({limit: itemsPerPage, page: currentPage, ...filters}),
  })

  const onPageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber)
  }

  const onLimitChange = (newLimit: number) => {
    setItemsPerPage(newLimit)
    setCurrentPage(1)
  }

  const handleApplyFilter = (newFilters: any) => {
    setFilters(newFilters)
    setCurrentPage(1)
    setIsFilterVisible(false)
  }

  const handleCreateQuestion = async (payload: QuestionCreatePayload) => {
    setIsCreateModalOpen(false)
    const res = await createQuestion(payload)
    if (!res) {
      setIsCreateModalOpen(false)
      return
    }
    refetch()
  }

  const handleEditQuestion = async (payload: QuestionCreatePayload) => {
    if (!selectedData) {
      setIsUpdateModalOpen(false)
      return
    }
    setIsUpdateModalOpen(false)
    const res = await updateQuestion(payload, selectedData.id)
    if (!res) {
      setIsUpdateModalOpen(false)
      return
    }
    refetch()
  }

  const onDeleteQuestion = async (id: string) => {
    const res = await deleteQuestion(id)
    if (!res) {
      return
    }
    refetch()
  }

  return (
    <>
      <div className='container mx-auto px-4 sm:px-8'>
        <div className='py-6'>
          {programId && sectionId && (
            <Breadcrumb
              breadcrumbItems={[
                {
                  label: 'Program',
                  link: '/program',
                },
                {
                  label: 'Section',
                  link: `/section?programId=${programId}`,
                },
                {
                  label: 'Questions',
                  // link: `/all-questions?programId=${programId}&sectionId=${sectionId}`,
                },
              ]}
              wrapperClassName={'mb-8'}
            />
          )}
          <div className='flex flex-row justify-between mb-4 items-center'>
            {/* <div className='flex space-x-4'> */}

            <h2 className='text-lg font-bold text-gray-700'>QUESTIONS</h2>
            {/* </div> */}

            <Button
              label='Create new'
              Icon={AiOutlinePlus}
              onClick={() => setIsCreateModalOpen(true)}
              className='bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-full shadow-md inline-flex items-center mb-2 sm:mb-0 sm:mr-3'
            ></Button>
          </div>
          <FilterHeader onToggle={handleToggleExpand} isExpanded={isExpanded} />

          {isExpanded && (
            <div className='relative'>
              <Filter
                onApplyFilter={handleApplyFilter}
                setIsFilterVisible={setIsFilterVisible}
                preFilters={filters || {}}
                fields={createFields}
              />
            </div>
          )}
          {/* <div className='flex justify-between items-center flex-wrap mb-4'>
            <h2 className='text-2xl font-semibold leading-tight mb-2 sm:mb-0 sm:mr-4'>Questions</h2>
            <div className='flex items-center'>
              <Button
                label='Create new'
                Icon={AiOutlinePlus}
                onClick={() => setIsCreateModalOpen(true)}
                className='bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-full shadow-md inline-flex items-center mb-2 sm:mb-0 sm:mr-3'
              />
              <Button
                label='Filter'
                Icon={AiOutlineFilter}
                onClick={() => setIsFilterVisible(!isFilterVisible)}
                className='bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-full shadow-md inline-flex items-center'
              />
            </div>
          </div> */}
          {/* {isFilterVisible && (
            <div className='relative'>
              <Filter
                onApplyFilter={handleApplyFilter}
                setIsFilterVisible={setIsFilterVisible}
                preFilters={filters || {}}
                fields={createFields}
              />
            </div>
          )} */}
          {isLoading ? (
            <QuestionSkeleton />
          ) : (
            data &&
            data.results?.results.map((question: Question) => (
              <QuestionMasterCard
                key={question.id}
                question={question}
                expandedId={expandedId}
                setExpandedId={setExpandedId}
                setSelectedData={setSelectedData}
                setIsUpdateModalOpen={setIsUpdateModalOpen}
                onDelete={onDeleteQuestion}
              />
            ))
          )}
        </div>
        {isLoading ? (
          <PaginationSkeleton />
        ) : (
          <Pagination
            currentPage={currentPage}
            totalPages={data?.results.totalPages || 0}
            totalResults={data?.results.totalResults}
            onPageChange={onPageChange}
            itemsPerPage={itemsPerPage}
            name='Questions'
            onLimitChange={onLimitChange}
            disabled={isLoading}
          />
        )}
      </div>
      {}
      {/* {isCreateModalOpen && (
        <DynamicModal
          label='Create Question'
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          fields={createFields}
          onSubmit={handleCreateQuestion}
        />
      )} */}
      {isCreateModalOpen && (
        <CreateQuestionPopup
          isOpen={isCreateModalOpen}
          setIsOpen={setIsCreateModalOpen}
          defaultValues={{programId: programId, sectionId: sectionId}}
        />
      )}
      {isUpdateModalOpen && (
        <DynamicModal
          label='Update Question'
          isOpen={isUpdateModalOpen}
          onClose={() => setIsUpdateModalOpen(false)}
          fields={updateFields}
          defaultValues={selectedData}
          onSubmit={handleEditQuestion}
        />
      )}
    </>
  )
}
const CustomQuestions: React.FC = () => {
  return (
    <>
      <DashboardWrapper customComponent={Custom} selectedItem={'/all-questions'}></DashboardWrapper>
    </>
  )
}

export default CustomQuestions
