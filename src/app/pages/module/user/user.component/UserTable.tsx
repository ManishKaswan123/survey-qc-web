import React from 'react'
import {FaSync, FaEdit, FaTrash} from 'react-icons/fa'
import {useNavigate} from 'react-router-dom'
import {UserInterface} from 'sr/constants/User'
import {UserTableProps} from '../user.interfaces'

const UserTable: React.FC<UserTableProps> = (props) => {
  const navigate = useNavigate()

  const handleView = (user: UserInterface) => {
    props.onSelectUser(user)
  }

  const handleUserDetail = (user: UserInterface) => {
    navigate(`/user/${user.id}`)
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
                Login ID
              </th>
              <th className='py-5 bg-[#265B91] text-left text-xs font-semibold text-gray-50 uppercase tracking-wider border-r'>
                Email
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
            {props.userData?.map((user: UserInterface) => (
              <tr key={user.id} className='odd:bg-white even:bg-blue-50'>
                <td className='py-3 text-center border-b border-gray-200 text-sm border-r'>
                  <p className='text-gray-900 whitespace-no-wrap'>
                    {user.firstName} {user.lastName}
                  </p>
                </td>
                <td className='py-3 text-center border-b border-gray-200 text-sm border-r'>
                  <p>{user.id}</p>
                </td>
                <td className='py-3 text-center border-b border-gray-200 text-sm border-r'>
                  <p>{user.email}</p>
                </td>
                <td className='py-3 text-center border-b border-gray-200 text-sm border-r'>
                  <p>{user.role}</p>
                </td>
                <td className='py-3 text-center border-b border-gray-200 text-sm border-r'>
                  <div className='flex items-center space-x-2 justify-center'>
                    <button className='bg-blue-500 hover:bg-blue-600 text-slate-50 p-2 rounded'>
                      <FaSync className='w-7 h-4' />
                    </button>
                    <button className='bg-green-500 hover:bg-green-600 text-slate-50 p-2 rounded'>
                      <FaEdit className='w-7 h-4' />
                    </button>
                    <button className='bg-red-500 hover:bg-red-600 text-slate-50 p-2 rounded'>
                      <FaTrash className='w-7 h-4' />
                    </button>
                  </div>
                </td>
                <td className='py-3 text-center border-b border-gray-200 text-sm border-r'>
                  <button className='bg-[#00B849] hover:bg-green-700 text-slate-50 font-md text-xs py-3 px-4 rounded font-semibold'>
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
