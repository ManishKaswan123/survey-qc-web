import React, {useEffect, useMemo, useState} from 'react'
import ProgramCard from './components/ProgramCard'
import {fetchPrograms} from './api'
import {AiOutlinePlus, AiOutlineFilter} from 'react-icons/ai'
import {Program, ProgramFilters} from './programInterfaces'
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

const ProgramList: React.FC = () => {
  const filterFields: FieldsArray = useMemo(
    () => [{type: 'text', label: 'Program Name', name: 'name', placeholder: 'Program Name'}],
    []
  )
  const [programs, setPrograms] = useState<Program[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [isFilterVisible, setIsFilterVisible] = useState<boolean>(false)
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [totalPages, setTotalPages] = useState<number>(1)
  const [totalResults, setTotalResults] = useState<number>(0)
  const [itemsPerPage, setItemsPerPage] = useState<number>(10)
  const [filters, setFilters] = useState<ProgramFilters>({})
  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchPrograms({ limit: itemsPerPage, page: currentPage });

        console.log('ProgramList', response.results.results)
        setPrograms(response?.results?.results)
        setTotalPages(response?.results?.totalPages)
        setTotalResults(response?.results?.totalResults)
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message)
        } else {
          setError('An unexpected error occurred')
        }
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [currentPage, itemsPerPage])

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

  const handleDelete = (program: Program) => {
    console.log('Delete program:', program)
  }

  const handleView = (programId: string) => {
    navigate(`/section`, {
      state: {programId},
    }) // Navigate to program details page
    console.log('View sections for program:', programId)
  }

  return (
    <div className='container mx-auto px-4 sm:px-8 '>
      <div className='py-6'>
        <div className='flex justify-between items-center flex-wrap mb-4'>
          <div className='flex flex-row items-center'>
            <button
              onClick={() => navigate('/')} // Navigate to home page
              className='bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-2 rounded-full shadow-md inline-flex items-center mb-2 sm:mb-0 sm:mr-3'
            >
              <FaArrowLeft size={22} />
            </button>
            <h2 className='text-2xl font-semibold leading-tight mb-2 sm:mb-0 sm:mr-4'>Program</h2>
          </div>
          <div className='flex items-center'>
            <Button
              label='Create new'
              Icon={AiOutlinePlus}
              onClick={() => setIsCreateModalOpen(true)}
              className='bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-full shadow-md inline-flex items-center mb-2 sm:mb-0 sm:mr-3'
            ></Button>
            <Button
              label='Filter'
              Icon={AiOutlineFilter}
              onClick={() => setIsFilterVisible(!isFilterVisible)}
              className='bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-full shadow-md inline-flex items-center'
            ></Button>
          </div>
        </div>
        {isFilterVisible && (
          <div className='relative'>
            <Filter
              onApplyFilter={handleApplyFilter}
              setIsFilterVisible={setIsFilterVisible}
              preFilters={filters}
              fields={filterFields}
            />
          </div>
        )}
        {loading ? (
          <ProgramTableSkeleton />
        ) : error ? (
          <p className='text-red-500'>{error}</p>
        ) : (
          <ProgramTable
            programData={programs}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onView={handleView}
          />
        )}
        {loading ? (
          <PaginationSkeleton />
        ) : (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalResults={totalResults}
            onPageChange={onPageChange}
            itemsPerPage={itemsPerPage}
            name='Program'
            onLimitChange={onLimitChange}
            disabled={loading}
          />
        )}
      </div>
    </div>
  )
}

export default ProgramList
