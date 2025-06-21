import React from 'react';
import { MapPin, Phone, Mail, Clock, Gamepad2, Instagram, Twitter, Facebook } from 'lucide-react';

const Footer = () => {
  return (
    <footer id="contact" className="bg-black border-t border-gray-800 py-12 sm:py-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Footer Grid - Mobile-first responsive */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-6 lg:gap-8">
          {/* Brand Section - Mobile optimized */}
          <div className="space-y-4 text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start space-x-2">
              <Gamepad2 className="w-6 h-6 sm:w-8 sm:h-8 text-cyan-400" />
              <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                GameDen
              </span>
            </div>
            <p className="text-gray-400 leading-relaxed text-sm sm:text-base">
              Your ultimate gaming destination. Experience the latest PlayStation games in our premium gaming lounge.
            </p>
            <div className="flex justify-center sm:justify-start space-x-4">
              <a href="#" className="text-gray-400 hover:text-cyan-400 transition-all duration-300 transform hover:scale-125">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-cyan-400 transition-all duration-300 transform hover:scale-125">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-cyan-400 transition-all duration-300 transform hover:scale-125">
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Contact Info - Mobile optimized */}
          <div className="space-y-4 text-center sm:text-left">
            <h3 className="text-lg sm:text-xl font-semibold text-white">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-start justify-center sm:justify-start space-x-3 text-gray-400">
                <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                <span className="text-sm sm:text-base leading-relaxed">1E Shanthi Nagar, PB Complex, Sathy Main Road, Gobichettipalayam</span>
              </div>
              <div className="flex items-center justify-center sm:justify-start space-x-3 text-gray-400">
                <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400" />
                <a href="tel:+919344407141" className="text-sm sm:text-base hover:text-cyan-400 transition-colors">+91 9344407141</a>
              </div>
              <div className="flex items-center justify-center sm:justify-start space-x-3 text-gray-400">
                <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400" />
                <a href="mailto:gamedenoffiz@gmail.com" className="text-sm sm:text-base hover:text-cyan-400 transition-colors">gamedenoffiz@gmail.com</a>
              </div>
            </div>
          </div>

          {/* Hours - Mobile optimized */}
          <div className="space-y-4 text-center sm:text-left">
            <h3 className="text-lg sm:text-xl font-semibold text-white">Opening Hours</h3>
            <div className="space-y-2 text-gray-400">
              <div className="flex items-center justify-center sm:justify-start space-x-3">
                <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400" />
                <span className="text-sm sm:text-base">Open 24/7 Website Trending</span>
              </div>
              <div className="text-xs sm:text-sm space-y-1">
                <div className="font-semibold text-gray-300">Shop Timing</div>
                <div>Monday - Friday: 11:00 AM - 10:00 PM</div>
                <div>Saturday - Sunday: 11:00 AM - 11:00 PM</div>
                <div className="text-cyan-400 mt-2">Late night gaming available!</div>
              </div>
            </div>
          </div>

          {/* Quick Links - Mobile optimized */}
          <div className="space-y-4 text-center sm:text-left">
            <h3 className="text-lg sm:text-xl font-semibold text-white">Quick Links</h3>
            <div className="space-y-2">
              <a href="#games" className="block text-gray-400 hover:text-cyan-400 transition-all duration-300 transform hover:translate-x-2 text-sm sm:text-base">
                Game Library
              </a>
              <a href="#booking" className="block text-gray-400 hover:text-cyan-400 transition-all duration-300 transform hover:translate-x-2 text-sm sm:text-base">
                Book Now
              </a>
              <a href="#pricing" className="block text-gray-400 hover:text-cyan-400 transition-all duration-300 transform hover:translate-x-2 text-sm sm:text-base">
                Pricing
              </a>
              <a href="#" className="block text-gray-400 hover:text-cyan-400 transition-all duration-300 transform hover:translate-x-2 text-sm sm:text-base">
                Group Events
              </a>
              <a href="#" className="block text-gray-400 hover:text-cyan-400 transition-all duration-300 transform hover:translate-x-2 text-sm sm:text-base">
                Tournaments
              </a>
            </div>
          </div>
        </div>

        {/* Footer Bottom - Mobile optimized */}
        <div className="border-t border-gray-800 mt-8 sm:mt-12 pt-6 sm:pt-8 text-center">
          <p className="text-gray-400 text-sm sm:text-base">
            © 2024 GameDen. All rights reserved. | Built with passion for gaming
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;