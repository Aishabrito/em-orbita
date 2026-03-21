import React from 'react';

const EstrelaCentral = ({ isEditMode, totalStreak }) => {
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

          {/* CAMADA 1: Brilho difuso externo (corona grande) */}
          <div
            className="absolute rounded-full pointer-events-none"
            style={{
              inset: '-28px',
              background: isEditMode
                ? 'radial-gradient(circle, rgba(239,68,68,0.12) 0%, transparent 70%)'
                : 'radial-gradient(circle, rgba(251,191,36,0.18) 0%, rgba(251,146,60,0.08) 50%, transparent 70%)',
              animation: 'corona-pulse-slow 5s ease-in-out infinite',
            }}
          />

          {/* CAMADA 2: Corona média pulsante */}
          <div
            className="absolute rounded-full pointer-events-none"
            style={{
              inset: '-16px',
              background: isEditMode
                ? 'radial-gradient(circle, rgba(239,68,68,0.2) 0%, transparent 65%)'
                : 'radial-gradient(circle, rgba(253,224,71,0.35) 0%, rgba(251,146,60,0.15) 55%, transparent 70%)',
              animation: 'corona-pulse 3.5s ease-in-out infinite',
            }}
          />

          {/* CAMADA 3: Raios solares girando */}
          {!isEditMode && (
            <div
              className="absolute inset-0 rounded-full pointer-events-none"
              style={{
                inset: '-10px',
                background: `conic-gradient(
                  from 0deg,
                  transparent 0deg,
                  rgba(253,224,71,0.25) 10deg,
                  transparent 20deg,
                  transparent 45deg,
                  rgba(251,191,36,0.2) 55deg,
                  transparent 65deg,
                  transparent 90deg,
                  rgba(253,224,71,0.22) 100deg,
                  transparent 110deg,
                  transparent 135deg,
                  rgba(251,191,36,0.18) 145deg,
                  transparent 155deg,
                  transparent 180deg,
                  rgba(253,224,71,0.25) 190deg,
                  transparent 200deg,
                  transparent 225deg,
                  rgba(251,191,36,0.2) 235deg,
                  transparent 245deg,
                  transparent 270deg,
                  rgba(253,224,71,0.22) 280deg,
                  transparent 290deg,
                  transparent 315deg,
                  rgba(251,191,36,0.18) 325deg,
                  transparent 335deg,
                  transparent 360deg
                )`,
                borderRadius: '50%',
                animation: 'flare-spin 12s linear infinite',
              }}
            />
          )}

          {/* CAMADA 4: Raios contrários (cria efeito de profundidade) */}
          {!isEditMode && (
            <div
              className="absolute inset-0 rounded-full pointer-events-none"
              style={{
                inset: '-6px',
                background: `conic-gradient(
                  from 22deg,
                  transparent 0deg,
                  rgba(253,224,71,0.15) 8deg,
                  transparent 16deg,
                  transparent 67deg,
                  rgba(251,191,36,0.12) 75deg,
                  transparent 83deg,
                  transparent 112deg,
                  rgba(253,224,71,0.15) 120deg,
                  transparent 128deg,
                  transparent 180deg,
                  rgba(251,191,36,0.13) 188deg,
                  transparent 196deg,
                  transparent 247deg,
                  rgba(253,224,71,0.15) 255deg,
                  transparent 263deg,
                  transparent 360deg
                )`,
                borderRadius: '50%',
                animation: 'solar-rotate-reverse 18s linear infinite',
              }}
            />
          )}

          {/* NÚCLEO DO SOL */}
          <div
            className={`
              relative w-full h-full rounded-full flex items-center justify-center z-20
              transition-all duration-700 overflow-hidden
              ${isEditMode
                ? 'border-2 border-red-500/70'
                : 'border border-yellow-200/40'
              }
            `}
            style={!isEditMode ? {
              background: 'radial-gradient(circle at 38% 35%, #fff7a0 0%, #fde047 20%, #f59e0b 50%, #d97706 72%, #92400e 100%)',
              boxShadow: `
                inset -8px -8px 20px rgba(120,53,15,0.6),
                inset 4px 4px 12px rgba(255,255,200,0.35),
                0 0 30px rgba(251,191,36,0.5),
                0 0 60px rgba(251,146,60,0.25)
              `,
            } : {
              background: 'radial-gradient(circle, #1c1c1c 0%, #111 100%)',
              boxShadow: '0 0 30px rgba(239,68,68,0.25)',
            }}
          >
            {/* Granulação solar (textura interna) */}
            {!isEditMode && (
              <>
                <div
                  className="absolute inset-0 rounded-full pointer-events-none"
                  style={{
                    background: `radial-gradient(ellipse at 25% 25%, rgba(255,255,200,0.2) 0%, transparent 40%)`,
                  }}
                />
                <div
                  className="absolute w-8 h-5 rounded-full blur-sm"
                  style={{
                    top: '18%', left: '22%',
                    background: 'rgba(255,255,200,0.3)',
                    animation: 'surface-shimmer 4s ease-in-out infinite',
                  }}
                />
                <div
                  className="absolute w-5 h-3 rounded-full blur-sm"
                  style={{
                    top: '55%', left: '55%',
                    background: 'rgba(255,200,100,0.2)',
                    animation: 'surface-shimmer 5s ease-in-out infinite',
                    animationDelay: '1.5s',
                  }}
                />
                {/* Mancha solar */}
                <div
                  className="absolute w-3 h-2 rounded-full"
                  style={{
                    top: '40%', left: '30%',
                    background: 'rgba(120,53,15,0.5)',
                    animation: 'surface-shimmer 7s ease-in-out infinite',
                    animationDelay: '2s',
                  }}
                />
              </>
            )}

            {/* Texto central */}
            <span
              className={`relative z-10 font-extrabold text-2xl select-none drop-shadow-md ${
                isEditMode ? 'text-red-400' : 'text-[#3b1a00]'
              }`}
              style={!isEditMode ? {
                textShadow: '0 1px 3px rgba(255,255,150,0.4)',
              } : {}}
            >
              {isEditMode ? '⚠️' : 'Eu'}
            </span>
          </div>
        </div>

        {/* STREAK TOTAL */}
        <div
          className="mt-8 font-bold tracking-widest text-sm uppercase"
          style={{
            color: isEditMode ? '#f87171' : '#fbbf24',
            textShadow: isEditMode
              ? '0 0 10px rgba(239,68,68,0.5)'
              : '0 0 12px rgba(251,191,36,0.7)',
            animation: isEditMode ? 'none' : 'streak-glow 3s ease-in-out infinite',
          }}
        >
          Streak Total: {totalStreak}
        </div>
      </div>
    </>
  );
};

export default EstrelaCentral;