import React, { useState } from 'react';
import { NAME_REGEX, ROLL_NUMBER_PREFIXES, ROLL_SUFFIX_REGEX, FORBIDDEN_ROLL_SUFFIXES } from '../constants';
import { getParticipants } from '../services/storage';
import { ArrowRight, AlertCircle, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';

interface EntryFormProps {
  onStartQuiz: (name: string, rollPrefix: string, rollSuffix: string) => void;
}

const EntryForm: React.FC<EntryFormProps> = ({ onStartQuiz }) => {
  const [name, setName] = useState('');
  const [rollPrefix, setRollPrefix] = useState(ROLL_NUMBER_PREFIXES[0]);
  const [rollSuffix, setRollSuffix] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // 1. Name Validation
    if (!name.trim()) {
      setError("Name is required.");
      return;
    }
    if (!NAME_REGEX.test(name.replace(/\s/g, ''))) {
       if (!NAME_REGEX.test(name)) {
         setError("Name must contain alphabets only (no spaces).");
         return;
       }
    }

    // 2. Format Validation
    if (!ROLL_SUFFIX_REGEX.test(rollSuffix)) {
      setError("Roll number suffix must be exactly 3 digits (001-999).");
      return;
    }
    
    const suffixNum = parseInt(rollSuffix, 10);
    if (suffixNum < 1 || suffixNum > 999) {
      setError("Roll number suffix must be between 001 and 999.");
      return;
    }

    // 3. Forbidden Number Validation
    if (FORBIDDEN_ROLL_SUFFIXES.includes(rollSuffix)) {
      setError("This roll number is not allowed. Please enter a different 3-digit number.");
      return;
    }

    // 4. Uniqueness Validation (Global Suffix Check)
    const existingParticipants = getParticipants();
    const isDuplicate = existingParticipants.some(p => p.rollNumberSuffix === rollSuffix);
    
    if (isDuplicate) {
      setError("This roll number has already been used. Please enter a unique 3-digit number.");
      return;
    }

    onStartQuiz(name, rollPrefix, rollSuffix);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[90vh] px-4 w-full">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/20 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-white tracking-tight mb-2 drop-shadow-sm">Welcome</h1>
          <p className="text-gray-300">Enter your details to join the tribe.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-200 mb-1.5 ml-1">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-5 py-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all outline-none backdrop-blur-sm"
              placeholder="e.g. Adarsh"
              autoComplete="off"
            />
            <p className="text-xs text-gray-400 mt-2 ml-1">Alphabets only. No spaces.</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-200 mb-1.5 ml-1">
              Roll Number
            </label>
            <div className="flex gap-2 w-full">
              <div className="relative shrink-0">
                <select
                  value={rollPrefix}
                  onChange={(e) => setRollPrefix(e.target.value)}
                  className="appearance-none h-full px-4 py-4 rounded-xl bg-white/5 border border-white/10 text-white focus:ring-2 focus:ring-indigo-400 outline-none text-sm font-medium cursor-pointer"
                >
                  {ROLL_NUMBER_PREFIXES.map(prefix => (
                    <option key={prefix} value={prefix} className="text-gray-900">{prefix}</option>
                  ))}
                </select>
              </div>
              <input
                type="text"
                value={rollSuffix}
                onChange={(e) => {
                  const val = e.target.value;
                  if (/^\d*$/.test(val) && val.length <= 3) {
                    setRollSuffix(val);
                  }
                }}
                className="flex-1 min-w-0 px-5 py-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all outline-none backdrop-blur-sm"
                placeholder="XXX"
                maxLength={3}
                inputMode="numeric"
              />
            </div>
            <p className="text-xs text-gray-400 mt-2 ml-1">Format: {rollPrefix}XXX (001-999)</p>
          </div>

          {error && (
            <div className="flex items-center gap-2 text-red-200 text-sm bg-red-500/20 border border-red-500/30 p-4 rounded-xl backdrop-blur-sm animate-in fade-in slide-in-from-top-2">
              <AlertCircle size={16} />
              <span>{error}</span>
            </div>
          )}

          <button
            type="submit"
            className="group w-full bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-bold py-4 px-6 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-indigo-900/50 hover:shadow-indigo-900/70 hover:-translate-y-0.5"
          >
            Start Quiz 
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </form>
      </div>
      
      <div className="mt-8">
        <Link to="/admin" className="flex items-center gap-2 text-white/30 hover:text-white/80 transition-colors text-sm font-medium px-4 py-2 rounded-lg hover:bg-white/5">
          <Lock size={14} /> Admin Access
        </Link>
      </div>
    </div>
  );
};

export default EntryForm;