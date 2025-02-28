
-- Verify appointments table
SELECT * FROM appointments;

-- Ensure foreign key constraint is correctly set
ALTER TABLE appointments
  ADD CONSTRAINT fk_doctor
  FOREIGN KEY (doctor_id)
  REFERENCES doctors(id)
  ON DELETE CASCADE;

-- Ensure status column has correct values
ALTER TABLE appointments
  ADD CONSTRAINT chk_status
  CHECK (status IN ('Booked', 'Completed', 'Cancelled'));
