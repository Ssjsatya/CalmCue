import React from 'react';

interface ScaleQuestionProps {
  min?: number;
  max?: number;
  value?: number;
  onChange: (value: number) => void;
  minLabel?: string;
  maxLabel?: string;
  label?: string;
  required?: boolean;
}

const ScaleQuestion: React.FC<ScaleQuestionProps> = ({
  min = 0,
  max = 10,
  value,
  onChange,
  minLabel = 'Low',
  maxLabel = 'High',
  label,
  required = false,
}) => {
  const points = Array.from({ length: max - min + 1 }, (_, i) => i + min);

  return (
    <div className="w-full space-y-3">
      {label && (
        <div className="flex items-center">
          <label className="text-sm font-medium text-neutral-700">
            {label}
            {required && <span className="ml-1 text-error-500">*</span>}
          </label>
        </div>
      )}
      
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-neutral-600">{minLabel}</span>
          <span className="text-sm text-neutral-600">{maxLabel}</span>
        </div>
        
        <div className="flex justify-between items-center">
          {points.map(point => (
            <button
              key={point}
              type="button"
              className={`
                w-8 h-8 rounded-full flex items-center justify-center
                transition-all duration-150 ease-in-out
                ${value === point 
                  ? 'bg-primary-600 text-white scale-110 shadow-md' 
                  : 'bg-neutral-100 text-neutral-800 hover:bg-neutral-200'}
              `}
              onClick={() => onChange(point)}
            >
              {point}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ScaleQuestion;