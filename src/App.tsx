import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import GameSelection from './components/GameSelection';
import BookingSection from './components/BookingSection';
import PricingSection from './components/PricingSection';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <div className="stars-bg">
        <div className="stars"></div>
        <div className="stars2"></div>
        <div className="stars3"></div>
        <Header />
        <Hero />
        <GameSelection />
        <BookingSection />
        <PricingSection />
        <Footer />
      </div>
    </div>
  );
}

export default App;