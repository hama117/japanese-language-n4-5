import React, { useCallback } from 'react';
import { Upload } from 'lucide-react';
import Papa from 'papaparse';
import { Question } from '../types';

interface FileUploadProps {
  onQuestionsLoaded: (questions: Question[]) => void;
}

export function FileUpload({ onQuestionsLoaded }: FileUploadProps) {
  const handleFileUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    Papa.parse(file, {
      complete: (results) => {
        const questions = results.data
          .filter((row: any[]) => row.length === 4)
          .map((row: string[]) => ({
            type: row[0],
            question: row[1],
            context: row[2],
            choices: row[2].split(' ').filter(item => /^\d/.test(item)).map(item => item.replace(/^\d+/, '').trim()),
            correctAnswer: parseInt(row[3]) - 1
          }));
        onQuestionsLoaded(questions);
      }
    });
  }, [onQuestionsLoaded]);

  return (
    <div className="flex items-center justify-center w-full">
      <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          <Upload className="w-10 h-10 mb-3 text-gray-400" />
          <p className="mb-2 text-sm text-gray-500">
            <span className="font-semibold">Click to upload</span> or drag and drop
          </p>
          <p className="text-xs text-gray-500">CSV file with questions</p>
        </div>
        <input
          type="file"
          className="hidden"
          accept=".csv"
          onChange={handleFileUpload}
        />
      </label>
    </div>
  );
}