import React, { useMemo, useState } from 'react';
import { ArrowLeft, Calendar, Trophy, Flame, Target, Pencil, TrendingUp, CheckCircle2 } from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';
import fundoGalaxia from '../assets/fundogalaxia.png';
import { useCosmicHabits } from '../hooks/useCosmicHabits';
import ModalEditarHabito from '../components/modals/modalEditarHabito';

const HabitDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { habits, editHabit } = useCosmicHabits();
  const [isEditOpen, setIsEditOpen] = useState(false);

  const habit = habits.find(h => String(h.id) === String(id));

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const getToday = () => formatDate(new Date());

  const daysArray = useMemo(() => {
    if (!habit) return [];
    return Array.from({ length: 30 }, (_, i) => {
      const d = new Date();
      d.setDate(d.getDate() - (29 - i));
      const dateString = formatDate(d);
      const isDone = habit.history?.includes(dateString);
      const isToday = dateString === getToday();
      return { date: dateString, isDone, isToday };
    });
  }, [habit]);

  const weekDays = useMemo(() => {
    if (!habit) return [];
    const days = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date();
      d.setDate(d.getDate() - (6 - i));
      const dateString = formatDate(d);
      const isDone = habit.history?.includes(dateString);
      const isToday = dateString === getToday();
      return { date: dateString, isDone, isToday, dayName: days[d.getDay()] };
    });
  }, [habit]);

  const stats = useMemo(() => {
    if (!habit) return {};
    const history = habit.history || [];
    const last30 = daysArray.filter(d => d.isDone).length;
    const completionRate = Math.round((last30 / 30) * 100);
    const sorted = [...history].sort();
    let bestStreak = 0;
    let current = 0;
    for (let i = 0; i < sorted.length; i++) {
      if (i === 0) { current = 1; continue; }
      const diff = Math.floor((new Date(sorted[i]) - new Date(sorted[i - 1])) / (1000 * 60 * 60 * 24));
      if (diff === 1) { current++; } else { current = 1; }
      if (current > bestStreak) bestStreak = current;
    }
    if (current > bestStreak) bestStreak = current;
    return { last30, completionRate, bestStreak };
  }, [habit, daysArray]);

  if (!habit) {
    return (
      <div className="min-h-screen bg-[#0B0B15] flex flex-col items-center justify-center text-white relative font-orbita">
        <div className="absolute inset-0 bg-cover bg-center opacity-40" style={{ backgroundImage: `url(${fundoGalaxia})` }}></div>
        <h2 className="text-2xl font-titulo font-bold mb-4 z-10 text-center">Hábito perdido no espaço... 🛸</h2>
        <button onClick={() => navigate('/orbita')} className="z-10 bg-white/10 px-8 py-3 rounded-full hover:bg-white/20 transition-all border border-white/20 uppercase tracking-widest text-sm">
          Retornar à Base
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0B0B15] text-white relative overflow-hidden flex flex-col items-center p-6 font-orbita">
      <div className="absolute inset-0 bg-cover bg-center bg-no-repeat pointer-events-none opacity-50" style={{ backgroundImage: `url(${fundoGalaxia})` }}></div>
      <div className="absolute inset-0 bg-gradient-to-b from-[#0B0B15]/80 via-transparent to-[#0B0B15] pointer-events-none"></div>

      {/* Cabeçalho */}
      <div className="z-10 w-full max-w-lg flex items-center justify-between mb-8 pt-4">
        <button onClick={() => navigate('/orbita')} className="group flex items-center gap-2 text-gray-400 hover:text-white transition-colors bg-white/5 px-5 py-2.5 rounded-full border border-white/10 hover:bg-white/10 backdrop-blur-md">
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          <span className="uppercase tracking-widest text-xs font-bold">Voltar</span>
        </button>
        <button onClick={() => setIsEditOpen(true)} className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors bg-white/5 px-5 py-2.5 rounded-full border border-white/10 hover:bg-white/10 backdrop-blur-md">
          <Pencil size={14} />
          <span className="uppercase tracking-widest text-xs font-bold">Editar</span>
        </button>
      </div>

      <div className="z-10 w-full max-w-lg bg-[#161625]/80 backdrop-blur-xl border border-white/10 rounded-[2rem] p-8 shadow-2xl relative overflow-hidden animate-in fade-in slide-in-from-bottom duration-500">
        <div className={`absolute -top-20 -right-20 w-80 h-80 bg-gradient-to-br ${habit.gradient} blur-[120px] opacity-30 pointer-events-none rounded-full`}></div>

        {/* Título */}
        <div className="relative mb-6">
          <div className="flex items-center gap-3 mb-1">
            <span className="text-3xl">{habit.icon}</span>
            <h1 className="font-titulo text-4xl font-bold text-white drop-shadow-md">{habit.name}</h1>
          </div>
          <p className="text-gray-400 text-sm flex items-center gap-2 font-light">
            <Target size={16} className="text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]" />
            <span className="tracking-wide uppercase text-xs">Objetivo Prioritário</span>
          </p>
        </div>

        {/* Semana atual */}
        <div className="bg-black/20 rounded-2xl p-4 border border-white/5 mb-6">
          <h3 className="text-xs font-bold text-gray-400 mb-4 flex items-center gap-2 uppercase tracking-widest">
            <CheckCircle2 size={14} /> Esta Semana
          </h3>
          <div className="grid grid-cols-7 gap-2">
            {weekDays.map((day, i) => (
              <div key={i} className="flex flex-col items-center gap-1">
                <span className={`text-[9px] uppercase tracking-wider ${day.isToday ? 'text-cyan-400' : 'text-gray-500'}`}>{day.dayName}</span>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center border transition-all ${
                  day.isDone
                    ? `bg-gradient-to-br ${habit.gradient} border-white/30 shadow-[0_0_8px_rgba(255,255,255,0.15)]`
                    : day.isToday
                      ? 'border-cyan-400/50 bg-cyan-400/10'
                      : 'border-white/10 bg-white/5 opacity-40'
                }`}>
                  {day.isDone && <CheckCircle2 size={12} className="text-white" />}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-black/30 p-5 rounded-3xl border border-white/5 flex flex-col items-center justify-center relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <Flame className="text-orange-400 mb-2 drop-shadow-[0_0_10px_rgba(251,146,60,0.6)]" size={28} />
            <span className="text-4xl font-titulo font-bold text-white">{habit.streak}</span>
            <span className="text-[10px] text-gray-400 uppercase tracking-[0.2em] mt-1">Streak Atual</span>
          </div>
          <div className="bg-black/30 p-5 rounded-3xl border border-white/5 flex flex-col items-center justify-center relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <Trophy className="text-yellow-400 mb-2 drop-shadow-[0_0_10px_rgba(250,204,21,0.6)]" size={28} />
            <span className="text-4xl font-titulo font-bold text-white">{stats.bestStreak || 0}</span>
            <span className="text-[10px] text-gray-400 uppercase tracking-[0.2em] mt-1">Melhor Streak</span>
          </div>
          <div className="bg-black/30 p-5 rounded-3xl border border-white/5 flex flex-col items-center justify-center relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <TrendingUp className="text-cyan-400 mb-2 drop-shadow-[0_0_10px_rgba(34,211,238,0.6)]" size={28} />
            <span className="text-4xl font-titulo font-bold text-white">{stats.completionRate}%</span>
            <span className="text-[10px] text-gray-400 uppercase tracking-[0.2em] mt-1">Taxa 30 Dias</span>
          </div>
          <div className="bg-black/30 p-5 rounded-3xl border border-white/5 flex flex-col items-center justify-center relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <Calendar className="text-purple-400 mb-2 drop-shadow-[0_0_10px_rgba(168,85,247,0.6)]" size={28} />
            <span className="text-4xl font-titulo font-bold text-white">{habit.history?.length || 0}</span>
            <span className="text-[10px] text-gray-400 uppercase tracking-[0.2em] mt-1">Total Dias</span>
          </div>
        </div>

        {/* Barra de progresso */}
        <div className="bg-black/20 rounded-2xl p-4 border border-white/5 mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs text-gray-400 uppercase tracking-widest">Progresso (30 dias)</span>
            <span className="text-xs font-bold text-white">{stats.last30}/30</span>
          </div>
          <div className="w-full bg-white/5 rounded-full h-2">
            <div className={`h-2 rounded-full bg-gradient-to-r ${habit.gradient} transition-all duration-1000`} style={{ width: `${stats.completionRate}%` }} />
          </div>
        </div>

        {/* Calendário 30 dias */}
        <div className="bg-black/20 rounded-2xl p-6 border border-white/5">
          <h3 className="text-xs font-bold text-gray-400 mb-6 flex items-center gap-2 uppercase tracking-widest">
            <Calendar size={14} /> Histórico Recente (30 Dias)
          </h3>
          <div className="grid grid-cols-6 gap-3">
            {daysArray.map((dayInfo, i) => (
              <div key={i} title={dayInfo.date} className={`aspect-square rounded-lg transition-all duration-500 relative group cursor-default ${
                dayInfo.isDone
                  ? `bg-gradient-to-br ${habit.gradient} shadow-[0_0_12px_rgba(255,255,255,0.25)] scale-100 border border-white/30`
                  : dayInfo.isToday
                    ? 'bg-cyan-400/10 border border-cyan-400/40 scale-100'
                    : 'bg-white/5 scale-90 opacity-30 hover:opacity-50'
              }`}>
                {dayInfo.isToday && !dayInfo.isDone && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <ModalEditarHabito
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        habit={habit}
        onSave={(name, gradient, iconKey) => {
          editHabit(habit.id, name, gradient, iconKey);
          setIsEditOpen(false);
        }}
      />
    </div>
  );
};

export default HabitDetails;