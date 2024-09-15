import React, {useEffect, useMemo, useState} from 'react'
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
import {fetchSections} from './section.helper'
import {Section} from './section.interfaces'
import {fetchQuestions, fetchStaticQuestions} from '../question/question.helper'
import {useQuery} from '@tanstack/react-query'
import {Button} from 'sr/helpers'
import {AiOutlinePlus} from 'react-icons/ai'
import DynamicModal from 'sr/helpers/ui-components/DynamicPopUpModal'

const Custom: React.FC = () => {
  const filterFields: FieldsArray = useMemo(
    () => [{type: 'text', label: 'Program Id', name: 'programId', placeholder: 'Enter Program Id'}],
    []
  )

  const programData = [
    {id: 1, title: 'Program 1'},
    {id: 2, title: 'Program 2'},
    {id: 3, title: 'Program 3'},
  ]

  const labelData = [
    {id: 'en', title: 'English'},
    {id: 'hi', title: 'Hindi'},
    {id: 'pun', title: 'Punjabi'},
  ]

  const createUpdateFields: FieldsArray = useMemo(
    () => [
      {
        type: 'text',
        label: 'Section Code',
        name: 'sectionCode',
        placeholder: 'Section Code',
        required: true,
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
      },
      {
        type: 'dropdown',
        label: 'labelName',
        name: labelData,
        topLabel: 'Label Name',
        placeholder: 'Select Label Name',
        required: true,
        labelKey: 'title',
        id: 'id',
      },

      {
        type: 'dropdown',
        label: 'programId',
        name: programData,
        topLabel: 'Program',
        placeholder: 'Select Program',
        required: true,
        labelKey: 'title',
        id: 'id',
      },
      {
        type: 'text',
        label: 'Display Order',
        name: 'displayOrder',
        placeholder: 'Display Order',
        required: true,
      },
    ],
    []
  )

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

  const handleToggleExpand = () => setIsExpanded(!isExpanded)

  // Fetch static questions and build the totalQuestionsMap
  useEffect(() => {
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
  const {data, error, isLoading} = useQuery({
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
    console.log('Create Section:', values)
    setIsCreateModalOpen(false)
  }

  return (
    <div className='container mx-auto px-4 sm:px-8'>
      <div className='py-6'>
        <div className='flex flex-row justify-between mb-4'>
          <h2 className='text-lg font-bold text-gray-700 mb-4'>SECTIONS</h2>
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
