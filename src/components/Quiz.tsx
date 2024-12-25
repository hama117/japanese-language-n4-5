import React, { useState } from 'react';
import { Question, Language } from '../types';
import { getExplanation } from '../utils/openai';
import { LanguageButtons } from './LanguageButtons';
import { AnswerChoices } from './AnswerChoices';
import { TypewriterText } from './TypewriterText';

interface QuizProps {
  questions: Question[];
  apiKey: string;
  initialLanguage: Language;
}

export function Quiz({ questions, apiKey, initialLanguage }: QuizProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [explanation, setExplanation] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState<Language>(initialLanguage);
  const [isChecking, setIsChecking] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];

  const handleAnswerSelect = (index: number) => {
    if (isChecking || explanation) return;
    setSelectedAnswer(index);
  };

  const handleCheck = async () => {
    if (selectedAnswer === null || isChecking) return;
    setIsChecking(true);

    try {
      const explanation = await getExplanation(
        apiKey,
        currentQuestion,
        selectedAnswer,
        selectedLanguage
      );
      setExplanation(explanation);
    } catch (error) {
      console.error('Error getting explanation:', error);
      setExplanation('説明の取得中にエラーが発生しました。もう一度お試しください。');
    } finally {
      setIsChecking(false);
    }
  };

  const handleNext = () => {
    const nextIndex = Math.floor(Math.random() * questions.length);
    setCurrentQuestionIndex(nextIndex);
    setSelectedAnswer(null);
    setExplanation('');
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <LanguageButtons
        selectedLanguage={selectedLanguage}
        onLanguageChange={setSelectedLanguage}
      />
      
      <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
        <h2 className="text-xl font-bold text-gray-700 mb-4">{currentQuestion.type}</h2>
        
        <div className="p-4 bg-indigo-50 rounded-lg mb-4">
          {currentQuestion.question}
        </div>
        
        <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm mb-6">
          {currentQuestion.context}
        </div>

        <AnswerChoices
          choices={currentQuestion.choices}
          selectedAnswer={selectedAnswer}
          onSelect={handleAnswerSelect}
          disabled={!!explanation}
        />

        {selectedAnswer !== null && !explanation && (
          <button
            onClick={handleCheck}
            disabled={isChecking}
            className="w-full mt-6 bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors disabled:opacity-50"
          >
            {isChecking ? '確認中...' : '回答を確認'}
          </button>
        )}

        {explanation && (
          <div className="mt-6">
            <div className="p-4 bg-gray-50 rounded-md">
              <TypewriterText text={explanation} speed={10} />
            </div>
            <button
              onClick={handleNext}
              className="mt-4 w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors"
            >
              次の問題へ
            </button>
          </div>
        )}
      </div>
    </div>
  );
}