import React, {useState} from 'react'
import {FaEdit, FaTrash, FaEye, FaGlobe, FaSquare, FaInfoCircle, FaTh} from 'react-icons/fa'
import {Section} from '../sectionInterfaces'
import {HiMiniSquares2X2} from 'react-icons/hi2'
import {useNavigate} from 'react-router-dom'

interface SectionTableProps {
  sectionData: Section[]
  onEdit: (section: Section) => void
  onDelete: (section: Section) => void
  onView: (sectionId: string) => void
}

const SectionTable: React.FC<SectionTableProps> = ({sectionData, onEdit, onDelete, onView}) => {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set())
  const navigate = useNavigate()

  const data = [
    {
      ulbId: '801324',
      ulbName: 'MUZAFFARPUR',
      state: 'BIHAR',
      target: '5000',
      doScheduledDate: '12-Aug-2024 17:09:49',
      lastSyncedTime: '14-Aug-2024 14:03:50',
      status: 'COMPLETED',
      id: '1',
    },
    {
      ulbId: '801324',
      ulbName: 'MUZAFFARPUR',
      state: 'BIHAR',
      target: '5000',
      doScheduledDate: '12-Aug-2024 17:09:49',
      lastSyncedTime: '14-Aug-2024 14:03:50',
      status: 'COMPLETED',
      id: '2',
    },
    {
      ulbId: '801324',
      ulbName: 'MUZAFFARPUR',
      state: 'BIHAR',
      target: '5000',
      doScheduledDate: '12-Aug-2024 17:09:49',
      lastSyncedTime: '14-Aug-2024 14:03:50',
      status: 'COMPLETED',
      id: '3',
    },
    {
      ulbId: '801324',
      ulbName: 'MUZAFFARPUR',
      state: 'BIHAR',
      target: '5000',
      doScheduledDate: '12-Aug-2024 17:09:49',
      lastSyncedTime: '14-Aug-2024 14:03:50',
      status: 'COMPLETED',
      id: '4',
    },
    {
      ulbId: '801324',
      ulbName: 'MUZAFFARPUR',
      state: 'BIHAR',
      target: '5000',
      doScheduledDate: '12-Aug-2024 17:09:49',
      lastSyncedTime: '14-Aug-2024 14:03:50',
      status: 'COMPLETED',
      id: '5',
    },
    // Add more records as needed
  ]

  const toggleDescription = (id: string) => {
    setExpandedSections((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(id)) {
        newSet.delete(id)
      } else {
        newSet.add(id)
      }
      return newSet
    })
  }

  return (
    <div className='overflow-x-auto my-5 bg-white'>
      <div className='shadow overflow-hidden'>
        <div className='flex justify-end pt-2 pb-4 gap-4 mr-3'>
          <div className='text-[#3690ea] text-sm font-semibold hover:cursor-pointer'>
            ULB list Download
          </div>
          <div className='text-[#3690ea] text-sm font-semibold hover:cursor-pointer'>
            Ward list Download
          </div>
        </div>
        <table className='min-w-full leading-normal'>
          <thead>
            <tr>
              <th className='py-5 bg-[#265B91] text-left text-xs font-semibold text-gray-50 uppercase tracking-wider border-r'>
                ULB ID
              </th>
              <th className='py-5 bg-[#265B91] text-left text-xs font-semibold text-gray-50 uppercase tracking-wider border-r'>
                ULB Name
              </th>
              <th className='py-5 bg-[#265B91] text-left text-xs font-semibold text-gray-50 uppercase tracking-wider border-r'>
                State
              </th>
              <th className='py-5 bg-[#265B91] text-left text-xs font-semibold text-gray-50 uppercase tracking-wider border-r'>
                Target
              </th>
              <th className='py-5 bg-[#265B91] text-left text-xs font-semibold text-gray-50 uppercase tracking-wider border-r'>
                DO Scheduled Date
              </th>
              <th className='py-5 bg-[#265B91] text-left text-xs font-semibold text-gray-50 uppercase tracking-wider border-r'>
                Last Synced Time
              </th>
              <th className='py-5 bg-[#265B91] text-left text-xs font-semibold text-gray-50 uppercase tracking-wider border-r'>
                Status
              </th>
              <th className='py-5 bg-[#265B91] text-left text-xs font-semibold text-gray-50 uppercase tracking-wider border-r'></th>
              <th className='py-5 bg-[#265B91] text-left text-xs font-semibold text-gray-50 uppercase tracking-wider border-r'>
                DO
              </th>
              <th className='py-5 bg-[#265B91] text-left text-xs font-semibold text-gray-50 uppercase tracking-wider'>
                SP
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.ulbId} className='odd:bg-white even:bg-blue-50'>
                <td className='py-5 text-center border-b border-gray-200 text-sm border-r'>
                  <div className='flex justify-center items-center'>
                    <span>{item.ulbId}</span>
                    <FaInfoCircle className='ml-2 text-blue-600' />
                  </div>
                </td>
                <td className='py-5 text-center border-b border-gray-200 text-sm border-r'>
                  <p>{item.ulbName}</p>
                </td>
                <td className='py-5 text-center border-b border-gray-200 text-sm border-r'>
                  <p>{item.state}</p>
                </td>
                <td className='py-5 text-center border-b border-gray-200 text-sm border-r'>
                  <div className='flex justify-center items-center hover:cursor-pointer'>
                    <FaEye className='text-blue-800' size={18} />
                  </div>
                </td>
                <td className='py-5 text-center border-b border-gray-200 text-sm border-r'>
                  <p>{item.doScheduledDate}</p>
                </td>
                <td className='py-5 text-center border-b border-gray-200 text-sm border-r'>
                  <p>{item.lastSyncedTime}</p>
                </td>
                <td className='py-5 text-center border-b border-gray-200 text-sm border-r'>
                  <span className='bg-green-500 text-white rounded px-2 py-1 hover:cursor-pointer'>
                    {item.status}
                  </span>
                </td>
                <td className='py-5 text-center border-b border-gray-200 text-sm border-r'>
                  <div className='flex justify-center items-center hover:cursor-pointer'>
                    <FaGlobe className='text-green-600' size={18} />
                  </div>
                </td>
                <td className='py-5 text-center border-b border-gray-200 text-sm border-r'>

                  <div className='flex justify-center items-center'>
                    <HiMiniSquares2X2
                      className='text-blue-800 hover:cursor-pointer'
                      size={20}
                      onClick={() => {
                        navigate('/question')
                      }}
                    />

                  </div>
                </td>
                <td className='py-5 text-center border-b border-gray-200 text-sm border-r'>
                  <div className='flex justify-center items-center hover:cursor-pointer'>
                    <HiMiniSquares2X2 className='text-blue-800' size={20} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default SectionTable
