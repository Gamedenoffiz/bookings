import emailjs from '@emailjs/browser';

// EmailJS configuration
const EMAILJS_SERVICE_ID = 'service_unr0uv9';
const EMAILJS_TEMPLATE_ID = 'template_vjopatc';
const EMAILJS_PUBLIC_KEY = 'la7J5jbKPU0abiWGL';

// Initialize EmailJS
emailjs.init(EMAILJS_PUBLIC_KEY);

export interface BookingEmailData {
  console_type: string;
  date: string;
  time: string;
  duration: number;
  players: number;
  name: string;
  phone: string;
  email: string;
  total_price: number;
}

export const sendBookingConfirmationEmail = async (bookingData: BookingEmailData): Promise<boolean> => {
  try {
    // Format the date for better readability
    const formattedDate = new Date(bookingData.date).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    // Get console name
    const consoleName = bookingData.console_type === 'ps4' ? 'PlayStation 4' : 'PlayStation 4 Pro';

    // Get current timestamp
    const currentTime = new Date().toLocaleString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      timeZoneName: 'short'
    });

    // Prepare template parameters
    const templateParams = {
      to_email: bookingData.email,
      to_name: bookingData.name,
      customer_name: bookingData.name,
      customer_phone: bookingData.phone,
      customer_email: bookingData.email,
      console_type: consoleName,
      booking_date: formattedDate,
      booking_time: bookingData.time,
      duration: bookingData.duration,
      duration_text: `${bookingData.duration} hour${bookingData.duration > 1 ? 's' : ''}`,
      players: bookingData.players,
      total_price: bookingData.total_price,
      booking_timestamp: currentTime,
      bonus_message: bookingData.duration >= 3 ? 
        (bookingData.duration === 3 ? 'You get 15 minutes of free gaming time!' : 'You get 30 minutes of free gaming time!') : '',
      has_bonus: bookingData.duration >= 3 ? 'yes' : 'no'
    };

    console.log('Sending email with EmailJS...', templateParams);

    // Send email using EmailJS
    const response = await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      templateParams
    );

    console.log('Email sent successfully:', response);
    return true;

  } catch (error) {
    console.error('Failed to send email:', error);
    return false;
  }
};