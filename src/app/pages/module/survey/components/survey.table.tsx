import React from 'react'
import {useNavigate} from 'react-router-dom'
import {FaRocket} from 'react-icons/fa'
import {SurveyTableProps} from '../survey.interfaces'
import {statusColors, statusMap} from 'sr/constants/status'

const SurveyTable: React.FC<SurveyTableProps> = ({surveyData}) => {
  const navigate = useNavigate()

  return (
    <div className='overflow-x-auto my-5 bg-white'>
      <div className='shadow overflow-hidden'>
        <table className='min-w-full leading-normal'>
          <thead>
            <tr>
              <th className='py-5 bg-[#265B91] text-center text-xs font-semibold text-gray-50 uppercase tracking-wider border-r'>
                Name
              </th>
              <th className='py-5 bg-[#265B91] text-center text-xs font-semibold text-gray-50 uppercase tracking-wider border-r'>
                Mobile
              </th>

              <th className='py-5 bg-[#265B91] text-center text-xs font-semibold text-gray-50 uppercase tracking-wider border-r'>
                FA
              </th>
              <th className='py-5 bg-[#265B91] text-center text-xs font-semibold text-gray-50 uppercase tracking-wider border-r'>
                QA
              </th>
              <th className='py-5 bg-[#265B91] text-center text-xs font-semibold text-gray-50 uppercase tracking-wider border-r'>
                Status
              </th>
              <th className='py-5 bg-[#265B91] text-center text-xs font-semibold text-gray-50 uppercase tracking-wider'>
                QC
              </th>
            </tr>
          </thead>
          <tbody>
            {surveyData.map((survey) => (
              <tr key={survey.id} className='odd:bg-white even:bg-blue-50'>
                <td className='py-5 text-center border-b border-gray-200 text-sm border-r'>
                  <p>{survey.firstName + ' ' + survey.lastName}</p>
                </td>
                <td className='py-5 text-center border-b border-gray-200 text-sm border-r'>
                  <p>{survey.mobile}</p>
                </td>

                <td className='py-5 text-center border-b border-gray-200 text-sm border-r'>
                  <p>{`${survey.faId?.firstName || ''} ${' '} ${survey.faId?.lastName || ''}`}</p>
                </td>
                <td className='py-5 text-center border-b border-gray-200 text-sm border-r'>
                  <p>{`${survey.qaId?.firstName || ''} ${' '} ${survey.qaId?.lastName || ''}`}</p>
                </td>
                <td className='py-5 text-center border-b border-gray-200 text-sm border-r'>
                  <span className={`font-bold text-md ${statusColors[survey.status]}`}>
                    {statusMap.get(survey.status)}
                  </span>
                </td>
                <td className='py-5 text-center border-b border-gray-200 text-sm border-r'>
                  <div className='flex justify-center items-center'>
                    <FaRocket
                      className='text-[#265B91] hover:cursor-pointer'
                      size={20}
                      onClick={() => {
                        navigate(`/section?programId=${survey.programId}&surveyId=${survey.id}`)
                      }}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default SurveyTable
