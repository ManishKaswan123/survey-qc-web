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
import {useSelector} from 'react-redux'
import {RootState} from 'sr/redux/store'
import {useActions} from 'sr/utils/helpers/useActions'
// import {fetchSubDistrict} from 'sr/utils/api/fetchSubDistrict'
// import {fetchDistrict} from 'sr/utils/api/fetchDistrict'
// import {deleteVillage} from 'sr/utils/api/deleteVillage'
// import {createVillage} from 'sr/utils/api/createVillage'
// import {updateVillage} from 'sr/utils/api/updateVillage'
// import {fetchVillage} from 'sr/utils/api/fetchVillage'
// import {deleteContactUs} from 'sr/utils/api/deleteContactUs'

import ContactUsTable from './ContactUsTable'
import {set} from 'react-hook-form'
import { deleteContactUs } from 'sr/utils/api/deleteContactUs'
import { createContactUs } from 'sr/utils/api/createContactUs'
import { updateContactUs } from 'sr/utils/api/updateContactUs'
import { fetchContactUs } from 'sr/utils/api/fetchContactUs'
interface FiltersType {
  categoryId?: string
  cropId?: string
  isActive?: boolean
  sortBy?: string
}

const Custom: React.FC = () => {
  const [data, setData] = useState<any>([])
  const [loading, setLoading] = useState(false)
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
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | undefined>()
  const [selectedCropData, setSelectedCropData] = useState<Record<string, string>[] | undefined>()
  const [filters, setFilters] = useState<FiltersType>({} as FiltersType)
  // const stateData = useSelector((state: RootState) => state.state.data)
  // const stateStatus = useSelector((state: RootState) => state.state.status)
  // const userData = useSelector((state: RootState) => state.user.data)
  // const userStatus = useSelector((state: RootState) => state.user.status)
  // const {fetchStateData, fetchUserData} = useActions()

  const fields: FieldsArray = useMemo(
    () => [
      {
        type: 'dropdown',
        label: 'categoryId',
        name: [
          {name: 'Rabi', id: 'Rabi'},
          {name: 'Kharif', id: 'Kharif'},
        ],
        topLabel: 'Category',
        placeholder: 'Select Category',
        onChange: (e: React.ChangeEvent<HTMLSelectElement>) => {
          const value = e.target.value
          setSelectedCategoryId(value)
        },
      },
      {
        type: 'dropdown',
        label: 'cropId',
        name: selectedCropData || [],
        topLabel: 'Crop',
        placeholder: 'Select Crop',
      },
      {
        type: 'dropdown',
        label: 'isActive',
        name: [
          {id: true, name: 'Active'},
          {id: false, name: 'Inactive'},
        ],
        topLabel: 'Status',
        placeholder: 'Select Status',
        labelKey: 'name',
        id: 'id',
      },

      {
        type: 'dropdown',
        label: 'sortBy',
        name: [
          {
            name: 'Category',
            id: 'categoryId',
          },
          {
            name: 'Crop',
            id: 'cropId',
          },
        ],
        topLabel: 'Sort By',
        placeholder: 'Select Sort By',
      },
    ],
    [selectedCategoryId, selectedCropData]
  )

  const createFields: FieldsArray = useMemo(
    () => [
      {
        type: 'dropdown',
        label: 'categoryId',
        name: [
          {name: 'Rabi', id: 'Rabi'},
          {name: 'Kharif', id: 'Kharif'},
        ],
        topLabel: 'Category',
        placeholder: 'Select Category',
        onChange: (e: React.ChangeEvent<HTMLSelectElement>) => {
          const value = e.target.value
          console.log('inside createFields', value)
          setSelectedCategoryId(value)
        },
      },
      {
        type: 'dropdown',
        label: 'cropId',
        name: selectedCropData || [],
        topLabel: 'Crop',
        placeholder: 'Select Crop',
      },
      {
        type: 'text',
        label: 'Query Text',
        name: 'queryText',
        placeholder: 'Enter Query Text',
        required: true,
      },
    ],
    [selectedCategoryId, selectedCropData]
  )

  const updateFields: FieldsArray = useMemo(
    () => [
      {
        type: 'dropdown',
        label: 'categoryId',
        name: [
          {name: 'Rabi', id: 'Rabi'},
          {name: 'Kharif', id: 'Kharif'},
        ],
        topLabel: 'Category',
        placeholder: 'Select Category',
        onChange: (e: React.ChangeEvent<HTMLSelectElement>) => {
          const value = e.target.value
          // setSelectedCategoryId(value)
          // setSelectedCropData([])
          setSelectedData({...selectedData, categoryId: value, cropId: undefined})
        },
      },
      {
        type: 'dropdown',
        label: 'cropId',
        name: selectedCropData || [],
        topLabel: 'Crop',
        placeholder: 'Select Crop',
      },
      {
        type: 'text',
        label: 'Query Text',
        name: 'queryText',
        placeholder: 'Enter Query Text',
        required: true,
      },
      {
        type: 'text',
        label: 'Reply Text',
        name: 'replyText',
        placeholder: 'Enter Reply Text',
        required: true,
      },
      {
        type: 'dropdown',
        label: 'isActive',
        name: [
          {id: true, name: 'Active'},
          {id: false, name: 'Inactive'},
        ],
        topLabel: 'Status',
        placeholder: 'Select Status',
      },
    ],
    [selectedCategoryId, selectedCropData]
  )
  const fetchCropData = (categoryId: string | undefined) => {
    if (categoryId) {
      setSelectedCropData([
        categoryId == 'Kharif' ? {name: 'Rice', id: 'Rice'} : {name: 'Wheat', id: 'Wheat'},
      ])
    }
  }
  useEffect(() => {
    fetchCropData(selectedCategoryId)
    // if (!isFilterVisible && !isCreateModalOpen && !isUpdateModalOpen) {
    //   setSelectedCategoryId(undefined)
    //   setSelectedCropData([])
    // }
  }, [selectedCategoryId])
  useEffect(() => {
    if (selectedData?.categoryId) setSelectedCategoryId(selectedData?.categoryId)
  }, [selectedData])

  const onPageChange = async (pageNumber: number) => {
    setCurrentPage(pageNumber)
  }

  const onLimitChange = (newLimit: number) => {
    setItemsPerPage(newLimit)
    setCurrentPage(1)
  }

  const onDeleteContactUs = async (id: string) => {
    setLoading(true)
    await deleteContactUs(id)
    setLoading(false)
    setisChanged(!isChanged)
    toast.success(`Contact Us deleted successfully`)
  }
  const handleApplyFilter = (newFilters: any) => {
    console.log('applying filter', newFilters)
    if (Object.keys(newFilters).length == 0) setSelectedCategoryId(undefined)
    setFilters(newFilters)
    setCurrentPage(1)
    setIsFilterVisible(false) // Hide filter after applying
  }
  const handleCreateContactUs = async (payload: any) => {
    const contactUsData: {
      categoryId?: string
      cropId?: string
      queryText: string
    } = {
      categoryId: payload.categoryId,
      cropId: payload.cropId,
      queryText: payload.queryText,
    }

    try {
      await createContactUs(contactUsData)
      setisChanged(!isChanged)
      toast.success('Contact Us created successfully')
    } catch (e) {
      console.error('Failed to create contact us', e)
    } finally {
      setIsCreateModalOpen(false)
    }
  }
  const handleEditContactUs = async (payload: any) => {
    const contactUsData: {
      categoryId?: string
      cropId?: string
      queryText: string
      replyText: string
      isActive: boolean
    } = {
      categoryId: payload.categoryId,
      cropId: payload.cropId,
      queryText: payload.queryText,
      replyText: payload.replyText,
      isActive: payload.isActive,
    }

    try {
      await updateContactUs(contactUsData, selectedData.id)
      setisChanged(!isChanged)
      toast.success('Contact Us updated successfully')
    } catch (e) {
      console.error('Failed to update contact us', e)
    } finally {
      setIsCreateModalOpen(false)
    }
  }
  const fetchData = useCallback(async () => {
    try {
      const payload = {
        limit: itemsPerPage,
        page: currentPage,
        ...filters,
      }
      const response = await fetchContactUs(payload)
      setData(response.results)
      setTotalPages(response?.totalPages)
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
      toast.error('Error fetching contact us data')
    } finally {
    }
  }, [itemsPerPage, currentPage, filters])
  const fetchDataIfNeeded = useCallback(() => {
    // if (stateStatus != 'succeeded') fetchStateData()
    // if (userStatus != 'succeeded') fetchUserData({})
  }, [])
  useEffect(() => {
    fetchDataIfNeeded()
  }, [])
  useEffect(() => {
    setLoading(true)
    fetchData().then(() => setLoading(false))
  }, [currentPage, isChanged, filters, itemsPerPage])

  useEffect(() => {
    setIsDataModified(false)
    if (isUpdateModalOpen && selectedData) {
      const contactUsData: {
        categoryId?: string
        cropId?: string
        queryText?: string
        replyText?: string
        isActive?: boolean
        createdBy?: Record<string, any>
        id: string
      } = {
        categoryId: selectedData.categoryId,
        cropId: selectedData.cropId,
        queryText: selectedData.queryText,
        replyText: selectedData.replyText,
        isActive: selectedData.isActive,
        createdBy: selectedData.createdBy,
        id: selectedData.id,
      }
      setSelectedData(contactUsData)
      setIsDataModified(true)
    }
  }, [isUpdateModalOpen])
  // console.log('userData', userData?.results)

  return (
    <>
      <div className='container mx-auto px-4 sm:px-8'>
        <div className='py-4'>
          <div className='flex justify-between items-center flex-wrap mb-4'>
            <h2 className='text-2xl font-semibold leading-tight mb-2 sm:mb-0 sm:mr-4'>
              Complaints
            </h2>
            <div className='flex items-center'>
              <Button
                label='Create new'
                Icon={AiOutlinePlus}
                onClick={() => {
                  setSelectedData({})
                  // setSelectedCategoryId(undefined)
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
            <ContactUsTable
              setSelectedData={setSelectedData}
              setIsUpdateModalOpen={setIsUpdateModalOpen}
              categoriesData={data}
              handleDelete={onDeleteContactUs}
              topicName='Contact Us'
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
                name='Contact Us'
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
          label='Create Contact Us'
          isOpen={isCreateModalOpen}
          onClose={() => {
            setSelectedCategoryId(undefined)
            setSelectedCropData([])
            setIsCreateModalOpen(false)
          }}
          fields={createFields}
          onSubmit={handleCreateContactUs}
        />
      )}
      {isUpdateModalOpen && isDataModified && (
        <DynamicModal
          label='Update Contact Us'
          isOpen={isUpdateModalOpen}
          onClose={() => {
            // setDistrictData({})
            // setSubDistrictData({})
            setSelectedCategoryId(undefined)
            setSelectedCropData([])
            setSelectedData({})
            setIsUpdateModalOpen(false)
          }}
          fields={updateFields}
          defaultValues={selectedData}
          onSubmit={handleEditContactUs}
        />
      )}
    </>
  )
}
const ContactUs: React.FC = () => {
  return (
    <>
      <DashboardWrapper customComponent={Custom} selectedItem={'/village'}></DashboardWrapper>
    </>
  )
}

export default ContactUs
