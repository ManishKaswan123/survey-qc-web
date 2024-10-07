import React, {useState} from 'react'
import {IoSearchSharp} from 'react-icons/io5'
import {RxCross2} from 'react-icons/rx'
import TextField from 'sr/partials/widgets/widgets-components/form/TextField'
import DropdownField from 'sr/partials/widgets/widgets-components/form/DropdownField'

const Filter = ({onApplyFilter, preFilters, fields}: any) => {
  const [filters, setFilters] = useState(preFilters)

  const handleChange = (e: any) => {
    const {name, value, type, checked} = e.target
    setFilters({
      ...filters,
      [name]: type === 'checkbox' ? checked : value,
    })
  }

  const handleClearFilter = () => {
    setFilters({})
    onApplyFilter({})
  }

  const handleApplyFilter = () => {
    const activeFilters = Object.fromEntries(
      Object.entries(filters).filter(([_, value]) => {
        if (typeof value === 'boolean') {
          return value
        }
        return value !== ''
      })
    )
    onApplyFilter(activeFilters)
  }

  const isFilterActive = (filterValue: any) => {
    return filterValue !== '' && filterValue != null
  }

  return (
    <div className='w-full p-6 bg-white rounded-lg shadow-lg'>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
        {fields.map((field: any, index: number) => {
          if (field.type === 'dropdown') {
            return (
              <DropdownField
                key={index}
                data={field.name}
                labelKey={field.labelKey || 'name'}
                label={field.topLabel}
                placeholder={field.placeholder}
                valueKey={field.id || 'id'}
                value={filters[field.label] ? filters[field.label] : ''}
                onChange={handleChange}
                name={field.label}
              />
            )
          } else {
            return (
              <TextField
                key={field.name}
                type={field.type}
                label={field.label}
                name={field.name}
                value={filters[field.name]}
                onChange={handleChange}
                placeholder={field.placeholder}
              />
            )
          }
        })}
      </div>
      <div className='flex justify-start items-center mt-6 gap-4'>
        <button
          onClick={handleApplyFilter}
          className='flex items-center justify-center bg-[#265B91] hover:bg-blue-700 text-slate-50 font-semibold py-2 px-4 ml-2 rounded-full shadow transition duration-300 ease-in-out'
        >
          <IoSearchSharp className='mr-2' size={18} />
          Apply
        </button>
        <button
          onClick={handleClearFilter}
          className='flex items-center justify-center bg-red-600 hover:bg-red-700 text-slate-50 font-semibold py-2 px-4 rounded-full shadow transition duration-300 ease-in-out'
        >
          <RxCross2 className='mr-2' size={18} />
          Clear
        </button>
      </div>
    </div>
  )
}

export default Filter
