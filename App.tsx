import React, { useState } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import EntryForm from './components/EntryForm';
import Quiz from './components/Quiz';
import Admin from './components/Admin';
import { determineTeam, saveParticipant } from './services/storage';
import { Team } from './types';
import { PartyPopper } from 'lucide-react';
import { GLSLHills } from './components/ui/glsl-hills';

const AppContent: React.FC = () => {
  // Application State for Student Flow
  const [step, setStep] = useState<'entry' | 'quiz' | 'result'>('entry');
  const [studentDetails, setStudentDetails] = useState<{name: string, roll: string, prefix: string, suffix: string} | null>(null);
  const [assignedTeam, setAssignedTeam] = useState<Team | null>(null);

  const handleStartQuiz = (name: string, rollPrefix: string, rollSuffix: string) => {
    setStudentDetails({
      name,
      prefix: rollPrefix,
      suffix: rollSuffix,
      roll: `${rollPrefix}${rollSuffix}`
    });
    setStep('quiz');
  };

  const handleQuizComplete = (scoreA: number, scoreB: number) => {
    if (!studentDetails) return;

    const team = determineTeam(scoreA, scoreB);
    setAssignedTeam(team);

    // Robust ID generation
    const id = typeof crypto !== 'undefined' && crypto.randomUUID 
      ? crypto.randomUUID() 
      : `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

    // Save to storage
    saveParticipant({
      id: id,
      name: studentDetails.name,
      rollNumberPrefix: studentDetails.prefix,
      rollNumberSuffix: studentDetails.suffix,
      fullRollNumber: studentDetails.roll,
      team: team,
      timestamp: Date.now()
    });

    setStep('result');
  };

  if (step === 'result' && assignedTeam) {
    return (
      <div className="flex flex-col items-center justify-center p-4 text-white text-center min-h-[80vh]">
        <div className="max-w-lg w-full bg-white/10 backdrop-blur-md border border-white/20 p-10 rounded-3xl shadow-2xl animate-in fade-in zoom-in duration-500">
          <div className="flex justify-center mb-6">
            <PartyPopper size={64} className="text-yellow-400 animate-bounce" />
          </div>
          <h1 className="text-3xl font-bold mb-2">Congratulations, {studentDetails?.name}!</h1>
          <p className="text-indigo-200 mb-8">You have been successfully sorted.</p>
          
          <div className="bg-white text-gray-900 p-8 rounded-2xl shadow-inner mb-6 transform hover:scale-105 transition-transform duration-300">
            <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">Your Tribe Is</p>
            <h2 className={`text-4xl font-black ${assignedTeam === Team.A ? 'text-indigo-600' : 'text-teal-600'}`}>
              {assignedTeam}
            </h2>
          </div>
          
          <p className="text-sm text-indigo-300">Wait for further instructions from the coordinator.</p>
        </div>
      </div>
    );
  }

  if (step === 'quiz') {
    return <Quiz onComplete={handleQuizComplete} />;
  }

  return <EntryForm onStartQuiz={handleStartQuiz} />;
};

const App: React.FC = () => {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-slate-950 text-gray-900">
      {/* Global Background Animation */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <GLSLHills />
      </div>

      {/* Main Content Area - Scrollable */}
      <div className="relative z-10 min-h-screen overflow-y-auto overflow-x-hidden">
        <HashRouter>
          <Routes>
            <Route path="/" element={<AppContent />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </HashRouter>
      </div>
    </div>
  );
};

export default App;