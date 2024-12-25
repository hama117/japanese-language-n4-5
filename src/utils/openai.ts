import OpenAI from 'openai';
import { Question, Language } from '../types';
import { formatResponse } from './formatResponse';
import { getPromptForLanguage } from './languageInstructions';

export async function getExplanation(
  apiKey: string,
  question: Question,
  selectedAnswer: number,
  language: Language
): Promise<string> {
  const openai = new OpenAI({ apiKey, dangerouslyAllowBrowser: true });

  const prompt = getPromptForLanguage(language, {
    question,
    selectedAnswer,
    isCorrect: selectedAnswer === question.correctAnswer
  });

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
    });

    const content = response.choices[0].message.content || '';
    return formatResponse(content, language);
  } catch (error) {
    console.error('OpenAI API error:', error);
    throw new Error('Failed to get explanation');
  }
}