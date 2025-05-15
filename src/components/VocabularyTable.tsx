
import React from 'react';
import { Word } from '@/data/vocabulary';

interface VocabularyTableProps {
  words: Word[];
  categoryName?: string;
}

const VocabularyTable: React.FC<VocabularyTableProps> = ({ words, categoryName }) => {
  if (words.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No vocabulary words found.</p>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      {categoryName && (
        <h2 className="text-2xl font-heading font-bold text-primary-900 mb-4">
          {categoryName}
        </h2>
      )}
      <div className="overflow-x-auto">
        <table className="vocabulary-table">
          <thead>
            <tr>
              <th className="w-1/6">Từ vựng</th>
              <th className="w-1/6">Phiên âm</th>
              <th className="w-1/12">Loại từ</th>
              <th className="w-1/6">Nghĩa của từ</th>
              <th className="w-2/6">Cách dùng</th>
            </tr>
          </thead>
          <tbody>
            {words.map((word, index) => (
              <tr key={index}>
                <td className="font-medium">{word.term}</td>
                <td className="text-gray-600 italic">{word.pronunciation || "-"}</td>
                <td className="text-center">
                  <span className="inline-block px-2 py-1 bg-primary-100 text-primary-800 rounded-full text-xs">
                    {word.partOfSpeech}
                  </span>
                </td>
                <td>{word.meaning}</td>
                <td className="text-gray-700">{word.usage || "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default VocabularyTable;
