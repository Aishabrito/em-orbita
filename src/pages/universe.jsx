import React from 'react';
import { Droplets, BookOpen, Dumbbell, Zap } from 'lucide-react';
import fundoGalaxia from '../assets/fundogalaxia.png';

const Universe = () => {
  // 1. Dados 
  const habits = [
    { 
      id: 1, 
      name: 'Beber Água', 
      icon: <Droplets size={22} strokeWidth={2.5} />, 
      
      gradient: 'from-cyan-300 via-cyan-500 to-blue-600',
      shadow: 'shadow-cyan-400/50',
      streak: 12 
    },
    { 
      id: 2, 
      name: 'Ler Livro', 
      icon: <BookOpen size={22} strokeWidth={2.5} />, 
      
      gradient: 'from-fuchsia-300 via-purple-500 to-indigo-600',
      shadow: 'shadow-purple-500/50',
      streak: 5 
    },
    { 
      id: 3, 
      name: 'Exercício', 
      icon: <Dumbbell size={22} strokeWidth={2.5} />, 
      
      gradient: 'from-emerald-300 via-emerald-500 to-green-700',
      shadow: 'shadow-emerald-500/50',
      streak: 20 
    },
    { 
      id: 4, 
      name: 'Codar', 
      icon: <Zap size={22} strokeWidth={2.5} />, 
      
      gradient: 'from-yellow-300 via-amber-500 to-orange-600',
      shadow: 'shadow-amber-500/50',
      streak: 2 
    },
  ];

  return (
    <div className="relative flex items-center justify-center w-full h-screen overflow-hidden bg-space-900 text-white">
      
      {/*  Fundo */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat pointer-events-none"
        style={{ backgroundImage: `url(${fundoGalaxia})` }}
      ></div>

      <div className="absolute inset-0 bg-black/50 pointer-events-none"></div>

      {/* ESTRELA CENTRAL */}
      <div className="z-10 relative flex flex-col items-center justify-center">
        <div className="relative w-24 h-24 flex items-center justify-center">
           <div className="absolute inset-0 rounded-full bg-star blur-xl opacity-40 animate-pulse-glow"></div>
          
           <div className="relative w-full h-full rounded-full bg-gradient-to-br from-yellow-200 via-star to-orange-600 shadow-[inset_-5px_-5px_20px_rgba(180,83,9,0.5)] flex items-center justify-center z-20 border border-yellow-100/30">
              <span className="text-space-900 font-extrabold text-3xl drop-shadow-md">Eu</span>
           </div>
        </div>
        <div className="mt-8 text-star font-bold tracking-widest text-sm uppercase drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
          Streak Total: 12
        </div>
      </div>

      {/* SISTEMA SOLAR */}
      {habits.map((habit, index) => {
        
        const orbitSize = 220 + (index * 110);
        const speed = Math.max(6, 40 - habit.streak);

        return (
          <div
            key={habit.id}
            className="absolute rounded-full border border-white/5 shadow-[0_0_20px_rgba(255,255,255,0.02)] flex items-center justify-center pointer-events-none"
            style={{
              width: `${orbitSize}px`,
              height: `${orbitSize}px`,
              animation: `spin ${speed}s linear infinite` 
            }}
          >
            {/* O PLANETA */}
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 pointer-events-auto group">
          
              <div className="relative w-14 h-14 flex items-center justify-center transition-transform duration-300 hover:scale-110">
                
                {/* 1. O CORPO DO PLANETA (3D) */}
                <div className={`
                    absolute inset-0 rounded-full 
                    bg-gradient-to-br ${habit.gradient} 
                    shadow-[inset_-4px_-4px_8px_rgba(0,0,0,0.6)] 
                    border-t border-white/30
                `}></div>
               
                <div className={`absolute inset-0 rounded-full blur-md opacity-40 ${habit.gradient}`}></div>

             

                <div className="relative z-10 text-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.5)]">
                    {habit.icon}
                </div>

              </div>

              {/* Tooltip (Nome do Hábito) */}
              <div className="absolute opacity-0 group-hover:opacity-100 transition-all duration-300 -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap bg-space-900/90 backdrop-blur-md px-3 py-1.5 rounded-lg text-xs font-bold text-white border border-white/10 shadow-xl">
                {habit.name}
              </div>

            </div>
          </div>
        );
      })}

      {/* Botão Flutuante */}
      <button className="absolute bottom-10 px-8 py-3 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full hover:bg-white/10 hover:scale-105 transition-all text-sm font-bold tracking-wide shadow-lg group">
        <span className="bg-gradient-to-r from-cyan-300 to-purple-400 bg-clip-text text-transparent group-hover:text-white transition-colors">
          + NOVO HÁBITO
        </span>
      </button>
      
    </div>
  );
};

export default Universe;