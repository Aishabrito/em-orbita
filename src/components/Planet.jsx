import React from 'react';
import { Trash2, Info } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Planet = ({ habit, index, isEditMode, onInteract }) => {
  const navigate = useNavigate();
  
  // Cálculos visuais
  const orbitSize = 220 + (index * 110);
  const speed = Math.max(6, 40 - habit.streak);

  const handleClick = (e) => {
    e.stopPropagation();
    onInteract(habit.id);
  };

  const handleDetails = (e) => {
    e.stopPropagation();
    navigate(`/detalhes/${habit.id}`);
  };

  return (
    <div
      className="absolute rounded-full border border-white/5 shadow-[0_0_20px_rgba(255,255,255,0.02)] flex items-center justify-center pointer-events-none transition-all duration-500"
      style={{
        width: `${orbitSize}px`,
        height: `${orbitSize}px`,
        animation: `spin ${speed}s linear infinite`,
        animationPlayState: isEditMode ? 'paused' : 'running',
        borderColor: isEditMode ? 'rgba(239, 68, 68, 0.2)' : 'rgba(255, 255, 255, 0.05)'
      }}
    >
      <div className="absolute -top-6 left-1/2 -translate-x-1/2 pointer-events-auto group">
        {/* O Planeta em si */}
        <div 
          onClick={handleClick}
          className={`relative w-14 h-14 flex items-center justify-center transition-transform duration-200 
            ${isEditMode ? 'cursor-not-allowed hover:scale-90' : 'cursor-pointer hover:scale-110 active:scale-90'}
          `}
        >
          <div className={`absolute inset-0 rounded-full transition-all duration-300
            ${isEditMode 
              ? 'bg-gray-700 border-2 border-red-500' 
              : `bg-gradient-to-br ${habit.gradient} shadow-[inset_-4px_-4px_8px_rgba(0,0,0,0.6)] border-t border-white/30`
            }
          `}></div>

          {!isEditMode && <div className={`absolute inset-0 rounded-full blur-md opacity-40 ${habit.gradient}`}></div>}
          
          <div className="relative z-10 text-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.5)] select-none">
              {isEditMode ? <Trash2 size={20} className="text-red-500" /> : habit.icon}
          </div>
        </div>
        
        {/* Tooltip */}
        {!isEditMode && (
          <div className="absolute opacity-0 group-hover:opacity-100 transition-all duration-300 -top-14 left-1/2 -translate-x-1/2 whitespace-nowrap bg-[#0B0B15]/90 backdrop-blur-md px-4 py-2 rounded-xl text-xs font-bold text-white border border-white/10 shadow-xl pointer-events-auto z-50 flex flex-col items-center gap-2">
            <span className="flex items-center gap-2">
                {habit.name} <span className="text-yellow-400">★ {habit.streak}</span>
            </span>
            <button 
              onClick={handleDetails}
              className="bg-white/10 hover:bg-white/20 px-3 py-1 rounded-md text-[10px] uppercase tracking-wider flex items-center gap-1 transition-colors"
            >
              <Info size={10} /> Detalhes
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Planet;