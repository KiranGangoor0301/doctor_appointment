import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';

interface Doctor {
  id: string;
  name: string;
  specialization: string;
  hospital: string;
  profile_image: string;
}

const DoctorList = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    const { data, error } = await supabase.from('doctors').select('*');
    if (error) {
      console.error('Error fetching doctors:', error);
    } else {
      setDoctors(data);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Select a DocEase Doctor</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {doctors.map((doctor) => (
          <div key={doctor.id} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center gap-4">
              <img
                src={doctor.profile_image}
                alt={doctor.name}
                className="w-16 h-16 rounded-lg object-cover"
              />
              <div>
                <h2 className="text-xl font-bold">{doctor.name}</h2>
                <p className="text-gray-600">{doctor.specialization}</p>
                <p className="text-gray-600">{doctor.hospital}</p>
              </div>
            </div>
            <Link
              to={`/doctor/${doctor.id}`}
              className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 text-center block"
            >
              Book Appointment
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorList;
