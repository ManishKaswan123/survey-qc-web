import React, {useState, useMemo} from 'react'
import Pagination from 'sr/helpers/ui-components/dashboardComponents/Pagination'
import DashboardWrapper from 'app/pages/dashboard/DashboardWrapper'
import {fetchUser} from 'app/pages/module/user/user.helpers/fetchUser'
import {AiOutlineUserAdd} from 'react-icons/ai'
import {Button} from 'sr/helpers'
import Filter from 'sr/helpers/ui-components/Filter'
import {FieldsArray} from 'sr/constants/fields'
import {useQuery} from '@tanstack/react-query'
import PaginationSkeleton from 'sr/helpers/ui-components/dashboardComponents/PaginationSkeleton'
import {UserInterface, userFilters} from './user.interfaces'
import UserTableSkeleton from './user.component/UserTableSkeleton'
import UserTable from './user.component/UserTable'
import FilterHeader from 'sr/helpers/ui-components/filterHeader'
import DynamicModal from 'sr/helpers/ui-components/DynamicPopUpModal'

const Custom: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [selectedUser, setSelectedUser] = useState<UserInterface>()
  const [filters, setFilters] = useState<userFilters>()
  const [isFilterVisible, setIsFilterVisible] = useState<boolean>(false)
  const [itemsPerPage, setItemsPerPage] = useState<number>(8)
  const [isExpanded, setIsExpanded] = useState<boolean>(false)
  const [isChangePasswordModalOpen, setIsChangePasswordModalOpen] = useState<boolean>(false)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false)
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState<boolean>(false)

  const role = useMemo(
    () => [
      {name: 'Super Admin', id: 'admin'},
      {name: 'Field Assistant', id: 'fa'},
    ],
    []
  )

  const language = useMemo(
    () => [
      {name: 'English', id: 'en'},
      {name: 'Hindi', id: 'ji'},
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

  const isMobileVerified = useMemo(
    () => [
      {id: true, name: 'Yes'},
      {id: false, name: 'No'},
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

  const updatePasswordFields: FieldsArray = useMemo(
    () => [
      {
        type: 'text',
        label: 'Password',
        name: 'password',
        placeholder: 'Password',
        required: true,
      },
      {
        type: 'text',
        label: 'Confirm Password',
        name: 'confirmPassword',
        placeholder: 'Confirm Password',
        required: true,
      },
    ],
    []
  )

  const createUpdateFields: FieldsArray = useMemo(
    () => [
      {
        type: 'dropdown',
        label: 'languagePreference',
        name: language,
        topLabel: 'Language',
        placeholder: 'Select Language',
        labelKey: 'firstName',
        id: 'id',
        required: true,
      },
      {
        type: 'text',
        label: 'Email',
        name: 'email',
        placeholder: 'Email',
        required: true,
      },

      {
        type: 'number',
        label: 'Mobile',
        name: 'mobile',
        placeholder: 'Mobile',
        required: true,
      },

      {
        type: 'dropdown',
        label: 'role',
        name: role,
        topLabel: 'Role',
        placeholder: 'Select Role',
        required: true,
        labelKey: 'firstName',
        id: 'id',
      },
      {
        type: 'dropdown',
        label: 'isEmailVerified',
        name: isEmailVerified,
        topLabel: 'Email Verified',
        placeholder: 'Select Email Verified',
        required: true,
        labelKey: 'firstName',
        id: 'id',
      },
      {
        type: 'dropdown',
        label: 'isMobileVerified',
        name: isMobileVerified,
        topLabel: 'Email Verified',
        placeholder: 'Select Email Verified',
        required: true,
        labelKey: 'firstName',
        id: 'id',
      },
      {
        type: 'text',
        label: 'First Name',
        name: 'firstName',
        placeholder: 'First Name',
        required: true,
      },
      {
        type: 'text',
        label: 'Last Name',
        name: 'lastName',
        placeholder: 'Last Name',
        required: true,
      },
    ],
    []
  )

  const {data, error, isLoading, isError, refetch} = useQuery({
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

  const handleUpdatePassword = async (payload: string) => {
    // Implement update password functionality
    console.log('payload is :- ', payload)
  }

  const handleCreateUser = async (payload: UserInterface) => {
    // Implement create user functionality
  }

  const handleUpdateUser = async (payload: UserInterface) => {
    // Implement update user functionality
  }

  const defaultData: UserInterface | undefined = useMemo(() => {
    if (!selectedUser) return undefined
    return selectedUser
  }, [selectedUser])

  console.log('selectedUser', selectedUser)
  return (
    <>
      <div className='container mx-auto px-4 sm:px-8'>
        <div className='py-6'>
          <h2 className='text-lg font-bold text-gray-700 mb-4'>USER MANAGEMENT</h2>
          <FilterHeader onToggle={toggleExpand} isExpanded={isExpanded} />
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
          <div className='bg-white'>
            <div className='flex justify-between   p-3 mt-5'>
              <h3 className='text-md font-semibold text-gray-600'>User List</h3>
              <div className='flex items-center'>
                {/* <Button
                  label='USER BULK UPLOAD'
                  Icon={AiOutlineUpload}
                  onClick={() => {
                    // Implement bulk upload functionality
                  }}
                  className='bg-[#00B849] hover:bg-green-700 text-slate-50 font-medium text-sm py-3 px-4 rounded flex items-center'
                /> */}
                <Button
                  label='ADD USER'
                  Icon={AiOutlineUserAdd}
                  onClick={() => {
                    // Implement add user functionality
                    setIsCreateModalOpen(true)
                  }}
                  className='bg-[#265B91] hover:bg-[#1e4770] text-slate-50 font-medium text-sm py-3 px-4 rounded flex items-center ml-2'
                />
              </div>
            </div>
            <hr className='border-gray-200 pb-4' />
          </div>
          {isLoading ? (
            <UserTableSkeleton />
          ) : (
            <div>
              <UserTable
                userData={data?.results?.results}
                onSelectUser={setSelectedUser}
                setIsChangePasswordModalOpen={setIsChangePasswordModalOpen}
                setIsUpdateModalOpen={setIsUpdateModalOpen}
              />
            </div>
          )}
        </div>
        {isLoading || isError ? (
          <PaginationSkeleton />
        ) : (
          !selectedUser && (
            <Pagination
              currentPage={currentPage}
              totalPages={data?.results?.totalPages || 0}
              onPageChange={onPageChange}
              totalResults={data?.results?.totalResults || 0}
              itemsPerPage={itemsPerPage}
              name='Users'
              onLimitChange={onLimitChange}
              disabled={isLoading}
            />
          )
        )}
      </div>
      {isChangePasswordModalOpen && (
        <DynamicModal
          label='Change Password'
          isOpen={isChangePasswordModalOpen}
          onClose={() => setIsChangePasswordModalOpen(false)}
          fields={updatePasswordFields}
          onSubmit={handleUpdatePassword}
        />
      )}
      {isCreateModalOpen && (
        <DynamicModal
          label='Create User'
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          fields={createUpdateFields}
          onSubmit={handleCreateUser}
        />
      )}
      {isUpdateModalOpen && (
        <DynamicModal
          label='Update User'
          isOpen={isUpdateModalOpen}
          onClose={() => setIsUpdateModalOpen(false)}
          fields={createUpdateFields}
          defaultValues={defaultData}
          onSubmit={handleUpdateUser}
        />
      )}
    </>
  )
}

const User: React.FC = () => {
  return <DashboardWrapper customComponent={Custom} selectedItem='/user' />
}

export default User
