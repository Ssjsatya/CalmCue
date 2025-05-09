import React, { TextareaHTMLAttributes, forwardRef } from 'react';

interface TextAreaFieldProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

const TextAreaField = forwardRef<HTMLTextAreaElement, TextAreaFieldProps>(
  ({ label, error, className = '', ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label 
            htmlFor={props.id} 
            className="block text-sm font-medium text-neutral-700 mb-1"
          >
            {label}
            {props.required && <span className="ml-1 text-error-500">*</span>}
          </label>
        )}
        
        <textarea
          ref={ref}
          className={`
            w-full rounded-lg border px-4 py-2
            focus:border-primary-500 focus:ring-primary-500
            ${error ? 'border-error-500' : 'border-neutral-300'}
            transition-colors min-h-[120px] resize-vertical
            ${className}
          `}
          {...props}
        />
        
        {error && (
          <p className="mt-1 text-sm text-error-600">{error}</p>
        )}
      </div>
    );
  }
);

TextAreaField.displayName = 'TextAreaField';

export default TextAreaField;