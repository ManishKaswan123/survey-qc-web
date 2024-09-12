import React, {useEffect, useMemo, useState} from 'react'
import SectionCard from './components/SectionCard'
import SectionSkeleton from './components/SectionSkeleton'
import {AiOutlinePlus, AiOutlineFilter, AiOutlineUp, AiOutlineDown} from 'react-icons/ai'
import {Section, SectionFilters} from './sectionInterfaces'
import {fetchSections} from './api'
import Pagination from 'sr/helpers/ui-components/dashboardComponents/Pagination'
import {Button} from 'sr/helpers'
import Filter from 'sr/helpers/ui-components/Filter'
import {FieldsArray} from 'sr/constants/fields'
import PaginationSkeleton from 'sr/helpers/ui-components/dashboardComponents/PaginationSkeleton'
import {FaArrowLeft} from 'react-icons/fa'
import {useLocation, useNavigate} from 'react-router-dom'
import SectionTable from './components/SectionTable'
import {set} from 'react-hook-form'
import {IoSearchSharp} from 'react-icons/io5'
import {RiArrowDownSLine} from 'react-icons/ri'
import {RiArrowUpSLine} from 'react-icons/ri'
import {program} from './section.dummy'
import FilterHeader from 'sr/helpers/ui-components/filterHeader'

const SectionList: React.FC = () => {
  const filterFields: FieldsArray = useMemo(
    () => [
      {type: 'text', label: 'Section Name', name: 'name', placeholder: 'Section Name'},
      {
        type: 'dropdown',
        label: 'programId',
        name: program,
        topLabel: 'Program',
        placeholder: 'Select Program',
      },
    ],
    []
  )
  const [sections, setSections] = useState<Section[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [isFilterVisible, setIsFilterVisible] = useState<boolean>(false)
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [totalPages, setTotalPages] = useState<number>(1)
  const [totalResults, setTotalResults] = useState<number>(0)
  const [itemsPerPage, setItemsPerPage] = useState<number>(10)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false)
  const [filters, setFilters] = useState<SectionFilters>({})
  const navigate = useNavigate()
  const location = useLocation()
  const {programId} = location.state || {}
  const [isExpanded, setIsExpanded] = useState(false)

  const toggleExpand = () => {
    setIsExpanded(!isExpanded)
  }

  useEffect(() => {
    if (programId) {
      setFilters({...filters, programId})
    }
  }, [programId])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const payload = {
          limit: itemsPerPage,
          page: currentPage,
          ...filters,
        }

        // const response = await fetchSections(payload)

        const response = {
          results: [
            {
              id: '1',
              sectionName: 'Introduction to Programming',
              sectionLanguage: 'English',
              description:
                'This section covers the basics of programming, including syntax and simple algorithms.',
            },
            {
              id: '2',
              sectionName: 'Data Structures',
              sectionLanguage: 'English',
              description:
                'Learn about various data structures such as arrays, linked lists, stacks, and queues.',
            },
            {
              id: '3',
              sectionName: 'Web Development',
              sectionLanguage: 'Spanish',
              description:
                'An overview of web development technologies including HTML, CSS, and JavaScript.',
            },
            {
              id: '4',
              sectionName: 'Database Management',
              sectionLanguage: 'French',
              description: 'This section introduces database concepts and SQL for managing data.',
            },
            {
              id: '5',
              sectionName: 'Machine Learning',
              sectionLanguage: 'English',
              description:
                'Explore the fundamentals of machine learning and its applications.Explore the fundamentals of machine learning and its applications.Explore the fundamentals of machine learning and its applications.Explore the fundamentals of machine learning and its applications.',
            },
            {
              id: '6',
              sectionName: 'Cybersecurity Basics',
              sectionLanguage: 'German',
              description:
                'Learn about the principles of cybersecurity and how to protect information systems.',
            },
            {
              id: '7',
              sectionName: 'Cloud Computing',
              sectionLanguage: 'English',
              description: 'An introduction to cloud computing services and deployment models.',
            },
            {
              id: '8',
              sectionName: 'Mobile App Development',
              sectionLanguage: 'Chinese',
              description:
                'This section covers the basics of developing mobile applications for Android and iOS.',
            },
            {
              id: '9',
              sectionName: 'Artificial Intelligence',
              sectionLanguage: 'English',
              description: 'Explore the concepts and techniques used in artificial intelligence.',
            },
            {
              id: '10',
              sectionName: 'Networking Fundamentals',
              sectionLanguage: 'Italian',
              description:
                'Learn about the basics of computer networking and communication protocols.',
            },
          ],
          page: 1,
          limit: 10,
          totalPages: 1,
          totalResults: 10,
        }

        setSections(response.results)
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
  }, [currentPage, itemsPerPage, filters])

  const onPageChange = (page: number) => {
    setCurrentPage(page)
  }

  const onLimitChange = (newLimit: number) => {
    setItemsPerPage(newLimit)
    setCurrentPage(1)
  }

  const handleApplyFilter = (newFilters: SectionFilters) => {
    setFilters(newFilters)
    setIsFilterVisible(false)
  }

  const handleEdit = (section: Section) => {
    console.log('Edit section:', section)
  }

  const handleDelete = (section: Section) => {
    console.log('Delete section:', section)
  }

  const handleView = (sectionId: string) => {
    navigate(`/question`, {
      state: {sectionId},
    })
    console.log('View questions for section:', sectionId)
  }

  return (
    <div className='container mx-auto px-4 sm:px-8'>
      <div className='py-6'>
        <h2 className='text-lg font-bold text-gray-700 mb-4'>FIELD ASSESMENT-DIRECT OBSERVATION</h2>
        <FilterHeader onToggle={toggleExpand} isExpanded={isExpanded} />

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
        {loading ? (
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-4'>
            {Array.from({length: 4}).map((_, index) => (
              <SectionSkeleton key={index} />
            ))}
          </div>
        ) : error ? (
          <p className='text-red-500'>{error}</p>
        ) : (
          <SectionTable
            sectionData={sections}
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
            name='Section'
            onLimitChange={onLimitChange}
            disabled={loading}
          />
        )}
      </div>
    </div>
  )
}

export default SectionList
