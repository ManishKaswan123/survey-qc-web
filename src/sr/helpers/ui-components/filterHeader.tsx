import {IoSearchSharp} from 'react-icons/io5'
import {RiArrowDownSLine, RiArrowUpSLine} from 'react-icons/ri'

interface FilterHeaderProps {
  isExpanded: boolean
  onToggle: () => void
}
export default function FilterHeader({isExpanded, onToggle:toggleExpand}: FilterHeaderProps) {
  return (
    <div
      onClick={toggleExpand}
      className='flex justify-between items-center bg-white hover:cursor-pointer'
    >
      <div className='flex items-center bg-[#265B91] rounded-br-full px-6 py-3'>
        <IoSearchSharp className='text-gray-50 mr-2 bg-transparent' size={20} />
        <h3 className='text-gray-50 bg-transparent font-medium'>Filter</h3>
      </div>

      {!isExpanded && (
        <p className='text-md leading-tight mb-2 sm:mb-0 sm:mr-4 p-3 text-gray-400'>
          Click to Search
        </p>
      )}
      <div className='focus:outline-none p-3'>
        {isExpanded ? (
          <RiArrowUpSLine className='text-2xl' />
        ) : (
          <RiArrowDownSLine className='text-2xl' />
        )}
      </div>
    </div>
  )
}
