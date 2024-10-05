import React from 'react'
import {
  FaCheckCircle,
  FaTimesCircle,
  FaFlag,
  FaRedoAlt,
  FaHourglassStart,
  FaSpinner,
} from 'react-icons/fa'

interface TotalCardProps {
  totalUsers: number | null | undefined
  title: string
}
const statusIconMap = new Map<string, JSX.Element>([
  ['Submitted', <FaCheckCircle className='h-4 w-4 text-blue-500' />],
  ['Approved', <FaCheckCircle className='h-4 w-4 text-green-500' />],
  ['Flagged', <FaFlag className='h-4 w-4 text-red-500' />],
  ['Resubmitted', <FaRedoAlt className='h-4 w-4 text-yellow-500' />],
  ['Yet to start', <FaHourglassStart className='h-4 w-4 text-gray-500' />],
  ['Rejected', <FaTimesCircle className='h-4 w-4 text-red-500' />],
  ['In Progress', <FaSpinner className='h-4 w-4 text-blue-500' />],
])

const TotalCard: React.FC<TotalCardProps> = ({totalUsers, title}) => {
  const displayUsers = totalUsers !== undefined && totalUsers !== null ? totalUsers : '...'
  const Icon = statusIconMap.get(title)

  return (
    <div className='bg-white shadow rounded-lg p-6 flex items-center hover:bg-gray-50'>
      <div className='flex-shrink-0 bg-gray-200 p-4 rounded-full'>{Icon}</div>
      <div className='ml-4 flex items-center'>
        <div className='text-2xl font-semibold text-gray-900'>{displayUsers}</div>
        <div className='text-sm text-gray-500 ml-2'>{title}</div>
      </div>
    </div>
  )
}

export default TotalCard
