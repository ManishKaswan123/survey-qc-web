import React, {useCallback, useEffect, useMemo, useState} from 'react'
import {useLocation} from 'react-router-dom'
import Pagination from 'sr/helpers/ui-components/dashboardComponents/Pagination'
import Filter from 'sr/helpers/ui-components/Filter'
import {FieldsArray} from 'sr/constants/fields'
import PaginationSkeleton from 'sr/helpers/ui-components/dashboardComponents/PaginationSkeleton'
import FilterHeader from 'sr/helpers/ui-components/filterHeader'
import SurveySkeleton from '../survey/components/survey.skeleton'
import SectionTable from './section.component/section.table'
import DashboardWrapper from 'app/pages/dashboard/DashboardWrapper'
import SkeletonSectionTable from './section.component/section.skeletonTable'
import {createSection, fetchSections} from './section.helper'
import {fetchQuestions, fetchStaticQuestions} from '../question/question.helper'
import {useQuery} from '@tanstack/react-query'
import {Button} from 'sr/helpers'
import {AiOutlinePlus} from 'react-icons/ai'
import DynamicModal from 'sr/helpers/ui-components/DynamicPopUpModal'
import {useSelector} from 'react-redux'
import {RootState} from 'sr/redux/store'
import {useActions} from 'sr/utils/helpers/useActions'
import {DEFAULT_LANG_NAME} from 'sr/constants/common'

const Custom: React.FC = () => {
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const programId = queryParams.get('programId') || ''
  const surveyId = queryParams.get('surveyId') || ''
  const receivedData = location.state || []

  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [filters, setFilters] = useState({})
  const [isExpanded, setIsExpanded] = useState(false)
  const [totalQuestionsMap, setTotalQuestionsMap] = useState({})
  const [totalAttemptedQuestionsMap, setTotalAttemptedQuestionsMap] = useState({})
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const programReduxStore = useSelector((state: RootState) => state.program)
  const {fetchProgramAction} = useActions()

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
        placeholder: 'Select Program',
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
      // {
      //   type: 'dropdown',
      //   label: 'isActive',
      //   name: [
      //     {id: true, name: 'Active'},
      //     {id: false, name: 'Inactive'},
      //   ],
      //   topLabel: 'Active',
      //   placeholder: 'Select Active',
      //   labelKey: 'name',
      //   id: 'id',
      //   required:false
      // },
      {
        type: 'labelName',
        label: 'Label Name',
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

  // Fetch static questions and build the totalQuestionsMap
  useEffect(() => {
    if (programId === '') return
    const buildTotalQuestionsMap = async () => {
      try {
        const {results} = await fetchStaticQuestions({programId, getAll: true})
        const map = results.results.reduce((acc: any, curr: any) => {
          acc[curr.sectionId] = (acc[curr.sectionId] || 0) + 1
          return acc
        }, {})
        setTotalQuestionsMap(map)
      } catch (error) {
        console.error('Error fetching static questions:', error)
      }
    }

    buildTotalQuestionsMap()
  }, [programId])

  // Fetch survey questions and build the totalAttemptedQuestionsMap
  useEffect(() => {
    if (surveyId === '') return
    const buildAttemptedQuestionsMap = async () => {
      try {
        const {results} = await fetchQuestions({surveyId, getAll: true})
        const map = results.results.reduce((acc: any, curr: any) => {
          acc[curr.sectionId] = (acc[curr.sectionId] || 0) + 1
          return acc
        }, {})
        setTotalAttemptedQuestionsMap(map)
      } catch (error) {
        console.error('Error fetching survey questions:', error)
      }
    }

    buildAttemptedQuestionsMap()
  }, [surveyId])

  // Memoized data to avoid re-computation on every render
  const mappedReceivedData = useMemo(() => {
    return receivedData.reduce((acc: Record<string, string>, item: Record<string, string>) => {
      acc[item.sectionId] = item.status
      return acc
    }, {})
  }, [receivedData])

  // Query to fetch sections with filters
  const {data, error, isLoading, refetch} = useQuery({
    queryKey: ['sections', {limit: itemsPerPage, page: currentPage, ...filters}],
    queryFn: () =>
      fetchSections({
        limit: itemsPerPage,
        page: currentPage,
        ...filters,
      }),
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
      isActive: values.isActive,
    }
    // console.log('Create Section Payload:', payload)
    await createSection(payload)
    refetch()
    setIsCreateModalOpen(false)
  }

  return (
    <div className='container mx-auto px-4 sm:px-8'>
      <div className='py-6'>
        <div className='flex flex-row justify-between mb-4'>
          <h2 className='text-lg font-bold text-gray-700 mb-4'>SECTIONS</h2>
          {programId === '' && surveyId === '' && (
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
              sectionData={data.results.results}
              receivedData={mappedReceivedData}
              surveyId={surveyId}
              programId={programId}
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
        />
      )}
    </div>
  )
}

const SectionPage: React.FC = () => {
  return <DashboardWrapper customComponent={Custom} selectedItem='/sections' />
}

export default SectionPage
