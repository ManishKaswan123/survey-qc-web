import {FieldsArray} from 'sr/constants/fields'

export const programColumns = [
  'Program Name',
  'Description',
  'Start Date',
  'Status',
  'Actions',
  'View Sections',
]
export const programCreateUpdateFields: FieldsArray = [
  {
    type: 'text',
    label: 'Name',
    name: 'name',
    placeholder: 'Program Name',
    required: true,
  },
  {
    type: 'text',
    label: 'Description',
    name: 'description',
    placeholder: 'Description',
  },
  {
    type: 'datetime-local',
    label: 'Start Date',
    name: 'startDate',
    placeholder: 'Start Date',
    required: true,
  },
]
