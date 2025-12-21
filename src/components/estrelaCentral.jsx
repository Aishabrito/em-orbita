import React from 'react';

const EstrelaCentral = ({ isEditMode, totalStreak }) => {
  return (
    <div className="z-10 relative flex flex-col items-center justify-center">
      <div className="relative w-24 h-24 flex items-center justify-center">
         {/* Brilho/Aura do Sol */}
         <div className={`absolute inset-0 rounded-full bg-yellow-500 blur-xl opacity-40 ${isEditMode ? 'grayscale' : 'animate-pulse-glow'}`}></div>
         
         {/* O Sol (Núcleo) */}
         <div className={`relative w-full h-full rounded-full flex items-center justify-center z-20 border transition-colors duration-500
           ${isEditMode 
             ? 'bg-gray-800 border-red-500/50 shadow-[0_0_30px_rgba(239,68,68,0.2)]' 
             : 'bg-gradient-to-br from-yellow-200 via-yellow-500 to-orange-600 border-yellow-100/30 shadow-[inset_-5px_-5px_20px_rgba(180,83,9,0.5)]'
           }`}>
            <span className={`font-extrabold text-3xl drop-shadow-md ${isEditMode ? 'text-red-400' : 'text-[#0B0B15]'}`}>
              {isEditMode ? '⚠️' : 'Eu'}
            </span>
         </div>
      </div>
      
      {/* Texto abaixo do Sol */}
      <div className="mt-8 text-yellow-500 font-bold tracking-widest text-sm uppercase drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
        Streak Total: {totalStreak}
      </div>
    </div>
  );
};

export default EstrelaCentral;