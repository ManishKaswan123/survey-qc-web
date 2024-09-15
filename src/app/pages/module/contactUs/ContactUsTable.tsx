import React, {useEffect, useState} from 'react'
import {FaEdit, FaTrash} from 'react-icons/fa'

interface ContactUsData {
  categoryId?: string
  cropId?: string
  queryText?: string
  replyText?: string
  isActive?: boolean
  createdBy?: Record<string, any>
  createdAt?: string
  updatedAt?: string
  id: string
}

interface Props {
  setSelectedData: any
  setIsUpdateModalOpen: any
  categoriesData: ContactUsData[]
  handleDelete: (id: string) => void
  handleView?: (imagePath: string | undefined) => void
  catData?: any
  topicName: string
}

const ContactUsTable: React.FC<Props> = (props) => {
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
                Category
              </th>
              <th className='px-5 py-5 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider'>
                Crop
              </th>
              <th className='px-5 py-5  bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider'>
                Query Text
              </th>
              <th className='px-5 py-5 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider'>
                Reply Text
              </th>
              <th className='px-5 py-5  bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider'>
                Created By
              </th>
              <th className='px-5 py-5  bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider'>
                Mobile
              </th>

              <th className='px-5 py-5 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider'>
                Status
              </th>

              <th className='px-5 py-5 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider'>
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {props.categoriesData?.map((category) => (
              <tr key={category?.id} className='odd:bg-white even:bg-gray-50'>
                <td className='px-5 py-5 border-b border-gray-200 text-sm'>
                  <div className='flex items-center'>
                    <p className='text-gray-900 whitespace-no-wrap'>{category.categoryId || ''}</p>
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
                    <p className='text-gray-900 whitespace-no-wrap'>{category.cropId || ''}</p>
                  </div>
                </td>
                <td className='px-5 py-5 border-b border-gray-200 text-sm'>
                  <p className='text-gray-900 whitespace-no-wrap'>{category.queryText || ''}</p>
                </td>
                <td className='px-5 py-5 border-b border-gray-200 text-sm'>
                  <p className='text-gray-900 whitespace-no-wrap'>{category.replyText || ''}</p>
                </td>
                <td className='px-5 py-5 border-b border-gray-200 text-sm'>
                  <p className='text-gray-900 whitespace-no-wrap'>
                    {category.createdBy?.firstName || ''} {category.createdBy?.lastName || ''}
                  </p>
                </td>
                <td className='px-5 py-5 border-b border-gray-200 text-sm'>
                  <p className='text-gray-900 whitespace-no-wrap'>
                    {category.createdBy?.mobile || ''}
                  </p>
                </td>
                <td className='px-5 py-5 text-left border-b border-gray-200 text-sm'>
                  <p
                    className={
                      category.isActive
                        ? 'text-green-500 font-bold font-sans'
                        : 'text-red-500 font-bold font-sans'
                    }
                  >
                    {category?.isActive ? 'Active' : 'Inactive'}
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

export default ContactUsTable
