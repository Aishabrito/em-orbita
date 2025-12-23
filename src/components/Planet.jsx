import React from 'react';
import { Trash2, Info, AlertTriangle, XCircle } from 'lucide-react'; 
import { useNavigate } from 'react-router-dom';

const Planet = ({ habit, index, isEditMode, onInteract }) => {
  const navigate = useNavigate();
  
  const isLost = habit.status === 'lost';
  const isRestarted = habit.status === 'restarted';

  // Se estiver perdido, gira devagar. Se estiver em edição, pausa 
  const speed = isLost ? 60 : Math.max(10, 40 - (habit.streak * 0.5));
  
  const orbitSize = 250 + (index * 110); 

  const handleClick = (e) => {
    e.stopPropagation();
    onInteract(habit.id);
  };

  const handleDetails = (e) => {
    e.stopPropagation();
    if (!isEditMode) {
      navigate(`/detalhes/${habit.id}`);
    }
  };

  return (
    <>
      <style>
        {`
         @keyframes spin {
            from { transform: rotate(var(--start-rotation)); }
            to { transform: rotate(calc(var(--start-rotation) + 360deg)); }
         }
         @keyframes counter-spin { from { transform: rotate(360deg); } to { transform: rotate(0deg); } }
        `}
      </style>

      {/* ANEL DA ÓRBITA */}
      <div
        className="absolute rounded-full border flex items-center justify-center pointer-events-none transition-all duration-1000"
        style={{
          width: orbitSize,
          height: orbitSize,
          zIndex: 10 + index,
          '--start-rotation': `${habit.orbitOffset}deg`,
          animation: `spin ${speed}s linear infinite`,
          animationPlayState: isEditMode ? 'paused' : 'running',
          borderColor: isLost ? 'rgba(255,255,255,0.01)' : (isEditMode ? 'rgba(239,68,68,0.2)' : 'rgba(255,255,255,0.05)')
        }}
      >

        {/* POSICIONAMENTO DO PLANETA */}
        <div 
          className="absolute -top-7 left-1/2 -translate-x-1/2 pointer-events-auto group"
          onMouseEnter={(e) => {
            e.currentTarget.parentElement.style.animationPlayState = 'paused';
            const inner = e.currentTarget.querySelector('.counter-rotator');
            if(inner) inner.style.animationPlayState = 'paused';
          }}
          onMouseLeave={(e) => {
            // Se estiver em Edit Mode, a órbita já está pausada, então não forçamos o play
            if (!isEditMode) {
              e.currentTarget.parentElement.style.animationPlayState = 'running';
              const inner = e.currentTarget.querySelector('.counter-rotator');
              if(inner) inner.style.animationPlayState = 'running';
            }
          }}
        >
          
          {/* CONTRA-ROTAÇÃO */}
          <div 
            className="counter-rotator transition-transform duration-200"
            style={{
              animation: `counter-spin ${speed}s linear infinite`,
              animationPlayState: isEditMode ? 'paused' : 'running'
            }}
          >
            {/* O PLANETA VISUAL (CORPO) */}
            <div 
              onClick={handleClick}
              className={`
                relative w-14 h-14 flex items-center justify-center rounded-full transition-all duration-500
                ${isEditMode 
                  ? 'cursor-pointer hover:scale-110 animate-pulse' // Pulsa no modo edição
                  : 'cursor-pointer hover:scale-125'
                }
                ${isLost && !isEditMode ? 'grayscale opacity-50' : 'grayscale-0 opacity-100'}
              `}
            >
              {/* Fundo/Gradiente */}
              <div className={`absolute inset-0 rounded-full transition-all duration-500
                ${isEditMode 
                  ? 'bg-red-900/80 border-2 border-red-500 shadow-[0_0_20px_rgba(239,68,68,0.6)]' 
                  : `bg-gradient-to-br ${habit.gradient} shadow-[inset_-4px_-4px_8px_rgba(0,0,0,0.5)] border-t border-white/30`
                }
              `}></div>

              {/* Glow Externo */}
              {!isEditMode && !isLost && (
                <div className={`absolute -inset-1 rounded-full blur-md opacity-40 bg-gradient-to-br ${habit.gradient}`}></div>
              )}
              
              {/* Ícone */}
              <div className="relative z-10 text-white drop-shadow-md select-none transition-all">
                  {isEditMode ? <Trash2 size={24} className="text-white" /> : habit.icon}
              </div>

              {/* Alerta de Hábito Perdido */}
              {isLost && !isEditMode && (
                 <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-gray-800 rounded-full border border-gray-600 flex items-center justify-center animate-pulse z-20">
                    <AlertTriangle size={10} className="text-yellow-500" />
                 </div>
              )}
            </div>

            {/* --- TOOLTIP HÍBRIDO  --- */}
            <div className={`
              absolute opacity-0 group-hover:opacity-100 transition-all duration-300 top-full mt-3 left-1/2 -translate-x-1/2 whitespace-nowrap 
              rounded-xl text-xs font-bold border shadow-xl pointer-events-auto z-50 flex flex-col items-center gap-2 px-4 py-3
              ${isEditMode 
                ? 'bg-red-950/90 border-red-500 text-red-100' // Estilo VERMELHO (Perigo)
                : 'bg-[#0B0B15]/90 border-white/10 text-white backdrop-blur-md' // Estilo PADRÃO
              }
            `}>
                
                {isEditMode ? (
                  /* --- CONTEÚDO MODO DESTRUIÇÃO --- */
                  <>
                    <div className="flex items-center gap-2 text-red-400 uppercase tracking-widest text-[10px]">
                      <XCircle size={12} /> Excluir Hábito
                    </div>
                    <span className="font-titulo text-lg text-white">{habit.name}</span>
                    <span className="text-[10px] text-red-300/70 font-light">Essa ação não tem volta</span>
                  </>
                ) : (
                  /* --- CONTEÚDO MODO NORMAL --- */
                  <>
                    <span className="flex items-center gap-2 font-orbita tracking-wide">
                        {habit.name} 
                        {isLost 
                          ? <span className="text-gray-500 font-bold uppercase text-[10px] bg-gray-800 px-1 rounded">Desativado</span>
                          : <span className="text-yellow-400">★ {habit.streak}</span>
                        }
                    </span>

                    <p className={`text-[10px] font-light -mt-1 ${isLost ? 'text-red-400' : 'text-cyan-400'}`}>
                       {isLost 
                         ? "Clique para reativar órbita" 
                         : isRestarted 
                            ? "Ciclo reiniciado!"
                            : "Órbita estável"
                       }
                    </p>

                    <button 
                      onClick={handleDetails}
                      className="w-full bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-md text-[10px] uppercase tracking-wider flex items-center justify-center gap-1 transition-colors border border-white/5"
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