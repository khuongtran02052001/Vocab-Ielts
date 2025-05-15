
import React from 'react';
import { Category } from '@/data/vocabulary';

interface CategorySelectorProps {
  categories: Category[];
  activeCategory: string | null;
  onSelectCategory: (categoryId: string) => void;
}

const CategorySelector: React.FC<CategorySelectorProps> = ({
  categories,
  activeCategory,
  onSelectCategory
}) => {
  return (
    <div className="mb-6">
      <h2 className="text-xl font-heading font-bold mb-4">Categories</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {categories.map((category) => (
          <div
            key={category.id}
            className={`category-card ${activeCategory === category.id ? 'active' : ''}`}
            onClick={() => onSelectCategory(category.id)}
          >
            <h3 className="text-lg font-semibold text-primary-800">{category.name}</h3>
            <p className="text-gray-600 text-sm">{category.description}</p>
            <div className="mt-2 text-xs text-gray-500">{category.words.length} words</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategorySelector;
