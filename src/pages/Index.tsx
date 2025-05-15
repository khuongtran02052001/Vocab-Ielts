
import React, { useState, useEffect } from 'react';
import { getAllCategories, getCategoryById, searchWords, Word } from '@/data/vocabulary';
import VocabularyTable from '@/components/VocabularyTable';
import CategorySelector from '@/components/CategorySelector';
import Header from '@/components/Header';

const Index = () => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [displayWords, setDisplayWords] = useState<Word[]>([]);
  const [categoryName, setCategoryName] = useState('');
  const [displayMode, setDisplayMode] = useState<'table' | 'list'>('table');
  
  const categories = getAllCategories();
  
  useEffect(() => {
    // If there are categories, set the first one as active by default
    if (categories.length > 0 && !activeCategory) {
      handleCategorySelect(categories[0].id);
    }
  }, []);
  
  const handleCategorySelect = (categoryId: string) => {
    const category = getCategoryById(categoryId);
    if (category) {
      setActiveCategory(categoryId);
      setDisplayWords(category.words);
      setCategoryName(category.name);
      setSearchQuery('');
    }
  };
  
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    
    if (query.trim() === '') {
      // If search is cleared, go back to current category
      if (activeCategory) {
        const category = getCategoryById(activeCategory);
        if (category) {
          setDisplayWords(category.words);
          setCategoryName(category.name);
        }
      }
      return;
    }
    
    const results = searchWords(query);
    setDisplayWords(results.map(r => r.word));
    setCategoryName(`Search Results for "${query}"`);
    setActiveCategory(null);
  };

  const toggleDisplayMode = () => {
    setDisplayMode(prev => prev === 'table' ? 'list' : 'table');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header onSearchChange={handleSearch} />
      
      <main className="container mx-auto px-4 py-8 flex-grow">
        <CategorySelector 
          categories={categories}
          activeCategory={activeCategory}
          onSelectCategory={handleCategorySelect}
        />
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <VocabularyTable 
            words={displayWords}
            categoryName={categoryName}
            displayMode={displayMode}
            onToggleDisplayMode={toggleDisplayMode}
          />
        </div>
      </main>
      
      <footer className="bg-gray-800 text-white py-4">
        <div className="container mx-auto text-center">
          <p>© 2025 English Vocabulary Table - Your IELTS Learning Assistant</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
