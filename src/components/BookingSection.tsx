import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Users, Monitor, CheckCircle, AlertCircle, Loader, X } from 'lucide-react';
import { supabase, type Booking } from '../lib/supabase';
import { sendBookingConfirmationEmail } from '../lib/emailService';
import CustomerInfoModal from './CustomerInfoModal';
import BookingConfirmationModal from './BookingConfirmationModal';

const timeSlots = [
  '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM',
  '4:00 PM', '5:00 PM', '6:00 PM', '7:00 PM', '8:00 PM', '9:00 PM'
];

const consoleTypes = [
  { id: 'ps4', name: 'PlayStation 4', description: 'Standard gaming experience' },
  { id: 'ps4-pro', name: 'PlayStation 4 Pro', description: 'Enhanced 4K gaming' }
];

const BookingSection = () => {
  const [selectedConsole, setSelectedConsole] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [duration, setDuration] = useState(1);
  const [players, setPlayers] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [bookedSlots, setBookedSlots] = useState<Set<string>>(new Set());
  const [confirmedBookingDetails, setConfirmedBookingDetails] = useState<any>(null);
  const [showCancelOption, setShowCancelOption] = useState(false);
  const [cancelBookingId, setCancelBookingId] = useState<string | null>(null);

  // Get minimum date (today)
  const getMinDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  // Check availability when console, date, or time changes
  useEffect(() => {
    if (selectedConsole && selectedDate) {
      checkAvailability();
    }
  }, [selectedConsole, selectedDate]);

  const checkAvailability = async () => {
    try {
      const { data, error } = await supabase
        .from('bookings')
        .select('time, duration')
        .eq('console_type', selectedConsole)
        .eq('date', selectedDate);

      if (error) throw error;

      // Create a set of booked time slots considering duration
      const booked = new Set<string>();
      data?.forEach((booking) => {
        const startTime = booking.time;
        const duration = booking.duration;
        
        // Mark all hours as booked based on duration
        const startIndex = timeSlots.indexOf(startTime);
        if (startIndex !== -1) {
          for (let i = 0; i < duration; i++) {
            if (startIndex + i < timeSlots.length) {
              booked.add(timeSlots[startIndex + i]);
            }
          }
        }
      });

      setBookedSlots(booked);
    } catch (error) {
      console.error('Error checking availability:', error);
    }
  };

  const isTimeSlotAvailable = (time: string) => {
    if (!selectedConsole || !selectedDate) return true;
    
    const timeIndex = timeSlots.indexOf(time);
    if (timeIndex === -1) return false;

    // Check if any of the required consecutive slots are booked
    for (let i = 0; i < duration; i++) {
      if (timeIndex + i >= timeSlots.length) return false;
      if (bookedSlots.has(timeSlots[timeIndex + i])) return false;
    }

    return true;
  };

  const getBasePrice = (hours: number) => {
    if (hours === 1) return 100;
    if (hours === 3) return 280;
    if (hours === 5) return 450;
    return hours * 100;
  };

  const getTotalPrice = (hours: number, playerCount: number) => {
    const basePrice = getBasePrice(hours);
    return basePrice * playerCount;
  };

  const sendBookingEmail = async (bookingData: Booking & { total_price: number }) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/send-booking-email`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ booking: bookingData }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Booking email notification failed:', errorData);
      } else {
        const result = await response.json();
        console.log('Booking email notification sent:', result);
      }
    } catch (error) {
      console.error('Error sending booking email notification:', error);
    }
  };

  const cancelBooking = async (bookingId: string) => {
    try {
      setIsLoading(true);
      
      const { error } = await supabase
        .from('bookings')
        .delete()
        .eq('id', bookingId);

      if (error) throw error;

      setMessage({ type: 'success', text: 'Booking cancelled successfully!' });
      setShowCancelOption(false);
      setCancelBookingId(null);
      
      // Refresh availability
      checkAvailability();
      
    } catch (error: any) {
      setMessage({ type: 'error', text: 'Failed to cancel booking. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleBooking = async () => {
    if (!selectedConsole || !selectedDate || !selectedTime) {
      setMessage({ type: 'error', text: 'Please fill in all required fields' });
      return;
    }

    if (!isTimeSlotAvailable(selectedTime)) {
      setMessage({ type: 'error', text: 'That time slot is taken, please choose another' });
      return;
    }

    setMessage(null);
    setIsModalOpen(true);
  };

  const handleCustomerInfoSubmit = async (customerInfo: { name: string; phone: string; email: string }) => {
    setIsLoading(true);
    
    try {
      // Double-check availability before booking
      if (!isTimeSlotAvailable(selectedTime)) {
        throw new Error('That time slot is taken, please choose another');
      }

      const bookingData: Omit<Booking, 'id' | 'created_at'> = {
        console_type: selectedConsole,
        date: selectedDate,
        time: selectedTime,
        duration,
        players,
        name: customerInfo.name,
        phone: customerInfo.phone,
        email: customerInfo.email
      };

      const { data, error } = await supabase
        .from('bookings')
        .insert([bookingData])
        .select()
        .single();

      if (error) throw error;

      // Calculate total price
      const totalPrice = getTotalPrice(duration, players);

      // Send customer email confirmation using EmailJS
      const emailSuccess = await sendBookingConfirmationEmail({
        console_type: selectedConsole,
        date: selectedDate,
        time: selectedTime,
        duration,
        players,
        name: customerInfo.name,
        phone: customerInfo.phone,
        email: customerInfo.email,
        total_price: totalPrice
      });

      if (!emailSuccess) {
        console.warn('Customer email confirmation failed to send, but booking was successful');
      }

      // Send booking email notification using the new edge function
      if (data) {
        sendBookingEmail({
          ...data,
          total_price: totalPrice
        });
      }

      // Store booking details for confirmation modal
      setConfirmedBookingDetails({
        console_type: selectedConsole,
        date: selectedDate,
        time: selectedTime,
        duration,
        players,
        name: customerInfo.name
      });

      // Store booking ID for potential cancellation
      setCancelBookingId(data.id);

      // Close customer info modal and show confirmation modal
      setIsModalOpen(false);
      setIsConfirmationModalOpen(true);
      setShowCancelOption(true);
      
      // Reset form
      setSelectedConsole('');
      setSelectedDate('');
      setSelectedTime('');
      setDuration(1);
      setPlayers(1);
      
      // Clear any previous messages
      setMessage(null);
      
      // Refresh availability
      checkAvailability();
      
    } catch (error: any) {
      setMessage({ 
        type: 'error', 
        text: error.message || 'Failed to create booking. Please try again.' 
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleConfirmationClose = () => {
    setIsConfirmationModalOpen(false);
    setConfirmedBookingDetails(null);
    setShowCancelOption(false);
    setCancelBookingId(null);
  };

  return (
    <section id="booking" className="py-12 sm:py-16 lg:py-20 px-4 bg-gray-900/20">
      <div className="max-w-4xl mx-auto">
        {/* Section Header - Mobile optimized */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent leading-tight">
            Book Your Gaming Session
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed px-2">
            Reserve your spot and get ready for an unforgettable gaming experience
          </p>
        </div>

        {/* Booking Form - Mobile-first design */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 sm:p-6 lg:p-8 border border-gray-700 max-w-2xl mx-auto">
          <h3 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6 flex items-center space-x-2">
            <Calendar className="w-5 h-5 sm:w-6 sm:h-6 text-purple-400" />
            <span>Booking Details</span>
          </h3>

          {message && (
            <div className={`mb-4 sm:mb-6 p-3 sm:p-4 rounded-lg border flex items-start space-x-2 ${
              message.type === 'success' 
                ? 'bg-green-500/20 border-green-500/30 text-green-400' 
                : 'bg-red-500/20 border-red-500/30 text-red-400'
            }`}>
              {message.type === 'success' ? (
                <CheckCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
              ) : (
                <AlertCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
              )}
              <span className="text-sm sm:text-base">{message.text}</span>
            </div>
          )}

          {/* Cancel Booking Option - Mobile optimized */}
          {showCancelOption && cancelBookingId && (
            <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-yellow-500/20 border border-yellow-500/30 rounded-lg">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
                <div className="flex items-center space-x-2">
                  <AlertCircle className="w-5 h-5 text-yellow-400 flex-shrink-0" />
                  <span className="text-yellow-400 font-semibold text-sm sm:text-base">Booked by mistake?</span>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => cancelBooking(cancelBookingId)}
                    disabled={isLoading}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 sm:px-4 py-2 rounded-lg text-sm font-semibold transition-colors disabled:opacity-50 flex items-center space-x-1"
                  >
                    {isLoading ? (
                      <Loader className="w-4 h-4 animate-spin" />
                    ) : (
                      <X className="w-4 h-4" />
                    )}
                    <span>Cancel Booking</span>
                  </button>
                  <button
                    onClick={() => {
                      setShowCancelOption(false);
                      setCancelBookingId(null);
                    }}
                    className="text-gray-400 hover:text-white transition-colors p-1"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <p className="text-yellow-300 text-xs sm:text-sm mt-2">
                You can cancel your booking within a few minutes of booking if it was made by mistake.
              </p>
            </div>
          )}

          <div className="space-y-4 sm:space-y-6">
            {/* Console Selection - Mobile optimized */}
            <div>
              <label className="block text-gray-300 mb-2 sm:mb-3 flex items-center space-x-2 text-sm sm:text-base">
                <Monitor className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>Select Console</span>
              </label>
              <div className="grid grid-cols-1 gap-3">
                {consoleTypes.map((console) => (
                  <button
                    key={console.id}
                    onClick={() => setSelectedConsole(console.id)}
                    className={`p-3 sm:p-4 rounded-lg border-2 text-left transition-all duration-300 ${
                      selectedConsole === console.id
                        ? 'border-cyan-400 bg-cyan-400/10'
                        : 'border-gray-600 bg-gray-700/50 hover:border-gray-500'
                    }`}
                  >
                    <div className="font-semibold text-white text-sm sm:text-base">{console.name}</div>
                    <div className="text-xs sm:text-sm text-gray-400">{console.description}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Date Selection - Mobile optimized */}
            <div>
              <label className="block text-gray-300 mb-2 text-sm sm:text-base">Select Date</label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                min={getMinDate()}
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 sm:px-4 py-2 sm:py-3 text-white focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 outline-none text-sm sm:text-base"
              />
            </div>

            {/* Time Selection - Mobile-first grid */}
            <div>
              <label className="block text-gray-300 mb-2 text-sm sm:text-base">Select Time</label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {timeSlots.map((time) => {
                  const isAvailable = isTimeSlotAvailable(time);
                  return (
                    <button
                      key={time}
                      onClick={() => isAvailable && setSelectedTime(time)}
                      disabled={!isAvailable}
                      className={`py-2 px-2 sm:px-3 rounded-lg text-xs sm:text-sm font-medium transition-all duration-300 ${
                        selectedTime === time
                          ? 'bg-cyan-400 text-black'
                          : isAvailable
                          ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                          : 'bg-gray-800 text-gray-500 cursor-not-allowed opacity-50'
                      }`}
                    >
                      {time}
                      {!isAvailable && selectedConsole && selectedDate && (
                        <div className="text-xs text-red-400">Booked</div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Duration and Players - Mobile stacked layout */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-300 mb-2 text-sm sm:text-base">Duration</label>
                <select
                  value={duration}
                  onChange={(e) => setDuration(Number(e.target.value))}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 sm:px-4 py-2 sm:py-3 text-white focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 outline-none text-sm sm:text-base"
                >
                  <option value={1}>1 Hour - ₹100</option>
                  <option value={3}>3 Hours - ₹280</option>
                  <option value={5}>5 Hours (Day Pass) - ₹450</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-300 mb-2 text-sm sm:text-base">Players</label>
                <select
                  value={players}
                  onChange={(e) => setPlayers(Number(e.target.value))}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 sm:px-4 py-2 sm:py-3 text-white focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 outline-none text-sm sm:text-base"
                >
                  <option value={1}>1 player</option>
                  <option value={2}>2 players (2x cost)</option>
                  <option value={3}>3 players (3x cost)</option>
                  <option value={4}>4 players (4x cost)</option>
                </select>
              </div>
            </div>

            {/* Player Cost Info - Mobile optimized */}
            {players > 1 && (
              <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg p-3 sm:p-4 border border-blue-500/30">
                <h4 className="font-semibold text-blue-400 mb-2 flex items-center space-x-2 text-sm sm:text-base">
                  <Users className="w-4 h-4" />
                  <span>Multiplayer Pricing</span>
                </h4>
                <p className="text-gray-300 text-xs sm:text-sm">
                  {players === 2 && "2 players = Double the base price"}
                  {players === 3 && "3 players = Triple the base price"}
                  {players === 4 && "4 players = Quadruple the base price"}
                </p>
              </div>
            )}

            {/* Bonus Level Info - Mobile optimized */}
            {duration >= 3 && (
              <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-lg p-3 sm:p-4 border border-yellow-500/30">
                <h4 className="font-semibold text-yellow-400 mb-2 flex items-center space-x-2 text-sm sm:text-base">
                  <span>🌟</span>
                  <span>Unlock Bonus Level!</span>
                </h4>
                <p className="text-gray-300 text-xs sm:text-sm">
                  {duration === 3 && "Play 3 Hours? Get 15 mins free!!"}
                  {duration === 5 && "Play 5 Hours? Get 30 mins free!!"}
                </p>
              </div>
            )}

            {/* Total Cost - Mobile optimized */}
            <div className="bg-gray-700/50 rounded-lg p-3 sm:p-4 border border-gray-600">
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs sm:text-sm text-gray-400">
                  <span>Base Price ({duration} hour{duration > 1 ? 's' : ''}):</span>
                  <span>₹{getBasePrice(duration)}</span>
                </div>
                <div className="flex justify-between items-center text-xs sm:text-sm text-gray-400">
                  <span>Players:</span>
                  <span>{players}x</span>
                </div>
                <div className="border-t border-gray-600 pt-2">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300 font-semibold text-sm sm:text-lg">Total Cost:</span>
                    <span className="text-xl sm:text-2xl font-bold text-cyan-400">
                      ₹{getTotalPrice(duration, players)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Book Button - Mobile optimized */}
            <button
              onClick={handleBooking}
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-cyan-500 to-purple-600 text-white py-3 sm:py-4 rounded-lg font-semibold text-base sm:text-lg hover:from-cyan-400 hover:to-purple-500 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:transform-none flex items-center justify-center space-x-2"
            >
              {isLoading ? (
                <>
                  <Loader className="w-5 h-5 animate-spin" />
                  <span>Processing...</span>
                </>
              ) : (
                <span>Confirm Booking</span>
              )}
            </button>
          </div>
        </div>
      </div>

      <CustomerInfoModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCustomerInfoSubmit}
        isLoading={isLoading}
      />

      <BookingConfirmationModal
        isOpen={isConfirmationModalOpen}
        onClose={handleConfirmationClose}
        bookingDetails={confirmedBookingDetails}
      />
    </section>
  );
};

export default BookingSection;