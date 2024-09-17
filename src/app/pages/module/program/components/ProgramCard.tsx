import React from 'react'
import {Program} from '../programInterfaces'
import {FaEdit, FaTrash, FaEye} from 'react-icons/fa'

const ProgramCard: React.FC<Program> = ({name, description, startDate}) => {
  return (
    <div className='bg-white shadow-lg rounded-lg p-6 relative transition-transform transform hover:scale-105 hover:shadow-xl hover:cursor-pointer'>
      <h2 className='text-2xl font-bold mb-3'>{name}</h2>
      <p className='text-gray-600 mb-3'>{description}</p>
      <div className='text-gray-500 text-sm mb-3'>
        <p>Start Date: {new Date(startDate).toLocaleDateString()}</p>
      </div>

      <div className='flex space-x-6 mt-4'>
        <button
          className='text-blue-500 hover:text-blue-700 relative group'
          onClick={() => console.log('Edit program')}
        >
          <FaEdit size={18} />
          <span className='absolute bottom-full mb-2 hidden group-hover:block text-xs bg-gray-700 text-white rounded px-2 py-1'>
            Edit sections
          </span>
        </button>
        <button
          className='text-red-500 hover:text-red-700 relative group'
          onClick={() => console.log('Delete program')}
        >
          <FaTrash size={18} />
          <span className='absolute bottom-full mb-2 hidden group-hover:block text-xs bg-gray-700 text-white rounded px-2 py-1'>
            Delete sections
          </span>
        </button>
        <button
          className='text-green-500 hover:text-green-700 relative group'
          onClick={() => console.log('View sections')}
        >
          <FaEye size={18} />
          <span className='absolute bottom-full mb-2 hidden group-hover:block text-xs bg-gray-700 text-white rounded px-2 py-1'>
            See all sections
          </span>
        </button>
      </div>
    </div>
  )
}

export default ProgramCard
