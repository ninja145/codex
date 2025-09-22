import React from 'react';
import { PlayCircleIcon } from '@heroicons/react/24/outline';

const Navbar = () => {
  return (
    <nav className="bg-gray-900/80 backdrop-blur-sm fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <h1 className="text-2xl font-bold text-white">Veziit</h1>
          </div>
          <div className="flex items-center">
            <button className="flex items-center space-x-2 text-white hover:text-gray-300">
              <PlayCircleIcon className="h-8 w-8" />
              <span className="hidden sm:block">Tutorials</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
