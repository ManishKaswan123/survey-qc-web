import React, { useState, useMemo, useEffect, useCallback } from 'react'
import Pagination from 'sr/helpers/ui-components/dashboardComponents/Pagination'
import DashboardWrapper from 'app/pages/dashboard/DashboardWrapper'
import { fetchUser } from 'app/pages/module/user/user.helpers/fetchUser'
import { AiOutlineUserAdd } from 'react-icons/ai'
import { Button } from 'sr/helpers'
import Filter from 'sr/helpers/ui-components/Filter'
import { FieldsArray } from 'sr/constants/fields'
import { useQuery } from '@tanstack/react-query'
import PaginationSkeleton from 'sr/helpers/ui-components/dashboardComponents/PaginationSkeleton'
import { UserInterface, userFilters } from './user.interfaces'
import UserTableSkeleton from './user.component/UserTableSkeleton'
import UserTable from './user.component/UserTable'
import FilterHeader from 'sr/helpers/ui-components/filterHeader'
import DynamicModal from 'sr/helpers/ui-components/DynamicPopUpModal'
import { fetchSurveys } from '../survey/survey.helper'
import UserAllocationModal from './user.component/UserAllocationModel'
import { createUser } from './user.helpers/createUser'
import { toast } from 'react-toastify'
import { updateUser } from './user.helpers/updateUser'
import { deleteUser } from './user.helpers/deleteUser'
import { set } from 'react-hook-form'
import { allocateUser } from './user.helpers/userAllocate'
import { useSelector } from 'react-redux'
import { RootState } from 'sr/redux/store'
import { fetchDistrict } from 'sr/utils/api/fetchDistrict'
import { fetchSubDistrict } from 'sr/utils/api/fetchSubDistrict'
import { fetchVillage } from 'sr/utils/api/fetchVillage'
import { useActions } from 'sr/utils/helpers/useActions'

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
  // Step 1: Retrieve and parse the user object from localStorage
  const userString = localStorage.getItem('user')
  const user = userString ? JSON.parse(userString) : null
  const [isRoleFA, setIsRoleFA] = useState<boolean>(false)

  const [district, setDistrict] = useState<any>([])
  const [subDistrict, setSubDistrict] = useState<any>([])
  const [village, setVillage] = useState<any>([])
  const [selectedState, setSelectedState] = useState<any>(null)
  const [selectedDistrict, setSelectedDistrict] = useState<any>(null)
  const [selectedSubDistrict, setSelectedSubDistrict] = useState<any>(null)
  const stateData = useSelector((state: RootState) => state.state.data)
  const { fetchStateData } = useActions()
  const stateStatus = useSelector((state: RootState) => state.state.status)
  const programReduxStore = useSelector((state: RootState) => state.program)
  const { fetchProgramAction } = useActions()

  // Step 2: Access companyId and programId from the user object
  const companyId = user?.companyId
  const programId = user?.programId

  const role = useMemo(
    () => [
      // {name: 'Super Admin', id: 'SuperAdmin'},
      { name: 'Quality Analyst', id: 'QA' },
      { name: 'Field Agent', id: 'FA' },
      { name: 'Project Admin', id: 'ProjectAdmin' },
      { name: 'State Manager', id: 'StateManager' },
    ],
    []
  )

  let loginUser = JSON.parse(localStorage.getItem('user') || '{}');

  const createRoles = useMemo(() => {
    if (!loginUser) return []; // Return empty if user is not found

    switch (loginUser?.role) {
      case 'ProjectAdmin':
        return [
          { name: 'Quality Analyst', id: 'QA' },
          { name: 'Field Agent', id: 'FA' },
          { name: 'State Manager', id: 'StateManager' },
        ];
      case 'StateManager':
        return [
          { name: 'Quality Analyst', id: 'QA' },
          { name: 'Field Agent', id: 'FA' },
        ];
      case 'QA':
        return [
          { name: 'Field Agent', id: 'FA' },
        ];
      default:
        return []; // Return empty array for unknown roles
    }
  }, [loginUser]); // Depend on user


  const isEmailVerified = useMemo(
    () => [
      { id: true, name: 'Yes' },
      { id: false, name: 'No' },
    ],
    []
  )

  const isMobileVerified = useMemo(
    () => [
      { id: true, name: 'Yes' },
      { id: false, name: 'No' },
    ],
    []
  )

  const status = useMemo(
    () => [
      { name: 'Active', id: 'true' },
      { name: 'Inactive', id: 'false' },
    ],
    []
  )

  const fields: FieldsArray = useMemo(
    () => [
      { type: 'dropdown', label: 'role', name: role, topLabel: 'Role', placeholder: 'Select Role' },
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
    ],
    []
  )

  const createFields: FieldsArray = useMemo(() => {
    const fields: FieldsArray = [
      {
        type: 'dropdown',
        label: 'programId',
        name: programReduxStore.totalPrograms,
        topLabel: 'Program',
        placeholder: 'Select Program',
        labelKey: 'name',
        id: '_id',
        required: true
      },
      {
        type: 'dropdown',
        label: 'role',
        name: createRoles,
        onChange: (e) => setIsRoleFA(e.target.value === 'FA'),
        topLabel: 'Role',
        placeholder: 'Select Role',
        required: true,
        labelKey: 'name',
        id: 'id',
      },
      {
        type: 'text',
        label: 'Email',
        name: 'email',
        placeholder: 'Email',
        required: !isRoleFA
      },
      {
        type: 'number',
        label: 'Mobile',
        name: 'mobile',
        placeholder: 'Mobile',
        required: true,
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
      {
        type: 'dropdown',
        label: 'stateCode',
        name: stateData?.results,
        topLabel: 'State',
        placeholder: 'Select State',
        labelKey: 'stateName',
        id: 'stateCode',
        // required: isRoleFA,
      },
      {
        type: 'dropdown',
        label: 'districtCode',
        name: district,
        topLabel: 'District',
        placeholder: 'Select District',
        labelKey: 'districtName',
        id: 'districtCode',
        // required: isRoleFA,
      },
      {
        type: 'dropdown',
        label: 'subDistrictCode',
        name: subDistrict,
        topLabel: 'Sub District',
        placeholder: 'Select Sub District',
        labelKey: 'subDistrictName',
        id: 'subDistrictCode',
        // required: isRoleFA,
      },
      {
        type: 'dropdown',
        label: 'villageCode',
        name: village,
        topLabel: 'Village Code',
        placeholder: 'Select Village',
        labelKey: 'villageName',
        id: 'villageCode',
        // required: isRoleFA,
      }
    ];

    if (!isRoleFA) {
      fields.splice(3, 0,
        {
          type: 'text',
          label: 'Password',
          name: 'password',
          placeholder: 'Password',
          required: true,
        }
      );
    }

    return fields;
  }, [isRoleFA, role, stateData, district, subDistrict, village, programReduxStore]);

  const updateFields: FieldsArray = useMemo(() => {
    const fields: FieldsArray = [
      {
        type: 'dropdown',
        label: 'programId',
        name: programReduxStore.totalPrograms,
        topLabel: 'Program',
        placeholder: 'Select Program',
        labelKey: 'name',
        id: '_id',
        required: true
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
        disabled: true
      },
      {
        type: 'text',
        label: 'Email',
        name: 'email',
        placeholder: 'Email',
        required: selectedUser ? selectedUser.role !== 'FA' : false
      },
      {
        type: 'number',
        label: 'Mobile',
        name: 'mobile',
        placeholder: 'Mobile',
        required: true,
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
      {
        type: 'dropdown',
        label: 'stateCode',
        name: stateData?.results,
        topLabel: 'State',
        placeholder: 'Select State',
        labelKey: 'stateName',
        id: 'stateCode',
        // required: selectedUser ? selectedUser.role === 'FA' : false,
      },
      {
        type: 'dropdown',
        label: 'districtCode',
        name: district,
        topLabel: 'District',
        placeholder: 'Select District',
        labelKey: 'districtName',
        id: 'districtCode',
        // required: selectedUser ? selectedUser.role === 'FA' : false
      },
      {
        type: 'dropdown',
        label: 'subDistrictCode',
        name: subDistrict,
        topLabel: 'Sub District',
        placeholder: 'Select Sub District',
        labelKey: 'subDistrictName',
        id: 'subDistrictCode',
        // required: selectedUser ? selectedUser.role === 'FA' : false
      },
      {
        type: 'dropdown',
        label: 'villageCode',
        name: village,
        topLabel: 'Village Code',
        placeholder: 'Select Village',
        labelKey: 'villageName',
        id: 'villageCode',
        // required: selectedUser ? selectedUser.role === 'FA' : false
      }
    ];

    // if (!selectedUser || selectedUser.role !== 'FA') {
    //   fields.splice(3, 0,  
    //     {
    //       type: 'text',
    //       label: 'Password',
    //       name: 'password',
    //       placeholder: 'Password',
    //       required: true,
    //     }
    //   );
    // }

    return fields;
  }, [selectedUser, role, stateData, district, subDistrict, village, programReduxStore]);

  const fetchDataIfNeeded = useCallback(() => {
    if (stateStatus != 'succeeded') fetchStateData()
    if (programReduxStore.status !== 'succeeded')
      fetchProgramAction({})

  }, [stateStatus, programReduxStore, fetchProgramAction])

  useEffect(() => {
    fetchDataIfNeeded()
  }, [])

  const { data, error, isLoading, isError, refetch } = useQuery({
    queryKey: ['users', { limit: itemsPerPage, page: currentPage, ...filters, isActive: true }],
    queryFn: async () => fetchUser({ limit: itemsPerPage, page: currentPage, ...filters, isActive: true }),
    retry: false,
  })

  // console.log('surveyData', surveyData)
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
  }

  const handleCreateUser = async (payload: any) => {
    try {
      const UserData: { [key: string]: any } = {
        role: payload.role,
        mobile: payload.mobile,
        password: payload.password,
        firstName: payload.firstName,
        programId: payload.programId,
        companyId,
      }

      // Dynamically add optional fields if they have a value
      const optionalFields = [
        'stateCode',
        'districtCode',
        'subDistrictCode',
        'villageCode',
        'lastName',
        'email',
      ]

      optionalFields.forEach((field) => {
        if (payload[field]) {
          UserData[field] = ['stateCode', 'districtCode', 'subDistrictCode', 'villageCode'].includes(field)
            ? parseInt(payload[field])  // Parse state and district codes as integers
            : payload[field].toString()  // Convert other fields to string if needed
        }
      })

      // console.log('Create User Data:', UserData)
      let res = await createUser(UserData)
      if (res.status === 'success') {
        toast.success('User created successfully')
        setIsCreateModalOpen(false)
        refetch()
      }
    } catch (e) {
      console.error('Failed to create User', e)
    }
  }


  const handleUpdateUser = async (payload: any) => {
    // console.log('Update User Payload', payload)
    try {
      console.log('payload for update ', payload)
      if (!selectedUser) return
      const UserData: { [key: string]: any } = {
        role: payload.role,
        mobile: payload.mobile,
        firstName: payload.firstName,
        programId: payload.programId,
        companyId,
      }

      // Dynamically add properties to VleData if they have a value
      const optionalFields = [
        'dob',
        'lastName',
        'pinCode',
        'stateCode',
        'districtCode',
        'subDistrictCode',
        'villageCode',
        'email',
      ]

      optionalFields.forEach((field) => {
        if (payload[field]) {
          UserData[field] = ['stateCode', 'districtCode', 'subDistrictCode', 'villageCode'].includes(field)
            ? parseInt(payload[field])  // Parse state and district codes as integers
            : payload[field];  // Direct assignment for other fields
        }
      });

      let res = await updateUser(UserData, selectedUser.id)
      // setRerender((prev) => !prev)
      if (res.status === 'success'){
        toast.success('User updated successfully')
        setIsUpdateModalOpen(false)
        refetch()
      }        
    } catch (e) {
      console.error('Failed to update User', e)
    }
  }

  const handleDelete = async (id: string) => {
    try {
      let res = await deleteUser(id)
      if (res.status === 'success')
        toast.success(`User deleted successfully`)
      refetch();
    } catch (e) {
      console.error('Failed to delete User', e)
    }
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

  useEffect(() => {
    if (selectedState) {
      fetchDistrict({
        getAll: true,
        stateCode: parseInt(selectedState),
        projectBy: 'districtCode,districtName',
      }).then((response) => {
        setDistrict(response.results)
      })
    }
  }, [selectedState])

  useEffect(() => {
    if (selectedDistrict) {
      fetchSubDistrict({
        getAll: true,
        districtCode: parseInt(selectedDistrict),
        projectBy: 'subDistrictCode,subDistrictName',
      }).then((response) => {
        setSubDistrict(response.results)
      })
    }
  }, [selectedDistrict])

  useEffect(() => {
    if (selectedSubDistrict) {
      fetchVillage({
        getAll: true,
        subDistrictCode: parseInt(selectedSubDistrict),
        projectBy: 'villageCode,villageName',
      }).then((response) => {
        setVillage(response.results)
      })
    }
  }, [selectedSubDistrict])

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
          setSelectedState={setSelectedState}
          setSelectedDistrict={setSelectedDistrict}
          setSelectedSubDistrict={setSelectedSubDistrict}
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
          setSelectedState={setSelectedState}
          setSelectedDistrict={setSelectedDistrict}
          setSelectedSubDistrict={setSelectedSubDistrict}
        />
      )}
      {isAllocateModalOpen && (
        <UserAllocationModal
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
