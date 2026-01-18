import React, { useState, useEffect } from 'react';
import { ADMIN_PASSWORD } from '../constants';
import { getParticipants, deleteParticipant } from '../services/storage';
import { Participant, Team } from '../types';
import { Lock, LogOut, Users, Search, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import ConfirmationModal from './ConfirmationModal';

const Admin: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [activeTab, setActiveTab] = useState<Team>(Team.A);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Modal State
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [participantToDelete, setParticipantToDelete] = useState<{id: string, name: string} | null>(null);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setError('');
      loadData();
    } else {
      setError('Invalid password');
    }
  };

  const loadData = () => {
    const data = getParticipants();
    setParticipants(data);
  };

  const confirmDelete = (id: string, name: string) => {
    setParticipantToDelete({ id, name });
    setDeleteModalOpen(true);
  };

  const executeDelete = () => {
    if (participantToDelete) {
      deleteParticipant(participantToDelete.id);
      loadData();
      setDeleteModalOpen(false);
      setParticipantToDelete(null);
    }
  };

  const cancelDelete = () => {
    setDeleteModalOpen(false);
    setParticipantToDelete(null);
  };

  useEffect(() => {
    if (isAuthenticated) {
      loadData();
    }
  }, [isAuthenticated]);

  const filteredParticipants = participants
    .filter(p => p.team === activeTab)
    .filter(p => 
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      p.fullRollNumber.toLowerCase().includes(searchTerm.toLowerCase())
    );

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="bg-white/10 backdrop-blur-xl p-8 rounded-3xl shadow-2xl w-full max-w-sm border border-white/20">
          <div className="flex justify-center mb-6">
            <div className="bg-indigo-500/20 p-4 rounded-full ring-1 ring-indigo-500/30">
              <Lock className="w-8 h-8 text-indigo-300" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-center text-white mb-6">Admin Access</h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="w-full px-5 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:ring-2 focus:ring-indigo-400 focus:border-transparent outline-none transition-all"
              />
            </div>
            {error && <p className="text-red-300 text-sm text-center bg-red-900/20 py-2 rounded-lg">{error}</p>}
            <button
              type="submit"
              className="w-full bg-white text-indigo-900 font-bold py-3 rounded-xl hover:bg-gray-100 transition-colors shadow-lg"
            >
              Access Dashboard
            </button>
            <div className="text-center mt-4">
              <Link to="/" className="text-indigo-300 text-sm hover:text-white transition-colors">Return to Home</Link>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-12">
      <ConfirmationModal 
        isOpen={deleteModalOpen}
        title="Delete Participant"
        message={participantToDelete ? `Are you sure you want to delete ${participantToDelete.name}? This action cannot be undone.` : ''}
        onConfirm={executeDelete}
        onCancel={cancelDelete}
      />

      {/* Header */}
      <header className="bg-white/10 backdrop-blur-md border-b border-white/10 px-6 py-4 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <div className="bg-indigo-600 p-2 rounded-lg">
            <Users className="text-white w-5 h-5" />
          </div>
          <h1 className="text-xl font-bold text-white hidden sm:block">Team Allocation</h1>
          <h1 className="text-xl font-bold text-white sm:hidden">Admin</h1>
        </div>
        <button 
          onClick={() => setIsAuthenticated(false)}
          className="text-sm bg-red-500/10 text-red-300 hover:bg-red-500/20 hover:text-red-200 font-medium px-3 py-2 rounded-lg transition-colors flex items-center gap-2 border border-red-500/20"
        >
          <LogOut size={16} /> <span className="hidden sm:inline">Logout</span>
        </button>
      </header>

      <main className="max-w-6xl mx-auto p-4 sm:p-6 space-y-8">
        {/* Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gradient-to-br from-indigo-900/50 to-indigo-800/30 p-6 rounded-2xl border border-indigo-500/20 text-center backdrop-blur-sm">
            <h3 className="text-indigo-200 font-medium mb-1 text-sm uppercase tracking-wide">Team A</h3>
            <p className="text-4xl sm:text-5xl font-bold text-white">{participants.filter(p => p.team === Team.A).length}</p>
          </div>
          <div className="bg-gradient-to-br from-teal-900/50 to-teal-800/30 p-6 rounded-2xl border border-teal-500/20 text-center backdrop-blur-sm">
            <h3 className="text-teal-200 font-medium mb-1 text-sm uppercase tracking-wide">Team B</h3>
            <p className="text-4xl sm:text-5xl font-bold text-white">{participants.filter(p => p.team === Team.B).length}</p>
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex bg-white/5 p-1 rounded-xl border border-white/10 w-full md:w-auto backdrop-blur-sm">
            <button
              onClick={() => setActiveTab(Team.A)}
              className={`flex-1 md:flex-none px-6 py-2.5 rounded-lg text-sm font-bold transition-all ${
                activeTab === Team.A ? 'bg-indigo-600 text-white shadow-lg' : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              Team A
            </button>
            <button
              onClick={() => setActiveTab(Team.B)}
              className={`flex-1 md:flex-none px-6 py-2.5 rounded-lg text-sm font-bold transition-all ${
                activeTab === Team.B ? 'bg-teal-600 text-white shadow-lg' : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              Team B
            </button>
          </div>

          <div className="relative w-full md:w-72 group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-400 transition-colors" size={18} />
            <input
              type="text"
              placeholder="Search by name or roll..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 outline-none text-white placeholder-gray-500 backdrop-blur-sm transition-all"
            />
          </div>
        </div>

        {/* Table */}
        <div className="bg-white/10 backdrop-blur-xl rounded-2xl shadow-xl border border-white/10 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-white/5 border-b border-white/10 text-xs uppercase font-bold text-gray-400">
                <tr>
                  <th className="px-6 py-4">#</th>
                  <th className="px-6 py-4">Name</th>
                  <th className="px-6 py-4">Roll Number</th>
                  <th className="px-6 py-4">Team</th>
                  <th className="px-6 py-4 text-center">Delete</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredParticipants.length > 0 ? (
                  filteredParticipants.map((p, index) => (
                    <tr key={p.id} className="hover:bg-white/5 transition-colors group">
                      <td className="px-6 py-4 font-medium text-gray-500">{index + 1}</td>
                      <td className="px-6 py-4 text-white font-semibold text-base">{p.name}</td>
                      <td className="px-6 py-4 font-mono text-indigo-300 bg-indigo-500/10 rounded px-2 py-1 w-fit">{p.fullRollNumber}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          p.team === Team.A 
                            ? 'bg-indigo-100 text-indigo-800' 
                            : 'bg-teal-100 text-teal-800'
                        }`}>
                          {p.team}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            confirmDelete(p.id, p.name);
                          }}
                          className="text-red-400 hover:text-red-300 hover:bg-red-500/20 p-2 rounded-lg transition-all"
                          title="Delete Participant"
                        >
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="px-6 py-16 text-center text-gray-400">
                      <div className="flex flex-col items-center gap-2">
                        <Users size={32} className="opacity-20" />
                        <p>No participants found in this team.</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Admin;