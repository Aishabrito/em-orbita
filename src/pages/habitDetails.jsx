import React, { useMemo } from 'react';
import { ArrowLeft, Calendar, Trophy, Flame, Target } from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';
import fundoGalaxia from '../assets/fundogalaxia.png';
import { useCosmicHabits } from '../hooks/useCosmicHabits';

const HabitDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { habits } = useCosmicHabits();

  // Encontrar o hábito (convertendo id para string para garantir comparação)
  const habit = habits.find(h => String(h.id) === String(id));

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const daysArray = useMemo(() => {
    if (!habit) return [];
    return Array.from({ length: 30 }, (_, i) => {
      const d = new Date();
      d.setDate(d.getDate() - (29 - i)); 
      const dateString = formatDate(d);
      const isDone = habit.history?.includes(dateString);
      return { date: dateString, isDone };
    });
  }, [habit]);

  if (!habit) {
    return (
      <div className="min-h-screen bg-[#0B0B15] flex flex-col items-center justify-center text-white relative font-orbita">
         <div className="absolute inset-0 bg-cover bg-center opacity-40" style={{ backgroundImage: `url(${fundoGalaxia})` }}></div>
        <h2 className="text-2xl font-titulo font-bold mb-4 z-10 text-center">Hábito perdido no espaço... 🛸</h2>
        <button 
          onClick={() => navigate('/orbita')}
          className="z-10 bg-white/10 px-8 py-3 rounded-full hover:bg-white/20 transition-all border border-white/20 uppercase tracking-widest text-sm"
        >
          Retornar à Base
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0B0B15] text-white relative overflow-hidden flex flex-col items-center p-6 font-orbita">
      
      {/* Fundo */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat pointer-events-none opacity-50"
        style={{ backgroundImage: `url(${fundoGalaxia})` }}
      ></div>
      <div className="absolute inset-0 bg-gradient-to-b from-[#0B0B15]/80 via-transparent to-[#0B0B15] pointer-events-none"></div>

      {/* Cabeçalho de Navegação */}
      <div className="z-10 w-full max-w-lg flex items-center justify-between mb-8 pt-4">
        <button 
          onClick={() => navigate('/orbita')} 
          className="group flex items-center gap-2 text-gray-400 hover:text-white transition-colors bg-white/5 px-5 py-2.5 rounded-full border border-white/10 hover:bg-white/10 backdrop-blur-md"
        >
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" /> <span className="uppercase tracking-widest text-xs font-bold">Voltar</span>
        </button>
        
        <div className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] border border-white/20 bg-gradient-to-r ${habit.gradient} bg-opacity-20 shadow-[0_0_15px_rgba(255,255,255,0.15)]`}>
          Em Órbita
        </div>
      </div>

      {/* Card Principal de Detalhes */}
      <div className="z-10 w-full max-w-lg bg-[#161625]/80 backdrop-blur-xl border border-white/10 rounded-[2rem] p-8 shadow-2xl relative overflow-hidden animate-in fade-in slide-in-from-bottom duration-500">
      
        {/* Glow de Fundo baseada na cor do hábito */}
        <div className={`absolute -top-20 -right-20 w-80 h-80 bg-gradient-to-br ${habit.gradient} blur-[120px] opacity-30 pointer-events-none rounded-full`}></div>

        <div className="relative mb-8">
            <h1 className="font-titulo text-4xl font-bold mb-2 text-white drop-shadow-md">
                {habit.name}
            </h1>
            <p className="text-gray-400 text-sm flex items-center gap-2 font-light">
                <Target size={16} className={`text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]`} /> 
                <span className="tracking-wide uppercase text-xs">Objetivo Prioritário</span>
            </p>
        </div>

        {/* Grid de Estatísticas */}
        <div className="grid grid-cols-2 gap-4 mb-10">
          <div className="bg-black/30 p-6 rounded-3xl border border-white/5 flex flex-col items-center justify-center relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <Flame className="text-orange-400 mb-3 drop-shadow-[0_0_10px_rgba(251,146,60,0.6)]" size={32} />
            <span className="text-4xl font-titulo font-bold text-white">{habit.streak}</span>
            <span className="text-[10px] text-gray-400 uppercase tracking-[0.2em] mt-2">Dias Seguidos</span>
          </div>
          
          <div className="bg-black/30 p-6 rounded-3xl border border-white/5 flex flex-col items-center justify-center relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <Trophy className="text-yellow-400 mb-3 drop-shadow-[0_0_10px_rgba(250,204,21,0.6)]" size={32} />
            <span className="text-4xl font-titulo font-bold text-white">{habit.history?.length || 0}</span> 
            <span className="text-[10px] text-gray-400 uppercase tracking-[0.2em] mt-2">Total Concluído</span>
          </div>
        </div>

        {/* Calendário Visual - Estilo GitHub/Matrix */}
        <div className="bg-black/20 rounded-2xl p-6 border border-white/5">
          <h3 className="text-xs font-bold text-gray-400 mb-6 flex items-center gap-2 uppercase tracking-widest">
            <Calendar size={14} /> Histórico Recente (30 Dias)
          </h3>
          
          <div className="grid grid-cols-6 gap-3">
            {daysArray.map((dayInfo, i) => (
              <div 
                key={i}
                title={dayInfo.date}
                className={`
                  aspect-square rounded-lg transition-all duration-500 relative group cursor-default
                  ${dayInfo.isDone 
                    ? `bg-gradient-to-br ${habit.gradient} shadow-[0_0_12px_rgba(255,255,255,0.25)] scale-100 border border-white/30` 
                    : 'bg-white/5 scale-90 opacity-30 hover:opacity-50'
                  }
                `}
              >
                  {!dayInfo.isDone && (
                    <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 rounded-lg transition-opacity" />
                  )}
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default HabitDetails;