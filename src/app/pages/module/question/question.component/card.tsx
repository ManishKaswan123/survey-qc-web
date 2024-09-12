import React from 'react'
import {Link} from 'react-router-dom'
import {Question} from '../question.interface'

const QuestionCard: React.FC<Question> = ({
  questionName,
  questionType,
  validation,
  answerType,
  options,
}) => {
  const renderOptions = () => {
    if (!options || options.length === 0) return null
    return (
      <div className='mt-1'>
        <h3 className='text-gray-800 font-medium text-sm mb-1'>Options:</h3>
        <div className='flex flex-wrap gap-1'>
          {options.map((option, index) => (
            <div key={index} className='text-gray-700 bg-gray-100 p-1 rounded-md flex-shrink-0'>
              {option.label}
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className='bg-white shadow-sm rounded-md overflow-hidden border border-gray-300 hover:shadow-md transition-all duration-300 max-w-full mx-auto my-2'>
      <div className='p-3'>
        {/* Question Header */}
        <div className='flex justify-between items-center mb-2'>
          <h2 className='text-lg font-semibold text-gray-800'>{questionName}</h2>
          <span className='bg-blue-100 text-blue-500 text-xs font-semibold px-2 py-1 rounded-full'>
            {questionType}
          </span>
        </div>

        {/* Question Details */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-3 mb-2'>
          <div>
            <p className='text-gray-600 text-xs'>
              <strong>Validation:</strong> {validation}
            </p>
          </div>
          <div>
            <p className='text-gray-600 text-xs'>
              <strong>Answer Type:</strong> {answerType}
            </p>
          </div>
        </div>

        {/* Render Options (If applicable) */}
        {renderOptions()}

        {/* Stylish Link */}
        <div className='mt-2 flex justify-end'>
          <Link to='/answer'>
            <span className='text-gray-800 font-medium text-sm hover:text-blue-600 hover:underline transition-colors duration-200'>
              View Answers
            </span>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default QuestionCard
