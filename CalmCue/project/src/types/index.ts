export interface User {
  id?: string;
  email: string;
  name?: string;
}

export interface Question {
  id: string;
  text: string;
  type: 'radio' | 'checkbox' | 'scale' | 'text';
  options?: string[];
  minLabel?: string;
  maxLabel?: string;
  required?: boolean;
}

export interface Answer {
  questionId: string;
  answer: string | string[] | number;
}

export interface SupportOption {
  id: string;
  type: 'buddy' | 'counsellor' | 'psychologist' | 'meditation';
  title: string;
  description: string;
  contactName?: string;
  contactInfo?: string;
  icon: string;
}

export interface AssessmentResult {
  stressLevel: 'low' | 'moderate' | 'high' | 'severe';
  recommendedSupport: SupportOption[];
  summary: string;
}