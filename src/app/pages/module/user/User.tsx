import React, {useState, useEffect, useMemo} from 'react'
import UserTable from './UserTable'
import Pagination from 'sr/helpers/ui-components/dashboardComponents/Pagination'
import {Spinner} from 'sr/helpers/ui-components/Spinner'
import DashboardWrapper from 'app/pages/dashboard/DashboardWrapper'
import {fetchUser} from 'sr/utils/api/fetchUser'
import {AiOutlineFilter} from 'react-icons/ai'
import {Button} from 'sr/helpers'
import Filter from 'sr/helpers/ui-components/Filter'
import {FieldsArray} from 'sr/constants/fields'
import {UserInterface} from 'sr/constants/User'
import SellerDetailsCard from './SellerDetailsCard'
import {useQuery} from '@tanstack/react-query'
import UserTableSkeleton from './UserTableSkeleton'
import PaginationSkeleton from 'sr/helpers/ui-components/dashboardComponents/PaginationSkeleton'

interface fetchUserResponse {
  results: UserInterface[]
  page: number
  limit: number
  totalPages: number
  totalResults: number
}

interface userFilters {
  role?: string
  sellerStatus?: string
  isEmailVerified?: boolean
}

const Custom: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [selectedUser, setSelectedUser] = useState<UserInterface>()
  const [filters, setFilters] = useState<userFilters>()
  const [isFilterVisible, setIsFilterVisible] = useState<boolean>(false)
  const [itemsPerPage, setItemsPerPage] = useState<number>(8)
  // const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false)
  // const [isUpdateModalOpen, setIsUpdateModalOpen] = useState<boolean>(false)

  const role = useMemo(
    () => [
      {name: 'Retail User', id: 'retailUser'},
      {name: 'Business User', id: 'businessUser'},
    ],
    []
  )

  const sellerStatus = useMemo(
    () => [
      {name: 'Pending', id: 'pending'},
      {name: 'Submitted', id: 'submitted'},
      {name: 'Approved', id: 'approved'},
      {name: 'Rejected', id: 'rejected'},
    ],
    []
  )

  const isEmailVerified = useMemo(
    () => [
      {id: true, name: 'Yes'},
      {id: false, name: 'No'},
    ],
    []
  )

  const fields: FieldsArray = useMemo(
    () => [
      {type: 'dropdown', label: 'role', name: role, topLabel: 'Role', placeholder: 'Select Role'},
      {
        type: 'dropdown',
        label: 'sellerStatus',
        name: sellerStatus,
        topLabel: 'Seller Status',
        placeholder: 'Select Seller Status',
      },
      {
        type: 'dropdown',
        label: 'isEmailVerified',
        name: isEmailVerified,
        topLabel: 'Email Verified',
        placeholder: 'Select Email Verified',
      },
    ],
    []
  )

  const {data, error, isLoading, isError, refetch} = useQuery<fetchUserResponse>({
    queryKey: ['users', {limit: itemsPerPage, page: currentPage, ...filters}],
    queryFn: async () => fetchUser({limit: itemsPerPage, page: currentPage, ...filters}),
    // placeholderData: keepPreviousData,
    retry: false,
  })

  const onPageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber)
  }

  const onLimitChange = (newLimit: number) => {
    setItemsPerPage(newLimit)
    setCurrentPage(1)
  }

  const handleApplyFilter = (newFilters: userFilters) => {
    setFilters(newFilters)
    setCurrentPage(1)
    setIsFilterVisible(false) // Hide filter after applying
  }

  return (
    <>
      <div className='container mx-auto px-4 sm:px-8'>
        <div className='py-4'>
          <div className='flex justify-between items-center flex-wrap mb-4'>
            {!selectedUser && (
              <>
                <h2 className='text-2xl font-semibold leading-tight ml-1 mb-2 sm:mb-0 sm:mr-4'>
                  Users
                </h2>
                <div className='flex items-center'>
                  {/* <Button
                    label='Create new'
                    Icon={AiOutlinePlus}
                    onClick={() => {
                      // setIsCreateModalOpen(true)
                    }}
                    className='bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-full shadow-md inline-flex items-center mb-2 sm:mb-0 sm:mr-3'
                  ></Button> */}
                  <Button
                    label='Filter'
                    Icon={AiOutlineFilter}
                    onClick={() => setIsFilterVisible(!isFilterVisible)}
                    className='bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-full shadow-md inline-flex items-center'
                  ></Button>
                </div>
              </>
            )}
          </div>
          {isFilterVisible && !selectedUser && (
            <div className='relative'>
              <Filter
                onApplyFilter={handleApplyFilter}
                setIsFilterVisible={setIsFilterVisible}
                preFilters={filters || {}}
                fields={fields}
              />
            </div>
          )}
          {isLoading ? (
            <UserTableSkeleton />
          ) : !selectedUser ? (
            <UserTable userData={data?.results} onSelectUser={setSelectedUser} />
          ) : (
            <SellerDetailsCard
              setReRender={async () => refetch()}
              setSelectedUser={setSelectedUser}
              selectedUser={selectedUser}
              onGoBack={() => {
                setSelectedUser(undefined)
              }}
            />
          )}
        </div>
        {isLoading || isError ? (
          <PaginationSkeleton />
        ) : (
          !selectedUser && (
            <Pagination
              currentPage={currentPage}
              totalPages={data?.totalPages || 0}
              onPageChange={onPageChange}
              totalResults={data?.totalResults || 0}
              itemsPerPage={itemsPerPage}
              name='Users'
              onLimitChange={onLimitChange}
              disabled={isLoading}
            />
          )
        )}
      </div>
      {/* <DynamicModal
        imageType='imagePath'
        label='Create Business Category'
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        fields={createFields}
        onSubmit={handleCreateUser}
      />
      <DynamicModal
        imageType='imagePath'
        label='Update Business Category'
        isOpen={isUpdateModalOpen}
        onClose={() => setIsUpdateModalOpen(false)}
        fields={updateFields}
        onSubmit={handleEditUser}
      /> */}
    </>
  )
}

const User: React.FC = () => {
  return <DashboardWrapper customComponent={Custom} selectedItem='/user' />
}

export default User
