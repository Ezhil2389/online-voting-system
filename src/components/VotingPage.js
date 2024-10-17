import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../SupabaseClient';
import { ArrowLeft, Check } from 'lucide-react';

const VotingPage = () => {
  const { electionId } = useParams();
  const navigate = useNavigate();
  const [election, setElection] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [hasVoted, setHasVoted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchElection = async () => {
      try {
        const { data, error } = await supabase
          .from('elections')
          .select('*')
          .eq('id', electionId)
          .single();

        if (error) throw error;

        if (data) {
          setElection(data);
        } else {
          setError('Election not found');
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching election:', error);
        setError('Error loading election');
        setLoading(false);
      }
    };

    fetchElection();
  }, [electionId]);

  const handleVote = async () => {
    if (selectedOption === null) {
      setError('Please select an option');
      return;
    }

    try {
      const newVotes = [...election.votes];
      newVotes[selectedOption]++;

      const { error } = await supabase
        .from('elections')
        .update({ votes: newVotes })
        .eq('id', electionId);

      if (error) throw error;

      setElection({
        ...election,
        votes: newVotes
      });
      setHasVoted(true);
    } catch (error) {
      console.error('Error submitting vote:', error);
      setError('Error submitting vote. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-8 flex items-center justify-center">
        <div className="text-gray-600">Loading election...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <div className="text-red-600 mb-4">{error}</div>
            <button
              onClick={() => navigate('/')}
              className="text-blue-600 hover:text-blue-700"
            >
              Return to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!election) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <div className="text-gray-600 mb-4">Election not found</div>
            <button
              onClick={() => navigate('/')}
              className="text-blue-600 hover:text-blue-700"
            >
              Return to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  const totalVotes = election.votes.reduce((a, b) => a + b, 0);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-2xl mx-auto">
        <button
          onClick={() => navigate('/')}
          className="flex items-center text-gray-600 hover:text-gray-900 mb-8"
        >
          <ArrowLeft size={20} className="mr-2" />
          Back to Home
        </button>

        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-semibold mb-2">{election.title}</h2>
          <p className="text-gray-600 mb-6">{election.description}</p>

          {hasVoted ? (
            <div>
              <div className="mb-4 flex items-center justify-center text-green-600 gap-2">
                <Check size={20} />
                <span>Thank you for voting!</span>
              </div>
              
              <div className="space-y-4">
                {election.options.map((option, idx) => {
                  const percentage = totalVotes ? Math.round((election.votes[idx] / totalVotes) * 100) : 0;
                  
                  return (
                    <div key={idx} className="relative">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium text-gray-700">{option}</span>
                        <span className="text-sm text-gray-500">
                          {election.votes[idx]} votes ({percentage}%)
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
              
              <div className="mt-6 text-center text-gray-600">
                Total votes: {totalVotes}
              </div>
            </div>
          ) : (
            <div>
              <div className="space-y-3">
                {election.options.map((option, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedOption(idx)}
                    className={`w-full p-4 rounded-lg border-2 text-left transition-colors ${
                      selectedOption === idx 
                        ? 'border-blue-600 bg-blue-50' 
                        : 'border-gray-200 hover:border-blue-300'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>

              {error && (
                <div className="text-red-600 text-sm mt-4">
                  {error}
                </div>
              )}

              <button
                onClick={handleVote}
                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors mt-6"
              >
                Submit Vote
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VotingPage;