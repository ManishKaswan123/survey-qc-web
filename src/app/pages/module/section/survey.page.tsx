import React, {useEffect, useMemo, useState} from 'react'
import SectionSkeleton from './components/survey.skeleton'
import Pagination from 'sr/helpers/ui-components/dashboardComponents/Pagination'
import Filter from 'sr/helpers/ui-components/Filter'
import {FieldsArray} from 'sr/constants/fields'
import PaginationSkeleton from 'sr/helpers/ui-components/dashboardComponents/PaginationSkeleton'
import {useLocation, useNavigate} from 'react-router-dom'
import FilterHeader from 'sr/helpers/ui-components/filterHeader'
import {useQuery} from '@tanstack/react-query'
import {fetchSurveys} from './survey.helper'
import SurveyTable from './components/survey.table'
import SurveySkeleton from './components/survey.skeleton'
import DashboardWrapper from 'app/pages/dashboard/DashboardWrapper'
import {FilterProps} from './survey.interfaces'

const Custom: React.FC = () => {
  const filterFields: FieldsArray = useMemo(
    () => [
      {type: 'text', label: 'Program Id', name: 'programId', placeholder: 'Enter Program Id'},
      {type: 'text', label: 'Status', name: 'status', placeholder: 'Enter Status'},
      {type: 'text', label: 'Created By', name: 'createdBy', placeholder: 'Enter Created By'},
      {type: 'text', label: 'QA Id', name: 'qaId', placeholder: 'Enter QA Id'},
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

  const toggleExpand = () => {
    setIsExpanded(!isExpanded)
  }

  const {data, error, isLoading, isError, refetch} = useQuery({
    queryKey: ['surveys', {limit: itemsPerPage, page: currentPage, ...filters}],
    queryFn: async () =>
      fetchSurveys({
        limit: itemsPerPage,
        page: currentPage,
        ...filters,
        populate: `createdBy,updatedBy,faId,qaId`,
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

  return (
    <div className='container mx-auto px-4 sm:px-8'>
      <div className='py-6'>
        <h2 className='text-lg font-bold text-gray-700 mb-4'>FIELD ASSESMENT-DIRECT OBSERVATION</h2>
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
        {isLoading ? <SurveySkeleton /> : data && <SurveyTable surveyData={data.results.results} />}

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

const SurveyPage: React.FC = () => {
  return (
    <>
      <DashboardWrapper customComponent={Custom} selectedItem={'/survey'}></DashboardWrapper>
    </>
  )
}
export default SurveyPage
