import React, {useCallback, useEffect, useMemo, useState} from 'react'
import {AiOutlinePlus, AiOutlineFilter} from 'react-icons/ai'
import Pagination from 'sr/helpers/ui-components/dashboardComponents/Pagination'
import {Spinner} from 'sr/helpers/ui-components/Spinner'
import DashboardWrapper from 'app/pages/dashboard/DashboardWrapper'
import {Button} from 'sr/helpers'
import Filter from 'sr/helpers/ui-components/Filter'
import DynamicModal from 'sr/helpers/ui-components/DynamicPopUpModal'
import {FieldsArray} from 'sr/constants/fields'
import DistrictTable from './DistrictTable'
import {deleteDistrict} from 'sr/utils/api/deleteDistrict'
import {toast} from 'react-toastify'

import {useSelector} from 'react-redux'
import {RootState} from 'sr/redux/store'
import {useActions} from 'sr/utils/helpers/useActions'
import {createDistrict} from 'sr/utils/api/createDistrict'
import {updateDistrict} from 'sr/utils/api/updateDistrict'
import {fetchDistrict} from 'sr/utils/api/fetchDistrict'

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
  // const stateData = useSelector((state: RootState) => state.state.data)
  // const stateStatus = useSelector((state: RootState) => state.state.status)
  // @ts-ignore
  const stateData = useSelector((state: RootState) => state.state.data)
  // @ts-ignore
  const stateStatus = useSelector((state: RootState) => state.state.status)
  const {fetchStateData} = useActions()

  const fields: FieldsArray = useMemo(
    () => [
      {type: 'text', label: 'District Name', name: 'districtName', placeholder: 'District Name'},

      {
        type: 'dropdown',
        label: 'stateCode',
        name: stateData?.results,
        topLabel: 'State',
        placeholder: 'Select State',
        required: true,
        labelKey: 'stateName',
        id: 'stateCode',
      },

      {
        type: 'dropdown',
        label: 'sortBy',
        name: [
          {
            name: 'District Name',
            id: 'districtName',
          },
          {
            name: 'District Code',
            id: 'districtCode',
          },

          {
            name: 'State Code',
            id: 'stateCode',
          },
        ],
        topLabel: 'Sort By',
        placeholder: 'Select Sort By',
      },
      // {type: 'text', label: 'Project By', name: 'projectBy', placeholder: 'Project By'},
    ],
    [stateData]
  )

  const createFields: FieldsArray = useMemo(
    () => [
      {
        type: 'text',
        label: 'District Name',
        name: 'districtName',
        placeholder: 'District Name',
        required: true,
      },
      {
        type: 'dropdown',
        label: 'stateCode',
        name: stateData?.results,
        topLabel: 'State Code',
        placeholder: 'Select State Code',
        required: true,
        labelKey: 'stateName',
        id: 'stateCode',
      },
      {
        type: 'number',
        label: 'District Code',
        name: 'districtCode',
        placeholder: 'District Code',
        required: true,
      },
      {
        type: 'number',
        label: 'District Version',
        name: 'districtVersion',
        placeholder: 'District Version',
        required: true,
      },
      {
        type: 'number',
        label: 'District Census 2001 Code',
        name: 'districtCensus2001Code',
        placeholder: 'District Census 2001 Code',
      },
      {
        type: 'number',
        label: 'District Census 2011 Code',
        name: 'districtCensus2011Code',
        placeholder: 'District Census 2011 Code',
      },
    ],
    [stateData]
  )

  const updateFields: FieldsArray = useMemo(
    () => [
      {
        type: 'text',
        label: 'District Name',
        name: 'districtName',
        placeholder: 'District Name',
        required: true,
      },
      {
        type: 'dropdown',
        label: 'stateCode',
        name: stateData?.results,
        topLabel: 'State Code',
        placeholder: 'Select State Code',
        required: true,
        labelKey: 'stateName',
        id: 'stateCode',
      },
      {
        type: 'number',
        label: 'District Code',
        name: 'districtCode',
        placeholder: 'District Code',
        required: true,
      },
      {
        type: 'number',
        label: 'District Version',
        name: 'districtVersion',
        placeholder: 'District Version',
        required: true,
      },
      {
        type: 'number',
        label: 'District Census 2001 Code',
        name: 'districtCensus2001Code',
        placeholder: 'District Census 2001 Code',
      },
      {
        type: 'number',
        label: 'District Census 2011 Code',
        name: 'districtCensus2011Code',
        placeholder: 'District Census 2011 Code',
      },
    ],
    [stateData]
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

  const onDeleteDistrict = async (id: string) => {
    setLoading(true)
    await deleteDistrict(id)
    setLoading(false)
    setisChanged(!isChanged)
    toast.success(`District deleted successfully`)
  }
  const handleApplyFilter = (newFilters: any) => {
    // console.log('applying filter', newFilters)
    setFilters(newFilters)
    setCurrentPage(1)
    setIsFilterVisible(false) // Hide filter after applying
  }
  const handleCreateDistrict = async (payload: any) => {
    const districtData: {
      districtName: string
      districtCode: number
      stateCode: number
      districtVersion: number
      districtCensus2001Code?: number
      districtCensus2011Code?: number
    } = {
      districtName: payload.districtName,
      districtCode: parseInt(payload.districtCode),
      stateCode: parseInt(payload.stateCode),
      districtVersion: parseInt(payload.districtVersion),
      districtCensus2001Code: payload.districtCensus2001Code
        ? parseInt(payload.districtCensus2001Code)
        : undefined,
      districtCensus2011Code: payload.districtCensus2011Code
        ? parseInt(payload.districtCensus2011Code)
        : undefined,
    }

    try {
      await createDistrict(districtData)
      setisChanged(!isChanged)
      toast.success('District created successfully')
    } catch (e) {
      console.error('Failed to create district', e)
    } finally {
      setIsCreateModalOpen(false)
    }
  }
  const handleEditDistrict = async (payload: any) => {
    const districtData: {
      districtName: string
      districtCode: number
      stateCode: number
      districtVersion: number
      districtCensus2001Code?: number
      districtCensus2011Code?: number
    } = {
      districtName: payload.districtName,
      districtCode: parseInt(payload.districtCode),
      stateCode: parseInt(payload.stateCode),
      districtVersion: parseInt(payload.districtVersion),
      districtCensus2001Code: payload.districtCensus2001Code
        ? parseInt(payload.districtCensus2001Code)
        : undefined,
      districtCensus2011Code: payload.districtCensus2011Code
        ? parseInt(payload.districtCensus2011Code)
        : undefined,
    }
    try {
      await updateDistrict(districtData, selectedData.id)
      setisChanged(!isChanged)
      toast.success('District updated successfully')
    } catch (e) {
      console.error('Failed to update district', e)
    } finally {
      setIsUpdateModalOpen(false)
    }
  }
  const fetchData = useCallback(async () => {
    setLoading(true)
    try {
      const payload = {
        limit: itemsPerPage,
        page: currentPage,
        // getAll: true,
        ...filters,
      }
      // console.log('Fetching data with payload:', payload) // Debug statement
      const response = await fetchDistrict(payload)
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
  }, [itemsPerPage, currentPage, filters])

  const fetchDataIfNeeded = useCallback(() => {
    if (stateStatus != 'succeeded') fetchStateData()
  }, [stateStatus])
  useEffect(() => {
    fetchDataIfNeeded()
  }, [])

  useEffect(() => {
    fetchData()
  }, [currentPage, isChanged, filters, itemsPerPage])
  useEffect(() => {
    setIsDataModified(false)
    if (isUpdateModalOpen && selectedData) {
      const districtData: {
        districtName: string
        districtCode: number
        stateCode: number
        districtVersion: number
        districtCensus2001Code?: number
        districtCensus2011Code?: number
        id: string
      } = {
        districtName: selectedData.districtName,
        districtCode: selectedData.districtCode,
        stateCode: selectedData.stateCode,
        districtVersion: selectedData.districtVersion,
        districtCensus2001Code: selectedData.districtCensus2001Code
          ? selectedData.districtCensus2001Code
          : null,
        districtCensus2011Code: selectedData.districtCensus2011Code
          ? selectedData.districtCensus2011Code
          : null,

        id: selectedData.id,
      }
      setSelectedData(districtData)

      setIsDataModified(true)
    }
  }, [isUpdateModalOpen])

  return (
    <>
      <div className='container mx-auto px-4 sm:px-8'>
        <div className='py-4'>
          <div className='flex justify-between items-center flex-wrap mb-4'>
            <h2 className='text-2xl font-semibold leading-tight mb-2 sm:mb-0 sm:mr-4'>Districts</h2>
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
            <DistrictTable
              setSelectedData={setSelectedData}
              setIsUpdateModalOpen={setIsUpdateModalOpen}
              categoriesData={data}
              handleDelete={onDeleteDistrict}
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
          label='Create District'
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          fields={createFields}
          onSubmit={handleCreateDistrict}
        />
      )}
      {isUpdateModalOpen && isDataModified && (
        <DynamicModal
          label='Update District'
          isOpen={isUpdateModalOpen}
          onClose={() => setIsUpdateModalOpen(false)}
          fields={updateFields}
          defaultValues={selectedData}
          onSubmit={handleEditDistrict}
        />
      )}
    </>
  )
}
const District: React.FC = () => {
  return (
    <>
      <DashboardWrapper customComponent={Custom} selectedItem={'/district'}></DashboardWrapper>
    </>
  )
}

export default District
