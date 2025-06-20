import React from 'react';
import { Check, Clock, Star, Zap } from 'lucide-react';

const pricingPlans = [
  {
    name: 'Per Hour',
    price: 100,
    duration: 'per hour',
    features: [
      'Access to Full Game Library',
      'PlayStation 4 & PS4 Pro',
      'Comfortable Gaming Setup',
      'DualShock 4 Controller',
    ],
    popular: false,
    color: 'from-blue-500 to-purple-600'
  },
  {
    name: '3 Hours Package',
    price: 280,
    duration: 'for 3 hours',
    features: [
      'Access to Full Game Library',
      'PlayStation 4 & PS4 Pro',
      'Comfortable Gaming Setup',
      'DualShock 4 Controller',
      '🌟 Bonus: 15 mins free!'
    ],
    popular: true,
    color: 'from-cyan-500 to-purple-600'
  },
  {
    name: '5 Hours Day Pass',
    price: 450,
    duration: 'for 5 hours',
    features: [
      'Full Day Gaming Access',
      'PlayStation 4 & PS4 Pro',
      'Premium Gaming Setup',
      'DualShock 4 Controller',
      'Priority Booking',
      '🔥 Bonus: 30 mins free!'
    ],
    popular: false,
    color: 'from-purple-500 to-pink-600'
  }
];

const PricingSection = () => {
  const scrollToBooking = () => {
    document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="pricing" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            Choose Your Gaming Package
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Flexible pricing options to match your gaming needs and budget
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pricingPlans.map((plan, index) => (
            <div
              key={index}
              className={`relative bg-gray-900/50 backdrop-blur-sm rounded-2xl p-8 border-2 transition-all duration-300 transform hover:scale-105 ${
                plan.popular 
                  ? 'border-cyan-400 shadow-lg shadow-cyan-400/20' 
                  : 'border-gray-700 hover:border-gray-600'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-cyan-400 to-purple-500 text-black px-6 py-2 rounded-full text-sm font-bold flex items-center space-x-1">
                    <Zap className="w-4 h-4" />
                    <span>Most Popular</span>
                  </div>
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                <div className="flex items-baseline justify-center space-x-2 mb-4">
                  <span className={`text-5xl font-bold bg-gradient-to-r ${plan.color} bg-clip-text text-transparent`}>
                    ₹{plan.price}
                  </span>
                  <span className="text-gray-400">/{plan.duration}</span>
                </div>
                <div className="flex items-center justify-center space-x-2 text-gray-300">
                  <Clock className="w-4 h-4" />
                  <span>Gaming Time</span>
                </div>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center space-x-3">
                    <div className={`rounded-full p-1 bg-gradient-to-r ${plan.color}`}>
                      <Check className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>

              <button 
                onClick={scrollToBooking}
                className={`w-full py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 ${
                  plan.popular
                    ? `bg-gradient-to-r ${plan.color} text-white hover:shadow-lg hover:shadow-cyan-400/30`
                    : `border-2 border-gray-600 text-gray-300 hover:border-gray-500 hover:bg-gray-800/50`
                }`}
              >
                Book Your Gaming Session
              </button>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 border border-gray-700">
            <h3 className="text-2xl font-bold text-white mb-4 flex items-center justify-center space-x-2">
              <Star className="w-6 h-6 text-yellow-400" />
              <span>Special Offers</span>
            </h3>
            <div className="max-w-md mx-auto">
              <div className="bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-lg p-6 border border-green-500/30">
                <h4 className="font-semibold text-green-400 mb-2 text-xl">Membership Card Discount</h4>
                <p className="text-gray-300 text-lg">Get 20% off on all packages with our exclusive membership card</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;