
import React from 'react';
import { Search } from 'lucide-react';

interface HeaderProps {
  onSearchChange: (query: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onSearchChange }) => {
  return (
    <header className="bg-primary-800 text-white p-4 shadow-md">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="mb-4 md:mb-0">
          <h1 className="text-2xl font-heading font-bold">English Vocabulary Table</h1>
          <p className="text-primary-100">Your IELTS vocabulary learning resource</p>
        </div>
        
        <div className="relative w-full md:w-64">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search vocabulary..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary-500"
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
