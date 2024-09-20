import React from 'react'

export const SkeletonCard: React.FC = () => {
  return (
    <div className='bg-white shadow rounded-lg p-6 flex items-center hover:bg-gray-50'>
      {/* Icon Skeleton */}
      <div className='flex-shrink-0 bg-gray-200 p-4 rounded-full w-12 h-12 animate-pulse'></div>

      {/* Text Skeleton */}
      <div className='ml-4'>
        <div className='w-24 h-6 bg-gray-200 rounded animate-pulse mb-2'></div>
        <div className='w-36 h-4 bg-gray-200 rounded animate-pulse'></div>
      </div>
    </div>
  )
}

export default SkeletonCard
