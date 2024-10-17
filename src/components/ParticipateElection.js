import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../SupabaseClient';
import { ArrowLeft } from 'lucide-react';

const ParticipateElection = () => {
  const navigate = useNavigate();
  const [participationCode, setParticipationCode] = useState('');
  const [error, setError] = useState('');

  const handleJoinElection = async () => {
    try {
      const { data, error } = await supabase
        .from('elections')
        .select('id')
        .eq('participation_code', participationCode)
        .single();

      if (error) {
        setError('Invalid participation code. Please try again.');
        return;
      }

      navigate(`/vote/${data.id}`);
    } catch (error) {
      console.error('Error joining election:', error);
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-lg mx-auto">
        <button
          onClick={() => navigate('/')}
          className="flex items-center text-gray-600 hover:text-gray-900 mb-8"
        >
          <ArrowLeft size={20} className="mr-2" />
          Back to Home
        </button>

        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-semibold mb-6">Join an Election</h2>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Participation Code
              </label>
              <input
                type="text"
                value={participationCode}
                onChange={(e) => setParticipationCode(e.target.value)}
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter 5-digit code"
                maxLength={5}
              />
            </div>

            {error && (
              <div className="text-red-600 text-sm">
                {error}
              </div>
            )}

            <button
              onClick={handleJoinElection}
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Join Election
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParticipateElection;