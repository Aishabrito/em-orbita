import React, { useState } from 'react';
import { ArrowLeft, Calendar, Trophy, Flame, Target } from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';
import fundoGalaxia from '../assets/fundogalaxia.png';

const HabitDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

 
  const [habit] = useState(() => {
    const savedHabits = localStorage.getItem('my-cosmic-habits');
    if (savedHabits) {
      const parsedHabits = JSON.parse(savedHabits);
      return parsedHabits.find(h => h.id.toString() === id) || null;
    }
    return null;
  });

  if (!habit) {
    return (
      <div className="min-h-screen bg-space-900 flex flex-col items-center justify-center text-white relative">
         <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat pointer-events-none opacity-40"
          style={{ backgroundImage: `url(${fundoGalaxia})` }}
        ></div>
        <h2 className="text-xl font-bold mb-4 z-10">Hábito não encontrado no radar! 🛸</h2>
        <button 
          onClick={() => navigate('/')}
          className="z-10 bg-white/10 px-6 py-2 rounded-full hover:bg-white/20 transition-all border border-white/20"
        >
          Voltar para a Base
        </button>
      </div>
    );
  }

  const daysArray = Array.from({ length: 30 }, (_, i) => i < habit.streak);

  return (
    <div className="min-h-screen bg-space-900 text-white relative overflow-hidden flex flex-col items-center p-6">
      
      {/* Fundo */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat pointer-events-none opacity-40"
        style={{ backgroundImage: `url(${fundoGalaxia})` }}
      ></div>

      {/* Cabeçalho */}
      <div className="z-10 w-full max-w-md flex items-center justify-between mb-8 pt-4">
        <button 
          onClick={() => navigate('/')} 
          className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors bg-white/5 px-4 py-2 rounded-full border border-white/10"
        >
          <ArrowLeft size={18} /> Voltar
        </button>
        <div className={`px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest border border-white/20 bg-gradient-to-r ${habit.gradient} bg-opacity-20`}>
          Em Órbita
        </div>
      </div>

      {/* Card Principal */}
      <div className="z-10 w-full max-w-md bg-space-900/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
        
        {/* Brilho de fundo */}
        <div className={`absolute top-0 right-0 w-64 h-64 bg-gradient-to-br ${habit.gradient} blur-[100px] opacity-20 pointer-events-none rounded-full -translate-y-1/2 translate-x-1/2`}></div>

        <h1 className="text-3xl font-bold mb-2">{habit.name}</h1>
        <p className="text-gray-400 text-sm mb-8 flex items-center gap-2">
          <Target size={16} /> Foco Principal
        </p>

        {/* Grid de Estatísticas */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-black/40 p-5 rounded-2xl border border-white/5 flex flex-col items-center justify-center">
            <Flame className="text-orange-400 mb-2" size={24} />
            <span className="text-3xl font-bold text-white">{habit.streak}</span>
            <span className="text-xs text-gray-400 uppercase tracking-wide mt-1">Streak Atual</span>
          </div>
          <div className="bg-black/40 p-5 rounded-2xl border border-white/5 flex flex-col items-center justify-center">
            <Trophy className="text-yellow-400 mb-2" size={24} />
            <span className="text-3xl font-bold text-white">{habit.streak + 2}</span> 
            <span className="text-xs text-gray-400 uppercase tracking-wide mt-1">Recorde</span>
          </div>
        </div>

        {/* Calendário Visual */}
        <div className="mb-6">
          <h3 className="text-sm font-bold text-gray-300 mb-4 flex items-center gap-2">
            <Calendar size={16} /> Histórico Recente (30 Dias)
          </h3>
          <div className="grid grid-cols-6 gap-2">
            {daysArray.map((done, index) => (
              <div 
                key={index}
                className={`
                  aspect-square rounded-md transition-all duration-500
                  ${done 
                    ? `bg-gradient-to-br ${habit.gradient} shadow-[0_0_10px_rgba(255,255,255,0.3)] scale-100` 
                    : 'bg-white/5 scale-90 opacity-50'
                  }
                `}
              ></div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default HabitDetails;