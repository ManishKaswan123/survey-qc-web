import React from 'react'
import {FaEdit, FaTrash, FaRocket} from 'react-icons/fa'
import {Program} from '../programInterfaces'
import {useNavigate} from 'react-router-dom'
import {formatDateTime, getStatusName} from 'sr/utils/helper'
import {statusColors} from 'sr/constants/common'
import {programColumns} from './ProgramConstants'

interface ProgramTableProps {
  programData: Program[]
  onEdit: (program: Program) => void
  onDelete: (program: string) => void
  onView: (programId: string) => void
}

const ProgramTable: React.FC<ProgramTableProps> = ({programData, onEdit, onDelete, onView}) => {
  // const [expandedPrograms, setExpandedPrograms] = useState<Set<string>>(new Set())

  // const toggleDetails = (_id: string) => {
  //   setExpandedPrograms((prev) => {
  //     const newSet = new Set(prev)
  //     if (newSet.has(_id)) {
  //       newSet.delete(_id)
  //     } else {
  //       newSet.add(_id)
  //     }
  //     return newSet
  //   })
  // }
  const navigate = useNavigate()
  return (
    <div className='overflow-x-auto my-5'>
      <div className='shadow rounded-lg overflow-hidden'>
        <table className='min-w-full leading-normal'>
          <thead>
            <tr>
              {programColumns.map((header) => (
                <th
                  key={header}
                  className='px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider'
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {programData?.map((program) => (
              <tr key={program._id} className='odd:bg-white even:bg-gray-50'>
                <td className='px-5 py-5 text-left border-b border-gray-200 text-sm'>
                  <p className='text-gray-900 whitespace-no-wrap'>{program.name}</p>
                </td>
                <td className='px-5 py-5 text-left border-b border-gray-200 text-sm'>
                  <p>{program.description}</p>
                </td>
                <td className='px-5 py-5 text-left border-b border-gray-200 text-sm'>
                  <p>{formatDateTime(program.startDate)}</p>
                </td>
                <td className='px-5 py-5 text-left border-b border-gray-200 text-sm'>
                  <p
                    className={`${
                      program.isActive ? statusColors['active'] : statusColors['inactive']
                    } font-semibold text-sm`}
                  >
                    {getStatusName(program.isActive ? 'active' : 'inactive')}
                  </p>
                </td>
                <td className='px-5 py-5 text-left border-b border-gray-200 text-sm'>
                  <div className='flex space-x-4'>
                    <button
                      className='text-blue-500 hover:text-blue-700'
                      onClick={() => onEdit(program)}
                    >
                      <FaEdit size={16} />
                    </button>
                    <button
                      className='text-red-500 hover:text-red-700'
                      onClick={() => onDelete(program._id)}
                    >
                      <FaTrash size={16} />
                    </button>
                  </div>
                </td>
                <td className='py-5 text-center border-b border-gray-200 text-sm border-r'>
                  <div className='flex justify-start'>
                    <FaRocket
                      className='text-blue-800 hover:cursor-pointer'
                      size={20}
                      onClick={() => {
                        navigate(`/section?programId=${program._id}`)
                      }}
                    />
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

export default ProgramTable
