import React, {useCallback, useEffect, useMemo, useState} from 'react'
import {useLocation} from 'react-router-dom'
import Pagination from 'sr/helpers/ui-components/dashboardComponents/Pagination'
import Filter from 'sr/helpers/ui-components/Filter'
import {FieldsArray} from 'sr/constants/fields'
import PaginationSkeleton from 'sr/helpers/ui-components/dashboardComponents/PaginationSkeleton'
import FilterHeader from 'sr/helpers/ui-components/filterHeader'
import SectionTable from './section.component/section.table'
import DashboardWrapper from 'app/pages/dashboard/DashboardWrapper'
import SkeletonSectionTable from './section.component/section.skeletonTable'
import {createSection, fetchSections} from './section.helper'
import {fetchAnswers, fetchQuestions, fetchStaticQuestions} from '../question/question.helper'
import {useQuery, useQueryClient} from '@tanstack/react-query'
import {Button} from 'sr/helpers'
import {AiOutlinePlus} from 'react-icons/ai'
import DynamicModal from 'sr/helpers/ui-components/DynamicPopUpModal'
import {useSelector} from 'react-redux'
import {RootState} from 'sr/redux/store'
import {useActions} from 'sr/utils/helpers/useActions'
import {DEFAULT_LANG_NAME} from 'sr/constants/common'
import BackButton from 'sr/helpers/ui-components/BackButton'
import {getSurveySectionMapping} from '../survey/survey.helper'
import {Breadcrumb} from 'sr/helpers/ui-components/Breadcrumb'
import {BreadcrumpItemsType} from 'sr/constants/breadcrumpInterface'

const Custom: React.FC = () => {
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  // Get the path and split by '/'
  const pathSegments = location.pathname.split('/')
  const lastSegment = pathSegments[pathSegments.length - 1] // Last element of the path

  const programId = queryParams.get('programId') || undefined
  const surveyId = queryParams.get('surveyId') || undefined
  // const receivedData = location.state.sections || []

  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [filters, setFilters] = useState({})
  const [isExpanded, setIsExpanded] = useState(false)
  const [totalQuestionsMap, setTotalQuestionsMap] = useState({})
  const [totalAttemptedQuestionsMap, setTotalAttemptedQuestionsMap] = useState({})
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const programReduxStore = useSelector((state: RootState) => state.program)
  // const breadcrumpReduxStore = useSelector((state: RootState) => state.breadcrump)
  const {fetchProgramAction, fetchSectionAction} = useActions()
  const queryClient = useQueryClient()
  // useEffect(() => {
  //   setFilters({programId})
  // }, [programId])
  // console.log('filters are : ', filters)

  const filterFields: FieldsArray = useMemo(
    () => [
      // {type: 'text', label: 'Program Id', name: 'programId', placeholder: 'Enter Program Id'},
      {type: 'text', label: 'Section Name', name: 'sectionName', placeholder: 'Enter Section Name'},
    ],
    []
  )

  const createUpdateFields: FieldsArray = useMemo(
    () => [
      {
        type: 'dropdown',
        label: 'programId',
        name: programReduxStore.totalPrograms,
        topLabel: 'Program',
        placeholder: 'Program',
        required: true,
        labelKey: 'name',
        id: '_id',
      },
      {
        type: 'text',
        label: 'Section Name',
        name: 'sectionName',
        placeholder: 'Section Name',
        required: true,
      },
      {
        type: 'text',
        label: 'Description',
        name: 'description',
        placeholder: 'Description',
        required: true,
      },
      {
        type: 'text',
        label: 'Display Order',
        name: 'displayOrder',
        placeholder: 'Display Order',
        required: true,
      },
      {
        type: 'text',
        label: 'Section Code',
        name: 'sectionCode',
        placeholder: 'Section Code',
        required: true,
      },

      {
        type: 'labelName',
        label: 'Section Label Name',
        name: 'labelName',
        placeholder: 'Label Name',
        required: false,
      },
    ],
    [programReduxStore.totalPrograms]
  )

  const handleToggleExpand = () => setIsExpanded(!isExpanded)

  useEffect(() => {
    fetchUserDataIfNeeded()
  }, [])

  const fetchUserDataIfNeeded = useCallback(() => {
    if (programReduxStore.status !== 'succeeded') {
      fetchProgramAction({})
    }
  }, [programReduxStore, fetchProgramAction])

  const {data: staticQuestionData} = useQuery({
    queryKey: ['staticQuestions', {getAll: true}],
    queryFn: async () => fetchStaticQuestions({getAll: true}),
    staleTime: Infinity,
  })
  const {data: answers} = useQuery({
    queryKey: ['answer', {surveyId, getAll: true}],
    queryFn: async () => fetchAnswers({surveyId, getAll: true}),
    staleTime: Infinity,
  })

  // Fetch static questions and build the totalQuestionsMap
  useEffect(() => {
    if (programId === '') return
    const buildTotalQuestionsMap = () => {
      const map =
        staticQuestionData?.results.results.reduce((acc: any, curr: any) => {
          acc[curr.sectionId] = (acc[curr.sectionId] || 0) + 1
          return acc
        }, {}) || {}
      setTotalQuestionsMap(map)
    }

    buildTotalQuestionsMap()
  }, [programId, staticQuestionData])

  // Fetch survey questions and build the totalAttemptedQuestionsMap

  useEffect(() => {
    if (surveyId === '') return

    const buildAttemptedQuestionsMap = () => {
      console.log('answers', answers)
      const map = answers?.results.results.reduce((acc: any, curr: any) => {
        const sectionId = curr.sectionId

        // Initialize section if it doesn't exist
        if (!acc[sectionId]) {
          acc[sectionId] = {
            count: 0,
            status: 'yetToStart', // default status is 'yetToStart'
          }
        }

        // Increment the count for the section
        acc[sectionId].count += 1

        // Check the status of the current answer and update the section status
        const answerStatus = curr.status

        if (['rejected', 'resubmitted', 'flagged'].includes(answerStatus)) {
          acc[sectionId].status = answerStatus
        } else if (
          acc[sectionId].status !== 'rejected' &&
          acc[sectionId].status !== 'resubmitted' &&
          acc[sectionId].status !== 'flagged'
        ) {
          // Set to 'inProgress' if no high-priority status is found
          acc[sectionId].status = 'inProgress'
        }

        return acc
      }, {})

      // For sections with no answers, status should remain 'yetToStart'
      setTotalAttemptedQuestionsMap(map)
    }

    buildAttemptedQuestionsMap()
  }, [surveyId, answers])

  // Memoized data to avoid re-computation on every render
  // const mappedReceivedData = useMemo(() => {
  //   return receivedData.reduce((acc: Record<string, string>, item: Record<string, string>) => {
  //     acc[item.sectionId] = item.status
  //     return acc
  //   }, {})
  // }, [receivedData])

  // Query to fetch sections with filters
  const {data, error, isLoading, refetch} = useQuery({
    queryKey: ['section', {limit: itemsPerPage, page: currentPage, ...filters}],
    queryFn: () =>
      fetchSections({
        limit: itemsPerPage,
        page: currentPage,
        ...filters,
      }),
  })

  const filteredData = useMemo(
    () => data?.results?.results?.filter((item: any) => item.programId === programId) || [],
    [data, programId]
  )

  //   Query to fetch survey section mapping data
  const {data: surveySectionMapping} = useQuery({
    queryKey: ['survey-section-mapping', {surveyId: surveyId}],
    queryFn: () => getSurveySectionMapping({surveyId: surveyId || ''}),
  })
  const handlePageChange = (page: number) => setCurrentPage(page)
  const handleLimitChange = (limit: number) => {
    setItemsPerPage(limit)
    setCurrentPage(1)
  }

  const handleApplyFilter = (newFilters: any) => {
    setFilters(newFilters)
    setCurrentPage(1)
  }
  const handleCreateSection = async (values: any) => {
    // Construct the labelName object by filtering out empty strings
    const labelName = Object.keys(DEFAULT_LANG_NAME).reduce((acc, langCode) => {
      if (values[langCode] && values[langCode].trim() !== '') {
        acc[langCode] = values[langCode]
      }
      return acc
    }, {} as Record<string, string>)

    const payload = {
      programId: values.programId,
      sectionName: values.sectionName,
      labelName,
      description: values.description,
      displayOrder: values.displayOrder,
      sectionCode: values.sectionCode,
      // isActive: values.isActive,
      isActive: true,
    }
    // // console.log('Create Section Payload:', payload)
    await createSection(payload)
    queryClient.invalidateQueries({queryKey: ['section']})
    fetchSectionAction({})
    setIsCreateModalOpen(false)
  }
  // console.log("breadcum items", breadcrumbItems)

  return (
    <div className='container mx-auto px-4 sm:px-8'>
      <div className='py-6'>
        {programId && (
          <Breadcrumb
            breadcrumbItems={
              surveyId
                ? [
                    {label: 'Field Assesment', link: '/survey'},
                    {
                      label: 'Section',
                      // link: `/section?programId=${programId}&surveyId=${surveyId}`,
                    },
                  ]
                : [
                    {
                      label: 'Program',
                      link: '/program',
                    },
                    {
                      label: 'Section',
                      // link: `/section?programId=${programId}`,
                    },
                  ]
            }
            wrapperClassName={'mb-8'}
          />
        )}
        <div className='flex flex-row justify-between mb-4 items-center'>
          {/* <div className='flex space-x-4 bg-red-500'> */}

          <h2 className='text-lg font-bold text-gray-700 '>SECTIONS</h2>
          {/* </div> */}

          {!surveyId && (
            <Button
              label='Create new'
              Icon={AiOutlinePlus}
              onClick={() => setIsCreateModalOpen(true)}
              className='bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-full shadow-md inline-flex items-center mb-2 sm:mb-0 sm:mr-3'
            ></Button>
          )}
        </div>
        <FilterHeader onToggle={handleToggleExpand} isExpanded={isExpanded} />

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
          <SkeletonSectionTable />
        ) : (
          data && (
            <SectionTable
              surveySectionMapping={surveySectionMapping?.results.results}
              sectionData={programId ? filteredData : data.results.results}
              surveyId={surveyId || ''}
              programId={programId || ''}
              totalQuestionsMap={totalQuestionsMap}
              totalAttemptedQuestionsMap={totalAttemptedQuestionsMap}
            />
          )
        )}

        {isLoading ? (
          <PaginationSkeleton />
        ) : (
          <Pagination
            currentPage={currentPage}
            totalPages={data?.results.totalPages || 1}
            totalResults={data?.results.totalResults || 0}
            onPageChange={handlePageChange}
            itemsPerPage={itemsPerPage}
            name='Section'
            onLimitChange={handleLimitChange}
          />
        )}
      </div>
      {isCreateModalOpen && (
        <DynamicModal
          // imageType='imagePath'
          label='Create Section'
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          fields={createUpdateFields}
          onSubmit={handleCreateSection}
          defaultValues={{programId: programId || ''}}
        />
      )}
    </div>
  )
}

const SectionPage: React.FC = () => {
  return <DashboardWrapper customComponent={Custom} selectedItem='/sections' />
}

export default SectionPage
