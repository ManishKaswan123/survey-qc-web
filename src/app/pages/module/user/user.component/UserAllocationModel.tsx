import React, {useState} from 'react'
import {Survey} from '../../survey/survey.interfaces'

interface UserAllocationModalProps {
  survey?: Survey[]
  onAllocate: (selectedUserIds: string[]) => void
  onClose: () => void
}

const UserAllocationModal: React.FC<UserAllocationModalProps> = ({
  survey = [],
  onAllocate,
  onClose,
}) => {
  const [selectedUserIds, setSelectedUserIds] = useState<string[]>([])
  const [leftUsers, setLeftUsers] = useState<Survey[]>(survey)
  const [rightUsers, setRightUsers] = useState<Survey[]>([])

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

  const handleSelectAll = (users: Survey[]) => {
    setSelectedUserIds(users.map((user) => user.id))
  }

  const handleAllocate = () => {
    let selectedIds = rightUsers.map((user) => user.id)
    onAllocate(selectedIds)
    onClose()
  }

  return (
    <div className='fixed inset-0 bg-gray-800 bg-opacity-60 flex justify-center items-center'>
      <div className='bg-white rounded-2xl shadow-2xl p-8 w-full max-w-3xl mx-4'>
        <h2 className='text-2xl font-bold text-gray-800 mb-6 text-center'>Allocation</h2>

        <div className='flex justify-between items-start'>
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
