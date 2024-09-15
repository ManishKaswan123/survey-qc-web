import React, {ChangeEvent, FocusEvent} from 'react'

interface TextAreaProps {
  label?: string
  type?: string // Optional, though not used for textarea
  required?: boolean
  id?: string
  name: string
  step?: string // Not applicable for textarea
  onChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void
  onBlur?: (e: FocusEvent<HTMLTextAreaElement>) => void
  disabled?: boolean
  error?: any
  value?: string
  autoComplete?: string // Not applicable for textarea
  errorText?: string
  testId?: string
  className?: string
  maxLength?: number
  minLength?: number
  wrapperClassName?: string
  placeholder?: string
  autofocus?: boolean
  register?: any
  width?: string
  height?: string
  labelStyle?: 'style1' | 'style2' | 'style3'
  rows?: number
}

const TextArea = ({
  label,
  className = 'p-2 border w-full border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500',
  wrapperClassName,
  name,
  required,
  id,
  onChange,
  onBlur,
  disabled,
  error,
  errorText,
  value,
  testId,
  maxLength,
  minLength,
  autofocus,
  register,
  placeholder,
  labelStyle = 'style2',
  width,
  height,
  rows = 3,
}: TextAreaProps) => {
  const calculatedHeight = rows * 1.5 + 'em' // Approximation of height based on rows

  return (
    <div className={`m-2 input-wrapper ${wrapperClassName}`}>
      {label && labelStyle === 'style1' && (
        <label htmlFor={id || name} className='input-label'>
          {label}
          {required && <span className='required-field'>*</span>}
        </label>
      )}
      {label && labelStyle === 'style2' && (
        <div>
          <label htmlFor={id || name} className='ml-1 text-center text-sm font-medium'>
            {label}
            {required && <span className='required-field'>*</span>}
          </label>
        </div>
      )}
      <div className='flex justify-center items-center'>
        <textarea
          name={name}
          id={id || name}
          className={` ${className} ${
            error ? 'border-red-500' : 'border-gray-300'
          }  placeholder:text-left placeholder-gray-400 placeholder:text-sm placeholder:font-medium px-1`}
          placeholder={placeholder ? `Enter ${placeholder}` : `Enter ${name}`}
          onChange={onChange}
          style={{
            width: width || '100%',
            height: height || calculatedHeight,
            minHeight: calculatedHeight,
          }}
          onBlur={onBlur}
          disabled={disabled}
          value={value}
          autoFocus={autofocus}
          minLength={minLength}
          maxLength={maxLength}
          rows={rows}
          data-testid={testId}
          {...register}
        ></textarea>
      </div>
      {required && error && <p className='text-rose-500 font-medium text-center'>{errorText}</p>}
    </div>
  )
}

export default TextArea
