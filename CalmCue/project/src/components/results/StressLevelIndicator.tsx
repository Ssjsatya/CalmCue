import React from 'react';
import { motion } from 'framer-motion';

interface StressLevelIndicatorProps {
  level: 'low' | 'moderate' | 'high' | 'severe';
}

const StressLevelIndicator: React.FC<StressLevelIndicatorProps> = ({ level }) => {
  const levels = ['low', 'moderate', 'high', 'severe'];
  const currentIndex = levels.indexOf(level);
  
  const getColorForLevel = (lvl: string) => {
    switch (lvl) {
      case 'low':
        return 'bg-success-500';
      case 'moderate':
        return 'bg-warning-500';
      case 'high':
        return 'bg-warning-600';
      case 'severe':
        return 'bg-error-600';
      default:
        return 'bg-neutral-300';
    }
  };
  
  const getTextForLevel = (lvl: string) => {
    switch (lvl) {
      case 'low':
        return 'text-success-700';
      case 'moderate':
        return 'text-warning-700';
      case 'high':
        return 'text-warning-800';
      case 'severe':
        return 'text-error-700';
      default:
        return 'text-neutral-700';
    }
  };
  
  return (
    <div className="w-full">
      <div className="mb-2 flex justify-between">
        <p className="text-sm font-medium text-neutral-600">Your Stress Level:</p>
        <p className={`text-sm font-semibold capitalize ${getTextForLevel(level)}`}>{level}</p>
      </div>
      
      <div className="w-full h-3 bg-neutral-200 rounded-full overflow-hidden flex">
        {levels.map((lvl, idx) => (
          <div
            key={lvl}
            className={`h-full ${getColorForLevel(lvl)} ${idx === 0 ? 'rounded-l-full' : ''} ${
              idx === levels.length - 1 ? 'rounded-r-full' : ''
            } flex-1`}
          >
            {idx <= currentIndex && (
              <motion.div
                className="h-full w-full"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.5, delay: idx * 0.2 }}
              />
            )}
          </div>
        ))}
      </div>
      
      <div className="mt-1 flex justify-between text-xs text-neutral-500">
        <span>Low</span>
        <span>Moderate</span>
        <span>High</span>
        <span>Severe</span>
      </div>
    </div>
  );
};

export default StressLevelIndicator;