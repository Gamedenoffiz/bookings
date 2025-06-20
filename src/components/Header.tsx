import React, { useState } from 'react';
import { Menu, X, Gamepad2 } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2">
            <Gamepad2 className="w-8 h-8 text-cyan-400" />
            <span className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              GameDen
            </span>
          </div>
          
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#games" className="text-gray-300 hover:text-cyan-400 transition-all duration-300 transform hover:scale-110">Games</a>
            <a href="#booking" className="text-gray-300 hover:text-cyan-400 transition-all duration-300 transform hover:scale-110">Book Now</a>
            <a href="#pricing" className="text-gray-300 hover:text-cyan-400 transition-all duration-300 transform hover:scale-110">Pricing</a>
            <a href="#contact" className="text-gray-300 hover:text-cyan-400 transition-all duration-300 transform hover:scale-110">Contact</a>
          </nav>

          <button
            className="md:hidden text-gray-300 hover:text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-black/95 backdrop-blur-md border-t border-gray-800">
          <div className="px-4 py-4 space-y-3">
            <a href="#games" className="block text-gray-300 hover:text-cyan-400 transition-colors">Games</a>
            <a href="#booking" className="block text-gray-300 hover:text-cyan-400 transition-colors">Book Now</a>
            <a href="#pricing" className="block text-gray-300 hover:text-cyan-400 transition-colors">Pricing</a>
            <a href="#contact" className="block text-gray-300 hover:text-cyan-400 transition-colors">Contact</a>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;