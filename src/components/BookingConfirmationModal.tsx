import React from 'react';
import { X, CheckCircle, Gamepad2, Calendar, Clock, Users, User } from 'lucide-react';

interface BookingConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookingDetails: {
    console_type: string;
    date: string;
    time: string;
    duration: number;
    players: number;
    name: string;
  };
}

const BookingConfirmationModal: React.FC<BookingConfirmationModalProps> = ({
  isOpen,
  onClose,
  bookingDetails
}) => {
  if (!isOpen) return null;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getConsoleName = (consoleType: string) => {
    return consoleType === 'ps4' ? 'PlayStation 4' : 'PlayStation 4 Pro';
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gray-900 rounded-2xl border border-gray-700 w-full max-w-lg transform animate-in zoom-in-95 duration-300">
        {/* Header */}
        <div className="relative p-8 text-center border-b border-gray-700">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
          
          <div className="flex items-center justify-center mb-4">
            <div className="bg-gradient-to-r from-green-400 to-emerald-500 rounded-full p-3">
              <CheckCircle className="w-8 h-8 text-white" />
            </div>
          </div>
          
          <h2 className="text-3xl font-bold text-white mb-2">
            ✅ Booking Confirmed!
          </h2>
          
          <p className="text-gray-300 leading-relaxed">
            Thank you for booking with GameDen. Your session has been successfully reserved. 
            Please arrive 10 minutes before your scheduled time. An email confirmation has been sent.
          </p>
        </div>

        {/* Booking Details */}
        <div className="p-8">
          <h3 className="text-xl font-semibold text-white mb-6 text-center">
            Your Booking Details
          </h3>
          
          <div className="space-y-4">
            <div className="flex items-center space-x-4 p-4 bg-gray-800/50 rounded-lg border border-gray-700">
              <div className="bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full p-2">
                <Gamepad2 className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="text-sm text-gray-400">Console</div>
                <div className="text-white font-semibold">{getConsoleName(bookingDetails.console_type)}</div>
              </div>
            </div>

            <div className="flex items-center space-x-4 p-4 bg-gray-800/50 rounded-lg border border-gray-700">
              <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full p-2">
                <Calendar className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="text-sm text-gray-400">Date</div>
                <div className="text-white font-semibold">{formatDate(bookingDetails.date)}</div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-3 p-4 bg-gray-800/50 rounded-lg border border-gray-700">
                <div className="bg-gradient-to-r from-purple-500 to-pink-600 rounded-full p-2">
                  <Clock className="w-4 h-4 text-white" />
                </div>
                <div>
                  <div className="text-xs text-gray-400">Time</div>
                  <div className="text-white font-semibold text-sm">{bookingDetails.time}</div>
                </div>
              </div>

              <div className="flex items-center space-x-3 p-4 bg-gray-800/50 rounded-lg border border-gray-700">
                <div className="bg-gradient-to-r from-orange-500 to-red-600 rounded-full p-2">
                  <Clock className="w-4 h-4 text-white" />
                </div>
                <div>
                  <div className="text-xs text-gray-400">Duration</div>
                  <div className="text-white font-semibold text-sm">
                    {bookingDetails.duration} hour{bookingDetails.duration > 1 ? 's' : ''}
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-3 p-4 bg-gray-800/50 rounded-lg border border-gray-700">
                <div className="bg-gradient-to-r from-green-500 to-teal-600 rounded-full p-2">
                  <Users className="w-4 h-4 text-white" />
                </div>
                <div>
                  <div className="text-xs text-gray-400">Players</div>
                  <div className="text-white font-semibold text-sm">{bookingDetails.players}</div>
                </div>
              </div>

              <div className="flex items-center space-x-3 p-4 bg-gray-800/50 rounded-lg border border-gray-700">
                <div className="bg-gradient-to-r from-yellow-500 to-amber-600 rounded-full p-2">
                  <User className="w-4 h-4 text-white" />
                </div>
                <div>
                  <div className="text-xs text-gray-400">Name</div>
                  <div className="text-white font-semibold text-sm">{bookingDetails.name}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Important Notice */}
          <div className="mt-6 p-4 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-lg border border-cyan-500/30">
            <div className="flex items-start space-x-3">
              <div className="bg-cyan-400 rounded-full p-1 mt-0.5">
                <CheckCircle className="w-3 h-3 text-black" />
              </div>
              <div>
                <h4 className="font-semibold text-cyan-400 text-sm mb-1">Important Reminder</h4>
                <p className="text-gray-300 text-sm">
                  Please arrive 10 minutes early to ensure your gaming session starts on time. 
                  Bring a valid ID for verification.
                </p>
              </div>
            </div>
          </div>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="w-full mt-6 bg-gradient-to-r from-cyan-500 to-purple-600 text-white py-4 rounded-lg font-semibold text-lg hover:from-cyan-400 hover:to-purple-500 transition-all duration-300 transform hover:scale-105"
          >
            Got it, thanks!
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingConfirmationModal;