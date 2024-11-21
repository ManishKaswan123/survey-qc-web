import React, {useMemo, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {FaRocket} from 'react-icons/fa'
import {SectionTableProps} from '../section.interfaces'
import {statusColors, statusMap} from 'sr/constants/status'
import {Button} from 'sr/helpers'
import {updateSurveyStatus} from '../../survey/survey.helper'

const SectionTable: React.FC<SectionTableProps> = ({
  surveySectionMapping,
  sectionData,
  receivedData,
  surveyId,
  programId,
  totalAttemptedQuestionsMap,
  totalQuestionsMap,
}) => {
  const navigate = useNavigate()
  const [areAllApproved, setAreAllApproved] = useState<boolean>(false)

  const sectionStatusMap = useMemo(() => {
    if (!surveySectionMapping) return {}

    const map: Record<string, string> = {}
    let allApproved = true // Assume all are approved unless we find one that's not

    surveySectionMapping.forEach((item) => {
      map[item.sectionId] = item.status
      if (item.status !== 'approved') {
        allApproved = false // Found a section that is not approved
      }
    })
    if(sectionData?.length != surveySectionMapping?.length){
      allApproved = false
    }

    setAreAllApproved(allApproved)
    return map
  }, [surveySectionMapping])

  return (
    <div className='overflow-x-auto my-5 bg-white'>
      <div className='shadow overflow-hidden bg-slate-100'>
        {/* Approve Survey Button */}       

        <table className='min-w-full leading-normal'>
          <thead>
            <tr>
              <th className='py-5 bg-[#265B91] text-center text-xs font-semibold text-gray-50 uppercase tracking-wider border-r'>
                Section Code
              </th>
              <th className='py-5 bg-[#265B91] text-center text-xs font-semibold text-gray-50 uppercase tracking-wider border-r'>
                Section Name
              </th>
              {programId !== '' && surveyId !== '' && (
                <th className='py-5 bg-[#265B91] text-center text-xs font-semibold text-gray-50 uppercase tracking-wider border-r'>
                  Count (Attempted / Total)
                </th>
              )}
              {programId !== '' && surveyId !== '' && (
                <th className='py-5 bg-[#265B91] text-center text-xs font-semibold text-gray-50 uppercase tracking-wider border-r'>
                  Status
                </th>
              )}
              <th className='py-5 bg-[#265B91] text-center text-xs font-semibold text-gray-50 uppercase tracking-wider'>
                View Questions
              </th>
            </tr>
          </thead>
          <tbody>
            {sectionData.map((section) => {
              const totalQuestions = totalQuestionsMap[section._id] || 0
              const attemptedQuestions = totalAttemptedQuestionsMap?.[section._id]?.count || 0
              const sectionStatus: string = sectionStatusMap[section._id] || 'yetToStart'

              return (
                <tr key={section._id} className='odd:bg-white even:bg-blue-50'>
                  <td className='py-5 text-center border-b border-gray-200 text-sm border-r'>
                    <p>{section.sectionCode}</p>
                  </td>
                  <td className='py-5 text-center border-b border-gray-200 text-sm border-r'>
                    <p>{section.sectionName}</p>
                  </td>
                  {programId !== '' && surveyId !== '' && (
                    <td className='py-5 text-center border-b border-gray-200 text-sm border-r'>
                      <p>{`${attemptedQuestions} / ${totalQuestions}`}</p>
                    </td>
                  )}
                  {programId !== '' && surveyId !== '' && (
                    <td className='py-5 text-center border-b border-gray-200 text-sm border-r'>
                      <span
                        className={`font-bold text-md ${
                          statusColors[sectionStatus || 'yetToStart']
                        }`}
                      >
                        {statusMap.get(sectionStatus || 'yetToStart')}
                      </span>
                    </td>
                  )}
                  <td className='py-5 text-center border-b border-gray-200 text-sm border-r'>
                    <div className='flex justify-center items-center'>
                      <FaRocket
                        className='text-blue-800 hover:cursor-pointer'
                        size={20}
                        onClick={() => {
                          if (programId === '' || surveyId === '') {
                            navigate(
                              `/all-questions?programId=${section.programId}&sectionId=${section._id}`
                            )
                          } else {
                            navigate(
                              `/question?programId=${section.programId}&sectionId=${section._id}&surveyId=${surveyId}`
                            )
                          }
                        }}
                      />
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>

        {programId !== '' && surveyId !== '' && (
          <div className='flex justify-center mt-4 text-center'>
            <Button
              label='Approve Survey'
              // Icon={AiOutlinePlus}
              disabled={!areAllApproved}
              onClick={() => {
                updateSurveyStatus(surveyId)
                // Handle survey approval logic here
              }}
              className={`bg-blue-500 text-white py-2 px-4 rounded ${
                !areAllApproved ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            ></Button>
          </div>
        )}
      </div>
    </div>
  )
}

export default SectionTable
