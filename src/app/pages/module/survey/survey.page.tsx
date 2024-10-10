import React, {useCallback, useEffect, useMemo, useState} from 'react'
import Pagination from 'sr/helpers/ui-components/dashboardComponents/Pagination'
import Filter from 'sr/helpers/ui-components/Filter'
import {FieldsArray} from 'sr/constants/fields'
import PaginationSkeleton from 'sr/helpers/ui-components/dashboardComponents/PaginationSkeleton'
import FilterHeader from 'sr/helpers/ui-components/filterHeader'
import {useQuery} from '@tanstack/react-query'
import {fetchSurveys} from './survey.helper'
import SurveyTable from './components/survey.table'
import SurveySkeleton from './components/survey.skeleton'
import DashboardWrapper from 'app/pages/dashboard/DashboardWrapper'
import {FilterProps} from './survey.interfaces'
import {useSelector} from 'react-redux'
import {RootState} from 'sr/redux/store'
import {useActions} from 'sr/utils/helpers/useActions'
import {statusObject} from 'sr/constants/status'
import {Breadcrumb} from 'sr/helpers/ui-components/Breadcrumb'

const Custom: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [itemsPerPage, setItemsPerPage] = useState<number>(10)
  const [filters, setFilters] = useState<FilterProps>()
  // const navigate = useNavigate()
  // const location = useLocation()
  // const {programId} = location.state || {}
  const [isExpanded, setIsExpanded] = useState(false)
  const userRoleMap = useSelector((state: RootState) => state.user.userRoleMap)
  const userStatus = useSelector((state: RootState) => state.user.status)
  const programReduxStore = useSelector((state: RootState) => state.program)
  // const breadcrumpReduxStore = useSelector((state: RootState) => state.breadcrump)
  const {fetchUserData, fetchProgramAction} = useActions()

  // Retrieve the user data from local storage
  const user = useMemo(() => JSON.parse(localStorage.getItem('user') || '{}'), [])
  const userRole = user.role || ''

  // Construct the filter fields
  const fields: FieldsArray = useMemo(
    () => [
      // {type: 'text', label: 'Program Id', name: 'programId', placeholder: 'Enter Program Id'},
      {
        type: 'dropdown',
        label: 'programId',
        name: programReduxStore.totalPrograms,
        topLabel: 'Program',
        placeholder: 'Select Program',
        labelKey: 'name',
        id: '_id',
      },
      {
        type: 'dropdown',
        label: 'status',
        name: statusObject,
        topLabel: 'Status',
        placeholder: 'Select Status',
        labelKey: 'value',
        // id: 'id',
      },
      {
        type: 'dropdown',
        label: 'qaId',
        name: userRoleMap['QA'],
        topLabel: 'QA',
        placeholder: 'Select QA',
        labelKey: 'firstName',
        // id: 'id',
      },
      {
        type: 'dropdown',
        label: 'faId',
        name: userRoleMap['FA'],
        topLabel: 'FA',
        placeholder: 'Select FA',
        labelKey: 'firstName',
        // id: 'id',
      },
    ],
    [userRoleMap, statusObject, programReduxStore]
  )

  // // Conditionally include 'createdBy' field if the user is not QA
  // if (userRole !== 'QA') {
  //   fields.splice(2, 0, {
  //     type: 'dropdown',
  //     label: 'createdBy',
  //     name: userRoleMap['QA'],
  //     topLabel: 'Created By',
  //     placeholder: 'Select Created By',
  //     labelKey: 'firstName',
  //     // id: 'id',
  //   })
  // }

  useEffect(() => {
    fetchUserDataIfNeeded()
  }, [])

  const fetchUserDataIfNeeded = useCallback(() => {
    if (userStatus !== 'succeeded') {
      fetchUserData({})
    }
    if (programReduxStore.status !== 'succeeded') fetchProgramAction({})
  }, [userStatus, fetchUserData, programReduxStore, fetchProgramAction])

  const toggleExpand = () => {
    setIsExpanded(!isExpanded)
  }

  const {data, error, isLoading, isError, refetch} = useQuery({
    queryKey: [
      'surveys',
      {limit: itemsPerPage, page: currentPage, ...filters, populate: `faId,qaId`},
    ],
    queryFn: async () =>
      fetchSurveys({
        limit: itemsPerPage,
        page: currentPage,
        ...filters,
        populate: `faId,qaId`,
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
    console.log('applied filter is : ', newFilters)
    setFilters(newFilters)
    setCurrentPage(1)
  }

  // useEffect(() => {
  //   setBreadcrumpItems([...breadcrumpReduxStore.breadCrumps, {label: 'Survey', link: '/survey'}])
  // }, [])

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
        {/* <Breadcrumb
          breadcrumbItems={[{label: 'Survey', link: '/survey'}]}
          wrapperClassName={'mb-8'}
        /> */}
        <div className='flex justify-between items-center flex-wrap mb-4'>
          <h2 className='text-lg font-bold text-gray-700'>FIELD ASSESMENT</h2>
        </div>

        <FilterHeader onToggle={toggleExpand} isExpanded={isExpanded} />

        {isExpanded && (
          <div className='relative'>
            <Filter onApplyFilter={handleApplyFilter} preFilters={filters || {}} fields={fields} />
          </div>
        )}
        {isLoading ? <SurveySkeleton /> : data && <SurveyTable surveyData={data.results.results} />}

        {isLoading ? (
          <PaginationSkeleton />
        ) : (
          <Pagination
            currentPage={currentPage}
            totalPages={data?.results.totalPages || 1}
            totalResults={data?.results.totalResults || 0}
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
