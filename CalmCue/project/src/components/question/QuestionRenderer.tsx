import React from 'react';
import { Question, Answer } from '../../types';
import RadioGroup from '../ui/RadioGroup';
import CheckboxGroup from '../ui/CheckboxGroup';
import ScaleQuestion from '../ui/ScaleQuestion';
import TextAreaField from '../ui/TextAreaField';

interface QuestionRendererProps {
  question: Question;
  onChange: (answer: Answer) => void;
  currentAnswer?: string | string[] | number;
}

const QuestionRenderer: React.FC<QuestionRendererProps> = ({
  question,
  onChange,
  currentAnswer,
}) => {
  switch (question.type) {
    case 'radio':
      return (
        <RadioGroup
          options={question.options || []}
          name={question.id}
          value={currentAnswer as string}
          onChange={(value) => onChange({ questionId: question.id, answer: value })}
          label={question.text}
          required={question.required}
        />
      );
      
    case 'checkbox':
      return (
        <CheckboxGroup
          options={question.options || []}
          name={question.id}
          selectedValues={currentAnswer as string[] || []}
          onChange={(values) => onChange({ questionId: question.id, answer: values })}
          label={question.text}
          required={question.required}
        />
      );
      
    case 'scale':
      return (
        <ScaleQuestion
          value={currentAnswer as number}
          onChange={(value) => onChange({ questionId: question.id, answer: value })}
          minLabel={question.minLabel}
          maxLabel={question.maxLabel}
          label={question.text}
          required={question.required}
        />
      );
      
    case 'text':
      return (
        <TextAreaField
          id={question.id}
          value={currentAnswer as string}
          onChange={(e) => onChange({ questionId: question.id, answer: e.target.value })}
          label={question.text}
          required={question.required}
          placeholder="Type your answer here..."
        />
      );
      
    default:
      return <div>Unsupported question type</div>;
  }
};

export default QuestionRenderer;