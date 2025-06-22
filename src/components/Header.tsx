import React, { useState } from 'react';
import { Menu, X, Gamepad2 } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-md border-b border-cyan-400/20 shadow-lg shadow-cyan-400/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18">
          {/* Logo - Enhanced with glow effect */}
          <div className="flex items-center space-x-2 group">
            <div className="relative">
              <Gamepad2 className="w-7 h-7 sm:w-8 sm:h-8 text-cyan-400 group-hover:text-cyan-300 transition-all duration-300 drop-shadow-lg" />
              <div className="absolute inset-0 w-7 h-7 sm:w-8 sm:h-8 bg-cyan-400/20 rounded-full blur-md group-hover:bg-cyan-300/30 transition-all duration-300"></div>
            </div>
            <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent group-hover:from-cyan-300 group-hover:via-purple-300 group-hover:to-pink-300 transition-all duration-300 drop-shadow-sm">
              GameDen
            </span>
          </div>
          
          {/* Desktop Navigation - Enhanced with neon effects */}
          <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
            <a href="#games" className="relative text-gray-300 hover:text-cyan-400 transition-all duration-300 transform hover:scale-110 text-sm lg:text-base group">
              <span className="relative z-10">Games</span>
              <div className="absolute inset-0 bg-cyan-400/0 group-hover:bg-cyan-400/10 rounded-lg blur-sm transition-all duration-300"></div>
            </a>
            <a href="#booking" className="relative text-gray-300 hover:text-cyan-400 transition-all duration-300 transform hover:scale-110 text-sm lg:text-base group">
              <span className="relative z-10">Book Now</span>
              <div className="absolute inset-0 bg-cyan-400/0 group-hover:bg-cyan-400/10 rounded-lg blur-sm transition-all duration-300"></div>
            </a>
            <a href="#pricing" className="relative text-gray-300 hover:text-cyan-400 transition-all duration-300 transform hover:scale-110 text-sm lg:text-base group">
              <span className="relative z-10">Pricing</span>
              <div className="absolute inset-0 bg-cyan-400/0 group-hover:bg-cyan-400/10 rounded-lg blur-sm transition-all duration-300"></div>
            </a>
            <a href="#contact" className="relative text-gray-300 hover:text-cyan-400 transition-all duration-300 transform hover:scale-110 text-sm lg:text-base group">
              <span className="relative z-10">Contact</span>
              <div className="absolute inset-0 bg-cyan-400/0 group-hover:bg-cyan-400/10 rounded-lg blur-sm transition-all duration-300"></div>
            </a>
          </nav>

          {/* Mobile Menu Button - Enhanced with neon glow */}
          <button
            className="md:hidden relative text-gray-300 hover:text-cyan-400 p-2 rounded-lg hover:bg-gray-800/50 transition-all duration-300 group"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <div className="relative z-10">
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </div>
            <div className="absolute inset-0 bg-cyan-400/0 group-hover:bg-cyan-400/20 rounded-lg blur-sm transition-all duration-300"></div>
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu - Enhanced with better spacing and effects */}
      {isMenuOpen && (
        <div className="md:hidden bg-black/95 backdrop-blur-md border-t border-cyan-400/20 animate-in slide-in-from-top duration-200 shadow-lg shadow-cyan-400/5">
          <div className="px-4 py-6 space-y-4">
            <a 
              href="#games" 
              className="block text-gray-300 hover:text-cyan-400 transition-all duration-300 py-3 px-4 rounded-lg hover:bg-gray-800/50 text-lg font-medium group relative"
              onClick={() => setIsMenuOpen(false)}
            >
              <span className="relative z-10 flex items-center space-x-3">
                <span className="text-cyan-400">🎮</span>
                <span>Games</span>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/0 to-purple-400/0 group-hover:from-cyan-400/10 group-hover:to-purple-400/10 rounded-lg transition-all duration-300"></div>
            </a>
            <a 
              href="#booking" 
              className="block text-gray-300 hover:text-cyan-400 transition-all duration-300 py-3 px-4 rounded-lg hover:bg-gray-800/50 text-lg font-medium group relative"
              onClick={() => setIsMenuOpen(false)}
            >
              <span className="relative z-10 flex items-center space-x-3">
                <span className="text-purple-400">📅</span>
                <span>Book Now</span>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400/0 to-pink-400/0 group-hover:from-purple-400/10 group-hover:to-pink-400/10 rounded-lg transition-all duration-300"></div>
            </a>
            <a 
              href="#pricing" 
              className="block text-gray-300 hover:text-cyan-400 transition-all duration-300 py-3 px-4 rounded-lg hover:bg-gray-800/50 text-lg font-medium group relative"
              onClick={() => setIsMenuOpen(false)}
            >
              <span className="relative z-10 flex items-center space-x-3">
                <span className="text-pink-400">💰</span>
                <span>Pricing</span>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-pink-400/0 to-cyan-400/0 group-hover:from-pink-400/10 group-hover:to-cyan-400/10 rounded-lg transition-all duration-300"></div>
            </a>
            <a 
              href="#contact" 
              className="block text-gray-300 hover:text-cyan-400 transition-all duration-300 py-3 px-4 rounded-lg hover:bg-gray-800/50 text-lg font-medium group relative"
              onClick={() => setIsMenuOpen(false)}
            >
              <span className="relative z-10 flex items-center space-x-3">
                <span className="text-cyan-400">📞</span>
                <span>Contact</span>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/0 to-purple-400/0 group-hover:from-cyan-400/10 group-hover:to-purple-400/10 rounded-lg transition-all duration-300"></div>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;