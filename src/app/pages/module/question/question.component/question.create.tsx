import React, {useState} from 'react'
import {Dialog, Transition} from '@headlessui/react'

interface CreateQuestionPopupProps {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}

const CreateQuestionPopup: React.FC<CreateQuestionPopupProps> = ({isOpen, setIsOpen}) => {
  const closeModal = () => setIsOpen(false)
  const [isVisibleOnField, setIsVisibleOnField] = useState(false)
  const [options, setOptions] = useState([{fieldName: '', fieldValue: '', labelName: ''}])
  const [questionOptions, setQuestionOptions] = useState([{questionId: '', optionValue: []}])

  const addQuestionOption = () => {
    setQuestionOptions([...questionOptions, {questionId: '', optionValue: []}])
  }

  const addOption = () => {
    setOptions([...options, {fieldName: '', fieldValue: '', labelName: ''}])
  }

  const handleQuestionOptionChange = (index: number, field: string, value: any) => {
    const updatedOptions = questionOptions.map((option, i) =>
      i === index ? {...option, [field]: value} : option
    )
    setQuestionOptions(updatedOptions)
  }

  const handleOptionChange = (index: number, field: string, value: string) => {
    const updatedOptions = options.map((option, i) =>
      i === index ? {...option, [field]: value} : option
    )
    setOptions(updatedOptions)
  }

  return (
    <Transition appear show={isOpen} as={React.Fragment}>
      <Dialog as='div' className='fixed inset-0 z-50' onClose={closeModal}>
        <div className='min-h-screen px-4 text-center flex items-center justify-center'>
          <div className='fixed inset-0 bg-black opacity-30'></div>

          <span className='inline-block h-screen align-middle' aria-hidden='true'>
            &#8203;
          </span>

          <div className='inline-block w-full max-w-2xl h-[90vh] text-left align-middle transition-all transform bg-white shadow-xl rounded-lg'>
            <div className='h-full overflow-y-auto p-6'>
              <Dialog.Title as='h3' className='text-lg font-medium leading-6 text-gray-900'>
                Create New Question
              </Dialog.Title>

              <form className='mt-4 space-y-4'>
                {/* Existing form fields (Program, Section, etc.) */}
                <div className='grid grid-cols-2 gap-4'>
                  <div>
                    <label className='block text-sm font-medium text-gray-700'>Program</label>
                    <select className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'>
                      <option>Program 1</option>
                      <option>Program 2</option>
                    </select>
                  </div>
                  <div>
                    <label className='block text-sm font-medium text-gray-700'>Section</label>
                    <select className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'>
                      <option>Section 1</option>
                      <option>Section 2</option>
                    </select>
                  </div>
                </div>

                {/* Question Code and Name */}
                <div className='grid grid-cols-2 gap-4'>
                  <div>
                    <label className='block text-sm font-medium text-gray-700'>Question Code</label>
                    <input
                      type='text'
                      className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
                    />
                  </div>
                  <div>
                    <label className='block text-sm font-medium text-gray-700'>Question Name</label>
                    <input
                      type='text'
                      className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
                    />
                  </div>
                </div>

                {/* Question Type and Is Mandatory */}
                <div className='grid grid-cols-2 gap-4'>
                  <div>
                    <label className='block text-sm font-medium text-gray-700'>Question Type</label>
                    <select className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'>
                      <option>Type 1</option>
                      <option>Type 2</option>
                    </select>
                  </div>
                  <div>
                    <label className='block text-sm font-medium text-gray-700'>Is Mandatory</label>
                    <select className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'>
                      <option>Yes</option>
                      <option>No</option>
                    </select>
                  </div>
                </div>

                {/* Field Regex and Display Order */}
                <div className='grid grid-cols-2 gap-4'>
                  <div>
                    <label className='block text-sm font-medium text-gray-700'>Field Regex</label>
                    <input
                      type='text'
                      className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
                    />
                  </div>
                  <div>
                    <label className='block text-sm font-medium text-gray-700'>Display Order</label>
                    <input
                      type='number'
                      className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
                    />
                  </div>
                </div>

                {/* Visible On Field */}
                <div className='flex items-center'>
                  <label className='block text-sm font-medium text-gray-700 mr-4'>
                    Visible On Field
                  </label>
                  <input
                    type='radio'
                    name='visibleOnField'
                    value='yes'
                    onChange={() => setIsVisibleOnField(true)}
                    className='mr-2'
                  />
                  <label className='mr-4'>Yes</label>
                  <input
                    type='radio'
                    name='visibleOnField'
                    value='no'
                    onChange={() => setIsVisibleOnField(false)}
                    className='mr-2'
                  />
                  <label>No</label>
                </div>

                {isVisibleOnField && (
                  <div className='mt-4'>
                    {/* Question ID and Option Value */}
                    {questionOptions.map((option, index) => (
                      <div key={index} className='grid grid-cols-2 gap-4'>
                        <div>
                          <label className='block text-sm font-medium text-gray-700'>
                            Question ID
                          </label>
                          <select
                            value={option.questionId}
                            onChange={(e) =>
                              handleQuestionOptionChange(index, 'questionId', e.target.value)
                            }
                            className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
                          >
                            <option>ID 1</option>
                            <option>ID 2</option>
                          </select>
                        </div>
                        <div>
                          <label className='block text-sm font-medium text-gray-700'>
                            Option Value
                          </label>
                          <select
                            multiple
                            value={option.optionValue}
                            onChange={(e) =>
                              handleQuestionOptionChange(
                                index,
                                'optionValue',
                                Array.from(e.target.selectedOptions, (option) => option.value)
                              )
                            }
                            className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
                          >
                            <option>Value 1</option>
                            <option>Value 2</option>
                          </select>
                        </div>
                      </div>
                    ))}

                    <button
                      type='button'
                      onClick={addQuestionOption}
                      className='mt-4 bg-blue-500 text-gray-50 py-1 px-3 rounded hover:bg-blue-600'
                    >
                      Add More
                    </button>
                  </div>
                )}

                {/* Option Heading */}
                <div className='mt-4'>
                  <h4 className='text-md font-medium'>Options</h4>
                  {options.map((option, index) => (
                    <div key={index} className='grid grid-cols-3 gap-4'>
                      <div>
                        <label className='block text-sm font-medium text-gray-700'>
                          Field Name
                        </label>
                        <input
                          type='text'
                          value={option.fieldName}
                          onChange={(e) => handleOptionChange(index, 'fieldName', e.target.value)}
                          className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
                        />
                      </div>
                      <div>
                        <label className='block text-sm font-medium text-gray-700'>
                          Field Value
                        </label>
                        <input
                          type='text'
                          value={option.fieldValue}
                          onChange={(e) => handleOptionChange(index, 'fieldValue', e.target.value)}
                          className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
                        />
                      </div>
                      <div>
                        <label className='block text-sm font-medium text-gray-700'>
                          Label Name
                        </label>
                        <select
                          value={option.labelName}
                          onChange={(e) => handleOptionChange(index, 'labelName', e.target.value)}
                          className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
                        >
                          <option>Label 1</option>
                          <option>Label 2</option>
                        </select>
                      </div>
                    </div>
                  ))}

                  <button
                    type='button'
                    onClick={addOption}
                    className='mt-4 bg-blue-500 text-gray-50 py-1 px-3 rounded hover:bg-blue-600'
                  >
                    Add More
                  </button>
                </div>

                {/* DataSource Heading */}
                <div className='mt-4'>
                  <h4 className='text-md font-medium'>DataSource</h4>
                  <div className='grid grid-cols-3 gap-4'>
                    <div>
                      <label className='block text-sm font-medium text-gray-700'>Source</label>
                      <select className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'>
                        <option>Source 1</option>
                        <option>Source 2</option>
                      </select>
                    </div>
                    <div>
                      <label className='block text-sm font-medium text-gray-700'>Label Key</label>
                      <input
                        type='text'
                        className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
                      />
                    </div>
                    <div>
                      <label className='block text-sm font-medium text-gray-700'>Label Value</label>
                      <input
                        type='text'
                        className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
                      />
                    </div>
                  </div>
                </div>

                <div className='mt-4 flex justify-end'>
                  <button
                    type='button'
                    className='bg-red-500 text-gray-50 py-2 px-4 rounded mr-2 hover:bg-red-600'
                    onClick={closeModal}
                  >
                    Cancel
                  </button>
                  <button
                    type='submit'
                    className='bg-green-500 text-gray-50 py-2 px-4 rounded hover:bg-green-600'
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}

export default CreateQuestionPopup
