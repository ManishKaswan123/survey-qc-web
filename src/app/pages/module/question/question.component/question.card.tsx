import React, {useEffect, useMemo, useState} from 'react'
import {QuestionTableProps} from '../question.interface'
import {RiArrowDownSLine, RiArrowUpSLine} from 'react-icons/ri'
import {getPreSignedURL} from 'sr/utils/api/media'
import {UpdateAnswers} from '../question.helper'
import {d} from '@tanstack/react-query-devtools/build/legacy/devtools-PtxSnd7z'
import {toast} from 'react-toastify'
import {statusColors, statusMap} from 'sr/constants/status'
import ViewFarmLocation from 'sr/layout/GoogleMap/ViewFarmLocation'

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
    let payload = {
      ...(data?.textResponse && {textResponse: data?.textResponse}),
      ...(data?.dateResponse && {dateResponse: data?.dateResponse}),
      ...(data?.toDateResponse && {toDateResponse: data?.toDateResponse}),
      ...(data?.multipleChoiceResponse && {multipleChoiceResponse: data?.multipleChoiceResponse}),
      ...(data?.numberResponse && {numberResponse: data?.numberResponse}),
      ...(remark && remark.trim() !== '' && {remarks: remark}),
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
        setReRender((prev) => !prev)
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
    setRemark(data?.remarks || '')
    const handleFiles = async () => {
      if (data.questionType === 'FILE_UPLOAD') {
        let allUrls = new Set<string>() // Use Set to store unique URLs

        // Add multipleChoiceResponse values to the Set
        if (data?.multipleChoiceResponse && data?.multipleChoiceResponse?.length > 0) {
          data?.multipleChoiceResponse.forEach((url: string) => allUrls.add(url))
        }

        // Add textResponse to the Set if it exists
        if (data?.textResponse) {
          allUrls.add(data?.textResponse)
        }

        // Convert the Set to an array and iterate over it
        const uniqueUrls = Array.from(allUrls)

        for (let url of uniqueUrls) {
          let urlData = await getPreSignedURL({fileName: url})
          setIsFiles((prevFiles) => [...prevFiles, urlData?.results?.url])
        }
      }
    }
    if (data) {
      setIsFiles([])
      handleFiles()
    }
  }, [data])

  const getResponseDisplay = () => {
    const formatDate = (date: string) => {
      if (!date) return '' // Handle if date is undefined or null
      const parsedDate = new Date(date)
      return parsedDate.toLocaleDateString('en-GB') // dd/mm/yyyy format
    }
    
    if (data?.multipleChoiceResponse && data?.multipleChoiceResponse?.length > 0) {
      const responseValues = data?.multipleChoiceResponse.map((responseValue) => {
        const matchedOption = data?.options?.find((option) => option?.fieldValue === responseValue)
        return matchedOption ? matchedOption?.fieldName : responseValue
      })

      return responseValues.join(', ')
    }

    if (data?.questionType == 'PIN_LOCATION') {
      if (data?.pinLocationResponse?.coordinates?.length > 1) {
        return <ViewFarmLocation
          pinFarmLocation={{
            lng: data?.pinLocationResponse?.coordinates[0],
            lat: data?.pinLocationResponse?.coordinates[1],
          }}
          currentModel={''}
      />
      }      
    }

    if (data?.questionType == 'POLYGON') {      
      if (data?.polygonResponse?.coordinates?.length > 0) {
        return <ViewFarmLocation
        farmLandPlotting={data?.polygonResponse?.coordinates}
        currentModel={'FarmLandPlotting'}
      />
      }      
    }


    if (data?.questionType !== 'FILE_UPLOAD') {
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
  }

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  const handleImageClick = (url: string) => {
    setSelectedImage(url)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedImage(null)
  }

  return (
    <div className='border border-gray-300 rounded-lg shadow-md p-4 mb-4 bg-white'>
      <div className='flex justify-between items-center cursor-pointer' onClick={handleExpand}>
        <span className='font-bold text-xl'>{data?.questionCode}.</span>
        <span className='text-md ml-5'>{data?.fieldName}</span>
        <div className={`px-2 py-1 ml-auto rounded font-bold text-md ${statusColors[data.status]}`}>
          {statusMap.get(data.status)}
        </div>

        <span className='text-lg text-gray-500 ml-4'>
          {isExpanded ? (
            <RiArrowUpSLine className='font-bold' size={24} />
          ) : (
            <RiArrowDownSLine className='font-bold' size={24} />
          )}
        </span>
      </div>

      {isExpanded && data?.status?.toLowerCase() !== 'yettostart' && (
        <div className='mt-4'>
          <span className='font-bold text-xl'>Ans.</span>
          {isFiles?.length > 0 ? (
            isFiles?.map((url, index) =>
              url ? (
                <img
                  key={index}
                  src={url}
                  alt={`Uploaded file ${index + 1}`}
                  className='w-10  object-contain cursor-pointer' // Maintain aspect ratio
                  onClick={() => handleImageClick(url)} // Handle click to enlarge
                />
              ) : (
                'Error'
              )
            )
          ) : (
            <div className='text-gray-700 italic inline-flex w-full'>{getResponseDisplay()}</div>
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
              onClick={() => handleSaveRemark('flagged')}
            >
              Flag
            </button>
          </div>
        </div>
      )}
      {isModalOpen && (
        <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50'>
          <div className='relative'>
            <img src={selectedImage as string} alt='Large view' className='max-w-full max-h-full' />
            <button
              onClick={closeModal}
              className='absolute top-0 right-0 p-2 text-white bg-black rounded-full'
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default QuestionCard
