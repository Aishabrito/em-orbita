import React from 'react';
import { Trash2, Info, AlertTriangle, XCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Planet = ({ habit, index, isEditMode, onInteract }) => {
  const navigate = useNavigate();

  const isLost = habit.status === 'lost';
  const isRestarted = habit.status === 'restarted';

  const speed = isLost ? 80 : Math.max(12, 45 - (habit.streak * 0.5));
  const orbitSize = 260 + (index * 120);

  // Cada planeta tem uma "personalidade" visual baseada no índice
  const planetStyles = [
    {
      // Planeta rochoso azul-esverdeado (tipo Terra)
      surface: 'from-[#1a6b8a] via-[#2d9e6b] to-[#1a4a6b]',
      atmosphere: 'rgba(45,158,107,0.5)',
      corona: 'rgba(100,220,180,0.25)',
      ring: false,
      craters: true,
    },
    {
      // Gigante gasoso laranja (tipo Júpiter)
      surface: 'from-[#c4602a] via-[#e8924a] to-[#8b3a1a]',
      atmosphere: 'rgba(232,146,74,0.5)',
      corona: 'rgba(255,180,100,0.25)',
      ring: true,
      craters: false,
    },
    {
      // Planeta gelado violeta (tipo Netuno)
      surface: 'from-[#3a1a8b] via-[#6a3adb] to-[#1a0a6b]',
      atmosphere: 'rgba(106,58,219,0.5)',
      corona: 'rgba(160,100,255,0.25)',
      ring: false,
      craters: true,
    },
    {
      // Planeta desértico vermelho (tipo Marte)
      surface: 'from-[#8b1a1a] via-[#c43a2a] to-[#5a0a0a]',
      atmosphere: 'rgba(196,58,42,0.5)',
      corona: 'rgba(255,120,80,0.25)',
      ring: false,
      craters: true,
    },
    {
      // Gigante esmeralda
      surface: 'from-[#0a5a3a] via-[#1a9a5a] to-[#0a3a2a]',
      atmosphere: 'rgba(26,154,90,0.5)',
      corona: 'rgba(60,220,120,0.25)',
      ring: true,
      craters: false,
    },
  ];

  const pStyle = planetStyles[index % planetStyles.length];
  // Se o hábito tem gradiente próprio, usamos atmosfera neutra, senão usa a do estilo
  const atmosphereColor = isLost ? 'rgba(100,100,100,0.3)' : pStyle.atmosphere;
  const coronaColor = isLost ? 'rgba(80,80,80,0.15)' : pStyle.corona;

  const handleClick = (e) => {
    e.stopPropagation();
    onInteract(habit.id);
  };

  const handleDetails = (e) => {
    e.stopPropagation();
    if (!isEditMode) navigate(`/detalhes/${habit.id}`);
  };

  return (
    <>
      <style>{`
        @keyframes orbit {
          from { transform: rotate(var(--start-rotation)); }
          to   { transform: rotate(calc(var(--start-rotation) + 360deg)); }
        }
        @keyframes counter-spin {
          from { transform: rotate(360deg); }
          to   { transform: rotate(0deg); }
        }
        @keyframes planet-breathe {
          0%, 100% { transform: scale(1); }
          50%       { transform: scale(1.04); }
        }
        @keyframes atmosphere-pulse {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50%       { opacity: 0.8; transform: scale(1.08); }
        }
        @keyframes ring-shimmer {
          0%, 100% { opacity: 0.5; }
          50%       { opacity: 0.85; }
        }
        @keyframes crater-twinkle {
          0%, 100% { opacity: 0.15; }
          50%       { opacity: 0.3; }
        }
      `}</style>

      {/* TRILHA ORBITAL */}
      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: orbitSize,
          height: orbitSize,
          border: isEditMode
            ? '1px dashed rgba(239,68,68,0.25)'
            : isLost
              ? '1px dashed rgba(255,255,255,0.04)'
              : '1px solid rgba(255,255,255,0.07)',
          boxShadow: isLost || isEditMode
            ? 'none'
            : `0 0 8px 1px rgba(255,255,255,0.03), inset 0 0 8px 1px rgba(255,255,255,0.02)`,
          zIndex: 10 + index,
        }}
      />

      {/* ANEL ORBITANDO */}
      <div
        className="absolute rounded-full flex items-center justify-center pointer-events-none"
        style={{
          width: orbitSize,
          height: orbitSize,
          zIndex: 20 + index,
          '--start-rotation': `${habit.orbitOffset || 0}deg`,
          animation: `orbit ${speed}s linear infinite`,
          animationPlayState: isEditMode ? 'paused' : 'running',
          transition: 'all 1s ease',
        }}
      >
        {/* POSIÇÃO DO PLANETA */}
        <div
          className="absolute -top-7 left-1/2 -translate-x-1/2 pointer-events-auto group"
          onMouseEnter={(e) => {
            e.currentTarget.parentElement.style.animationPlayState = 'paused';
            const inner = e.currentTarget.querySelector('.counter-rotator');
            if (inner) inner.style.animationPlayState = 'paused';
          }}
          onMouseLeave={(e) => {
            if (!isEditMode) {
              e.currentTarget.parentElement.style.animationPlayState = 'running';
              const inner = e.currentTarget.querySelector('.counter-rotator');
              if (inner) inner.style.animationPlayState = 'running';
            }
          }}
        >
          {/* CONTRA-ROTAÇÃO para o planeta ficar upright */}
          <div
            className="counter-rotator"
            style={{
              animation: `counter-spin ${speed}s linear infinite`,
              animationPlayState: isEditMode ? 'paused' : 'running',
            }}
          >
            {/* WRAPPER DO PLANETA */}
            <div
              onClick={handleClick}
              className={`
                relative w-16 h-16 cursor-pointer transition-transform duration-300
                ${isEditMode ? 'hover:scale-110' : 'hover:scale-125'}
                ${isLost && !isEditMode ? 'grayscale opacity-40' : ''}
              `}
              style={{
                animation: isEditMode ? 'none' : `planet-breathe ${4 + index}s ease-in-out infinite`,
              }}
            >
              {/* CORONA (brilho externo difuso) */}
              {!isEditMode && !isLost && (
                <div
                  className="absolute -inset-3 rounded-full blur-lg pointer-events-none"
                  style={{
                    background: `radial-gradient(circle, ${coronaColor} 0%, transparent 70%)`,
                    animation: `atmosphere-pulse ${3 + index * 0.5}s ease-in-out infinite`,
                  }}
                />
              )}

              {/* ATMOSFERA (anel glow próximo) */}
              {!isEditMode && (
                <div
                  className="absolute -inset-1 rounded-full blur-sm pointer-events-none"
                  style={{
                    background: `radial-gradient(circle, ${atmosphereColor} 0%, transparent 65%)`,
                    animation: `atmosphere-pulse ${2.5 + index * 0.3}s ease-in-out infinite`,
                    animationDelay: `${index * 0.4}s`,
                  }}
                />
              )}

              {/* SUPERFÍCIE DO PLANETA */}
              <div
                className={`
                  absolute inset-0 rounded-full overflow-hidden transition-all duration-500
                  ${isEditMode
                    ? 'bg-red-900/80 border-2 border-red-500 shadow-[0_0_20px_rgba(239,68,68,0.7)]'
                    : `bg-gradient-to-br ${habit.gradient || pStyle.surface}`
                  }
                `}
                style={!isEditMode ? {
                  boxShadow: `
                    inset -6px -6px 14px rgba(0,0,0,0.65),
                    inset 3px 3px 8px rgba(255,255,255,0.12),
                    0 0 18px 2px ${atmosphereColor}
                  `,
                  border: '1px solid rgba(255,255,255,0.18)',
                } : {}}
              >
                {/* HIGHLIGHT (reflexo de luz) */}
                {!isEditMode && (
                  <div
                    className="absolute top-1 left-2 w-5 h-3 rounded-full blur-sm"
                    style={{ background: 'rgba(255,255,255,0.28)' }}
                  />
                )}

                {/* FAIXAS (para gigantes gasosos) */}
                {!isEditMode && !pStyle.craters && (
                  <>
                    <div className="absolute inset-x-0 top-[30%] h-[10%] rounded-full opacity-20" style={{ background: 'rgba(0,0,0,0.4)' }} />
                    <div className="absolute inset-x-0 top-[50%] h-[8%] rounded-full opacity-15" style={{ background: 'rgba(0,0,0,0.3)' }} />
                    <div className="absolute inset-x-0 top-[65%] h-[6%] rounded-full opacity-10" style={{ background: 'rgba(255,255,255,0.15)' }} />
                  </>
                )}

                {/* CRATERAS (para planetas rochosos) */}
                {!isEditMode && pStyle.craters && (
                  <>
                    <div
                      className="absolute w-3 h-3 rounded-full border"
                      style={{
                        top: '30%', left: '20%',
                        borderColor: 'rgba(0,0,0,0.35)',
                        background: 'rgba(0,0,0,0.2)',
                        animation: `crater-twinkle ${3 + index}s ease-in-out infinite`,
                      }}
                    />
                    <div
                      className="absolute w-2 h-2 rounded-full border"
                      style={{
                        top: '55%', left: '55%',
                        borderColor: 'rgba(0,0,0,0.25)',
                        background: 'rgba(0,0,0,0.15)',
                        animation: `crater-twinkle ${4 + index}s ease-in-out infinite`,
                        animationDelay: '1s',
                      }}
                    />
                  </>
                )}

                {/* ÍCONE */}
                <div className="absolute inset-0 flex items-center justify-center z-10">
                  <div className="text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] select-none text-xl">
                    {isEditMode ? <Trash2 size={22} className="text-white" /> : habit.icon}
                  </div>
                </div>
              </div>

              {/* ANEL PLANETÁRIO (para gigantes) */}
              {!isEditMode && !isLost && pStyle.ring && (
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{ transform: 'rotateX(70deg) rotateZ(-20deg)' }}
                >
                  <div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-2"
                    style={{
                      width: '130%',
                      height: '130%',
                      borderColor: atmosphereColor,
                      boxShadow: `0 0 6px ${atmosphereColor}`,
                      animation: `ring-shimmer ${3}s ease-in-out infinite`,
                    }}
                  />
                  <div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border"
                    style={{
                      width: '155%',
                      height: '155%',
                      borderColor: coronaColor,
                      animation: `ring-shimmer ${4}s ease-in-out infinite`,
                      animationDelay: '0.5s',
                    }}
                  />
                </div>
              )}

              {/* BADGE de hábito perdido */}
              {isLost && !isEditMode && (
                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-gray-900 rounded-full border border-gray-600 flex items-center justify-center animate-pulse z-20">
                  <AlertTriangle size={10} className="text-yellow-500" />
                </div>
              )}
            </div>

            {/* TOOLTIP */}
            <div className={`
              absolute opacity-0 group-hover:opacity-100 transition-all duration-300
              top-full mt-4 left-1/2 -translate-x-1/2 whitespace-nowrap
              rounded-2xl text-xs font-bold border shadow-2xl pointer-events-auto z-50
              flex flex-col items-center gap-2 px-4 py-3
              ${isEditMode
                ? 'bg-red-950/95 border-red-500/60 text-red-100 backdrop-blur-xl'
                : 'bg-[#0B0B15]/95 border-white/10 text-white backdrop-blur-xl'
              }
            `}
              style={!isEditMode ? { boxShadow: `0 8px 32px rgba(0,0,0,0.6), 0 0 20px ${atmosphereColor}` } : {}}
            >
              {isEditMode ? (
                <>
                  <div className="flex items-center gap-2 text-red-400 uppercase tracking-widest text-[10px]">
                    <XCircle size={12} /> Excluir Hábito
                  </div>
                  <span className="font-titulo text-lg text-white">{habit.name}</span>
                  <span className="text-[10px] text-red-300/70 font-light">Essa ação não tem volta</span>
                </>
              ) : (
                <>
                  <span className="flex items-center gap-2 font-orbita tracking-wide">
                    {habit.name}
                    {isLost
                      ? <span className="text-gray-500 font-bold uppercase text-[10px] bg-gray-800 px-1 rounded">Desativado</span>
                      : <span className="text-yellow-400">★ {habit.streak}</span>
                    }
                  </span>
                  <p className={`text-[10px] font-light -mt-1 ${isLost ? 'text-red-400' : 'text-cyan-400'}`}>
                    {isLost ? 'Clique para reativar órbita' : isRestarted ? 'Ciclo reiniciado!' : 'Órbita estável'}
                  </p>
                  <button
                    onClick={handleDetails}
                    className="w-full bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-lg text-[10px] uppercase tracking-wider flex items-center justify-center gap-1 transition-colors border border-white/5"
                  >
                    <Info size={10} /> Detalhes
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Planet;