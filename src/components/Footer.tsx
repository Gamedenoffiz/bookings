import React from 'react';
import { MapPin, Phone, Mail, Clock, Gamepad2, Instagram, Twitter, Facebook } from 'lucide-react';

const Footer = () => {
  return (
    <footer id="contact" className="bg-black border-t border-gray-800 py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Gamepad2 className="w-8 h-8 text-cyan-400" />
              <span className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                GameDen
              </span>
            </div>
            <p className="text-gray-400 leading-relaxed">
              Your ultimate gaming destination. Experience the latest PlayStation games in our premium gaming lounge.
            </p>
            <div className="flex space-x-4">
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

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-white">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-gray-400">
                <MapPin className="w-5 h-5 text-cyan-400" />
                <span>1E Shanthi Nagar, PB Complex, Sathy Main Road, Gobichettipalayam</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-400">
                <Phone className="w-5 h-5 text-cyan-400" />
                <span>+91 9344407141</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-400">
                <Mail className="w-5 h-5 text-cyan-400" />
                <span>gamedenoffiz@gmail.com</span>
              </div>
            </div>
          </div>

          {/* Hours */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-white">Opening Hours</h3>
            <div className="space-y-2 text-gray-400">
              <div className="flex items-center space-x-3">
                <Clock className="w-5 h-5 text-purple-400" />
                <span>Open 24/7 Website Trending</span>
              </div>
              <div className="text-sm">
                <span>Shop Timing</span>
                <div>Monday - Friday: 11:00 AM - 10:00 PM</div>
                <div>Saturday - Sunday: 11:00 AM - 11:00 PM</div>
                <div className="text-cyan-400 mt-2">Late night gaming available!</div>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-white">Quick Links</h3>
            <div className="space-y-2">
              <a href="#games" className="block text-gray-400 hover:text-cyan-400 transition-all duration-300 transform hover:translate-x-2">
                Game Library
              </a>
              <a href="#booking" className="block text-gray-400 hover:text-cyan-400 transition-all duration-300 transform hover:translate-x-2">
                Book Now
              </a>
              <a href="#pricing" className="block text-gray-400 hover:text-cyan-400 transition-all duration-300 transform hover:translate-x-2">
                Pricing
              </a>
              <a href="#" className="block text-gray-400 hover:text-cyan-400 transition-all duration-300 transform hover:translate-x-2">
                Group Events
              </a>
              <a href="#" className="block text-gray-400 hover:text-cyan-400 transition-all duration-300 transform hover:translate-x-2">
                Tournaments
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center">
          <p className="text-gray-400">
            © 2024 GameDen. All rights reserved. | Built with passion for gaming
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;