import React, { useState } from 'react';
import { Search, Loader2 } from 'lucide-react';

interface SearchBarProps {
  onSearch: (term: string) => void;
  isLoading: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, isLoading }) => {
  const [term, setTerm] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (term.trim()) {
      onSearch(term);
    }
  };

  return (
    <div className="absolute top-8 left-1/2 transform -translate-x-1/2 w-full max-w-xl px-4 z-10">
      <form onSubmit={handleSubmit} className="relative group">
        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-zinc-400 group-focus-within:text-indigo-400 transition-colors">
          {isLoading ? <Loader2 className="animate-spin" size={20} /> : <Search size={20} />}
        </div>
        <input
          type="text"
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          placeholder="What do you want to learn? (e.g., Quantum Physics, French Revolution)"
          disabled={isLoading}
          className="w-full bg-zinc-900/80 backdrop-blur-xl text-white placeholder-zinc-500 rounded-2xl py-4 pl-12 pr-4 border border-zinc-700/50 shadow-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all text-lg"
        />
        <div className="absolute inset-y-0 right-2 flex items-center">
             <kbd className="hidden sm:inline-flex items-center h-8 px-2 text-xs font-medium text-zinc-500 bg-zinc-800 rounded border border-zinc-700">
                Enter
             </kbd>
        </div>
      </form>
    </div>
  );
};

export default SearchBar;