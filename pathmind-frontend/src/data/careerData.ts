import { CareerRecommendation, CareerRoadmap } from '../types';

export const careerRecommendations: CareerRecommendation[] = [
  {
    id: '1',
    title: 'Software Engineer',
    description: 'Design, develop, and maintain software applications and systems using various programming languages and technologies.',
    matchPercentage: 95,
    averageSalary: '$85,000 - $150,000',
    growthRate: '22% (Much faster than average)',
    requiredSkills: ['Programming', 'Problem Solving', 'System Design', 'Testing', 'Version Control'],
    educationLevel: "Bachelor's degree in Computer Science or related field",
    workEnvironment: 'Office or remote, collaborative team environment',
    jobOutlook: 'Excellent - High demand across all industries'
  },
  {
    id: '2',
    title: 'UX/UI Designer',
    description: 'Create intuitive and visually appealing user interfaces and experiences for digital products and applications.',
    matchPercentage: 88,
    averageSalary: '$70,000 - $120,000',
    growthRate: '13% (Faster than average)',
    requiredSkills: ['Design Thinking', 'Prototyping', 'User Research', 'Visual Design', 'Collaboration'],
    educationLevel: "Bachelor's degree in Design, HCI, or related field",
    workEnvironment: 'Creative studios, tech companies, or freelance',
    jobOutlook: 'Very Good - Growing demand for digital experiences'
  },
  {
    id: '3',
    title: 'Data Scientist',
    description: 'Analyze complex data sets to extract insights and build predictive models that drive business decisions.',
    matchPercentage: 82,
    averageSalary: '$95,000 - $165,000',
    growthRate: '35% (Much faster than average)',
    requiredSkills: ['Statistics', 'Machine Learning', 'Programming', 'Data Visualization', 'Critical Thinking'],
    educationLevel: "Master's degree in Data Science, Statistics, or related field",
    workEnvironment: 'Corporate offices, research institutions, or remote',
    jobOutlook: 'Excellent - One of the fastest-growing fields'
  },
  {
    id: '4',
    title: 'Product Manager',
    description: 'Guide the development and strategy of products from conception to launch, working with cross-functional teams.',
    matchPercentage: 78,
    averageSalary: '$90,000 - $160,000',
    growthRate: '19% (Much faster than average)',
    requiredSkills: ['Strategic Thinking', 'Communication', 'Market Analysis', 'Project Management', 'Leadership'],
    educationLevel: "Bachelor's degree in Business, Engineering, or related field",
    workEnvironment: 'Tech companies, startups, or corporate product teams',
    jobOutlook: 'Very Good - Essential role in product-driven companies'
  },
  {
    id: '5',
    title: 'Digital Marketing Specialist',
    description: 'Develop and execute online marketing campaigns to promote brands, products, and services across digital channels.',
    matchPercentage: 75,
    averageSalary: '$50,000 - $85,000',
    growthRate: '10% (Faster than average)',
    requiredSkills: ['Content Creation', 'Analytics', 'SEO/SEM', 'Social Media', 'Campaign Management'],
    educationLevel: "Bachelor's degree in Marketing, Communications, or related field",
    workEnvironment: 'Marketing agencies, corporate marketing teams, or freelance',
    jobOutlook: 'Good - Digital transformation driving demand'
  },
  {
    id: '6',
    title: 'Cybersecurity Analyst',
    description: 'Protect organizations from cyber threats by monitoring, detecting, and responding to security incidents.',
    matchPercentage: 85,
    averageSalary: '$80,000 - $140,000',
    growthRate: '33% (Much faster than average)',
    requiredSkills: ['Network Security', 'Incident Response', 'Risk Assessment', 'Ethical Hacking', 'Compliance'],
    educationLevel: "Bachelor's degree in Cybersecurity, IT, or related field",
    workEnvironment: 'Corporate IT departments, security firms, or government agencies',
    jobOutlook: 'Excellent - Critical need for security professionals'
  }
];

export const careerRoadmaps: CareerRoadmap[] = [
  {
    id: '1',
    careerTitle: 'Software Engineer',
    totalDuration: '12-18 months',
    steps: [
      {
        id: '1-1',
        title: 'Learn Programming Fundamentals',
        description: 'Master the basics of programming with languages like Python, JavaScript, or Java.',
        timeframe: '2-3 months',
        completed: false,
        resources: [
          {
            id: 'r1',
            title: 'Python for Everybody Specialization',
            type: 'course',
            provider: 'Coursera',
            duration: '8 weeks',
            level: 'beginner',
            url: '#'
          },
          {
            id: 'r2',
            title: 'JavaScript: The Complete Guide',
            type: 'course',
            provider: 'Udemy',
            duration: '52 hours',
            level: 'beginner',
            url: '#'
          }
        ]
      },
      {
        id: '1-2',
        title: 'Build Projects and Portfolio',
        description: 'Create 3-5 projects showcasing different skills and technologies.',
        timeframe: '3-4 months',
        completed: false,
        resources: [
          {
            id: 'r3',
            title: 'GitHub Portfolio Guide',
            type: 'video',
            provider: 'YouTube',
            duration: '2 hours',
            level: 'intermediate',
            url: '#'
          }
        ]
      },
      {
        id: '1-3',
        title: 'Learn Frameworks and Tools',
        description: 'Master popular frameworks like React, Node.js, and development tools.',
        timeframe: '3-4 months',
        completed: false,
        resources: [
          {
            id: 'r4',
            title: 'React Developer Certification',
            type: 'certification',
            provider: 'Meta',
            duration: '6 months',
            level: 'intermediate',
            url: '#'
          }
        ]
      },
      {
        id: '1-4',
        title: 'Apply for Jobs and Interview Prep',
        description: 'Practice coding interviews and apply to entry-level positions.',
        timeframe: '2-3 months',
        completed: false,
        resources: [
          {
            id: 'r5',
            title: 'Cracking the Coding Interview',
            type: 'book',
            provider: 'CareerCup',
            duration: '300 pages',
            level: 'intermediate',
            url: '#'
          }
        ]
      }
    ]
  }
];