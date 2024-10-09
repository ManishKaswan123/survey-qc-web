import React, {useCallback, useEffect, useMemo, useRef, useState, RefObject, LegacyRef} from 'react'
import {Dialog, Transition} from '@headlessui/react'
import TextField from 'sr/partials/widgets/widgets-components/form/TextField'
import DropdownField from 'sr/partials/widgets/widgets-components/form/DropdownField'
import {SubmitHandler, useForm} from 'react-hook-form'
import {Button} from 'sr/helpers'
// import {MultiValue} from 'react-select'
import MultiSelectField, {OptionType} from 'sr/partials/widgets/widgets-components/form/MultiSelect'
import {useSelector} from 'react-redux'
import {RootState} from 'sr/redux/store'
import {useActions} from 'sr/utils/helpers/useActions'
// import {fetchSections} from '../../section/section.helper'
import {questionTypeEnum} from 'sr/constants/question'
import {OptionQuestion, Question, VisibleOnFieldId} from '../question.interface'
import {createQuestion, fetchStaticQuestions} from '../question.helper'
import {DEFAULT_LANG_NAME} from 'sr/constants/common'
// import TextArea from 'sr/helpers/ui-components/TextArea'
import {toast} from 'react-toastify'
import {useQueryClient} from '@tanstack/react-query'
import MultiLanguageLabelInput from 'sr/helpers/ui-components/MultiLangLabel'

interface CreateQuestionPopupProps {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
  defaultValues?: {[key: string]: any}
}

const CreateQuestionPopup: React.FC<CreateQuestionPopupProps> = ({
  isOpen,
  setIsOpen,
  defaultValues,
}) => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: {errors},
  } = useForm({mode: 'onBlur', reValidateMode: 'onSubmit', defaultValues})
  const queryClient = useQueryClient()
  const closeModal = () => setIsOpen(false)
  const [isVisibleOnField, setIsVisibleOnField] = useState<boolean>(false)
  const [visibleOnFieldIds, setVisibleOnFieldIds] = useState<VisibleOnFieldId[]>([])
  const [questionOptionsMap, setQuestionOptionsMap] = useState<{[key: string]: OptionQuestion[]}>(
    {}
  )
  const [options, setOptions] = useState<OptionQuestion[]>([])
  // const [questionOptions, setQuestionOptions] = useState<
  //   {questionId: string; optionValue: OptionType[]}[]
  // >([{questionId: '', optionValue: []}])
  const programReduxStore = useSelector((state: RootState) => state.program)
  const sectionReduxStore = useSelector((state: RootState) => state.section)
  const {fetchProgramAction, fetchSectionAction} = useActions()
  const [sectionWiseQuestions, setSectionWiseQuestions] = useState<Question[]>([])
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([] as string[])
  const [selectedLanguagesForOption, setSelectedLanguagesForOption] = useState<string[]>(
    [] as string[]
  )
  const [showDropdown, setShowDropdown] = useState(false)
  const [showDropdownForOption, setShowDropdownForOption] = useState(false)
  const [globalLabelName, setGlobalLabelName] = useState<{[key: string]: string}>({})
  const dropdownRef = useRef<any>(null) // Ref to focus on the dropdown
  const dropdownRefForOption = useRef<any>(null) // Ref to focus on the dropdown

  const questionType = useMemo(
    () =>
      questionTypeEnum.map((value) => ({
        name: value
          .split('_')
          .map((word) => word.charAt(0) + word.slice(1).toLowerCase()) // Capitalize each word
          .join(' '),
        id: value,
      })),
    [questionTypeEnum]
  )

  // const programOptions = [
  //   {id: 1, name: 'Program 1'},
  //   {id: 2, name: 'Program 2'},
  // ]

  const mandatoryOptions = [
    {id: 'true', name: 'Yes'},
    {id: 'false', name: 'No'},
  ]
  const fieldValidationOptions = [
    {id: 'camera', name: 'Camera'},
    {id: 'gallery', name: 'Gallery'},
    {
      id: 'gallery,camera',
      name: 'Camera and Gallery',
    },
  ]

  useEffect(() => {
    fetchUserDataIfNeeded()
  }, [])

  const fetchUserDataIfNeeded = useCallback(() => {
    if (programReduxStore.status !== 'succeeded') {
      fetchProgramAction({})
    }
    if (sectionReduxStore.status !== 'succeeded') {
      fetchSectionAction({})
    }
  }, [programReduxStore, sectionReduxStore, fetchProgramAction, fetchSectionAction])

  const addQuestionOption = () => {
    setVisibleOnFieldIds([...visibleOnFieldIds, {questionId: '', optionValue: []}])
  }

  const addOption = () => {
    setOptions([...options, {fieldName: '', fieldValue: '', labelName: {}}])
  }

  const handleQuestionSelect = (index: number, questionId: string) => {
    const selectedQuestion = sectionWiseQuestions.find((q) => q.id === questionId)

    // If the selected question has options, map them to the dropdown
    if (selectedQuestion) {
      setQuestionOptionsMap((prev) => ({
        ...prev,
        [index]: selectedQuestion.options, // Set the options for this specific question
      }))
      const updatedVisibleOnFieldIds = [...visibleOnFieldIds]
      updatedVisibleOnFieldIds[index].questionId = questionId
      setVisibleOnFieldIds(updatedVisibleOnFieldIds)
    }
    // console.log('questin options map', questionOptionsMap)
  }

  const handleQuestionOptionChange = (index: number, selectedOptions: string[]) => {
    const updatedVisibleOnFieldIds = [...visibleOnFieldIds]
    updatedVisibleOnFieldIds[index].optionValue = selectedOptions
    setVisibleOnFieldIds(updatedVisibleOnFieldIds)
  }

  const handleOptionChange = (index: number, field: string, value: string) => {
    const updatedOptions = options.map((option, i) =>
      i === index ? {...option, [field]: value} : option
    )
    setOptions(updatedOptions)
  }
  const handleOptionLabelChange = (index: number, langCode: string, value: string) => {
    const updatedOptions = [...options]
    if (!updatedOptions[index].labelName) {
      updatedOptions[index].labelName = {} // Initialize labelName if undefined
    }
    updatedOptions[index].labelName[langCode] = value
    setOptions(updatedOptions) // Update the options state
  }

  const handleGlobalLabelChange = (index: number, langCode: string, value: string) => {
    setGlobalLabelName((prevState) => ({
      ...prevState,
      [langCode]: value,
    }))
  }
  const handleAddLanguage = (langCode: string) => {
    if (langCode) {
      setSelectedLanguages((prevState) => [...prevState, langCode])
      setShowDropdown(false)
    }
  }
  const handleAddLanguageForOption = (langCode: string) => {
    if (langCode) {
      setSelectedLanguagesForOption((prevState) => [...prevState, langCode])
      setShowDropdownForOption(false)
    }
  }
  // Remove a selected language and its corresponding input field
  const handleRemoveLanguage = (langCode: string, index: number) => {
    setSelectedLanguages(selectedLanguages.filter((code) => code !== langCode))
    setGlobalLabelName((prevState) => {
      const newLabels = {...prevState}
      delete newLabels[langCode] // Remove the input value of that language
      return newLabels
    })
  }
  // Remove a selected language and its corresponding input field
  const handleRemoveLanguageForOption = (langCode: string, index: number) => {
    setSelectedLanguagesForOption(selectedLanguagesForOption.filter((code) => code !== langCode))
    const updatedOptions = [...options]
    delete updatedOptions[index].labelName[langCode]
    setOptions(updatedOptions)
  }
  // Focus on the dropdown when it becomes visible
  useEffect(() => {
    if (showDropdown && dropdownRef.current) {
      dropdownRef.current.focus()
    }
  }, [showDropdown])
  // Focus on the dropdown when it becomes visible
  useEffect(() => {
    if (showDropdownForOption && dropdownRefForOption.current) {
      dropdownRefForOption.current.focus()
    }
  }, [showDropdownForOption])

  const fetchQuestions = async () => {
    // Ensure both sectionId and programId are present before proceeding

    if (!watch('sectionId') || !watch('programId')) return

    try {
      const sectionId = watch('sectionId')
      const programId = watch('programId')

      // Fetch questions with sectionId and programId
      const {results} = await fetchStaticQuestions({sectionId, programId, getAll: true})

      // Filter out questions that match specific questionTypes
      const filteredQuestions = results.results.filter((question: Question) =>
        ['SINGLE_DROPDOWN', 'MULTI_DROPDOWN', 'RADIO', 'CHECKBOX'].includes(question.questionType)
      )

      // Update the state with filtered questions
      setSectionWiseQuestions(filteredQuestions)
    } catch (error) {
      console.log('Error fetching questions:', error)
    }
  }

  useEffect(() => {
    fetchQuestions()
  })

  const onSubmit: SubmitHandler<any> = async (data) => {
    // Validation: Check that `visibleOnFieldIds` has at least one value in `optionValue` for each `questionId`
    if (isVisibleOnField) {
      const hasInvalidVisibleOnFields = visibleOnFieldIds.some(
        (field: VisibleOnFieldId) => field.optionValue.length === 0
      )

      if (hasInvalidVisibleOnFields) {
        toast.error('Each visible field must have at least one option value.')
        return // Stop submission if validation fails
      }
    }

    // Create the payload
    const payload = {
      questionCode: data.questionCode,
      fieldName: data.fieldName,
      questionType: data.questionType,
      isMandatory: data.isMandatory || false,
      fieldRegex: data.fieldRegex || '',
      visibleOnFieldIds: isVisibleOnField ? visibleOnFieldIds : [],
      options: ['SINGLE_DROPDOWN', 'MULTI_DROPDOWN', 'RADIO', 'CHECKBOX'].includes(
        data.questionType
      )
        ? options
        : [],
      labelName: globalLabelName,
      dataSource: {
        config: {
          dynamicParams: [],
          fixedParams: [],
        },
        source: 'INLINE',
        labelKey: 'fieldName',
        valueKey: 'fieldValue',
      },
      displayOrder: data.displayOrder,
      programId: data.programId,
      sectionId: data.sectionId,
      questionConfig: {},
    }

    try {
      const res = await createQuestion(payload)
      if (res) toast.success('Question created successfully')
    } catch (e: any) {
      toast.error('Failed to create question', e.message)
    } finally {
      reset()
      closeModal()
      queryClient.invalidateQueries({queryKey: ['staticQuestions']})
    }
    // console.log('payload', payload)
  }

  // console.log('question id ', watch(`questionId_${0}`) != undefined)
  // console.log('option value len is :', visibleOnFieldIds[0]?.optionValue.length === 0)

  return (
    <Transition appear show={isOpen} as={React.Fragment}>
      <Dialog as='div' className='fixed inset-0 z-50' onClose={closeModal}>
        <div className='min-h-screen px-4 text-center flex items-center justify-center'>
          <div className='fixed inset-0 bg-black opacity-30'></div>

          <span className='inline-block h-screen align-middle' aria-hidden='true'>
            &#8203;
          </span>

          <div className='inline-block w-full max-w-3xl h-[95vh] text-left align-middle transition-all transform bg-white shadow-xl rounded-lg'>
            <div className='h-full overflow-y-auto px-6 pb-6'>
              <div className='sticky top-0 z-10 py-4 bg-white flex justify-between items-center'>
                <h2 className='text-xl   text-gray-900 font-bold'>Create New Question</h2>
                <Button
                  onClick={closeModal}
                  label='Close X'
                  className='bg-white hover:bg-gray-200 text-gray-800 font-bold py-2 px-4 rounded  inline-flex items-center ml-2'
                />
              </div>

              <form className='mt-4 space-y-4' onSubmit={handleSubmit(onSubmit)}>
                {/* Existing form fields (Program, Section, etc.) */}
                <div className='grid grid-cols-2 gap-4'>
                  <div>
                    <DropdownField
                      key={1}
                      data={programReduxStore.totalPrograms}
                      labelKey='name'
                      label='Program'
                      placeholder='Select Program'
                      valueKey='_id'
                      name='programId'
                      required={true}
                      register={register('programId', {required: true})}
                      error={errors.program && !watch('program')}
                      errorText='Please select a program'
                    />
                  </div>
                  <div>
                    <DropdownField
                      key={2}
                      data={sectionReduxStore.totalSections} // Ensure data is a flat array
                      labelKey='sectionName'
                      label='Section'
                      placeholder='Select Section'
                      valueKey='_id'
                      name='sectionId'
                      required={true}
                      register={register('sectionId', {
                        required: true,
                        onChange: fetchQuestions, // Fetch questions on section change
                      })}
                      error={errors.section && !watch('sectionId')}
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
                      id='fieldName'
                      required={true}
                      name='fieldName'
                      placeholder='Enter Question Name'
                      register={register('fieldName', {required: true})}
                      error={errors.fieldName && !watch('fieldName')}
                      errorText='Please enter Question Name'
                    />
                  </div>
                </div>

                {/* Question Type and Is Mandatory */}
                <div className='grid grid-cols-2 gap-4'>
                  <div>
                    <DropdownField
                      key={5}
                      //   data={questionOptions}
                      data={questionType}
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
                      required={false}
                      register={register('isMandatory', {required: false})}
                      // error={errors.isMandatory && !watch('isMandatory')}
                      // errorText='Please select if mandatory'
                    />
                  </div>
                </div>

                {/* Field Regex and Display Order */}
                <div className='grid grid-cols-2 gap-4'>
                  <div>
                    <DropdownField
                      key={7}
                      data={fieldValidationOptions}
                      labelKey='name'
                      label='Field Validation'
                      placeholder='Select Field Validation'
                      valueKey='id'
                      name='fieldRegex'
                      required={false}
                      register={register('fieldRegex', {required: false})}
                      // error={errors.isMandatory && !watch('isMandatory')}
                      // errorText='Please select if mandatory'
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
                {/* <TextArea
                  // key={index}

                  // type={field.type}

                  label={'Question Config'}
                  className='custom-input form-input p-2 border rounded mb-2'
                  id='questionConfig'
                  required={true}
                  name='questionConfig'
                  placeholder='Enter Question Config'
                  register={register('questionConfig', {required: true})}
                  error={errors.questionConfig && !watch('questionConfig')}
                  errorText='Please enter Question Config'
                  rows={10}
                /> */}

                {/* Visible On Field */}
                {/* <div className='flex items-center space-x-4'>
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
                </div> */}
                <DropdownField
                  // key={6}
                  data={[
                    {name: 'Yes', id: true},
                    {
                      name: 'No',
                      id: false,
                    },
                  ]}
                  labelKey='name'
                  label='Is Visible of Fields'
                  placeholder='Select Visible of Fields'
                  valueKey='id'
                  name='Is Visible of Fields'
                  required={false}
                  onChange={(e) => setIsVisibleOnField(e.target.value === 'true')}
                  // register={register('isMandatory', {required: false})}
                  // error={errors.isMandatory && !watch('isMandatory')}
                  // errorText='Please select if mandatory'
                />

                {isVisibleOnField && (
                  <div className='mt-4'>
                    {/* Question ID and Option Value */}
                    {visibleOnFieldIds.map((field, index) => (
                      <div key={index} className='grid grid-cols-2 gap-4'>
                        <div>
                          <DropdownField
                            data={sectionWiseQuestions}
                            labelKey='fieldName' // Assuming you want to display fieldName
                            label='Question ID'
                            placeholder='Select Question ID'
                            valueKey='id'
                            name={`questionId_${index}`}
                            required={true}
                            register={register(`questionId_${index}`, {
                              required: true,
                              onChange: (e) => handleQuestionSelect(index, e.target.value),
                            })}
                            error={errors[`questionId_${index}`] && !watch(`questionId_${index}`)}
                            errorText='Please select a question ID'
                            // Update options based on question selection
                          />
                        </div>
                        <div className='mt-2'>
                          <MultiSelectField
                            options={
                              questionOptionsMap[index]?.map((option) => ({
                                label: option.fieldName, // or option.labelName if needed
                                value: option.fieldValue,
                              })) || []
                            } // Show options specific to the selected question
                            label='Option Value'
                            required={true}
                            name={`optionValue_${index}`}
                            value={field.optionValue.map((value) => ({label: value, value}))}
                            onChange={(selectedOptions) =>
                              handleQuestionOptionChange(
                                index,
                                selectedOptions.map((option) => option.value)
                              )
                            }
                            placeholder='Select Option Values'
                            // error={errors[`optionValue_${index}`] && !watch(`optionValue_${index}`)}
                            error={
                              visibleOnFieldIds[index].optionValue.length === 0 &&
                              watch(`questionId_${index}`) != undefined
                            }
                            errorText='Please select option values'
                          />
                        </div>
                      </div>
                    ))}

                    <Button
                      onClick={addQuestionOption}
                      label='Add More'
                      className='mt-4 bg-blue-500 text-gray-50 py-1 px-3 ml-4 rounded hover:bg-blue-600'
                    />
                  </div>
                )}

                {/* Option Heading */}
                {['SINGLE_DROPDOWN', 'MULTI_DROPDOWN', 'RADIO', 'CHECKBOX'].includes(
                  watch('questionType')
                ) && (
                  <div className='mt-6'>
                    {/* <h4 className='text-xl font-bold mb-6'>Options</h4>
                     */}
                    <div className='block text-sm font-medium text-gray-700 mx-4'>Options</div>

                    {options.map((option, index) => (
                      <div key={index} className='mb-2 '>
                        <div className='grid grid-cols-1 sm:grid-cols-2 gap-6 mb-4'>
                          {/* Field Name */}
                          <div>
                            <TextField
                              type='text'
                              label='Field Name'
                              value={option.fieldName}
                              required={true}
                              register={register(`optionFieldName_${index}`, {
                                required: true,
                                onChange: (e) =>
                                  handleOptionChange(index, 'fieldName', e.target.value),
                              })}
                              // onChange={(e) => handleOptionChange(index, 'fieldName', e.target.value)}
                              name={`optionFieldName_${index}`}
                              placeholder='Enter field name'
                              error={
                                errors[`optionFieldName_${index}`] &&
                                !watch(`optionFieldName_${index}`)
                              }
                              errorText='Please enter field name'
                            />
                          </div>

                          {/* Field Value */}
                          <div>
                            <TextField
                              type='text'
                              label='Field Value'
                              value={option.fieldValue}
                              required={true}
                              register={register(`optionFieldValue_${index}`, {
                                required: true,
                                onChange: (e) =>
                                  handleOptionChange(index, 'fieldValue', e.target.value),
                              })}
                              // onChange={(e) => handleOptionChange(index, 'fieldName', e.target.value)}
                              name={`optionFieldValue_${index}`}
                              placeholder='Enter field Value'
                              error={
                                errors[`optionFieldValue_${index}`] &&
                                !watch(`optionFieldValue_${index}`)
                              }
                              errorText='Please enter field Value'
                            />
                          </div>
                        </div>
                        <div className='mt-4'>
                          <div className='block text-sm font-medium text-gray-700 mx-4'>
                            Option Label Name
                          </div>

                          <MultiLanguageLabelInput
                            index={index}
                            selectedLanguages={selectedLanguagesForOption}
                            labelName={options[index].labelName}
                            handleLabelChange={handleOptionLabelChange}
                            handleAddLanguage={handleAddLanguageForOption}
                            handleRemoveLanguage={handleRemoveLanguageForOption}
                            showDropdown={showDropdownForOption}
                            setShowDropdown={setShowDropdownForOption}
                            dropdownRef={dropdownRefForOption}
                          />
                        </div>
                      </div>
                    ))}

                    <Button
                      onClick={addOption}
                      label='Add More Options'
                      className='mt-2 bg-blue-500 text-gray-50 py-1 px-3 ml-4 rounded hover:bg-blue-600'
                    />
                  </div>
                )}

                <div className='mt-4'>
                  <div className='block text-sm font-medium text-gray-700 mx-4'>
                    Question Label Name
                  </div>
                  <MultiLanguageLabelInput
                    index={0}
                    selectedLanguages={selectedLanguages}
                    labelName={globalLabelName}
                    handleLabelChange={handleGlobalLabelChange}
                    handleAddLanguage={handleAddLanguage}
                    handleRemoveLanguage={handleRemoveLanguage}
                    showDropdown={showDropdown}
                    setShowDropdown={setShowDropdown}
                    dropdownRef={dropdownRef}
                  />
                </div>
                {/* DataSource Heading */}
                {/* <div className='mt-4'>
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
                </div> */}
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
                <div className='flex justify-center mt-4 ml-4'>
                  <Button
                    // onClick={handleSubmit(onSubmit)}
                    type='submit'
                    label='Submit'
                    className='bg-blue-500 hover:bg-blue-600 text-gray-50 font-bold py-2 px-4 rounded shadow-md inline-flex items-center'
                  />
                  {/* <Button
                    onClick={closeModal}
                    label='Close X'
                    className='bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold py-2 px-4 rounded shadow-md inline-flex items-center ml-2'
                  /> */}
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
