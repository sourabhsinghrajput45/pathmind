export interface QuizQuestion {
  id: string;
  question: string;
  type: 'multiple-choice' | 'scale' | 'text';
  options?: string[];
  category: 'interests' | 'skills' | 'personality' | 'values';
}

export interface QuizAnswer {
  questionId: string;
  answer: string | number;
}

export interface CareerRecommendation {
  id: string;
  title: string;
  description: string;
  matchPercentage: number;
  averageSalary: string;
  growthRate: string;
  requiredSkills: string[];
  educationLevel: string;
  workEnvironment: string;
  jobOutlook: string;
}

export interface LearningResource {
  id: string;
  title: string;
  type: 'course' | 'certification' | 'book' | 'video';
  provider: string;
  duration: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  url: string;
}

export interface RoadmapStep {
  id: string;
  title: string;
  description: string;
  timeframe: string;
  resources: LearningResource[];
  completed: boolean;
}

export interface CareerRoadmap {
  id: string;
  careerTitle: string;
  totalDuration: string;
  steps: RoadmapStep[];
}