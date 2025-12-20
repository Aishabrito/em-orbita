import React, { useState, useEffect } from 'react';
import { Droplets, BookOpen, Dumbbell, Zap, X, Plus, Rocket, Settings, Trash2 } from 'lucide-react'; // <--- Adicionei Settings e Trash2
import fundoGalaxia from '../assets/fundogalaxia.png';

const Universe = () => {
  // Estados de controle da UI
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false); 
  // Estados do formulário
  const [habitName, setHabitName] = useState('');
  const [selectedColor, setSelectedColor] = useState('cyan');

  const colorOptions = {
    cyan: { gradient: 'from-cyan-300 via-cyan-500 to-blue-600' },
    purple: { gradient: 'from-fuchsia-300 via-purple-500 to-indigo-600' },
    green: { gradient: 'from-emerald-300 via-emerald-500 to-green-700' },
    orange: { gradient: 'from-yellow-300 via-amber-500 to-orange-600' },
    pink: { gradient: 'from-pink-300 via-rose-500 to-red-600' }
  };

  // Inicialização 
  const [habits, setHabits] = useState(() => {
    const savedHabits = localStorage.getItem('my-cosmic-habits');
    if (savedHabits) {
      const parsed = JSON.parse(savedHabits);
      return parsed.map(h => ({
        ...h,
        icon: h.name === 'Beber Água' ? <Droplets size={22} strokeWidth={2.5} /> :
              h.name === 'Ler Livro' ? <BookOpen size={22} strokeWidth={2.5} /> :
              <Rocket size={22} strokeWidth={2.5} /> 
      }));
    }
    return [
      { id: 1, name: 'Beber Água', icon: <Droplets size={22} strokeWidth={2.5} />, gradient: colorOptions.cyan.gradient, streak: 0 },
      { id: 2, name: 'Ler Livro', icon: <BookOpen size={22} strokeWidth={2.5} />, gradient: colorOptions.purple.gradient, streak: 0 },
    ];
  });

  // Salvar automático
  useEffect(() => {
    const habitsToSave = habits.map(({ icon, ...rest }) => rest);
    localStorage.setItem('my-cosmic-habits', JSON.stringify(habitsToSave));
  }, [habits]);

  const handleAddHabit = (e) => {
    e.preventDefault();
    if (!habitName.trim()) return;

    const newHabit = {
      id: Date.now(),
      name: habitName,
      icon: <Rocket size={22} strokeWidth={2.5} />,
      gradient: colorOptions[selectedColor].gradient,
      streak: 0
    };

    setHabits([...habits, newHabit]);
    setHabitName('');
    setSelectedColor('cyan');
    setIsModalOpen(false);
  };

  const handleIncrementStreak = (id) => {
    setHabits(habits.map(habit => {
      if (habit.id === id) {
        return { ...habit, streak: habit.streak + 1 };
      }
      return habit;
    }));
  };

  // Função de Deletar 
  const handleDeleteHabit = (id) => {
    if (window.confirm("Tem certeza que deseja destruir este hábito?")) {
      setHabits(habits.filter(h => h.id !== id));
    }
  };

  // Controla o clique no planeta dependendo do modo
  const handlePlanetClick = (id) => {
    if (isEditMode) {
      handleDeleteHabit(id);
    } else {
      handleIncrementStreak(id);
    }
  };

  return (
    <div className="relative flex items-center justify-center w-full h-screen overflow-hidden bg-space-900 text-white">
      
      {/* Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat pointer-events-none"
        style={{ backgroundImage: `url(${fundoGalaxia})` }}
      ></div>
      <div className="absolute inset-0 bg-black/50 pointer-events-none"></div>

      {/* Botão de Modo Edição  */}
      <button 
        onClick={() => setIsEditMode(!isEditMode)}
        className={`absolute top-6 right-6 z-50 p-3 rounded-full transition-all duration-300 border backdrop-blur-md
          ${isEditMode 
            ? 'bg-red-500/20 border-red-500 text-red-400 rotate-180 hover:bg-red-500/30' 
            : 'bg-white/5 border-white/10 text-gray-400 hover:text-white hover:bg-white/10'
          }`}
        title="Gerenciar Hábitos"
      >
        {isEditMode ? <X size={24} /> : <Settings size={24} />}
      </button>

      {/* Aviso de Modo Edição */}
      {isEditMode && (
        <div className="absolute top-20 right-6 text-red-400 text-xs font-bold uppercase tracking-widest animate-pulse z-50">
          Modo de Destruição Ativo
        </div>
      )}

      {/* Estrela Central */}
      <div className="z-10 relative flex flex-col items-center justify-center">
        <div className="relative w-24 h-24 flex items-center justify-center">
           <div className={`absolute inset-0 rounded-full bg-star blur-xl opacity-40 ${isEditMode ? 'grayscale' : 'animate-pulse-glow'}`}></div>
           <div className={`relative w-full h-full rounded-full flex items-center justify-center z-20 border transition-colors duration-500
             ${isEditMode 
               ? 'bg-gray-800 border-red-500/50 shadow-[0_0_30px_rgba(239,68,68,0.2)]' 
               : 'bg-gradient-to-br from-yellow-200 via-star to-orange-600 border-yellow-100/30 shadow-[inset_-5px_-5px_20px_rgba(180,83,9,0.5)]'
             }`}>
              <span className={`font-extrabold text-3xl drop-shadow-md ${isEditMode ? 'text-red-400' : 'text-space-900'}`}>
                {isEditMode ? '⚠️' : 'Eu'}
              </span>
           </div>
        </div>
        <div className="mt-8 text-star font-bold tracking-widest text-sm uppercase drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
          Streak Total: {habits.reduce((acc, h) => acc + h.streak, 0)}
        </div>
      </div>

      {/* Renderização do Sistema Solar */}
      {habits.map((habit, index) => {
        const orbitSize = 220 + (index * 110);
        const speed = Math.max(6, 40 - habit.streak); 

        return (
          <div
            key={habit.id}
            className="absolute rounded-full border border-white/5 shadow-[0_0_20px_rgba(255,255,255,0.02)] flex items-center justify-center pointer-events-none transition-all duration-500"
            style={{
              width: `${orbitSize}px`,
              height: `${orbitSize}px`,
              animation: `spin ${speed}s linear infinite`,
              animationPlayState: isEditMode ? 'paused' : 'running', // Pausa a órbita no modo edição
              borderColor: isEditMode ? 'rgba(239, 68, 68, 0.2)' : 'rgba(255, 255, 255, 0.05)'
            }}
          >
            {/* Planeta Interativo */}
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 pointer-events-auto group">
              <div 
                onClick={() => handlePlanetClick(habit.id)}
                className={`relative w-14 h-14 flex items-center justify-center transition-transform duration-200 
                  ${isEditMode ? 'cursor-not-allowed hover:scale-90' : 'cursor-pointer hover:scale-110 active:scale-90'}
                `}
              >
                {/* Visual do Planeta */}
                <div className={`absolute inset-0 rounded-full transition-all duration-300
                  ${isEditMode 
                    ? 'bg-gray-700 border-2 border-red-500' // Visual de "alvo" para deletar
                    : `bg-gradient-to-br ${habit.gradient} shadow-[inset_-4px_-4px_8px_rgba(0,0,0,0.6)] border-t border-white/30`
                  }
                `}></div>

                {/* Brilho */}
                {!isEditMode && <div className={`absolute inset-0 rounded-full blur-md opacity-40 ${habit.gradient}`}></div>}
                
                {/* Ícone (Muda para lixeira no modo edição) */}
                <div className="relative z-10 text-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.5)] select-none">
                    {isEditMode ? <Trash2 size={20} className="text-red-500" /> : habit.icon}
                </div>
              </div>
              
              {/* Tooltip */}
              {!isEditMode && (
                <div className="absolute opacity-0 group-hover:opacity-100 transition-all duration-300 -top-12 left-1/2 -translate-x-1/2 whitespace-nowrap bg-space-900/90 backdrop-blur-md px-3 py-1.5 rounded-lg text-xs font-bold text-white border border-white/10 shadow-xl pointer-events-none z-50">
                  {habit.name} <span className="text-yellow-400 ml-1">★ {habit.streak}</span>
                </div>
              )}
            </div>
          </div>
        );
      })}

      {/* Botão Novo Hábito  */}
      {!isEditMode && (
        <button 
          onClick={() => setIsModalOpen(true)}
          className="absolute bottom-10 px-8 py-3 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full hover:bg-white/10 hover:scale-105 transition-all text-sm font-bold tracking-wide shadow-lg group z-50"
        >
          <span className="bg-gradient-to-r from-cyan-300 to-purple-400 bg-clip-text text-transparent group-hover:text-white transition-colors flex items-center gap-2">
            <Plus size={18} /> NOVO HÁBITO
          </span>
        </button>
      )}

      {/* ... (Modal ) ... */}
      {isModalOpen && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fadeIn">
          <div className="relative w-full max-w-md bg-space-900/90 border border-white/10 rounded-2xl p-6 shadow-2xl overflow-hidden">
            <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${colorOptions[selectedColor].gradient}`}></div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-white">Criar Novo Hábito</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-white transition-colors">
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleAddHabit} className="space-y-6">
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Nome do Hábito</label>
                <input 
                  type="text" 
                  value={habitName}
                  onChange={(e) => setHabitName(e.target.value)}
                  placeholder="Ex: Beber água..." 
                  className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition-colors placeholder-gray-600"
                  autoFocus
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Escolha a Energia (Cor)</label>
                <div className="flex gap-4 justify-center bg-black/20 p-3 rounded-xl border border-white/5">
                  {Object.entries(colorOptions).map(([key, value]) => (
                    <div 
                      key={key}
                      onClick={() => setSelectedColor(key)}
                      className={`
                        w-8 h-8 rounded-full cursor-pointer transition-all duration-300 relative
                        bg-gradient-to-br ${value.gradient}
                        ${selectedColor === key ? 'scale-125 ring-2 ring-white shadow-[0_0_15px_rgba(255,255,255,0.5)]' : 'opacity-60 hover:opacity-100 hover:scale-110'}
                      `}
                    ></div>
                  ))}
                </div>
              </div>
              <button 
                type="submit"
                disabled={!habitName.trim()}
                className={`
                  w-full mt-4 bg-gradient-to-r ${colorOptions[selectedColor].gradient} 
                  text-white font-bold py-3 rounded-lg shadow-lg transform active:scale-95 transition-all
                  ${!habitName.trim() ? 'opacity-50 cursor-not-allowed grayscale' : 'hover:brightness-110'}
                `}
              >
                Lançar em Órbita 🚀
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Universe;