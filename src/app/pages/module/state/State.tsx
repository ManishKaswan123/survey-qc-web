import React, {useEffect, useMemo, useState} from 'react'
import {AiOutlinePlus, AiOutlineFilter} from 'react-icons/ai'
import Pagination from 'sr/helpers/ui-components/dashboardComponents/Pagination'
import {Spinner} from 'sr/helpers/ui-components/Spinner'
import DashboardWrapper from 'app/pages/dashboard/DashboardWrapper'

import {toast} from 'react-toastify'
import {Button} from 'sr/helpers'
import Filter from 'sr/helpers/ui-components/Filter'
import DynamicModal from 'sr/helpers/ui-components/DynamicPopUpModal'
import {FieldsArray} from 'sr/constants/fields'
import StateTable from './StateTable'
import { deleteState } from 'sr/utils/api/deleteState'
import { createState } from 'sr/utils/api/createState'
import { updateState } from 'sr/utils/api/updateState'
import { fetchState } from 'sr/utils/api/fetchState'


const Custom: React.FC = () => {
  const [data, setData] = useState<any>([])
  const [loading, setLoading] = useState(false)
  const [filters, setFilters] = useState({})
  const [isFilterVisible, setIsFilterVisible] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
  const [totalResults, setTotalResults] = useState(0)
  const [isChanged, setisChanged] = useState<any>(false)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false)
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [selectedData, setSelectedData] = useState<any>({})
  const [isDataModified, setIsDataModified] = useState(false)

  const fields: FieldsArray = useMemo(
    () => [
      {type: 'text', label: 'State Name', name: 'stateName', placeholder: 'State Name'},
      {type: 'number', label: 'State Code', name: 'stateCode', placeholder: 'State Code'},

      // {type: 'text', label: 'State UT', name: 'stateUT', placeholder: 'State UT'},
      {
        type: 'dropdown',
        label: 'stateUT',
        name: [
          {
            name: 'S',
            id: 'S',
          },
          {
            name: 'U',
            id: 'U',
          },
        ],
        topLabel: 'State UT',
        placeholder: 'Select State UT',
      },
      {
        type: 'dropdown',
        label: 'sortBy',
        name: [
          {
            name: 'State Name',
            id: 'stateName',
          },
          {
            name: 'State Code',
            id: 'stateCode',
          },
        ],
        topLabel: 'Sort By',
        placeholder: 'Select Sort By',
      },

      // {type: 'text', label: 'Sort By', name: 'sortBy', placeholder: 'Sort By'},
      // {type: 'text', label: 'Project By', name: 'projectBy', placeholder: 'Project By'},
    ],
    []
  )

  const createFields: FieldsArray = useMemo(
    () => [
      {
        type: 'text',
        label: 'State Name',
        name: 'stateName',
        placeholder: 'State Name',
        required: true,
      },
      {
        type: 'number',
        label: 'State Code',
        name: 'stateCode',
        placeholder: 'State Code',
        required: true,
      },
      {
        type: 'number',
        label: 'State Version',
        name: 'stateVersion',
        placeholder: 'State Version',
        required: true,
      },
      {
        type: 'number',
        label: 'Census 2001 Code',
        name: 'census2001Code',
        placeholder: 'Census 2001 Code',
      },
      {
        type: 'number',
        label: 'Census 2011 Code',
        name: 'census2011Code',
        placeholder: 'Census 2011 Code',
      },
      {
        type: 'text',
        label: 'State UT',
        name: 'stateUT',
        placeholder: 'State UT',
        required: true,
      },
    ],
    []
  )

  const updateFields: FieldsArray = useMemo(
    () => [
      {
        type: 'text',
        label: 'State Name',
        name: 'stateName',
        placeholder: 'State Name',
        required: true,
      },
      {
        type: 'number',
        label: 'State Code',
        name: 'stateCode',
        placeholder: 'State Code',
        required: true,
      },
      {
        type: 'number',
        label: 'State Version',
        name: 'stateVersion',
        placeholder: 'State Version',
        required: true,
      },
      {
        type: 'number',
        label: 'Census 2001 Code',
        name: 'census2001Code',
        placeholder: 'Census 2001 Code',
      },
      {
        type: 'number',
        label: 'Census 2011 Code',
        name: 'census2011Code',
        placeholder: 'Census 2011 Code',
      },
      {
        type: 'text',
        label: 'State UT',
        name: 'stateUT',
        placeholder: 'State UT',
        required: true,
      },
    ],
    []
  )

  // const handleView = async (fileUrl: string | undefined) => {
  //   if (!fileUrl) return
  //   const response: any = await getPreSignedURL({fileName: fileUrl})
  //   window.open(response.results.url.toString(), '_blank')
  // }

  const onPageChange = async (pageNumber: number) => {
    setCurrentPage(pageNumber)
  }

  const onLimitChange = (newLimit: number) => {
    setItemsPerPage(newLimit)
    setCurrentPage(1)
  }

  const onDeleteState = async (id: string) => {
    setLoading(true)
    await deleteState(id)
    setLoading(false)
    setisChanged(!isChanged)
    toast.success(`State deleted successfully`)
  }
  const handleApplyFilter = (newFilters: any) => {
    // console.log('applying filter', newFilters)
    setFilters(newFilters)
    setCurrentPage(1)
    setIsFilterVisible(false) // Hide filter after applying
  }
  const handleCreateState = async (payload: any) => {
    const stateData: {
      stateName: string
      stateCode: number
      stateVersion: number
      census2001Code?: number
      census2011Code?: number
      stateUT: string
    } = {
      stateName: payload.stateName,
      stateCode: payload.stateCode,
      stateVersion: payload.stateVersion,
      census2001Code: payload.census2001Code,
      census2011Code: payload.census2011Code,
      stateUT: payload.stateUT,
    }
    try {
      await createState(stateData)
      setisChanged(!isChanged)
      toast.success('State created successfully')
    } catch (e) {
      console.error('Failed to create state', e)
    } finally {
      setIsCreateModalOpen(false)
    }
  }
  const handleEditState = async (payload: any) => {
    const stateData: {
      stateName: string
      stateCode: number
      stateVersion: number
      census2001Code?: number
      census2011Code?: number
      stateUT: string
    } = {
      stateName: payload.stateName,
      stateCode: payload.stateCode,
      stateVersion: payload.stateVersion,
      census2001Code: payload.census2001Code,
      census2011Code: payload.census2011Code,
      stateUT: payload.stateUT,
    }

    try {
      await updateState(stateData, selectedData.id)
      setisChanged(!isChanged)
      toast.success('State updated successfully')
    } catch (e) {
      console.error('Failed to update state', e)
    } finally {
      setIsUpdateModalOpen(false)
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const payload = {
          limit: itemsPerPage,
          page: currentPage,
          ...filters,
        }
        // console.log('Fetching data with payload:', payload) // Debug statement
        const response = await fetchState(payload)
        setData(response.results)
        setTotalPages(response.totalPages)
        setTotalResults(response.totalResults)
        if (response.results.length === 0) {
          setCurrentPage((prev: number) => {
            if (prev > 1) {
              return prev - 1
            }
            return 1
          })
        }
      } catch (error) {
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [currentPage, isChanged, filters, itemsPerPage])
  useEffect(() => {
    setIsDataModified(false)
    if (isUpdateModalOpen && selectedData) {
      const stateData: {
        stateName: string
        stateCode: number
        stateVersion: number
        census2001Code?: number
        census2011Code?: number
        stateUT: string
        id: string
      } = {
        stateName: selectedData.stateName,
        stateCode: selectedData.stateCode,
        stateVersion: selectedData.stateVersion,
        census2001Code: selectedData.census2001Code ? selectedData.census2001Code : 0,
        census2011Code: selectedData.census2011Code ? selectedData.census2011Code : 0,
        stateUT: selectedData.stateUT,
        id: selectedData.id,
      }
      setSelectedData(stateData)
      setIsDataModified(true)
    }
  }, [isUpdateModalOpen])

  return (
    <>
      <div className='container mx-auto px-4 sm:px-8'>
        <div className='py-4'>
          <div className='flex justify-between items-center flex-wrap mb-4'>
            <h2 className='text-2xl font-semibold leading-tight mb-2 sm:mb-0 sm:mr-4'>States</h2>
            <div className='flex items-center'>
              <Button
                label='Create new'
                Icon={AiOutlinePlus}
                onClick={() => {
                  setIsCreateModalOpen(true)
                }}
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
                fields={fields}
              />
            </div>
          )}
          {loading ? (
            <Spinner />
          ) : (
            <StateTable
              setSelectedData={setSelectedData}
              setIsUpdateModalOpen={setIsUpdateModalOpen}
              categoriesData={data}
              handleDelete={onDeleteState}
              topicName='States'
            />
          )}
        </div>
        {!loading && (
          <>
            {totalResults > 0 ? (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={onPageChange}
                itemsPerPage={itemsPerPage}
                name='States'
                onLimitChange={onLimitChange}
                disabled={loading}
                totalResults={totalResults}
              />
            ) : (
              <div className='items-center text-center text-xl mt-auto'>No Result Found</div>
            )}
          </>
        )}
      </div>
      {isCreateModalOpen && (
        <DynamicModal
          label='Create State'
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          fields={createFields}
          onSubmit={handleCreateState}
        />
      )}
      {isUpdateModalOpen && isDataModified && (
        <DynamicModal
          label='Update State'
          isOpen={isUpdateModalOpen}
          onClose={() => setIsUpdateModalOpen(false)}
          fields={updateFields}
          defaultValues={selectedData}
          onSubmit={handleEditState}
        />
      )}
    </>
  )
}
const State: React.FC = () => {
  return (
    <>
      <DashboardWrapper customComponent={Custom} selectedItem={'/state'}></DashboardWrapper>
    </>
  )
}

export default State
