import React, {useEffect, useMemo, useState} from 'react'
import Pagination from 'sr/helpers/ui-components/dashboardComponents/Pagination'
import Filter from 'sr/helpers/ui-components/Filter'
import {FieldsArray} from 'sr/constants/fields'
import PaginationSkeleton from 'sr/helpers/ui-components/dashboardComponents/PaginationSkeleton'
import {useLocation, useNavigate, useParams} from 'react-router-dom'
import FilterHeader from 'sr/helpers/ui-components/filterHeader'
import {useQuery} from '@tanstack/react-query'
import {FilterProps, Section} from './section.interfaces'
import {fetchSections} from './section.helper'
import SurveySkeleton from '../survey/components/survey.skeleton'
import SectionTable from './section.component/section.table'
import DashboardWrapper from 'app/pages/dashboard/DashboardWrapper'
import SkeletonSectionTable from './section.component/section.skeletonTable'

const Custom: React.FC = () => {
  const filterFields: FieldsArray = useMemo(
    () => [
      {type: 'text', label: 'Program Id', name: 'programId', placeholder: 'Enter Program Id'},
      //   {type: 'text', label: 'Status', name: 'status', placeholder: 'Enter Status'},
      //   {type: 'text', label: 'Created By', name: 'createdBy', placeholder: 'Enter Created By'},
      //   {type: 'text', label: 'QA Id', name: 'qaId', placeholder: 'Enter QA Id'},
      //   {type: 'text', label: 'FA Id', name: 'faId', placeholder: 'Enter FA Id'},
    ],
    []
  )

  const [currentPage, setCurrentPage] = useState<number>(1)
  const [totalPages, setTotalPages] = useState<number>(1)
  const [totalResults, setTotalResults] = useState<number>(0)
  const [itemsPerPage, setItemsPerPage] = useState<number>(10)
  const [filters, setFilters] = useState<FilterProps>()
  const location = useLocation()
  const receivedData = location.state || []
  const queryParams = new URLSearchParams(location.search)
  const programId = queryParams.get('programId')
  const surveyId = queryParams.get('surveyId')

  const [isExpanded, setIsExpanded] = useState(false)

  const mappedReceivedData = useMemo(
    () =>
      receivedData.reduce((acc: any, item: Record<string, string>) => {
        acc[item.sectionId] = item.status
        return acc
      }, {} as Record<string, string>),
    [receivedData]
  )

  const toggleExpand = () => {
    setIsExpanded(!isExpanded)
  }

  const {data, error, isLoading, isError, refetch} = useQuery({
    queryKey: ['sections', {limit: itemsPerPage, page: currentPage, ...filters}],
    queryFn: async () =>
      fetchSections({
        limit: itemsPerPage,
        page: currentPage,
        ...filters,
        // programId: programId || '',
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

  // const handleEdit = (section: Section) => {
  //   console.log('Edit section:', section)
  // }

  // const handleDelete = (section: Section) => {
  //   console.log('Delete section:', section)
  // }

  // const handleView = (sectionId: string) => {
  //   navigate(`/question`, {
  //     state: {sectionId},
  //   })
  //   console.log('View questions for section:', sectionId)
  // }
  //   console.log('mapped received data', mappedReceivedData)
  console.log('programId, surveyId', programId, surveyId)

  return (
    <div className='container mx-auto px-4 sm:px-8'>
      <div className='py-6'>
        <h2 className='text-lg font-bold text-gray-700 mb-4'>SECTIONS</h2>
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
          <SkeletonSectionTable />
        ) : (
          data && (
            <SectionTable
              sectionData={data.results.results}
              receivedData={mappedReceivedData}
              surveyId={surveyId || ''}
            />
          )
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
            name='Section'
            onLimitChange={onLimitChange}
            disabled={isLoading}
          />
        )}
      </div>
    </div>
  )
}

const SectionPage: React.FC = () => {
  return (
    <>
      <DashboardWrapper customComponent={Custom} selectedItem={'/sections'}></DashboardWrapper>
    </>
  )
}
export default SectionPage
