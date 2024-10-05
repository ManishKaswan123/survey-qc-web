export type statusType =
  | 'submitted'
  | 'approved'
  | 'flagged'
  | 'resubmitted'
  | 'yetToStart'
  | 'rejected'
  | 'inProgress'
export const statusColors: Record<string, string> = {
  submitted: 'text-[#265B91]', // existing color
  approved: 'text-green-500', // existing color
  flagged: 'text-red-300', // light red
  resubmitted: 'text-orange-500', // existing color
  yetToStart: 'text-gray-500', // existing color
  rejected: 'text-red-700', // dark red
  inProgress: 'text-yellow-500', // existing color
}

export const statusMap = new Map<string, string>([
  ['submitted', 'Submitted'],
  ['approved', 'Approved'],
  ['flagged', 'Flagged'],
  ['resubmitted', 'Resubmitted'],
  ['yetToStart', 'Yet to start'],
  ['rejected', 'Rejected'],
  ['inProgress', 'In Progress'],
])
export const statusObject = [
  {id: 'submitted', value: 'Submitted'},
  {id: 'approved', value: 'Approved'},
  {id: 'flagged', value: 'Flagged'},
  {id: 'resubmitted', value: 'Resubmitted'},
  {id: 'yetToStart', value: 'Yet to start'},
  {id: 'rejected', value: 'Rejected'},
  {id: 'inProgress', value: 'In Progress'},
]
export const statusValues = Array.from(statusMap.values())
export const statusKeys = Array.from(statusMap.values())
