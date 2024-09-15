import React, {useCallback, useEffect, useMemo, useState} from 'react'
import {AiOutlinePlus, AiOutlineFilter} from 'react-icons/ai'

import Pagination from 'sr/helpers/ui-components/dashboardComponents/Pagination'
import {Spinner} from 'sr/helpers/ui-components/Spinner'
import DashboardWrapper from 'app/pages/dashboard/DashboardWrapper'
import {toast} from 'react-toastify'
import {Button} from 'sr/helpers'
import Filter from 'sr/helpers/ui-components/Filter'
import DynamicModal from 'sr/helpers/ui-components/DynamicPopUpModal'
import {FieldsArray} from 'sr/constants/fields'
import SubDistrictTable from './SubDistrictTable'
import {useSelector} from 'react-redux'
// import {RootState} from 'sr/redux/store'
import {useActions} from 'sr/utils/helpers/useActions'
import {deleteSubDistrict} from 'sr/utils/api/deleteSubDistrict'
import { createSubDistrict } from 'sr/utils/api/createSubDistrict'
import { updateSubDistrict } from 'sr/utils/api/updateSubDistrict'
import { fetchSubDistrict } from 'sr/utils/api/fetchSubDistrict'
import { fetchDistrict } from 'sr/utils/api/fetchDistrict'
import { RootState } from 'sr/redux/store'


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
  // @ts-ignore
  const stateData = useSelector((state: RootState) => state.state.data)
    // @ts-ignore
  const stateStatus = useSelector((state: RootState) => state.state.status)
  const [selectedState, setSelectedState] = useState<any>(null)
  const [districtData, setDistrictData] = useState<any>([])
  const {fetchStateData} = useActions()

  const fields: FieldsArray = useMemo(
    () => [
      {
        type: 'dropdown',
        label: 'stateCode',
        name: stateData?.results,
        topLabel: 'State',
        placeholder: 'Select State',
        labelKey: 'stateName',
        id: 'stateCode',
      },
      {
        type: 'dropdown',
        label: 'districtCode',
        name: districtData,
        topLabel: 'District',
        placeholder: 'Select District',
        labelKey: 'districtName',
        id: 'districtCode',
      },
      {
        type: 'text',
        label: 'Sub District Name',
        name: 'subDistrictName',
        placeholder: 'Sub District Name',
      },

      {
        type: 'dropdown',
        label: 'sortBy',
        name: [
          {
            name: 'State Code',
            id: 'stateCode',
          },
          {
            name: 'District Code',
            id: 'districtCode',
          },

          {
            name: 'Sub District Code',
            id: 'subDistrictCode',
          },
          {
            name: 'Sub District Name',
            id: 'subDistrictName',
          },
        ],
        topLabel: 'Sort By',
        placeholder: 'Select Sort By',
      },
    ],
    [stateData, districtData]
  )

  const createFields: FieldsArray = useMemo(
    () => [
      {
        type: 'dropdown',
        label: 'stateCode',
        name: stateData?.results,
        topLabel: 'State',
        placeholder: 'Select State',
        labelKey: 'stateName',
        id: 'stateCode',
        required: true,
      },
      {
        type: 'dropdown',
        label: 'districtCode',
        name: districtData,
        topLabel: 'District',
        placeholder: 'Select District',
        labelKey: 'districtName',
        id: 'districtCode',
        required: true,
      },
      {
        type: 'text',
        label: 'Sub District Name',
        name: 'subDistrictName',
        placeholder: 'Enter Sub District Name',
        required: true,
      },
      {
        type: 'number',
        label: 'Sub District Code',
        name: 'subDistrictCode',
        placeholder: 'Enter Sub District Code',
        required: true,
      },
      {
        type: 'number',
        label: 'Sub District Version',
        name: 'subDistrictVersion',
        placeholder: 'Enter Sub District Version',
        required: true,
      },
      {
        type: 'number',
        label: 'Sub District Census2001 Code',
        name: 'subDistrictCensus2001Code',
        placeholder: 'Enter Sub District Census2001Code',
      },
      {
        type: 'number',
        label: 'Sub District Census2011 Code',
        name: 'subDistrictCensus2011Code',
        placeholder: 'Enter Sub District Census2011Code',
      },
    ],
    [stateData, districtData]
  )

  const updateFields: FieldsArray = useMemo(
    () => [
      {
        type: 'dropdown',
        label: 'stateCode',
        name: stateData?.results,
        topLabel: 'State',
        placeholder: 'Select State',
        labelKey: 'stateName',
        id: 'stateCode',
        required: true,
      },
      {
        type: 'dropdown',
        label: 'districtCode',
        name: districtData,
        topLabel: 'District',
        placeholder: 'Select District',
        labelKey: 'districtName',
        id: 'districtCode',
        required: true,
      },
      {
        type: 'text',
        label: 'Sub District Name',
        name: 'subDistrictName',
        placeholder: 'Enter Sub District Name',
        required: true,
      },
      {
        type: 'number',
        label: 'Sub District Code',
        name: 'subDistrictCode',
        placeholder: 'Enter Sub District Code',
        required: true,
      },
      {
        type: 'number',
        label: 'Sub District Version',
        name: 'subDistrictVersion',
        placeholder: 'Enter Sub District Version',
        required: true,
      },
      {
        type: 'number',
        label: 'Sub District Census2001 Code',
        name: 'subDistrictCensus2001Code',
        placeholder: 'Enter Sub District Census2001Code',
        required: true,
      },
      {
        type: 'number',
        label: 'Sub District Census2011 Code',
        name: 'subDistrictCensus2011Code',
        placeholder: 'Enter Sub District Census2011Code',
        required: true,
      },
    ],
    [stateData, districtData]
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

  const onDeleteSubDistrict = async (id: string) => {
    setLoading(true)
    await deleteSubDistrict(id)
    setLoading(false)
    setisChanged(!isChanged)
    toast.success(`Sub District deleted successfully`)
  }
  const handleApplyFilter = (newFilters: any) => {
    // console.log('applying filter', newFilters)
    setFilters(newFilters)
    setCurrentPage(1)
    setIsFilterVisible(false) // Hide filter after applying
  }
  const handleCreateSubDistrict = async (payload: any) => {
    const subDistrictData: {
      districtCode: number
      stateCode: number
      subDistrictName: string
      subDistrictCode: number
      subDistrictVersion: number
      subDistrictCensus2001Code?: number
      subDistrictCensus2011Code?: number
    } = {
      districtCode: parseInt(payload.districtCode),
      stateCode: parseInt(payload.stateCode),
      subDistrictName: payload.subDistrictName,
      subDistrictCode: parseInt(payload.subDistrictCode),
      subDistrictVersion: parseInt(payload.districtVersion),
      subDistrictCensus2001Code: payload.subDistrictCensus2001Code
        ? parseInt(payload.subDistrictCensus2001Code)
        : undefined,
      subDistrictCensus2011Code: payload.subDistrictCensus2011Code
        ? parseInt(payload.subDistrictCensus2011Code)
        : undefined,
    }

    try {
      await createSubDistrict(districtData)
      setisChanged(!isChanged)
      toast.success('Sub District created successfully')
    } catch (e) {
      console.error('Failed to create sub district', e)
    } finally {
      setIsCreateModalOpen(false)
    }
  }
  const handleEditSubDistrict = async (payload: any) => {
    const subDistrictData: {
      districtCode: number
      stateCode: number
      subDistrictName: string
      subDistrictCode: number
      subDistrictVersion: number
      subDistrictCensus2001Code?: number
      subDistrictCensus2011Code?: number
    } = {
      districtCode: parseInt(payload.districtCode),
      stateCode: parseInt(payload.stateCode),
      subDistrictName: payload.subDistrictName,
      subDistrictCode: parseInt(payload.subDistrictCode),
      subDistrictVersion: parseInt(payload.subDistrictVersion),
      subDistrictCensus2001Code: payload.subDistrictCensus2001Code
        ? parseInt(payload.subDistrictCensus2001Code)
        : undefined,
      subDistrictCensus2011Code: payload.subDistrictCensus2011Code
        ? parseInt(payload.subDistrictCensus2011Code)
        : undefined,
    }

    try {
      await updateSubDistrict(subDistrictData, selectedData.id)
      setisChanged(!isChanged)
      toast.success('Sub District updated successfully')
    } catch (e) {
      console.error('Failed to update sub district', e)
    } finally {
      setIsCreateModalOpen(false)
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
      const response = await fetchSubDistrict(payload)
      setData(response.results)
      setTotalPages(response.totalPages)
      if (response?.totalResults) {
        setTotalResults(response?.totalResults)
      } else {
        setTotalResults(0)
      }
      if (response.results.length === 0) {
        setCurrentPage((prev: number) => {
          if (prev > 1) {
            return prev - 1
          }
          return 1
        })
      }
    } catch (error) {
      toast.error('Error fetching sub district')
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
    if (selectedState) {
      fetchDistrict({
        getAll: true,
        stateCode: parseInt(selectedState),
        projectBy: 'districtCode,districtName',
      }).then((response) => {
        setDistrictData(response.results)
        if (selectedData.stateCode !== parseInt(selectedState)) {
          setSelectedData({
            ...selectedData,
            stateCode: parseInt(selectedState),
            districtCode: undefined,
          })
        }
      })
    }
  }, [selectedState])

  useEffect(() => {
    setIsDataModified(false)
    if (isUpdateModalOpen && selectedData) {
      const subDistrictData: {
        districtCode: number
        stateCode: number
        subDistrictName: string
        subDistrictCode: number
        subDistrictVersion: number
        subDistrictCensus2001Code?: number
        subDistrictCensus2011Code?: number
        id: number
      } = {
        districtCode: parseInt(selectedData.districtCode),
        stateCode: parseInt(selectedData.stateCode),
        subDistrictName: selectedData.subDistrictName,
        subDistrictCode: parseInt(selectedData.subDistrictCode),
        subDistrictVersion: parseInt(selectedData.subDistrictVersion),
        subDistrictCensus2001Code: selectedData.subDistrictCensus2001Code
          ? parseInt(selectedData.subDistrictCensus2001Code)
          : undefined,
        subDistrictCensus2011Code: selectedData.subDistrictCensus2011Code
          ? parseInt(selectedData.subDistrictCensus2011Code)
          : undefined,
        id: selectedData.id,
      }
      setSelectedData(subDistrictData)
      setIsDataModified(true)
    }
  }, [isUpdateModalOpen])

  return (
    <>
      <div className='container mx-auto px-4 sm:px-8'>
        <div className='py-4'>
          <div className='flex justify-between items-center flex-wrap mb-4'>
            <h2 className='text-2xl font-semibold leading-tight mb-2 sm:mb-0 sm:mr-4'>
              Sub Districts
            </h2>
            <div className='flex items-center'>
              <Button
                label='Create new'
                Icon={AiOutlinePlus}
                onClick={() => {
                  setSelectedData({})
                  setDistrictData([])
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
                setSelectedState={setSelectedState}
              />
            </div>
          )}
          {loading ? (
            <Spinner />
          ) : (
            <SubDistrictTable
              setSelectedData={setSelectedData}
              setIsUpdateModalOpen={setIsUpdateModalOpen}
              categoriesData={data}
              handleDelete={onDeleteSubDistrict}
              topicName='Sub District'
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
                name='Sub District'
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
          label='Create Sub District'
          isOpen={isCreateModalOpen}
          onClose={() => {
            // setDistrictData({})
            setIsCreateModalOpen(false)
          }}
          fields={createFields}
          onSubmit={handleCreateSubDistrict}
          setSelectedState={setSelectedState}
        />
      )}
      {isUpdateModalOpen && isDataModified && (
        <DynamicModal
          label='Update Sub District'
          isOpen={isUpdateModalOpen}
          onClose={() => {
            // setDistrictData({})
            setIsUpdateModalOpen(false)
          }}
          fields={updateFields}
          defaultValues={selectedData}
          onSubmit={handleEditSubDistrict}
          setSelectedState={setSelectedState}
        />
      )}
    </>
  )
}
const SubDistrict: React.FC = () => {
  return (
    <>
      <DashboardWrapper customComponent={Custom} selectedItem={'/subDistrict'}></DashboardWrapper>
    </>
  )
}

export default SubDistrict
