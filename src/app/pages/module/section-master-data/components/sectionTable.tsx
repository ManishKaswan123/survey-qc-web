import React, { useState } from 'react';
import { FaEdit, FaTrash, FaEye } from 'react-icons/fa';
import { Section } from '../sectionInterfaces'; // Update the import to point to the Section interface

interface SectionTableProps {
  sectionData: Section[];
  onEdit: (section: Section) => void;
  onDelete: (section: Section) => void;
  onView: (sectionId: string) => void;
}

const SectionTable: React.FC<SectionTableProps> = ({ sectionData, onEdit, onDelete, onView }) => {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());

  const toggleDetails = (id: string) => {
    setExpandedSections(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  return (
    <div className='overflow-x-auto my-5'>
      <div className='shadow rounded-lg overflow-hidden'>
        <table className='min-w-full leading-normal'>
          <thead>
            <tr>
              <th className='px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider'>
                Section Name
              </th>
              <th className='px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider'>
                Details
              </th>
              <th className='px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider'>
                Start Date
              </th>
              <th className='px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider'>
                End Date
              </th>
              <th className='px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider'>
                View Section
              </th>
              <th className='px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider'>
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {sectionData.map((section) => (
              <tr key={section.id} className='odd:bg-white even:bg-gray-50'>
                <td className='px-5 py-5 text-left border-b border-gray-200 text-sm'>
                  <p className='text-gray-900 whitespace-no-wrap'>{section.name}</p>
                </td>
                <td className='px-5 py-5 text-left border-b border-gray-200 text-sm'>
                  <p>
                    {expandedSections.has(section.id)
                      ? section.details
                      : `${section.details.substring(0, 50)}...`}
                    <button
                      className='text-blue-500 hover:text-blue-700 ml-2'
                      onClick={() => toggleDetails(section.id)}
                    >
                      {expandedSections.has(section.id) ? 'less' : 'more'}
                    </button>
                  </p>
                </td>
                <td className='px-5 py-5 text-left border-b border-gray-200 text-sm'>
                  <p>{new Date(section.startDate).toLocaleDateString()}</p>
                </td>
                <td className='px-5 py-5 text-left border-b border-gray-200 text-sm'>
                  <p>{new Date(section.endDate).toLocaleDateString()}</p>
                </td>
                <td className='px-5 py-5 text-left border-b border-gray-200 text-sm'>
                  <div className='flex ml-[20%]'>
                    <button
                      className='text-green-500 hover:text-green-700 text-center'
                      onClick={() => onView(section.id)}
                    >
                      <FaEye size={16} />
                    </button>
                  </div>
                </td>
                <td className='px-5 py-5 text-left border-b border-gray-200 text-sm'>
                  <div className='flex space-x-4'>
                    <button
                      className='text-blue-500 hover:text-blue-700'
                      onClick={() => onEdit(section)}
                    >
                      <FaEdit size={16} />
                    </button>
                    <button
                      className='text-red-500 hover:text-red-700'
                      onClick={() => onDelete(section)}
                    >
                      <FaTrash size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SectionTable;
