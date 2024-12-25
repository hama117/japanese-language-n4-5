import React from 'react';

interface QuestionTextProps {
  text: string;
}

export function QuestionText({ text }: QuestionTextProps) {
  // 文を文字単位に分割し、各文字に適切なスペースを追加
  const characters = text.split('').map((char, index) => {
    // 句読点の後にスペースを追加
    if (['。', '、', '！', '？'].includes(char)) {
      return char + ' ';
    }
    // 漢字の前後にスペースを追加
    if (isKanji(char)) {
      return ' ' + char + ' ';
    }
    return char;
  });

  return (
    <p className="text-lg leading-loose tracking-wider">
      {characters}
    </p>
  );
}

// 漢字判定関数
function isKanji(char: string): boolean {
  return /[\u4E00-\u9FFF]/.test(char);
}