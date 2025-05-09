import React, { createContext, useState, useContext, ReactNode } from 'react';
import { Answer, AssessmentResult } from '../types';
import { analyzeResponses } from '../utils/assessment';

interface AssessmentContextType {
  answers: Answer[];
  setAnswer: (answer: Answer) => void;
  resetAnswers: () => void;
  submittedAnswers: boolean;
  submitAnswers: () => AssessmentResult;
  result: AssessmentResult | null;
}

const AssessmentContext = createContext<AssessmentContextType | undefined>(undefined);

export const useAssessment = () => {
  const context = useContext(AssessmentContext);
  if (context === undefined) {
    throw new Error('useAssessment must be used within an AssessmentProvider');
  }
  return context;
};

export const AssessmentProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [submittedAnswers, setSubmittedAnswers] = useState(false);
  const [result, setResult] = useState<AssessmentResult | null>(null);

  const setAnswer = (answer: Answer) => {
    setAnswers(prev => {
      const existingIndex = prev.findIndex(a => a.questionId === answer.questionId);
      if (existingIndex >= 0) {
        const updated = [...prev];
        updated[existingIndex] = answer;
        return updated;
      } else {
        return [...prev, answer];
      }
    });
  };

  const resetAnswers = () => {
    setAnswers([]);
    setSubmittedAnswers(false);
    setResult(null);
  };

  const submitAnswers = (): AssessmentResult => {
    setSubmittedAnswers(true);
    const assessmentResult = analyzeResponses(answers);
    setResult(assessmentResult);
    return assessmentResult;
  };

  const value = {
    answers,
    setAnswer,
    resetAnswers,
    submittedAnswers,
    submitAnswers,
    result,
  };

  return <AssessmentContext.Provider value={value}>{children}</AssessmentContext.Provider>;
};