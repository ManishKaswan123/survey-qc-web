import React, {useState, useEffect, useMemo, useCallback} from 'react'
import Pagination from 'sr/helpers/ui-components/dashboardComponents/Pagination'
import {Spinner} from 'sr/helpers/ui-components/Spinner'
import {AiOutlineFilter, AiOutlinePlus} from 'react-icons/ai'
import {Button} from 'sr/helpers'
import Filter from 'sr/helpers/ui-components/Filter'
import {toast} from 'react-toastify'
import DashboardWrapper from 'app/pages/dashboard/DashboardWrapper'
import {FieldsArray} from 'sr/constants/fields'
// import {createAppConfig} from 'sr/utils/api/createAppConfig'
import DynamicModal from 'sr/helpers/ui-components/DynamicPopUpModal'
// import {fetchAppConfig} from 'sr/utils/api/fetchAppConfig'
import AppConfigHistoryTable from './appConfigHistoryTable'
// import {deleteAppConfig} from 'sr/utils/api/deleteAppConfig'
import { fetchUser } from '../user/user.helpers/fetchUser'
import { createAppConfig } from 'sr/utils/api/createAppConfig'
import { fetchAppConfig } from 'sr/utils/api/fetchAppConfig'
import { deleteAppConfig } from 'sr/utils/api/deleteAppConfig'

interface AppConfigHistoryProps {
  title: string
  descriptions: string
  code: string
  isForceUpdate: boolean
  isActive: boolean
  createdAt: string
  updatedAt: string
  id: string
}

const Custom: React.FC = () => {
  const [data, setData] = useState<any>()
  const [loading, setLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
  const [totalResults, setTotalResults] = useState(0)
  const [filters, setFilters] = useState({})
  const [isFilterVisible, setIsFilterVisible] = useState(false)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [isChanged, setisChanged] = useState<any>(false)
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [userData, setUserData] = useState<any>([])
  const [selectedData, setSelectedData] = useState<any>({})
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false)

  const isActive = useMemo(
    () => [
      {id: true, name: 'Active'},
      {id: false, name: 'Inactive'},
    ],
    []
  )

  const fields: FieldsArray = useMemo(
    () => [
      {
        type: 'dropdown',
        label: 'isActive',
        name: isActive,
        topLabel: 'Status',
        placeholder: 'Select Status',
      },
      {type: 'number', label: 'Version', name: 'version', placeholder: 'Version'},
      // {
      //   type: 'dropdown',
      //   label: 'createdBy',
      //   name: userData ? userData : [],
      //   topLabel: 'Created By',
      //   placeholder: 'Select Created By',
      //   labelKey: 'firstName',
      //   id: '_id',
      // },
      // {type: 'text', label: 'Sort By', name: 'sortBy', placeholder: 'Sort By'},
    ],
    [isActive, userData]
  )
  const createFields: FieldsArray = useMemo(
    () => [
      {
        type: 'text',
        label: 'Descriptions',
        name: 'descriptions',
        placeholder: 'descriptions',
        required: true,
      },

      {
        type: 'textArea',
        label: 'Config',
        name: 'config',
        placeholder: 'Config',
        required: true,
      },
    ],
    []
  )

  const fetchData = useCallback(async () => {
    try {
      const payload = {
        limit: itemsPerPage,
        page: currentPage,
        ...filters,
      }
      const response = await fetchAppConfig(payload)
      setData(response.results)
      setTotalPages(response?.totalPages)
      setTotalResults(response?.totalResults)
      setTotalPages(response?.totalPages)
    } catch (error) {
      console.error('Error fetching mobile app config history:', error)
    } finally {
    }
  }, [currentPage, filters, itemsPerPage])

  // const fetchUserDataIfNeeded = useCallback(() => {
  //   if (userStatus !== 'succeeded') {
  //     fetchUserData({})
  //   }
  // }, [userStatus])

  useEffect(() => {
    setLoading(true)
    fetchData().then(() => setLoading(false))
  }, [currentPage, filters, itemsPerPage, isChanged])
  useEffect(() => {
    // setLoading(true)
    fetchUser({getAll: true}).then((res) => {
      setUserData(res.results.results)
    })
  }, [])

  // useEffect(() => {
  //   fetchUserDataIfNeeded()
  // }, [])
  const handleApplyFilter = (newFilters: any) => {
    setFilters(newFilters)
    setCurrentPage(1)
    setIsFilterVisible(false)
  }
  const onPageChange = async (pageNumber: number) => {
    setLoading(true)
    setCurrentPage(pageNumber)
  }

  const onLimitChange = (newLimit: number) => {
    setItemsPerPage(newLimit)
    setCurrentPage(1)
  }

  const onDeleteAppConfigHistory = async (id: string) => {
    setLoading(true)
    await deleteAppConfig(id)
    setLoading(false)
    setisChanged(!isChanged)
    toast.success(`App config history deleted successfully`)
  }
  const handleCreateAppConfig = async (payload: any) => {
    try {
      const data = {
        descriptions: payload.descriptions,
        config: JSON.parse(payload.config),
      }
      await createAppConfig(data)
      console.log(data)
      setisChanged(!isChanged)
      toast.success('App Config created successfully')
    } catch (e) {
      console.error('Failed to create app config', e)
    } finally {
      setIsCreateModalOpen(false)
    }
  }

  return (
    <>
      <div className='container mx-auto px-4 sm:px-8'>
        <div className='py-4'>
          <div className='flex justify-between items-center flex-wrap mb-4'>
            <h2 className='text-2xl font-semibold leading-tight mb-2 sm:mb-0 sm:mr-4'>
              Mobile App Config History
            </h2>
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
                fields={fields}
              />
            </div>
          )}
          {loading ? (
            <Spinner />
          ) : (
            <AppConfigHistoryTable
              setSelectedData={setSelectedData}
              setIsUpdateModalOpen={setIsUpdateModalOpen}
              data={data}
              onDelete={onDeleteAppConfigHistory}
            />
          )}
        </div>
        {!loading && (
          <>
            {totalResults > 0 ? (
              <Pagination
                totalResults={totalResults}
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={onPageChange}
                itemsPerPage={itemsPerPage}
                name='App Config History'
                onLimitChange={onLimitChange}
                disabled={loading}
              />
            ) : (
              <div className='items-center text-center text-xl mt-auto'>No Result Found</div>
            )}
          </>
        )}
      </div>
      {/* {showPopup && <BusinessCategoryForm />} */}
      {isCreateModalOpen && (
        <DynamicModal
          label='Create App Config'
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          fields={createFields}
          onSubmit={handleCreateAppConfig}
        />
      )}
    </>
  )
}
const AppConfigHistory: React.FC = () => {
  return (
    <>
      <DashboardWrapper
        customComponent={Custom}
        selectedItem={'/mobile-app-config-history'}
      ></DashboardWrapper>
    </>
  )
}

export default AppConfigHistory
