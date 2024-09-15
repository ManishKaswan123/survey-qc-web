import React, {useState} from 'react'
import {Button} from 'sr/helpers/ui-components/Button'

interface ConfigModalProps {
  isOpen: boolean
  onClose: () => void
  data: any
  type: string
}

const ConfigModal: React.FC<ConfigModalProps> = ({isOpen, onClose, data, type}) => {
  const [expandedFields, setExpandedFields] = useState<{[key: number]: boolean}>({})
  const [expandedInfoSections, setExpandedInfoSections] = useState<{[key: number]: boolean}>({})
  const [expandedProfileSections, setExpandedProfileSections] = useState<{[key: number]: boolean}>(
    {}
  )
  const [expandedLanguages, setExpandedLanguages] = useState<{[key: string]: boolean}>({})
  const [expandedDropdownSections, setExpandedDropdownSections] = useState<{
    [key: string]: boolean
  }>({})

  if (!isOpen) return null

  const toggleFieldData = (index: number) => {
    setExpandedFields((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }))
  }

  const toggleInfoSectionData = (index: number) => {
    setExpandedInfoSections((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }))
  }

  const toggleProfileSectionData = (index: number) => {
    setExpandedProfileSections((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }))
  }

  const toggleDropdownSectionData = (key: string) => {
    setExpandedDropdownSections((prevState) => ({
      ...prevState,
      [key]: !prevState[key],
    }))
  }

  const toggleLanguageSection = (language: string) => {
    setExpandedLanguages((prevState) => ({
      ...prevState,
      [language]: !prevState[language],
    }))
  }

  const renderFieldData = (fieldData: any[]) => {
    return fieldData.map((field, index) => (
      <div key={index} className='bg-gray-100 p-4 rounded-lg mb-4 shadow-md'>
        <div className='flex justify-between items-center mb-2'>
          <h4 className='text-lg font-semibold'>{field.fieldName}</h4>
          <button className='text-blue-500' onClick={() => toggleFieldData(index)}>
            {expandedFields[index] ? 'Collapse' : 'Expand'}
          </button>
        </div>
        {expandedFields[index] && (
          <>
            <div className='mb-2'>
              <strong>Field ID:</strong> {field.fieldId}
            </div>
            <div className='mb-2'>
              <strong>JSON Key:</strong> {field.fieldMetadata.jsonKey}
            </div>
            <div className='mb-2'>
              <strong>Sequence:</strong> {field.fieldMetadata.sequence}
            </div>
            <div className='mb-2'>
              <strong>Input Type:</strong> {field.fieldMetadata.inputType}
            </div>
            <div className='mb-2'>
              <strong>Default Text:</strong> {field.fieldMetadata.defaultText}
            </div>
            <div className='mb-2'>
              <strong>Is Mandatory:</strong> {field.fieldMetadata.isMandatory ? 'Yes' : 'No'}
            </div>
            <div className='mb-2'>
              <strong>Struct Field Name:</strong> {field.fieldMetadata.structFieldName}
            </div>
            <div className='mb-2'>
              <strong>Label Name (EN):</strong> {field.fieldMetadata.labelName.en}
            </div>
            <div className='mb-2'>
              <strong>Label Name (HI):</strong> {field.fieldMetadata.labelName.hi}
            </div>
            <div className='mb-2'>
              <strong>Label Name (PU):</strong> {field.fieldMetadata.labelName.pu}
            </div>
          </>
        )}
      </div>
    ))
  }

  const renderInfoSectionData = (infoSectionData: any[]) => {
    return infoSectionData.map((infoSection, index) => (
      <div key={index} className='bg-gray-200 p-6 rounded-lg mb-6 shadow-lg'>
        <div className='flex justify-between items-center mb-2'>
          <h3 className='text-xl font-bold'>{infoSection.infoSectionName.en}</h3>
          <button className='text-blue-500' onClick={() => toggleInfoSectionData(index)}>
            {expandedInfoSections[index] ? 'Collapse' : 'Expand'}
          </button>
        </div>
        {expandedInfoSections[index] && (
          <>
            <div className='mb-4'>
              <strong>Info Section Name (EN):</strong> {infoSection.infoSectionName.en}
            </div>
            <div className='mb-4'>
              <strong>Info Section Name (HI):</strong> {infoSection.infoSectionName.hi}
            </div>
            <div className='mb-4'>
              <strong>Info Section Name (PU):</strong> {infoSection.infoSectionName.pu}
            </div>
            <div className='mb-4 '>
              <strong>Sequence:</strong> {infoSection.infoSectionSequence}
            </div>
            <div className='mb-4 '>
              <strong>Icon URL:</strong> {infoSection.infoSectionIconUrl}
            </div>
            <div className='mb-4'>
              <strong>Get API URL:</strong>{' '}
              <a
                href={infoSection.infoSectionGetApiUrl}
                target='_blank'
                rel='noopener noreferrer'
                className='text-blue-500'
              >
                {infoSection.infoSectionGetApiUrl}
              </a>
            </div>
            <div className='mb-4 '>
              <strong>Update API URL:</strong>{' '}
              <a
                href={infoSection.infoSectionUpdateApiUrl}
                target='_blank'
                rel='noopener noreferrer'
                className='text-blue-500'
              >
                {infoSection.infoSectionUpdateApiUrl}
              </a>
            </div>
            <div className='mb-4 '>
              <strong>Create API URL:</strong>{' '}
              <a
                href={infoSection.infoSectionCreateApiUrl}
                target='_blank'
                rel='noopener noreferrer'
                className='text-blue-500'
              >
                {infoSection.infoSectionCreateApiUrl}
              </a>
            </div>
            {renderFieldData(infoSection.fieldData)}
          </>
        )}
      </div>
    ))
  }

  const renderStaticData = (staticData: any[]) => {
    return staticData.map((profileSection, index) => (
      <div key={index} className='bg-gray-300 p-8 rounded-lg mb-8 shadow-xl'>
        <div className='flex justify-between items-center mb-2'>
          <h2 className='text-2xl font-bold'>{profileSection.profileSectionName.en}</h2>
          <button className='text-blue-500' onClick={() => toggleProfileSectionData(index)}>
            {expandedProfileSections[index] ? 'Collapse' : 'Expand'}
          </button>
        </div>
        {expandedProfileSections[index] && (
          <>
            <div className='mb-4'>
              <strong>Profile Section ID:</strong> {profileSection.profileSectionId}
            </div>
            <div className='mb-4'>
              <strong>Profile Section Name (EN):</strong> {profileSection.profileSectionName.en}
            </div>
            <div className='mb-4'>
              <strong>Profile Section Name (HI):</strong> {profileSection.profileSectionName.hi}
            </div>
            <div className='mb-4'>
              <strong>Profile Section Name (PU):</strong> {profileSection.profileSectionName.pu}
            </div>
            {renderInfoSectionData(profileSection.infoSectionData)}
          </>
        )}
      </div>
    ))
  }

  const renderDropdownData = (dropdownData: any) => {
    const languages = ['en', 'hi', 'pu']
    return languages.map((language) => (
      <div key={language} className='bg-gray-300 p-6 rounded-lg mb-6 shadow-lg'>
        <div className='flex justify-between items-center mb-2'>
          <h3 className='text-xl font-bold'>{language.toUpperCase()} Dropdown Data</h3>
          <button className='text-blue-500' onClick={() => toggleLanguageSection(language)}>
            {expandedLanguages[language] ? 'Collapse' : 'Expand'}
          </button>
        </div>
        {expandedLanguages[language] && (
          <div>
            {Object.keys(dropdownData[language]).map((key, index) => (
              <div
                key={`${language}-${index}`}
                className='bg-gray-200 p-4 rounded-lg mb-4 shadow-md'
              >
                <div className='flex justify-between items-center mb-2'>
                  <h4 className='text-lg font-semibold'>{key}</h4>
                  <button
                    className='text-blue-500'
                    onClick={() => toggleDropdownSectionData(`${language}-${key}`)}
                  >
                    {expandedDropdownSections[`${language}-${key}`] ? 'Collapse' : 'Expand'}
                  </button>
                </div>
                {expandedDropdownSections[`${language}-${key}`] && (
                  <div className='mb-4'>
                    {dropdownData[language][key].map((item: any, idx: number) => (
                      <div key={idx} className='mb-2'>
                        <strong>Label:</strong> {item.label} <br />
                        <strong>Value:</strong> {item.value}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    ))
  }

  const renderLanguageData = (languageData: any[]) => {
    return languageData.map((language, index) => (
      <div key={index} className='bg-gray-300 p-6 rounded-lg mb-6 shadow-lg'>
        <div className='flex justify-between items-center mb-2'>
          <h3 className='text-xl font-bold'>{language.title}</h3>
        </div>
        <div className='mb-4'>
          <strong>Value:</strong> {language.value} <br />
          <strong>Word in Caps:</strong> {language.wordInCaps}
        </div>
      </div>
    ))
  }

  return (
    <div className='bg-white rounded-lg p-6 shadow-lg border border-gray-300 mx-4 my-8'>
      <h2 className='text-xl font-semibold mb-4'>{type} Data</h2>
      {type === 'STATIC_DATA' ? (
        renderStaticData(data)
      ) : type === 'DROP_DOWN_DATA' ? (
        renderDropdownData(data)
      ) : type === 'LANGUAGE_DATA' ? (
        renderLanguageData(data)
      ) : (
        <h2 className='text-xl font-semibold mb-4'>No data found</h2>
      )}
      <div className='mt-8 flex justify-end'>
        <Button
          className='bg-blue-500 text-white font-bold py-2 px-4 rounded-full'
          onClick={onClose}
          label='Back'
        />
      </div>
    </div>
  )
}

export default ConfigModal
