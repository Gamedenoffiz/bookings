import { corsHeaders } from '../_shared/cors.ts';

interface BookingData {
  console_type: string;
  date: string;
  time: string;
  duration: number;
  players: number;
  name: string;
  phone: string;
  email: string;
  created_at: string;
  total_price: number;
}

Deno.serve(async (req: Request) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    console.log('Processing booking email request');

    const { booking }: { booking: BookingData } = await req.json();
    console.log('Processing booking email for:', booking.name, 'Email:', booking.email);

    // Format the date for better readability
    const formattedDate = new Date(booking.date).toLocaleDateString('en-IN', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    // Format the created_at timestamp in Indian Standard Time (IST)
    const formattedCreatedAt = new Date(booking.created_at).toLocaleString('en-IN', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      timeZone: 'Asia/Kolkata'
    });

    // Get console name
    const consoleName = booking.console_type === 'ps4' ? 'PlayStation 4' : 'PlayStation 4 Pro';

    // Create detailed booking notification for GameDen admin
    const adminNotificationSubject = '🎮 New GameDen Booking - Action Required';
    const adminNotificationBody = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #0a0a0a; color: #ffffff;">
        <div style="background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%); border-radius: 15px; padding: 30px; box-shadow: 0 10px 30px rgba(0, 212, 255, 0.3);">
          
          <!-- Header -->
          <div style="text-align: center; margin-bottom: 30px; border-bottom: 2px solid #00d4ff; padding-bottom: 20px;">
            <h1 style="color: #00d4ff; margin: 0; font-size: 28px; text-shadow: 0 0 10px rgba(0, 212, 255, 0.5);">
              🎮 GameDen - New Booking Alert!
            </h1>
            <p style="color: #8b5cf6; margin: 10px 0 0 0; font-size: 16px;">A new gaming session has been booked</p>
          </div>

          <!-- Booking Details Card -->
          <div style="background-color: rgba(255, 255, 255, 0.05); border-radius: 12px; padding: 25px; margin-bottom: 25px; border: 1px solid rgba(0, 212, 255, 0.3);">
            <h2 style="color: #00d4ff; margin-top: 0; margin-bottom: 20px; font-size: 22px; display: flex; align-items: center;">
              🎯 Booking Details
            </h2>
            
            <table style="width: 100%; border-collapse: collapse;">
              <tr style="border-bottom: 1px solid rgba(255, 255, 255, 0.1);">
                <td style="padding: 12px 0; font-weight: bold; color: #00d4ff; width: 35%;">🎮 Console:</td>
                <td style="padding: 12px 0; color: #ffffff; font-size: 16px;">${consoleName}</td>
              </tr>
              <tr style="border-bottom: 1px solid rgba(255, 255, 255, 0.1);">
                <td style="padding: 12px 0; font-weight: bold; color: #00d4ff;">📅 Date:</td>
                <td style="padding: 12px 0; color: #ffffff; font-size: 16px;">${formattedDate}</td>
              </tr>
              <tr style="border-bottom: 1px solid rgba(255, 255, 255, 0.1);">
                <td style="padding: 12px 0; font-weight: bold; color: #00d4ff;">⏰ Time:</td>
                <td style="padding: 12px 0; color: #ffffff; font-size: 16px;">${booking.time}</td>
              </tr>
              <tr style="border-bottom: 1px solid rgba(255, 255, 255, 0.1);">
                <td style="padding: 12px 0; font-weight: bold; color: #00d4ff;">⏱ Duration:</td>
                <td style="padding: 12px 0; color: #ffffff; font-size: 16px;">${booking.duration} hour${booking.duration > 1 ? 's' : ''}</td>
              </tr>
              <tr style="border-bottom: 1px solid rgba(255, 255, 255, 0.1);">
                <td style="padding: 12px 0; font-weight: bold; color: #00d4ff;">👥 Players:</td>
                <td style="padding: 12px 0; color: #ffffff; font-size: 16px;">${booking.players}</td>
              </tr>
              <tr>
                <td style="padding: 12px 0; font-weight: bold; color: #00d4ff;">💰 Total Amount:</td>
                <td style="padding: 12px 0; color: #00ff88; font-weight: bold; font-size: 20px;">₹${booking.total_price}</td>
              </tr>
            </table>
          </div>

          <!-- Customer Information Card -->
          <div style="background-color: rgba(139, 92, 246, 0.1); border-radius: 12px; padding: 25px; margin-bottom: 25px; border: 1px solid rgba(139, 92, 246, 0.3);">
            <h2 style="color: #8b5cf6; margin-top: 0; margin-bottom: 20px; font-size: 22px;">
              👤 Customer Information
            </h2>
            
            <table style="width: 100%; border-collapse: collapse;">
              <tr style="border-bottom: 1px solid rgba(255, 255, 255, 0.1);">
                <td style="padding: 12px 0; font-weight: bold; color: #8b5cf6; width: 35%;">👤 Name:</td>
                <td style="padding: 12px 0; color: #ffffff; font-size: 16px;">${booking.name}</td>
              </tr>
              <tr style="border-bottom: 1px solid rgba(255, 255, 255, 0.1);">
                <td style="padding: 12px 0; font-weight: bold; color: #8b5cf6;">📞 Phone:</td>
                <td style="padding: 12px 0; color: #ffffff; font-size: 16px;">
                  <a href="tel:${booking.phone}" style="color: #00d4ff; text-decoration: none;">${booking.phone}</a>
                </td>
              </tr>
              <tr>
                <td style="padding: 12px 0; font-weight: bold; color: #8b5cf6;">✉️ Email:</td>
                <td style="padding: 12px 0; color: #ffffff; font-size: 16px;">
                  <a href="mailto:${booking.email}" style="color: #00d4ff; text-decoration: none;">${booking.email}</a>
                </td>
              </tr>
            </table>
          </div>

          <!-- Bonus Information -->
          ${booking.duration >= 3 ? `
          <div style="background: linear-gradient(45deg, #ffd700, #ffed4e); border-radius: 12px; padding: 20px; margin-bottom: 25px; text-align: center;">
            <h3 style="color: #000; margin: 0; font-size: 18px;">
              🌟 Bonus Level Unlocked! 
              ${booking.duration === 3 ? 'Customer gets 15 minutes free!' : 'Customer gets 30 minutes free!'}
            </h3>
          </div>
          ` : ''}

          <!-- Timestamp -->
          <div style="background-color: rgba(255, 255, 255, 0.05); border-radius: 8px; padding: 15px; text-align: center; border: 1px solid rgba(255, 255, 255, 0.1);">
            <p style="margin: 0; color: #00ff88; font-weight: bold; font-size: 16px;">
              📥 Booking Received: ${formattedCreatedAt} (IST)
            </p>
          </div>

          <!-- Footer -->
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid rgba(255, 255, 255, 0.1); text-align: center;">
            <p style="margin: 0; color: #8b5cf6; font-size: 14px;">
              🎮 GameDen Gaming Lounge - Where Gaming Dreams Come True
            </p>
            <p style="margin: 5px 0 0 0; color: #666; font-size: 12px;">
              This booking was automatically generated from the GameDen website.
            </p>
          </div>
        </div>
      </div>
    `;

    // Log detailed booking information for admin (visible in Supabase function logs)
    console.log('🎮 NEW GAMEDEN BOOKING RECEIVED 🎮');
    console.log('=====================================');
    console.log('📅 Booking Date:', formattedDate);
    console.log('⏰ Time Slot:', booking.time);
    console.log('⏱ Duration:', booking.duration, 'hour(s)');
    console.log('🎮 Console:', consoleName);
    console.log('👥 Players:', booking.players);
    console.log('💰 Total Amount: ₹' + booking.total_price);
    console.log('👤 Customer Name:', booking.name);
    console.log('📞 Phone:', booking.phone);
    console.log('✉️ Email:', booking.email);
    console.log('📥 Received At:', formattedCreatedAt, '(IST)');
    console.log('=====================================');

    // Return success response with detailed booking information
    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'New GameDen booking processed successfully',
        booking_details: {
          customer_name: booking.name,
          customer_email: booking.email,
          customer_phone: booking.phone,
          console_type: consoleName,
          date: formattedDate,
          time: booking.time,
          duration: booking.duration,
          players: booking.players,
          total_price: booking.total_price,
          received_at: formattedCreatedAt,
          bonus_time: booking.duration >= 3 ? (booking.duration === 3 ? '15 minutes' : '30 minutes') : 'None'
        }
      }),
      {
        status: 200,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      }
    );

  } catch (error) {
    console.error('❌ Error processing GameDen booking:', error);
    
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message || 'Failed to process GameDen booking' 
      }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      }
    );
  }
});