import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { RefreshCw } from 'lucide-react';
import Layout from '../components/Layout';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { useAssessment } from '../contexts/AssessmentContext';
import StressLevelIndicator from '../components/results/StressLevelIndicator';
import SupportCard from '../components/results/SupportCard';

const ResultsPage: React.FC = () => {
  const { result, resetAnswers } = useAssessment();
  const navigate = useNavigate();
  
  if (!result) {
    navigate('/assessment');
    return null;
  }

  const { stressLevel, recommendedSupport, summary } = result;
  
  const handleStartOver = () => {
    resetAnswers();
    navigate('/assessment');
  };
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-neutral-800 mb-3">Your Assessment Results</h1>
            <p className="text-neutral-600 max-w-2xl mx-auto">
              Based on your responses, we've prepared personalized recommendations 
              to help you manage stress effectively.
            </p>
          </div>
          
          <Card className="mb-8">
            <h2 className="text-xl font-semibold text-neutral-800 mb-4">Stress Level Analysis</h2>
            
            <StressLevelIndicator level={stressLevel} />
            
            <p className="mt-6 text-neutral-700">
              {summary}
            </p>
          </Card>
          
          <h2 className="text-xl font-semibold text-neutral-800 mb-4">Recommended Support Options</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {recommendedSupport.map((option, index) => (
              <SupportCard 
                key={option.id} 
                supportOption={option} 
                priority={index}
              />
            ))}
          </div>
          
          <div className="bg-primary-50 rounded-lg p-6 border border-primary-100 mb-8">
            <h3 className="text-lg font-semibold text-primary-800 mb-2">
              What's Next?
            </h3>
            <p className="text-primary-700 mb-4">
              We recommend reaching out to the suggested support options based on your needs.
              Remember that seeking help is a sign of strength, not weakness.
            </p>
            <p className="text-primary-700">
              You can retake the assessment anytime to track changes in your stress levels.
            </p>
          </div>
          
          <div className="flex justify-center">
            <Button 
              onClick={handleStartOver}
              icon={<RefreshCw size={18} />}
              iconPosition="left"
            >
              Take Assessment Again
            </Button>
          </div>
        </motion.div>
      </div>
    </Layout>
  );
};

export default ResultsPage;