import React from 'react';

interface AnswerChoicesProps {
  choices: string[];
  selectedAnswer: number | null;
  onSelect: (index: number) => void;
  disabled: boolean;
}

export function AnswerChoices({ choices, selectedAnswer, onSelect, disabled }: AnswerChoicesProps) {
  return (
    <div className="space-y-2">
      {choices.map((choice, index) => (
        <button
          key={index}
          onClick={() => onSelect(index)}
          className={`w-full text-left p-3 rounded ${
            selectedAnswer === index
              ? 'bg-indigo-100 border-indigo-500'
              : 'bg-gray-50 hover:bg-gray-100'
          } border transition-colors`}
          disabled={disabled}
        >
          {index + 1}. {choice}
        </button>
      ))}
    </div>
  );
}