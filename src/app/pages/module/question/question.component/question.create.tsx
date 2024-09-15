import React, {useState} from 'react'
import {Dialog, Transition} from '@headlessui/react'
import TextField from 'sr/partials/widgets/widgets-components/form/TextField'
import DropdownField from 'sr/partials/widgets/widgets-components/form/DropdownField'
import {useForm} from 'react-hook-form'
import {Button} from 'sr/helpers'
import {MultiValue} from 'react-select'
import MultiSelectField, {OptionType} from 'sr/partials/widgets/widgets-components/form/MultiSelect'

interface CreateQuestionPopupProps {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}

const CreateQuestionPopup: React.FC<CreateQuestionPopupProps> = ({isOpen, setIsOpen}) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: {errors},
  } = useForm()
  const closeModal = () => setIsOpen(false)
  const [isVisibleOnField, setIsVisibleOnField] = useState(false)
  const [options, setOptions] = useState([{fieldName: '', fieldValue: '', labelName: ''}])
  const [questionOptions, setQuestionOptions] = useState<
    {questionId: string; optionValue: OptionType[]}[]
  >([{questionId: '', optionValue: []}])

  const programOptions = [
    {id: 1, name: 'Program 1'},
    {id: 2, name: 'Program 2'},
  ]

  // Define sectionOptions as a flat array of objects
  const sectionOptions = [
    {id: 'section1', name: 'Section 1'},
    {id: 'section2', name: 'Section 2'},
  ]

  const mandatoryOptions = [
    {id: 'yes', name: 'Yes'},
    {id: 'no', name: 'No'},
  ]

  const questionIdOptions = [
    {id: '1', name: 'Question 1'},
    {id: '2', name: 'Question 2'},
  ]

  const optionValueOptions: OptionType[] = [
    {value: 'value1', label: 'Value 1'},
    {value: 'value2', label: 'Value 2'},
  ]

  const labelNameOptions = [
    {id: '1', name: 'Label 1'},
    {id: '2', name: 'Label 2'},
  ]

  const sourceOptions = [
    {id: '1', name: 'Source 1'},
    {id: '2', name: 'Source 2'},
  ]

  const toggleSwitch = () => setIsVisibleOnField(!isVisibleOnField)

  const addQuestionOption = () => {
    setQuestionOptions([...questionOptions, {questionId: '', optionValue: []}])
  }

  const addOption = () => {
    setOptions([...options, {fieldName: '', fieldValue: '', labelName: ''}])
  }

  const handleQuestionOptionChange = (
    index: number,
    field: 'questionId' | 'optionValue',
    newValue: MultiValue<OptionType>
  ) => {
    const updatedOptions = [...questionOptions]
    updatedOptions[index] = {
      ...updatedOptions[index],
      [field]: newValue as OptionType[],
    }
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
              <h2 className='text-xl  leading-6 text-gray-900 font-bold'>Create New Question</h2>

              <form className='mt-4 space-y-4'>
                {/* Existing form fields (Program, Section, etc.) */}
                <div className='grid grid-cols-2 gap-4'>
                  <div>
                    <DropdownField
                      key={1}
                      data={programOptions}
                      labelKey='name'
                      label='Program'
                      placeholder='Select Program'
                      valueKey='id'
                      name='program'
                      required={true}
                      register={register('program', {required: true})}
                      error={errors.program && !watch('program')}
                      errorText='Please select a program'
                    />
                  </div>
                  <div>
                    <DropdownField
                      key={2}
                      data={sectionOptions} // Ensure data is a flat array
                      labelKey='name'
                      label='Section'
                      placeholder='Select Section'
                      valueKey='id'
                      name='section'
                      required={true}
                      register={register('section', {required: true})}
                      error={errors.section && !watch('section')}
                      errorText='Please select a section'
                    />
                  </div>
                </div>

                {/* Question Code and Name */}
                <div className='grid grid-cols-2 gap-4'>
                  <div>
                    <TextField
                      key={3}
                      type='text'
                      label='Question Code'
                      className='custom-input form-input p-2 border rounded mb-2'
                      id='questionCode'
                      required={true}
                      name='questionCode'
                      placeholder='Enter Question Code'
                      register={register('questionCode', {required: true})}
                      error={errors.questionCode && !watch('questionCode')}
                      errorText='Please enter Question Code'
                    />
                  </div>
                  <div>
                    <TextField
                      key={4}
                      type='text'
                      label='Question Name'
                      className='custom-input form-input p-2 border rounded mb-2'
                      id='questionName'
                      required={true}
                      name='questionName'
                      placeholder='Enter Question Name'
                      register={register('questionName', {required: true})}
                      error={errors.questionName && !watch('questionName')}
                      errorText='Please enter Question Name'
                    />
                  </div>
                </div>

                {/* Question Type and Is Mandatory */}
                <div className='grid grid-cols-2 gap-4'>
                  <div>
                    <DropdownField
                      key={5}
                      data={questionOptions}
                      labelKey='name'
                      label='Question Type'
                      placeholder='Select Question Type'
                      valueKey='id'
                      name='questionType'
                      required={true}
                      register={register('questionType', {required: true})}
                      error={errors.questionType && !watch('questionType')}
                      errorText='Please select a question type'
                    />
                  </div>
                  <div>
                    <DropdownField
                      key={6}
                      data={mandatoryOptions}
                      labelKey='name'
                      label='Is Mandatory'
                      placeholder='Select Mandatory'
                      valueKey='id'
                      name='isMandatory'
                      required={true}
                      register={register('isMandatory', {required: true})}
                      error={errors.isMandatory && !watch('isMandatory')}
                      errorText='Please select if mandatory'
                    />
                  </div>
                </div>

                {/* Field Regex and Display Order */}
                <div className='grid grid-cols-2 gap-4'>
                  <div>
                    <TextField
                      key={7}
                      type='text'
                      label='Field Regex'
                      className='custom-input form-input p-2 border rounded mb-2'
                      id='fieldRegex'
                      required={false}
                      name='fieldRegex'
                      placeholder='Enter Field Regex'
                      register={register('fieldRegex', {required: false})}
                      error={errors.fieldRegex && !watch('fieldRegex')}
                      errorText='Please enter Field Regex'
                    />
                  </div>
                  <div>
                    <TextField
                      key={8}
                      type='number'
                      label='Display Order'
                      className='custom-input form-input p-2 border rounded mb-2'
                      id='displayOrder'
                      required={true}
                      name='displayOrder'
                      placeholder='Enter Display Order'
                      register={register('displayOrder', {required: true})}
                      error={errors.displayOrder && !watch('displayOrder')}
                      errorText='Please enter Display Order'
                    />
                  </div>
                </div>

                {/* Visible On Field */}
                <div className='flex items-center space-x-4'>
                  <label className=''>
                    <h4 className='text-lg font-semibold my-3'>Visible On Field</h4>
                  </label>
                  <div
                    onClick={toggleSwitch}
                    className={`w-14 h-8 flex items-center bg-gray-300 rounded-full p-1 cursor-pointer transition-colors duration-300 ${
                      isVisibleOnField ? 'bg-green-500' : 'bg-red-500'
                    }`}
                  >
                    <div
                      className={`bg-white w-6 h-6 rounded-full shadow-md transform transition-transform duration-300 ${
                        isVisibleOnField ? 'translate-x-6' : ''
                      }`}
                    />
                  </div>
                </div>

                {isVisibleOnField && (
                  <div className='mt-4'>
                    {/* Question ID and Option Value */}
                    {questionOptions.map((option, index) => (
                      <div key={index} className='grid grid-cols-2 gap-4'>
                        <div>
                          <DropdownField
                            data={questionIdOptions} // Use your flat array of question IDs
                            labelKey='name'
                            label='Question ID'
                            placeholder='Select Question ID'
                            valueKey='id'
                            name={`questionId_${index}`}
                            required={true}
                            register={register(`questionId_${index}`, {required: true})}
                            error={errors[`questionId_${index}`] && !watch(`questionId_${index}`)}
                            errorText='Please select a question ID'
                          />
                        </div>
                        <div className='mt-2'>
                          <MultiSelectField
                            options={optionValueOptions}
                            label='Option Value'
                            name={`optionValue_${index}`}
                            value={option.optionValue}
                            onChange={(selectedOptions) =>
                              handleQuestionOptionChange(index, 'optionValue', selectedOptions)
                            }
                            placeholder='Select Option Values'
                            error={errors[`optionValue_${index}`] && !watch(`optionValue_${index}`)}
                            errorText='Please select option values'
                          />
                        </div>
                      </div>
                    ))}

                    <Button
                      onClick={addQuestionOption}
                      label='Add More'
                      className='mt-4 bg-blue-500 text-gray-50 py-1 px-3 rounded hover:bg-blue-600'
                    />
                  </div>
                )}

                {/* Option Heading */}
                <div className='mt-4'>
                  <h4 className='text-lg font-semibold mb-4'>Options</h4>

                  {options.map((option, index) => (
                    <div key={index} className='grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4'>
                      <div>
                        <TextField
                          type='text'
                          label='Field Name'
                          value={option.fieldName}
                          onChange={(e) => handleOptionChange(index, 'fieldName', e.target.value)}
                          name={`fieldName_${index}`}
                          placeholder='Enter field name'
                        />
                      </div>
                      <div>
                        <TextField
                          type='text'
                          label='Field Value'
                          value={option.fieldValue}
                          onChange={(e) => handleOptionChange(index, 'fieldValue', e.target.value)}
                          name={`fieldValue_${index}`}
                          placeholder='Enter field value'
                        />
                      </div>
                      <div>
                        <DropdownField
                          data={labelNameOptions}
                          labelKey='name'
                          label='Label Name'
                          placeholder='Select Label'
                          valueKey='id'
                          name={`labelName_${index}`}
                          value={option.labelName}
                          onChange={(e) => handleOptionChange(index, 'labelName', e.target.value)}
                        />
                      </div>
                    </div>
                  ))}

                  <Button
                    onClick={addOption}
                    label='Add More'
                    className='mt-4 bg-blue-500 text-gray-50 py-1 px-3 rounded hover:bg-blue-600'
                  />
                </div>

                {/* DataSource Heading */}
                <div className='mt-4'>
                  <h4 className='text-lg font-semibold mb-4'>DataSource</h4>
                  <div className='grid grid-cols-1 sm:grid-cols-3 gap-4'>
                    <div>
                      <DropdownField
                        data={sourceOptions}
                        labelKey='name'
                        label='Source'
                        placeholder='Select Source'
                        valueKey='id'
                        name='source'
                        // Replace the below value and onChange with your state and handler
                        value='' // Example value, replace with actual state value
                        onChange={(e) => console.log(e)} // Example handler, replace with actual handler
                      />
                    </div>
                    <div>
                      <TextField
                        type='text'
                        label='Label Key'
                        name='labelKey'
                        // Replace the below value and onChange with your state and handler
                        value='' // Example value, replace with actual state value
                        onChange={(e) => console.log(e)} // Example handler, replace with actual handler
                        placeholder='Enter label key'
                      />
                    </div>
                    <div>
                      <TextField
                        type='text'
                        label='Label Value'
                        name='labelValue'
                        // Replace the below value and onChange with your state and handler
                        value='' // Example value, replace with actual state value
                        onChange={(e) => console.log(e)} // Example handler, replace with actual handler
                        placeholder='Enter label value'
                      />
                    </div>
                  </div>
                </div>
                {/* <div className='mt-4 flex justify-end'>
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
                </div> */}

                {/* Submit and Cancel Buttons */}
                <div className='flex justify-end mt-4'>
                  <Button
                    // onClick={handleSubmit(onSubmit)}
                    type='submit'
                    label='Submit'
                    className='bg-blue-500 hover:bg-blue-600 text-gray-50 font-bold py-2 px-4 rounded shadow-md inline-flex items-center'
                  />
                  <Button
                    onClick={closeModal}
                    label='Cancel'
                    className='bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold py-2 px-4 rounded shadow-md inline-flex items-center ml-2'
                  />
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
