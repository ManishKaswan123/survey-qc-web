import React, {useEffect, useState} from 'react'
import {QuestionTableProps} from '../question.interface'
import {RiArrowDownSLine, RiArrowUpSLine} from 'react-icons/ri'
import {getPreSignedURL} from 'sr/utils/api/media'
import {UpdateAnswers} from '../question.helper'
import {d} from '@tanstack/react-query-devtools/build/legacy/devtools-PtxSnd7z'
import {toast} from 'react-toastify'

// QuestionCard component
const QuestionCard: React.FC<QuestionTableProps> = ({
  setReRender,
  key,
  data,
  setIsUpdateModalOpen,
}) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const [remark, setRemark] = useState('')
  const [isRejected, setIsRejected] = useState(false)
  const [isFiles, setIsFiles] = useState<string[]>([])
  const handleExpand = () => setIsExpanded(!isExpanded)
  // const handleReject = () => setIsRejected(true)
  // const handleApprove = () => {
  //   setIsRejected(false)
  //   setRemark('')
  //   // Handle approve logic here
  // }
  const handleSaveRemark = async (status: string) => {
    // Handle save remark logic here
    console.log('this is question type : - ', data?.questionType)
    console.log('this is status :- ', status)
    console.log('this is data :- ', data)
    console.log('Remark saved:', remark)
    let payload = {
      ...(data?.textResponse && {textResponse: data?.textResponse}),
      ...(data?.dateResponse && {dateResponse: data?.dateResponse}),
      ...(data?.toDateResponse && {toDateResponse: data?.toDateResponse}),
      ...(data?.multipleChoiceResponse && {multipleChoiceResponse: data?.multipleChoiceResponse}),
      ...(data?.numberResponse && {numberResponse: data?.numberResponse}),
      remarks: remark,
      status: status,
      questionId: data?.questionId,
      faId: data?.faId,
      surveyId: data?.surveyId,
      programId: data?.programId,
      sectionId: data?.sectionId,
    }
    handleExpand()
    if (data?.answerId) {
      const res = await UpdateAnswers(data?.answerId, payload)
      if (res.status === 'success') {
        setReRender(true)
        toast.success('Remark saved successfully')
      } else {
        toast.error('Failed to save remark')
      }
    } else {
      toast.error('Answer ID not found')
    }
  }

  // Determine the response to display
  useEffect(() => {
    const handleFiles = async () => {
      if (data.questionType === 'FILE_UPLOAD') {
        if (data?.multipleChoiceResponse && data?.multipleChoiceResponse?.length > 0) {
          const urls = await Promise.all(
            data?.multipleChoiceResponse?.map(async (response) => {
              const payload = {fileName: response} // Adjust payload as needed
              const urlResponse = await getPreSignedURL(payload)
              return urlResponse ? urlResponse.url : 'Error'
            })
          )
          setIsFiles(urls)
        }
      }
    }
    handleFiles()
  }, [data])

  const getResponseDisplay = () => {
    const formatDate = (date: string) => {
      if (!date) return '' // Handle if date is undefined or null
      const parsedDate = new Date(date)
      return parsedDate.toLocaleDateString('en-GB') // dd/mm/yyyy format
    }

    if (data?.options?.length > 0) {
      const responseValue = data?.textResponse || data?.dateResponse || data?.numberResponse

      const matchedOption = data?.options?.find((option) => option?.fieldValue === responseValue)
      return matchedOption ? matchedOption?.fieldName : responseValue
    }

    const dateResponseDisplay =
      data?.toDateResponse && data?.dateResponse
        ? `${formatDate(data?.dateResponse)} to ${formatDate(data?.toDateResponse)}`
        : data?.dateResponse
        ? formatDate(data?.dateResponse)
        : ''

    return data?.textResponse || dateResponseDisplay || data?.numberResponse
  }

  return (
    <div className='border border-gray-300 rounded-lg shadow-md p-4 mb-4 bg-white'>
      <div className='flex justify-between items-center cursor-pointer' onClick={handleExpand}>
        <span className='font-bold text-xl'>{data?.questionCode}.</span>
        <span className='text-md ml-5'>{data?.fieldName}</span>
        <div
          className={`px-2 py-1 text-md text-gray-50 ml-auto rounded ${
            data?.status?.toLowerCase() === 'submitted'
              ? 'bg-blue-400'
              : data?.status?.toLowerCase() === 'approved'
              ? 'bg-green-400'
              : data?.status?.toLowerCase() === 'flagged'
              ? 'bg-yellow-400'
              : data?.status?.toLowerCase() === 'resubmitted'
              ? 'bg-purple-400'
              : data?.status?.toLowerCase() === 'yettostart'
              ? 'bg-gray-400'
              : data?.status?.toLowerCase() === 'rejected'
              ? 'bg-red-400'
              : data?.status?.toLowerCase() === 'inProgress'
              ? 'bg-lime-300'
              : 'bg-red-400'
          }`}
        >
          {data?.status}
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
          <span className='font-bold text-xl'>Ans.</span>
          {isFiles.length > 0 ? (
            isFiles.map((url, index) =>
              url ? (
                <img
                  key={index}
                  src={url}
                  alt={`Uploaded file ${index + 1}`}
                  className='w-full h-auto mb-2'
                />
              ) : (
                'Error'
              )
            )
          ) : (
            <div className='text-gray-700 italic'>{getResponseDisplay()}</div>
          )}
          <div className='mt-4'>
            <textarea
              className='w-full p-2 border border-gray-300 rounded-md mb-2'
              value={remark}
              onChange={(e) => setRemark(e.target.value)}
              placeholder='Enter remark'
            />
          </div>
          <div className='flex mt-4 space-x-4'>
            <button
              className='px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600'
              onClick={() => handleSaveRemark('approved')}
            >
              Approve
            </button>
            <button
              className='px-4 py-2 bg-red-500 text-gray-50 rounded-md hover:bg-red-600'
              onClick={() => handleSaveRemark('rejected')}
            >
              Reject
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default QuestionCard
