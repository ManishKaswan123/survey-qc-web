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
import {fetchSurveys} from '../survey/survey.helper'
import UserAllocationModal from './user.component/UserAllocationModel'
import {createUser} from './user.helpers/createUser'
import {toast} from 'react-toastify'
import {updateUser} from './user.helpers/updateUser'
import {deleteUser} from './user.helpers/deleteUser'
import {set} from 'react-hook-form'
import {allocateUser} from './user.helpers/userAllocate'

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
  const [isAllocateModalOpen, setIsAllocateModalOpen] = useState<boolean>(false)
  const [allocatedSurveyIds, setAllocatedSurveyIds] = useState<string[]>([])
  const [rerender, setRerender] = useState<boolean>(false)

  const role = useMemo(
    () => [
      {name: 'Super Admin', id: 'SuperAdmin'},
      {name: 'Quality Analyst', id: 'QA'},
      {name: 'Field Agent', id: 'FA'},
      {name: 'Project Admin', id: 'ProjectAdmin'},
    ],
    []
  )

  const language = useMemo(
    () => [
      {name: 'English', id: 'en'},
      {name: 'Hindi', id: 'hi'},
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

  const status = useMemo(
    () => [
      {name: 'Active', id: 'true'},
      {name: 'Inactive', id: 'false'},
    ],
    []
  )

  const fields: FieldsArray = useMemo(
    () => [
      {type: 'dropdown', label: 'role', name: role, topLabel: 'Role', placeholder: 'Select Role'},
      {
        type: 'dropdown',
        label: 'isActive',
        name: status,
        topLabel: 'Status',
        placeholder: 'Select Status',
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
        placeholder: 'Enter Password',
        required: true,
      },
      // {
      //   type: 'text',
      //   label: 'Confirm Password',
      //   name: 'confirmPassword',
      //   placeholder: 'Confirm Password',
      //   required: true,
      // },
    ],
    []
  )

  const createFields: FieldsArray = useMemo(
    () => [
      {
        type: 'dropdown',
        label: 'languagePreference',
        name: language,
        topLabel: 'Language',
        placeholder: 'Select Language',
        labelKey: 'name',
        id: 'id',
      },

      {
        type: 'text',
        label: 'Email',
        name: 'email',
        placeholder: 'Email',
        required: true,
      },
      {
        type: 'text',
        label: 'Password',
        name: 'password',
        placeholder: 'Password',
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
        labelKey: 'name',
        id: 'id',
      },
      {
        type: 'dropdown',
        label: 'isEmailVerified',
        name: isEmailVerified,
        topLabel: 'Email Verified',
        placeholder: 'Select Email Verified',
        labelKey: 'name',
        id: 'id',
      },
      {
        type: 'dropdown',
        label: 'isMobileVerified',
        name: isMobileVerified,
        topLabel: 'Email Verified',
        placeholder: 'Select Email Verified',
        labelKey: 'name',
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
      },
    ],
    []
  )

  const updateFields: FieldsArray = useMemo(
    () => [
      {
        type: 'dropdown',
        label: 'languagePreference',
        name: language,
        topLabel: 'Language',
        placeholder: 'Select Language',
        labelKey: 'name',
        id: 'id',
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
        labelKey: 'name',
        id: 'id',
      },
      {
        type: 'dropdown',
        label: 'isEmailVerified',
        name: isEmailVerified,
        topLabel: 'Email Verified',
        placeholder: 'Select Email Verified',
        labelKey: 'name',
        id: 'id',
      },
      {
        type: 'dropdown',
        label: 'isMobileVerified',
        name: isMobileVerified,
        topLabel: 'Email Verified',
        placeholder: 'Select Email Verified',
        labelKey: 'name',
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
      },
    ],
    []
  )

  const {data, error, isLoading, isError, refetch} = useQuery({
    queryKey: ['users', {limit: itemsPerPage, page: currentPage, ...filters}],
    queryFn: async () => fetchUser({limit: itemsPerPage, page: currentPage, ...filters}),
    retry: false,
  })

  const surveyData = useQuery({
    queryKey: [
      'surveys',
      {
        getAll: true,
        projectBy: 'firstName lastName id',
      },
    ],
    queryFn: async () =>
      fetchSurveys({
        getAll: true,
        projectBy: 'firstName lastName id',
      }),
  })

  console.log('surveyData', surveyData)
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

  const handleUpdatePassword = async (payload: any) => {
    // Implement update password functionality
    // console.log('payload is :- ', payload)
    // console.log('selectedUser is :- ', selectedUser)
    // try {
    //   if (!selectedUser) return
    //   const userData = {
    //     // ...selectedUser,
    //     password: payload?.password,
    //   }
    //   await updateUser(userData, selectedUser.id)
    //   setRerender((prev) => !prev)
    //   toast.success('User created successfully')
    // } catch (e) {
    //   console.error('Failed to update password', e)
    // } finally {
    //   setIsChangePasswordModalOpen(false)
    // }
  }

  // const handleCreateUser = async (payload: UserInterface) => {
  //   // Implement create user functionality
  // }

  const handleCreateUser = async (payload: any) => {
    try {
      console.log('Create User Payload', payload)
      const UserData: {[key: string]: any} = {
        role: payload.role,
        email: payload.email,
        mobile: payload.mobile,
        password: payload.password,
        firstName: payload.firstName,
      }

      // Dynamically add optional fields if they have a value
      const optionalFields = [
        'lastName',
        'languagePreference',
        'stateCode',
        'districtCode',
        'subDistrictCode',
        'villageCode',
      ]

      optionalFields.forEach((field) => {
        if (payload[field]) {
          UserData[field] =
            field === 'languagePreference'
              ? [payload[field]]
              : field === 'stateCode' || 'districtCode' || 'subDistrictCode' || 'villageCode'
              ? parseInt(payload[field])
              : payload[field]
        }
      })

      console.log('Create User Data:', UserData)
      await createUser(UserData)
      setRerender((prev) => !prev)
      toast.success('User created successfully')
    } catch (e) {
      console.error('Failed to create User', e)
    } finally {
      setIsCreateModalOpen(false)
    }
  }

  const handleUpdateUser = async (payload: any) => {
    try {
      if (!selectedUser) return
      const UserData: {[key: string]: any} = {
        role: payload.role,
        mobile: payload.mobile,
        firstName: payload.firstName,
        email: payload.email,
      }

      // Dynamically add properties to VleData if they have a value
      const optionalFields = [
        'dob',
        'lastName',
        'pinCode',
        'languagePreference',
        'stateCode',
        'districtCode',
        'subDistrictCode',
        'villageCode',
      ]

      optionalFields.forEach((field) => {
        if (payload[field]) {
          UserData[field] =
            field === 'languagePreference'
              ? [payload[field]]
              : field === 'stateCode' || 'districtCode' || 'subDistrictCode' || 'villageCode'
              ? parseInt(payload[field])
              : payload[field]
        }
      })
      await updateUser(UserData, selectedUser.id)
      setRerender((prev) => !prev)
      toast.success('User updated successfully')
    } catch (e) {
      console.error('Failed to update User', e)
    } finally {
      setIsUpdateModalOpen(false)
    }
  }

  const handleDelete = async (id: string) => {
    await deleteUser(id)
    setRerender((prev) => !prev)
    toast.success(`User deleted successfully`)
  }

  const defaultData: UserInterface | undefined = useMemo(() => {
    if (!selectedUser) return undefined
    return selectedUser
  }, [selectedUser])

  const handleAllocate = async (selectedSurveyIds: string[]) => {
    try {
      const payload = {
        userId: selectedUser?.id,
        userType: selectedUser?.role,
        surveyIds: selectedSurveyIds,
      }
      await allocateUser(payload)
      setRerender((prev) => !prev)
      toast.success('Users allocated successfully')
    } catch (e) {
      console.error('Failed to allocate users', e)
    } finally {
      setIsUpdateModalOpen(false)
    }
  }

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
                setIsAllocateModalOpen={setIsAllocateModalOpen}
                onDelete={handleDelete}
              />
            </div>
          )}
        </div>
        {isLoading ? (
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
          fields={createFields}
          onSubmit={handleCreateUser}
        />
      )}
      {isUpdateModalOpen && (
        <DynamicModal
          label='Update User'
          isOpen={isUpdateModalOpen}
          onClose={() => setIsUpdateModalOpen(false)}
          fields={updateFields}
          defaultValues={defaultData}
          onSubmit={handleUpdateUser}
        />
      )}
      {isAllocateModalOpen && surveyData && (
        <UserAllocationModal
          survey={surveyData?.data?.results.results}
          onAllocate={handleAllocate}
          onClose={() => setIsAllocateModalOpen(false)}
        />
      )}
    </>
  )
}

const User: React.FC = () => {
  return <DashboardWrapper customComponent={Custom} selectedItem='/user' />
}

export default User
