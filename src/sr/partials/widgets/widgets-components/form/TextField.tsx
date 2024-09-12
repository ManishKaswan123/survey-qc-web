import React, {ChangeEvent, FocusEvent} from 'react'

interface Props {
  className?: string
  wrapperClassName?: string
  labelStyle?: 'style1' | 'style2' | 'style3'
  label?: string
  type: string
  required?: boolean
  id?: string
  name: string
  step?: string
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void
  onBlur?: (e: FocusEvent<HTMLInputElement>) => void
  disabled?: boolean
  error?: any
  value?: string
  autoComplete?: string
  errorText?: string
  testId?: string
  maxLength?: number
  minLength?: number
  placeholder?: string
  autofocus?: boolean
  register?: any
}

const TextField = ({
  className,
  wrapperClassName,
  labelStyle,
  label,
  name,
  required,
  type,
  id,
  onChange,
  onBlur,
  disabled,
  error,
  step,
  autoComplete = 'off',
  errorText,
  value,
  testId,
  maxLength,
  minLength,
  autofocus,
  register,
  placeholder,
}: Props) => {
  return (
    <div className='my-2 mx-4'>
      {label && (
        <label htmlFor={id || name} className='block text-sm font-medium text-gray-700 mb-1'>
          {label}
          {required && <span className='text-red-500'>*</span>}
        </label>
      )}
      <input
        type={type}
        step={step}
        name={name}
        id={id || name}
        className={`block w-full px-3 py-2 border-gray-900 border focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md  ${
          error ? 'border-red-500' : 'border-gray-300'
        }`}
        placeholder={placeholder || `Enter ${name}`}
        onChange={onChange}
        onBlur={onBlur}
        disabled={disabled}
        value={value}
        autoComplete={autoComplete}
        data-testid={testId}
        autoFocus={autofocus}
        minLength={minLength}
        maxLength={maxLength}
        {...register}
      />
      {required && error && <p className='mt-2 text-sm text-red-600'>{errorText}</p>}
    </div>
  )
}

export default TextField
