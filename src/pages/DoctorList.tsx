import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import Login from './Login';
import { User } from '@supabase/supabase-js';

interface Doctor {
  id: string;
  name: string;
  specialization: string;
  hospital: string;
  profile_image: string;
  city: string;
}

const DoctorList = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [user, setUser] = useState<User | null>(null);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [selectedDoctorId, setSelectedDoctorId] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchDoctors();
    checkUser();
  }, []);

  const fetchDoctors = async () => {
    const { data, error } = await supabase.from('doctors').select('id, name, specialization, hospital, profile_image, city');
    if (error) {
      console.error('Error fetching doctors:', error);
    } else {
      setDoctors(data);
    }
  };

  const checkUser = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    setUser(session?.user || null);
  };

  const handleBookAppointment = (doctorId: string) => {
    if (!user) {
      setSelectedDoctorId(doctorId);
      setShowLoginModal(true);
    } else {
      navigate(`/doctor/${doctorId}`);
    }
  };

  const handleLoginSuccess = () => {
    setShowLoginModal(false);
    checkUser();
    if (selectedDoctorId) {
      navigate(`/doctor/${selectedDoctorId}`);
    }
  };

  const filteredDoctors = doctors.filter(doctor =>
    doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doctor.specialization.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doctor.city.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Select a DocEase Doctor</h1>
      
      <div className="mb-8">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by name, specialization, or city"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredDoctors.length > 0 ? (
          filteredDoctors.map((doctor) => (
            <div key={doctor.id} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={doctor.profile_image}
                  alt={doctor.name}
                  className="w-20 h-20 rounded-full object-cover"
                />
                <div>
                  <h2 className="text-xl font-bold text-gray-900">{doctor.name}</h2>
                  <p className="text-teal-600">{doctor.specialization}</p>
                  <p className="text-gray-600">{doctor.hospital}</p>
                  <p className="text-gray-600">{doctor.city}</p>
                </div>
              </div>
              <button
                onClick={() => handleBookAppointment(doctor.id)}
                className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 text-center block"
              >
                Book Appointment
              </button>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-600 col-span-full">No doctors found</div>
        )}
      </div>

      {showLoginModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
            <h2 className="text-xl font-semibold mb-6 text-center">Please sign in to book an appointment</h2>
            <Login onLoginSuccess={handleLoginSuccess} />
            <button 
              onClick={() => setShowLoginModal(false)} 
              className="mt-4 w-full text-gray-600 hover:underline"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DoctorList;
