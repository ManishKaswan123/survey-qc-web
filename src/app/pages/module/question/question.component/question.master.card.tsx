import React, {useState, useEffect, useRef, useCallback} from 'react'
import {AiOutlineDown, AiOutlineUp} from 'react-icons/ai'
import {FaEdit, FaTrash} from 'react-icons/fa'
import {QuestionCardProps} from '../question.interface'
import {useSelector} from 'react-redux'
import {RootState} from 'sr/redux/store'
import {useActions} from 'sr/utils/helpers/useActions'
import {DEFAULT_LANG_NAME} from 'sr/constants/common'

const QuestionMasterCard: React.FC<QuestionCardProps> = ({
  question,
  expandedId,
  setSelectedData,
  setIsUpdateModalOpen,
  setExpandedId,
  onDelete,
}) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)
  const programReduxData = useSelector((state: RootState) => state.program)
  const sectionReduxData = useSelector((state: RootState) => state.section)
  const {fetchProgramAction, fetchSectionAction} = useActions()
  // console.log('program redux data is : ', programReduxData.programIdMap)

  const {
    questionCode,
    fieldName,
    questionType,
    isMandatory,
    displayOrder,
    programId,
    sectionId,
    createdBy,
    updatedBy,
    isActive,
    id,
    fieldRegex,
    options,
    dataSource,
    visibleOnFieldIds,
    labelName,
  } = question

  // Get program and section names using programIdMap and sectionIdMap

  const findProgramName = useCallback(
    (programId: string) => {
      return programReduxData.programIdMap[programId]?.name || 'Unknown Program'
    },
    [programReduxData]
  )

  const findSectionName = useCallback(
    (sectionId: string) => {
      return sectionReduxData.sectionIdMap[sectionId]?.sectionName || 'Unknown Section'
    },
    [sectionReduxData]
  )

  useEffect(() => {
    fetchUserDataIfNeeded()
  }, [])

  const fetchUserDataIfNeeded = useCallback(() => {
    if (programReduxData.status !== 'succeeded') fetchProgramAction({})
    if (sectionReduxData.status !== 'succeeded') fetchSectionAction({})
  }, [programReduxData, sectionReduxData, fetchProgramAction, fetchSectionAction])

  useEffect(() => {
    setIsExpanded(expandedId === id)
  }, [expandedId, id])

  useEffect(() => {
    if (isExpanded && cardRef.current) {
      const cardTop = cardRef.current.getBoundingClientRect().top + window.pageYOffset
      window.scrollTo({top: cardTop - 100, behavior: 'smooth'})
    }
  }, [isExpanded])

  const toggleExpand = () => {
    if (isExpanded) {
      setExpandedId(null) // Collapse if already expanded
    } else {
      setExpandedId(id) // Expand current card
    }
  }

  const handleDelete = () => {
    onDelete(id)
  }

  const renderLabelNames = (labelNames: Record<string, string>) => {
    return Object.entries(labelNames).map(([lang, name]) => (
      <p key={lang} className='text-sm text-gray-800'>
        {DEFAULT_LANG_NAME[lang as keyof typeof DEFAULT_LANG_NAME] || lang}: {name}
      </p>
    ))
  }

  return (
    <div ref={cardRef} className='bg-white rounded-lg shadow-md overflow-hidden p-6 mb-4 relative'>
      <div className='flex justify-between items-center'>
        <div className='flex flex-col md:flex-row w-full'>
          <div className='flex-1'>
            <div className='mb-4 flex justify-between items-center'>
              <h2 className='text-lg font-semibold text-gray-800'>Question Code: {questionCode}</h2>
              <button onClick={toggleExpand} className='focus:outline-none'>
                {isExpanded ? <AiOutlineUp /> : <AiOutlineDown />}
              </button>
            </div>
            <div className='flex justify-between'>
              <div className='flex-1'>
                <p className='text-sm font-bold mb-2 text-gray-800'>
                  Field Name: {fieldName || ''}
                </p>
                <p className='text-sm text-gray-600'>Question Type: {questionType || ''}</p>
                <p className='text-sm text-gray-600'>Is Mandatory: {isMandatory ? 'Yes' : 'No'}</p>
                <p className='text-sm text-gray-600'>Display Order: {displayOrder || ''}</p>
              </div>
              <div className='flex-1'>
                <p className='text-sm text-gray-600'>
                  Program: {findProgramName(question.programId)}
                </p>
                <p className='text-sm text-gray-600'>
                  Section: {findSectionName(question.sectionId)}
                </p>
                <p className='text-sm text-gray-600'>Active: {isActive ? 'Yes' : 'No'}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='flex justify-end'>
        <FaEdit
          className='text-blue-500 cursor-pointer mr-4 h-4 w-4 inline'
          onClick={() => {
            setSelectedData(question)
            setIsUpdateModalOpen(true)
          }}
        />
        <FaTrash className='text-red-500 cursor-pointer h-4 w-4 inline' onClick={handleDelete} />
      </div>

      {isExpanded && (
        <div className='mt-4 overflow-auto max-h-96'>
          <div className='bg-gray-100 p-4 rounded-lg'>
            <h3 className='text-lg font-semibold text-gray-800 mb-4'>Question Details</h3>
            <div className='grid grid-cols-2 gap-4'>
              <div className='col-span-1'>
                <p className='text-sm font-semibold text-gray-600'>Is Active:</p>
                <p className='text-sm text-gray-800'>{isActive ? 'Yes' : 'No'}</p>
                <p className='text-sm font-semibold text-gray-600'>Field Regex:</p>
                <p className='text-sm text-gray-800'>{fieldRegex || ''}</p>
                <p className='text-sm font-semibold text-gray-600'>Label Name:</p>
                {labelName && renderLabelNames(labelName || [])}
              </div>

              <div className='col-span-1'>
                <p className='text-sm font-semibold text-gray-600'>Options:</p>
                <ul className='text-sm text-gray-800'>
                  {options.length > 0 ? (
                    options.map((option, index) => (
                      <li key={index}>
                        {renderLabelNames(option.labelName || [])}: {option.fieldValue}
                      </li>
                    ))
                  ) : (
                    <li>No options available</li>
                  )}
                </ul>
                <p className='text-sm font-semibold text-gray-600'>Visible On Field IDs:</p>
                <ul className='text-sm text-gray-800'>
                  {visibleOnFieldIds.length ? (
                    visibleOnFieldIds.map((field, index) => (
                      <li key={index}>
                        Question ID: {field.questionId} - Options: {field.optionValue.join(', ')}
                      </li>
                    ))
                  ) : (
                    <li>No visible field IDs</li>
                  )}
                </ul>
                <p className='text-sm font-semibold text-gray-600'>Data Source:</p>
                <p className='text-sm text-gray-800'>Source: {dataSource.source || ''}</p>
                {dataSource.labelKey && (
                  <p className='text-sm text-gray-800'>Label Key: {dataSource.labelKey || ''}</p>
                )}
                {dataSource.valueKey && (
                  <p className='text-sm text-gray-800'>Value Key: {dataSource.valueKey || ''}</p>
                )}
                {dataSource.config.dynamicParams.length > 0 && (
                  <div>
                    <p className='text-sm font-semibold text-gray-600'>Dynamic Params:</p>
                    <ul className='text-sm text-gray-800'>
                      {dataSource.config.dynamicParams.map((param, index) => (
                        <li key={index}>
                          Field ID: {param.fieldId} - Param Name: {param.paramName} - Mandatory:{' '}
                          {param.isMandatory ? 'Yes' : 'No'}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {dataSource.config.fixedParams.length > 0 && (
                  <div>
                    <p className='text-sm font-semibold text-gray-600'>Fixed Params:</p>
                    <ul className='text-sm text-gray-800'>
                      {dataSource.config.fixedParams.map((param, index) => (
                        <li key={index}>
                          Param Name: {param.paramName} - Value: {param.paramValue}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {dataSource.configKey && (
                  <p className='text-sm text-gray-800'>Config Key: {dataSource.configKey || ''}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default QuestionMasterCard
