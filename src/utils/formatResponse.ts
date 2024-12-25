import { Language } from '../types';

// 各言語のセクション見出し
const sectionHeaders: Record<Language, string[]> = {
  ja: ['正誤判定', '問題のポイント', '文の意味', '各選択肢の分析', '正解とその理由', 'まとめ'],
  en: ['Correctness Assessment', 'Key Points', 'Meaning and Context', 'Analysis of Options', 'Correct Answer and Reasoning', 'Summary'],
  zh: ['答案判定', '题目要点', '句子含义和语境', '选项分析', '正确答案及理由', '总结'],
  vi: ['Đánh giá câu trả lời', 'Điểm chính', 'Ý nghĩa và ngữ cảnh', 'Phân tích các lựa chọn', 'Câu trả lời đúng và lý do', 'Tổng kết'],
  id: ['Penilaian Jawaban', 'Poin-poin Penting', 'Arti dan Konteks', 'Analisis Pilihan', 'Jawaban Benar dan Alasan', 'Ringkasan'],
  th: ['การประเมินคำตอบ', 'ประเด็นสำคัญ', 'ความหมายและบริบท', 'การวิเคราะห์ตัวเลือก', 'คำตอบที่ถูกต้องและเหตุผล', 'สรุป']
};

export function formatResponse(response: string, language: Language): string {
  // レスポンスを行に分割
  const lines = response.split('\n').map(line => line.trim()).filter(Boolean);
  
  // セクションごとに整形
  const sections: string[] = [];
  let currentSection: string[] = [];
  
  const headers = sectionHeaders[language];
  
  lines.forEach(line => {
    // 新しいセクションの開始を検出
    const headerIndex = headers.findIndex(header => 
      line.includes(header) || line.match(new RegExp(`^\\d+\\.\\s*${header}`))
    );
    
    if (headerIndex !== -1) {
      // 前のセクションを保存
      if (currentSection.length > 0) {
        sections.push(currentSection.join('\n\n'));
      }
      // 新しいセクションを開始
      currentSection = [line];
    } else {
      // 現在のセクションに行を追加
      currentSection.push(line);
    }
  });
  
  // 最後のセクションを追加
  if (currentSection.length > 0) {
    sections.push(currentSection.join('\n\n'));
  }
  
  // セクション間に空行を追加して結合
  return sections.join('\n\n\n');
}