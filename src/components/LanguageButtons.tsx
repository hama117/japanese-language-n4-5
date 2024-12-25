import React from 'react';
import { Language } from '../types';

const languages = [
  { code: 'ja', name: '日本語', flag: '🇯🇵' },
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'zh', name: '中文', flag: '🇨🇳' },
  { code: 'vi', name: 'Tiếng Việt', flag: '🇻🇳' },
  { code: 'id', name: 'Bahasa Indonesia', flag: '🇮🇩' },
  { code: 'th', name: 'ภาษาไทย', flag: '🇹🇭' }
] as const;

interface LanguageButtonsProps {
  selectedLanguage: Language;
  onLanguageChange: (language: Language) => void;
}

export function LanguageButtons({ selectedLanguage, onLanguageChange }: LanguageButtonsProps) {
  return (
    <div className="mb-6 flex justify-end gap-2">
      {languages.map(({ code, flag, name }) => (
        <button
          key={code}
          onClick={() => onLanguageChange(code as Language)}
          className={`p-2 rounded-md transition-colors ${
            selectedLanguage === code
              ? 'bg-indigo-100 text-indigo-700'
              : 'hover:bg-gray-100'
          }`}
          title={name}
        >
          <span className="text-xl" role="img" aria-label={`${code} flag`}>
            {flag}
          </span>
        </button>
      ))}
    </div>
  );
}