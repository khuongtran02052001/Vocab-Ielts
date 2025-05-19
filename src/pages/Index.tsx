
import React, { useState, useEffect } from 'react';
import VocabularyTable from '@/components/VocabularyTable';
import CategorySelector from '@/components/CategorySelector';
import Header from '@/components/Header';
import { fetchCategories, fetchWordsByCategory, searchWordsInSupabase, Category, Word } from '@/services/supabaseService';
import { toast } from 'sonner';

const Index = () => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [displayWords, setDisplayWords] = useState<Word[]>([]);
  const [categoryName, setCategoryName] = useState('');
  const [displayMode, setDisplayMode] = useState<'table' | 'list'>('table');
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  
  useEffect(() => {
    const loadCategories = async () => {
      try {
        setLoading(true);
        const data = await fetchCategories();
        setCategories(data);
        
        // If there are categories, set the first one as active by default
        if (data.length > 0 && !activeCategory) {
          handleCategorySelect(data[0].id);
        } else {
          setLoading(false);
        }
      } catch (error) {
        console.error('Failed to load categories', error);
        toast.error('Failed to load categories');
        setLoading(false);
      }
    };
    
    loadCategories();
  }, []);
  
  const handleCategorySelect = async (categoryId: string) => {
    try {
      setLoading(true);
      setActiveCategory(categoryId);
      
      const selectedCategory = categories.find(cat => cat.id === categoryId);
      if (selectedCategory) {
        setCategoryName(selectedCategory.name);
      }
      
      const words = await fetchWordsByCategory(categoryId);
      setDisplayWords(words);
      setSearchQuery('');
      setLoading(false);
    } catch (error) {
      console.error('Failed to load words', error);
      toast.error('Failed to load words for this category');
      setLoading(false);
    }
  };
  
  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    
    if (query.trim() === '') {
      // If search is cleared, go back to current category
      if (activeCategory) {
        const selectedCategory = categories.find(cat => cat.id === activeCategory);
        if (selectedCategory) {
          handleCategorySelect(activeCategory);
        }
      }
      return;
    }
    
    try {
      setLoading(true);
      const results = await searchWordsInSupabase(query);
      setDisplayWords(results);
      setCategoryName(`Search Results for "${query}"`);
      setActiveCategory(null);
      setLoading(false);
    } catch (error) {
      console.error('Search failed', error);
      toast.error('Search failed');
      setLoading(false);
    }
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
          {loading ? (
            <div className="py-8 text-center">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" />
              <p className="mt-2 text-gray-600">Loading...</p>
            </div>
          ) : (
            <VocabularyTable 
              words={displayWords}
              categoryName={categoryName}
              displayMode={displayMode}
              onToggleDisplayMode={toggleDisplayMode}
            />
          )}
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
