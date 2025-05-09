import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import Layout from '../components/Layout';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { questions } from '../data/questions';
import { useAssessment } from '../contexts/AssessmentContext';
import QuestionRenderer from '../components/question/QuestionRenderer';

const AssessmentPage: React.FC = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const { answers, setAnswer, submitAnswers } = useAssessment();
  const navigate = useNavigate();
  
  const currentQuestion = questions[currentQuestionIndex];
  const totalQuestions = questions.length;
  const progress = ((currentQuestionIndex + 1) / totalQuestions) * 100;
  
  const currentAnswer = answers.find(a => a.questionId === currentQuestion.id)?.answer;
  
  const isFirstQuestion = currentQuestionIndex === 0;
  const isLastQuestion = currentQuestionIndex === questions.length - 1;
  
  const handleNextQuestion = () => {
    if (isLastQuestion) {
      submitAnswers();
      navigate('/results');
      return;
    }
    
    setCurrentQuestionIndex(prevIndex => prevIndex + 1);
  };
  
  const handlePreviousQuestion = () => {
    setCurrentQuestionIndex(prevIndex => Math.max(0, prevIndex - 1));
  };
  
  const canProceed = () => {
    if (!currentQuestion.required) return true;
    
    if (currentAnswer === undefined) return false;
    
    if (Array.isArray(currentAnswer) && currentAnswer.length === 0) return false;
    
    if (typeof currentAnswer === 'string' && currentAnswer.trim() === '') return false;
    
    return true;
  };

  const questionVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, x: -20, transition: { duration: 0.3 } },
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <Card className="mb-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-neutral-800">Stress Assessment</h2>
            <span className="text-sm text-neutral-500">
              Question {currentQuestionIndex + 1} of {totalQuestions}
            </span>
          </div>
          
          <div className="w-full bg-neutral-200 rounded-full h-2 mb-8">
            <motion.div
              className="bg-primary-600 h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
          
          <motion.div
            key={currentQuestion.id}
            variants={questionVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="mb-8"
          >
            <QuestionRenderer
              question={currentQuestion}
              onChange={setAnswer}
              currentAnswer={currentAnswer}
            />
          </motion.div>
          
          <div className="flex justify-between">
            <Button
              variant="outline"
              onClick={handlePreviousQuestion}
              disabled={isFirstQuestion}
              icon={<ArrowLeft size={16} />}
              iconPosition="left"
            >
              Previous
            </Button>
            
            <Button
              onClick={handleNextQuestion}
              disabled={!canProceed()}
              icon={<ArrowRight size={16} />}
              iconPosition="right"
            >
              {isLastQuestion ? 'Submit' : 'Next'}
            </Button>
          </div>
        </Card>
        
        <div className="bg-secondary-50 rounded-lg p-4 border border-secondary-100">
          <p className="text-sm text-secondary-800">
            <strong>Note:</strong> Your responses will be used to provide personalized 
            recommendations for stress management. All information is kept confidential.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default AssessmentPage;