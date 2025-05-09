import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

interface CheckboxOption {
  value: string;
  label: string;
}

interface CheckboxGroupProps {
  options: CheckboxOption[] | string[];
  name: string;
  selectedValues: string[];
  onChange: (values: string[]) => void;
  label?: string;
  required?: boolean;
}

const CheckboxGroup: React.FC<CheckboxGroupProps> = ({
  options,
  name,
  selectedValues,
  onChange,
  label,
  required = false,
}) => {
  const formattedOptions: CheckboxOption[] = options.map(option => {
    if (typeof option === 'string') {
      return { value: option, label: option };
    }
    return option;
  });

  const handleChange = (value: string) => {
    if (selectedValues.includes(value)) {
      onChange(selectedValues.filter(v => v !== value));
    } else {
      onChange([...selectedValues, value]);
    }
  };

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
                selectedValues.includes(option.value)
                  ? 'bg-primary-100 border-2 border-primary-400'
                  : 'bg-white border border-neutral-300 hover:bg-neutral-50'
              }
            `}
            onClick={() => handleChange(option.value)}
          >
            <input
              type="checkbox"
              id={`${name}-${option.value}`}
              name={name}
              value={option.value}
              checked={selectedValues.includes(option.value)}
              onChange={() => handleChange(option.value)}
              className="sr-only"
            />
            
            <div className={`
              h-5 w-5 rounded-md border
              flex items-center justify-center
              transition-colors
              ${selectedValues.includes(option.value)
                ? 'border-primary-500 bg-primary-500' 
                : 'border-neutral-400 bg-white'}
            `}>
              {selectedValues.includes(option.value) && (
                <Check className="h-3.5 w-3.5 text-white" />
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

export default CheckboxGroup;