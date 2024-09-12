import React, {useMemo, useState} from 'react'
import {AiOutlinePlus, AiOutlineFilter, AiOutlineUpload} from 'react-icons/ai'
import Table from './question.component/table'
import Pagination from 'sr/helpers/ui-components/dashboardComponents/Pagination'
import DashboardWrapper from 'app/pages/dashboard/DashboardWrapper'
import {fetchBusinessCategory} from 'sr/utils/api/fetchBusinessCategory'
import {useDeleteBusinessCategory} from 'sr/utils/api/deleteBusinessCategory'
import {Button} from 'sr/helpers'
import Filter from 'sr/helpers/ui-components/Filter'
import {useCreateBusinessCategory} from 'sr/utils/api/createBusinessCategory'
import DynamicModal from 'sr/helpers/ui-components/DynamicPopUpModal'
import {useUpdateBusinessCategory} from 'sr/utils/api/updateBusinessCategory'
import {FieldsArray} from 'sr/constants/fields'
import {getPreSignedURL} from 'sr/utils/api/media'
import {useQuery} from '@tanstack/react-query'
import SkeletonTable from 'sr/helpers/ui-components/dashboardComponents/SkeletonTable'
import PaginationSkeleton from 'sr/helpers/ui-components/dashboardComponents/PaginationSkeleton'
import {Question, QuestionFilters} from './question.interface'
import {fields} from './question.constant'
import {dummyData} from 'sr/constants/dashboard'
import {dummyQuestions} from './question.dummy'
import {IoSearchSharp} from 'react-icons/io5'
import {RiArrowDownSLine, RiArrowUpSLine} from 'react-icons/ri'

// interface businessTypeApiResponse {
//   name?: string
//   imagePath?: string
//   createdAt: string
//   updatedAt: string
//   id: string
// }

// interface businessTypeFilters {
//   name?: string
// }
// interface businessTypeCreatePayload {
//   name: string
//   imagePath: string
// }
// interface businessTypeUpdatePayload extends businessTypeCreatePayload {}

const Custom: React.FC = () => {
  const [isLoading, setLoading] = useState<Boolean>(false)
  const [filters, setFilters] = useState<QuestionFilters>()
  const [isFilterVisible, setIsFilterVisible] = useState<boolean>(false)
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false)
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState<boolean>(false)
  const [itemsPerPage, setItemsPerPage] = useState<number>(8)
  const [selectedData, setSelectedData] = useState<Question>()
  const [isExpanded, setIsExpanded] = useState(false)

  //   const fields: FieldsArray = useMemo(
  //     () => [{type: 'text', label: 'Name', name: 'name', placeholder: 'Name', required: true}],
  //     []
  //   )

  //   const createFields: FieldsArray = useMemo(
  //     () => [
  //       {type: 'text', label: 'Name', name: 'name', placeholder: 'Name', required: true},
  //       {
  //         type: 'file',
  //         label: 'Images',
  //         name: 'imagePath',
  //         wrapperLabel: 'Upload image',
  //         topLabel: 'Images',
  //         placeholder: 'Select Images',
  //         required: true,
  //       },
  //     ],
  //     []
  //   )

  //   const updateFields: FieldsArray = useMemo(
  //     () => [
  //       {type: 'text', label: 'Name', name: 'name', placeholder: 'Name', required: true},
  //       {
  //         type: 'file',
  //         label: 'Images',
  //         name: 'imagePath',
  //         wrapperLabel: 'Upload image',
  //         topLabel: 'Images',
  //         placeholder: 'Select Images',
  //         required: true,
  //       },
  //     ],
  //     []
  //   )

  //   const {data, error, isLoading, isError, refetch} = useQuery({
  //     queryKey: ['businessCategories', {limit: itemsPerPage, page: currentPage, ...filters}],
  //     queryFn: async () =>
  //       fetchBusinessCategory({limit: itemsPerPage, page: currentPage, ...filters}),
  //     // placeholderData: keepPreviousData,
  //   })

  const handleView = async (fileUrl: string | undefined) => {
    if (!fileUrl) return
    const response: any = await getPreSignedURL({fileName: fileUrl})
    window.open(response.results.url.toString(), '_blank')
  }

  const onPageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber)
  }

  const onLimitChange = (newLimit: number) => {
    setItemsPerPage(newLimit)
    setCurrentPage(1)
  }

  //   const onDeleteBussinessCategory = async (id: string) => {
  //     deleteMutation.mutate(id)
  //   }
  const handleApplyFilter = (newFilters: QuestionFilters) => {
    setFilters(newFilters)
    setCurrentPage(1)
    setIsFilterVisible(false) // Hide filter after applying
  }
  //   const handleCreateBusinessType = async (payload: businessTypeCreatePayload) => {
  //     setIsCreateModalOpen(false)
  //     createMutation.mutate(payload)
  //   }
  //   const handleEditBusinessType = async (payload: businessTypeUpdatePayload) => {
  //     if (!selectedData) {
  //       setIsUpdateModalOpen(false)
  //       return
  //     }
  //     setIsUpdateModalOpen(false)
  //     updateMutation.mutate(
  //       {payload, id: selectedData.id} // Pass the payload and category ID
  //     )
  //   }

  //   const defaultValues: businessTypeApiResponse | undefined = useMemo(() => {
  //     if (!selectedData) return undefined
  //     return {
  //       name: selectedData?.name,
  //       imagePath: selectedData?.imagePath,
  //       createdAt: selectedData.createdAt,
  //       updatedAt: selectedData.updatedAt,
  //       id: selectedData.id,
  //     }
  //   }, [selectedData])
  const toggleExpand = () => {
    setIsExpanded(!isExpanded)
  }

  return (
    <>
      <div className='container mx-auto px-4 sm:px-8'>
        <div className='py-6'>
          <h2 className='text-lg font-bold text-gray-700 mb-4'>Question</h2>
          <div
            onClick={toggleExpand}
            className='flex justify-between items-center bg-white hover:cursor-pointer'
          >
            <div className='flex items-center bg-[#265B91] rounded-br-full px-6 py-3'>
              <IoSearchSharp className='text-gray-50 mr-2 bg-transparent' size={20} />
              <h3 className='text-gray-50 bg-transparent font-medium'>Filter</h3>
            </div>

            {!isExpanded && (
              <p className='text-md leading-tight mb-2 sm:mb-0 sm:mr-4 p-3 text-gray-400'>
                Click to Search
              </p>
            )}
            <div className='focus:outline-none p-3'>
              {isExpanded ? (
                <RiArrowUpSLine className='text-2xl' />
              ) : (
                <RiArrowDownSLine className='text-2xl' />
              )}
            </div>
          </div>
          {isExpanded && (
            <div className='relative'>
              <Filter
                onApplyFilter={handleApplyFilter}
                setIsFilterVisible={setIsFilterVisible}
                preFilters={filters || {}}
                fields={fields}
              />
            </div>
          )}
          <div className='flex justify-between items-center mt-4 py-2 bg-white px-2'>
            <h3 className='text-md font-medium'>Question List</h3>
          </div>
          {isLoading ? (
            <SkeletonTable title={'Business Category'} />
          ) : (
            <Table
              handleView={handleView}
              setSelectedData={setSelectedData}
              setIsUpdateModalOpen={setIsUpdateModalOpen}
              questions={dummyQuestions}
              // handleDelete={onDeleteBussinessCategory}
              //   topicName='Business Category'
            />
          )}
        </div>
        {/* {isLoading || isError ? (
          <PaginationSkeleton />
        ) : (
          <Pagination
            currentPage={currentPage}
            totalPages={data?.totalPages || 0}
            onPageChange={onPageChange}
            itemsPerPage={itemsPerPage}
            name='Business'
            onLimitChange={onLimitChange}
            disabled={isLoading}
            totalResults={data?.totalResults || 0}
          />
        )} */}
      </div>
      {/* {isCreateModalOpen && (
        <DynamicModal
          imageType='imagePath'
          label='Create Business Category'
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          fields={[]}
          onSubmit={handleCreateBusinessType}
        />
      )} */}
      {/* {isUpdateModalOpen && defaultValues && (
        <DynamicModal
          imageType='imagePath'
          label='Update Business Category'
          isOpen={isUpdateModalOpen}
          onClose={() => setIsUpdateModalOpen(false)}
          fields={updateFields}
          defaultValues={selectedData}
          onSubmit={handleEditBusinessType}
        />
      )} */}
    </>
  )
}
const QuestionPage: React.FC = () => {
  return (
    <>
      <DashboardWrapper customComponent={Custom} selectedItem={'/question'}></DashboardWrapper>
    </>
  )
}

export default QuestionPage
