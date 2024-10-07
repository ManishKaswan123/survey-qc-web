import React from 'react'
import {useNavigate} from 'react-router-dom'

// Define the BackButton component
const BackButton: React.FC = () => {
  const navigate = useNavigate()

  // Function to handle back navigation
  const handleBack = () => {
    navigate(-1)
  }

  return (
    <button onClick={handleBack} className='flex items-center space-x-2'>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        className='h-6 w-6 text-blue-500'
        fill='none'
        viewBox='0 0 24 24'
        stroke='currentColor'
      >
        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 19l-7-7 7-7' />
      </svg>
      <span className='text-blue-500'>Back</span>
    </button>
  )
}

export default BackButton
