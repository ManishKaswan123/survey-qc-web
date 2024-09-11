import React from 'react';

const ProgramTableSkeleton: React.FC = () => {
  return (
    <div className="overflow-x-auto">
      <div className="shadow rounded-lg overflow-hidden">
        <table className="min-w-full leading-normal">
          <thead>
            <tr>
              <th className="px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider">
                Program Name
              </th>
              <th className="px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider">
                Description
              </th>
              <th className="px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider">
                Details
              </th>
              <th className="px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider">
                Start Date
              </th>
              <th className="px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider">
                End Date
              </th>
              <th className="px-5 py-3 bg-gray-200 text-left text-xs font-semibold text-gray-800 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 5 }).map((_, index) => (
              <tr key={index} className="odd:bg-white even:bg-gray-50">
                <td className="px-5 py-5 text-left border-b border-gray-200 text-sm">
                  <div className="h-4 bg-gray-300 rounded w-3/4 animate-pulse"></div>
                </td>
                <td className="px-5 py-5 text-left border-b border-gray-200 text-sm">
                  <div className="h-4 bg-gray-300 rounded w-full animate-pulse"></div>
                </td>
                <td className="px-5 py-5 text-left border-b border-gray-200 text-sm">
                  <div className="h-4 bg-gray-300 rounded w-5/6 animate-pulse"></div>
                </td>
                <td className="px-5 py-5 text-left border-b border-gray-200 text-sm">
                  <div className="h-4 bg-gray-300 rounded w-2/3 animate-pulse"></div>
                </td>
                <td className="px-5 py-5 text-left border-b border-gray-200 text-sm">
                  <div className="h-4 bg-gray-300 rounded w-2/3 animate-pulse"></div>
                </td>
                <td className="px-5 py-5 text-left border-b border-gray-200 text-sm">
                  <div className="flex space-x-4">
                    <div className="h-4 w-4 bg-gray-300 rounded-full animate-pulse"></div>
                    <div className="h-4 w-4 bg-gray-300 rounded-full animate-pulse"></div>
                    <div className="h-4 w-4 bg-gray-300 rounded-full animate-pulse"></div>
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

export default ProgramTableSkeleton;