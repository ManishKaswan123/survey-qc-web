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
        // const response = await fetchPrograms({ limit: itemsPerPage, page: currentPage });

        let response = {
          results: [
            {
              id: '6',
              name: 'Blockchain Basics',
              description: 'Introduction to blockchain technology and cryptocurrencies.',
              details: 'Understand blockchain architecture and smart contracts.',
              startDate: '2024-09-15T09:00:00.000Z',
              endDate: '2024-09-25T17:00:00.000Z',
            },
            {
              id: '7',
              name: 'Cloud Computing 101',
              description: 'Explore cloud services and deployment models.',
              details: 'Learn about AWS, Azure, and Google Cloud.',
              startDate: '2024-09-20T09:00:00.000Z',
              endDate: '2024-10-10T17:00:00.000Z',
            },
            {
              id: '8',
              name: 'Artificial Intelligence for Beginners',
              description: 'Introductory course on AI concepts and applications.',
              details: 'Covers machine learning, neural networks, and deep learning basics.',
              startDate: '2024-09-10T09:00:00.000Z',
              endDate: '2024-09-30T17:00:00.000Z',
            },
            {
              id: '9',
              name: 'Cybersecurity Fundamentals',
              description: 'Learn the basics of securing systems and networks.',
              details: 'Introduction to encryption, firewalls, and threat mitigation.',
              startDate: '2024-09-12T09:00:00.000Z',
              endDate: '2024-09-22T17:00:00.000Z',
            },
            {
              id: '10',
              name: 'Data Science Essentials',
              description: 'Understand the fundamentals of data analysis and visualization.',
              details: 'Learn about Python, R, and popular data science libraries.',
              startDate: '2024-09-18T09:00:00.000Z',
              endDate: '2024-10-05T17:00:00.000Z',
            },
            {
              id: '11',
              name: 'Internet of Things (IoT) Basics',
              description: 'Introduction to the concept of connected devices and smart homes.',
              details: 'Understand how IoT devices communicate and interact.',
              startDate: '2024-09-08T09:00:00.000Z',
              endDate: '2024-09-18T17:00:00.000Z',
            },
            {
              id: '12',
              name: 'Full Stack Web Development',
              description: 'Learn the essentials of both frontend and backend development.',
              details: 'Focuses on HTML, CSS, JavaScript, Node.js, and MongoDB.',
              startDate: '2024-09-22T09:00:00.000Z',
              endDate: '2024-10-12T17:00:00.000Z',
            },
            {
              id: '13',
              name: 'Mobile App Development with Flutter',
              description: 'Build cross-platform mobile applications using Flutter.',
              details: 'Learn about Dart, Flutter widgets, and state management.',
              startDate: '2024-09-05T09:00:00.000Z',
              endDate: '2024-09-20T17:00:00.000Z',
            },
            {
              id: '14',
              name: 'Big Data Analytics',
              description: 'Introduction to processing and analyzing large datasets.',
              details: 'Covers Hadoop, Spark, and real-time data processing techniques.',
              startDate: '2024-09-15T09:00:00.000Z',
              endDate: '2024-09-30T17:00:00.000Z',
            },
            {
              id: '15',
              name: 'DevOps for Beginners',
              description: 'Understand the principles of DevOps and CI/CD pipelines.',
              details: 'Focuses on Jenkins, Docker, Kubernetes, and cloud deployment.',
              startDate: '2024-09-13T09:00:00.000Z',
              endDate: '2024-09-25T17:00:00.000Z',
            },
            {
              id: '16',
              name: 'Game Development with Unity',
              description: 'Learn the fundamentals of 2D and 3D game development.',
              details: 'Covers C# scripting, physics, and user interaction.',
              startDate: '2024-09-01T09:00:00.000Z',
              endDate: '2024-09-21T17:00:00.000Z',
            },
            {
              id: '17',
              name: 'Machine Learning with Python',
              description: 'Explore machine learning algorithms and techniques using Python.',
              details: 'Covers libraries such as scikit-learn, TensorFlow, and Keras.',
              startDate: '2024-09-07T09:00:00.000Z',
              endDate: '2024-09-30T17:00:00.000Z',
            },
            {
              id: '18',
              name: 'UI/UX Design Principles',
              description: 'Learn the fundamentals of user interface and user experience design.',
              details: 'Covers wireframing, prototyping, and usability testing.',
              startDate: '2024-09-10T09:00:00.000Z',
              endDate: '2024-09-25T17:00:00.000Z',
            },
            {
              id: '19',
              name: 'Quantum Computing Basics',
              description: 'An introduction to the principles of quantum computing.',
              details: 'Understand quantum bits, entanglement, and superposition.',
              startDate: '2024-09-15T09:00:00.000Z',
              endDate: '2024-10-01T17:00:00.000Z',
            },
            {
              id: '20',
              name: 'Digital Marketing Fundamentals',
              description: 'Learn the basics of SEO, SEM, and content marketing.',
              details: 'Covers tools such as Google Analytics and social media marketing.',
              startDate: '2024-09-05T09:00:00.000Z',
              endDate: '2024-09-18T17:00:00.000Z',
            },
            {
              id: '21',
              name: 'Introduction to Ethical Hacking',
              description: 'Learn about penetration testing and securing systems.',
              details:
                'Covers ethical hacking techniques, network security, and vulnerability testing.',
              startDate: '2024-09-10T09:00:00.000Z',
              endDate: '2024-09-24T17:00:00.000Z',
            },
          ],
          page: 1,
          limit: 15,
          totalPages: 1,
          totalResults: 15,
        }

        setPrograms(response.results)
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
