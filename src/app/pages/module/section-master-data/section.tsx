import React, { useEffect, useMemo, useState } from 'react'
import SectionCard from './components/sectionCard' // Updated
import { fetchSections } from './api' // Update API function
import { AiOutlinePlus, AiOutlineFilter } from 'react-icons/ai'
import { Section, SectionFilters } from './sectionInterfaces' // Update interfaces
import { Button, Spinner } from 'sr/helpers'
import PaginationSkeleton from 'sr/helpers/ui-components/dashboardComponents/PaginationSkeleton'
import Pagination from 'sr/helpers/ui-components/dashboardComponents/Pagination'
import Filter from 'sr/helpers/ui-components/Filter'
import { FieldsArray } from 'sr/constants/fields'
import SectionCardSkeleton from './components/sectionCardSkeleton' // Updated
import { FaArrowLeft } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import SectionTable from './components/sectionTable' // Updated
import SectionTableSkeleton from './components/sectionTableSkeleton' // Updated

const SectionList: React.FC = () => {
  const filterFields: FieldsArray = useMemo(
    () => [{ type: 'text', label: 'Section Name', name: 'name', placeholder: 'Section Name' }], // Updated to "Section Name"
    []
  )
  const [sections, setSections] = useState<Section[]>([]) // Renamed to "sections"
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [isFilterVisible, setIsFilterVisible] = useState<boolean>(false)
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [totalPages, setTotalPages] = useState<number>(1)
  const [totalResults, setTotalResults] = useState<number>(0)
  const [itemsPerPage, setItemsPerPage] = useState<number>(10)
  const [filters, setFilters] = useState<SectionFilters>({}) // Updated to "SectionFilters"
  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const response = await fetchSections({ limit: itemsPerPage, page: currentPage });

        let response = {
          results: [
            {
              id: '1',
              name: 'Introduction to Java',
              description: 'Learn the basics of Java programming language.',
              startDate: '2024-09-10T09:00:00.000Z',
              endDate: '2024-09-30T17:00:00.000Z',
              details: 'ev is charger',
            },
            {
              id: '2',
              name: 'Advanced Python',
              description: 'Deep dive into advanced Python concepts and libraries.',
              startDate: '2024-09-12T09:00:00.000Z',
              endDate: '2024-09-25T17:00:00.000Z',
              details: 'ev is charger',
            },
            // More section data...
          ],
          page: 1,
          limit: 15,
          totalPages: 1,
          totalResults: 15,
        }

        setSections(response?.results) // Renamed to "setSections"
        setTotalPages(response.totalPages)
        setTotalResults(response.totalResults)
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
    // Implement filter logic for sections
    console.log('Filter applied')
  }

  const handleEdit = (section: Section) => {
    console.log('Edit section:', section)
  }

  const handleDelete = (section: Section) => {
    console.log('Delete section:', section)
  }

  const handleView = (sectionId: string) => {
    navigate(`/section/${sectionId}`) // Navigate to section details page
    console.log('View details for section:', sectionId)
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
            <h2 className='text-2xl font-semibold leading-tight mb-2 sm:mb-0 sm:mr-4'>Section</h2> {/* Updated title */}
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
          <SectionCardSkeleton/> 
        ) : error ? (
          <p className='text-red-500'>{error}</p>
        ) : (
          <SectionTable
            sectionData={sections} // Updated
            onEdit={handleEdit}
            onDelete={handleDelete}
            onView={handleView}
          />
        )}
        {loading ? 
          <PaginationSkeleton />
         : (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalResults={totalResults}
            onPageChange={onPageChange}
            itemsPerPage={itemsPerPage}
            name='Section' // Updated to "Section"
            onLimitChange={onLimitChange}
            disabled={loading}
          />
        )}
      </div>
    </div>
  )
}

export default SectionList
