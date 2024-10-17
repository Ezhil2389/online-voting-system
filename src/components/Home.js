import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Vote, PlusCircle, Users, ChevronRight, Calendar, Lock } from 'lucide-react';

const Feature = ({ icon: Icon, title, description }) => (
  <div className="bg-white/50 backdrop-blur-lg p-6 rounded-xl border border-gray-200/50 hover:border-blue-500/30 transition-all duration-300">
    <div className="flex items-start space-x-4">
      <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-3 rounded-lg shadow-lg">
        <Icon size={24} className="text-white" />
      </div>
      <div>
        <h3 className="font-semibold text-gray-900 mb-1">{title}</h3>
        <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
      </div>
    </div>
  </div>
);

const ActionCard = ({ icon: Icon, title, description, onClick, color }) => (
  <div 
    onClick={onClick}
    className="group relative overflow-hidden bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-500 cursor-pointer"
  >
    <div className="absolute inset-0 bg-gradient-to-br from-white to-gray-50 opacity-90" />
    <div className="relative p-8">
      <div className={`inline-flex p-4 rounded-2xl mb-6 ${color} transform group-hover:scale-110 transition-transform duration-300`}>
        <Icon size={32} className="text-white" />
      </div>
      <h2 className="text-2xl font-bold mb-3 text-gray-900">{title}</h2>
      <p className="text-gray-600 mb-6">{description}</p>
      <div className="flex items-center text-blue-600 font-medium group-hover:translate-x-2 transition-transform duration-300">
        <span>Get Started</span>
        <ChevronRight size={20} className="ml-1" />
      </div>
    </div>
  </div>
);

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
            
            <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent"> CloudVote </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Create and participate in secure elections with real-time results and complete transparency.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <ActionCard
            icon={PlusCircle}
            title="Create Election"
            description="Set up a new election in minutes with customizable options and secure participation codes."
            onClick={() => navigate('/create')}
            color="bg-gradient-to-br from-blue-500 to-blue-600"
          />
          <ActionCard
            icon={Vote}
            title="Participate in Election"
            description="Join an existing election using your unique participation code and cast your vote securely."
            onClick={() => navigate('/participate')}
            color="bg-gradient-to-br from-green-500 to-green-600"
          />
        </div>

        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Feature
              icon={Lock}
              title="Secure Voting"
              description="Your vote remains confidential and tamper-proof. "
            />
            <Feature
              icon={Users}
              title="Real-time Results"
              description="Watch live as votes are counted and results are updated instantly."
            />
            <Feature
              icon={Calendar}
              title="Flexible Scheduling"
              description="Set custom start and end dates for your elections with automatic closing."
            />
          </div>
        </div>

        <div className="text-center">
          <p className="text-gray-500 text-sm">
            © 2024 Ezhil R. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}