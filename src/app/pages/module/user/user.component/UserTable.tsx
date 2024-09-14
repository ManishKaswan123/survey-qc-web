import React from 'react'
import {FaSync, FaEdit, FaTrash} from 'react-icons/fa'
import {useNavigate} from 'react-router-dom'
import {UserInterface, UserTableProps} from '../user.interfaces'
import {MdCloudSync} from 'react-icons/md'

const UserTable: React.FC<UserTableProps> = ({
  userData,
  onSelectUser,
  setIsChangePasswordModalOpen,
  setIsUpdateModalOpen,
}) => {
  const navigate = useNavigate()

  const handleChangePassword = (user: UserInterface) => {
    onSelectUser(user)
    setIsChangePasswordModalOpen(true)
  }

  const handleUpdate = (user: UserInterface) => {
    onSelectUser(user)
    setIsUpdateModalOpen(true)
  }

  return (
    <div className='overflow-x-auto mb-5 bg-white'>
      <div className='shadow overflow-hidden'>
        <table className='min-w-full leading-normal'>
          {/* Table headers */}
          <thead>
            <tr>
              <th className='py-5 bg-[#265B91] text-left text-xs font-semibold text-gray-50 uppercase tracking-wider border-r'>
                Name
              </th>
              <th className='py-5 bg-[#265B91] text-left text-xs font-semibold text-gray-50 uppercase tracking-wider border-r'>
                Mobile
              </th>
              <th className='py-5 bg-[#265B91] text-left text-xs font-semibold text-gray-50 uppercase tracking-wider border-r'>
                Email
              </th>
              <th className='py-5 bg-[#265B91] text-left text-xs font-semibold text-gray-50 uppercase tracking-wider border-r'>
                Status
              </th>
              <th className='py-5 bg-[#265B91] text-left text-xs font-semibold text-gray-50 uppercase tracking-wider border-r'>
                Type
              </th>
              <th className='py-5 bg-[#265B91] text-left text-xs font-semibold text-gray-50 uppercase tracking-wider border-r'>
                Action
              </th>
              <th className='py-5 bg-[#265B91] text-left text-xs font-semibold text-gray-50 uppercase tracking-wider border-r'>
                Allocate
              </th>
            </tr>
          </thead>

          {/* Table body */}
          <tbody>
            {userData?.map((user: UserInterface) => (
              <tr key={user?.id} className='odd:bg-white even:bg-blue-50'>
                <td className='py-3 text-center border-b border-gray-200 text-sm border-r'>
                  <p className='text-gray-900 whitespace-no-wrap'>
                    {user.firstName} {user.lastName}
                  </p>
                </td>
                <td className='py-3 text-center border-b border-gray-200 text-sm border-r'>
                  <p>{user?.mobile}</p>
                </td>
                <td className='py-3 text-center border-b border-gray-200 text-sm border-r'>
                  <p>{user?.email}</p>
                </td>
                <td className='px-5 py-5 text-left border-b border-gray-200 text-sm'>
                  <p
                    className={
                      user?.isActive
                        ? 'text-green-500 font-bold font-sans'
                        : 'text-red-500 font-bold font-sans'
                    }
                  >
                    {user?.isActive ? 'Active' : 'Inactive'}
                  </p>
                </td>
                <td className='py-3 text-center border-b border-gray-200 text-sm border-r'>
                  <p>{user.role}</p>
                </td>
                <td className='py-3 text-center border-b border-gray-200 text-sm border-r'>
                  <div className='flex items-center space-x-2 justify-center'>
                    <button
                      onClick={() => handleChangePassword(user)}
                      className='bg-blue-500 hover:bg-blue-600 text-slate-50 p-2 rounded-full'
                    >
                      <MdCloudSync />
                    </button>
                    <button
                      onClick={() => handleUpdate(user)}
                      className='bg-green-500 hover:bg-green-600 text-slate-50 p-2 rounded-full'
                    >
                      <FaEdit />
                    </button>
                    <button className='bg-red-500 hover:bg-red-600 text-slate-50 p-2 rounded-full'>
                      <FaTrash />
                    </button>
                  </div>
                </td>
                <td className='py-3 text-center border-b border-gray-200 text-sm border-r'>
                  <button className='bg-[#4a95e0] hover:bg-[#4686ed] text-slate-50 font-md text-xs py-3 px-4 rounded font-semibold '>
                    ALLOCATE
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default UserTable
