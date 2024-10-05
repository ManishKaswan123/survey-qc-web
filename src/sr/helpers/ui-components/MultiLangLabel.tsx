import React, {useState, useRef} from 'react'
import {FaTrash} from 'react-icons/fa'
import {DEFAULT_LANG_NAME} from 'sr/constants/common'
import {Button} from './Button'
import TextField from 'sr/partials/widgets/widgets-components/form/TextField'

interface MultiLanguageLabelInputProps {
  index: number
  selectedLanguages: string[]
  labelName: {[key: string]: string}
  handleLabelChange: (index: number, langCode: string, value: string) => void
  handleAddLanguage: (langCode: string) => void
  handleRemoveLanguage: (langCode: string, index: number) => void
  showDropdown: boolean
  setShowDropdown: React.Dispatch<React.SetStateAction<boolean>>
  dropdownRef: React.RefObject<HTMLSelectElement>
}

const MultiLanguageLabelInput: React.FC<MultiLanguageLabelInputProps> = ({
  index,
  selectedLanguages,
  labelName,
  handleLabelChange,
  handleAddLanguage,
  handleRemoveLanguage,
  showDropdown,
  setShowDropdown,
  dropdownRef,
}) => {
  return (
    <div>
      {/* Render all selected language inputs */}
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-2'>
        {selectedLanguages.map((langCode) => (
          <div key={langCode} className='flex'>
            <TextField
              type='text'
              label={DEFAULT_LANG_NAME[langCode as keyof typeof DEFAULT_LANG_NAME]}
              value={labelName[langCode] || ''}
              onChange={(e) => handleLabelChange(index, langCode, e.target.value)}
              name={`globalLabelName_${langCode}`}
              placeholder={`Enter ${
                DEFAULT_LANG_NAME[langCode as keyof typeof DEFAULT_LANG_NAME]
              } label`}
              className='text-center'
            />
            {/* Delete button */}
            <FaTrash
              className='text-red-500 h-full hover:cursor-pointer pt-6'
              onClick={() => handleRemoveLanguage(langCode, index)}
            />
          </div>
        ))}
      </div>

      {/* Add More Button and Dropdown */}
      <div className='flex items-center mb-4'>
        <Button
          onClick={() => {
            setShowDropdown(!showDropdown)
          }}
          label='Add More'
          className=' bg-blue-500 text-gray-50 py-1 px-3 ml-4 rounded hover:bg-blue-600'
        />

        {/* Dropdown for selecting languages */}
        {showDropdown && (
          <div className='bg-white border border-gray-300 rounded-lg shadow-md z-10 w-auto flex justify-start items-center ml-2'>
            <select
              ref={dropdownRef}
              className='p-1 border-none rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500'
              onChange={(e) => {
                handleAddLanguage(e.target.value)
                setShowDropdown(false) // Close dropdown after selecting
              }}
              defaultValue=''
            >
              <option value='' disabled>
                Select Language
              </option>
              {Object.entries(DEFAULT_LANG_NAME).map(
                ([langCode, langName]) =>
                  !selectedLanguages.includes(langCode) && (
                    <option key={langCode} value={langCode}>
                      {langName} ({langCode})
                    </option>
                  )
              )}
            </select>
          </div>
        )}
      </div>
    </div>
  )
}

export default MultiLanguageLabelInput
