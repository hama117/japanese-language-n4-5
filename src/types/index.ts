export interface Question {
  type: string;
  question: string;
  context: string;
  choices: string[];
  correctAnswer: number;
}

export type Language = 'ja' | 'en' | 'zh' | 'vi' | 'id' | 'th';

export interface QuizState {
  questions: Question[];
  currentQuestionIndex: number;
  selectedAnswer: number | null;
  isCorrect: boolean | null;
  explanation: string;
  selectedLanguage: Language;
}