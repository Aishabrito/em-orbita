import React from 'react';
import { Trash2, Info } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Planet = ({ habit, index, isEditMode, onInteract }) => {
  const navigate = useNavigate();
  
  const orbitSize = 250 + (index * 110); 
  
  // Velocidade baseada no streak
 
  const speed = Math.max(10, 40 - (habit.streak * 0.5));

  const handleClick = (e) => {
    e.stopPropagation();
    onInteract(habit.id);
  };

  const handleDetails = (e) => {
    e.stopPropagation();
    navigate(`/detalhes/${habit.id}`);
  };

  return (
    <>
      {/* Injeção de Keyframes para garantir que a animação exista */}
      <style>
        {`
          @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
          @keyframes counter-spin { from { transform: rotate(360deg); } to { transform: rotate(0deg); } }
        `}
      </style>

      {/* ANEL DA ÓRBITA (GIRA) */}
      <div
        className="absolute rounded-full border border-white/5 shadow-[0_0_20px_rgba(255,255,255,0.02)] flex items-center justify-center pointer-events-none transition-all duration-500"
        style={{
          width: `${orbitSize}px`,
          height: `${orbitSize}px`,
          zIndex: 10 + index, // Planetas externos ficam atrás visualmente se sobreporem
          animation: `spin ${speed}s linear infinite`,
          animationPlayState: isEditMode ? 'paused' : 'running', // Para de girar ao editar ou passar o mouse (via group-hover no pai)
        }}
      >
        {/* POSICIONAMENTO DO PLANETA (Sempre no topo do anel) */}
        <div 
          className="absolute -top-7 left-1/2 -translate-x-1/2 pointer-events-auto group"
          // Pausa a rotação do anel quando passa o mouse no planeta
          onMouseEnter={(e) => {
            e.currentTarget.parentElement.style.animationPlayState = 'paused';
            // Pausa a contra-rotação também para não desalinhar
            const inner = e.currentTarget.querySelector('.counter-rotator');
            if(inner) inner.style.animationPlayState = 'paused';
          }}
          onMouseLeave={(e) => {
            if (!isEditMode) {
              e.currentTarget.parentElement.style.animationPlayState = 'running';
              const inner = e.currentTarget.querySelector('.counter-rotator');
              if(inner) inner.style.animationPlayState = 'running';
            }
          }}
        >
          
          {/* CONTRA-ROTAÇÃO (Para o ícone ficar sempre em pé) */}
          <div 
            className="counter-rotator transition-transform duration-200"
            style={{
              animation: `counter-spin ${speed}s linear infinite`,
              animationPlayState: isEditMode ? 'paused' : 'running'
            }}
          >
            {/* O PLANETA VISUAL */}
            <div 
              onClick={handleClick}
              className={`
                relative w-14 h-14 flex items-center justify-center rounded-full transition-all duration-200
                ${isEditMode 
                  ? 'cursor-pointer hover:scale-90' 
                  : 'cursor-pointer hover:scale-125'
                }
              `}
            >
              {/* Fundo/Gradiente */}
              <div className={`absolute inset-0 rounded-full transition-all duration-300
                ${isEditMode 
                  ? 'bg-red-900/40 border-2 border-red-500 shadow-[0_0_15px_rgba(239,68,68,0.5)]' 
                  : `bg-gradient-to-br ${habit.gradient} shadow-[inset_-4px_-4px_8px_rgba(0,0,0,0.5)] border-t border-white/30`
                }
              `}></div>

              {/* Glow Externo */}
              {!isEditMode && (
                <div className={`absolute -inset-1 rounded-full blur-md opacity-40 bg-gradient-to-br ${habit.gradient}`}></div>
              )}
              
              {/* Ícone */}
              <div className="relative z-10 text-white drop-shadow-md select-none">
                  {isEditMode ? <Trash2 size={20} className="text-red-200" /> : habit.icon}
              </div>
            </div>

            {/* TOOLTIP (Fica dentro do counter-rotator para não girar junto com a órbita) */}
            {!isEditMode && (
              <div className="absolute opacity-0 group-hover:opacity-100 transition-all duration-300 top-full mt-3 left-1/2 -translate-x-1/2 whitespace-nowrap bg-[#0B0B15]/90 backdrop-blur-md px-4 py-2 rounded-xl text-xs font-bold text-white border border-white/10 shadow-xl pointer-events-auto z-50 flex flex-col items-center gap-2">
                <span className="flex items-center gap-2 font-orbita tracking-wide">
                    {habit.name} <span className="text-yellow-400">★ {habit.streak}</span>
                </span>
                <button 
                  onClick={handleDetails}
                  className="w-full bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-md text-[10px] uppercase tracking-wider flex items-center justify-center gap-1 transition-colors border border-white/5"
                >
                  <Info size={10} /> Detalhes
                </button>
              </div>
            )}
          </div>

        </div>
      </div>
    </>
  );
};

export default Planet;