
import React from 'react';
import { Search, Upload } from 'lucide-react';
import { Link } from 'react-router-dom';

interface HeaderProps {
  onSearchChange: (query: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onSearchChange }) => {
  return (
    <header className="bg-primary-800 text-white p-4 shadow-md">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="mb-4 md:mb-0">
          <Link to="/" className="text-white hover:text-primary-100">
            <h1 className="text-2xl font-heading font-bold">English Vocabulary Table</h1>
            <p className="text-primary-100">Your IELTS vocabulary learning resource</p>
          </Link>
        </div>
        
        <div className="flex items-center gap-4">
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
          
          <Link 
            to="/upload" 
            className="flex items-center gap-1 px-3 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors"
          >
            <Upload size={16} />
            <span className="hidden sm:inline">Tải lên Excel</span>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
