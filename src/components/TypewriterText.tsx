import React, { useState, useEffect } from 'react';

interface TypewriterTextProps {
  text: string;
  speed?: number;
}

export function TypewriterText({ text, speed = 10 }: TypewriterTextProps) {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timer = setTimeout(() => {
        // 一度に複数文字を表示して速度を上げる
        const chunkSize = 3;
        const nextIndex = Math.min(currentIndex + chunkSize, text.length);
        const chunk = text.slice(currentIndex, nextIndex);
        setDisplayedText(prev => prev + chunk);
        setCurrentIndex(nextIndex);
      }, speed);

      return () => clearTimeout(timer);
    }
  }, [currentIndex, text, speed]);

  // 新しい文章が来たときにリセット
  useEffect(() => {
    setDisplayedText('');
    setCurrentIndex(0);
  }, [text]);

  return (
    <div className="whitespace-pre-line min-h-[200px]">
      {displayedText}
      {currentIndex < text.length && (
        <span className="animate-pulse">▍</span>
      )}
    </div>
  );
}