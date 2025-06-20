/*
  # Create bookings table for GameDen booking system

  1. New Tables
    - `bookings`
      - `id` (uuid, primary key)
      - `console_type` (text) - PlayStation 4 or PlayStation 4 Pro
      - `date` (date) - booking date
      - `time` (text) - time slot (e.g., "10:00 AM")
      - `duration` (integer) - duration in hours
      - `players` (integer) - number of players (1-4)
      - `name` (text) - customer full name
      - `phone` (text) - customer phone number
      - `email` (text) - customer email address
      - `created_at` (timestamptz) - when booking was created

  2. Security
    - Enable RLS on `bookings` table
    - Add policy for public read access (to check availability)
    - Add policy for public insert access (to create bookings)
*/

CREATE TABLE IF NOT EXISTS bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  console_type text NOT NULL,
  date date NOT NULL,
  time text NOT NULL,
  duration integer NOT NULL,
  players integer NOT NULL,
  name text NOT NULL,
  phone text NOT NULL,
  email text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

-- Allow public read access to check availability
CREATE POLICY "Allow public read access"
  ON bookings
  FOR SELECT
  TO anon
  USING (true);

-- Allow public insert access to create bookings
CREATE POLICY "Allow public insert access"
  ON bookings
  FOR INSERT
  TO anon
  WITH CHECK (true);