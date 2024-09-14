import React from 'react'
import {useNavigate} from 'react-router-dom'
import {FaRocket} from 'react-icons/fa'
import {SectionTableProps} from '../section.interfaces'

const SectionTable: React.FC<SectionTableProps> = ({sectionData}) => {
  const navigate = useNavigate()

  return (
    <div className='overflow-x-auto my-5 bg-white'>
      <div className='shadow overflow-hidden'>
        <table className='min-w-full leading-normal'>
          <thead>
            <tr>
              <th className='py-5 primary-bg text-center text-xs font-semibold text-gray-50 uppercase tracking-wider border-r'>
                Display Order
              </th>
              <th className='py-5 bg-[#265B91] text-center text-xs font-semibold text-gray-50 uppercase tracking-wider border-r'>
                Section Name
              </th>

              <th className='py-5 bg-[#265B91] text-center text-xs font-semibold text-gray-50 uppercase tracking-wider border-r'>
                Section Code
              </th>
              <th className='py-5 bg-[#265B91] text-center text-xs font-semibold text-gray-50 uppercase tracking-wider border-r'>
                Description
              </th>

              <th className='py-5 bg-[#265B91] text-center text-xs font-semibold text-gray-50 uppercase tracking-wider border-r'>
                version
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
            {sectionData.map((section, index) => (
              <tr key={section._id} className='odd:bg-white even:bg-blue-50'>
                {/* <td className='py-5 text-center border-b border-gray-200 text-sm border-r'>
                  <div className='flex justify-center items-center'>
                    <span>{item.ulbId}</span>
                    <FaInfoCircle className='ml-2 text-blue-600' />
                  </div>
                </td> */}
                <td className='py-5 text-center border-b border-gray-200 text-sm border-r'>
                  <p>{section.displayOrder}</p>
                </td>
                <td className='py-5 text-center border-b border-gray-200 text-sm border-r'>
                  <p>{section.sectionName}</p>
                </td>
                <td className='py-5 text-center border-b border-gray-200 text-sm border-r'>
                  <p>{section.sectionCode}</p>
                </td>

                <td className='py-5 text-center border-b border-gray-200 text-sm border-r'>
                  <p>{section.description}</p>
                </td>
                <td className='py-5 text-center border-b border-gray-200 text-sm border-r'>
                  <p>{section.__v}</p>
                </td>
                {/* <td className='py-5 text-center border-b border-gray-200 text-sm border-r'>
                  <p>{`${survey.qaId?.firstName || ''} ${' '} ${survey.qaId?.lastName || ''}`}</p>
                </td> */}
                <td className='py-5 text-center border-b border-gray-200 text-sm border-r'>
                  <span className='text-yellow-500 font-bold text-md'>{}</span>
                </td>

                <td className='py-5 text-center border-b border-gray-200 text-sm border-r'>
                  <div className='flex justify-center items-center'>
                    <FaRocket
                      className='text-blue-800 hover:cursor-pointer'
                      size={20}
                      onClick={() => {
                        navigate('/question/' + section._id)
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

export default SectionTable
