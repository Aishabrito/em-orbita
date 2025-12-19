import React, { useState } from 'react';
import { Droplets, BookOpen, Dumbbell, Zap, X, Plus, Rocket } from 'lucide-react';
import fundoGalaxia from '../assets/fundogalaxia.png';

const Universe = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Estados para o formulário de criação
  const [habitName, setHabitName] = useState('');
  const [selectedColor, setSelectedColor] = useState('cyan');

  // Opções de cores disponíveis
  const colorOptions = {
    cyan: { gradient: 'from-cyan-300 via-cyan-500 to-blue-600' },
    purple: { gradient: 'from-fuchsia-300 via-purple-500 to-indigo-600' },
    green: { gradient: 'from-emerald-300 via-emerald-500 to-green-700' },
    orange: { gradient: 'from-yellow-300 via-amber-500 to-orange-600' },
    pink: { gradient: 'from-pink-300 via-rose-500 to-red-600' }
  };

  const [habits, setHabits] = useState([
    { 
      id: 1, 
      name: 'Beber Água', 
      icon: <Droplets size={22} strokeWidth={2.5} />, 
      gradient: colorOptions.cyan.gradient,
      streak: 12 
    },
    { 
      id: 2, 
      name: 'Ler Livro', 
      icon: <BookOpen size={22} strokeWidth={2.5} />, 
      gradient: colorOptions.purple.gradient,
      streak: 5 
    },
  ]);

  // Funcao para criar novo habito
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

  // Funcao Marcar como feito
  const handleIncrementStreak = (id) => {
    setHabits(habits.map(habit => {
      if (habit.id === id) {
        return { ...habit, streak: habit.streak + 1 };
      }
      return habit;
    }));
  };

  return (
    <div className="relative flex items-center justify-center w-full h-screen overflow-hidden bg-space-900 text-white">
      
      {/* Fundo */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat pointer-events-none"
        style={{ backgroundImage: `url(${fundoGalaxia})` }}
      ></div>
      <div className="absolute inset-0 bg-black/50 pointer-events-none"></div>

      {/* Estrela Central  */}
      <div className="z-10 relative flex flex-col items-center justify-center">
        <div className="relative w-24 h-24 flex items-center justify-center">
           <div className="absolute inset-0 rounded-full bg-star blur-xl opacity-40 animate-pulse-glow"></div>
           <div className="relative w-full h-full rounded-full bg-gradient-to-br from-yellow-200 via-star to-orange-600 shadow-[inset_-5px_-5px_20px_rgba(180,83,9,0.5)] flex items-center justify-center z-20 border border-yellow-100/30">
              <span className="text-space-900 font-extrabold text-3xl drop-shadow-md">Eu</span>
           </div>
        </div>
        <div className="mt-8 text-star font-bold tracking-widest text-sm uppercase drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
          Streak Total: {habits.reduce((acc, h) => acc + h.streak, 0)}
        </div>
      </div>

      {/* Sistema Solar */}
      {habits.map((habit, index) => {
        // Logica visual: aumenta a orbita conforme o index e a velocidade baseada no streak
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
            {/* Container Interativo*/}
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 pointer-events-auto group">
              <div 
                onClick={() => handleIncrementStreak(habit.id)}
                className="relative w-14 h-14 flex items-center justify-center transition-transform duration-200 hover:scale-110 active:scale-90 cursor-pointer"
              >
                {/* Visual do Planeta */}
                <div className={`absolute inset-0 rounded-full bg-gradient-to-br ${habit.gradient} shadow-[inset_-4px_-4px_8px_rgba(0,0,0,0.6)] border-t border-white/30`}></div>
                <div className={`absolute inset-0 rounded-full blur-md opacity-40 ${habit.gradient}`}></div>
                
                {/* Icone */}
                <div className="relative z-10 text-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.5)] select-none">
                    {habit.icon}
                </div>
              </div>

              {/* Tooltip com Nome e Streak Atual */}
              <div className="absolute opacity-0 group-hover:opacity-100 transition-all duration-300 -top-12 left-1/2 -translate-x-1/2 whitespace-nowrap bg-space-900/90 backdrop-blur-md px-3 py-1.5 rounded-lg text-xs font-bold text-white border border-white/10 shadow-xl pointer-events-none z-50">
                {habit.name} <span className="text-yellow-400 ml-1">★ {habit.streak}</span>
              </div>
            </div>
          </div>
        );
      })}

      {/* Botao Novo Habito */}
      <button 
        onClick={() => setIsModalOpen(true)}
        className="absolute bottom-10 px-8 py-3 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full hover:bg-white/10 hover:scale-105 transition-all text-sm font-bold tracking-wide shadow-lg group z-50"
      >
        <span className="bg-gradient-to-r from-cyan-300 to-purple-400 bg-clip-text text-transparent group-hover:text-white transition-colors flex items-center gap-2">
          <Plus size={18} /> NOVO HÁBITO
        </span>
      </button>

      {/* Modal */}
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