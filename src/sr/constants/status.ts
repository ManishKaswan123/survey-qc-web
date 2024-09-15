export type statusType =
  | 'submitted'
  | 'approved'
  | 'flagged'
  | 'resubmitted'
  | 'yetToStart'
  | 'rejected'
export const statusColors: Record<string, string> = {
  submitted: 'text-[#265B91]',
  approved: 'text-green-500',
  flagged: 'text-red-500',
  resubmitted: 'text-orange-500',
  yetToStart: 'text-gray-500',
  rejected: 'text-purple-500',
}
export const statusMap = new Map<statusType, string>([
  ['submitted', 'Submitted'],
  ['approved', 'Approved'],
  ['flagged', 'Flagged'],
  ['resubmitted', 'Resubmitted'],
  ['yetToStart', 'Yet to start'],
  ['rejected', 'Rejected'],
])
export const statusObject = [
  {id: 'submitted', value: 'Submitted'},
  {id: 'approved', value: 'Approved'},
  {id: 'flagged', value: 'Flagged'},
  {id: 'resubmitted', value: 'Resubmitted'},
  {id: 'yetToStart', value: 'Yet to start'},
  {id: 'rejected', value: 'Rejected'},
]
export const statusValues = Array.from(statusMap.values())
export const statusKeys = Array.from(statusMap.values())
