import { Question, Language } from '../types';

interface PromptParams {
  question: Question;
  selectedAnswer: number;
  isCorrect: boolean;
}

const baseInstructions: Record<Language, string> = {
  ja: `あなたは日本語教師です。以下のJLPT問題について日本語で説明してください。`,
  en: `You are a Japanese language teacher. Please explain the following JLPT question in English.`,
  zh: `您是一位日语教师。请用中文解释以下JLPT问题。`,
  vi: `Bạn là giáo viên tiếng Nhật. Hãy giải thích câu hỏi JLPT sau bằng tiếng Việt.`,
  id: `Anda adalah guru bahasa Jepang. Tolong jelaskan soal JLPT berikut dalam bahasa Indonesia.`,
  th: `คุณเป็นครูสอนภาษาญี่ปุ่น โปรดอธิบายคำถาม JLPT ต่อไปนี้เป็นภาษาไทย`
};

export function getPromptForLanguage(language: Language, params: PromptParams): string {
  const { question, selectedAnswer, isCorrect } = params;
  
  return `
${baseInstructions[language]}

問題タイプ: ${question.type}
問題: ${question.question}
文脈: ${question.context}
選択肢:
${question.choices.map((c, i) => `${i + 1}. ${c}`).join('\n')}

学習者の回答: ${selectedAnswer + 1}
正解: ${question.correctAnswer + 1}

各セクションの間に改行を入れ、箇条書きを使用して読みやすく説明してください。
各選択肢の説明は必ず改行して表示してください。
`;
}