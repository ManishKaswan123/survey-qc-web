import React from 'react'
import {IoSearchSharp} from 'react-icons/io5'
import {RiArrowDownSLine, RiArrowUpSLine} from 'react-icons/ri'

interface FilterHeaderProps {
  isExpanded: boolean
  onToggle: () => void
}

const FilterHeader: React.FC<FilterHeaderProps> = ({isExpanded, onToggle}) => {
  return (
    <div
      onClick={onToggle}
      className='flex justify-between items-center bg-[#265B91] cursor-pointer p-2 rounded-md shadow-sm'
    >
      <div className='flex items-center'>
        <IoSearchSharp className='text-slate-50 mr-2' size={20} />
        <h3 className='text-slate-50 font-medium text-base'>Filter Options</h3>
      </div>

      {!isExpanded && <p className='text-xs text-gray-200 italic mr-3'>Click to expand</p>}
      <div className='p-1'>
        {isExpanded ? (
          <RiArrowUpSLine className='text-slate-50 text-xl' />
        ) : (
          <RiArrowDownSLine className='text-slate-50 text-xl' />
        )}
      </div>
    </div>
  )
}

export default FilterHeader
