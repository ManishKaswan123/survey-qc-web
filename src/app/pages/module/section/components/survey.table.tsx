import React from 'react'
import {HiMiniSquares2X2} from 'react-icons/hi2'
import {useNavigate} from 'react-router-dom'
import {SurveyTableProps} from '../survey.interfaces'
import {FaRocket} from 'react-icons/fa'

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
                Created By
              </th>
              <th className='py-5 bg-[#265B91] text-center text-xs font-semibold text-gray-50 uppercase tracking-wider border-r'>
                Updated At
              </th>

              <th className='py-5 bg-[#265B91] text-center text-xs font-semibold text-gray-50 uppercase tracking-wider border-r'>
                FA ID
              </th>

              <th className='py-5 bg-[#265B91] text-center text-xs font-semibold text-gray-50 uppercase tracking-wider border-r'>
                QA ID
              </th>
              <th className='py-5 bg-[#265B91] text-center text-xs font-semibold text-gray-50 uppercase tracking-wider border-r'>
                Status
              </th>
              <th className='py-5 bg-[#265B91] text-center text-xs font-semibold text-gray-50 uppercase tracking-wider'>
                DO
              </th>
            </tr>
          </thead>
          <tbody>
            {surveyData.map((survey) => (
              <tr key={survey.id} className='odd:bg-white even:bg-blue-50'>
                {/* <td className='py-5 text-center border-b border-gray-200 text-sm border-r'>
                  <div className='flex justify-center items-center'>
                    <span>{item.ulbId}</span>
                    <FaInfoCircle className='ml-2 text-blue-600' />
                  </div>
                </td> */}
                <td className='py-5 text-center border-b border-gray-200 text-sm border-r'>
                  <p>{survey.firstName + ' ' + survey.lastName}</p>
                </td>
                <td className='py-5 text-center border-b border-gray-200 text-sm border-r'>
                  <p>{survey.mobile}</p>
                </td>
                <td className='py-5 text-center border-b border-gray-200 text-sm border-r'>
                  <p>{survey.createdBy.firstName + ' ' + survey.createdBy.lastName}</p>
                </td>

                <td className='py-5 text-center border-b border-gray-200 text-sm border-r'>
                  <p>{survey.updatedAt}</p>
                </td>
                <td className='py-5 text-center border-b border-gray-200 text-sm border-r'>
                  <p>{survey.faId?.firstName + ' ' + survey.faId?.lastName}</p>
                </td>
                <td className='py-5 text-center border-b border-gray-200 text-sm border-r'>
                  <p>{survey.qaId?.firstName + ' ' + survey.qaId?.lastName}</p>
                </td>
                <td className='py-5 text-center border-b border-gray-200 text-sm border-r'>
                  <span className='text-yellow-500 font-bold text-md'>{survey.status}</span>
                </td>

                <td className='py-5 text-center border-b border-gray-200 text-sm border-r'>
                  <div className='flex justify-center items-center'>
                    <FaRocket
                      className='text-blue-800 hover:cursor-pointer'
                      size={20}
                      onClick={() => {
                        navigate('/question')
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
