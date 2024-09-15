import React from 'react'
import {useNavigate} from 'react-router-dom'
import {FaRocket} from 'react-icons/fa'
import {SectionTableProps} from '../section.interfaces'
import {statusColors, statusMap} from 'sr/constants/status'

const SectionTable: React.FC<SectionTableProps> = ({
  sectionData,
  receivedData,
  surveyId,
  programId,
  totalAttemptedQuestionsMap,
  totalQuestionsMap,
}) => {
  const navigate = useNavigate()

  return (
    <div className='overflow-x-auto my-5 bg-white'>
      <div className='shadow overflow-hidden'>
        <table className='min-w-full leading-normal'>
          <thead>
            <tr>
              <th className='py-5 bg-[#265B91] text-center text-xs font-semibold text-gray-50 uppercase tracking-wider border-r'>
                Section Code
              </th>
              <th className='py-5 bg-[#265B91] text-center text-xs font-semibold text-gray-50 uppercase tracking-wider border-r'>
                Section Name
              </th>
              <th className='py-5 bg-[#265B91] text-center text-xs font-semibold text-gray-50 uppercase tracking-wider border-r'>
                Count (Attempted / Total)
              </th>
              <th className='py-5 bg-[#265B91] text-center text-xs font-semibold text-gray-50 uppercase tracking-wider border-r'>
                Status
              </th>
              <th className='py-5 bg-[#265B91] text-center text-xs font-semibold text-gray-50 uppercase tracking-wider'>
                View Questions
              </th>
            </tr>
          </thead>
          <tbody>
            {sectionData.map((section) => {
              // Get the total questions and attempted questions for the section
              const totalQuestions = totalQuestionsMap[section._id] || 0
              const attemptedQuestions = totalAttemptedQuestionsMap[section._id] || 0

              return (
                <tr key={section._id} className='odd:bg-white even:bg-blue-50'>
                  <td className='py-5 text-center border-b border-gray-200 text-sm border-r'>
                    <p>{section.sectionCode}</p>
                  </td>
                  <td className='py-5 text-center border-b border-gray-200 text-sm border-r'>
                    <p>{section.sectionName}</p>
                  </td>
                  <td className='py-5 text-center border-b border-gray-200 text-sm border-r'>
                    <p>{`${attemptedQuestions} / ${totalQuestions}`}</p>{' '}
                    {/* Count in "Attempted / Total" format */}
                  </td>
                  <td className='py-5 text-center border-b border-gray-200 text-sm border-r'>
                    <span
                      className={`font-bold text-md ${
                        statusColors[receivedData[section._id] || 'yetToStart']
                      }`}
                    >
                      {statusMap.get(receivedData[section._id] || 'yetToStart')}
                    </span>
                  </td>
                  <td className='py-5 text-center border-b border-gray-200 text-sm border-r'>
                    <div className='flex justify-center items-center'>
                      <FaRocket
                        className='text-blue-800 hover:cursor-pointer'
                        size={20}
                        onClick={() => {
                          navigate(
                            `/question?programId=${programId}&sectionId=${section._id}&surveyId=${surveyId} `
                          )
                        }}
                      />
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default SectionTable
