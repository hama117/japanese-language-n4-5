import React, { useState } from 'react';
import { ApiKeyInput } from './components/ApiKeyInput';
import { FileUpload } from './components/FileUpload';
import { Quiz } from './components/Quiz';
import { LanguageSelectionScreen } from './components/LanguageSelectionScreen';
import { Question, Language } from './types';
import { GraduationCap } from 'lucide-react';

function App() {
  const [apiKey, setApiKey] = useState<string | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [selectedLanguage, setSelectedLanguage] = useState<Language | null>(null);

  if (!apiKey) {
    return <ApiKeyInput onSubmit={setApiKey} />;
  }

  if (!selectedLanguage) {
    return <LanguageSelectionScreen onLanguageSelect={setSelectedLanguage} />;
  }

  if (questions.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <GraduationCap className="mx-auto h-12 w-12 text-indigo-600" />
            <h1 className="mt-4 text-3xl font-bold text-gray-900">
              JLPT Practice Quiz
            </h1>
            <p className="mt-2 text-gray-600">
              Upload your CSV file with JLPT questions to begin
            </p>
          </div>
          <FileUpload onQuestionsLoaded={setQuestions} />
        </div>
      </div>
    );
  }

  return <Quiz questions={questions} apiKey={apiKey} initialLanguage={selectedLanguage} />;
}

export default App;