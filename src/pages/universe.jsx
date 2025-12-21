import React, { useState } from 'react';
import { Plus, Settings, X } from 'lucide-react';
import fundoGalaxia from '../assets/fundogalaxia.png';
import { useCosmicHabits } from '../hooks/useCosmicHabits';
import Planet from '../components/Planet';
import ModalCriarHabito from '../components/modals/modalCriarHabito.jsx';
import EstrelaCentral from '../components/estrelaCentral';

const Universe = () => {
  //  Hook de Lógica
  const { habits, addHabit, deleteHabit, incrementStreak } = useCosmicHabits();
  
  //  Estados de UI 
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  //  Handlers simples
  const handleInteraction = (id) => {
    if (isEditMode) deleteHabit(id);
    else incrementStreak(id);
  };

  const totalStreak = habits.reduce((acc, h) => acc + h.streak, 0);

  return (
    <div className="relative flex items-center justify-center w-full h-screen overflow-hidden bg-[#0B0B15] text-white">
      
      {/* Background */}
      <div className="absolute inset-0 bg-cover bg-center bg-no-repeat pointer-events-none opacity-60"
        style={{ backgroundImage: `url(${fundoGalaxia})` }}></div>
      <div className="absolute inset-0 bg-black/40 pointer-events-none"></div>

      {/* Botão de Edição  */}
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

      {/* Estrela Central (Eu) */}
      <EstrelaCentral isEditMode={isEditMode} totalStreak={totalStreak} />

      {/* Renderização dos Planetas */}
      {habits.map((habit, index) => (
        <Planet 
          key={habit.id}
          habit={habit}
          index={index}
          isEditMode={isEditMode}
          onInteract={handleInteraction}
        />
      ))}

      {/* Botão  Novo Hábito */}
      {!isEditMode && (
        <button 
          onClick={() => setIsModalOpen(true)}
          className="absolute bottom-10 px-8 py-3 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full hover:bg-white/10 hover:scale-105 transition-all text-sm font-bold tracking-wide shadow-lg group z-50"
        >
          <span className="bg-gradient-to-r from-cyan-300 to-purple-400 bg-clip-text text-transparent group-hover:text-white transition-colors flex items-center gap-2">
            <Plus size={18} className="text-cyan-300 group-hover:text-white" /> NOVO HÁBITO
          </span>
        </button>
      )}

      {/* Modal */}
      <ModalCriarHabito
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSave={addHabit}
      />
    </div>
  );
};

export default Universe;