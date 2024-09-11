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
    <div className='overflow-x-auto'>
      <div className='shadow rounded-lg overflow-hidden'>
        <table className='min-w-full leading-normal'>
          {/* Table headers */}
          <thead>
            <tr>
              <th className='px-5 py-3 bg-[#265B91] text-left text-xs font-semibold text-slate-50 uppercase tracking-wider'>
                Name
              </th>
              <th className='px-5 py-3 bg-[#265B91] text-left text-xs font-semibold text-slate-50 uppercase tracking-wider'>
                Login ID
              </th>
              <th className='px-5 py-3 bg-[#265B91] text-left text-xs font-semibold text-slate-50 uppercase tracking-wider'>
                Email
              </th>
              <th className='px-5 py-3 bg-[#265B91] text-left text-xs font-semibold text-slate-50 uppercase tracking-wider'>
                Type
              </th>
              <th className='px-5 py-3 bg-[#265B91] text-left text-xs font-semibold text-slate-50 uppercase tracking-wider'>
                Action
              </th>
              <th className='px-5 py-3 bg-[#265B91] text-left text-xs font-semibold text-slate-50 uppercase tracking-wider'>
                Allocate
              </th>
            </tr>
          </thead>

          {/* Table body */}
          <tbody>
            {props.userData?.map((user: UserInterface) => (
              <tr key={user.id} className='odd:bg-white even:bg-gray-50'>
                <td className='px-5 py-5 text-left border-b border-gray text-sm'>
                  <p className='text-gray-900 whitespace-no-wrap'>
                    {user.firstName} {user.lastName}
                  </p>
                </td>
                <td className='px-5 py-5 text-left border-b border-gray-200 text-sm'>
                  <p>{user.id}</p>
                </td>
                <td className='px-5 py-5 text-left border-b border-gray-200 text-sm'>
                  <p>{user.email}</p>
                </td>
                <td className='px-5 py-5 text-left border-b border-gray-200 text-sm'>
                  <p>{user.role}</p>
                </td>
                <td className='px-5 py-5 border-b border-gray-200 text-sm'>
                  <div className='flex space-x-2'>
                    <button className='bg-blue-500 hover:bg-blue-600 text-slate-50 p-2 rounded'>
                      <FaSync />
                    </button>
                    <button className='bg-green-500 hover:bg-green-600 text-slate-50 p-2 rounded'>
                      <FaEdit />
                    </button>
                    <button className='bg-red-500 hover:bg-red-600 text-slate-50 p-2 rounded'>
                      <FaTrash />
                    </button>
                  </div>
                </td>
                <td className='px-5 py-5 border-b border-gray-200 text-sm'>
                  <button className='bg-[#00B849] hover:bg-green-700 text-slate-50 font-md text-xs py-2 px-4 rounded'>
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
