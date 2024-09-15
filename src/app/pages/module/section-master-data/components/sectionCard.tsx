import React from 'react'
import { Section } from '../sectionInterfaces'
import { FaEdit, FaTrash, FaEye } from 'react-icons/fa'

const SectionCard: React.FC<Section> = ({ name, description, details, startDate, endDate }) => {
  return (
    <div className='bg-white shadow-lg rounded-lg p-6 relative transition-transform transform hover:scale-105 hover:shadow-xl hover:cursor-pointer'>
      <h2 className='text-2xl font-bold mb-3'>{name}</h2>
      <p className='text-gray-600 mb-3'>{description}</p>
      <p className='text-gray-500 text-sm mb-1'>{details}</p>
      <div className='text-gray-500 text-sm mb-3'>
        <p>Start Date: {new Date(startDate).toLocaleDateString()}</p>
        <p>End Date: {new Date(endDate).toLocaleDateString()}</p>
      </div>

      <div className='flex space-x-6 mt-4'>
        <button
          className='text-blue-500 hover:text-blue-700 relative group'
          onClick={() => console.log('Edit section')}
        >
          <FaEdit size={18} />
          <span className='absolute bottom-full mb-2 hidden group-hover:block text-xs bg-gray-700 text-white rounded px-2 py-1'>
            Edit section
          </span>
        </button>
        <button
          className='text-red-500 hover:text-red-700 relative group'
          onClick={() => console.log('Delete section')}
        >
          <FaTrash size={18} />
          <span className='absolute bottom-full mb-2 hidden group-hover:block text-xs bg-gray-700 text-white rounded px-2 py-1'>
            Delete section
          </span>
        </button>
        <button
          className='text-green-500 hover:text-green-700 relative group'
          onClick={() => console.log('View section')}
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

export default SectionCard
