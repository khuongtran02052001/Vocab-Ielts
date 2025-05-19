
import React from 'react';
import { Category } from '@/services/supabaseService';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';

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
    <div className="mb-8">
      <h2 className="text-xl font-heading font-bold mb-4">Categories</h2>
      
      <div className="relative">
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent>
            {categories.map((category) => (
              <CarouselItem key={category.id} className="md:basis-1/3 lg:basis-1/4">
                <div
                  className={`category-card h-full flex flex-col ${activeCategory === category.id ? 'active' : ''}`}
                  onClick={() => onSelectCategory(category.id)}
                >
                  <h3 className="text-lg font-semibold text-primary-800">{category.name}</h3>
                  <p className="text-gray-600 text-sm flex-grow">
                    {category.name.includes('Listening') && 'Từ vựng liên quan đến kỹ năng nghe IELTS'}
                    {category.name.includes('Reading') && 'Từ vựng liên quan đến kỹ năng đọc IELTS'}
                    {category.name.includes('Writing') && 'Từ vựng liên quan đến kỹ năng viết IELTS'}
                    {category.name.includes('Speaking') && 'Từ vựng liên quan đến kỹ năng nói IELTS'}
                  </p>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="lg:-left-4 md:-left-2 left-0" />
          <CarouselNext className="lg:-right-4 md:-right-2 right-0" />
        </Carousel>
      </div>
    </div>
  );
};

export default CategorySelector;
