import React, {useState, useEffect, useMemo, useCallback} from 'react'
import Pagination from 'sr/helpers/ui-components/dashboardComponents/Pagination'
import {Spinner} from 'sr/helpers/ui-components/Spinner'
import {AiOutlineFilter, AiOutlinePlus} from 'react-icons/ai'
import {Button} from 'sr/helpers'
import Filter from 'sr/helpers/ui-components/Filter'
import AppVersionHistoryTable from './AppVersionHistoryTable'
import {deleteAppVersion} from 'sr/utils/api/deleteAppVersion'
import {toast} from 'react-toastify'
import {fetchAppVersion} from 'sr/utils/api/fetchAppVersion'
import DashboardWrapper from 'app/pages/dashboard/DashboardWrapper'
import {FieldsArray} from 'sr/constants/fields'
import {createAppVersion} from 'sr/utils/api/createAppVersion'
import DynamicModal from 'sr/helpers/ui-components/DynamicPopUpModal'
import {useSelector} from 'react-redux'
import {RootState} from 'sr/redux/store'
import {useActions} from 'sr/utils/helpers/useActions'
interface AppVersionHistoryProps {
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
  const userData = useSelector((state: RootState) => state.user.data)
  const userStatus = useSelector((state: RootState) => state.user.status)
  const {fetchUserData} = useActions()

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
      {type: 'text', label: 'Title', name: 'title', placeholder: 'Title'},
      {type: 'text', label: 'Code', name: 'code', placeholder: 'Code'},
      // {
      //   type: 'dropdown',
      //   label: 'createdBy',
      //   name: userData?.results,
      //   topLabel: 'Created By',
      //   placeholder: 'Select Created By',
      //   labelKey: 'firstName',
      //   id: 'id',
      // },

      // {type: 'text', label: 'Sort By', name: 'sortBy', placeholder: 'Sort By'},
    ],
    [isActive, userData]
  )
  const createFields: FieldsArray = useMemo(
    () => [
      {
        type: 'text',
        label: 'Title',
        name: 'title',
        placeholder: 'Title',
        required: true,
      },
      {
        type: 'text',
        label: 'Descriptions',
        name: 'descriptions',
        placeholder: 'Descriptions',
        required: true,
      },
      {
        type: 'text',
        label: 'Code',
        name: 'code',
        placeholder: 'Code',
        required: true,
      },
      {
        type: 'dropdown',
        label: 'isForceUpdate',
        name: [
          {id: true, name: 'Yes'},
          {id: false, name: 'No'},
        ],
        topLabel: 'Force Update',
        placeholder: 'Select Force Update',
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

      const response = await fetchAppVersion(payload)
      setData(response.results)
      setTotalPages(response.totalPages || 0)
      setTotalResults(response.totalResults || 0)
    } catch (error) {
      console.error('Error fetching mobile app version history:', error)
    } finally {
    }
  }, [currentPage, filters, itemsPerPage, isChanged])

  const fetchUserDataIfNeeded = useCallback(() => {
    if (userStatus !== 'succeeded') {
      fetchUserData({})
    }
  }, [userStatus])

  useEffect(() => {
    setLoading(true)
    fetchData().then(() => setLoading(false))
  }, [currentPage, filters, itemsPerPage, isChanged])

  useEffect(() => {
    fetchUserDataIfNeeded()
  }, [])
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

  const onDeleteAppVersionHistory = async (id: string) => {
    setLoading(true)
    await deleteAppVersion(id)
    setLoading(false)
    setisChanged(!isChanged)
    toast.success(`App version history deleted successfully`)
  }
  const handleCreateAppVersion = async (payload: FormData) => {
    try {
      await createAppVersion(payload)
      setisChanged(!isChanged)
      toast.success('App Version created successfully')
    } catch (e) {
      console.error('Failed to create app version', e)
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
              Mobile App Version History
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
            <AppVersionHistoryTable data={data} onDelete={onDeleteAppVersionHistory} />
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
                name='App Version History'
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
          label='Create App Version'
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          fields={createFields}
          onSubmit={handleCreateAppVersion}
        />
      )}
    </>
  )
}
const AppVersionHistory: React.FC = () => {
  return (
    <>
      <DashboardWrapper
        customComponent={Custom}
        selectedItem={'/mobile-app-version-history'}
      ></DashboardWrapper>
    </>
  )
}

export default AppVersionHistory
