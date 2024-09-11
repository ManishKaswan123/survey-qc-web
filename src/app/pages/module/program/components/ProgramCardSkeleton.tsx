import React from 'react'

const ProgramCardSkeleton: React.FC = () => {
  return (
    <div className='bg-white shadow-lg rounded-lg p-6 mb-4 animate-pulse'>
      <div className='h-6 bg-gray-300 rounded mb-3'></div>
      <div className='h-4 bg-gray-300 rounded mb-2'></div>
      <div className='h-4 bg-gray-300 rounded mb-2'></div>
      <div className='h-4 bg-gray-300 rounded mb-2'></div>
      <div className='h-4 bg-gray-300 rounded mb-3'></div>
      <div className='flex space-x-6 mt-4'>
        <div className='h-8 w-8 bg-gray-300 rounded'></div>
        <div className='h-8 w-8 bg-gray-300 rounded'></div>
        <div className='h-8 w-8 bg-gray-300 rounded'></div>
      </div>
    </div>
  )
}

export default ProgramCardSkeleton
