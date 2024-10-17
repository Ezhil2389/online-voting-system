import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import CreateElection from './components/CreateElection';
import ParticipateElection from './components/ParticipateElection';
import VotingPage from './components/VotingPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<CreateElection />} />
          <Route path="/participate" element={<ParticipateElection />} />
          <Route path="/vote/:electionId" element={<VotingPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;