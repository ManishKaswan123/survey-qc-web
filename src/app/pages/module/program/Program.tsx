import React, {useEffect, useMemo, useState} from 'react'
import ProgramCard from './components/ProgramCard'
import {CreatePrograms, DeletePrograms, fetchPrograms} from './api'
import {AiOutlinePlus, AiOutlineFilter} from 'react-icons/ai'
import {CreatePayloadType, Program, ProgramFilters} from './programInterfaces'
import {Button, Spinner} from 'sr/helpers'
import PaginationSkeleton from 'sr/helpers/ui-components/dashboardComponents/PaginationSkeleton'
import Pagination from 'sr/helpers/ui-components/dashboardComponents/Pagination'
import Filter from 'sr/helpers/ui-components/Filter'
import {FieldsArray} from 'sr/constants/fields'
import ProgramCardSkeleton from './components/ProgramCardSkeleton'
import {FaArrowLeft} from 'react-icons/fa'
import {useNavigate} from 'react-router-dom'
import ProgramTable from './components/ProgramTable'
import ProgramTableSkeleton from './components/ProgramTableSkeleton'
import FilterHeader from 'sr/helpers/ui-components/filterHeader'
import DynamicModal from 'sr/helpers/ui-components/DynamicPopUpModal'
import {toast} from 'react-toastify'
import {useQuery, useQueryClient} from '@tanstack/react-query'
import {useActions} from 'sr/utils/helpers/useActions'
import DashboardWrapper from 'app/pages/dashboard/DashboardWrapper'

const Custom: React.FC = () => {
  const filterFields: FieldsArray = useMemo(
    () => [{type: 'text', label: 'Program Name', name: 'name', placeholder: 'Program Name'}],
    []
  )
  const [isFilterVisible, setIsFilterVisible] = useState<boolean>(false)
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [itemsPerPage, setItemsPerPage] = useState<number>(10)
  const [filters, setFilters] = useState<ProgramFilters>({})
  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false)
  const navigate = useNavigate()
  const [isExpanded, setIsExpanded] = useState(false)
  const queryClient = useQueryClient()
  const {fetchProgramAction} = useActions()

  const handleToggleExpand = () => setIsExpanded(!isExpanded)

  const createUpdateFields: FieldsArray = useMemo(
    () => [
      {
        type: 'text',
        label: 'Name',
        name: 'name',
        placeholder: 'Program Name',
        required: true,
      },
      {
        type: 'text',
        label: 'Description',
        name: 'description',
        placeholder: 'Description',
      },
      {
        type: 'datetime-local',
        label: 'Start Date',
        name: 'startDate',
        placeholder: 'Start Date',
        required: true,
      },
    ],
    []
  )

  const handleCreateProgram = async (payload: CreatePayloadType) => {
    try {
      let response = await CreatePrograms(payload)
      if (response?.status === 'success') {
        toast.success('Program created successfully')
        queryClient.invalidateQueries({queryKey: ['program']})
        fetchProgramAction({})
      }
    } catch (error) {
      toast.error('Failed to create program')
    }
    setIsCreateModalOpen(false)
  }

  const handleDeleteProgram = async (payload: string) => {
    try {
      let response = await DeletePrograms(payload)
      if (response?.status === 'success') {
        toast.success('Program deleted successfully')
        queryClient.invalidateQueries({queryKey: ['program']})
        fetchProgramAction({})
      }
    } catch (error) {
      toast.error('Failed to delete program')
    }
    setIsCreateModalOpen(false)
  }

  const {data, error, isLoading, refetch} = useQuery({
    queryKey: ['program', {limit: itemsPerPage, page: currentPage, ...filters}],
    queryFn: () =>
      fetchPrograms({
        limit: itemsPerPage,
        page: currentPage,
        ...filters,
      }),
  })

  const onPageChange = (page: number) => {
    setCurrentPage(page)
  }

  const onLimitChange = (newLimit: number) => {
    setItemsPerPage(newLimit)
    setCurrentPage(1) // Reset to first page when items per page changes
  }

  const handleApplyFilter = () => {
    // Implement filter logic
    console.log('Filter applied')
  }

  const handleEdit = (program: Program) => {
    console.log('Edit program:', program)
  }

  const handleView = (programId: string) => {
    navigate(`/section`, {
      state: {programId},
    }) // Navigate to program details page
  }

  return (
    <div className='container mx-auto px-4 sm:px-8 '>
      <div className='py-6'>
        <div className='flex justify-between items-center flex-wrap mb-4'>
          <h2 className='text-lg font-bold text-gray-700'>PROGRAMS</h2>
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
              preFilters={filters}
              fields={filterFields}
            />
          </div>
        )}
        {isLoading ? (
          <ProgramTableSkeleton />
        ) : error ? (
          <p className='text-red-500'>{error.message}</p>
        ) : (
          <ProgramTable
            programData={data?.results.results || []}
            onEdit={handleEdit}
            onDelete={handleDeleteProgram}
            onView={handleView}
          />
        )}
        {isLoading ? (
          <PaginationSkeleton />
        ) : (
          <Pagination
            currentPage={currentPage}
            totalPages={data?.results.totalPages || 1}
            totalResults={data?.results.totalResults || 0}
            onPageChange={onPageChange}
            itemsPerPage={itemsPerPage}
            name='Program'
            onLimitChange={onLimitChange}
            disabled={isLoading}
          />
        )}
      </div>
      {isCreateModalOpen && (
        <DynamicModal
          // imageType='imagePath'
          label='Create Program'
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          fields={createUpdateFields}
          onSubmit={handleCreateProgram}
        />
      )}
    </div>
  )
}
const ProgramList: React.FC = () => {
  return (
    <>
      <DashboardWrapper customComponent={Custom} selectedItem={'/program'}></DashboardWrapper>
    </>
  )
}

export default ProgramList
