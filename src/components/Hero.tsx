import React from 'react';
import { Play, Calendar } from 'lucide-react';

const Hero = () => {
  const scrollToBooking = () => {
    document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 pt-32 sm:pt-28 md:pt-0 fade-in">
      <div className="max-w-4xl mx-auto text-center z-10">
        {/* Main Heading - Enhanced with better mobile spacing and neon effects */}
        <div className="mb-8 sm:mb-10">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 sm:mb-8 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-fade-in-down leading-tight">
            <span className="block text-glow-enhanced">Welcome to</span>
            <span className="block text-glow-enhanced mt-2">GameDen</span>
          </h1>
        </div>
        
        {/* Subtitle - Enhanced mobile spacing and readability */}
        <div className="mb-10 sm:mb-12">
          <p className="text-lg sm:text-xl md:text-2xl lg:text-2xl text-gray-300 max-w-3xl mx-auto animate-fade-in-up leading-relaxed px-4 sm:px-6">
            Experience the ultimate gaming adventure with PlayStation 4 & PS4 Pro consoles.
            <span className="block mt-3 text-cyan-400 font-semibold">
              Book your gaming session and dive into the latest blockbuster titles.
            </span>
          </p>
        </div>

        {/* Action Buttons - Enhanced mobile design with better spacing */}
        <div className="flex flex-col sm:flex-row gap-5 sm:gap-6 justify-center items-center mb-12 sm:mb-16 px-4">
          <button
            onClick={scrollToBooking}
            className="group relative bg-gradient-to-r from-cyan-500 to-purple-600 px-8 sm:px-10 py-4 sm:py-5 rounded-xl font-semibold text-lg sm:text-xl hover:from-cyan-400 hover:to-purple-500 transition-all duration-300 transform hover:scale-105 flex items-center space-x-3 pulse-gaming w-full sm:w-auto justify-center shadow-lg shadow-cyan-400/25"
          >
            <Play className="w-5 h-5 sm:w-6 sm:h-6 group-hover:scale-110 transition-transform" />
            <span>Book Now</span>
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/0 to-purple-400/0 group-hover:from-cyan-400/20 group-hover:to-purple-400/20 rounded-xl blur-xl transition-all duration-300"></div>
          </button>
          <button
            onClick={scrollToBooking}
            className="group relative border-2 border-cyan-400 text-cyan-400 px-8 sm:px-10 py-4 sm:py-5 rounded-xl font-semibold text-lg sm:text-xl hover:bg-cyan-400 hover:text-black transition-all duration-300 transform hover:scale-105 flex items-center space-x-3 w-full sm:w-auto justify-center shadow-lg shadow-cyan-400/10"
          >
            <Calendar className="w-5 h-5 sm:w-6 sm:h-6" />
            <span>View Availability</span>
            <div className="absolute inset-0 bg-cyan-400/0 group-hover:bg-cyan-400/10 rounded-xl blur-xl transition-all duration-300"></div>
          </button>
        </div>

        {/* Stats Cards - Enhanced mobile design with better spacing and neon effects */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 max-w-4xl mx-auto px-4">
          <div className="group relative bg-gray-900/60 backdrop-blur-sm rounded-xl p-6 sm:p-8 border border-gray-700 hover:border-cyan-400/50 transform hover:scale-105 transition-all duration-300 shadow-lg">
            <div className="relative z-10">
              <div className="text-cyan-400 text-3xl sm:text-4xl font-bold mb-2 sm:mb-3 text-glow">PS4 & PS4 Pro</div>
              <div className="text-gray-300 text-base sm:text-lg">Latest Consoles</div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/0 to-purple-400/0 group-hover:from-cyan-400/10 group-hover:to-purple-400/5 rounded-xl transition-all duration-300"></div>
          </div>
          
          <div className="group relative bg-gray-900/60 backdrop-blur-sm rounded-xl p-6 sm:p-8 border border-gray-700 hover:border-purple-400/50 transform hover:scale-105 transition-all duration-300 shadow-lg">
            <div className="relative z-10">
              <div className="text-purple-400 text-3xl sm:text-4xl font-bold mb-2 sm:mb-3 text-glow">30+</div>
              <div className="text-gray-300 text-base sm:text-lg">Premium Games</div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-br from-purple-400/0 to-pink-400/0 group-hover:from-purple-400/10 group-hover:to-pink-400/5 rounded-xl transition-all duration-300"></div>
          </div>
          
          <div className="group relative bg-gray-900/60 backdrop-blur-sm rounded-xl p-6 sm:p-8 border border-gray-700 hover:border-pink-400/50 transform hover:scale-105 transition-all duration-300 shadow-lg">
            <div className="relative z-10">
              <div className="text-pink-400 text-3xl sm:text-4xl font-bold mb-2 sm:mb-3 text-glow">12/7</div>
              <div className="text-gray-300 text-base sm:text-lg">Open Daily</div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-br from-pink-400/0 to-cyan-400/0 group-hover:from-pink-400/10 group-hover:to-cyan-400/5 rounded-xl transition-all duration-300"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;