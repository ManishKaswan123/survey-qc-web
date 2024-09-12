import React, {useState, useMemo} from 'react'
// import UserTable from './UserTable'
import Pagination from 'sr/helpers/ui-components/dashboardComponents/Pagination'
import {Spinner} from 'sr/helpers/ui-components/Spinner'
import DashboardWrapper from 'app/pages/dashboard/DashboardWrapper'
import {fetchUser} from 'app/pages/module/user/user.helpers/fetchUser'
import {AiOutlineFilter, AiOutlineUpload, AiOutlineUserAdd} from 'react-icons/ai'
import {Button} from 'sr/helpers'
import Filter from 'sr/helpers/ui-components/Filter'
import {FieldsArray} from 'sr/constants/fields'
import {UserInterface} from 'sr/constants/User'
// import SellerDetailsCard from './SellerDetailsCard'
import {useQuery} from '@tanstack/react-query'
// import UserTableSkeleton from './UserTableSkeleton'
import PaginationSkeleton from 'sr/helpers/ui-components/dashboardComponents/PaginationSkeleton'
import {fetchUserResponse, userFilters} from './user.interfaces'
import UserTableSkeleton from './user.component/UserTableSkeleton'
import UserTable from './user.component/UserTable'
import SellerDetailsCard from './user.component/SellerDetailsCard'
import {IoSearchSharp} from 'react-icons/io5'
import {RiArrowDownSLine, RiArrowUpSLine} from 'react-icons/ri'
// import {fetchUserResponse, userFilters} from '../user.interfaces'

const Custom: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [selectedUser, setSelectedUser] = useState<UserInterface>()
  const [filters, setFilters] = useState<userFilters>()
  const [isFilterVisible, setIsFilterVisible] = useState<boolean>(false)
  const [itemsPerPage, setItemsPerPage] = useState<number>(8)
  const [isExpanded, setIsExpanded] = useState<boolean>(false)

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
    retry: false,
  })

  const toggleExpand = () => {
    setIsExpanded(!isExpanded)
  }

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
    setIsFilterVisible(false)
  }

  return (
    <>
      <div className='container mx-auto px-4 sm:px-8'>
        <div className='py-4'>
          <div className='mb-6 mt-3'>
            <p className='text-xl font-semibold leading-tight text-gray-600'>USER MANAGEMENT</p>
          </div>
          {/* <div className='flex justify-between items-center flex-wrap mb-4'>
            <h2 className='text-2xl font-semibold leading-tight'>USER MANAGEMENT</h2>
            <Button
              label='Filter'
              Icon={AiOutlineFilter}
              onClick={() => setIsFilterVisible(!isFilterVisible)}
              className='bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-full shadow-md inline-flex items-center'
            />
          </div> */}
          <div
            onClick={toggleExpand}
            className='flex justify-between items-center bg-white hover:cursor-pointer'
          >
            <div className='flex items-center bg-[#265B91] rounded-br-full px-6 py-3'>
              <IoSearchSharp className='text-gray-50 mr-2 bg-transparent' size={20} />
              <h3 className='text-gray-50 bg-transparent font-medium'>Filter</h3>
            </div>

            {!isExpanded && (
              <p className='text-md  leading-tight mb-2 sm:mb-0 sm:mr-4 p-3 text-gray-400'>
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
          {isExpanded && !selectedUser && (
            <div className='relative'>
              <Filter
                onApplyFilter={handleApplyFilter}
                setIsFilterVisible={setIsFilterVisible}
                preFilters={filters || {}}
                fields={fields}
              />
            </div>
          )}
          {!selectedUser && (
            <div className='bg-white'>
              <div className='flex justify-between   p-3 mt-5'>
                <h3 className='text-md font-semibold text-gray-600'>User List</h3>
                <div className='flex items-center'>
                  <Button
                    label='USER BULK UPLOAD'
                    Icon={AiOutlineUpload}
                    onClick={() => {
                      // Implement bulk upload functionality
                    }}
                    className='bg-[#00B849] hover:bg-green-700 text-slate-50 font-medium text-sm py-3 px-4 rounded flex items-center'
                  />
                  <Button
                    label='ADD USER'
                    Icon={AiOutlineUserAdd}
                    onClick={() => {
                      // Implement add user functionality
                    }}
                    className='bg-[#0F68F3] hover:bg-blue-700 text-slate-50 font-medium text-sm py-3 px-4 rounded flex items-center ml-2'
                  />
                </div>
              </div>
              <hr className='border-gray-200 pb-4' />
            </div>
          )}
          {isLoading ? (
            <UserTableSkeleton />
          ) : !selectedUser ? (
            <div>
              <UserTable userData={data?.results} onSelectUser={setSelectedUser} />
            </div>
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
    </>
  )
}

const User: React.FC = () => {
  return <DashboardWrapper customComponent={Custom} selectedItem='/user' />
}

export default User
