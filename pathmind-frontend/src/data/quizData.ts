import { QuizQuestion } from '../types';

export const quizQuestions: QuizQuestion[] = [
  // Interests
  {
    id: '1',
    question: 'Which activities do you find most engaging?',
    type: 'multiple-choice',
    category: 'interests',
    options: [
      'Solving complex problems and puzzles',
      'Creating art, designs, or content',
      'Helping and mentoring others',
      'Analyzing data and finding patterns',
      'Building and fixing things'
    ]
  },
  {
    id: '2',
    question: 'What type of work environment excites you most?',
    type: 'multiple-choice',
    category: 'interests',
    options: [
      'Fast-paced startup with cutting-edge technology',
      'Creative studio with artistic freedom',
      'Healthcare facility helping patients',
      'Corporate office with structured processes',
      'Outdoor fieldwork with hands-on activities'
    ]
  },
  {
    id: '3',
    question: 'Which subjects did you enjoy most in school?',
    type: 'multiple-choice',
    category: 'interests',
    options: [
      'Mathematics and Computer Science',
      'Art, Literature, and Creative Writing',
      'Psychology and Social Sciences',
      'Business and Economics',
      'Science and Engineering'
    ]
  },

  // Skills
  {
    id: '4',
    question: 'Rate your problem-solving abilities (1-10)',
    type: 'scale',
    category: 'skills'
  },
  {
    id: '5',
    question: 'Rate your communication skills (1-10)',
    type: 'scale',
    category: 'skills'
  },
  {
    id: '6',
    question: 'Rate your creativity and innovation (1-10)',
    type: 'scale',
    category: 'skills'
  },
  {
    id: '7',
    question: 'Rate your leadership abilities (1-10)',
    type: 'scale',
    category: 'skills'
  },

  // Personality
  {
    id: '8',
    question: 'How do you prefer to work?',
    type: 'multiple-choice',
    category: 'personality',
    options: [
      'Independently with minimal supervision',
      'In small, close-knit teams',
      'In large, collaborative groups',
      'With direct mentorship and guidance',
      'Alternating between solo and team work'
    ]
  },
  {
    id: '9',
    question: 'How do you handle stress and pressure?',
    type: 'multiple-choice',
    category: 'personality',
    options: [
      'I thrive under pressure and tight deadlines',
      'I prefer steady, predictable workloads',
      'I work best with moderate challenges',
      'I need time to process and plan carefully',
      'I adapt quickly to changing situations'
    ]
  },
  {
    id: '10',
    question: 'What motivates you most in work?',
    type: 'multiple-choice',
    category: 'personality',
    options: [
      'Financial success and stability',
      'Creative expression and innovation',
      'Making a positive impact on others',
      'Recognition and professional growth',
      'Work-life balance and flexibility'
    ]
  },

  // Values
  {
    id: '11',
    question: 'Which work value is most important to you?',
    type: 'multiple-choice',
    category: 'values',
    options: [
      'Job security and stability',
      'High earning potential',
      'Meaningful work that helps society',
      'Opportunities for advancement',
      'Flexible schedule and remote work'
    ]
  },
  {
    id: '12',
    question: 'How important is work-life balance to you? (1-10)',
    type: 'scale',
    category: 'values'
  }
];