import React, {useEffect, useState} from 'react'
import {FaEdit, FaTrash} from 'react-icons/fa'

interface StateData {
  stateName: string
  stateCode: number
  stateUT: string
  stateVersion: number
  census2001Code?: number
  census2011Code?: number
  id: string
}

interface Props {
  setSelectedData: any
  setIsUpdateModalOpen: any
  categoriesData: StateData[]
  handleDelete: (id: string) => void
  handleView?: (imagePath: string | undefined) => void
  catData?: any
  topicName: string
}

const StateTable: React.FC<Props> = (props) => {
  const handleDelete = (id: string) => {
    props.handleDelete(id)
  }

  return (
    <>
      <div className='inline-block min-w-full shadow rounded-lg overflow-hidden'>
        <table className='min-w-full leading-normal'>
          <thead>
            <tr>
              <th className='px-5 py-5 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider'>
                State Name
              </th>
              <th className='px-5 py-5 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider'>
                State Code
              </th>
              <th className='px-5 py-5 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider'>
                State UT
              </th>
              <th className='px-5 py-5  bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider'>
                State Version
              </th>
              <th className='px-5 py-5 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider'>
                Census 2001 Code
              </th>
              <th className='px-5 py-5 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider'>
                Census 2011 Code
              </th>
              <th className='px-5 py-5 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider'>
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {props.categoriesData?.map((category) => (
              <tr key={category.stateCode} className='odd:bg-white even:bg-gray-50'>
                <td className='px-5 py-5 border-b border-gray-200 text-sm'>
                  <div className='flex items-center'>
                    <p className='text-gray-900 whitespace-no-wrap'>{category.stateName}</p>
                  </div>
                </td>
                {/* <td className='px-5 py-5 border-b border-gray-200 text-sm'>
                  <p
                    className={`${
                      category.imagePath == null
                        ? 'text-gray-900'
                        : 'text-blue-500 hover:cursor-pointer hover:font-medium'
                    }  whitespace-no-wrap  `}
                    onClick={() => {
                      if (props.handleView) props.handleView(category.imagePath)
                    }}
                  >
                    {category.imagePath == null ? 'No images' : 'View'}
                  </p>
                </td> */}
                <td className='px-5 py-5 border-b border-gray-200 text-sm'>
                  <div className='flex items-center'>
                    <p className='text-gray-900 whitespace-no-wrap'>{category.stateCode}</p>
                  </div>
                </td>
                <td className='px-5 py-5 border-b border-gray-200 text-sm'>
                  <p className='text-gray-900 whitespace-no-wrap'>{category.stateUT}</p>
                </td>
                <td className='px-5 py-5 border-b border-gray-200 text-sm'>
                  <p className='text-gray-900 whitespace-no-wrap'>{category.stateVersion}</p>
                </td>
                <td className='px-5 py-5 border-b border-gray-200 text-sm'>
                  <p className='text-gray-900 whitespace-no-wrap'>
                    {category.census2001Code ? category.census2001Code : ''}
                  </p>
                </td>
                <td className='px-5 py-5 border-b border-gray-200 text-sm'>
                  <p className='text-gray-900 whitespace-no-wrap'>
                    {category.census2011Code ? category.census2011Code : ''}
                  </p>
                </td>
                <td className='px-5 py-5 border-b border-gray-200 text-sm'>
                  <div className='flex items-center space-x-3'>
                    <FaEdit
                      className='text-blue-500 cursor-pointer  h-4 w-4'
                      onClick={() => {
                        // console.log('category', category.name)
                        props.setSelectedData(category)
                        props.setIsUpdateModalOpen(true)
                      }}
                    />
                    <FaTrash
                      className='text-red-500 cursor-pointer h-4 w-4'
                      onClick={() => handleDelete(category.id)}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default StateTable
