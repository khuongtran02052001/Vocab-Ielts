
import React, { useState } from 'react';
import { Word } from '@/services/supabaseService';
import { List, LayoutGrid, Volume2 } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

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
  const [playingWord, setPlayingWord] = useState<string | null>(null);

  if (words.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No vocabulary words found.</p>
      </div>
    );
  }

  const handlePlayPronunciation = async (word: string) => {
    try {
      setPlayingWord(word);
      const { data, error } = await supabase.functions.invoke('text-to-speech', {
        body: { text: word }
      });
      
      if (error) {
        throw new Error(error.message);
      }

      if (data && data.audioContent) {
        const audio = new Audio(`data:audio/mp3;base64,${data.audioContent}`);
        audio.onended = () => setPlayingWord(null);
        audio.onerror = () => {
          setPlayingWord(null);
          toast.error('Failed to play audio');
        };
        await audio.play();
      }
    } catch (error) {
      console.error('Error playing pronunciation:', error);
      toast.error('Failed to load pronunciation');
      setPlayingWord(null);
    }
  };

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
              {words.map((word) => (
                <tr key={word.id}>
                  <td className="font-medium flex items-center gap-2">
                    {word.term}
                    <button 
                      onClick={() => handlePlayPronunciation(word.term)}
                      className="text-primary-600 hover:text-primary-800"
                      disabled={playingWord === word.term}
                      title="Phát âm"
                    >
                      <Volume2 size={18} className={playingWord === word.term ? "animate-pulse" : ""} />
                    </button>
                  </td>
                  <td className="text-gray-600 italic">{word.pronunciation || "-"}</td>
                  <td className="text-center">
                    <span className="inline-block px-2 py-1 bg-primary-100 text-primary-800 rounded-full text-xs">
                      {word.part_of_speech}
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
          {words.map((word) => (
            <div key={word.id} className="bg-white rounded-lg shadow p-4 hover:shadow-md transition-shadow">
              <div className="flex items-start gap-2">
                <div className="font-bold text-lg">{word.term}</div>
                <button 
                  onClick={() => handlePlayPronunciation(word.term)}
                  className="text-primary-600 hover:text-primary-800 mt-1"
                  disabled={playingWord === word.term}
                  title="Phát âm"
                >
                  <Volume2 size={18} className={playingWord === word.term ? "animate-pulse" : ""} />
                </button>
                <div className="text-gray-500">({word.part_of_speech})</div>
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
