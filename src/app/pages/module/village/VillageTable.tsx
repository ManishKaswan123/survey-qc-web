import React, {useEffect, useState} from 'react'
import {FaEdit, FaTrash} from 'react-icons/fa'

interface VillageData {
  stateCode: number
  districtCode: number
  subDistrictCode: number
  villageCode: number
  villageVersion: number
  villageName: string
  villageStatus?: string
  villageCensus2001Code?: number
  villageCensus2011Code?: number
  id: string
}

interface Props {
  setSelectedData: any
  setIsUpdateModalOpen: any
  categoriesData: VillageData[]
  handleDelete: (id: string) => void
  handleView?: (imagePath: string | undefined) => void
  catData?: any
  topicName: string
}

const VillageTable: React.FC<Props> = (props) => {
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
                Village Name
              </th>
              <th className='px-5 py-5 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider'>
                Village Code
              </th>
              <th className='px-5 py-5  bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider'>
                State Code
              </th>
              <th className='px-5 py-5 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider'>
                District Code
              </th>
              <th className='px-5 py-5  bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider'>
                Sub District Code
              </th>

              <th className='px-5 py-5 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider'>
                Village Version
              </th>
              <th className='px-5 py-5 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider'>
                Village Status
              </th>
              <th className='px-5 py-5 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider'>
                Village Census2001 Code
              </th>
              <th className='px-5 py-5 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider'>
                Village Census2011 Code
              </th>
              <th className='px-5 py-5 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider'>
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {props?.categoriesData?.map((category) => (
              <tr key={category?.id} className='odd:bg-white even:bg-gray-50'>
                <td className='px-5 py-5 border-b border-gray-200 text-sm'>
                  <div className='flex items-center'>
                    <p className='text-gray-900 whitespace-no-wrap'>{category?.villageName}</p>
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
                    <p className='text-gray-900 whitespace-no-wrap'>{category?.villageCode}</p>
                  </div>
                </td>
                <td className='px-5 py-5 border-b border-gray-200 text-sm'>
                  <p className='text-gray-900 whitespace-no-wrap'>{category?.stateCode}</p>
                </td>
                <td className='px-5 py-5 border-b border-gray-200 text-sm'>
                  <p className='text-gray-900 whitespace-no-wrap'>{category?.districtCode}</p>
                </td>
                <td className='px-5 py-5 border-b border-gray-200 text-sm'>
                  <p className='text-gray-900 whitespace-no-wrap'>{category?.subDistrictCode}</p>
                </td>

                <td className='px-5 py-5 border-b border-gray-200 text-sm'>
                  <p className='text-gray-900 whitespace-no-wrap'>{category?.villageVersion}</p>
                </td>
                <td className='px-5 py-5 border-b border-gray-200 text-sm'>
                  <p className='text-gray-900 whitespace-no-wrap'>
                    {category?.villageStatus ? category.villageStatus : ''}
                  </p>
                </td>
                <td className='px-5 py-5 border-b border-gray-200 text-sm'>
                  <p className='text-gray-900 whitespace-no-wrap'>
                    {category?.villageCensus2001Code ? category?.villageCensus2001Code : ''}
                  </p>
                </td>
                <td className='px-5 py-5 border-b border-gray-200 text-sm'>
                  <p className='text-gray-900 whitespace-no-wrap'>
                    {category?.villageCensus2011Code ? category?.villageCensus2011Code : ''}
                  </p>
                </td>
                <td className='px-5 py-5 border-b border-gray-200 text-sm'>
                  <div className='flex items-center space-x-3'>
                    <FaEdit
                      className='text-blue-500 cursor-pointer h-4 w-4'
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

export default VillageTable
