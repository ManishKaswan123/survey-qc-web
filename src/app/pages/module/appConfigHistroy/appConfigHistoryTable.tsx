import React, {useState} from 'react'
import {FaCheck, FaEdit, FaEye, FaTimes, FaTrash} from 'react-icons/fa'
import ConfigModal from 'sr/helpers/ui-components/ConfigModal'

interface AppConfigHistoryProps {
  title: string
  descriptions: string
  code: string
  isForceUpdate: boolean
  isActive: boolean
  createdAt: string
  updatedAt: string
  id: string
}

interface AppConfigHistoryTableProps {
  data?: AppConfigHistoryProps[]
  setSelectedData: any
  setIsUpdateModalOpen: any
  onDelete: (id: string) => void
}

const AppConfigHistoryTable: React.FC<AppConfigHistoryTableProps> = (props) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalData, setModalData] = useState({})
  const [modalType, setModalType] = useState('')

  const handleEyeClick = (data: any, type: string) => {
    setModalData(data)
    setModalType(type)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  return (
    <div>
      {isModalOpen ? (
        <ConfigModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          data={modalData}
          type={modalType}
        />
      ) : (
        <div className='overflow-x-auto'>
          <div className='shadow rounded-lg overflow-hidden'>
            <table className='min-w-full leading-normal'>
              <thead>
                <tr>
                  <th className='px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider'>
                    Version
                  </th>
                  <th className='px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider'>
                    Description
                  </th>

                  <th className='px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider'>
                    STATIC_DATA
                  </th>
                  <th className='px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider'>
                    DROP_DOWN_DATA
                  </th>
                  <th className='px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider'>
                    LANGUAGE_DATA
                  </th>
                  <th className='px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider'>
                    Status
                  </th>
                  <th className='px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider'>
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {props.data?.map((config: any) => (
                  <tr key={config.id} className='odd:bg-white even:bg-gray-50'>
                    <td className='px-5 py-5 text-left border-b border-gray-200 text-sm'>
                      {config.version !== undefined ? (
                        <p className='text-gray-900 whitespace-no-wrap'>{config.version}</p>
                      ) : (
                        <p className='text-gray-500'>...</p>
                      )}
                    </td>
                    <td className='px-5 py-5 text-left border-b border-gray-200 text-sm'>
                      <p>{config.descriptions ? config.descriptions : 'N/A'}</p>
                    </td>

                    <td className='px-5 py-5 border-b border-gray-200 text-sm'>
                      <div className='flex justify-start'>
                        <FaEye
                          className='text-blue-500 cursor-pointer h-4 w-4'
                          onClick={() => handleEyeClick(config.config.STATIC_DATA, 'STATIC_DATA')}
                        />
                      </div>
                    </td>
                    <td className='px-5 py-5 border-b border-gray-200 text-sm'>
                      <div className='flex justify-start'>
                        <FaEye
                          className='text-blue-500 cursor-pointer h-4 w-4'
                          onClick={() =>
                            handleEyeClick(config.config.DROP_DOWN_DATA, 'DROP_DOWN_DATA')
                          }
                        />
                      </div>
                    </td>
                    <td className='px-5 py-5 border-b border-gray-200 text-sm'>
                      <div className='flex justify-start'>
                        <FaEye
                          className='text-blue-500 cursor-pointer h-4 w-4'
                          onClick={() =>
                            handleEyeClick(config.config.LANGUAGE_DATA, 'LANGUAGE_DATA')
                          }
                        />
                      </div>
                    </td>
                    <td className='px-5 py-5 text-left border-b border-gray-200 text-sm'>
                      <p
                        className={
                          config.isActive
                            ? 'text-green-500 font-bold font-sans'
                            : 'text-red-500 font-bold font-sans'
                        }
                      >
                        {config.isActive ? 'Active' : 'Inactive'}
                      </p>
                    </td>
                    <td className='px-5 py-5 text-left border-b border-gray-200 text-sm items-start'>
                      <div className='flex space-x-3 items-center'>
                        {/* <FaEdit
                            className='text-blue-500 cursor-pointer h-4 w-4'
                            onClick={() => {
                              props.setSelectedData(config)
                              props.setIsUpdateModalOpen(true)
                            }}
                          /> */}
                        {config.isActive && (
                          <FaTrash
                            className='text-red-500 cursor-pointer h-4 w-4'
                            onClick={() => props.onDelete(config.id)}
                          />
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}

export default AppConfigHistoryTable
