
import React from 'react';
import { Word } from '@/data/vocabulary';
import { List, LayoutGrid } from 'lucide-react';

interface VocabularyTableProps {
  words: Word[];
  categoryName?: string;
  displayMode: 'table' | 'list';
  onToggleDisplayMode: () => void;
}

const VocabularyTable: React.FC<VocabularyTableProps> = ({ 
  words, 
  categoryName, 
  displayMode, 
  onToggleDisplayMode 
}) => {
  if (words.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No vocabulary words found.</p>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <div className="flex justify-between items-center mb-4">
        {categoryName && (
          <h2 className="text-2xl font-heading font-bold text-primary-900">
            {categoryName}
          </h2>
        )}
        <button 
          onClick={onToggleDisplayMode}
          className="flex items-center gap-2 px-3 py-2 bg-primary-100 hover:bg-primary-200 text-primary-800 rounded-md"
        >
          {displayMode === 'table' ? (
            <>
              <List size={18} /> View as List
            </>
          ) : (
            <>
              <LayoutGrid size={18} /> View as Table
            </>
          )}
        </button>
      </div>
      
      {displayMode === 'table' ? (
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
      ) : (
        <div className="space-y-4">
          {words.map((word, index) => (
            <div key={index} className="bg-white rounded-lg shadow p-4 hover:shadow-md transition-shadow">
              <div className="flex items-start gap-2">
                <div className="font-bold text-lg">{word.term}</div>
                <div className="text-gray-500">({word.partOfSpeech})</div>
                {word.pronunciation && (
                  <div className="text-gray-600 italic">{word.pronunciation}</div>
                )}
              </div>
              
              <div className="mt-1 font-medium text-gray-800">{word.meaning}</div>
              
              {word.usage && (
                <div className="mt-2 text-primary-700 border-l-2 border-primary-300 pl-3 italic">
                  → {word.usage}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default VocabularyTable;
