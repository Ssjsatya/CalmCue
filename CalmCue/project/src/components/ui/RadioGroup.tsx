import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface RadioOption {
  value: string;
  label: string;
}

interface RadioGroupProps {
  options: RadioOption[] | string[];
  name: string;
  value?: string;
  onChange: (value: string) => void;
  label?: string;
  required?: boolean;
}

const RadioGroup: React.FC<RadioGroupProps> = ({
  options,
  name,
  value,
  onChange,
  label,
  required = false,
}) => {
  const formattedOptions: RadioOption[] = options.map(option => {
    if (typeof option === 'string') {
      return { value: option, label: option };
    }
    return option;
  });

  return (
    <div className="w-full space-y-2">
      {label && (
        <div className="flex items-center">
          <label className="text-sm font-medium text-neutral-700">
            {label}
            {required && <span className="ml-1 text-error-500">*</span>}
          </label>
        </div>
      )}
      
      <div className="space-y-2">
        {formattedOptions.map((option) => (
          <motion.div
            key={option.value}
            whileTap={{ scale: 0.98 }}
            className={`
              relative flex items-center px-4 py-3 rounded-lg cursor-pointer
              transition-colors duration-200 ease-in-out
              ${
                value === option.value
                  ? 'bg-primary-100 border-2 border-primary-400'
                  : 'bg-white border border-neutral-300 hover:bg-neutral-50'
              }
            `}
            onClick={() => onChange(option.value)}
          >
            <input
              type="radio"
              id={`${name}-${option.value}`}
              name={name}
              value={option.value}
              checked={value === option.value}
              onChange={() => onChange(option.value)}
              className="sr-only"
            />
            
            <div className={`
              h-5 w-5 rounded-full border
              flex items-center justify-center
              transition-colors
              ${value === option.value 
                ? 'border-primary-500 bg-white' 
                : 'border-neutral-400 bg-white'}
            `}>
              {value === option.value && (
                <div className="w-3 h-3 rounded-full bg-primary-500"></div>
              )}
            </div>
            
            <label
              htmlFor={`${name}-${option.value}`}
              className="ml-3 block text-sm font-medium text-neutral-800 cursor-pointer"
            >
              {option.label}
            </label>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default RadioGroup;