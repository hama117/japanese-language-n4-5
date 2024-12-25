import React from 'react';
import { Languages } from 'lucide-react';
import { Language } from '../types';

interface LanguageSelectionScreenProps {
  onLanguageSelect: (language: Language) => void;
}

const languages = [
  { code: 'ja', name: '日本語', flag: '🇯🇵' },
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'zh', name: '中文', flag: '🇨🇳' },
  { code: 'vi', name: 'Tiếng Việt', flag: '🇻🇳' },
  { code: 'id', name: 'Bahasa Indonesia', flag: '🇮🇩' },
  { code: 'th', name: 'ภาษาไทย', flag: '🇹🇭' }
] as const;

export function LanguageSelectionScreen({ onLanguageSelect }: LanguageSelectionScreenProps) {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto text-center">
        <Languages className="mx-auto h-12 w-12 text-indigo-600" />
        <h1 className="mt-6 text-3xl font-bold text-gray-900">
          JLPT Practice Quiz
        </h1>
        <p className="mt-2 text-gray-600">
          解説を表示する言語を選択してください
        </p>
        <p className="text-sm text-gray-500 mb-8">
          Select the language for explanations
        </p>
        
        <div className="grid grid-cols-2 gap-4">
          {languages.map(({ code, name, flag }) => (
            <button
              key={code}
              onClick={() => onLanguageSelect(code as Language)}
              className="flex items-center justify-center gap-2 p-4 bg-white rounded-lg shadow-sm border border-gray-200 hover:bg-gray-50 transition-colors"
            >
              <span className="text-2xl" role="img" aria-label={`${name} flag`}>
                {flag}
              </span>
              <span className="font-medium">{name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}