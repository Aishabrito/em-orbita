import React from 'react';
import { Droplets, BookOpen, Dumbbell, Zap } from 'lucide-react';
import fundoGalaxia from '../assets/fundogalaxia.png';
const Universe = () => {
  // 1. Dados Fakes apenas para visualização 
  const habits = [
    { id: 1, name: 'Beber Água', icon: <Droplets size={20} />, color: 'bg-cyan-400', glow: 'shadow-cyan-400', streak: 12 },
    { id: 2, name: 'Ler Livro', icon: <BookOpen size={20} />, color: 'bg-purple-500', glow: 'shadow-purple-500', streak: 5 },
    { id: 3, name: 'Exercício', icon: <Dumbbell size={20} />, color: 'bg-emerald-400', glow: 'shadow-emerald-400', streak: 20 },
    { id: 4, name: 'Codar', icon: <Zap size={20} />, color: 'bg-amber-400', glow: 'shadow-amber-400', streak: 2 },
  ];

  return (
    <div className="relative flex items-center justify-center w-full h-screen overflow-hidden bg-space-900 text-white">
      
      {/* 🌌 Fundo*/}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat pointer-events-none"
        style={{ backgroundImage: `url(${fundoGalaxia})` }}
      ></div>

      {/* Camada escura */}
      <div className="absolute inset-0 bg-black/50 pointer-events-none"></div>
      {/* ESTRELA CENTRAL (Representa o Usuário) */}
      <div className="z-10 relative flex flex-col items-center justify-center">
        <div className="w-24 h-24 rounded-full bg-star shadow-[0_0_60px_#FACC15] animate-pulse-glow flex items-center justify-center relative z-20">
          <span className="text-space-900 font-bold text-3xl">Eu</span>
        </div>
        <div className="mt-8 text-star font-medium tracking-widest text-sm uppercase opacity-80">
          Streak Total: 12
        </div>
      </div>

      {/*  SISTEMA SOLAR (As Órbitas e Planetas) */}
      {habits.map((habit, index) => {
        
        // Tamanho da órbita: Começa em 220px e aumenta 100px para cada hábito
        const orbitSize = 220 + (index * 110);
        
        // Velocidade: Quanto maior o streak, mais rápido gira (mínimo 5s, máx 40s)
        const speed = Math.max(6, 40 - habit.streak);

        return (
          // O CÍRCULO DA ÓRBITA (Gira o container inteiro)
          <div
            key={habit.id}
            className="absolute rounded-full border border-white/5 flex items-center justify-center pointer-events-none"
            style={{
              width: `${orbitSize}px`,
              height: `${orbitSize}px`,
              animation: `spin ${speed}s linear infinite` // A mágica da rotação
            }}
          >
            {/* O PLANETA (Fixo na borda da órbita) */}
            <div 
              className="absolute -top-5 left-1/2 -translate-x-1/2 pointer-events-auto"
            >
              {/* O Corpo do Planeta (Visual) */}
              <div 
                className={`group relative w-10 h-10 rounded-full ${habit.color} flex items-center justify-center text-space-900 shadow-[0_0_20px_currentColor] cursor-pointer transition-transform hover:scale-125`}
                style={{ color: habit.color }} // Hack para usar a cor no shadow
              >
                {/* Ícone dentro do planeta */}
                <div className="text-space-900">
                    {habit.icon}
                </div>

                {/* Tooltip (Nome do Hábito ao passar o mouse) */}
                <div className="absolute opacity-0 group-hover:opacity-100 transition-opacity -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap bg-space-800 px-2 py-1 rounded text-xs text-white border border-white/10 pointer-events-none">
                  {habit.name}
                </div>
              </div>
            </div>
          </div>
        );
      })}

      {/* Botão Flutuante (Apenas Visual por enquanto) */}
      <button className="absolute bottom-10 px-6 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-full hover:bg-white/20 transition-all text-sm font-medium tracking-wide">
        + NOVO HÁBITO
      </button>
      
    </div>
  );
};

export default Universe;