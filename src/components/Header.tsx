import React, { useState } from 'react';
import { Menu, X, Gamepad2 } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo - Responsive sizing */}
          <div className="flex items-center space-x-2">
            <Gamepad2 className="w-6 h-6 sm:w-8 sm:h-8 text-cyan-400" />
            <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              GameDen
            </span>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
            <a href="#games" className="text-gray-300 hover:text-cyan-400 transition-all duration-300 transform hover:scale-110 text-sm lg:text-base">Games</a>
            <a href="#booking" className="text-gray-300 hover:text-cyan-400 transition-all duration-300 transform hover:scale-110 text-sm lg:text-base">Book Now</a>
            <a href="#pricing" className="text-gray-300 hover:text-cyan-400 transition-all duration-300 transform hover:scale-110 text-sm lg:text-base">Pricing</a>
            <a href="#contact" className="text-gray-300 hover:text-cyan-400 transition-all duration-300 transform hover:scale-110 text-sm lg:text-base">Contact</a>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-300 hover:text-white p-2 rounded-lg hover:bg-gray-800/50 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-black/95 backdrop-blur-md border-t border-gray-800 animate-in slide-in-from-top duration-200">
          <div className="px-4 py-4 space-y-3">
            <a 
              href="#games" 
              className="block text-gray-300 hover:text-cyan-400 transition-colors py-3 px-4 rounded-lg hover:bg-gray-800/50 text-lg font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              🎮 Games
            </a>
            <a 
              href="#booking" 
              className="block text-gray-300 hover:text-cyan-400 transition-colors py-3 px-4 rounded-lg hover:bg-gray-800/50 text-lg font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              📅 Book Now
            </a>
            <a 
              href="#pricing" 
              className="block text-gray-300 hover:text-cyan-400 transition-colors py-3 px-4 rounded-lg hover:bg-gray-800/50 text-lg font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              💰 Pricing
            </a>
            <a 
              href="#contact" 
              className="block text-gray-300 hover:text-cyan-400 transition-colors py-3 px-4 rounded-lg hover:bg-gray-800/50 text-lg font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              📞 Contact
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;