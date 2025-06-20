import React from 'react';
import { Play, Calendar } from 'lucide-react';

const Hero = () => {
  const scrollToBooking = () => {
    document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 pt-20 md:pt-0 fade-in">
      <div className="max-w-4xl mx-auto text-center z-10">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent animate-fade-in-down text-glow">
          Welcome to GameDen
        </h1>
        <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto animate-fade-in-up">
          Experience the ultimate gaming adventure with PlayStation 4 & PS4 Pro consoles.
          Book your gaming session and dive into the latest blockbuster titles.
        </p>

        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
          <button
            onClick={scrollToBooking}
            className="group bg-gradient-to-r from-cyan-500 to-purple-600 px-8 py-4 rounded-lg font-semibold text-lg hover:from-cyan-400 hover:to-purple-500 transition-all duration-300 transform hover:scale-105 flex items-center space-x-2 pulse-gaming"
          >
            <Play className="w-5 h-5 group-hover:scale-110 transition-transform" />
            <span>Book Now</span>
          </button>
          <button
            onClick={scrollToBooking}
            className="border-2 border-cyan-400 text-cyan-400 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-cyan-400 hover:text-black transition-all duration-300 transform hover:scale-105 flex items-center space-x-2"
          >
            <Calendar className="w-5 h-5" />
            <span>View Availability</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
          <div className="bg-gray-900/50 backdrop-blur-sm rounded-lg p-6 border border-gray-800 transform hover:scale-110 transition-transform duration-300">
            <div className="text-cyan-400 text-3xl font-bold mb-2">PS4 & PS4 Pro</div>
            <div className="text-gray-300">Latest Consoles</div>
          </div>
          <div className="bg-gray-900/50 backdrop-blur-sm rounded-lg p-6 border border-gray-800 transform hover:scale-110 transition-transform duration-300">
            <div className="text-purple-400 text-3xl font-bold mb-2">30+</div>
            <div className="text-gray-300">Premium Games</div>
          </div>
          <div className="bg-gray-900/50 backdrop-blur-sm rounded-lg p-6 border border-gray-800 transform hover:scale-110 transition-transform duration-300">
            <div className="text-pink-400 text-3xl font-bold mb-2">12/7</div>
            <div className="text-gray-300">Open Daily</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
