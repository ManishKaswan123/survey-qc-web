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
import {RootState} from 'sr/redux/store'
import {useActions} from 'sr/utils/helpers/useActions'

import VillageTable from './VillageTable'
import {fetchSubDistrict} from 'sr/utils/api/fetchSubDistrict'
import {deleteVillage} from 'sr/utils/api/deleteVillage'
import {createVillage} from 'sr/utils/api/createVillage'
import {updateVillage} from 'sr/utils/api/updateVillage'
import {fetchVillage} from 'sr/utils/api/fetchVillage'
import {fetchDistrict} from 'sr/utils/api/fetchDistrict'
import {useSelector} from 'react-redux'
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
  const [selectedDistrict, setSelectedDistrict] = useState<any>(null)
  const [districtData, setDistrictData] = useState<any>([])
  const [subDistrictData, setSubDistrictData] = useState<any>({})
  const {fetchStateData} = useActions()

  const fields: FieldsArray = useMemo(
    () => [
      {
        type: 'text',
        label: 'Village Name',
        name: 'villageName',
        placeholder: 'Village Name',
      },
      {
        type: 'text',
        label: 'Village Code',
        name: 'villageCode',
        placeholder: 'Village Code',
      },

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
        type: 'dropdown',
        label: 'subDistrictCode',
        name: subDistrictData,
        topLabel: 'Sub District',
        placeholder: 'Select Sub District',
        labelKey: 'subDistrictName',
        id: 'subDistrictCode',
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
            name: 'Village Code',
            id: 'villageCode',
          },
          {
            name: 'Village Name',
            id: 'villageName',
          },
        ],
        topLabel: 'Sort By',
        placeholder: 'Select Sort By',
      },
    ],
    [stateData, districtData, subDistrictData]
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
        type: 'dropdown',
        label: 'subDistrictCode',
        name: subDistrictData,
        topLabel: 'Sub District',
        placeholder: 'Select Sub District',
        labelKey: 'subDistrictName',
        id: 'subDistrictCode',
        required: true,
      },

      {
        type: 'text',
        label: 'Village Name',
        name: 'villageName',
        placeholder: 'Enter Village Name',
        required: true,
      },
      {
        type: 'text',
        label: 'Village Code',
        name: 'villageCode',
        placeholder: 'Enter Village Code',
        required: true,
      },
      {
        type: 'number',
        label: 'Village Version',
        name: 'villageVersion',
        placeholder: 'Enter Village Version',
        required: true,
      },
      {
        type: 'number',
        label: 'Village Census2001 Code',
        name: 'villageCensus2001Code',
        placeholder: 'Village Census2001Code',
      },
      {
        type: 'number',
        label: 'Vilage Census2011 Code',
        name: 'villageCensus2011Code',
        placeholder: 'Village Census2011Code',
      },
    ],
    [stateData, districtData, subDistrictData]
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
        type: 'dropdown',
        label: 'subDistrictCode',
        name: subDistrictData,
        topLabel: 'Sub District',
        placeholder: 'Select Sub District',
        labelKey: 'subDistrictName',
        id: 'subDistrictCode',
        required: true,
      },

      {
        type: 'text',
        label: 'Village Name',
        name: 'villageName',
        placeholder: 'Enter Village Name',
        required: true,
      },
      {
        type: 'text',
        label: 'Village Code',
        name: 'villageCode',
        placeholder: 'Enter Village Code',
        required: true,
      },
      {
        type: 'number',
        label: 'Village Version',
        name: 'villageVersion',
        placeholder: 'Enter Village Version',
        required: true,
      },
      {
        type: 'number',
        label: 'Village Census2001 Code',
        name: 'villageCensus2001Code',
        placeholder: 'Village Census2001Code',
      },
      {
        type: 'number',
        label: 'Vilage Census2011 Code',
        name: 'villageCensus2011Code',
        placeholder: 'Village Census2011Code',
      },
    ],
    [stateData, districtData, subDistrictData]
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

  const onDeleteVillage = async (id: string) => {
    setLoading(true)
    await deleteVillage(id)
    setLoading(false)
    setisChanged(!isChanged)
    toast.success(`Village deleted successfully`)
  }
  const handleApplyFilter = (newFilters: any) => {
    // console.log('applying filter', newFilters)
    setFilters(newFilters)
    setCurrentPage(1)
    setIsFilterVisible(false) // Hide filter after applying
  }
  const handleCreateVillage = async (payload: any) => {
    const villageData: {
      stateCode: number
      districtCode: number
      subDistrictCode: number
      villageName: string
      villageCode: number
      villageVersion: number
      villageCensus2001Code?: number
      villageCensus2011Code?: number
    } = {
      stateCode: parseInt(payload.stateCode),
      districtCode: parseInt(payload.districtCode),
      subDistrictCode: parseInt(payload.subDistrictCode),
      villageName: payload.villageName,
      villageCode: parseInt(payload.villageCode),
      villageVersion: parseInt(payload.villageVersion),
      villageCensus2001Code: payload.villageCensus2001Code
        ? parseInt(payload.villageCensus2001Code)
        : undefined,
      villageCensus2011Code: payload.villageCensus2011Code
        ? parseInt(payload.villageCensus2011Code)
        : undefined,
    }

    try {
      await createVillage(villageData)
      setisChanged(!isChanged)
      toast.success('Village created successfully')
    } catch (e) {
      console.error('Failed to create village', e)
    } finally {
      setIsCreateModalOpen(false)
    }
  }
  const handleEditVillage = async (payload: any) => {
    const villageData: {
      stateCode: number
      districtCode: number
      subDistrictCode: number
      villageName: string
      villageCode: number
      villageVersion: number
      villageCensus2001Code?: number
      villageCensus2011Code?: number
    } = {
      stateCode: parseInt(payload.stateCode),
      districtCode: parseInt(payload.districtCode),
      subDistrictCode: parseInt(payload.subDistrictCode),
      villageName: payload.villageName,
      villageCode: parseInt(payload.villageCode),
      villageVersion: parseInt(payload.villageVersion),
      villageCensus2001Code: payload.villageCensus2001Code
        ? parseInt(payload.villageCensus2001Code)
        : undefined,
      villageCensus2011Code: payload.villageCensus2011Code
        ? parseInt(payload.villageCensus2011Code)
        : undefined,
    }

    try {
      await updateVillage(villageData, selectedData.id)
      setisChanged(!isChanged)
      toast.success('Village updated successfully')
    } catch (e) {
      console.error('Failed to update village', e)
    } finally {
      setIsCreateModalOpen(false)
    }
  }
  const fetchData = useCallback(async () => {
    // setLoading(true)
    try {
      const payload = {
        limit: itemsPerPage,
        page: currentPage,
        // getAll: true,
        ...filters,
      }
      // console.log('Fetching data with payload:', payload) // Debug statement
      const response = await fetchVillage(payload)
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
      toast.error('Error fetching village data')
    } finally {
      // setLoading(false)
    }
  }, [itemsPerPage, currentPage, filters, isChanged])
  const fetchDataIfNeeded = useCallback(() => {
    if (stateStatus != 'succeeded') fetchStateData()
  }, [stateStatus])
  useEffect(() => {
    fetchDataIfNeeded()
  }, [])
  useEffect(() => {
    setLoading(true)
    fetchData().then(() => setLoading(false))
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
            subDistrictCode: undefined,
          })
        }
      })
    }
  }, [selectedState])
  useEffect(() => {
    if (selectedState && selectedDistrict) {
      fetchSubDistrict({
        getAll: true,
        stateCode: parseInt(selectedState),
        districtCode: parseInt(selectedDistrict),
        projectBy: 'subDistrictCode,subDistrictName',
      }).then((response) => {
        setSubDistrictData(response.results)
        if (selectedData.districtCode !== parseInt(selectedDistrict)) {
          setSelectedData({
            ...selectedData,
            districtCode: parseInt(selectedDistrict),
            subDistrictCode: undefined,
          })
        }
      })
    }
  }, [selectedDistrict])

  useEffect(() => {
    setIsDataModified(false)
    if (isUpdateModalOpen && selectedData) {
      const villageData: {
        stateCode: number
        districtCode: number
        subDistrictCode: number
        villageName: string
        villageCode: number
        villageVersion: number
        villageCensus2001Code?: number
        villageCensus2011Code?: number
        id: string
      } = {
        stateCode: parseInt(selectedData.stateCode),
        districtCode: parseInt(selectedData.districtCode),
        subDistrictCode: parseInt(selectedData.subDistrictCode),
        villageName: selectedData.villageName,
        villageCode: parseInt(selectedData.villageCode),
        villageVersion: parseInt(selectedData.villageVersion),
        villageCensus2001Code: selectedData.villageCensus2001Code
          ? parseInt(selectedData.villageCensus2001Code)
          : undefined,
        villageCensus2011Code: selectedData.villageCensus2011Code
          ? parseInt(selectedData.villageCensus2011Code)
          : undefined,
        id: selectedData.id,
      }
      setSelectedData(villageData)
      setIsDataModified(true)
    }
  }, [isUpdateModalOpen])

  return (
    <>
      <div className='container mx-auto px-4 sm:px-8'>
        <div className='py-4'>
          <div className='flex justify-between items-center flex-wrap mb-4'>
            <h2 className='text-2xl font-semibold leading-tight mb-2 sm:mb-0 sm:mr-4'>Villages</h2>
            <div className='flex items-center'>
              <Button
                label='Create new'
                Icon={AiOutlinePlus}
                onClick={() => {
                  setSelectedData({})
                  setDistrictData([])
                  setSubDistrictData([])
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
                setSelectedDistrict={setSelectedDistrict}
              />
            </div>
          )}
          {loading ? (
            <Spinner />
          ) : (
            <VillageTable
              setSelectedData={setSelectedData}
              setIsUpdateModalOpen={setIsUpdateModalOpen}
              categoriesData={data}
              handleDelete={onDeleteVillage}
              topicName='Village'
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
                name='Village'
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
          label='Create Village'
          isOpen={isCreateModalOpen}
          onClose={() => {
            // setDistrictData({})
            // setSubDistrictData({})
            setIsCreateModalOpen(false)
          }}
          fields={createFields}
          onSubmit={handleCreateVillage}
          setSelectedState={setSelectedState}
          setSelectedDistrict={setSelectedDistrict}
        />
      )}
      {isUpdateModalOpen && isDataModified && (
        <DynamicModal
          label='Update Village'
          isOpen={isUpdateModalOpen}
          onClose={() => {
            // setDistrictData({})
            // setSubDistrictData({})
            setIsUpdateModalOpen(false)
          }}
          fields={updateFields}
          defaultValues={selectedData}
          onSubmit={handleEditVillage}
          setSelectedState={setSelectedState}
          setSelectedDistrict={setSelectedDistrict}
        />
      )}
    </>
  )
}
const Village: React.FC = () => {
  return (
    <>
      <DashboardWrapper customComponent={Custom} selectedItem={'/village'}></DashboardWrapper>
    </>
  )
}

export default Village
