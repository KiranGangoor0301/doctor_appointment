
-- Insert dummy doctors data
INSERT INTO doctors (name, specialization, age, experience, languages_spoken, hospital, morning_slots, afternoon_slots, evening_slots, available_slots)
VALUES
  ('Dr. John Doe', 'Cardiology', 50, 25, ARRAY['English'], 'City Hospital', ARRAY['08:00 AM', '09:00 AM', '10:00 AM'], ARRAY['01:00 PM', '02:00 PM'], ARRAY['05:00 PM', '06:00 PM'], ARRAY['08:00 AM', '01:00 PM', '05:00 PM']),
  ('Dr. Jane Smith', 'Dermatology', 40, 18, ARRAY['English', 'Spanish'], 'General Hospital', ARRAY['09:00 AM', '10:00 AM', '11:00 AM'], ARRAY['12:00 PM', '01:00 PM', '02:00 PM'], ARRAY['04:00 PM', '05:00 PM', '06:00 PM'], ARRAY['09:00 AM', '12:00 PM', '04:00 PM']),
  ('Dr. Emily Davis', 'Pediatrics', 35, 10, ARRAY['English', 'French'], 'Children\'s Hospital', ARRAY['08:30 AM', '09:30 AM', '10:30 AM'], ARRAY['01:30 PM', '02:30 PM'], ARRAY['05:30 PM', '06:30 PM'], ARRAY['08:30 AM', '01:30 PM', '05:30 PM']);
