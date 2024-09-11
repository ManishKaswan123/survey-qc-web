import React from 'react'
import {FaEye} from 'react-icons/fa'
import {useNavigate} from 'react-router-dom'
import {UserInterface} from 'sr/constants/User'

interface UserTableProps {
  userData: UserInterface[] | undefined
  onSelectUser: React.Dispatch<React.SetStateAction<UserInterface | undefined>>
}

const UserTable: React.FC<UserTableProps> = (props) => {
  const navigate = useNavigate()
  const handleView = (user: UserInterface) => {
    props.onSelectUser(user)
  }

  // const renderVerificationStatus = (isVerified: boolean) => {
  //   return isVerified ? (
  //     <FaCheckCircle className='text-green-500' />
  //   ) : (
  //     <FaTimesCircle className='text-red-500' />
  //   )
  // }

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
              <th className='px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider'>
                User Name
              </th>
              <th className='px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider'>
                Role
              </th>
              <th className='px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider'>
                Email
              </th>
              <th className='px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider'>
                phone
              </th>
              <th className='px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider'>
                Seller Status
              </th>
              <th className='px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider'>
                User Detail
              </th>
              <th className='px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider'>
                Seller Detail
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
                <td className='px-5 py-5  text-left border-b border-gray-200 text-sm'>
                  <p>{user.role}</p>
                </td>
                <td className='px-5 py-5  text-left border-b border-gray-200 text-sm'>
                  <p>{user.email}</p>
                </td>
                <td className='px-5 py-5  text-left border-b border-gray-200 text-sm '>
                  <p>{user.phone}</p>
                </td>
                <td className='px-5 py-5 text-left border-b border-gray-200 text-sm'>
                  <p
                    className={
                      user.sellerStatus === 'approved'
                        ? 'text-green-500 font-bold font-sans'
                        : user.sellerStatus === 'rejected'
                        ? 'text-red-500 font-bold font-sans'
                        : // : user.sellerStatus === 'pending'
                        user.sellerStatus === 'submitted'
                        ? 'text-yellow-500 font-bold font-sans'
                        : // : user.sellerStatus === 'waiting'
                        user.sellerStatus === 'pending'
                        ? 'text-pink-400 font-bold font-sans'
                        : 'font-bold font-sans'
                    }
                  >
                    {user.sellerStatus === 'approved'
                      ? 'Approved'
                      : user.sellerStatus === 'rejected'
                      ? 'Rejected'
                      : user.sellerStatus === 'pending'
                      ? 'Pending'
                      : user.sellerStatus === 'submitted'
                      ? 'Submitted'
                      : ''}
                  </p>
                </td>

                <td className='px-5 py-5 border-b border-gray-200 text-sm'>
                  <div onClick={() => handleUserDetail(user)}>
                    <FaEye
                      className='cursor-pointer text-blue-500 hover:text-gray-700'
                      style={{fontSize: '1.1rem'}}
                    />
                  </div>
                </td>

                <td className='px-5 py-5 border-b border-gray-200 text-sm'>
                  {/* {user.sellerStatus === 'approved' || user.sellerStatus === 'rejected' ? ( */}
                  {user.sellerStatus && user.sellerStatus !== 'pending' ? (
                    <div onClick={() => handleView(user)}>
                      <FaEye
                        className='cursor-pointer text-blue-500 hover:text-gray-700'
                        style={{fontSize: '1.1rem'}}
                      />
                    </div>
                  ) : (
                    ''
                  )}
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
