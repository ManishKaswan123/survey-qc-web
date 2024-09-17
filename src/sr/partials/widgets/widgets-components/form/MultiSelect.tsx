import React from 'react'
import Select, {MultiValue, ActionMeta} from 'react-select'

export interface OptionType {
  value: string
  label: string
}

export interface MultiSelectFieldProps {
  options: OptionType[]
  label: string
  name: string
  value: OptionType[]
  onChange: (selectedOptions: MultiValue<OptionType>, actionMeta: ActionMeta<OptionType>) => void
  placeholder?: string
  error?: boolean
  errorText?: string
  required?: boolean
  // register?: any
}

const MultiSelectField: React.FC<MultiSelectFieldProps> = ({
  // register,
  required = false,
  options,
  label,
  name,
  value,
  onChange,
  placeholder,
  error,
  errorText,
}) => {
  return (
    <div className='w-full'>
      <label className='block text-sm font-medium text-gray-700 mb-1'>
        {label}
        {required && <span className='text-red-500'>*</span>}
      </label>
      <Select
        isMulti
        name={name}
        options={options}
        value={value}
        onChange={onChange}
        className={`basic-single ${error ? 'border-red-500' : ''}`}
        classNamePrefix='select'
        placeholder={placeholder}
      />
      {error && <p className='text-red-500 text-xs mt-1'>{errorText}</p>}
    </div>
  )
}

export default MultiSelectField
