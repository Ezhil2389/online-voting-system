import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../SupabaseClient';
import { ArrowLeft, PlusCircle, Copy, Calendar, Type, AlignLeft, List, Check } from 'lucide-react';

const InputGroup = ({ icon: Icon, label, children }) => (
  <div className="space-y-2">
    <label className="flex items-center text-sm font-medium text-gray-700">
      <Icon size={16} className="mr-2 text-blue-600" />
      {label}
    </label>
    {children}
  </div>
);

export default function CreateElection() {
  const navigate = useNavigate();
  const [electionData, setElectionData] = useState({
    title: '',
    description: '',
    options: ['', ''],
    endDate: ''
  });
  const [participationCode, setParticipationCode] = useState('');
  const [isCreated, setIsCreated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);

  const generateParticipationCode = () => {
    return Math.floor(10000 + Math.random() * 90000).toString();
  };

  const handleCreateElection = async () => {
    setIsLoading(true);
    try {
      const code = generateParticipationCode();
      const { error } = await supabase
        .from('elections')
        .insert([{
          title: electionData.title,
          description: electionData.description,
          options: electionData.options,
          end_date: electionData.endDate,
          participation_code: code,
          created_at: new Date(),
          status: 'active',
          votes: electionData.options.map(() => 0)
        }]);

      if (error) throw error;
      setParticipationCode(code);
      setIsCreated(true);
    } catch (error) {
      console.error('Error creating election:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(participationCode);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  if (isCreated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-8">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8 transform animate-fade-in-up">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Check size={32} className="text-green-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Election Created Successfully!
              </h2>
              <div className="mb-8">
                <p className="text-gray-600 mb-4">Your participation code is:</p>
                <div className="flex items-center justify-center gap-3">
                  <code className="text-3xl font-bold bg-gray-50 px-6 py-3 rounded-lg tracking-wide">
                    {participationCode}
                  </code>
                  <button
                    onClick={handleCopyCode}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors relative"
                  >
                    {copySuccess ? (
                      <Check size={20} className="text-green-600" />
                    ) : (
                      <Copy size={20} className="text-gray-600" />
                    )}
                  </button>
                </div>
                {copySuccess && (
                  <p className="text-green-600 text-sm mt-2">Code copied!</p>
                )}
              </div>
              <button
                onClick={() => navigate('/')}
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <ArrowLeft size={20} className="mr-2" />
                Back to Home
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-8">
      <div className="max-w-2xl mx-auto">
        <button
          onClick={() => navigate('/')}
          className="flex items-center text-gray-600 hover:text-gray-900 mb-8 transition-colors"
        >
          <ArrowLeft size={20} className="mr-2" />
          Back to Home
        </button>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Create New Election</h2>
          
          <div className="space-y-6">
            <InputGroup icon={Type} label="Election Title">
              <input
                type="text"
                value={electionData.title}
                onChange={(e) => setElectionData({...electionData, title: e.target.value})}
                className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
                placeholder="Enter a descriptive title"
              />
            </InputGroup>

            <InputGroup icon={AlignLeft} label="Description">
              <textarea
                value={electionData.description}
                onChange={(e) => setElectionData({...electionData, description: e.target.value})}
                className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
                placeholder="Provide details about the election"
                rows={4}
              />
            </InputGroup>

            <InputGroup icon={List} label="Options">
              <div className="space-y-3">
                {electionData.options.map((option, idx) => (
                  <input
                    key={idx}
                    type="text"
                    value={option}
                    onChange={(e) => {
                      const newOptions = [...electionData.options];
                      newOptions[idx] = e.target.value;
                      setElectionData({...electionData, options: newOptions});
                    }}
                    className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
                    placeholder={`Option ${idx + 1}`}
                  />
                ))}
                <button
                  onClick={() => setElectionData({
                    ...electionData,
                    options: [...electionData.options, '']
                  })}
                  className="flex items-center text-blue-600 hover:text-blue-700 transition-colors"
                >
                  <PlusCircle size={20} className="mr-2" />
                  Add Option
                </button>
              </div>
            </InputGroup>

            <InputGroup icon={Calendar} label="End Date">
              <input
                type="date"
                value={electionData.endDate}
                onChange={(e) => setElectionData({...electionData, endDate: e.target.value})}
                className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
                min={new Date().toISOString().split('T')[0]}
              />
            </InputGroup>

            <button
              onClick={handleCreateElection}
              disabled={isLoading}
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Creating...' : 'Create Election'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}