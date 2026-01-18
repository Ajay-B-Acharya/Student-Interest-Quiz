import React, { useState } from 'react';
import { QUIZ_QUESTIONS } from '../constants';
import { Team } from '../types';
import { CheckCircle2, ImageOff } from 'lucide-react';

interface QuizProps {
  onComplete: (scoreA: number, scoreB: number) => void;
}

const Quiz: React.FC<QuizProps> = ({ onComplete }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [scoreA, setScoreA] = useState(0);
  const [scoreB, setScoreB] = useState(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);

  const currentQuestion = QUIZ_QUESTIONS[currentIndex];
  const progress = ((currentIndex + 1) / QUIZ_QUESTIONS.length) * 100;

  const handleSelect = (team: Team, optionId: string) => {
    if (selectedOptionId) return; // Prevent double click
    
    setSelectedOptionId(optionId);

    // Update score
    if (team === Team.A) {
      setScoreA(prev => prev + 1);
    } else {
      setScoreB(prev => prev + 1);
    }

    // Delay for visual feedback before moving next
    setTimeout(() => {
      if (currentIndex < QUIZ_QUESTIONS.length - 1) {
        setCurrentIndex(prev => prev + 1);
        setSelectedOptionId(null);
      } else {
        // Quiz Finished
        const finalScoreA = team === Team.A ? scoreA + 1 : scoreA;
        const finalScoreB = team === Team.B ? scoreB + 1 : scoreB;
        onComplete(finalScoreA, finalScoreB);
      }
    }, 400); // Fast transition
  };

  return (
    <div className="min-h-screen flex flex-col items-center pt-8 px-4 pb-12 w-full max-w-6xl mx-auto">
      {/* Progress Bar */}
      <div className="w-full max-w-2xl bg-white/20 backdrop-blur-sm rounded-full h-3 mb-8 border border-white/10">
        <div 
          className="bg-indigo-500 h-full rounded-full transition-all duration-300 ease-out shadow-[0_0_10px_rgba(99,102,241,0.5)]" 
          style={{ width: `${progress}%` }}
        ></div>
        <p className="text-right text-xs text-white/70 mt-2 font-medium tracking-wide">Question {currentIndex + 1} of {QUIZ_QUESTIONS.length}</p>
      </div>

      <h2 className="text-3xl font-bold text-white mb-8 text-center drop-shadow-md">{currentQuestion.text}</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
        {currentQuestion.options.map((option) => {
          const isSelected = selectedOptionId === option.id;
          const isOtherSelected = selectedOptionId !== null && !isSelected;

          return (
            <div
              key={option.id}
              onClick={() => handleSelect(option.team, option.id)}
              className={`
                relative group cursor-pointer rounded-3xl overflow-hidden shadow-2xl transition-all duration-300 transform
                ${isSelected ? 'ring-4 ring-indigo-500 scale-[1.02]' : 'hover:scale-[1.02] hover:shadow-indigo-500/20'}
                ${isOtherSelected ? 'opacity-50 grayscale scale-95' : 'opacity-100'}
                bg-white/10 backdrop-blur-md border border-white/20
              `}
            >
              <div className="aspect-[4/3] w-full overflow-hidden bg-black relative">
                <img 
                  src={option.imageUrl} 
                  alt={option.label}
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.nextElementSibling?.classList.remove('hidden');
                  }}
                  className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110"
                />
                {/* Fallback for broken images */}
                <div className="hidden absolute inset-0 flex flex-col items-center justify-center bg-gray-800 text-gray-400 p-4 text-center">
                  <ImageOff size={48} className="mb-2 opacity-50" />
                  <span className="text-sm font-medium">{option.label}</span>
                </div>
              </div>

              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-white font-bold text-lg px-6 py-2 border-2 border-white/80 rounded-full backdrop-blur-md">
                  Select
                </span>
              </div>
              
              {isSelected && (
                <div className="absolute inset-0 bg-indigo-600/30 flex items-center justify-center z-10 backdrop-blur-[2px]">
                  <CheckCircle2 className="text-white w-20 h-20 drop-shadow-lg animate-in zoom-in duration-200" />
                </div>
              )}

              <div className="p-5">
                <p className="text-center font-bold text-xl text-white">{option.label}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Quiz;