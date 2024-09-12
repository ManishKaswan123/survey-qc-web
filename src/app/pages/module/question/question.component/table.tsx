import React from 'react'
import {FaEdit, FaTrash} from 'react-icons/fa'
import {Question, TableProps} from '../question.interface'

const questionTable: React.FC<TableProps> = (props) => {
  const handleDelete = async (id: string) => {
    if (!props.handleDelete) return
    await props.handleDelete(id)
  }

  return (
    <div className='overflow-x-auto bg-white'>
      <div className='shadow overflow-hidden'>
        <table className='min-w-full leading-normal'>
          <thead>
            <tr>
              <th className='py-5 bg-[#265B91] text-left text-xs font-semibold text-gray-50 uppercase tracking-wider border-r'>
                Q. No.
              </th>
              <th className='py-5 bg-[#265B91] text-left text-xs font-semibold text-gray-50 uppercase tracking-wider border-r'>
                Question Name
              </th>
              <th className='py-5 bg-[#265B91] text-left text-xs font-semibold text-gray-50 uppercase tracking-wider border-r'>
                Type
              </th>
              <th className='py-5 bg-[#265B91] text-left text-xs font-semibold text-gray-50 uppercase tracking-wider border-r'>
                Validation
              </th>
              <th className='py-5 bg-[#265B91] text-left text-xs font-semibold text-gray-50 uppercase tracking-wider border-r'>
                Mandatory
              </th>
              <th className='py-5 bg-[#265B91] text-left text-xs font-semibold text-gray-50 uppercase tracking-wider border-r'>
                Dependent on Question
              </th>
              <th className='py-5 bg-[#265B91] text-left text-xs font-semibold text-gray-50 uppercase tracking-wider border-r'>
                Dependent on Option
              </th>
              <th className='py-5 bg-[#265B91] text-left text-xs font-semibold text-gray-50 uppercase tracking-wider border-r'>
                Answer Type
              </th>
              <th className='py-5 bg-[#265B91] text-left text-xs font-semibold text-gray-50 uppercase tracking-wider border-r'>
                Options
              </th>
              <th className='py-5 bg-[#265B91] text-left text-xs font-semibold text-gray-50 uppercase tracking-wider'>
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {props.questions?.map((question: Question) => (
              <tr key={question.id} className='odd:bg-white even:bg-gray-50'>
                <td className='px-5 py-5 text-left border-b border-gray-200 text-sm border-r'>
                  <p className='text-gray-900 whitespace-no-wrap'>{question.questionNumber}</p>
                </td>
                <td className='px-5 py-5 text-left border-b border-gray-200 text-sm border-r'>
                  <p className='text-gray-900 whitespace-no-wrap'>{question.questionName}</p>
                </td>
                <td className='px-5 py-5 text-left border-b border-gray-200 text-sm border-r'>
                  <p className='text-gray-900 whitespace-no-wrap'>{question.questionType}</p>
                </td>
                <td className='px-5 py-5 text-left border-b border-gray-200 text-sm border-r'>
                  <p className='text-gray-900 whitespace-no-wrap'>{question.validation}</p>
                </td>
                <td className='px-5 py-5 text-left border-b border-gray-200 text-sm border-r'>
                  <p className='text-gray-900 whitespace-no-wrap'>
                    {question.isMandatory ? 'Yes' : 'No'}
                  </p>
                </td>
                <td className='px-5 py-5 text-left border-b border-gray-200 text-sm border-r'>
                  <p className='text-gray-900 whitespace-no-wrap'>{question.dependentOnQuestion}</p>
                </td>
                <td className='px-5 py-5 text-left border-b border-gray-200 text-sm border-r'>
                  <p className='text-gray-900 whitespace-no-wrap'>{question.dependentOnOption}</p>
                </td>
                <td className='px-5 py-5 text-left border-b border-gray-200 text-sm border-r'>
                  <p className='text-gray-900 whitespace-no-wrap'>{question.answerType}</p>
                </td>
                <td className='px-5 py-5 text-left border-b border-gray-200 text-sm border-r'>
                  <p className='text-gray-900 whitespace-no-wrap'>
                    {question.options.map((option) => option.label).join(', ')}
                  </p>
                </td>
                <td className='px-5 py-5 text-left border-b border-gray-200 text-sm'>
                  <div className='flex justify-center space-x-2'>
                    <FaEdit
                      className='text-blue-500 cursor-pointer'
                      onClick={() => {
                        props.setSelectedData(question)
                        props.setIsUpdateModalOpen(true)
                      }}
                    />
                    <FaTrash
                      className='text-red-500 cursor-pointer'
                      onClick={async () => {
                        await handleDelete(question.id)
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

export default questionTable
