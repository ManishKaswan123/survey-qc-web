import React, {ChangeEvent, FocusEvent} from 'react'

interface Props {
  className?: string
  labelStyle?: 'style1' | 'style2' | 'style3'
  label?: string
  required?: boolean
  id?: string
  name: string
  onChange?: (e: ChangeEvent<HTMLSelectElement>) => void
  onBlur?: (e: FocusEvent<HTMLSelectElement>) => void
  disabled?: boolean
  error?: any
  autoComplete?: string
  errorText?: string
  testId?: string
  placeholder?: string
  labelKey: string
  valueKey: string
  autofocus?: boolean
  isMultiselect?: boolean
  register?: any
  rules?: any
  data: any[]
  value?: any
}

const DropdownField = ({
  labelStyle,
  className,
  label,
  name,
  required,
  data,
  id,
  onChange,
  onBlur,
  disabled,
  error,
  autoComplete = 'off',
  errorText,
  testId,
  autofocus,
  register,
  placeholder,
  labelKey,
  valueKey,
  isMultiselect,
  value,
}: Props) => {
  return (
    <div className='input-wrapper my-2 mx-4'>
      {label && (
        <label htmlFor={id || name} className='input-wrapper block text-sm font-medium text-gray-700 mb-1'>
          {label}
          {required && <span className='text-red-500'>*</span>}
        </label>
      )}

      <select
        name={name}
        id={id || name}
        multiple={isMultiselect}
        className={`block w-full pl-3 pr-10 py-2 text-base border-gray-900 border focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md placeholder:text-gray-500 ${
          required && error ? 'border-red-500' : 'border-gray-300'
        }`}
        onChange={onChange}
        onBlur={onBlur}
        disabled={disabled}
        autoComplete={autoComplete}
        data-testid={testId}
        autoFocus={autofocus}
        {...register}
        value={value}
      >
        {!isMultiselect && <option value=''>{placeholder || 'Select an option'}</option>}

        {data &&
          data.length > 0 &&
          data.map((item: any, key: any) => (
            <option key={key} value={item[valueKey]}>
              {item[labelKey]}
            </option>
          ))}
      </select>

      {required && error && <p className='mt-2 text-sm text-red-600'>{errorText}</p>}
    </div>
  )
}

export default DropdownField
