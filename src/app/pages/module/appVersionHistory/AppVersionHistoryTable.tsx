import React from 'react'
import {FaCheck, FaTimes, FaTrash} from 'react-icons/fa'

interface AppVersionHistoryProps {
  title: string
  descriptions: string
  code: string
  isForceUpdate: boolean
  isActive: boolean
  createdAt: string
  updatedAt: string
  id: string
}
interface AppVersionHistoryTableProps {
  data?: AppVersionHistoryProps[]
  onDelete: (id: string) => void
}

const AppVersionHistoryTable: React.FC<AppVersionHistoryTableProps> = (props) => {
  console.log('table data', props.data)
  return (
    <div className='overflow-x-auto'>
      <div className='shadow rounded-lg overflow-hidden'>
        <table className='min-w-full leading-normal'>
          {/* Table headers */}
          <thead>
            <tr>
              <th className='px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider'>
                Title
              </th>
              <th className='px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider'>
                Code
              </th>
              <th className='px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider'>
                Description
              </th>
              <th className='px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider'>
                Created At
              </th>
              <th className='px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider'>
                Updated At
              </th>
              <th className='px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider'>
                Force Update
              </th>
              <th className='px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider'>
                Status
              </th>
              <th className='px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider'>
                Action
              </th>
            </tr>
          </thead>

          {/* Table body */}
          <tbody>
            {props.data?.map((version: AppVersionHistoryProps) => (
              <tr key={version.id} className='odd:bg-white even:bg-gray-50'>
                <td className='px-5 py-5 text-left border-b border-gray-200 text-sm'>
                  {version.title !== undefined ? (
                    <p className='text-gray-900 whitespace-no-wrap'>{version.title}</p>
                  ) : (
                    <p className='text-gray-500'>...</p>
                  )}
                </td>
                {/* <td className='px-5 py-5 text-left border-b border-gray-200 text-sm'>
                  <p>{version.descriptions ? version.descriptions : 'N/A'}</p>
                </td> */}
                <td className='px-5 py-5 text-left border-b border-gray-200 text-sm'>
                  <p>{version.code ? version.code : 'N/A'}</p>
                </td>
                <td className='px-5 py-5 text-left border-b border-gray-200 text-sm'>
                  <p>{version.descriptions ? version.descriptions : 'N/A'}</p>
                </td>

                <td className='px-5 py-5 text-left border-b border-gray-200 text-sm'>
                  <p>{version.createdAt ? version.createdAt : 'N/A'}</p>
                </td>
                <td className='px-5 py-5 text-left border-b border-gray-200 text-sm'>
                  <p>{version.updatedAt ? version.updatedAt : 'N/A'}</p>
                </td>
                <td className='px-5 py-5 text-left border-b border-gray-200 text-sm'>
                  {version.isForceUpdate ? 'Yes' : 'No'}
                </td>

                <td className='px-5 py-5 text-left border-b border-gray-200 text-sm'>
                  <p
                    className={
                      version.isActive
                        ? 'text-green-500 font-bold font-sans'
                        : 'text-red-500 font-bold font-sans'
                    }
                  >
                    {version.isActive ? 'Active' : 'Inactive'}
                  </p>
                </td>

                <td className='px-5 py-5 text-left border-b border-gray-200 text-sm items-start'>
                  {version.isActive && (
                    <FaTrash
                      className='text-red-500 cursor-pointer h-4 w-4'
                      onClick={() => props.onDelete(version.id)}
                    />
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

export default AppVersionHistoryTable
