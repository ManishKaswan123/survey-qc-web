import React, {useState} from 'react'
import {QuestionTableProps} from '../question.interface'
import {RiArrowDownSLine, RiArrowUpSLine} from 'react-icons/ri'

// QuestionCard component
const QuestionCard: React.FC<QuestionTableProps> = ({key, question, setIsUpdateModalOpen}) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const [remark, setRemark] = useState('')
  const [isRejected, setIsRejected] = useState(false)

  const handleExpand = () => setIsExpanded(!isExpanded)
  const handleReject = () => setIsRejected(true)
  const handleApprove = () => {
    setIsRejected(false)
    setRemark('')
    // Handle approve logic here
  }
  const handleSaveRemark = () => {
    // Handle save remark logic here
    console.log('Remark saved:', remark)
  }

  return (
    <div className='border border-gray-300 rounded-lg shadow-md p-4 mb-4 bg-white'>
      <div className='flex justify-between items-center cursor-pointer' onClick={handleExpand}>
        <span className='font-bold  text-xl'>{question?.questionId?.questionCode}.</span>
        <span className='text-md  ml-5'>{question?.questionId?.name}</span>
        <div
          className={`px-2 py-1 text-md text-gray-50 ml-auto rounded  ${
            question?.status?.toLowerCase() === 'completed' ? 'bg-green-400' : 'bg-red-400'
          }`}
        >
          {question?.status}
        </div>
        <span className='text-lg text-gray-500 ml-4'>
          {isExpanded ? (
            <RiArrowUpSLine className='font-bold' size={24} />
          ) : (
            <RiArrowDownSLine className='font-bold' size={24} />
          )}
        </span>
      </div>

      {isExpanded && (
        <div className='mt-4'>
          <span className='font-bold  text-xl'>Ans.</span>
          {question?.multipleChoiceResponse?.length > 0 ? (
            <ul className='list-disc pl-5'>
              {question?.multipleChoiceResponse?.map((option, index) => (
                <li key={index} className='mb-2 text-gray-700'>
                  {option}
                </li>
              ))}
            </ul>
          ) : (
            <p className='text-gray-700 italic'>{question?.textResponse}</p>
          )}

          <div className='flex mt-4 space-x-4'>
            <button
              className='px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600'
              onClick={handleApprove}
            >
              Approve
            </button>
            <button
              className='px-4 py-2 bg-red-500 text-gray-50 rounded-md hover:bg-red-600'
              onClick={handleReject}
            >
              Reject
            </button>
          </div>

          {isRejected && (
            <div className='mt-4'>
              <textarea
                className='w-full p-2 border border-gray-300 rounded-md mb-2'
                value={remark}
                onChange={(e) => setRemark(e.target.value)}
                placeholder='Enter remark'
              />
              <button
                className='px-4 py-2 bg-blue-500 text-gray-50 rounded-md hover:bg-blue-600'
                onClick={handleSaveRemark}
              >
                Save Remark
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default QuestionCard
