import React, {useEffect, useState, useCallback} from 'react'
import {Survey} from '../../survey/survey.interfaces'
import {fetchSurveys} from '../../survey/survey.helper'
import {fetchState} from 'sr/utils/api/fetchState'
import {fetchDistrict} from 'sr/utils/api/fetchDistrict'
import {fetchSubDistrict} from 'sr/utils/api/fetchSubDistrict'
import {fetchVillage} from 'sr/utils/api/fetchVillage'
import {useSelector} from 'react-redux'
import {RootState} from 'sr/redux/store'
import {useActions} from 'sr/utils/helpers/useActions'
import DropdownField from 'sr/partials/widgets/widgets-components/form/DropdownField'
interface UserAllocationModalProps {
  onAllocate: (selectedUserIds: string[]) => void
  onClose: () => void
}

const UserAllocationModal: React.FC<UserAllocationModalProps> = ({onAllocate, onClose}) => {
  const [selectedUserIds, setSelectedUserIds] = useState<string[]>([])
  const [leftUsers, setLeftUsers] = useState<Survey[]>([])
  const [rightUsers, setRightUsers] = useState<Survey[]>([])

  const stateData = useSelector((state: RootState) => state.state.data)
  const {fetchStateData} = useActions()
  const stateStatus = useSelector((state: RootState) => state.state.status)
  // State for location dropdowns
  const [states, setStates] = useState<any[]>([])
  const [districts, setDistricts] = useState<any[]>([])
  const [subdistricts, setSubdistricts] = useState<any[]>([])
  const [villages, setVillages] = useState<any[]>([])

  const [selectedState, setSelectedState] = useState<number>()
  const [selectedDistrict, setSelectedDistrict] = useState<number>()
  const [selectedSubdistrict, setSelectedSubdistrict] = useState<number>()
  const [selectedVillage, setSelectedVillage] = useState<number>()

  // Fetch states on component mount
  // useEffect(() => {
  //   const fetchData = async () => {
  //     const response = await fetchState({
  //       getAll: true,
  //     })
  //     console.log('this is state response', response)
  //     setStates(response.results)
  //   }
  //   fetchData()
  // }, [])

  console.log('stateData :- ', stateData)
  const fetchDataIfNeeded = useCallback(() => {
    if (stateStatus != 'succeeded') fetchStateData()
  }, [stateStatus])

  useEffect(() => {
    fetchDataIfNeeded()
  }, [])

  useEffect(() => {
    if (stateData) setStates(stateData?.results)
  }, [stateData])
  // Fetch districts based on selected state
  useEffect(() => {
    if (selectedState) {
      const fetchData = async () => {
        const response = await fetchDistrict({
          getAll: true,
          stateCode: selectedState,
        })
        setDistricts(response.results)
      }
      fetchData()
    }
    setDistricts([])
    setSubdistricts([])
    setVillages([])
  }, [selectedState])

  // Fetch subdistricts based on selected district
  useEffect(() => {
    if (selectedDistrict) {
      const fetchData = async () => {
        const response = await fetchSubDistrict({
          getAll: true,
          districtCode: selectedDistrict,
        })
        setSubdistricts(response.results)
      }
      fetchData()
    }
    setSubdistricts([])
    setVillages([])
  }, [selectedDistrict])

  // Fetch villages based on selected subdistrict
  useEffect(() => {
    if (selectedSubdistrict) {
      const fetchData = async () => {
        const response = await fetchVillage({
          getAll: true,
          subDistrictCode: selectedSubdistrict,
        })
        setVillages(response.results)
      }
      fetchData()
    }
    setVillages([])
  }, [selectedSubdistrict])

  // Fetch surveys whenever a location dropdown changes
  useEffect(() => {
    const fetchSurveyData = async () => {
      // Construct the query object dynamically
      const query = {
        getAll: true,
        projectBy: 'firstName lastName id',
        ...(selectedState && {stateCode: selectedState}),
        ...(selectedDistrict && {districtCode: selectedDistrict}),
        ...(selectedSubdistrict && {subDistrictCode: selectedSubdistrict}),
        ...(selectedVillage && {villageCode: selectedVillage}),
      }

      const response = await fetchSurveys(query)

      if (response.status === 'success') {
        console.log('this is response of fetchSurveys', response?.results?.results)
        setLeftUsers(response?.results?.results)
      }
    }

    fetchSurveyData()
  }, [selectedState, selectedDistrict, selectedSubdistrict, selectedVillage])

  const handleUserSelection = (userId: string) => {
    setSelectedUserIds((prevSelected) =>
      prevSelected.includes(userId)
        ? prevSelected.filter((id) => id !== userId)
        : [...prevSelected, userId]
    )
  }

  const moveSelectedUsers = (
    from: Survey[],
    to: Survey[],
    setFrom: React.Dispatch<React.SetStateAction<Survey[]>>,
    setTo: React.Dispatch<React.SetStateAction<Survey[]>>
  ) => {
    const selected = from.filter((user) => selectedUserIds.includes(user.id))
    setTo([...to, ...selected])
    setFrom(from.filter((user) => !selectedUserIds.includes(user.id)))
    setSelectedUserIds([])
  }

  const handleAllocate = () => {
    const selectedIds = rightUsers.map((user) => user.id)
    onAllocate(selectedIds)
    onClose()
  }

  const handleSelectAll = (users: Survey[]) => {
    setSelectedUserIds(users.map((user) => user.id))
  }

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'>
      <div className='bg-white p-6 rounded-lg w-full max-w-2xl max-h-[95vh] overflow-y-auto'>
        <h2 className='text-2xl font-bold text-gray-800 mb-6 text-center'>Allocation</h2>

        {/* Dropdowns */}
        <hr className='w-full border-t border-gray-400 mt-4 mb-2' />
        <div className='flex flex-row justify-between'>
          {/* State Dropdown */}
          <div className='w-[48%]'>
            {' '}
            {/* Ensure consistent width */}
            <DropdownField
              key='state'
              data={states} // Data for state dropdown
              labelKey='stateName' // Key for displaying the label
              label='State' // Label for the dropdown
              placeholder='Select State'
              valueKey='stateCode' // Key for the value in the option
              name='state'
              value={selectedState} // Controlled value
              onChange={(e) => setSelectedState(Number(e.target.value))} // Handle the state change
            />
          </div>

          {/* District Dropdown */}
          <div className='w-[48%]'>
            {' '}
            {/* Ensure consistent width */}
            <DropdownField
              key='district'
              data={districts} // Data for district dropdown
              labelKey='districtName'
              label='District'
              placeholder='Select District'
              valueKey='districtCode'
              name='district'
              value={selectedDistrict} // Controlled value
              onChange={(e) => setSelectedDistrict(Number(e.target.value))} // Handle district change
              disabled={!selectedState} // Disable if no state is selected
            />
          </div>
        </div>

        <div className='flex flex-row justify-between'>
          {/* Sub District Dropdown */}
          <div className='w-[48%]'>
            {' '}
            {/* Ensure consistent width */}
            <DropdownField
              key='subdistrict'
              data={subdistricts} // Data for subdistrict dropdown
              labelKey='subDistrictName'
              label='Sub District'
              placeholder='Select Sub District'
              valueKey='subDistrictCode'
              name='subdistrict'
              value={selectedSubdistrict} // Controlled value
              onChange={(e) => setSelectedSubdistrict(Number(e.target.value))} // Handle subdistrict change
              disabled={!selectedDistrict} // Disable if no district is selected
            />
          </div>

          {/* Village Dropdown */}
          <div className='w-[48%]'>
            {' '}
            {/* Ensure consistent width */}
            <DropdownField
              key='village'
              data={villages} // Data for village dropdown
              labelKey='villageName'
              label='Village'
              placeholder='Select Village'
              valueKey='villageCode'
              name='village'
              value={selectedVillage} // Controlled value
              onChange={(e) => setSelectedVillage(Number(e.target.value))} // Handle village change
              disabled={!selectedSubdistrict} // Disable if no subdistrict is selected
            />
          </div>
        </div>

        {/* Existing UI for allocation */}
        <hr className='w-full border-t border-gray-400 mt-4 mb-6' />
        <div className='flex justify-between items-start'>
          {/* Left Users */}
          <div className='w-1/2 pr-2'>
            <button
              onClick={() => moveSelectedUsers(leftUsers, rightUsers, setLeftUsers, setRightUsers)}
              className='w-full mb-2 bg-[#265B91] text-gray-50 py-2 rounded'
            >
              ADD →
            </button>
            <div className='space-y-2 max-h-64 overflow-y-auto border p-2'>
              {leftUsers.length > 0 ? (
                leftUsers.map((user) => (
                  <div
                    key={user.id}
                    className={`p-2 border ${
                      selectedUserIds.includes(user.id) ? 'bg-gray-300' : ''
                    }`}
                    onClick={() => handleUserSelection(user.id)}
                  >
                    {user.firstName} {user.lastName}
                  </div>
                ))
              ) : (
                <p className='text-center text-gray-500'>No users available</p>
              )}
            </div>
            <button
              onClick={() => handleSelectAll(leftUsers)}
              className='w-full mt-2 bg-[#265B91] text-gray-50 py-2 rounded'
            >
              SELECT ALL
            </button>
          </div>

          {/* Right Users */}
          <div className='w-1/2 pl-2'>
            <button
              onClick={() => moveSelectedUsers(rightUsers, leftUsers, setRightUsers, setLeftUsers)}
              className='w-full mb-2 bg-[#265B91] text-gray-50 py-2 rounded'
            >
              ← REMOVE
            </button>
            <div className='space-y-2 max-h-64 overflow-y-auto border p-2'>
              {rightUsers.length > 0 ? (
                rightUsers.map((user) => (
                  <div
                    key={user.id}
                    className={`p-2 border ${
                      selectedUserIds.includes(user.id) ? 'bg-gray-300' : ''
                    }`}
                    onClick={() => handleUserSelection(user.id)}
                  >
                    {user.firstName} {user.lastName}
                  </div>
                ))
              ) : (
                <p className='text-center text-gray-500'>No users selected</p>
              )}
            </div>
            <button
              onClick={() => handleSelectAll(rightUsers)}
              className='w-full mt-2 bg-[#265B91] text-gray-50 py-2 rounded'
            >
              SELECT ALL
            </button>
          </div>
        </div>

        <div className='mt-8 flex justify-between'>
          <button
            onClick={onClose}
            className='px-6 py-3 bg-gray-500 text-gray-50 rounded-lg hover:bg-gray-600 transition-colors'
          >
            Cancel
          </button>
          <button
            onClick={handleAllocate}
            className='px-6 py-3 bg-green-600 text-gray-50 rounded-lg hover:bg-green-700 transition-colors'
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  )
}

export default UserAllocationModal
