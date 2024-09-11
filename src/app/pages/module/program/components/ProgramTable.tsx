import React, {useState} from 'react'
import {FaEdit, FaTrash, FaEye} from 'react-icons/fa'
import {Program} from '../programInterfaces'

interface ProgramTableProps {
  programData: Program[]
  onEdit: (program: Program) => void
  onDelete: (program: Program) => void
  onView: (programId: string) => void
}

const ProgramTable: React.FC<ProgramTableProps> = ({programData, onEdit, onDelete, onView}) => {
  const [expandedPrograms, setExpandedPrograms] = useState<Set<string>>(new Set())

  const toggleDetails = (id: string) => {
    setExpandedPrograms((prev) => {
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
    <div className='overflow-x-auto my-5'>
      <div className='shadow rounded-lg overflow-hidden'>
        <table className='min-w-full leading-normal'>
          <thead>
            <tr>
              <th className='px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider'>
                Program Name
              </th>
              <th className='px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider'>
                Details
              </th>
              <th className='px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider'>
                Start Date
              </th>
              <th className='px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider'>
                End Date
              </th>
              <th className='px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider'>
                Section
              </th>
              <th className='px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider'>
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {programData.map((program) => (
              <tr key={program.id} className='odd:bg-white even:bg-gray-50'>
                <td className='px-5 py-5 text-left border-b border-gray-200 text-sm'>
                  <p className='text-gray-900 whitespace-no-wrap'>{program.name}</p>
                </td>
                <td className='px-5 py-5 text-left border-b border-gray-200 text-sm'>
                  <p>
                    {expandedPrograms.has(program.id)
                      ? program.details
                      : `${program.details.substring(0, 50)}...`}
                    <button
                      className='text-blue-500 hover:text-blue-700 ml-2'
                      onClick={() => toggleDetails(program.id)}
                    >
                      {expandedPrograms.has(program.id) ? 'less' : 'more'}
                    </button>
                  </p>
                </td>
                <td className='px-5 py-5 text-left border-b border-gray-200 text-sm'>
                  <p>{new Date(program.startDate).toLocaleDateString()}</p>
                </td>
                <td className='px-5 py-5 text-left border-b border-gray-200 text-sm'>
                  <p>{new Date(program.endDate).toLocaleDateString()}</p>
                </td>
                <td className='px-5 py-5 text-left border-b border-gray-200 text-sm'>
                  <div className='flex ml-[20%]'>
                    <button
                      className='text-green-500 hover:text-green-700 text-center'
                      onClick={() => onView(program.id)}
                    >
                      <FaEye size={16} />
                    </button>
                  </div>
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
                      onClick={() => onDelete(program)}
                    >
                      <FaTrash size={16} />
                    </button>
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
