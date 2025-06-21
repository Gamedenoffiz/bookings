import React, { useState } from 'react';
import { X, User, Phone, Mail, Loader } from 'lucide-react';

interface CustomerInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (customerInfo: { name: string; phone: string; email: string }) => void;
  isLoading: boolean;
}

const CustomerInfoModal: React.FC<CustomerInfoModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  isLoading
}) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!name.trim()) {
      newErrors.name = 'Full name is required';
    }

    if (!phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\+?[\d\s-()]{10,}$/.test(phone.trim())) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    if (!email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      newErrors.email = 'Please enter a valid email address';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit({
        name: name.trim(),
        phone: phone.trim(),
        email: email.trim()
      });
    }
  };

  const handleClose = () => {
    if (!isLoading) {
      setName('');
      setPhone('');
      setEmail('');
      setErrors({});
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gray-900 rounded-xl border border-gray-700 w-full max-w-md mx-4">
        {/* Modal Header - Mobile optimized */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-700">
          <h3 className="text-lg sm:text-xl font-bold text-white">Complete Your Booking</h3>
          <button
            onClick={handleClose}
            disabled={isLoading}
            className="text-gray-400 hover:text-white transition-colors disabled:opacity-50 p-1"
          >
            <X className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>

        {/* Modal Content - Mobile optimized */}
        <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-4">
          <p className="text-gray-300 mb-4 sm:mb-6 text-sm sm:text-base">
            Please provide your contact information to confirm your gaming session.
          </p>

          {/* Name Field */}
          <div>
            <label className="block text-gray-300 mb-2 flex items-center space-x-2 text-sm sm:text-base">
              <User className="w-4 h-4" />
              <span>Full Name</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={`w-full bg-gray-800 border rounded-lg px-3 sm:px-4 py-2 sm:py-3 text-white focus:ring-1 focus:ring-cyan-400 outline-none transition-colors text-sm sm:text-base ${
                errors.name ? 'border-red-500' : 'border-gray-600 focus:border-cyan-400'
              }`}
              placeholder="Enter your full name"
              disabled={isLoading}
            />
            {errors.name && <p className="text-red-400 text-xs sm:text-sm mt-1">{errors.name}</p>}
          </div>

          {/* Phone Field */}
          <div>
            <label className="block text-gray-300 mb-2 flex items-center space-x-2 text-sm sm:text-base">
              <Phone className="w-4 h-4" />
              <span>Phone Number</span>
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className={`w-full bg-gray-800 border rounded-lg px-3 sm:px-4 py-2 sm:py-3 text-white focus:ring-1 focus:ring-cyan-400 outline-none transition-colors text-sm sm:text-base ${
                errors.phone ? 'border-red-500' : 'border-gray-600 focus:border-cyan-400'
              }`}
              placeholder="Enter your phone number"
              disabled={isLoading}
            />
            {errors.phone && <p className="text-red-400 text-xs sm:text-sm mt-1">{errors.phone}</p>}
          </div>

          {/* Email Field */}
          <div>
            <label className="block text-gray-300 mb-2 flex items-center space-x-2 text-sm sm:text-base">
              <Mail className="w-4 h-4" />
              <span>Email Address</span>
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full bg-gray-800 border rounded-lg px-3 sm:px-4 py-2 sm:py-3 text-white focus:ring-1 focus:ring-cyan-400 outline-none transition-colors text-sm sm:text-base ${
                errors.email ? 'border-red-500' : 'border-gray-600 focus:border-cyan-400'
              }`}
              placeholder="Enter your email address"
              disabled={isLoading}
            />
            {errors.email && <p className="text-red-400 text-xs sm:text-sm mt-1">{errors.email}</p>}
          </div>

          {/* Action Buttons - Mobile optimized */}
          <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3 pt-4">
            <button
              type="button"
              onClick={handleClose}
              disabled={isLoading}
              className="flex-1 bg-gray-700 text-gray-300 py-2 sm:py-3 rounded-lg font-semibold hover:bg-gray-600 transition-colors disabled:opacity-50 text-sm sm:text-base"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 bg-gradient-to-r from-cyan-500 to-purple-600 text-white py-2 sm:py-3 rounded-lg font-semibold hover:from-cyan-400 hover:to-purple-500 transition-all duration-300 disabled:opacity-50 flex items-center justify-center space-x-2 text-sm sm:text-base"
            >
              {isLoading ? (
                <>
                  <Loader className="w-4 h-4 animate-spin" />
                  <span>Booking...</span>
                </>
              ) : (
                <span>Confirm Booking</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CustomerInfoModal;