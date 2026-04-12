import React from 'react';
import { useAuth } from '../hooks/useAuth';

const EstrelaCentral = ({ isEditMode, maxStreak }) => {
  const { user } = useAuth();
  const firstName = user?.displayName?.split(' ')[0] || 'Eu';

  return (
    <>
      <style>{`
        @keyframes solar-rotate {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes solar-rotate-reverse {
          from { transform: rotate(360deg); }
          to   { transform: rotate(0deg); }
        }
        @keyframes corona-pulse {
          0%, 100% { opacity: 0.35; transform: scale(1); }
          50%       { opacity: 0.6;  transform: scale(1.1); }
        }
        @keyframes corona-pulse-slow {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50%       { opacity: 0.4; transform: scale(1.15); }
        }
        @keyframes flare-spin {
          from { transform: rotate(0deg) scale(1); opacity: 0.6; }
          50%  { transform: rotate(180deg) scale(1.05); opacity: 0.9; }
          to   { transform: rotate(360deg) scale(1); opacity: 0.6; }
        }
        @keyframes surface-shimmer {
          0%, 100% { opacity: 0.7; }
          50%       { opacity: 1; }
        }
        @keyframes streak-glow {
          0%, 100% { text-shadow: 0 0 8px rgba(234,179,8,0.6); }
          50%       { text-shadow: 0 0 18px rgba(234,179,8,1), 0 0 30px rgba(251,146,60,0.6); }
        }
      `}</style>

      <div className="z-10 relative flex flex-col items-center justify-center">
        <div className="relative w-28 h-28 flex items-center justify-center">

          <div className="absolute rounded-full pointer-events-none" style={{
            inset: '-28px',
            background: isEditMode
              ? 'radial-gradient(circle, rgba(239,68,68,0.12) 0%, transparent 70%)'
              : 'radial-gradient(circle, rgba(251,191,36,0.18) 0%, rgba(251,146,60,0.08) 50%, transparent 70%)',
            animation: 'corona-pulse-slow 5s ease-in-out infinite',
          }} />

          <div className="absolute rounded-full pointer-events-none" style={{
            inset: '-16px',
            background: isEditMode
              ? 'radial-gradient(circle, rgba(239,68,68,0.2) 0%, transparent 65%)'
              : 'radial-gradient(circle, rgba(253,224,71,0.35) 0%, rgba(251,146,60,0.15) 55%, transparent 70%)',
            animation: 'corona-pulse 3.5s ease-in-out infinite',
          }} />

          {!isEditMode && (
            <div className="absolute inset-0 rounded-full pointer-events-none" style={{
              inset: '-10px',
              background: `conic-gradient(from 0deg, transparent 0deg, rgba(253,224,71,0.25) 10deg, transparent 20deg, transparent 45deg, rgba(251,191,36,0.2) 55deg, transparent 65deg, transparent 90deg, rgba(253,224,71,0.22) 100deg, transparent 110deg, transparent 135deg, rgba(251,191,36,0.18) 145deg, transparent 155deg, transparent 180deg, rgba(253,224,71,0.25) 190deg, transparent 200deg, transparent 225deg, rgba(251,191,36,0.2) 235deg, transparent 245deg, transparent 270deg, rgba(253,224,71,0.22) 280deg, transparent 290deg, transparent 315deg, rgba(251,191,36,0.18) 325deg, transparent 335deg, transparent 360deg)`,
              borderRadius: '50%',
              animation: 'flare-spin 12s linear infinite',
            }} />
          )}

          <div
            className={`relative w-full h-full rounded-full flex flex-col items-center justify-center z-20 transition-all duration-700 overflow-hidden ${isEditMode ? 'border-2 border-red-500/70' : 'border border-yellow-200/40'}`}
            style={!isEditMode ? {
              background: 'radial-gradient(circle at 38% 35%, #fff7a0 0%, #fde047 20%, #f59e0b 50%, #d97706 72%, #92400e 100%)',
              boxShadow: `inset -8px -8px 20px rgba(120,53,15,0.6), inset 4px 4px 12px rgba(255,255,200,0.35), 0 0 30px rgba(251,191,36,0.5), 0 0 60px rgba(251,146,60,0.25)`,
            } : {
              background: 'radial-gradient(circle, #1c1c1c 0%, #111 100%)',
              boxShadow: '0 0 30px rgba(239,68,68,0.25)',
            }}
          >
            {!isEditMode && (
              <>
                <div className="absolute inset-0 rounded-full pointer-events-none" style={{ background: `radial-gradient(ellipse at 25% 25%, rgba(255,255,200,0.2) 0%, transparent 40%)` }} />
                <div className="absolute w-8 h-5 rounded-full blur-sm" style={{ top: '12%', left: '22%', background: 'rgba(255,255,200,0.3)', animation: 'surface-shimmer 4s ease-in-out infinite' }} />
              </>
            )}

            <span
              className={`relative z-10 font-extrabold select-none drop-shadow-md text-center px-1 leading-tight ${
                firstName.length > 6 ? 'text-sm' : 'text-lg'
              } ${isEditMode ? 'text-red-400 text-2xl' : 'text-[#3b1a00]'}`}
              style={!isEditMode ? { textShadow: '0 1px 3px rgba(255,255,150,0.4)' } : {}}
            >
              {isEditMode ? '⚠️' : firstName}
            </span>
          </div>
        </div>

        <div
          className="mt-8 font-bold tracking-widest text-sm uppercase"
          style={{
            color: isEditMode ? '#f87171' : '#fbbf24',
            textShadow: isEditMode ? '0 0 10px rgba(239,68,68,0.5)' : '0 0 12px rgba(251,191,36,0.7)',
            animation: isEditMode ? 'none' : 'streak-glow 3s ease-in-out infinite',
          }}
        >
          Melhor Streak: {maxStreak}
        </div>
      </div>
    </>
  );
};

export default EstrelaCentral;