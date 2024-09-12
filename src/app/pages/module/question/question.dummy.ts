import {Question} from './question.interface'

// Helper function to generate a random UUID (or use any other method for unique IDs)
const generateId = () => 'id-' + Math.random().toString(36).substr(2, 9)

export const dummyQuestions: Question[] = [
  {
    questionNumber: 1,
    questionName: 'What is your preferred contact method?',
    questionType: 'radio',
    validation: 'Required',
    isMandatory: true,
    answerType: 'single',
    options: [
      {value: 'email', label: 'Email'},
      {value: 'phone', label: 'Phone'},
      {value: 'mail', label: 'Mail'},
    ],
    id: generateId(),
  },
  {
    questionNumber: 2,
    questionName: 'How do you prefer to receive notifications?',
    questionType: 'checkbox',
    validation: 'Optional',
    isMandatory: true,
    dependentOnQuestion: '1', // Optional, can be removed if not applicable
    dependentOnOption: 'email', // Optional, can be removed if not applicable
    answerType: 'multiple',
    options: [
      {value: 'sms', label: 'SMS'},
      {value: 'email', label: 'Email'},
      {value: 'push', label: 'Push Notifications'},
    ],
    id: generateId(),
  },
  {
    questionNumber: 3,
    questionName: 'What is your preferred method of payment?',
    questionType: 'radio',
    validation: 'Required',
    isMandatory: true,
    answerType: 'single',
    options: [
      {value: 'credit', label: 'Credit Card'},
      {value: 'debit', label: 'Debit Card'},
      {value: 'paypal', label: 'PayPal'},
    ],
    id: generateId(),
  },
  {
    questionNumber: 4,
    questionName: 'Which areas are you interested in?',
    questionType: 'checkbox',
    validation: 'Required',
    isMandatory: true,
    answerType: 'multiple',
    options: [
      {value: 'tech', label: 'Technology'},
      {value: 'health', label: 'Health'},
      {value: 'finance', label: 'Finance'},
    ],
    id: generateId(),
  },
  {
    questionNumber: 5,
    questionName: 'Select your preferred working hours:',
    questionType: 'radio',
    validation: 'Optional',
    isMandatory: false,
    answerType: 'single',
    options: [
      {value: 'morning', label: 'Morning'},
      {value: 'afternoon', label: 'Afternoon'},
      {value: 'evening', label: 'Evening'},
    ],
    id: generateId(),
  },
  {
    questionNumber: 6,
    questionName: 'What features are important to you?',
    questionType: 'checkbox',
    validation: 'Optional',
    isMandatory: true,
    answerType: 'multiple',
    dependentOnQuestion: '1', // Optional, can be removed if not applicable
    dependentOnOption: 'phone', // Optional, can be removed if not applicable
    options: [
      {value: 'speed', label: 'Speed'},
      {value: 'reliability', label: 'Reliability'},
      {value: 'design', label: 'Design'},
    ],
    id: generateId(),
  },
  {
    questionNumber: 7,
    questionName: 'How often do you use our services?',
    questionType: 'checkbox',
    validation: 'Required',
    isMandatory: true,
    answerType: 'multiple',
    options: [
      {value: 'daily', label: 'Daily'},
      {value: 'weekly', label: 'Weekly'},
      {value: 'monthly', label: 'Monthly'},
    ],
    id: generateId(),
  },
  {
    questionNumber: 8,
    questionName: 'What is your preferred mode of communication?',
    questionType: 'radio',
    validation: 'Required',
    isMandatory: true,
    answerType: 'single',
    options: [
      {value: 'email', label: 'Email'},
      {value: 'phone', label: 'Phone'},
      {value: 'chat', label: 'Chat'},
    ],
    id: generateId(),
  },
  {
    questionNumber: 9,
    questionName: 'Which topics interest you the most?',
    questionType: 'checkbox',
    validation: 'Optional',
    isMandatory: false,
    answerType: 'multiple',
    options: [
      {value: 'sports', label: 'Sports'},
      {value: 'music', label: 'Music'},
      {value: 'movies', label: 'Movies'},
    ],
    id: generateId(),
  },
  {
    questionNumber: 10,
    questionName: 'What kind of support do you need?',
    questionType: 'radio',
    validation: 'Required',
    isMandatory: true,
    answerType: 'single',
    options: [
      {value: 'technical', label: 'Technical Support'},
      {value: 'billing', label: 'Billing Support'},
      {value: 'general', label: 'General Inquiries'},
    ],
    id: generateId(),
  },
]
